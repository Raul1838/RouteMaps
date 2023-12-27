import {AuthContext, AuthContextInterface} from "../../context/AuthContext.tsx";
import {useContext, useEffect, useState} from "react";
import VehiclesController, {getVehiclesController} from "../../controller/VehiclesController.ts";
import {getPathwayController, PathwayController} from "../../controller/PathwayController.ts";
import Vehicle from "../../interfaces/Vehicle.ts";
import {ObjectDetails} from "../components/ObjectDetails.tsx";

const vehiclesController: VehiclesController = getVehiclesController();
const pathwayController: PathwayController = getPathwayController();

export const PreferencesPage = () => {
    const authContext: AuthContextInterface = useContext(AuthContext);
    const { user, defaultVehiclePlate, defaultPathwayType } = authContext;
    const [defaultVehicle, setDefaultVehicle] = useState<Vehicle>({} as Vehicle);
    const [vehicleErrorMessage, setVehicleErrorMessage] = useState<string>('');

    useEffect(() => {
        getVehicleFromDb();
    }, []);

    const getVehicleFromDb = async () => {
        let dbVehicleId: string = '';
        if( !defaultVehiclePlate ) {
            try {
                dbVehicleId = await vehiclesController.getDefaultVehicle(user.uid);
            } catch (error) {
                setVehicleErrorMessage('No hay vehículo por defecto');
                return;
            }
            authContext.setDefaultVehiclePlate(dbVehicleId);
        } else {
            dbVehicleId = defaultVehiclePlate;
        }
        setDefaultVehicle(vehiclesController.getVehicle(dbVehicleId));
    }

    const closePreferences = () => {
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
                        : <ObjectDetails items={[
                            { label: 'Matrícula', value: defaultVehicle.plate },
                            { label: 'Nombre', value: defaultVehicle.name}
                        ]} />
                }
                <h4>Tipo de ruta por defecto</h4>
                <ObjectDetails items={[
                    { label: 'Tipo de ruta', value: defaultPathwayType }
                ]} />
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <button className="btn btn-outline-primary mt-3" onClick={closePreferences}>Cerrar</button>
                </div>
            </div>
        </div>
    )
}
