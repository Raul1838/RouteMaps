import RoutesController from '../src/controller/RoutesController.ts'
import VehicleEnum from '../src/enums/VehicleEnum.ts';
import MockAPIPlacesService from './helpers/MockAPIPlacesService.ts';
import InvalidVehicleException from '../src/exceptions/InvalidVehicleException.ts'
import RouteNotFoundException from '../src/exceptions/RouteNotFoundException.ts'
import PlaceNotFoundException from '../src/exceptions/PlaceNotFoundException.ts'

var mockedAPIService = new MockAPIPlacesService();
var routesController: RoutesController = new RoutesController(mockedAPIService);

describe('Pruebas de la Iteración 2', () => {
    describe('HU13 - Obtener una ruta', () => {
        test('E01 - Existe el lugar de inicio, el lugar de fin, hay una posible ruta, y el método de movilidad es correcto.', () => {
            //Given
            routesController.setRoutes([]);

            //When
            routesController.getNewRoute({ Latitud: 39.988126910927626, Longitud: -0.05202140449041774 }, { Latitud: 39.986597808112535, Longitud: -0.05682265874338428 }, VehicleEnum.Vehicle).
                then(() => expect(routesController.getRoutes()).toStrictEqual([{
                    Inicio: { Latitud: 39.988126910927626, Longitud: -0.05202140449041774 },
                    Fin: { Latitud: 39.986597808112535, Longitud: -0.05682265874338428 },
                    Trayecto: [
                        {
                            Distancia: 267.2,
                            Duracion: 49.2,
                            Instruccion: "Head southwest on Calle Pintor Oliet",
                            Nombre: "Calle Pintor Oliet",
                        },
                        {
                            Distancia: 285.3,
                            Duracion: 53.8,
                            Instruccion: "Enter the roundabout and take the 1st exit onto Avenida Alcora, CV-1540",
                            Nombre: "Avenida Alcora, CV-1540",
                            Salida: 1,
                        },
                        {
                            Distancia: 0.0,
                            Duracion: 0.0,
                            Instruccion: "Arrive at Avenida Alcora, CV-1540, on the right",
                            Nombre: "-",
                        }
                    ],
                    Duracion: 103.0,
                    Distancia: 552.5,
                }
                ]));
        });
        test('E02 - Existe el lugar de inicio, el lugar de fin y hay una posible ruta, pero no existe el método de movilidad', async () => {
            //Given
            routesController.setRoutes([]);

            //When
            await routesController.getNewRoute(
                { Latitud: 39.988126910927626, Longitud: -0.05202140449041774 },
                { Latitud: 39.986597808112535, Longitud: -0.05682265874338428 },
                VehicleEnum.Buceando)
                .then(() => fail('Expected an error to be thrown')).catch((error) => expect(error).toBeInstanceOf(InvalidVehicleException));
        });
        test('E03 - No contamos con ninguna ruta posible entre los dos lugares.', async () => {
            //Given
            routesController.setRoutes([]);

            //When
            await routesController.getNewRoute({ Latitud: 39.988126910927626, Longitud: -0.05202140449041774 }, { Latitud: 39.03385, Longitud: 125.75432 }, VehicleEnum.Vehicle)
                .then(() => fail('Expected an error to be thrown')).catch((error) => expect(error).toBeInstanceOf(RouteNotFoundException));

        });
        test('E04 - Existe el lugar de inicio pero no existe el lugar de fin.', async () => {
            //Given
            routesController.setRoutes([]);

            //When
            await routesController.getNewRoute({ Latitud: 39.988126910927626, Longitud: -0.05202140449041774 }, { Latitud: null, Longitud: null }, VehicleEnum.Vehicle)
                .then(() => fail('Expected an error to be thrown')).catch((error) => expect(error).toBeInstanceOf(PlaceNotFoundException));
        });
        test('E05 - No existe el lugar de inicio.', async () => {
            //Given
            routesController.setRoutes([]);

            //When
            await routesController.getNewRoute({ Latitud: null, Longitud: null }, { Latitud: 39.986597808112535, Longitud: -0.05682265874338428 }, VehicleEnum.Vehicle)
                .then(() => fail('Expected an error to be thrown')).catch((error) => expect(error).toBeInstanceOf(PlaceNotFoundException));
        });
    });
});