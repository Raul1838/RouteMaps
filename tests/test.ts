import PlaceNotFoundException from '../src/exceptions/PlaceNotFoundException';
import EmptyPlacesException from '../src/exceptions/EmptyPlacesException';
import PlacesController from '../src/controller/PlacesController';


var placesController: PlacesController = new PlacesController();

describe('Pruebas de la Iteración 1', () => {
    describe('Places', () => {

        describe('HU05 - Como usuario quiero poder dar de alta un lugar de interés usando sus coordenadas para poder usarlo en una ruta.', () => {
            test.todo('E01 - Se insertan unas coordenadas válidas con la API disponible y para las que existe un topónimo.');
            test.todo('E02 - Se insertan unas coordenadas válidas con la API disponible y para las que no existe un topónimo.');
            test.todo('E03 - Las coordenadas insertadas no son válidas.');
            test.todo('E04 - La API no se encuentra disponible.');
        });
        describe('HU06 - Dar de alta un lugar de interés con topónimo', () => {
            test.todo('Se insertan unas coordenadas válidas.');
            test.todo('Las coordenadas insertadas no son válidas.');
        });
        describe('HU07 - Consultar lista de lugares de interés', () => {
            test.todo('Existe una lista con lugares dados de alta.');
            test.todo('No contamos con una lista con lugares dados de alta.');
        });
        describe('HU08 - Eliminar un lugar de interés', () => {
            test('E01 - Existe el lugar que se quiere eliminar y está dado de alta en la lista de lugares de interés.', () => {
                //Given
                placesController.setPlaces([{
                    Nombre: "Valencia",
                    Longitud: -0.3773900,
                    Latitud: 39.4697500,
                    Favorito: false
                },
                {
                    Nombre: "Castellón",
                    Longitud: -0.0576800,
                    Latitud: 39.9929000,
                    Favorito: false
                }]);
                //When
                placesController.deletePlace({Nombre: "Castellón", Longitud: -0.0576800, Latitud: 39.9929000, Favorito: false })
                //Then
                expect(placesController.getPlaces()).toStrictEqual([{
                    Nombre: "Valencia",
                    Longitud: -0.3773900,
                    Latitud: 39.4697500,
                    Favorito: false
                }]);
            });
            test('E02 - Hay lugares dados de alta, pero no se encuentra el que se quiere eliminar.', () => {
                //Given
                placesController.setPlaces([{
                    Nombre: "Valencia",
                    Longitud: -0.3773900,
                    Latitud: 39.4697500,
                    Favorito: false
                }]);
                //When
                const error = () => {
                    placesController.deletePlace({Nombre: "Castellón", Longitud: -0.0576800, Latitud: 39.9929000, Favorito: false });
                }
                //Then
                expect(error).toThrow(PlaceNotFoundException);
            });
            test('E03 - No contamos con una lista con lugares dados de alta.', () => {
                //Given
                placesController.setPlaces([]);
                //When
                const error = () => {
                    placesController.deletePlace({Nombre: "Castellón", Longitud: -0.0576800, Latitud: 39.9929000, Favorito: false });
                }
                //Then
                expect(error).toThrow(EmptyPlacesException);
            });
        });
    });

    describe('Vehicles', () => {
        describe('HU09 - Dar de alta un vehículo', () => {
            test.todo('Se añade un vehículo no registrado anteriormente con datos correctos.');
            test.todo('El vehículo ya se encuentra dado de alta.');
            test.todo('Los datos del vehículo no son correctos.');
        });
        describe('HU10 - Consultar lista de vehículos', () => {
            test.todo('Existe una lista con vehículos dados de alta.');
            test.todo('No contamos con una lista con vehículos dados de alta.');
        });
        describe('HU11 - Eliminar un vehículo', () => {
            test.todo('Existe una lista con vehículos dados de alta y existe el vehículo que se quiere eliminar.');
            test.todo('Existe una lista con vehículos dados de alta pero no existe el vehículo que se quiere eliminar.');
            test.todo('No hay vehículos dados de alta.');

        });
        describe('HU12 - Modificar datos de un vehículo', () => {
            test.todo('Existe una lista con vehículos dados de alta y existe el vehículo que se quiere modificar.');
            test.todo('Existe una lista con vehículos dados de alta pero no existe el vehículo que se quiere modificar.');
            test.todo('No hay vehículos dados de alta.');

        });
    });
});