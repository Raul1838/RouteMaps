import { Coords } from "../../src/interfaces/Coords";
import PathwayController, { getPathwayController } from "../../src/controller/PathwayController";
import { PathwayException, PathWayExceptionMessages } from "../../src/exceptions/PathwayException";
import { Pathway } from "../../src/interfaces/Pathway";
import VehiclesController, { getVehiclesController } from "../../src/controller/VehiclesController";
import VehicleNotFoundException from "../../src/exceptions/VehicleNotFoundException";
import Vehicle from "../../src/interfaces/Vehicle";
import Combustible from "../../src/enums/Combustible";
import { AuthController, getAuthController } from "../../src/controller/AuthController";
import { UserModel } from "../../src/interfaces/UserModel";
import { PathwayTypes } from "../../src/enums/PathwayTypes";
import { PathwayTransportMeans } from "../../src/enums/PathwayTransportMeans";
import { fail } from "assert";

const testUser = {
    email: 'usuario.permanente@test.com',
    password: '123456789',
}
describe('Tests sobre gestión de rutas', () => {
    let pathwayController: PathwayController;
    let vehiclesController: VehiclesController;
    let authController: AuthController;
    beforeAll(async () => {
        pathwayController = getPathwayController();
        vehiclesController = getVehiclesController();
        authController = getAuthController();
    });

    const validPathway1: Pathway = {
        start: {
            lat: 39.988126910927626,
            lon: -0.05202140449041774
        },
        end: {
            lat: 39.986597808112535,
            lon: -0.05682265874338428
        },
        codifiedPath: "pathCodified",
        duration: 399.9,
        distance: 555.4,
        type: PathwayTypes.RECOMMENDED,
        transportMean: PathwayTransportMeans.VEHICLE,
        favourite: false,
        cost: 0
    };

    const validPathway2: Pathway = {
        start: {
            lat: 39.988126910927626,
            lon: -0.05202140449041774
        },
        end: {
            lat: 39.986597808112535,
            lon: -0.05682265874338428
        },
        codifiedPath: 'pathCodified',
        duration: 100.9,
        distance: 500.4,
        type: PathwayTypes.SHORTEST,
        transportMean: PathwayTransportMeans.BIKE,
        favourite: true,
        cost: 0
    };



    test('HU13 - E1 - Ruta posible', async () => {
        const from: Coords = {
            lat: 39.8890100,
            lon: -0.0849900,
        }

        const to: Coords = {
            name: 'Castellón de la Plana',
        }

        await pathwayController.calculatePathway(from, to, PathwayTransportMeans.VEHICLE, PathwayTypes.RECOMMENDED).then((pathway: Pathway) => {
            expect(pathway).toBeTruthy();
            expect(pathway.distance).toBeGreaterThanOrEqual(1);
        });

    });

    test('HU13 - E3 - Ruta no posible', async () => {
        const from: Coords = {
            lat: 39.9929000,
            lon: -0.0576800
        }

        const to: Coords = {
            lat: -34.6131500,
            lon: -58.3772300
        }

        try {
            await pathwayController.calculatePathway(from, to, PathwayTransportMeans.VEHICLE, PathwayTypes.RECOMMENDED);
            throw new Error();
        } catch (error) {
            if (error instanceof PathwayException) {
                expect(error.message).toBe(PathWayExceptionMessages.FarPathway);
            } else {
                throw new Error('Lanzada una excepción no controlada');
            }
        }
    });

    test('HU17 - E01 - La ruta es válida y no ha sido guardada anteriormente', async () => {

        const loggedUser = await authController.loginWithEmailAndPassword(testUser.email, testUser.password);
        await pathwayController.replacePathways([], loggedUser.uid);

        const pathway: Pathway = {
            start: {
                lat: 39.988126910927626,
                lon: -0.05202140449041774
            },
            end: {
                lat: 39.986597808112535,
                lon: -0.05682265874338428
            },
            codifiedPath: "",
            duration: 399.9,
            distance: 555.4,
            type: PathwayTypes.RECOMMENDED,
            transportMean: PathwayTransportMeans.VEHICLE,
            favourite: false,
            cost: 0
        };

        await pathwayController.addPathway(pathway, loggedUser.uid);
        const pathways = await pathwayController.getPathways(loggedUser.uid);
        expect(pathways).toHaveLength(1);
        await authController.logout();
    }, 15000);



    test('HU18 - E01 - Hay rutas dadas de alta.', async () => {
        const loggedUser = await authController.loginWithEmailAndPassword(testUser.email, testUser.password);
        await pathwayController.replacePathways([validPathway1], loggedUser.uid);
        const pathways = await pathwayController.getPathways(loggedUser.uid);
        expect(pathways).toStrictEqual([validPathway1]);
        await authController.logout();
    });

    test('HU18 - E02 - La lista de rutas está vacía.', async () => {

        const loggedUser = await authController.loginWithEmailAndPassword(testUser.email, testUser.password);
        await pathwayController.replacePathways([], loggedUser.uid);
        try {
            await pathwayController.getPathways(loggedUser.uid);
            throw new Error();
        } catch (error) {
            await authController.logout();
            if (error instanceof PathwayException) {
                expect(error.message).toBe(PathWayExceptionMessages.EmptyPathwayList);
            } else {
                throw new Error('Lanzada una excepción no controlada');
            }
        }
    });

    test('HU19 - E01 - Hay rutas dadas de alta y existe la ruta que se quiere eliminar', async () => {
        const loggedUser = await authController.loginWithEmailAndPassword(testUser.email, testUser.password);
        await pathwayController.replacePathways([validPathway1, validPathway2], loggedUser.uid);
        await pathwayController.deletePathway(validPathway1, loggedUser.uid);
        const pathways = await pathwayController.getPathways(loggedUser.uid);
        expect(pathways).toHaveLength(1);
        await authController.logout();
    });

    test('HU19 - E02 - Hay rutas dadas de alta pero no existe la ruta que se quiere eliminar', async () => {
        const loggedUser = await authController.loginWithEmailAndPassword(testUser.email, testUser.password);
        await pathwayController.replacePathways([validPathway1], loggedUser.uid);
        try {
            await pathwayController.deletePathway(validPathway2, loggedUser.uid);
            throw new Error();
        } catch (error) {
            await authController.logout();
            if (error instanceof PathwayException) {
                expect(error.message).toBe(PathWayExceptionMessages.PathwayNotFound);
            } else {
                throw new Error('Lanzada una excepción no controlada');
            }
        }
    });

    test('HU19 - E03 - No hay rutas dadas de alta', async () => {
        const loggedUser = await authController.loginWithEmailAndPassword(testUser.email, testUser.password);
        await pathwayController.replacePathways([], loggedUser.uid);
        try {
            await pathwayController.deletePathway(validPathway1, loggedUser.uid);
            throw new Error();
        } catch (error) {
            await authController.logout();
            if (error instanceof PathwayException) {
                expect(error.message).toBe(PathWayExceptionMessages.EmptyPathwayList);
            } else {
                throw new Error('Lanzada una excepción no controlada');
            }
        }
    });

    test('HU22 - E01 - Existe una lista con rutas dadas de alta y existe la ruta que se quiere marcar como favorita.', async () => {
        const validPathwayFav = {
            id: 100,
            start: {
                lat: 39.988126910927626,
                lon: -0.05202140449041774
            },
            end: {
                lat: 39.986597808112535,
                lon: -0.05682265874338428
            },
            codifiedPath: "pathCodified",
            duration: 399.9,
            distance: 555.4,
            type: PathwayTypes.RECOMMENDED,
            transportMean: PathwayTransportMeans.VEHICLE,
            favourite: true,
            cost: 0
        };
        const loggedUser = await authController.loginWithEmailAndPassword(testUser.email, testUser.password);
        await pathwayController.replacePathways([validPathway1], loggedUser.uid);
        await pathwayController.updatePathways([validPathwayFav], loggedUser.uid);
        const pathwayData = await pathwayController.getPathways(loggedUser.uid);
        expect(pathwayData[0].favourite).toBe(true);
        await authController.logout();
    }, 30000);

    test('HU24 - E1 - Usuario identificado', async () => {
        const testUser = {
            email: 'usuario.permanente@test.com',
            password: '123456789',
        }
        const loggedUser: UserModel = await authController.loginWithEmailAndPassword(testUser.email, testUser.password);
        await pathwayController.setDefaultPathwayType(PathwayTypes.RECOMMENDED, loggedUser.uid);
        expect(loggedUser).toBeTruthy();
        await authController.logout();
    });

    test('HU24 - E2 - Usuario no identificado', async () => {
        try {
            await pathwayController.setDefaultPathwayType(PathwayTypes.RECOMMENDED, '');
            throw new Error();
        } catch (e) { }
    });

    describe('HU14 - Calcular coste de una ruta en coche', () => {
        test('E01 - Existe una ruta, un vehículo asignado y se conoce el precio actual del combustible.', async () => {

            const vehicle: Vehicle = {
                plate: '100',
                consumption: 5,
                name: 'Empresa',
                propulsion: Combustible.Gasolina
            }
            await pathwayController.calculatePrice(1000, vehicle).then((price: number) => {
                expect(price).toBeTruthy();
                expect(price).toBeGreaterThan(0);
            });


        }, 60000);

        // No se puede afirmar que falle el API
        // test('E02 - Existe una ruta, un vehículo asignado pero se desconoce el precio actual del combustible.', async () => {
        //     //Given


        //     //When


        //     //Then


        // });
        test('E03 - Existe una ruta pero se desconoce el vehículo a usar.', async () => {
            const vehicle: Vehicle = {
                plate: '',
                name: '',
                propulsion: Combustible.Gasolina,
                consumption: 0
            }

            await pathwayController.calculatePrice(1000, vehicle).then((price: number) => {
                fail('Debería saltar una excepción');
            }).catch((error) => {
                if (error instanceof VehicleNotFoundException) {
                    expect(error.message).toBe('El vehículo no existe');
                } else {
                    fail('Lanzada una excepción no controlada');
                }
            });
        });


        test('E04 - No hay ninguna ruta', async () => {
            const vehicle: Vehicle = {
                plate: '100',
                name: 'Empresa',
                propulsion: Combustible.Gasolina,
                consumption: 5
            }
            await pathwayController.calculatePrice(0, vehicle).then((price: number) => {
                fail('Debería saltar una excepción');
            }).catch((error) => {
                if (error instanceof PathwayException) {
                    expect(error.message).toBe('Bad pathway: From and to too far away');
                } else {
                    fail('Lanzada una excepción no controlada');
                }
            });
        });
    });

    describe('HU15 - Calcular el coste de una ruta a pie o en bicicleta', () => {
        test('E01 - La ruta es válida y se selecciona como método de recorrido bici o andando', async () => {
            const calories = pathwayController.calculateCalories(1000, PathwayTransportMeans.WALKING);
            expect(calories).toBeTruthy();
            expect(calories).toBeGreaterThan(0);
        });
        test('E02 - La ruta es válida pero se selecciona un método de recorrerla distinto a bici o andando', async () => {
            try {
                const calories = pathwayController.calculateCalories(1000, PathwayTransportMeans.VEHICLE);
                fail('Debería haber saltado una excepción');
            } catch (error) {
                if (error instanceof VehicleNotFoundException) {
                    expect(error.message).toBe('No se ha seleccionado un vehículo de tipo Bicicleta o Andando');
                } else {
                    fail('Se ha lanzado una excepción no esperada');
                }
            }
        });
    })

});
