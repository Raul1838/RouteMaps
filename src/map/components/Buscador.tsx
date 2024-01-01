import {useContext, useState} from "react";
import {FormField} from "../../interfaces/FormField.ts";
import {FormState} from "../../hooks/useForm.ts";
import {NavigationContext, NavigationContextInterface} from "../../context/NavigationContext.tsx";
import {SmartForm} from "../../components/SmartForm.tsx";
import PlacesController, {getPlacesController} from "../../controller/PlacesController.ts";
import {FormValidations} from "../../interfaces/FormValidations.ts";
import {Button, ButtonGroup, Dropdown} from "react-bootstrap";
import {PathwayTransportMeans} from "../../enums/PathwayTransportMeans.ts";
import {PathwayTypes} from "../../enums/PathwayTypes.ts";
import {AuthContext, AuthContextInterface} from "../../context/AuthContext.tsx";

const options: PathwayTypes[] = Object.values(PathwayTypes).filter((value) => value !== PathwayTypes.UNDEFINED);

export const Buscador = () => {

    const authContext: AuthContextInterface = useContext(AuthContext);
    const { defaultPathwayType } = authContext;

    const navigationContext : NavigationContextInterface = useContext(NavigationContext);
    const { distance, duration, pathwayTransportMean} = navigationContext;

    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [selection, setSelection] = useState<PathwayTypes>(defaultPathwayType);

    const formData = {
        from,
        to
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
        setFrom(formState.from);
        setTo(formState.to);
        const placesController: PlacesController = getPlacesController();
        const [fromCoords, toCoords] = await Promise.all([
            placesController.transformToValidCoords(formState.from),
            placesController.transformToValidCoords(formState.to)
        ]);
        navigationContext.setFrom({...fromCoords});
        navigationContext.setTo({...toCoords});
        navigationContext.setPathwayType(selection as PathwayTypes);
    }

    const handleTransportChange = (transportMean: PathwayTransportMeans) => {
        navigationContext.setPathwayTransportMean(transportMean);
    }

    const handleSelect = ( eventKey: string | null ) => {
        if( eventKey ) {
            setSelection(eventKey as PathwayTypes);
            navigationContext.setPathwayType(eventKey as PathwayTypes);
        }
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
                <h3 className="card-title">Ruta</h3>
                <hr />
                <SmartForm formData={ formData } formFields={ formFields } onSubmit={ handleNavigate }
                           submitButtonLabel={ 'Navegar' } validations={ validations } />

                <ButtonGroup aria-label="Transport means">
                    {Object.values(PathwayTransportMeans).map((transportMean) => (
                        <Button
                            key={transportMean}
                            variant={pathwayTransportMean === transportMean ? "primary" : "white"}
                            onClick={() => handleTransportChange(transportMean)}
                        >
                            { transportMean }
                        </Button>
                    ))}
                </ButtonGroup>

                <Dropdown onSelect={ handleSelect } className="mt-3">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        { selection }
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {options.map((option, index) =>
                            <Dropdown.Item eventKey={option} key={index}>{option}</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>

                {
                    (distance > 0 && duration > 0)
                        ?   <>
                            <h3>Costes de la ruta</h3>
                            <hr />
                            <ul className="list-group">
                                <li className="list-group-item">Distancia: { distance / 1000 } km</li>
                                <li className="list-group-item">Duración: { Math.floor(duration / 3600) } horas y { Math.round((duration % 3600) / 60) } minutos</li>
                            </ul>
                        </>
                        : <></>
                }

            </div>
        </div>
    )

}
