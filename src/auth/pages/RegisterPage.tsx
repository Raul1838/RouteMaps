import {SmartForm} from "../components/SmartForm.tsx";
import {FormField} from "../../interfaces/FormField.ts";
import {FormLink} from "../../interfaces/FormLink.ts";
import {FormValidations} from "../../interfaces/FormValidations.ts";
import {AuthContext, AuthContextInterface} from "../../context/AuthContext.tsx";
import {useContext} from "react";
import {FormState} from "../../hooks/useForm.ts";
import {AuthController, getAuthController} from "../../controller/AuthController.ts";
import {UserModel} from "../../interfaces/UserModel.ts";

export const RegisterPage = () => {

    const authContext: AuthContextInterface | undefined = useContext(AuthContext);

    const registerFormData = {
        displayName: '',
        email: '',
        password: '',
    }

    const registerFormFields: FormField[] = [
        {
            id: 'displayName',
            label: 'Nombre',
            type: 'text',
        },
        {
            id: 'email',
            label: 'Email',
            type: 'email',
        },
        {
            id: 'password',
            label: 'Contraseña',
            type: 'password',
            placeholder: 'Longitud mínima 6 caracteres',
        },
    ]

    const registerFromLink: FormLink = {
        name: '¿Ya tienes una cuenta?',
        url: '/login',
        clickable: 'Inicia sesión'
    }

    const registerFormValidations: FormValidations = {
        displayName: (value: string) => {
            if (!value) {
                return 'El nombre es requerido';
            }
            return null;
        },
        email: (value: string) => {
            if (!value) {
                return 'El email es requerido';
            }
            return null;
        },
        password: (value: string) => {
            if (!value) {
                return 'La contraseña es requerida';
            }
            if (value.length < 6) {
                return 'La contraseña debe tener al menos 6 caracteres';
            }
            return null;
        },
    }

    const handleRegister = async ( formState: FormState ) => {
        const authController: AuthController = getAuthController();
        const user: UserModel = await authController.registerUserWithEmailAndPassword(formState.email, formState.password, formState.displayName);
        authContext!.setUser(user);
        console.log(user);
    }

    return(
        <div className="row d-flex align-items-center" style={{margin: '20px', minHeight: '80vh'}}>
            <div className="col-6">
                <div className="card">
                    <div className="card-body">
                        <h1 className="card-title" style={{ marginBottom: '20px' }} >Registrarse</h1>
                        <hr style={{ marginBottom: '20px' }} />
                        <SmartForm
                            formData={registerFormData}
                            formFields={registerFormFields}
                            validations={registerFormValidations}
                            onSubmit={handleRegister}
                            submitButtonLabel="Crear cuenta"
                            additionalFormLink={registerFromLink}
                        />
                    </div>
                </div>
            </div>
            <div className="col-6">
                <img src="https://i.pinimg.com/originals/89/54/f8/8954f88c60dfde5438e2a5233579b580.jpg"
                     alt="Imagen del register page"/>
            </div>
        </div>
    )
}
