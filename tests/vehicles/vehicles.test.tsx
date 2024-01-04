import VehiclesController from "../../src/controller/VehiclesController";
import Combustible from "../../src/enums/Combustible";
import EmptyVehiclesException from "../../src/exceptions/EmptyVehiclesException";
import InvalidVehicleException from "../../src/exceptions/InvalidVehicleException";
import VehicleAlreadyExistException from "../../src/exceptions/VehicleAlreadyExistException";
import VehicleNotFoundException from "../../src/exceptions/VehicleNotFoundException";
import Vehicle from "../../src/interfaces/Vehicle";


var vehiclesController: VehiclesController = new VehiclesController();


describe('Vehicles', () => {
    describe('HU09 - Dar de alta un vehículo', () => {
        test('E01 - Se añade un vehículo no registrado anteriormente con datos correctos.', () => {
            //Given
            vehiclesController.updateVehicles([{
                plate: '1683',
                name: "Coche empresa",
                propulsion: Combustible.Diesel,
                consumption: 6,
                favorite: false
            }]);
            //When
            vehiclesController.addVehicle({
                plate: '1684',
                name: "Coche personal",
                propulsion: Combustible.Gasolina,
                consumption: 5.5,
                favorite: true
            })
            //Then
            expect(vehiclesController.getVehicles()).toStrictEqual([{
                plate: '1683',
                name: "Coche empresa",
                propulsion: Combustible.Diesel,
                consumption: 6,
                favorite: false
            },
            {
                plate: '1684',
                name: "Coche personal",
                propulsion: Combustible.Gasolina,
                consumption: 5.5,
                favorite: true
            }])
        });
        test('E02 - El vehículo ya se encuentra dado de alta.', () => {
            //Given
            vehiclesController.updateVehicles([{
                plate: '1683',
                name: "Coche empresa",
                propulsion: Combustible.Diesel,
                consumption: 6,
                favorite: false
            }]);
            //When
            const error = () => {
                vehiclesController.addVehicle({
                    plate: '1683',
                    name: "Coche empresa",
                    propulsion: Combustible.Diesel,
                    consumption: 6,
                    favorite: false
                });
            }
            //Then
            expect(error).toThrow(VehicleAlreadyExistException)
        });
        test('E03 - Los datos del vehículo no son correctos.', () => {
            //Given
            vehiclesController.updateVehicles([{
                plate: '1683',
                name: "Coche empresa",
                propulsion: Combustible.Diesel,
                consumption: 6,
                favorite: false
            }])
            //When
            const error = () => {
                vehiclesController.addVehicle({
                    plate: "sdbs",
                    name: "Coche empresa",
                    propulsion: Combustible.Caballo,
                    consumption: null,
                    favorite: null
                })
            }
            //Then
            expect(error).toThrow(InvalidVehicleException);
        });
    });
    describe('HU10 - Consultar lista de vehículos', () => {
        test('E01 - Existe una lista con vehículos dados de alta.', () => {
            //Given
            vehiclesController.updateVehicles([{ plate: '1683', name: "Coche empresa", propulsion: Combustible.Diesel, consumption: 6, favorite: false}]);
            //When
            var vehicles: Vehicle[] = vehiclesController.getVehicles();
            //Then
            expect(vehicles).toStrictEqual([{ plate: '1683', name: "Coche empresa", propulsion: Combustible.Diesel, consumption: 6, favorite: false}]);
        });
        test('E02 - No contamos con una lista con vehículos dados de alta.', () => {
            //Given
            vehiclesController.updateVehicles([]);
            //When
            const error = () => {
                vehiclesController.deleteVehicle(1000);
            }
            //Then
            expect(error).toThrow(EmptyVehiclesException);
        });
    });
    describe('HU11 - Eliminar un vehículo', () => {
        test('E01 - Existe una lista con vehículos dados de alta y existe el vehículo que se quiere eliminar.', () => {
            //Given
            vehiclesController.updateVehicles([{ plate: '1683', name: 'Coche empresa', propulsion: Combustible.Diesel, consumption: 6, favorite: false}])
            //When
            vehiclesController.deleteVehicle('1683');
            //Then
            expect(vehiclesController.getVehicles()).toHaveLength(0);
        });
        test('E02 - Existe una lista con vehículos dados de alta pero no existe el vehículo que se quiere eliminar.', () => {
            //Given
            vehiclesController.updateVehicles([{ plate: '1683', name: 'Coche empresa', propulsion: Combustible.Diesel, consumption: 6, favorite: false}]);
            //When
            const error = () => {
                vehiclesController.deleteVehicle('1000');
            }
            //Then
            expect(error).toThrow(VehicleNotFoundException);
        });
        test('E03 - No hay vehículos dados de alta.', () => {
            //Given
            vehiclesController.updateVehicles([]);
            //When
            const error = () => {
                vehiclesController.deleteVehicle('1000');
            }
            //Then
            expect(error).toThrow(EmptyVehiclesException);
        });

    });
    describe('HU12 - Modificar datos de un vehículo', () => {
        test('E01 - Existe una lista con vehículos dados de alta y existe el vehículo que se quiere modificar.', () => {
            //Given
            vehiclesController.updateVehicles([{ plate: '1683', name: 'Coche empresa', propulsion: Combustible.Diesel, consumption: 6, favorite: false}]);
            //When
            vehiclesController.modifyVehicle({ plate: '1683', name: 'Coche empresa', propulsion: Combustible.Diesel, consumption: 5});
            //Then
            expect(vehiclesController.getVehicles()).toStrictEqual([{ plate: '1683', name: 'Coche empresa', propulsion: Combustible.Diesel, consumption: 5, favorite: false }]); 
        });
        test('E02 - Existe una lista con vehículos dados de alta pero no existe el vehículo que se quiere modificar.', () => {
            //Given
            vehiclesController.updateVehicles([{ plate: '1683', name: 'Coche empresa', propulsion: Combustible.Diesel, consumption: 6 }]);
            //When
            const error = () => {
                vehiclesController.modifyVehicle({ plate: '1000', name: 'Coche propio', propulsion: Combustible.Diesel, consumption: 5 });
            }
            //Then
            expect(error).toThrow(VehicleNotFoundException);
        });
        test('E03 - No hay vehículos dados de alta.', () => {
            //Given
            vehiclesController.updateVehicles([]);
            //When
            const error = () => {
                vehiclesController.modifyVehicle({ plate: '1000', name: 'Coche propio', propulsion: Combustible.Diesel, consumption: 5 });
            }
            //Then
            expect(error).toThrow(EmptyVehiclesException);
        });

    });
    describe('Vehicles', () => {
        describe('HU21 - Marcar como favorito vehículos', () => {
            test('E01 - Existe una lista con vehículos dados de alta y existe el vehículo que se quiere marcar como favorite.', () => {
                //Given
                vehiclesController.updateVehicles([{ plate: '1683', name: 'Coche empresa', propulsion: Combustible.Diesel, consumption: 6, favorite: false }])
                //When
                vehiclesController.toggleFavourite({ plate: '1683' });
                //Then
                expect(vehiclesController.getVehicles()).toStrictEqual([{ plate: '1683', name: 'Coche empresa', propulsion: Combustible.Diesel, consumption: 6, favorite: true }])
            });
            test('E02 - Existe una lista con vehículos dados de alta y no existe el vehículo que se quiere marcar como favorite.', () => {
                //Given
                vehiclesController.updateVehicles([{ plate: '1683', name: 'Coche empresa', propulsion: Combustible.Diesel, consumption: 6, favorite: false }])

                //When
                const error = () => vehiclesController.toggleFavourite({ plate: '1000' });

                //Then
                expect(error).toThrow(VehicleNotFoundException);
            });
            test('E03 - No hay vehículos dados de alta.', () => {
                //Given
                vehiclesController.updateVehicles([]);

                //When
                const error = () => vehiclesController.toggleFavourite({ plate: '1000' });

                //Then
                expect(error).toThrow(EmptyVehiclesException);

            });
        })
    });
});