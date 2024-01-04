import {AuthContext, AuthContextInterface} from "../../context/AuthContext.tsx";
import {useContext, useEffect, useState} from "react";
import VehiclesController, {getVehiclesController} from "../../controller/VehiclesController.ts";
import PathwayController, {getPathwayController} from "../../controller/PathwayController.ts";
import Vehicle from "../../interfaces/Vehicle.ts";
import {DefaultVehicleDetails} from "../components/DefaultVehicleDetails.tsx";
import {PathwayTypes} from "../../enums/PathwayTypes.ts";
import {DefaultPathwayTypeSwitcher} from "../components/DefaultPathwayTypeSwitcher.tsx";

const vehiclesController: VehiclesController = getVehiclesController();
const pathwayController: PathwayController = getPathwayController();

export const PreferencesPage = () => {
    const authContext: AuthContextInterface = useContext(AuthContext);
    const { user, defaultVehiclePlate, defaultPathwayType } = authContext;
    const [defaultVehicle, setDefaultVehicle] = useState<Vehicle>({} as Vehicle);
    const [vehicleErrorMessage, setVehicleErrorMessage] = useState<string>('')

    useEffect(() => {
        getVehicleFromDb();
        getPathwayTypeFromDb();
    }, []);

    const getVehicleFromDb = async () => {
        let dbVehiclePlate: string = '';
        if( !defaultVehiclePlate ) {
            try {
                dbVehiclePlate = await vehiclesController.getDefaultVehicle(user.uid);
            } catch (error) {
                setVehicleErrorMessage('No hay vehículo por defecto');
                return;
            }
            authContext.setDefaultVehiclePlate(dbVehiclePlate);
        } else {
            dbVehiclePlate = defaultVehiclePlate;
        }
        setDefaultVehicle(await vehiclesController.getVehicle(dbVehiclePlate, user.uid));
    }

    const getPathwayTypeFromDb = async () => {
        if( defaultPathwayType === PathwayTypes.UNDEFINED ) {
            const pathwayTypeDb = await pathwayController.getDefaultPathwayType(user.uid);
            authContext.setDefaultPathwayType(pathwayTypeDb);
        }
    }

    const closePreferences = () => {
        pathwayController.setDefaultPathwayType(defaultPathwayType, user.uid);
        authContext.setWantPreferences(false);
    }

    return (
        <div className="card" style={{ width: '24rem', height: 'auto', position: 'absolute', top: '60px', right: '10px' }}>
            <div className="card-body">
                <h5 className="card-title">Preferencias de la cuenta</h5>
                <hr/>
                <h4>Vehículo por defecto</h4>
                {
                    vehicleErrorMessage.length > 0
                        ? <p>{vehicleErrorMessage}</p>
                        : <DefaultVehicleDetails defaultVehicle={defaultVehicle} />
                }
                <h4>Tipo de ruta por defecto</h4>
                {
                    defaultPathwayType === PathwayTypes.UNDEFINED
                        ? <p>Is loading</p>
                        : <DefaultPathwayTypeSwitcher pathwayType={defaultPathwayType} />
                }
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <button className="btn btn-primary mt-3" onClick={closePreferences}>Cerrar</button>
                </div>
            </div>
        </div>
    )
}
