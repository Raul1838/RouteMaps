import PlacesController from "../../src/controller/PlacesController";
import VehiclesController from "../../src/controller/VehiclesController";
import Combustible from "../../src/enums/Combustible";
import EmptyVehiclesException from "../../src/exceptions/EmptyVehiclesException";
import InvalidVehicleException from "../../src/exceptions/InvalidVehicleException";
import VehicleAlreadyExistException from "../../src/exceptions/VehicleAlreadyExistException";
import VehicleNotFoundException from "../../src/exceptions/VehicleNotFoundException";
import Vehicle from "../../src/interfaces/Vehicle";
import MockAPIPlacesService from "../helpers/MockApiPlacesService";


var vehiclesController: VehiclesController = new VehiclesController();


describe('Vehicles', () => {
    describe('HU09 - Dar de alta un vehículo', () => {
        test('E01 - Se añade un vehículo no registrado anteriormente con datos correctos.', () => {
            //Given
            vehiclesController.setVehicles([{
                id: 1683,
                Nombre: "Coche empresa",
                propulsion: Combustible.Diesel,
                consumo: 6,
                Favorito: false,
                Defecto: false
            }]);
            //When
            vehiclesController.addVehicle({
                id: 1684,
                Nombre: "Coche personal",
                propulsion: Combustible.Gasolina,
                consumo: 5.5,
                Favorito: true,
                Defecto: false
            })
            //Then
            expect(vehiclesController.getVehicles()).toStrictEqual([{
                id: 1683,
                Nombre: "Coche empresa",
                propulsion: Combustible.Diesel,
                consumo: 6,
                Favorito: false,
                Defecto: false
            },
            {
                id: 1684,
                Nombre: "Coche personal",
                propulsion: Combustible.Gasolina,
                consumo: 5.5,
                Favorito: true,
                Defecto: false
            }])
        });
        test('E02 - El vehículo ya se encuentra dado de alta.', () => {
            //Given
            vehiclesController.setVehicles([{
                id: 1683,
                Nombre: "Coche empresa",
                propulsion: Combustible.Diesel,
                consumo: 6,
                Favorito: false,
                Defecto: false
            }]);
            //When
            const error = () => {
                vehiclesController.addVehicle({
                    id: 1683,
                    Nombre: "Coche empresa",
                    propulsion: Combustible.Diesel,
                    consumo: 6,
                    Favorito: false,
                    Defecto: false
                });
            }
            //Then
            expect(error).toThrow(VehicleAlreadyExistException)
        });
        test('E03 - Los datos del vehículo no son correctos.', () => {
            //Given
            vehiclesController.setVehicles([{
                id: 1683,
                Nombre: "Coche empresa",
                propulsion: Combustible.Diesel,
                consumo: 6,
                Favorito: false,
                Defecto: false
            }])
            //When
            const error = () => {
                vehiclesController.addVehicle({
                    id: "sdbs",
                    Nombre: "Coche empresa",
                    propulsion: Combustible.Caballo,
                    consumo: null,
                    Favorito: null,
                    Defecto: null
                })
            }
            //Then
            expect(error).toThrow(InvalidVehicleException);
        });
    });
    describe('HU10 - Consultar lista de vehículos', () => {
        test('E01 - Existe una lista con vehículos dados de alta.', () => {
            //Given
            vehiclesController.setVehicles([{ id: 1683, Nombre: "Coche empresa", propulsion: Combustible.Diesel, consumo: 6, Favorito: false, Defecto: false }]);
            //When
            var vehicles: Vehicle[] = vehiclesController.getVehicles();
            //Then
            expect(vehicles).toStrictEqual([{ id: 1683, Nombre: "Coche empresa", propulsion: Combustible.Diesel, consumo: 6, Favorito: false, Defecto: false }]);
        });
        test('E02 - No contamos con una lista con vehículos dados de alta.', () => {
            //Given
            vehiclesController.setVehicles([]);
            //When
            const error = () => {
                vehiclesController.deleteVehicle(1000);
            }
            //Then
            expect(error).toThrow(EmptyVehiclesException);
        });
    });
    describe('HU11 - Eliminar un vehículo', () => {
        test.todo('Existe una lista con vehículos dados de alta y existe el vehículo que se quiere eliminar.');
        test.todo('Existe una lista con vehículos dados de alta pero no existe el vehículo que se quiere eliminar.');
        test.todo('No hay vehículos dados de alta.');

    });
    describe('HU12 - Modificar datos de un vehículo', () => {
        test('E01 - Existe una lista con vehículos dados de alta y existe el vehículo que se quiere modificar.', () => {
            //Given
            vehiclesController.setVehicles([{ id: 1683, Nombre: 'Coche empresa', propulsion: Combustible.Diesel, consumo: 6, Favorito: false, Defecto: false }]);
            //When
            vehiclesController.modifyVehicle({ id: 1683, Nombre: 'Coche empresa', propulsion: Combustible.Diesel, consumo: 5 });
            //Then
            expect(vehiclesController.getVehicles()).toStrictEqual([{ id: 1683, Nombre: 'Coche empresa', propulsion: Combustible.Diesel, consumo: 5, Favorito: false, Defecto: false }]);
        });
        test('E02 - Existe una lista con vehículos dados de alta pero no existe el vehículo que se quiere modificar.', () => {
            //Given
            vehiclesController.setVehicles([{ id: 1683, Nombre: 'Coche empresa', propulsion: Combustible.Diesel, consumo: 6 }]);
            //When
            const error = () => {
                vehiclesController.modifyVehicle({ id: 1000, Nombre: 'Coche propio', propulsion: Combustible.Diesel, consumo: 5 });
            }
            //Then
            expect(error).toThrow(VehicleNotFoundException);
        });
        test('E03 - No hay vehículos dados de alta.', () => {
            //Given
            vehiclesController.setVehicles([]);
            //When
            const error = () => {
                vehiclesController.modifyVehicle({ id: 1000, Nombre: 'Coche propio', propulsion: Combustible.Diesel, consumo: 5 });
            }
            //Then
            expect(error).toThrow(EmptyVehiclesException);
        });

    });
});