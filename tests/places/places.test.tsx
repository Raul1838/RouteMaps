import PlacesController from "../../src/controller/PlacesController";
import APINotAvailableExeption from "../../src/exceptions/APINotAvailableExeption";
import EmptyPlacesException from "../../src/exceptions/EmptyPlacesException";
import IllegalArgumentException from "../../src/exceptions/IllegalArgumentException";
import InvalidToponymException from "../../src/exceptions/InvalidToponymException";
import PlaceNotFoundException from "../../src/exceptions/PlaceNotFoundException";
import Place from "../../src/interfaces/Place";
import APIPlacesService from "../../src/api/APIPlacesService";

var realApiService: APIPlacesService = new APIPlacesService();
var placesController: PlacesController = new PlacesController(realApiService);


describe('Tests sobre los lugares', () => {

    describe('HU05 - Como usuario quiero poder dar de alta un lugar de interés usando sus coordenadas para poder usarlo en una ruta.', () => {
        test('E01 - Se insertan unas coordenadas válidas con la API disponible y para las que existe un topónimo.', async () => {
            // Given
            expect.assertions(1);
            placesController.setPlaces([{
                Nombre: "Valencia",
                Longitud: -0.3773900,
                Latitud: 39.4697500,
                Favorito: false,
            }]);
            // When
            await placesController.addPlaceByCoords(
                {
                    Longitud: -0.0576800,
                    Latitud: 39.9929000
                }
            ).then(() => expect(placesController.getPlaces()).toHaveLength(2));
            // Then

        });

        test('E02 - Se insertan unas coordenadas válidas con la API disponible y para las que no existe un topónimo.', async () => {
            // Given
            expect.assertions(1);
            placesController.setPlaces([{
                Nombre: "Valencia",
                Longitud: -0.3773900,
                Latitud: 39.4697500,
                Favorito: false
            }]);
            // When
            await placesController.addPlaceByCoords(
                {
                    Longitud: -0.0576800,
                    Latitud: 39.9929000
                }
            ).then(() => {
                expect(placesController.getPlaces()).toHaveLength(2);
            });
            // Then

        });

        test('E03 - Las coordenadas insertadas no son válidas.', async () => {
            // Given
            expect.assertions(1);
            placesController.setPlaces([{
                Nombre: "Valencia",
                Longitud: -0.3773900,
                Latitud: 39.4697500,
                Favorito: false
            }]);

            // When
            await placesController.addPlaceByCoords({
                Longitud: -0.0576800,
                Latitud: "adfd"
            }).then(() => fail('Expected an error to be thrown')).catch((error) => expect(error).toBeInstanceOf(IllegalArgumentException));
            // If no error is thrown, fail the test

        });


        // test('E04 - La API no se encuentra disponible.', async () => {
        //     expect.assertions(1);
        //     // Given
        //     placesController.setPlaces([{
        //         Nombre: "Valencia",
        //         Longitud: -0.3773900,
        //         Latitud: 39.4697500,
        //         Favorito: false
        //     }]);
        //     // When

        //     await placesController.addPlaceByCoords({
        //         Longitud: -0.0576800,
        //         Latitud: 0,
        //     }).then(() => fail('Expected an error to be thrown')).catch((error) => expect(error).toBeInstanceOf(APINotAvailableExeption));

        // });
    });


    describe('HU06 - Dar de alta un lugar de interés con topónimo', () => {
        test('E01 - Se insertan unas coordenadas válidas.', () => {
            // Given
            placesController.setPlaces([
                {
                    Nombre: "Valencia",
                    Longitud: -0.3773900,
                    Latitud: 39.4697500,
                    Favorito: false
                }
            ]);
            // When

            placesController.addPlaceByToponym("Castellón").then(() =>
                expect(placesController.getPlaces()).toHaveLength(2)
            );
        });

        test('E02 - Las coordenadas insertadas no son válidas.', async () => {
            //Given
            expect.assertions(1);
            var lugares: Place[] = [
                {
                    Nombre: "Valencia",
                    Longitud: -0.3773900,
                    Latitud: 39.4697500,
                    Favorito: false
                }]
            //When

            await placesController.addPlaceByToponym("1234").then(() => fail('Expected an error to be thrown')).catch((error) => expect(error).toBeInstanceOf(InvalidToponymException));
            // If no error is thrown, fail the test;

        });
    });
    describe('HU07 - Consultar lista de lugares de interés', () => {
        test('E01 - Existe una lista con lugares dados de alta.', () => {
            //Given
            placesController.setPlaces([
                {
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
            var lugares: Place[] = placesController.getPlaces();
            //Then
            expect(lugares).toStrictEqual([
                {
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
                placesController.deletePlace({ Nombre: "Castellón", Longitud: -0.0576800, Latitud: 39.9929000, Favorito: false })
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
                    placesController.deletePlace({ Nombre: "Castellón", Longitud: -0.0576800, Latitud: 39.9929000, Favorito: false });
                }
                //Then
                expect(error).toThrow(PlaceNotFoundException);
            });
            test('E03 - No contamos con una lista con lugares dados de alta.', () => {
                //Given
                placesController.setPlaces([]);
                //When
                const error = () => {
                    var lugares: Place[] = placesController.getPlaces();
                    placesController.deletePlace({ Nombre: "Castellón", Longitud: -0.0576800, Latitud: 39.9929000, Favorito: false });
                }
                //Then
                expect(error).toThrow(EmptyPlacesException);
            });
        });
    });
});