import VehiclesController, {getVehiclesController} from "../../src/controller/VehiclesController";
import Combustible from "../../src/enums/Combustible";
import InvalidVehicleException from "../../src/exceptions/InvalidVehicleException";
import VehicleNotFoundException from "../../src/exceptions/VehicleNotFoundException";
import Vehicle from "../../src/interfaces/Vehicle";
import {FirebaseService} from "../../src/services/FirebaseService";


describe('Vehicles', () => {

    let vehiclesController: VehiclesController;
    let firebaseService: FirebaseService;
    let dbMockVehicles: Vehicle[];

    beforeAll(() => {
        firebaseService = new FirebaseService();
        vehiclesController = getVehiclesController(firebaseService);
    });

    beforeEach(() => {
        jest.clearAllMocks();
        dbMockVehicles = [{
            plate: '1683BCD',
            name: 'Coche empresa',
            propulsion: Combustible.Diesel,
            consumption: 6,
            favorite: false
        }];
        jest.spyOn(firebaseService, 'getVehicles')
            .mockImplementation(() => Promise.resolve({ vehicles: [...dbMockVehicles] }));
    });

    describe('HU09 - Dar de alta un vehículo', () => {
        test('E01 - Se añade un vehículo no registrado anteriormente con datos correctos.', async () => {

            jest.spyOn(firebaseService, 'storeVehicle')
                .mockImplementation((vehicle: Vehicle, userId: string): Promise<Vehicle[]> => {
                    dbMockVehicles.push(vehicle);
                    return Promise.resolve(dbMockVehicles);
                });

            //Given
            const initialVehicles = await vehiclesController.getVehicles('userId');

            //When
            await vehiclesController.addVehicle({
                plate: '1684XFG',
                name: "Coche personal",
                propulsion: Combustible.Gasolina,
                consumption: 5.5,
                favorite: true
            }, 'userId')

            //Then
            const updatedVehicles = await vehiclesController.getVehicles('userId');
            expect(updatedVehicles).toStrictEqual([...initialVehicles, {
                plate: '1684XFG',
                name: "Coche personal",
                propulsion: Combustible.Gasolina,
                consumption: 5.5,
                favorite: true
            }])
        });
        test('E03 - Los datos del vehículo no son correctos.', async () => {

            jest.spyOn(firebaseService, 'storeVehicle')
                .mockImplementation((vehicle: Vehicle, userId: string): Promise<Vehicle[]> => {
                    dbMockVehicles.push(vehicle);
                    return Promise.resolve(dbMockVehicles);
                });

            //Given
            const initialVehicles = await vehiclesController.getVehicles('userId');

            //When
            try {
                await vehiclesController.addVehicle({
                    plate: '123',
                    name: "Coche personal",
                    propulsion: Combustible.Gasolina,
                    consumption: 5.5,
                    favorite: true
                }, 'userId')
            } catch (error) {
                //Then
                const updatedVehicles = await vehiclesController.getVehicles('userId');
                expect(updatedVehicles).toStrictEqual(initialVehicles);
                expect(error).toBeInstanceOf(InvalidVehicleException);
            }
        });
    });
    describe('HU10 - Consultar lista de vehículos', () => {
        test('E01 - Existe una lista con vehículos dados de alta.', async () => {

            //Given
            let vehicles: Vehicle[] = [];
            //When
            vehicles = await vehiclesController.getVehicles('userId');
            //Then
            expect(vehicles.length).toBeGreaterThan(0);
            expect(vehicles).toStrictEqual(dbMockVehicles);

        });
        test('E02 - No contamos con una lista con vehículos dados de alta.', async () => {
            //Given
            jest.spyOn(firebaseService, 'getVehicles')
                .mockResolvedValue({ vehicles: [] }); // Lista vacía de vehículos
            let vehicles: Vehicle[] = [];

            //When
            vehicles = await vehiclesController.getVehicles('userId');

            //Then
            expect(vehicles.length).toBe(0);
        });
    });
    describe('HU11 - Eliminar un vehículo', () => {
        test('Existe una lista con vehículos dados de alta y existe el vehículo que se quiere eliminar.', async () => {
            //Given
            jest.spyOn(firebaseService, 'deleteVehicle')
                .mockImplementation((vehicle: Vehicle, userId: string): Promise<void> => {
                    dbMockVehicles = dbMockVehicles.filter(dbVehicle => dbVehicle.plate !== vehicle.plate);
                    return Promise.resolve();
                });
            let vehicles = await vehiclesController.getVehicles('userId');
            const vehicleToDelete = vehicles[0];

            //When
            await vehiclesController.deleteVehicle(vehicleToDelete, 'userId');
            vehicles = await vehiclesController.getVehicles('userId');

            //Then
            expect(vehicles.length).toBe(0);
        });
        test('Existe una lista con vehículos dados de alta pero no existe el vehículo que se quiere eliminar.', async () => {
            //Given
            jest.spyOn(firebaseService, 'deleteVehicle')
                .mockImplementation((vehicle: Vehicle, userId: string): Promise<void> => {
                    throw new VehicleNotFoundException();
                });
            const vehicles = await vehiclesController.getVehicles('userId');
            const vehicleToDelete = vehicles[0];
            //When
            try {
                await vehiclesController.deleteVehicle(vehicleToDelete, 'userId');
            } catch (error) {
                //Then
                expect(error).toBeInstanceOf(VehicleNotFoundException);
            }
        });
    });
    describe('HU12 - Modificar datos de un vehículo', () => {
        test('E01 - Existe una lista con vehículos dados de alta y existe el vehículo que se quiere modificar.', async () => {
            //Given
            jest.spyOn(firebaseService, 'storeVehicle')
                .mockImplementation((vehicle: Vehicle, userId: string): Promise<Vehicle[]> => {
                    dbMockVehicles = dbMockVehicles.map(dbVehicle => {
                        if (dbVehicle.plate === vehicle.plate) {
                            return vehicle;
                        }
                        return dbVehicle;
                    });
                    return Promise.resolve(dbMockVehicles);
                });
            const initialVehicles = await vehiclesController.getVehicles('userId');

            //When
            const updatedVehicles: Vehicle[] = await vehiclesController.setVehicle({
                plate: '1683BCD',
                name: 'Coche propio',
                propulsion: Combustible.Diesel,
                consumption: 5
            }, 'userId');

            //Then
            expect(updatedVehicles).toStrictEqual(initialVehicles.map(vehicle => {
                if (vehicle.plate === '1683BCD') {
                    return {
                        plate: '1683BCD',
                        name: 'Coche propio',
                        propulsion: Combustible.Diesel,
                        consumption: 5
                    }
                }
                return vehicle;
            }));
            expect(updatedVehicles.length).toBe(initialVehicles.length);
        });
        test('E02 - Existe una lista con vehículos dados de alta pero no existe el vehículo que se quiere modificar.', async () => {
            //Given
            jest.spyOn(firebaseService, 'storeVehicle')
                .mockImplementation((vehicle: Vehicle, userId: string): Promise<Vehicle[]> => {
                    dbMockVehicles.push(vehicle);
                    return Promise.resolve(dbMockVehicles);
                });
            const initialVehicles = await vehiclesController.getVehicles('userId');
            const vehicleToUpdate = {
                plate: '1684XFG',
                name: 'Coche propio',
                propulsion: Combustible.Diesel,
                consumption: 5
            }

            //When
            const updatedVehicles: Vehicle[] = await vehiclesController.setVehicle(vehicleToUpdate, 'userId');

            //Then
            const expectedVehicles = [...initialVehicles, vehicleToUpdate];
            expect(updatedVehicles.length).toBe(expectedVehicles.length);
            expect(updatedVehicles).toStrictEqual(expectedVehicles);
        });
    });

    describe('HU23 - Establecer vehículo por defecto', () => {

        beforeEach(() => {
            let defaultVehiclePlate: string = '';
            jest.spyOn(firebaseService, 'setDefaultVehicle')
                .mockImplementation((vehiclePlate: string, userId: string): Promise<void> => {
                    defaultVehiclePlate = vehiclePlate;
                    return Promise.resolve();
                });
            jest.spyOn(firebaseService, 'getDefaultVehicle')
                .mockImplementation((userId: string) => {
                    return Promise.resolve({vehiclePlate: defaultVehiclePlate });
                });
            jest.spyOn(firebaseService, 'getVehicle')
                .mockImplementation((vehiclePlate: string, userId: string): Promise<Vehicle> => {
                    return Promise.resolve(dbMockVehicles.find(vehicle => vehicle.plate === vehiclePlate) || dbMockVehicles[0]);
                });

        });

        test('E1 - Existe el vehículo a establecer por defecto', async () => {
            //Given
            jest.spyOn(firebaseService, 'getVehicle')
                .mockImplementation((vehiclePlate: string, userId: string): Promise<Vehicle> => {
                    return Promise.resolve(dbMockVehicles.find(vehicle => vehicle.plate === vehiclePlate) || dbMockVehicles[0]);
                });

            const testUserUid: string = '123';
            const [vehicle] = await vehiclesController.getVehicles(testUserUid);

            //When
            await vehiclesController.setDefaultVehicle(vehicle.plate, testUserUid);
            const dbDefaultVehiclePlate: string = await vehiclesController.getDefaultVehicle(testUserUid);

            //Then
            expect(dbDefaultVehiclePlate).toBe(vehicle.plate);
        });

        test('E2 - No existe el vehículo a establecer por defecto', async () => {
            //Given

            jest.spyOn(firebaseService, 'getVehicle')
                .mockImplementation((vehiclePlate: string, userId: string): Promise<Vehicle> => {
                    throw new VehicleNotFoundException();
                });

            //When
            try {
                await vehiclesController.setDefaultVehicle('123', '123');
            } catch (error) {
                //Then
                expect(error).toBeInstanceOf(VehicleNotFoundException);
            }
        });
    });
});