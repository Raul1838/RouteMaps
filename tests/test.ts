import VehiclesController from '../src/controller/VehiclesController';
import Combustible from '../src/enums/combustible';
import VehicleAlreadyExistException from '../src/exceptions/VehicleAlreadyExistException';
import InvalidVehicleException from '../src/exceptions/InvalidVehicleException';

var vehiclesController: VehiclesController = new VehiclesController();

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
            test.todo('Existe el lugar que se quiere eliminar y está dado de alta en la lista de lugares de interés.');
            test.todo('Hay lugares dados de alta, pero no se encuentra el que se quiere eliminar.');
            test.todo('No contamos con una lista con lugares dados de alta.');
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