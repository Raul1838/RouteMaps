export default interface GetPlaceByCoord {
    data: Data;
    status: number;
    statusText: string;
    headers: AxiosResponseHeaders;
    config: Config;
    request: Request;
}

export interface Config {
    transitional: Transitional;
    adapter: string[];
    transformRequest: null[];
    transformResponse: null[];
    timeout: number;
    xsrfCookieName: string;
    xsrfHeaderName: string;
    maxContentLength: number;
    maxBodyLength: number;
    env: Request;
    headers: ConfigHeaders;
    baseURL: string;
    method: string;
    url: string;
}

export interface Request {
}

export interface ConfigHeaders {
    Accept: string;
}

export interface Transitional {
    silentJSONParsing: boolean;
    forcedJSONParsing: boolean;
    clarifyTimeoutError: boolean;
}

export interface Data {
    geocoding: Geocoding;
    type: string;
    features: Feature[];
    bbox: number[];
}

export interface Feature {
    type: FeatureType;
    geometry: Geometry;
    properties: Properties;
    bbox?: number[];
}

export interface Geometry {
    type: GeometryType;
    coordinates: number[];
}

export enum GeometryType {
    Point = "Point",
}

export interface Properties {
    id: string;
    gid: string;
    layer: Layer;
    source: Source;
    source_id: string;
    name: string;
    street?: string;
    confidence: number;
    distance: number;
    accuracy: Accuracy;
    country: Country;
    country_gid: CountryGid;
    country_a: CountryA;
    macroregion: Macroregion;
    macroregion_gid: MacroregionGid;
    region: Localadmin;
    region_gid: RegionGid;
    region_a: RegionA;
    localadmin: Localadmin;
    localadmin_gid: LocaladminGid;
    locality: Localadmin;
    locality_gid: LocalityGid;
    neighbourhood: Neighbourhood;
    neighbourhood_gid: NeighbourhoodGid;
    continent: Continent;
    continent_gid: ContinentGid;
    label: string;
    addendum?: Addendum;
    housenumber?: string;
    postalcode?: string;
}

export enum Accuracy {
    Centroid = "centroid",
    Point = "point",
}

export interface Addendum {
    osm: Osm;
}

export interface Osm {
    wikidata?: string;
    wikipedia?: string;
    operator?: string;
    opening_hours?: string;
    wheelchair?: string;
    website?: string;
    brand?: string;
}

export enum Continent {
    Europa = "Europa",
}

export enum ContinentGid {
    WhosonfirstContinent102191581 = "whosonfirst:continent:102191581",
}

export enum Country {
    España = "España",
}

export enum CountryA {
    Esp = "ESP",
}

export enum CountryGid {
    WhosonfirstCountry85633129 = "whosonfirst:country:85633129",
}

export enum Layer {
    Address = "address",
    Street = "street",
    Venue = "venue",
}

export enum Localadmin {
    Valencia = "Valencia",
}

export enum LocaladminGid {
    WhosonfirstLocaladmin404345361 = "whosonfirst:localadmin:404345361",
}

export enum LocalityGid {
    WhosonfirstLocality101748241 = "whosonfirst:locality:101748241",
}

export enum Macroregion {
    ComunidadValenciana = "Comunidad Valenciana",
}

export enum MacroregionGid {
    WhosonfirstMacroregion404227381 = "whosonfirst:macroregion:404227381",
}

export enum Neighbourhood {
    CiudadVieja = "Ciudad Vieja",
}

export enum NeighbourhoodGid {
    WhosonfirstNeighbourhood85864217 = "whosonfirst:neighbourhood:85864217",
}

export enum RegionA {
    Vc = "VC",
}

export enum RegionGid {
    WhosonfirstRegion85682867 = "whosonfirst:region:85682867",
}

export enum Source {
    Openstreetmap = "openstreetmap",
}

export enum FeatureType {
    Feature = "Feature",
}

export interface Geocoding {
    version: string;
    attribution: string;
    query: Query;
    engine: Engine;
    timestamp: number;
}

export interface Engine {
    name: string;
    author: string;
    version: string;
}

export interface Query {
    size: number;
    private: boolean;
    "point.lat": number;
    "point.lon": number;
    "boundary.circle.lat": number;
    "boundary.circle.lon": number;
    lang: Lang;
    querySize: number;
}

export interface Lang {
    name: string;
    iso6391: string;
    iso6393: string;
    via: string;
    defaulted: boolean;
}

export interface AxiosResponseHeaders {
    "cache-control": string;
    "content-length": string;
    "content-type": string;
    "x-ratelimit-limit": string;
    "x-ratelimit-remaining": string;
    "x-ratelimit-reset": string;
}