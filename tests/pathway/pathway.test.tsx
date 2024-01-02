import { Coords } from "../../src/interfaces/Coords";
import PathwayController, { getPathwayController, } from "../../src/controller/PathwayController";
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

describe('Tests sobre gestión de rutas', () => {

    let pathwayController: PathwayController;
    let vehiclesController: VehiclesController;
    let authController: AuthController;


    const validPathway: Pathway = {
        id: 100,
        start: {
            lat: 39.988126910927626,
            lon: -0.05202140449041774
        },
        end: {
            lat: 39.986597808112535,
            lon: -0.05682265874338428
        },
        path: [
            {
                "distance": 52.9,
                "duration": 38.1,
                "instruction": "Head southwest on Calle Pintor Oliet",
                "name": "Calle Pintor Oliet",
            },
            {
                "distance": 5.9,
                "duration": 4.3,
                "instruction": "Turn right",
                "name": "-",
            },
            {
                "distance": 151.3,
                "duration": 109.0,
                "instruction": "Turn left",
                "name": "-",
            },
            {
                "distance": 133.1,
                "duration": 95.8,
                "instruction": "Continue straight onto Camino Viejo Alcora",
                "name": "Camino Viejo Alcora",
            },
            {
                "distance": 109.5,
                "duration": 78.8,
                "instruction": "Continue straight onto Camino Viejo Alcora",
                "name": "Camino Viejo Alcora",
            },
            {
                "distance": 56.1,
                "duration": 40.4,
                "instruction": "Turn left onto Calle Budapest",
                "name": "Calle Budapest",
            },
            {
                "distance": 46.5,
                "duration": 33.5,
                "instruction": "Turn right onto Avenida Alcora, CV-1540",
                "name": "Avenida Alcora, CV-1540",
            },
            {
                "distance": 0.0,
                "duration": 0.0,
                "instruction": "Arrive at Avenida Alcora, CV-1540, on the right",
                "name": "-",
            }
        ],
        duration: 399.9,
        distance: 555.4,
        type: PathwayTypes.RECOMMENDED,
        transportMean: PathwayTransportMeans.VEHICLE,
        favourite: false
    };

    beforeAll(() => {
        pathwayController = getPathwayController();
        vehiclesController = getVehiclesController();
        authController = getAuthController();
    });

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
            await pathwayController.calculatePathway(from, to);
            throw new Error();
        } catch (error) {
            if (error instanceof PathwayException) {
                expect(error.message).toBe(PathWayExceptionMessages.FarPathway);
            } else {
                throw new Error('Lanzada una excepción no controlada');
            }
        }
    });



    test('HU18 - E01 - Hay rutas dadas de alta.', async () => {
        expect.assertions(1);
        pathwayController.setPathways([validPathway]);
        const pathways: Pathway[] = pathwayController.getPathhways();
        expect(pathways).toStrictEqual([validPathway]);
    });

    test('HU18 - E02 - La lista de rutas está vacía.', async () => {
        expect.assertions(1);
        pathwayController.setPathways([]);
        try {
            const pathways: Pathway[] = pathwayController.getPathhways();
        } catch (error) {
            if (error instanceof PathwayException) {
                expect(error.message).toBe(PathWayExceptionMessages.EmptyPathwayList);
            } else {
                throw new Error('Lanzada una excepción no controlada');
            }
        }
    });

    test('HU19 - E01 - Hay rutas dadas de alta y existe la ruta que se quiere eliminar', async () => {
        expect.assertions(1);
        pathwayController.setPathways([validPathway]);
        pathwayController.deletePlace(validPathway.id);
        expect(pathwayController.getPathhways()).toHaveLength(0);
    });

    test('HU19 - E02 - Hay rutas dadas de alta pero no existe la ruta que se quiere eliminar', async () => {
        expect.assertions(1);
        pathwayController.setPathways([validPathway]);
        try {
            pathwayController.deletePlace(validPathway.id);
        } catch (error) {
            if (error instanceof PathwayException) {
                expect(error.message).toBe(PathWayExceptionMessages.PathwayNotFound);
            } else {
                throw new Error('Lanzada una excepción no controlada');
            }
        }
    });

    test('HU19 - E03 - No hay rutas dadas de alta', async () => {
        expect.assertions(1);
        pathwayController.setPathways([]);
        try {
            pathwayController.deletePlace(validPathway.id);
        } catch (error) {
            if (error instanceof PathwayException) {
                expect(error.message).toBe(PathWayExceptionMessages.EmptyPathwayList);
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
            plate: '123',
            name: 'Test vehicle',
            consumption: 0,
            propulsion: Combustible.Diesel,
            favorite: false,
        }
        vehiclesController.addVehicle(vehicle);
        const loggedUser: UserModel = await authController.loginWithEmailAndPassword(testUser.email, testUser.password);
        await vehiclesController.setDefaultVehicle(vehicle.plate, loggedUser.uid);
        await authController.logout();
    });

    test('HU23 - E2 - No existe el vehículo a establecer por defecto', async () => {
        const testUser = {
            email: 'usuario.permanente@test.com',
            password: '123456789',
        }
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
        } catch (e) { }
    });

    describe('HU14 - Calcular coste de una ruta en coche', () => {
        test('E01 - Existe una ruta, un vehículo asignado y se conoce el precio actual del combustible.', async () => {

            const pathway: Pathway = {
                start: {
                    lat: 39.9929000,
                    lon: -0.0576800
                },
                end: {
                    lat: -34.6131500,
                    lon: -58.3772300
                },
                path: [],
                distance: 1000,
                duration: 500,
            };

            const vehicle: Vehicle = {
                plate: '100',
                consumption: 5,
                name: 'Empresa',
                propulsion: Combustible.Gasolina
            }

            await pathwayController.calculatePrice(pathway, vehicle).then((price: number) => {
                expect(price).toBeTruthy();
                expect(price).toBeGreaterThan(0);
            });


        }, 30000);

        // No se puede afirmar que falle el API
        // test('E02 - Existe una ruta, un vehículo asignado pero se desconoce el precio actual del combustible.', async () => {
        //     //Given


        //     //When


        //     //Then


        // });
        test('E03 - Existe una ruta pero se desconoce el vehículo a usar.', async () => {
            const pathway: Pathway = {
                start: {
                    lat: 39.9929000,
                    lon: -0.0576800
                },
                end: {
                    lat: -34.6131500,
                    lon: -58.3772300
                },
                path: [],
                distance: 1000,
                duration: 500,
            };

            const vehicle: Vehicle = 0;

            await pathwayController.calculatePrice(pathway, vehicle).then((price: number) => {
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
            const pathway: Pathway = 0;

            const vehicle: Vehicle = {
                plate: '100',
                name: 'Empresa',
                propulsion: Combustible.Gasolina,
                consumption: 5
            }
            await pathwayController.calculatePrice(pathway, vehicle).then((price: number) => {
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
        test('E01 - La ruta es válida y se selecciona como método de recorrido bici o andando', () => {
            const pathway: Pathway = {
                start: {
                    lat: 39.9929000,
                    lon: -0.0576800
                },
                end: {
                    lat: -34.6131500,
                    lon: -58.3772300
                },
                path: {},
                distance: 1000,
                duration: 500,
            };

            const calories = pathwayController.calculateCalories(pathway, PathwayTransportMeans.WALKING);
            expect(calories).toBeTruthy();
            expect(calories).toBeGreaterThan(0);

        });
        test('E02 - La ruta es válida pero se selecciona un método de recorrerla distinto a bici o andando', () => {
            const pathway: Pathway = {
                start: {
                    lat: 39.9929000,
                    lon: -0.0576800
                },
                end: {
                    lat: -34.6131500,
                    lon: -58.3772300
                },
                path: [],
                distance: 1000,
                duration: 500,
            };

            try {
                const calories = pathwayController.calculateCalories(pathway, 0);
                fail('Debería haber saltado una excepción');
            } catch (error) {
                if (error instanceof VehicleNotFoundException) {
                    expect(error.message).toBe('No se ha seleccionado un vehículo de tipo Bicicleta o Andando');
                } else {
                    fail('Se ha lanzado una excepción no esperada');
                }
            }
        });
        test('E03 - La ruta no es válida.', () => {
            const pathway: Pathway = {
                start: {
                    lat: 39.9929000,
                    lon: -0.0576800
                },
                end: {
                    lat: -34.6131500,
                    lon: -58.3772300
                },
                path: [],
                distance: 0,
                duration: 0,
            };

            try {
                const calories = pathwayController.calculateCalories(pathway, PathwayTransportMeans.WALKING);
                fail('Debería haber saltado una excepción');
            } catch (error) {
                if (error instanceof PathwayException) {
                    expect(error.message).toBe('Bad pathway: From and to too far away');
                } else {
                    fail('Se ha lanzado una excepción no esperada');
                }
            }
        });
    })

});
