export interface PreciodelaluzControllerInterface {
    getLightPrice(req : any): Promise<Number | any>;
}