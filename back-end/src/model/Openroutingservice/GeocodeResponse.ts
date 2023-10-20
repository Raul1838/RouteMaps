/**
 * 
 * GeocodeResponse
 * 
 */

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