import {SmartForm} from "../components/SmartForm.tsx";
import {FormField} from "../../interfaces/FormField.ts";
import {FormLink} from "../../interfaces/FormLink.ts";
import {useContext} from "react";
import {AuthController, getAuthController} from "../../controller/AuthController.ts";
import {UserModel} from "../../interfaces/UserModel.ts";
import {AuthContext} from "../../context/AuthContext.tsx";
import {FormState} from "../../hooks/useForm.ts";

export const LoginPage = () => {
    const authContext = useContext(AuthContext);

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

    const onSubmit = async ( formState: FormState ) => {
        const authController: AuthController = getAuthController();
        const user: UserModel = await authController.loginWithEmailAndPassword(formState.email, formState.password);
        authContext?.setUser(user);
        console.log(user);
    };

    return(
        <>
            <div className="row" style={{ margin: '20px' }}>
                <div className="col-6">
                    <h2>Iniciar Sesión</h2>
                    <hr />
                    <SmartForm formData={ formData } formFields={ formFields } additionalFormLink={ formLink }
                               onSubmit={ onSubmit } submitButtonLabel="Iniciar sesión" />
                </div>
                <div className="col-6">
                    <img src="https://i.pinimg.com/originals/89/54/f8/8954f88c60dfde5438e2a5233579b580.jpg" />
                </div>
            </div>
            <div>
                <ul>
                    <li>{ authContext?.user.uid }</li>
                    <li>{ authContext?.user.displayName }</li>
                    <li>{ authContext?.user.email }</li>
                </ul>
            </div>
        </>
    )
}
