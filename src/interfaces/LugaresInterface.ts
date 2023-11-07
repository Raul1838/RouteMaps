import Place from "./Place";

export default interface LugaresInterface {
    deletePlace(lugar : Place): Boolean;
    setPlaces(lugares: Place[]): Boolean;
    getPlaces(): Place[];
}