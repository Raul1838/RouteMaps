export interface OpenrouteserviceControllerInterface {
    getGeocode(req: any): Promise<Number[]>;
}