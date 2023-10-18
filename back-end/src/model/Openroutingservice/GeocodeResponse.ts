// To parse this data:
//
//   import { Convert, Geocode } from "./file";
//
//   const geocode = Convert.toGeocode(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface GeocodeResponse {
    geocoding: Geocoding;
    type:      string;
    features:  Feature[];
    bbox:      number[];
}

export interface Feature {
    type:       string;
    geometry:   Geometry;
    properties: Properties;
    bbox:       number[];
}

export interface Geometry {
    type:        string;
    coordinates: number[];
}

export interface Properties {
    id:              string;
    gid:             string;
    layer:           string;
    source:          string;
    source_id:       string;
    name:            string;
    confidence:      number;
    match_type:      string;
    accuracy:        string;
    country:         string;
    country_gid:     string;
    country_a:       string;
    macroregion:     string;
    macroregion_gid: string;
    region:          string;
    region_gid:      string;
    region_a:        string;
    localadmin:      string;
    localadmin_gid:  string;
    locality?:       string;
    locality_gid?:   string;
    continent:       string;
    continent_gid:   string;
    label:           string;
}

export interface Geocoding {
    version:     string;
    attribution: string;
    query:       Query;
    warnings:    string[];
    engine:      Engine;
    timestamp:   number;
}

export interface Engine {
    name:    string;
    author:  string;
    version: string;
}

export interface Query {
    text:        string;
    size:        number;
    layers:      string[];
    private:     boolean;
    lang:        Lang;
    querySize:   number;
    parser:      string;
    parsed_text: ParsedText;
}

export interface Lang {
    name:      string;
    iso6391:   string;
    iso6393:   string;
    via:       string;
    defaulted: boolean;
}

export interface ParsedText {
    city: string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toGeocode(json: string): GeocodeResponse {
        return cast(JSON.parse(json), r("Geocode"));
    }

    public static geocodeToJson(value: GeocodeResponse): string {
        return JSON.stringify(uncast(value, r("Geocode")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "Geocode": o([
        { json: "geocoding", js: "geocoding", typ: r("Geocoding") },
        { json: "type", js: "type", typ: "" },
        { json: "features", js: "features", typ: a(r("Feature")) },
        { json: "bbox", js: "bbox", typ: a(3.14) },
    ], false),
    "Feature": o([
        { json: "type", js: "type", typ: "" },
        { json: "geometry", js: "geometry", typ: r("Geometry") },
        { json: "properties", js: "properties", typ: r("Properties") },
        { json: "bbox", js: "bbox", typ: a(3.14) },
    ], false),
    "Geometry": o([
        { json: "type", js: "type", typ: "" },
        { json: "coordinates", js: "coordinates", typ: a(3.14) },
    ], false),
    "Properties": o([
        { json: "id", js: "id", typ: "" },
        { json: "gid", js: "gid", typ: "" },
        { json: "layer", js: "layer", typ: "" },
        { json: "source", js: "source", typ: "" },
        { json: "source_id", js: "source_id", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "confidence", js: "confidence", typ: 0 },
        { json: "match_type", js: "match_type", typ: "" },
        { json: "accuracy", js: "accuracy", typ: "" },
        { json: "country", js: "country", typ: "" },
        { json: "country_gid", js: "country_gid", typ: "" },
        { json: "country_a", js: "country_a", typ: "" },
        { json: "macroregion", js: "macroregion", typ: "" },
        { json: "macroregion_gid", js: "macroregion_gid", typ: "" },
        { json: "region", js: "region", typ: "" },
        { json: "region_gid", js: "region_gid", typ: "" },
        { json: "region_a", js: "region_a", typ: "" },
        { json: "localadmin", js: "localadmin", typ: "" },
        { json: "localadmin_gid", js: "localadmin_gid", typ: "" },
        { json: "locality", js: "locality", typ: u(undefined, "") },
        { json: "locality_gid", js: "locality_gid", typ: u(undefined, "") },
        { json: "continent", js: "continent", typ: "" },
        { json: "continent_gid", js: "continent_gid", typ: "" },
        { json: "label", js: "label", typ: "" },
    ], false),
    "Geocoding": o([
        { json: "version", js: "version", typ: "" },
        { json: "attribution", js: "attribution", typ: "" },
        { json: "query", js: "query", typ: r("Query") },
        { json: "warnings", js: "warnings", typ: a("") },
        { json: "engine", js: "engine", typ: r("Engine") },
        { json: "timestamp", js: "timestamp", typ: 0 },
    ], false),
    "Engine": o([
        { json: "name", js: "name", typ: "" },
        { json: "author", js: "author", typ: "" },
        { json: "version", js: "version", typ: "" },
    ], false),
    "Query": o([
        { json: "text", js: "text", typ: "" },
        { json: "size", js: "size", typ: 0 },
        { json: "layers", js: "layers", typ: a("") },
        { json: "private", js: "private", typ: true },
        { json: "lang", js: "lang", typ: r("Lang") },
        { json: "querySize", js: "querySize", typ: 0 },
        { json: "parser", js: "parser", typ: "" },
        { json: "parsed_text", js: "parsed_text", typ: r("ParsedText") },
    ], false),
    "Lang": o([
        { json: "name", js: "name", typ: "" },
        { json: "iso6391", js: "iso6391", typ: "" },
        { json: "iso6393", js: "iso6393", typ: "" },
        { json: "via", js: "via", typ: "" },
        { json: "defaulted", js: "defaulted", typ: true },
    ], false),
    "ParsedText": o([
        { json: "city", js: "city", typ: "" },
    ], false),
};
