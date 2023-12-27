import {Coords} from "../../src/interfaces/Coords";
import {getPathwayController, PathwayController} from "../../src/controller/PathwayController";
import {PathwayException, PathWayExceptionMessages} from "../../src/exceptions/PathwayException";
import {Pathway} from "../../src/interfaces/Pathway";
import VehiclesController, {getVehiclesController} from "../../src/controller/VehiclesController";
import VehicleNotFoundException from "../../src/exceptions/VehicleNotFoundException";
import {AuthController, getAuthController} from "../../src/controller/AuthController";
import {UserModel} from "../../src/interfaces/UserModel";
import Vehicle from "../../src/interfaces/Vehicle";
import Combustible from "../../src/enums/Combustible";

describe('Tests sobre gestión de rutas', () => {

    let pathwayController: PathwayController;
    let vehiclesController: VehiclesController;
    let authController: AuthController;

    beforeAll(() => {
        pathwayController = getPathwayController();
        vehiclesController = getVehiclesController();
        authController = getAuthController();
    });

    test('HU13 - E1 - Ruta posible' , async () => {
        const from: Coords = {
            lat: 39.8890100,
            lon: -0.0849900,
        }

        const to: Coords = {
            name: 'Castellón de la Plana',
        }

        await pathwayController.calculatePathway(from, to).then((pathway: Pathway) => {
            expect( pathway ).toBeTruthy();
            expect( pathway.steps.length ).toBeGreaterThanOrEqual(1);
        });

    });

    test('HU13 - E3 - Ruta no posible' , async () => {
        const from: Coords = {
            lat: 39.9929000,
            lon: -0.0576800
        }

        const to: Coords = {
            lat: -34.6131500,
            lon: -58.3772300
        }

        try {
            await pathwayController.calculatePathway(from, to);
            throw new Error();
        } catch (error) {
            if( error instanceof PathwayException ) {
                expect(error.message).toBe(PathWayExceptionMessages.InvalidPathway);
            } else {
                throw new Error('Lanzada una excepción no controlada');
            }
        }
    });

    test('HU23 - E1 - Existe el vehículo a establecer por defecto', async () => {
        const testUser = {
            email: 'usuario.permanente@test.com',
            password: '123456789',
        }
        const vehicle: Vehicle = {
            id: 123,
            Nombre: 'Test vehicle',
            consumo: 0,
            propulsion: Combustible.Diesel,
            Favorito: false,
        }
        vehiclesController.addVehicle(vehicle);
        const loggedUser: UserModel = await authController.loginWithEmailAndPassword(testUser.email, testUser.password);
        await vehiclesController.setDefaultVehicle(vehicle.id, loggedUser.uid);
        await authController.logout();
    });

    test('HU23 - E2 - No existe el vehículo a establecer por defecto', async () => {
        const testUser = {
            email: 'usuario.permanente@test.com',
            password: '123456789',
        }
        const vehicleId: number = 321;
        const loggedUser: UserModel = await authController.loginWithEmailAndPassword(testUser.email, testUser.password);
        try {
            await vehiclesController.setDefaultVehicle(vehicleId, loggedUser.uid);
            throw new Error();
        } catch (error) {
            if( error instanceof VehicleNotFoundException ) {
                expect(error.message).toBe('El vehículo no existe');
            } else {
                throw new Error('Lanzada una excepción no controlada');
            }
        }
        await authController.logout();
    });
});