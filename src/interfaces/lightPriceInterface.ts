export interface LightPriceInterface {
    data:     Data;
    included: Included[];
}

export interface Data {
    type:       string;
    id:         string;
    attributes: DataAttributes;
    meta:       Meta;
}

export interface DataAttributes {
    title:         string;
    "last-update": Date;
    description:   null;
}

export interface Meta {
    "cache-control": CacheControl;
}

export interface CacheControl {
    cache: string;
}

export interface Included {
    type:       string;
    id:         string;
    groupId:    null;
    attributes: IncludedAttributes;
}

export interface IncludedAttributes {
    title:         string;
    description:   null;
    color:         string;
    type:          null;
    magnitude:     string;
    composite:     boolean;
    "last-update": Date;
    values:        Value[];
}

export interface Value {
    value:      number;
    percentage: number;
    datetime:   Date;
}
