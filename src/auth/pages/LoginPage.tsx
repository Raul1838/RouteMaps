import {SmartForm} from "../../components/SmartForm.tsx";
import {FormField} from "../../interfaces/FormField.ts";
import {FormLink} from "../../interfaces/FormLink.ts";
import {useContext} from "react";
import {AuthController, getAuthController} from "../../controller/AuthController.ts";
import {UserModel} from "../../interfaces/UserModel.ts";
import {AuthContext, AuthContextInterface} from "../../context/AuthContext.tsx";
import {FormState} from "../../hooks/useForm.ts";
import {FormValidations} from "../../interfaces/FormValidations.ts";
import VehiclesController, {getVehiclesController} from "../../controller/VehiclesController.ts";
import {PathwayTypes} from "../../enums/PathwayTypes.ts";
import PathwayController, {getPathwayController} from "../../controller/PathwayController.ts";
import {AuthImage} from "../components/AuthImage.tsx";
import logoRouteMapsSinFondo from '../../assets/logoRouteMapsSinFondo.png';

export const LoginPage = () => {
    const authContext : AuthContextInterface = useContext(AuthContext);

    const formData = {
        email: '',
        password: ''
    }

    const formFields: FormField[] = [
        { id: 'email', label: 'Dirección de correo electrónico', type: 'email' },
        { id: 'password', label: 'Contraseña', type: 'password', placeholder: 'Longitud mínima 6 carácteres' }
    ];

    const formLink: FormLink = {
        url: '/auth/register',
        name: '¿No tienes cuenta?',
        clickable: 'Creala'
    }

    const validations: FormValidations = {
        email: (value: string) => {
            if (!value.includes('@')) {
                return 'Debe ser una dirección de correo electrónico válida';
            }
            return null;
        },
        password: (value: string) => {
            if (value.length < 6) {
                return 'Debe tener al menos 6 carácteres';
            }
            return null;
        }
    };

    const handleLogin = async ( formState: FormState ) => {
        const authController: AuthController = getAuthController();
        const pathwayController: PathwayController = getPathwayController();
        const vehiclesController: VehiclesController = getVehiclesController();

        const user: UserModel = await authController.loginWithEmailAndPassword(formState.email, formState.password);
        const defaultPathwayType: PathwayTypes = await pathwayController.getDefaultPathwayType(user.uid);
        let defaultVehiclePlate: string;
        try {
            defaultVehiclePlate = await vehiclesController.getDefaultVehicle(user.uid);
        } catch (error) {
            defaultVehiclePlate = '';
        }

        authContext.setUser(user);
        authContext.setDefaultPathwayType(defaultPathwayType);
        authContext.setDefaultVehiclePlate(defaultVehiclePlate);
        authContext.setIsLogged(true);
    };

    return(
        <>
            <div className="row d-flex align-items-center" style={{margin: '20px', minHeight: '80vh'}}>
                <div className="col-6">
                    <div className="card">
                        <div className="card-body">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h2 className="card-title">Iniciar Sesión</h2>
                                <img
                                    src={logoRouteMapsSinFondo}
                                    width="55"
                                    height="55"
                                    alt="Logo Route Maps"
                                    style={{marginRight: '10px'}}
                                />
                            </div>
                            <hr style={{marginBottom: '20px'}}/>
                            <SmartForm formData={formData} formFields={formFields} additionalFormLink={formLink}
                                       onSubmit={handleLogin} submitButtonLabel="Iniciar sesión"
                                       validations={validations}/>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <AuthImage/>
                </div>
            </div>
        </>
    )

}
