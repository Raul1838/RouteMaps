import VehiclesController, {getVehiclesController} from "../../src/controller/VehiclesController";
import Combustible from "../../src/enums/Combustible";
import EmptyVehiclesException from "../../src/exceptions/EmptyVehiclesException";
import InvalidVehicleException from "../../src/exceptions/InvalidVehicleException";
import VehicleAlreadyExistException from "../../src/exceptions/VehicleAlreadyExistException";
import VehicleNotFoundException from "../../src/exceptions/VehicleNotFoundException";
import Vehicle from "../../src/interfaces/Vehicle";
import { AuthController, getAuthController } from "../../src/controller/AuthController";
import { UserModel } from "../../src/interfaces/UserModel";

const testUser = {
    email: 'usuario.permanente@test.com',
    password: '123456789',
}


describe('Vehicles', () => {
    let vehiclesController: VehiclesController
    let authController: AuthController
    beforeAll(async () => {
        vehiclesController = getVehiclesController();
        authController = getAuthController();
    });

    describe('HU09 - Dar de alta un vehículo', () => {
        test('E01 - Se añade un vehículo no registrado anteriormente con datos correctos.', async () => {
            //Given
            const loggedUser: UserModel = await authController.loginWithEmailAndPassword(testUser.email, testUser.password);
            await vehiclesController.setVehicles([{
                plate: '1683',
                name: "Coche empresa",
                propulsion: Combustible.Diesel,
                consumption: 6,
                favorite: false
            }], loggedUser.uid);
            //When
            await vehiclesController.addVehicle({
                plate: '1684',
                name: "Coche personal",
                propulsion: Combustible.Gasolina,
                consumption: 5.5,
                favorite: true
            }, loggedUser.uid)
            //Then
            expect(await vehiclesController.getVehicles(loggedUser.uid)).toStrictEqual([{
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
            await authController.logout();
        });

        test('E03 - Los datos del vehículo no son correctos.', async () => {
            //Given
            const loggedUser: UserModel = await authController.loginWithEmailAndPassword(testUser.email, testUser.password);
            await vehiclesController.setVehicles([], loggedUser.uid);
            //When
            const error = async () => {
                await vehiclesController.addVehicle({
                    plate: "sdbs",
                    name: "Coche empresa",
                    propulsion: Combustible.Electrico,
                    consumption: 60,
                    favorite: false
                }, loggedUser.uid);
            }
            //Then
            await expect(error()).rejects.toThrow(InvalidVehicleException);
            await authController.logout();
        });
    });
    describe('HU10 - Consultar lista de vehículos', () => {
        test('E01 - Existe una lista con vehículos dados de alta.', async () => {
            //Given
            const loggedUser: UserModel = await authController.loginWithEmailAndPassword(testUser.email, testUser.password);
            await vehiclesController.setVehicles([{ plate: '1683', name: "Coche empresa", propulsion: Combustible.Diesel, consumption: 6, favorite: false}], loggedUser.uid);
            //When
            const vehicles: Vehicle[] = await vehiclesController.getVehicles(loggedUser.uid);
            //Then
            expect(vehicles).toStrictEqual([{ plate: '1683', name: "Coche empresa", propulsion: Combustible.Diesel, consumption: 6, favorite: false}]);
            await authController.logout();
        });
        test('E02 - No contamos con una lista con vehículos dados de alta.', async () => {
            //Given
            const vehicle: Vehicle = {
                plate: '1000',
                name: "Coche empresa",
                propulsion: Combustible.Diesel,
                consumption: 6,
                favorite: false
            }
            const loggedUser: UserModel = await authController.loginWithEmailAndPassword(testUser.email, testUser.password);
            await vehiclesController.setVehicles([], loggedUser.uid);
            //When
            const error = async () => {
                await vehiclesController.getVehicle(vehicle.plate, loggedUser.uid);
            }
            //Then
            await expect(error()).rejects.toThrow(EmptyVehiclesException);
            await authController.logout();
        });
    });
    describe('HU11 - Eliminar un vehículo', () => {
        test('E01 - Existe una lista con vehículos dados de alta y existe el vehículo que se quiere eliminar.', async () => {
            //Given
            const vehicle: Vehicle = { plate: '1683', name: 'Coche empresa', propulsion: Combustible.Diesel, consumption: 6, favorite: false }
            const loggedUser: UserModel = await authController.loginWithEmailAndPassword(testUser.email, testUser.password);
            await vehiclesController.setVehicles([vehicle], loggedUser.uid);
            //When
            await vehiclesController.deleteVehicle(vehicle, loggedUser.uid);
            //Then
            expect(await vehiclesController.getVehicles(loggedUser.uid)).toHaveLength(0);
            await authController.logout();
        });
        test('E02 - No existe el vehículo que se quiere eliminar.', async () => {
            //Given
            const loggedUser: UserModel = await authController.loginWithEmailAndPassword(testUser.email, testUser.password);
            await vehiclesController.setVehicles([{ plate: '1683', name: 'Coche empresa', propulsion: Combustible.Diesel, consumption: 6, favorite: false}], loggedUser.uid);
            //When
            const error = async () => {
                await vehiclesController.deleteVehicle({ plate: '1111', name: 'Coche empresa', propulsion: Combustible.Diesel, consumption: 6, favorite: false}, loggedUser.uid);
            }
            //Then
            await expect(error()).rejects.toThrow(VehicleNotFoundException);
            await authController.logout();
        });

    });
    describe('HU12 - Modificar datos de un vehículo', () => {
        test('E01 - Existe una lista con vehículos dados de alta y existe el vehículo que se quiere modificar.', async () => {
            //Given
            const loggedUser: UserModel = await authController.loginWithEmailAndPassword(testUser.email, testUser.password);
            await vehiclesController.setVehicles([{ plate: '1683', name: 'Coche empresa', propulsion: Combustible.Diesel, consumption: 6, favorite: false}], loggedUser.uid);
            //When
            await vehiclesController.modifyVehicle({ plate: '1683', name: 'Coche familiar', propulsion: Combustible.Diesel, consumption: 5, favorite: false}, loggedUser.uid);
            //Then
            expect(await vehiclesController.getVehicles(loggedUser.uid)).toStrictEqual([{ plate: '1683', name: 'Coche familiar', propulsion: Combustible.Diesel, consumption: 5, favorite: false }]); 
            await authController.logout();
        });
        test('E02 - No existe el vehículo que se quiere modificar.', async () => {
            //Given
            const loggedUser: UserModel = await authController.loginWithEmailAndPassword(testUser.email, testUser.password);
            await vehiclesController.setVehicles([{ plate: '1683', name: 'Coche empresa', propulsion: Combustible.Diesel, consumption: 6 }], loggedUser.uid);
            //When
            await vehiclesController.modifyVehicle({ plate: '1000', name: 'Coche propio', propulsion: Combustible.Diesel, consumption: 5 }, loggedUser.uid);
            //Then
            expect(await vehiclesController.getVehicles(loggedUser.uid)).toStrictEqual([{ plate: '1683', name: 'Coche empresa', propulsion: Combustible.Diesel, consumption: 6 },{ plate: '1000', name: 'Coche propio', propulsion: Combustible.Diesel, consumption: 5 }]); 
            await authController.logout();
        });
    });
    describe('Vehicles', () => {
        describe('HU21 - Marcar como favorito vehículos', () => {
            test('E01 - Existe una lista con vehículos dados de alta y existe el vehículo que se quiere marcar como favorite.', async () => {
                //Given
                const loggedUser: UserModel = await authController.loginWithEmailAndPassword(testUser.email, testUser.password);
                await vehiclesController.setVehicles([{ plate: '1683', name: 'Coche empresa', propulsion: Combustible.Diesel, consumption: 6, favorite: false }], loggedUser.uid);
                //When
                await vehiclesController.toggleFavourite('1683', loggedUser.uid);
                //Then
                expect(await vehiclesController.getVehicles(loggedUser.uid)).toStrictEqual([{ plate: '1683', name: 'Coche empresa', propulsion: Combustible.Diesel, consumption: 6, favorite: true }])
                await authController.logout();
            });
            test('E02 - Existe una lista con vehículos dados de alta y no existe el vehículo que se quiere marcar como favorite.', async () => {
                //Given
                const loggedUser: UserModel = await authController.loginWithEmailAndPassword(testUser.email, testUser.password);
                await vehiclesController.setVehicles([{ plate: '1683', name: 'Coche empresa', propulsion: Combustible.Diesel, consumption: 6, favorite: false }], loggedUser.uid);

                //When
                const error = async () => await vehiclesController.toggleFavourite('1000', loggedUser.uid);

                //Then
                await expect(error()).rejects.toThrow(VehicleNotFoundException);
                await authController.logout();
            });
            test('E03 - No hay vehículos dados de alta.', async () => {
                //Given
                const loggedUser: UserModel = await authController.loginWithEmailAndPassword(testUser.email, testUser.password);
                await vehiclesController.setVehicles([], loggedUser.uid);

                //When
                const error = async () => await vehiclesController.toggleFavourite('1000', loggedUser.uid);

                //Then
                await expect(error()).rejects.toThrow(EmptyVehiclesException);
                await authController.logout();
            });
        })
    });

    test('HU23 - E1 - Existe el vehículo a establecer por defecto', async () => {
        const vehicle: Vehicle = {
            plate: '123',
            name: 'Test vehicle',
            consumption: 0,
            propulsion: Combustible.Diesel,
            favorite: false,
        }
        const loggedUser: UserModel = await authController.loginWithEmailAndPassword(testUser.email, testUser.password);
        await vehiclesController.addVehicle(vehicle, loggedUser.uid);
        await vehiclesController.setDefaultVehicle(vehicle.plate, loggedUser.uid);
        await authController.logout();
    });

    test('HU23 - E2 - No existe el vehículo a establecer por defecto', async () => {
        const vehicleId: string = '321';
        const loggedUser: UserModel = await authController.loginWithEmailAndPassword(testUser.email, testUser.password);
        try {
            await vehiclesController.setDefaultVehicle(vehicleId, loggedUser.uid);
            throw new Error();
        } catch (error) {
            if (error instanceof VehicleNotFoundException) {
                expect(error.message).toBe('El vehículo no existe');
            } else {
                throw new Error('Lanzada una excepción no controlada');
            }
        }
        await authController.logout();
    });
});