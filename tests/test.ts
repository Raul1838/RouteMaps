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
            routesController.addRoute({ Latitud: 39.988126910927626, Longitud: -0.05202140449041774 }, { Latitud: 39.986597808112535, Longitud: -0.05682265874338428 }, VehicleEnum.Vehicle).
                then(() => expect(routesController.getRoutes()).toStrictEqual([{
                    Inicio: [39.988126910927626, -0.05202140449041774],
                    Fin: [39.986597808112535, -0.05682265874338428],
                    Trayecto: [
                        {
                            "distance": 267.2,
                            "duration": 49.2,
                            "instruction": "Head southwest on Calle Pintor Oliet",
                            "name": "Calle Pintor Oliet",
                        },
                        {
                            "distance": 285.3,
                            "duration": 53.8,
                            "instruction": "Enter the roundabout and take the 1st exit onto Avenida Alcora, CV-1540",
                            "name": "Avenida Alcora, CV-1540",
                            "exit_number": 1,
                        },
                        {
                            "distance": 0.0,
                            "duration": 0.0,
                            "type": 10,
                            "instruction": "Arrive at Avenida Alcora, CV-1540, on the right",
                            "name": "-",
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
            await routesController.addRoute(
                { Latitud: 39.988126910927626, Longitud: -0.05202140449041774 },
                { Latitud: 39.986597808112535, Longitud: -0.05682265874338428 },
                VehicleEnum.Buceando)
                .then(() => fail('Expected an error to be thrown')).catch((error) => expect(error).toBeInstanceOf(InvalidVehicleException));
        });
        test('E03 - No contamos con ninguna ruta posible entre los dos lugares.', async () => {
            //Given
            routesController.setRoutes([]);

            //When
            await routesController.addRoute({ Latitud: 39.988126910927626, Longitud: -0.05202140449041774 }, { Latitud: 39.03385, Longitud: 125.75432 }, VehicleEnum.Vehicle)
                .then(() => fail('Expected an error to be thrown')).catch((error) => expect(error).toBeInstanceOf(RouteNotFoundException));

        });
        test('E04 - Existe el lugar de inicio pero no existe el lugar de fin.', async () => {
            //Given
            routesController.setRoutes([]);

            //When
            await routesController.addRoute({ Latitud: 39.988126910927626, Longitud: -0.05202140449041774 }, {Latitud: null, Longitud: null}, VehicleEnum.Vehicle)
                .then(() => fail('Expected an error to be thrown')).catch((error) => expect(error).toBeInstanceOf(PlaceNotFoundException));
        });
        test('E05 - No existe el lugar de inicio.', async () => {
            //Given
            routesController.setRoutes([]);

            //When
            await routesController.addRoute({ Latitud: null, Longitud: null}, {Latitud: 39.986597808112535, Longitud: -0.05682265874338428}, VehicleEnum.Vehicle)
                .then(() => fail('Expected an error to be thrown')).catch((error) => expect(error).toBeInstanceOf(PlaceNotFoundException));
        });
    });
});