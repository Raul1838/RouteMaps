export interface OpenRoutingPostCall {
    bbox:     number[];
    routes:   Route[];
    metadata: Metadata;
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