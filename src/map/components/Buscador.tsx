import {useContext} from "react";
import {FormField} from "../../interfaces/FormField.ts";
import {FormState} from "../../hooks/useForm.ts";
import {NavigationContext, NavigationContextInterface} from "../../context/NavigationContext.tsx";
import {SmartForm} from "../../auth/components/SmartForm.tsx";
import PlacesController, {getPlacesController} from "../../controller/PlacesController.ts";

export const Buscador = () => {

    const navigationContext : NavigationContextInterface = useContext(NavigationContext);

    const formData = {
        from: '',
        to: ''
    }

    const formFields: FormField[] = [
        { id: 'from', label: 'Desde', type: 'text' },
        { id: 'to', label: 'Hasta', type: 'text' }
    ];

    const handleSearch = async ( formState: FormState ) => {
        const placesController: PlacesController = getPlacesController();
        const [fromCoords, toCoords] = await Promise.all([
            placesController.transformToValidCoords(formState.from),
            placesController.transformToValidCoords(formState.to)
        ]);
        navigationContext.setFrom({...fromCoords});
        navigationContext.setTo({...toCoords});
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
                <SmartForm formData={ formData } formFields={ formFields } onSubmit={ handleSearch } submitButtonLabel={ 'Navegar' }/>
            </div>
        </div>
    )
}
