export interface APIRouteModel {
    type:     string;
    metadata: Metadata;
    features: Feature[];
    bbox:     number[];
}

export interface Feature {
    bbox:       number[];
    type:       string;
    properties: Properties;
    geometry:   Geometry;
}

export interface Geometry {
    coordinates: Array<number[]>;
    type:        string;
}

export interface Properties {
    transfers:  number;
    fare:       number;
    segments:   Segment[];
    summary:    Summary;
    way_points: number[];
}

export interface Segment {
    distance: number;
    duration: number;
    steps:    Step[];
}

export interface Step {
    distance:     number;
    duration:     number;
    type:         number;
    instruction:  string;
    name:         string;
    way_points:   number[];
    exit_number?: number;
}

export interface Summary {
    distance: number;
    duration: number;
}

export interface Metadata {
    attribution: string;
    service:     string;
    timestamp:   number;
    query:       Query;
    engine:      Engine;
}

export interface Engine {
    version:    string;
    build_date: string;
    graph_date: string;
}

export interface Query {
    coordinates: Array<number[]>;
    profile:     string;
    format:      string;
}