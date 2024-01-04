import {useContext} from "react";
import {FormField} from "../../interfaces/FormField.ts";
import {FormState} from "../../hooks/useForm.ts";
import {NavigationContext, NavigationContextInterface} from "../../context/NavigationContext.tsx";
import {SmartForm} from "../../components/SmartForm.tsx";
import {getPlacesController, PlacesController} from "../../controller/PlacesController.ts";
import {FormValidations} from "../../interfaces/FormValidations.ts";
import {Button} from "react-bootstrap";
import {PathwayTransportMeans} from "../../enums/PathwayTransportMeans.ts";
import {AuthContext, AuthContextInterface} from "../../context/AuthContext.tsx";
import {InputButtonSpecification} from "../../interfaces/InputButtonSpecification.ts";
import PathwayController, {getPathwayController} from "../../controller/PathwayController.ts";
import {useNavigate} from "react-router-dom";
import {PathwayContext, PathwayContextInterface} from "../../context/PathwayContext.tsx";
import {PathwayDetails} from "./PathwayDetails.tsx";

export const Buscador = () => {

    const navigation = useNavigate();

    const authContext: AuthContextInterface = useContext(AuthContext);
    const { user, defaultPathwayType} = authContext;

    const navigationContext : NavigationContextInterface = useContext(NavigationContext);
    const { distance, duration, pathwayTransportMean, pathwayType, vehicle, cost} = navigationContext;

    const { setPathways }: PathwayContextInterface = useContext(PathwayContext);

    const pathwayController: PathwayController = getPathwayController();

    const formData = {
        from: navigationContext.from.name,
        to: navigationContext.to.name
    }

    const formFields: FormField[] = [
        { id: 'from', label: 'Desde', type: 'text' },
        { id: 'to', label: 'Hasta', type: 'text' }
    ];

    const validations: FormValidations = {
        from: (value: string) => {
            if (value.length < 3) {
                return 'Debe tener al menos 3 carácteres';
            }
            return null;
        },
        to: (value: string) => {
            if (value.length < 3) {
                return 'Debe tener al menos 3 carácteres';
            }
            return null;
        }
    }

    const handleNavigate = async ( formState: FormState ) => {
        const placesController: PlacesController = getPlacesController();
        let fromCoords = navigationContext.from;
        if( navigationContext.from.name !== formState.from ) fromCoords = await placesController.transformToValidCoords(formState.from);
        let toCoords = navigationContext.to;
        if( navigationContext.to.name !== formState.to ) toCoords = await placesController.transformToValidCoords(formState.to);
        navigationContext.setFrom({...fromCoords});
        navigationContext.setTo({...toCoords});
        navigationContext.setPathwayType(defaultPathwayType);
    }

    const inputButtonSpecification: InputButtonSpecification = {
        icon: 'fas fa-map-marker-alt',
        onClick: (id: string) => {
            navigationContext.setShowSavedPlaces(!navigationContext.showSavedPlaces);
            navigationContext.setFieldInSelection(id);
        }
    }

    const saveRoute = async () => {
        await pathwayController.addPathway({
            type: pathwayType,
            start: navigationContext.from,
            end: navigationContext.to,
            codifiedPath: navigationContext.codifiedPath,
            duration: duration,
            distance: distance,
            favourite: false,
            transportMean: pathwayTransportMean,
            vehiclePlate: pathwayTransportMean === PathwayTransportMeans.VEHICLE ? vehicle.plate : 'Sin vehículo',
            cost: cost
        }, user.uid).then(pathways => setPathways(pathways));
        navigation('/pathways');
    }

    return (
        <div className="card" style={{
            position: 'fixed',
            top: '55px',
            left: '50px',
            height: 'calc(100% - 60px)',
            width: '300px',
            zIndex: 1,
        }}>
            <div className="card-body">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h3 className="card-title">Ruta</h3>
                    <Button style={{ 'display': duration > 0 && distance > 0 && cost > 0 ? 'block' : 'none' }} variant={"outline-info"} onClick={ saveRoute } >
                        <i className={'fas fa-save'}></i>
                    </Button>
                </div>
                <hr/>
                <SmartForm formData={formData} formFields={formFields} onSubmit={handleNavigate}
                           submitButtonLabel={'Navegar'} validations={validations}
                           inputButtonsSpecification={inputButtonSpecification}
                />
                {
                    distance > 0 && duration > 0 &&
                    <PathwayDetails />
                }
            </div>
        </div>
    )

}
