/**
 * 
 * DirectionsResponse
 * 
 */

export interface DirectionsResponse {
    bbox:     number[];
    metadata: Metadata;
    routes:   Route[];
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
    build_date: Date;
    graph_date: Date;
}

export interface Query {
    coordinates: Array<number[]>;
    profile:     string;
    preference:  string;
    format:      string;
}

export interface Route {
    summary:    Summary;
    segments:   Segment[];
    bbox:       number[];
    geometry:   string;
    way_points: number[];
    legs:       any[];
}

export interface Segment {
    distance: number;
    duration: number;
    steps:    Step[];
}

export interface Step {
    distance:    number;
    duration:    number;
    type:        number;
    instruction: string;
    name:        string;
    way_points:  number[];
}

export interface Summary {
    distance: number;
    duration: number;
}
/**
 * 
 * ErrorResponse
 * 
 */

export interface ErrorResponse {
    error: Error;
    info:  Info;
}

export interface Error {
    code:    number;
    message: string;
}

export interface Info {
    engine:    Engine;
    timestamp: number;
}

export interface Engine {
    build_date: Date;
    version:    string;
}