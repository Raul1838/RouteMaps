export interface OpenRoutePostResponse {
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
    version:   string;
    buildDate: Date;
    graphDate: Date;
}

export interface Query {
    coordinates: Array<number[]>;
    profile:     string;
    preference:  string;
    format:      string;
}

export interface Route {
    summary:   Summary;
    segments:  Segment[];
    bbox:      number[];
    geometry:  string;
    wayPoints: number[];
    legs:      any[];
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
    wayPoints:   number[];
}

export interface Summary {
    distance: number;
    duration: number;
}
