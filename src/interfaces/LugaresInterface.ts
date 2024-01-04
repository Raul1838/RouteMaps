import { Coords } from "./Coords";
import Place from "./Place";

export default interface LugaresInterface {
    addPlaceByCoords(coordenadas: Coords, userId?: string | undefined): Promise<void>;
    addPlaceByToponym(placeName?: string | undefined, coordenadas?: Coords | undefined, userId?: string | undefined): Promise<void>;
    setPlaces(places: Place[]): void;
    getPlaces(): Place[];
    deletePlace(paramPlace: Place, userId?: string | undefined): Promise<void>;
    toggleFavourite({ Longitud, Latitud }: { Longitud: number, Latitud: number }, userId: string | undefined): void;

}