import Place from '../src/interfaces/Place';
import IllegalArgumentException from '../src/exceptions/IllegalArgumentException';
import APINotAvailableExeption from '../src/exceptions/APINotAvailableExeption';
import PlacesController from '../src/controller/PlacesController';
import MockAPIPlacesService from './helpers/MockApiPlacesService';
import InvalidCoordinatesException from '../src/exceptions/InvalidCoordinatesException';
import EmptyPlacesException from '../src/exceptions/EmptyPlacesException';
import PlaceNotFoundException from '../src/exceptions/PlaceNotFoundException';
import VehiclesController from '../src/controller/VehiclesController';
import VehicleAlreadyExistException from '../src/exceptions/VehicleAlreadyExistException';
import InvalidVehicleException from '../src/exceptions/InvalidVehicleException';
import Combustible from '../src/enums/Combustible';


var mockedApiService: MockAPIPlacesService = new MockAPIPlacesService();
var placesController: PlacesController = new PlacesController(mockedApiService);
var vehiclesController: VehiclesController = new VehiclesController();

describe('Pruebas de la Iteración 1', () => {
    describe('Places', () => {

        describe('HU05 - Como usuario quiero poder dar de alta un lugar de interés usando sus coordenadas para poder usarlo en una ruta.', () => {
            test('E01 - Se insertan unas coordenadas válidas con la API disponible y para las que existe un topónimo.', async () => {
                // Given
                placesController.setPlaces([{
                    Nombre: "Valencia",
                    Longitud: -0.3773900,
                    Latitud: 39.4697500,
                    Favorito: false,
                }]);
                // When
                placesController.addPlaceByCoords(
                    {
                        Longitud: -0.0576800,
                        Latitud: 39.9929000
                    }
                ).then(() => expect(placesController.getPlaces()).toHaveLength(2));
                // Then

            });

            test('E02 - Se insertan unas coordenadas válidas con la API disponible y para las que no existe un topónimo.', () => {
                // Given
                placesController.setPlaces([{
                    Nombre: "Valencia",
                    Longitud: -0.3773900,
                    Latitud: 39.4697500,
                    Favorito: false
                }]);
                // When
                placesController.addPlaceByCoords(
                    {
                        Longitud: -0.0576800,
                        Latitud: 39.9929000
                    }
                ).then(() => expect(placesController.getPlaces()).toHaveLength(2));
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


            test('E04 - La API no se encuentra disponible.', async () => {
                expect.assertions(1);
                // Given
                placesController.setPlaces([{
                    Nombre: "Valencia",
                    Longitud: -0.3773900,
                    Latitud: 39.4697500,
                    Favorito: false
                }]);
                // When

                await placesController.addPlaceByCoords({
                    Longitud: -0.0576800,
                    Latitud: 0,
                }).then(() => fail('Expected an error to be thrown')).catch((error) => expect(error).toBeInstanceOf(APINotAvailableExeption));

            });
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

                await placesController.addPlaceByToponym("1234").then(() => fail('Expected an error to be thrown')).catch((error) => expect(error).toBeInstanceOf(InvalidCoordinatesException));
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

    describe('Vehicles', () => {
        describe('HU09 - Dar de alta un vehículo', () => {
            test('E01 - Se añade un vehículo no registrado anteriormente con datos correctos.', () => {
                //Given
                vehiclesController.setVehicles([{
                    id: 1683,
                    Nombre: "Coche empresa",
                    propulsion: Combustible.Diesel,
                    consumo: 6,
                    Favorito: false,
                    Defecto: false
                }]);
                //When
                vehiclesController.addVehicle({
                    id: 1684,
                    Nombre: "Coche personal",
                    propulsion: Combustible.Gasolina,
                    consumo: 5.5,
                    Favorito: true,
                    Defecto: false
                })
                //Then
                expect(vehiclesController.getVehicles()).toStrictEqual([{
                    id: 1683,
                    Nombre: "Coche empresa",
                    propulsion: Combustible.Diesel,
                    consumo: 6,
                    Favorito: false,
                    Defecto: false
                },
                {
                    id: 1684,
                    Nombre: "Coche personal",
                    propulsion: Combustible.Gasolina,
                    consumo: 5.5,
                    Favorito: true,
                    Defecto: false
                }])
            });
            test('E02 - El vehículo ya se encuentra dado de alta.', () => {
                //Given
                vehiclesController.setVehicles([{
                    id: 1683,
                    Nombre: "Coche empresa",
                    propulsion: Combustible.Diesel,
                    consumo: 6,
                    Favorito: false,
                    Defecto: false
                }]);
                //When
                const error = () => {
                    vehiclesController.addVehicle({
                        id: 1683,
                        Nombre: "Coche empresa",
                        propulsion: Combustible.Diesel,
                        consumo: 6,
                        Favorito: false,
                        Defecto: false
                    });
                }
                //Then
                expect(error).toThrow(VehicleAlreadyExistException)
            });
            test('E03 - Los datos del vehículo no son correctos.', () => {
                //Given
                vehiclesController.setVehicles([{
                    id: 1683,
                    Nombre: "Coche empresa",
                    propulsion: Combustible.Diesel,
                    consumo: 6,
                    Favorito: false,
                    Defecto: false
                }])
                //When
                const error = () => {
                    vehiclesController.addVehicle({
                        id: "sdbs",
                        Nombre: "Coche empresa",
                        propulsion: Combustible.Caballo,
                        consumo: null,
                        Favorito: null,
                        Defecto: null
                    })
                }
                //Then
                expect(error).toThrow(InvalidVehicleException);
            });
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