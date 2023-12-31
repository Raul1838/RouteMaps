import {useContext, useState} from "react";
import {FormField} from "../../interfaces/FormField.ts";
import {FormState} from "../../hooks/useForm.ts";
import {NavigationContext, NavigationContextInterface} from "../../context/NavigationContext.tsx";
import {SmartForm} from "../../components/SmartForm.tsx";
import PlacesController, {getPlacesController} from "../../controller/PlacesController.ts";
import {FormValidations} from "../../interfaces/FormValidations.ts";
import {Button, ButtonGroup} from "react-bootstrap";
import {PathwayTransportMeans} from "../../enums/PathwayTransportMeans.ts";

export const Buscador = () => {

    const navigationContext : NavigationContextInterface = useContext(NavigationContext);
    const { distance, duration, pathwayTransportMean } = navigationContext;

    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

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

    const handleSearch = async ( formState: FormState ) => {
        setFrom(formState.from);
        setTo(formState.to);
        const placesController: PlacesController = getPlacesController();
        const [fromCoords, toCoords] = await Promise.all([
            placesController.transformToValidCoords(formState.from),
            placesController.transformToValidCoords(formState.to)
        ]);
        navigationContext.setFrom({...fromCoords});
        navigationContext.setTo({...toCoords});
    }

    const handleTransportChange = (transportMean: PathwayTransportMeans) => {
        navigationContext.setPathwayTransportMean(transportMean);
    }

    return (
        <div className="card" style={{
            position: 'fixed',
            top: '70px',
            left: '20px',
            height: 'calc(100% - 60px)',
            width: '300px',
            zIndex: 1,
        }}>
            <div className="card-body">
                <h3 className="card-title">Ruta</h3>
                <hr />
                <SmartForm formData={ formData } formFields={ formFields } onSubmit={ handleSearch }
                           submitButtonLabel={ 'Navegar' } validations={ validations } />

                <ButtonGroup aria-label="Transport means">
                    {Object.values(PathwayTransportMeans).map((transportMean) => (
                        <Button
                            key={transportMean}
                            variant={pathwayTransportMean === transportMean ? "primary" : "white"}
                            onClick={() => handleTransportChange(transportMean)}
                        >
                            {transportMean}
                        </Button>
                    ))}
                </ButtonGroup>

                {
                    (distance > 0 && duration > 0)
                        ?   <>
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