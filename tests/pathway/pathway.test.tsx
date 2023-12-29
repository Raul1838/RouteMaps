import { Coords } from "../../src/interfaces/Coords";
import { getPathwayController, PathwayController } from "../../src/controller/PathwayController";
import { PathwayException, PathWayExceptionMessages } from "../../src/exceptions/PathwayException";
import { Pathway } from "../../src/interfaces/Pathway";
import VehiclesController, { getVehiclesController } from "../../src/controller/VehiclesController";
import VehicleNotFoundException from "../../src/exceptions/VehicleNotFoundException";
<<<<<<< HEAD
import PathwayVehicleEnum from "../../src/enums/PathwayVehicleEnum";
=======
import PathwayTypeEnum from "../../src/enums/PathwayTypeEnum";
>>>>>>> HU14-Routes
import Vehicle from "../../src/interfaces/Vehicle";
import Combustible from "../../src/enums/Combustible";
import { error } from "console";

describe('Tests sobre gestión de rutas', () => {

    let pathwayController: PathwayController;
    let vehiclesController: VehiclesController;

    beforeAll(() => {
        pathwayController = getPathwayController();
        vehiclesController = getVehiclesController();
    });

    // test('HU13 - E1 - Ruta posible', async () => {
    //     const from: Coords = {
    //         lat: 39.8890100,
    //         lon: -0.0849900,
    //     }

    //     const to: Coords = {
    //         name: 'Castellón de la Plana',
    //     }

    //     await pathwayController.calculatePathway(from, to).then((pathway: Pathway) => {
    //         expect(pathway).toBeTruthy();
    //         expect(pathway.steps.length).toBeGreaterThanOrEqual(1);
    //     });

    // });

    // test('HU13 - E3 - Ruta no posible', async () => {
    //     const from: Coords = {
    //         lat: 39.9929000,
    //         lon: -0.0576800
    //     }

    //     const to: Coords = {
    //         lat: -34.6131500,
    //         lon: -58.3772300
    //     }

    //     try {
    //         await pathwayController.calculatePathway(from, to);
    //         throw new Error();
    //     } catch (error) {
    //         if (error instanceof PathwayException) {
    //             expect(error.message).toBe(PathWayExceptionMessages.InvalidPathway);
    //         } else {
    //             throw new Error('Lanzada una excepción no controlada');
    //         }
    //     }
    // });

    // test('HU23 - E1 - Existe el vehículo a establecer por defecto', async () => {
    //     const vehicleId: number = 123;
    //     const permanentUserId: string = 'B8WGDNWfKATSxoA46cMEvNVFTLJ2';
    //     await vehiclesController.setDefaultVehicle(vehicleId, permanentUserId);
    //     const defauilVehicle = await vehiclesController.getDefaultVehicle(permanentUserId);
    // });

    // test('HU23 - E2 - No existe el vehículo a establecer por defecto', async () => {
    //     const vehicleId: number = 321;
    //     const permanentUserId: string = 'B8WGDNWfKATSxoA46cMEvNVFTLJ2';
    //     try {
    //         await vehiclesController.setDefaultVehicle(vehicleId, permanentUserId);
    //         throw new Error();
    //     } catch (error) {
    //         if (error instanceof VehicleNotFoundException) {
    //             expect(error.message).toBe('El vehículo no existe');
    //         } else {
    //             throw new Error('Lanzada una excepción no controlada');
    //         }
    //     }
    // });

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
                steps: [],
                distance: 1000,
                duration: 500,
            };

            const vehicle: Vehicle = {
                id: 100,
                consumo: 5,
                Nombre: 'Empresa',
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
                steps: [],
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
                id: 100,
                consumo: 5,
                Nombre: 'Empresa',
                propulsion: Combustible.Gasolina
            }
            await pathwayController.calculatePrice(pathway, vehicle).then((price: number) => {
                fail('Debería saltar una excepción');
            }).catch((error) => {
                if (error instanceof PathwayException) {
<<<<<<< HEAD
                    expect(error.message).toBe('Bad pathway: From and to too far away');
=======
                    expect(error.message).toBe('La ruta no es válida');
>>>>>>> HU14-Routes
                } else {
                    fail('Lanzada una excepción no controlada');
                }
            });
        });
    });

<<<<<<< HEAD
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
                steps: [],
                distance: 1000,
                duration: 500,
            };

            const calories = pathwayController.calculateCalories(pathway, PathwayVehicleEnum.Walkinkg);
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
                steps: [],
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
                steps: [],
                distance: 0,
                duration: 0,
            };

            try {
                const calories = pathwayController.calculateCalories(pathway, PathwayVehicleEnum.Walkinkg);
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

=======
>>>>>>> HU14-Routes
});
