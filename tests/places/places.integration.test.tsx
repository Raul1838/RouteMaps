import Place from "../../src/interfaces/Place";
import { getPlacesController, PlacesController } from "../../src/controller/PlacesController";
import { UserModel } from "../../src/interfaces/UserModel";
import { AuthController, getAuthController } from "../../src/controller/AuthController";
import APINotAvailableExeption from "../../src/exceptions/APINotAvailableExeption";
import APIPlacesService from "../../src/api/APIPlacesService";
import { openRouteApi } from "../../src/api/openRouteApi";
import { PlaceException, PlaceExceptionMessages } from "../../src/exceptions/PlaceException";
import { FirebaseService } from "../../src/services/FirebaseService";




describe('Tests sobre los lugares', () => {
    const placesController: PlacesController = getPlacesController();
    const authController: AuthController = getAuthController();
    const apiService: APIPlacesService = new APIPlacesService();

    const place1: Place = {
        Nombre: "Valencia",
        Longitud: -0.3773900,
        Latitud: 39.4697500,
        Favorito: false,
    };

    const place2: Place = {
        Nombre: "Castellón de la Plana",
        Longitud: -0.2773900,
        Latitud: 38.4697500,
        Favorito: false,
    };

    let firebaseService: FirebaseService;
    const testUser = {
        email: 'usuario.permanente@test.com',
        password: '123456789',
    }
    var loggedUser: UserModel;

    beforeAll(async () => {
        loggedUser = await authController.loginWithEmailAndPassword(testUser.email, testUser.password);
        firebaseService = new FirebaseService();
    });

    beforeEach(() => jest.clearAllMocks());


    describe('HU05 - Como usuario quiero poder dar de alta un lugar de interés usando sus coordenadas para poder usarlo en una ruta.', () => {
        test('E01 - Se insertan unas coordenadas válidas con la API disponible y para las que existe un topónimo.', async () => {
            // Given

            jest.spyOn(placesController.getApiService(), 'getPlaceByCoord').mockResolvedValue({
                Latitud: 39.9929000,
                Longitud: -0.0576800,
                Nombre: "Castellón",
                Favorito: false
            });


            jest.spyOn(firebaseService, 'replacePlaces').mockResolvedValue();
            jest.spyOn(firebaseService, 'getPlaces').mockResolvedValue({ places: [place1] })

            expect.assertions(1);


            await placesController.replacePlaces([], loggedUser.uid);
            // When
            await placesController.addPlaceByCoords(
                {
                    lon: -0.0576800,
                    lat: 39.9929000
                }, loggedUser.uid
            );
            const places = await placesController.getPlaces(loggedUser.uid);
            expect(places).toHaveLength(1);
        });

        test('E02 - Se insertan unas coordenadas válidas con la API disponible y para las que no existe un topónimo.', async () => {
            // Given
            jest.spyOn(placesController.getApiService(), 'getPlaceByCoord').mockResolvedValue({
                Latitud: 39.9929000,
                Longitud: -0.0576800,
                Nombre: "none",
                Favorito: false
            });

            expect.assertions(1);

            jest.spyOn(firebaseService, 'replacePlaces').mockResolvedValue();
            jest.spyOn(firebaseService, 'getPlaces').mockResolvedValue({ places: [place1, place2] })

            await placesController.replacePlaces([{
                Nombre: "Valencia",
                Longitud: -0.3773900,
                Latitud: 39.4697500,
                Favorito: false
            }], loggedUser.uid);
            // When
            await placesController.addPlaceByCoords(
                {
                    lon: -0.0576800,
                    lat: 39.9929000
                }, loggedUser.uid
            );

            expect(await placesController.getPlaces(loggedUser.uid)).toHaveLength(2);


        });

        test('E03 - Las coordenadas insertadas no son válidas.', async () => {
            // Given
            jest.spyOn(placesController.getApiService(), 'getPlaceByCoord').mockResolvedValue({
                Latitud: 39.9929000,
                Longitud: -0.0576800,
                Nombre: "none",
                Favorito: false
            });

            jest.spyOn(firebaseService, 'replacePlaces').mockResolvedValue();
            jest.spyOn(firebaseService, 'getPlaces').mockRejectedValue(new PlaceException(PlaceExceptionMessages.IllegalArgument));

            expect.assertions(2);
            await placesController.replacePlaces([{
                Nombre: "Valencia",
                Longitud: -0.3773900,
                Latitud: 39.4697500,
                Favorito: false
            }], loggedUser.uid);

            // When
            try {
                await placesController.addPlaceByCoords({
                    lon: -0.0576800,
                    lat: "adfd"
                }, loggedUser.uid);
                fail('Expected an error to be thrown');
            } catch (error) {
                expect(error).toBeInstanceOf(PlaceException);
                expect(error.message).toBe(PlaceExceptionMessages.IllegalArgument);
            };
        });

    });
    // If no error is thrown, fail the test




    test('E04 - La API no se encuentra disponible.', async () => {
        jest.spyOn(placesController.getApiService(), 'getPlaceByCoord').mockRejectedValue(new APINotAvailableExeption());
        expect.assertions(1);
        // Given
        await placesController.replacePlaces([{
            Nombre: "Valencia",
            Longitud: -0.3773900,
            Latitud: 39.4697500,
            Favorito: false
        }], loggedUser.uid);
        // When

        try {
            await placesController.addPlaceByCoords({
                lon: -0.0576800,
                lat: 0,
            }, loggedUser.uid);
            fail('Expected an error to be thrown');
        } catch (error) { expect(error).toBeInstanceOf(APINotAvailableExeption) }

    });



    describe('HU06 - Dar de alta un lugar de interés con topónimo', () => {
        test('E01 - Se insertan unas coordenadas válidas.', async () => {
            // Given
            jest.spyOn(placesController.getOpenRouteService(), 'getCoordinatesFromPlaceName').mockResolvedValue({
                lat: 39.9929000,
                lon: -0.0576800,
                name: "none"
            });

            jest.spyOn(firebaseService, 'replacePlaces').mockResolvedValue();
            jest.spyOn(firebaseService, 'getPlaces').mockResolvedValue({ places: [place1, place2] })

            await placesController.replacePlaces([
                {
                    Nombre: "Valencia",
                    Longitud: -0.3773900,
                    Latitud: 39.4697500,
                    Favorito: false
                }
            ], loggedUser.uid);
            // When

            await placesController.addPlaceByToponym("Castellón", false, loggedUser.uid);
            expect(await placesController.getPlaces(loggedUser.uid)).toHaveLength(2)

        });

        test('E02 - Las coordenadas insertadas no son válidas.', async () => {
            //Given
            jest.spyOn(placesController.getOpenRouteService(), 'getCoordinatesFromPlaceName').mockRejectedValue(new PlaceException(PlaceExceptionMessages.InvalidToponym));

            expect.assertions(2);
            var lugares: Place[] = [
                {
                    Nombre: "Valencia",
                    Longitud: -0.3773900,
                    Latitud: 39.4697500,
                    Favorito: false
                }]
            //When
            try {
                await placesController.addPlaceByToponym("1234", false, loggedUser.uid);
                fail('Expected an error to be thrown')
            } catch (error) {
                expect(error).toBeInstanceOf(PlaceException);
                expect(error.message).toBe(PlaceExceptionMessages.InvalidToponym)
            };
        });
    });
    describe('HU07 - Consultar lista de lugares de interés', () => {
        test('E01 - Existe una lista con lugares dados de alta.', async () => {
            //Given

            jest.spyOn(firebaseService, 'replacePlaces').mockResolvedValue();
            jest.spyOn(firebaseService, 'getPlaces').mockResolvedValue({ places: [place1, place2] })

            await placesController.replacePlaces([
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
                }], loggedUser.uid);
            //When
            const lugares: Place[] = await placesController.getPlaces(loggedUser.uid);
            //Then
            expect(lugares).toHaveLength(2);
        });
    });
    describe('HU08 - Eliminar un lugar de interés', () => {
        test('E01 - Existe el lugar que se quiere eliminar y está dado de alta en la lista de lugares de interés.', async () => {
            //Given

            jest.spyOn(firebaseService, 'replacePlaces').mockResolvedValue();
            jest.spyOn(firebaseService, 'deletePlace').mockResolvedValue();
            jest.spyOn(firebaseService, 'getPlaces').mockResolvedValue({
                places: [{
                    Nombre: "Valencia",
                    Longitud: -0.3773900,
                    Latitud: 39.4697500,
                    Favorito: false
                }]
            })

            await placesController.replacePlaces([{
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
            }], loggedUser.uid);
            //When
            await placesController.deletePlace({ Nombre: "Castellón", Longitud: -0.0576800, Latitud: 39.9929000, Favorito: false }, loggedUser.uid)
            //Then
            expect(await placesController.getPlaces(loggedUser.uid)).toStrictEqual([{
                Nombre: "Valencia",
                Longitud: -0.3773900,
                Latitud: 39.4697500,
                Favorito: false
            }]);
        });
        test('E02 - Hay lugares dados de alta, pero no se encuentra el que se quiere eliminar.', async () => {
            //Given
            expect.assertions(2);

            jest.spyOn(firebaseService, 'replacePlaces').mockResolvedValue();
            jest.spyOn(firebaseService, 'deletePlace').mockRejectedValue(new PlaceException(PlaceExceptionMessages.PlaceNotFound));
            jest.spyOn(firebaseService, 'getPlaces').mockRejectedValue(new Error());

            await placesController.replacePlaces([{
                Nombre: "Valencia",
                Longitud: -0.3773900,
                Latitud: 39.4697500,
                Favorito: false
            }], loggedUser.uid);
            //When
            try {
                await placesController.deletePlace({ Nombre: "Castellón", Longitud: -0.0576800, Latitud: 39.9929000, Favorito: false }, loggedUser.uid);
            } catch (error) {
                expect(error).toBeInstanceOf(PlaceException);
                expect(error.message).toBe(PlaceExceptionMessages.PlaceNotFound);
            }
        });
        test('E03 - No contamos con una lista con lugares dados de alta.', async () => {
            //Given
            expect.assertions(2);

            jest.spyOn(firebaseService, 'replacePlaces').mockResolvedValue();
            jest.spyOn(firebaseService, 'deletePlace').mockRejectedValue(new PlaceException(PlaceExceptionMessages.EmptyPlaces));
            jest.spyOn(firebaseService, 'getPlaces').mockRejectedValue(new Error());

            await placesController.replacePlaces([], loggedUser.uid);
            //When
            try {
                await placesController.deletePlace({ Nombre: "Castellón", Longitud: -0.0576800, Latitud: 39.9929000, Favorito: false }, loggedUser.uid);
            } catch (error) {
                expect(error).toBeInstanceOf(PlaceException);
                expect(error.message).toBe(PlaceExceptionMessages.EmptyPlaces);
            }
        });
    });

    describe('HU20 - Como usuario quiero poder marcar como favoritos lugares de interés para que aparezcan los primeros cuando los listo.', () => {
        test('E01 - Existe una lista con lugares dados de alta y existe el lugar que se quiere marcar como favorito.', async () => {
            //Given

            jest.spyOn(firebaseService, 'replacePlaces').mockResolvedValue();
            jest.spyOn(firebaseService, 'storePlace').mockResolvedValue([place1]);
            jest.spyOn(firebaseService, 'getPlaces').mockResolvedValue({
                places: [
                    {
                        Nombre: 'Valencia',
                        Longitud: -0.3773900,
                        Latitud: 39.4697500,
                        Favorito: true
                    }, {
                        Nombre: 'Castellón',
                        Longitud: -0.0576800,
                        Latitud: 39.9929000,
                        Favorito: false
                    }]
            })

            await placesController.replacePlaces([
                {
                    Nombre: 'Valencia',
                    Longitud: -0.3773900,
                    Latitud: 39.4697500,
                    Favorito: false
                }, {
                    Nombre: 'Castellón',
                    Longitud: -0.0576800,
                    Latitud: 39.9929000,
                    Favorito: false
                }], loggedUser.uid);

            //When
            await placesController.toggleFavourite({ Longitud: -0.3773900, Latitud: 39.4697500 }, loggedUser.uid);

            //Then
            expect(await placesController.getPlaces(loggedUser.uid)).toStrictEqual([
                {
                    Nombre: 'Valencia',
                    Longitud: -0.3773900,
                    Latitud: 39.4697500,
                    Favorito: true
                }, {
                    Nombre: 'Castellón',
                    Longitud: -0.0576800,
                    Latitud: 39.9929000,
                    Favorito: false
                }]);
        });
        test('E02 - Existe una lista con lugares dados de alta y no existe el lugar que se quiere marcar como favorito.', async () => {
            //Given
            expect.assertions(2);

            jest.spyOn(firebaseService, 'replacePlaces').mockResolvedValue();
            jest.spyOn(firebaseService, 'storePlace').mockRejectedValue(new PlaceException(PlaceExceptionMessages.PlaceNotFound));
            jest.spyOn(firebaseService, 'getPlaces').mockRejectedValue(new Error());

            await placesController.replacePlaces([
                {
                    Nombre: 'Castellón',
                    Longitud: -0.0576800,
                    Latitud: 39.9929000,
                    Favorito: false
                }], loggedUser.uid);

            //When
            try {
                await placesController.toggleFavourite({ Longitud: -0.3773900, Latitud: 39.4697500 }, loggedUser.uid);
            } catch (error) {
                expect(error).toBeInstanceOf(PlaceException);
                expect(error.message).toBe(PlaceExceptionMessages.PlaceNotFound);
            }
        });
        test('E03 - No hay lugares dados de alta.', async () => {
            //Given
            expect.assertions(2);

            jest.spyOn(firebaseService, 'replacePlaces').mockResolvedValue();
            jest.spyOn(firebaseService, 'storePlace').mockRejectedValue(new PlaceException(PlaceExceptionMessages.EmptyPlaces));
            jest.spyOn(firebaseService, 'getPlaces').mockRejectedValue(new Error());

            await placesController.replacePlaces([], loggedUser.uid);

            try {
                await placesController.toggleFavourite({ Longitud: -0.3773900, Latitud: 39.4697500 }, loggedUser.uid);
            } catch (error) {
                expect(error).toBeInstanceOf(PlaceException);
                expect(error.message).toBe(PlaceExceptionMessages.EmptyPlaces);
            }
        });
    })
});