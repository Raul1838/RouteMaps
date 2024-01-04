import Place from "../../src/interfaces/Place";
import { getPlacesController, PlacesController } from "../../src/controller/PlacesController";
import { UserModel } from "../../src/interfaces/UserModel";
import { AuthController, getAuthController } from "../../src/controller/AuthController";
import APINotAvailableExeption from "../../src/exceptions/APINotAvailableExeption";
import APIPlacesService from "../../src/api/APIPlacesService";
import { openRouteApi } from "../../src/api/openRouteApi";
import { PlaceException, PlaceExceptionMessages } from "../../src/exceptions/PlaceException";


const placesController: PlacesController = getPlacesController();
const authController: AuthController = getAuthController();
const apiService: APIPlacesService = new APIPlacesService();
const testUser = {
    email: 'usuario.permanente@test.com',
    password: '123456789',
}

describe('Tests sobre los lugares', () => {


    describe('HU05 - Como usuario quiero poder dar de alta un lugar de interés usando sus coordenadas para poder usarlo en una ruta.', () => {
        test('E01 - Se insertan unas coordenadas válidas con la API disponible y para las que existe un topónimo.', async () => {
            // Given
            const loggedUser = await authController.loginWithEmailAndPassword(testUser.email, testUser.password);


            await placesController.replacePlaces([{
                Nombre: "Valencia",
                Longitud: -0.3773900,
                Latitud: 39.4697500,
                Favorito: false,
            }], loggedUser.uid);
            // When
            await placesController.addPlaceByCoords(
                {
                    lon: -0.0576800,
                    lat: 39.9929000
                }, loggedUser.uid
            );
            const places = await placesController.getPlaces(loggedUser.uid);
            expect(places).toHaveLength(2);
            await authController.logout();
        }, 60000);

        test('E02 - Se insertan unas coordenadas válidas con la API disponible y para las que no existe un topónimo.', async () => {
            // Given
            const loggedUser = await authController.loginWithEmailAndPassword(testUser.email, testUser.password);


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
            const places = await placesController.getPlaces(loggedUser.uid);
            expect(places).toHaveLength(2);
            await authController.logout();
        }, 60000);

        test('E03 - Las coordenadas insertadas no son válidas.', async () => {
            // Given
            const loggedUser = await authController.loginWithEmailAndPassword(testUser.email, testUser.password);


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
                throw new Error('Debería saltar una excepción');
            }
            catch (error) {
                expect(error).toBeInstanceOf(PlaceException);
                expect(error.message).toBe(PlaceExceptionMessages.IllegalArgument);
                await authController.logout();
            }
        }, 60000);
    });


    describe('HU06 - Dar de alta un lugar de interés con topónimo', () => {
        test('E01 - Se insertan unas coordenadas válidas.', async () => {
            // Given
            const loggedUser = await authController.loginWithEmailAndPassword(testUser.email, testUser.password);

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
            const places = await placesController.getPlaces(loggedUser.uid);
            expect(places).toHaveLength(2);
            await authController.logout();

        }, 60000);

        test('E02 - Las coordenadas insertadas no son válidas.', async () => {
            //Given
            const loggedUser = await authController.loginWithEmailAndPassword(testUser.email, testUser.password);


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
                fail('Expected an error to be thrown');
            } catch (error) {
                expect(error).toBeInstanceOf(PlaceException);
                expect(error.message).toBe(PlaceExceptionMessages.InvalidToponym)
                await authController.logout();
            };
        }, 60000);
    });
    describe('HU07 - Consultar lista de lugares de interés', () => {
        test('E01 - Existe una lista con lugares dados de alta.', async () => {
            //Given
            const loggedUser = await authController.loginWithEmailAndPassword(testUser.email, testUser.password);

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
            var lugares: Place[] = await placesController.getPlaces(loggedUser.uid);
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
            await authController.logout();
        }, 60000);
    });
    describe('HU08 - Eliminar un lugar de interés', () => {
        test('E01 - Existe el lugar que se quiere eliminar y está dado de alta en la lista de lugares de interés.', async () => {
            //Given
            const loggedUser = await authController.loginWithEmailAndPassword(testUser.email, testUser.password);

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
            await authController.logout();
        }, 60000);
        test('E02 - Hay lugares dados de alta, pero no se encuentra el que se quiere eliminar.', async () => {
            //Given
            const loggedUser = await authController.loginWithEmailAndPassword(testUser.email, testUser.password);


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
                await authController.logout();
            }
        }, 60000);
        test('E03 - No contamos con una lista con lugares dados de alta.', async () => {
            //Given
            const loggedUser = await authController.loginWithEmailAndPassword(testUser.email, testUser.password);


            await placesController.replacePlaces([], loggedUser.uid);
            //When
            try {
                await placesController.deletePlace({ Nombre: "Castellón", Longitud: -0.0576800, Latitud: 39.9929000, Favorito: false }, loggedUser.uid);
            } catch (error) {
                expect(error).toBeInstanceOf(PlaceException);
                expect(error.message).toBe(PlaceExceptionMessages.EmptyPlaces);
                await authController.logout();
            }
        }, 60000);
    });

    describe('HU20 - Como usuario quiero poder marcar como favoritos lugares de interés para que aparezcan los primeros cuando los listo.', () => {
        test('E01 - Existe una lista con lugares dados de alta y existe el lugar que se quiere marcar como favorito.', async () => {
            //Given
            const loggedUser = await authController.loginWithEmailAndPassword(testUser.email, testUser.password);

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
            await authController.logout();
        }, 60000);
        test('E02 - Existe una lista con lugares dados de alta y no existe el lugar que se quiere marcar como favorito.', async () => {
            //Given
            const loggedUser = await authController.loginWithEmailAndPassword(testUser.email, testUser.password);

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
                await authController.logout();
            }
        }, 60000);
        test('E03 - No hay lugares dados de alta.', async () => {
            //Given
            const loggedUser = await authController.loginWithEmailAndPassword(testUser.email, testUser.password);


            await placesController.replacePlaces([], loggedUser.uid);

            try {
                await placesController.toggleFavourite({ Longitud: -0.3773900, Latitud: 39.4697500 }, loggedUser.uid);
            } catch (error) {
                expect(error).toBeInstanceOf(PlaceException);
                expect(error.message).toBe(PlaceExceptionMessages.EmptyPlaces);
                await authController.logout();
            }
        }, 60000);
    })
});