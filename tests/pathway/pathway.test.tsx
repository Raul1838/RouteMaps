import { Coords } from "../../src/interfaces/Coords";
import { getPathwayController, PathwayController } from "../../src/controller/PathwayController";
import { PathwayException, PathWayExceptionMessages } from "../../src/exceptions/PathwayException";
import { Pathway } from "../../src/interfaces/Pathway";
import VehiclesController, { getVehiclesController } from "../../src/controller/VehiclesController";
import VehicleNotFoundException from "../../src/exceptions/VehicleNotFoundException";
import PathwayTypeEnum from "../../src/enums/PathwayTypeEnum";

describe('Tests sobre gestión de rutas', () => {

    let pathwayController: PathwayController;
    let vehiclesController: VehiclesController;

    beforeAll(() => {
        pathwayController = getPathwayController();
        vehiclesController = getVehiclesController();
    });

    test('HU13 - E1 - Ruta posible', async () => {
        const from: Coords = {
            lat: 39.8890100,
            lon: -0.0849900,
        }

        const to: Coords = {
            name: 'Castellón de la Plana',
        }

        await pathwayController.calculatePathway(from, to).then((pathway: Pathway) => {
            expect(pathway).toBeTruthy();
            expect(pathway.steps.length).toBeGreaterThanOrEqual(1);
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
                expect(error.message).toBe(PathWayExceptionMessages.InvalidPathway);
            } else {
                throw new Error('Lanzada una excepción no controlada');
            }
        }
    });

    test('HU23 - E1 - Existe el vehículo a establecer por defecto', async () => {
        const vehicleId: number = 123;
        const permanentUserId: string = 'B8WGDNWfKATSxoA46cMEvNVFTLJ2';
        await vehiclesController.setDefaultVehicle(vehicleId, permanentUserId);
        const defauilVehicle = await vehiclesController.getDefaultVehicle(permanentUserId);
        console.log(defauilVehicle);
    });

    test('HU23 - E2 - No existe el vehículo a establecer por defecto', async () => {
        const vehicleId: number = 321;
        const permanentUserId: string = 'B8WGDNWfKATSxoA46cMEvNVFTLJ2';
        try {
            await vehiclesController.setDefaultVehicle(vehicleId, permanentUserId);
            throw new Error();
        } catch (error) {
            if (error instanceof VehicleNotFoundException) {
                expect(error.message).toBe('El vehículo no existe');
            } else {
                throw new Error('Lanzada una excepción no controlada');
            }
        }
    });

    describe('HU14 - Calcular coste de una ruta en coche', () => {
        test('E01 - Existe una ruta, un vehículo asignado y se conoce el precio actual del combustible.', () => {
            //Given
            pathwayController.setRoutes([
                {
                    Id: 1200,
                    Inicio: { Latitud: 39.988126910927626, Longitud: -0.05202140449041774 },
                    Fin: { Latitud: 39.986597808112535, Longitud: -0.05682265874338428 },
                    Trayecto: [
                        {
                            Distancia: 267.2,
                            Duracion: 49.2,
                            Instruccion: "Head southwest on Calle Pintor Oliet",
                            Nombre: "Calle Pintor Oliet",
                        },
                        {
                            Distancia: 285.3,
                            Duracion: 53.8,
                            Instruccion: "Enter the roundabout and take the 1st exit onto Avenida Alcora, CV-1540",
                            Nombre: "Avenida Alcora, CV-1540",
                            Salida: 1,
                        },
                        {
                            Distancia: 0.0,
                            Duracion: 0.0,
                            Instruccion: "Arrive at Avenida Alcora, CV-1540, on the right",
                            Nombre: "-",
                        }
                    ],
                    Duracion: 103.0,
                    Distancia: 552.5,
                    Tipo: PathwayTypeEnum.Recommended,
                    Favorito: false,
                    Vehiculo: 1683
                }]);

            //When


            //Then


        });
        test('E02 - Existe una ruta, un vehículo asignado pero se desconoce el precio actual del combustible.', () => {
            //Given


            //When


            //Then


        });
        test('E03 - Existe una ruta pero se desconoce el vehículo a usar.', () => {
            //Given


            //When


            //Then


        });
        test('E04 - No hay ninguna ruta', () => {
            //Given


            //When


            //Then


        });
    });

});
