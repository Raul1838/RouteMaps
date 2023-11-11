import Controller from '../src/controller/Controller';
import Combustible from '../src/enums/combustible';
import PlaceNotFoundException from '../src/exceptions/PlaceNotFoundException';
import EmptyVehiclesException from '../src/exceptions/EmptyVehiclesException';

var controller: Controller = new Controller();

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
            test.todo('Se añade un vehículo no registrado anteriormente con datos correctos.');
            test.todo('El vehículo ya se encuentra dado de alta.');
            test.todo('Los datos del vehículo no son correctos.');
        });
        describe('HU10 - Consultar lista de vehículos', () => {
            test.todo('Existe una lista con vehículos dados de alta.');
            test.todo('No contamos con una lista con vehículos dados de alta.');
        });
        describe('HU11 - Eliminar un vehículo', () => {
            test('Existe una lista con vehículos dados de alta y existe el vehículo que se quiere eliminar.', () => {
                //Given
                controller.setVehicles([{ id: 1683, Nombre: 'Coche empresa', propulsion: Combustible.Diesel, consumo: 6, Favorito: false, Defecto: false }])
                //When
                controller.deleteVehicle(1683);
                //Then
                expect(controller.getVehicles()).toHaveLength(0);
            });
            test('Existe una lista con vehículos dados de alta pero no existe el vehículo que se quiere eliminar.', () => {
                //Given
                controller.setVehicles([{ id: 1683, Nombre: 'Coche empresa', propulsion: Combustible.Diesel, consumo: 6, Favorito: false, Defecto: false }]);
                //When
                const error = () => {
                    controller.deleteVehicle(1000);
                }
                //Then
                expect(error).toThrow(PlaceNotFoundException);
            });
            test('No hay vehículos dados de alta.', () => {
                //Given
                controller.setVehicles([]);
                //When
                const error = () => {
                    controller.deleteVehicle(1000);
                }
                //Then
                expect(error).toThrow(EmptyVehiclesException);
            });

        });
        describe('HU12 - Modificar datos de un vehículo', () => {
            test.todo('Existe una lista con vehículos dados de alta y existe el vehículo que se quiere modificar.');
            test.todo('Existe una lista con vehículos dados de alta pero no existe el vehículo que se quiere modificar.');
            test.todo('No hay vehículos dados de alta.');

        });
    });
});