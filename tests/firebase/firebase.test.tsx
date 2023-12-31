import { Coords } from "../../src/interfaces/Coords";
import { getPathwayController, PathwayController } from "../../src/controller/PathwayController";
import { PathwayException, PathWayExceptionMessages } from "../../src/exceptions/PathwayException";
import { Pathway } from "../../src/interfaces/Pathway";
import VehiclesController, { getVehiclesController } from "../../src/controller/VehiclesController";
import VehicleNotFoundException from "../../src/exceptions/VehicleNotFoundException";
import PathwayVehicleEnum from "../../src/enums/PathwayVehicleEnum";
import Vehicle from "../../src/interfaces/Vehicle";
import Combustible from "../../src/enums/Combustible";
import { FirebaseService } from "../../src/services/FirebaseService";
import { OpenRoutingPathway } from "../../src/interfaces/OpenRoutingPathway";
import { getAuthController } from "../../src/controller/AuthController";
import { PathwayTypes } from "../../src/enums/PathwayTypes";
import Place from "../../src/interfaces/Place";

describe('Tests sobre gestión de rutas', () => {

    let pathwayController: PathwayController;
    let vehiclesController: VehiclesController;

    beforeAll(() => {
        pathwayController = getPathwayController();
        vehiclesController = getVehiclesController();
    });

    // test('HU13 - E1 - Ruta posible', async () => {
    //     const firebaseService = new FirebaseService();
    //     const coor1: Coords = { lat: 0, lon: 0, name: '0' };
    //     const coor2: Coords = { lat: 1, lon: 1, name: '1' };
    //     const www: OpenRoutingPathway = {type: 'Prueba'};
    //     const pathway: Pathway = {
    //         distance: 1000,
    //         duration: 1000,
    //         end: coor2,
    //         start: coor1,
    //         favourite: false,
    //         path: www,
    //         type: PathwayTypeEnum.Recommended
    //     };
    //     await firebaseService.storePathway(pathway, 'aaa'); 
    // });
    test('AAA', async () => {
        // const authController = getAuthController();

        // const testUser = {
        //     email: 'usuario.permanente@test.com',
        //     password: '123456789',
        // }
        // await authController.loginWithEmailAndPassword(testUser.email, testUser.password);
        // const firebaseService = new FirebaseService();


        // const coor1: Coords = { lat: 0, lon: 0, name: '0' };
        // const coor2: Coords = { lat: 1, lon: 1, name: '1' };
        // const paths: OpenRoutingPathway = { type: 'Prueba' }; 

        // const pathway: Pathway = {
        //     distance: 1000,
        //     duration: 1000,
        //     end: coor1,
        //     start: coor2,
        //     favourite: false,
        //     path: paths,
        //     type: PathwayTypes.CHEAPEST
        // };

        // await firebaseService.storePathway(pathway, 'aaa');
    });

    test('B', async () => {
        // const authController = getAuthController();

        // const testUser = {
        //     email: 'usuario.permanente@test.com',
        //     password: '123456789',
        // }
        // await authController.loginWithEmailAndPassword(testUser.email, testUser.password);
        // const firebaseService = new FirebaseService();
        // const place : Place = {
        //     Latitud:120,
        //     Favorito: true,
        //     Nombre: 'B',
        //     Longitud: 2
        // }
        // await firebaseService.storePlace(place, 'aaa'); 
    }, 10000);

    test('C', async () => {
        const authController = getAuthController();

        const testUser = {
            email: 'usuario.permanente@test.com',
            password: '123456789',
        }
        await authController.loginWithEmailAndPassword(testUser.email, testUser.password);
        const firebaseService = new FirebaseService();
        const vehicle: Vehicle = {
            name: 'Empresas',
            consumption: 5,
            plate: '1111AAA',
            propulsion: Combustible.Diesel,
            favorite: false
        }
        await firebaseService.storeVehicle(vehicle, 'aaa');
    }, 10000);



});
