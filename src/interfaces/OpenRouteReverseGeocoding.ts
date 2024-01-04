export interface OpenRouteReverseGeocoding {
    geocoding: Geocoding;
    type:      string;
    features:  Feature[];
    bbox:      number[];
}

export interface Feature {
    type:       FeatureType;
    geometry:   Geometry;
    properties: Properties;
    bbox?:      number[];
}

export interface Geometry {
    type:        GeometryType;
    coordinates: number[];
}

export enum GeometryType {
    Point = "Point",
}

export interface Properties {
    id:             string;
    gid:            string;
    layer:          Layer;
    source:         Source;
    sourceID:       string;
    name:           string;
    street?:        string;
    confidence:     number;
    distance:       number;
    accuracy:       Accuracy;
    country:        Country;
    countryGid:     CountryGid;
    countryA:       CountryA;
    macroregion:    Macroregion;
    macroregionGid: MacroregionGid;
    region:         Region;
    regionGid:      RegionGid;
    regionA:        RegionA;
    localadmin:     Localadmin;
    localadminGid:  LocaladminGid;
    continent:      Continent;
    continentGid:   ContinentGid;
    label:          string;
    addendum?:      Addendum;
}

export enum Accuracy {
    Centroid = "centroid",
    Point = "point",
}

export interface Addendum {
    osm: Osm;
}

export interface Osm {
    operator:      string;
    brand?:        string;
    website?:      string;
    phone?:        string;
    openingHours?: string;
}

export enum Continent {
    Europe = "Europe",
}

export enum ContinentGid {
    WhosonfirstContinent102191581 = "whosonfirst:continent:102191581",
}

export enum Country {
    Spain = "Spain",
}

export enum CountryA {
    Esp = "ESP",
}

export enum CountryGid {
    WhosonfirstCountry85633129 = "whosonfirst:country:85633129",
}

export enum Layer {
    Street = "street",
    Venue = "venue",
}

export enum Localadmin {
    CastellónDeLaPlanaCastellóDeLaPlana = "Castellón De La Plana/Castelló De La Plana",
}

export enum LocaladminGid {
    WhosonfirstLocaladmin404333187 = "whosonfirst:localadmin:404333187",
}

export enum Macroregion {
    ValencianCommunity = "Valencian Community",
}

export enum MacroregionGid {
    WhosonfirstMacroregion404227381 = "whosonfirst:macroregion:404227381",
}

export enum Region {
    Castellon = "Castellon",
}

export enum RegionA {
    Vc = "VC",
}

export enum RegionGid {
    WhosonfirstRegion85682685 = "whosonfirst:region:85682685",
}

export enum Source {
    Openstreetmap = "openstreetmap",
}

export enum FeatureType {
    Feature = "Feature",
}

export interface Geocoding {
    version:     string;
    attribution: string;
    query:       Query;
    engine:      Engine;
    timestamp:   number;
}

export interface Engine {
    name:    string;
    author:  string;
    version: string;
}

export interface Query {
    size:              number;
    private:           boolean;
    pointLat:          number;
    pointLon:          number;
    boundaryCircleLat: number;
    boundaryCircleLon: number;
    lang:              Lang;
    querySize:         number;
}

export interface Lang {
    name:      string;
    iso6391:   string;
    iso6393:   string;
    via:       string;
    defaulted: boolean;
}
