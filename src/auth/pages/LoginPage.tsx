import {SmartForm} from "../components/SmartForm.tsx";
import {FormField} from "../../interfaces/FormField.ts";
import {FormLink} from "../../interfaces/FormLink.ts";
import {useContext} from "react";
import {AuthController, getAuthController} from "../../controller/AuthController.ts";
import {UserModel} from "../../interfaces/UserModel.ts";
import {AuthContext, AuthContextInterface} from "../../context/AuthContext.tsx";
import {FormState} from "../../hooks/useForm.ts";
import {FormValidations} from "../../interfaces/FormValidations.ts";

export const LoginPage = () => {
    const authContext : AuthContextInterface | undefined = useContext(AuthContext);

    const formData = {
        email: '',
        password: ''
    }

    const formFields: FormField[] = [
        { id: 'email', label: 'Dirección de correo electrónico', type: 'email' },
        { id: 'password', label: 'Contraseña', type: 'password', placeholder: 'Longitud mínima 6 carácteres' }
    ];

    const formLink: FormLink = {
        url: '/register',
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

    const onSubmit = async ( formState: FormState ) => {
        const authController: AuthController = getAuthController();
        const user: UserModel = await authController.loginWithEmailAndPassword(formState.email, formState.password);
        authContext!.setUser(user);
        console.log(user);
    };

    return(
        <>
            <div className="row d-flex align-items-center" style={{ margin: '20px', minHeight: '80vh' }}>
                <div className="col-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title" style={{ marginBottom: '20px' }}>Iniciar Sesión</h2>
                            <hr style={{ marginBottom: '20px' }} />
                            <SmartForm formData={ formData } formFields={ formFields } additionalFormLink={ formLink }
                                       onSubmit={ onSubmit } submitButtonLabel="Iniciar sesión" validations={ validations } />
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <img src="https://i.pinimg.com/originals/89/54/f8/8954f88c60dfde5438e2a5233579b580.jpg"  alt="map image | auth"/>
                </div>
            </div>
            <div className="row" style={{ margin: 20 }}>
                <ul className="list-group col-6">
                    <li className="list-group-item"><strong>UID:</strong> { authContext?.user.uid }</li>
                    <li className="list-group-item"><strong>Nombre:</strong> { authContext?.user.displayName }</li>
                    <li className="list-group-item"><strong>Email:</strong> { authContext?.user.email }</li>
                </ul>
            </div>
        </>
    )

}
