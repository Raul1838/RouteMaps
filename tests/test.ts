import Place from '../src/interfaces/Place';
import Controller from '../src/controller/Controller';
import InvalidCoordinatesException from '../src/exceptions/InvalidCoordinatesException';


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
            test('Se insertan unas coordenadas válidas.', () => {
                //Given
                var lugares: Place[] = [
                    {
                        Nombre: "Valencia",
                        Longitud: -0.3773900,
                        Latitud: 39.4697500,
                        Favorito: false
                    }
                ];
                //When
                controller.addPlace({
                    Nombre: "Castellón"
                });
                //Then
                expect(lugares).toHaveLength(2);
            });
            test('Las coordenadas insertadas no son válidas.', () => {
                //Given
                var lugares: Place[] = [
                    {
                        Nombre: "Valencia",
                        Longitud: -0.3773900,
                        Latitud: 39.4697500,
                        Favorito: false
                    }]
                //When
                const error = () => {
                    controller.addPlace({
                        Nombre: "1234"
                    });
                }
                
                //Then
                expect(error).toThrow(InvalidCoordinatesException);
            });
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