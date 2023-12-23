import {Coords} from "../../src/interfaces/Coords";
import {getPathwayController, PathwayController} from "../../src/controller/PathwayController";
import {OpenRoutingPathway} from "../../src/interfaces/OpenRoutingPathway";
import {PathwayException, PathWayExceptionMessages} from "../../src/exceptions/PathwayException";

describe('Tests sobre gestión de rutas', () => {

    let pathwayController: PathwayController;

    beforeAll(() => pathwayController = getPathwayController());

    test('HU13 - E1 - Ruta posible' , async () => {
        const from: Coords = {
            lat: 39.8890100,
            lon: -0.0849900,
        }

        const to: Coords = {
            name: 'Castellón de la Plana',
        }

        await pathwayController.calculatePathway(from, to).then((pathway: OpenRoutingPathway) => {
            expect( pathway ).toBeTruthy();
            expect( pathway.features[0].geometry.coordinates.length ).toBeGreaterThanOrEqual(1);
            expect( pathway.metadata.query.coordinates[0] ).toEqual( { lat: from.lat, lon: from.lon } );
            expect( pathway.metadata.query.coordinates.length ).toBe(2);
        });

    });

    test('HU13 - E3 - Ruta no posible' , () => {
        const from: Coords = {
            lat: 39.9929000,
            lon: -0.0576800
        }

        const to: Coords = {
            lat: -34.6131500,
            lon: -58.3772300
        }

        try {
            pathwayController.calculatePathway(from, to);
            throw new Error();
        } catch (error) {
            if( error instanceof PathwayException ) {
                expect(error.message).toBe(PathWayExceptionMessages.InvalidPathway);
            } else {
                throw new Error('Lanzada una excepción no controlada');
            }
        }
    });

});
