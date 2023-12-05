import {SyntheticEvent, useState} from "react";
import {AuthController, getAuthController} from "../../controller/AuthController.ts";

export const RegisterPage = () => {

    const [displayName, setDisplayName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [dirty, setDirty] = useState(false);

    const onSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        setDirty(true);
        if( password.length < 6 ) return;
        const authController: AuthController = getAuthController();
        await authController.registerUserWithEmailAndPassword(email, password, displayName);
    }

    return (
        <>
            <h2>Registro</h2>
            <hr/>
            <form onSubmit={ onSubmit }>
                <div className="form-group">
                    <label htmlFor="displayName">Nombre de Usuario</label>
                    <input
                        className="form-control"
                        type="text"
                        id="displayName"
                        value={ displayName }
                        onChange={ (event) => setDisplayName( event.target.value ) }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Dirección de correo electrónico</label>
                    <input
                        className="form-control"
                        type="email"
                        id="email"
                        value={ email }
                        onChange={ (event) => setEmail( event.target.value ) }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="contraseña">Contraseña</label>
                    <input
                        className="form-control"
                        type="password" id="contraseña"
                        placeholder="Longitud mínima 6 carácteres"
                        value={ password }
                        onChange={ (event) => setPassword( event.target.value ) }
                    />
                    {
                        password.length < 6 && dirty ? <small className="text-danger">Debe tener al menos 6 carácteres</small> : null
                    }
                </div>
                <button type="submit" className="btn btn-primary mt-3">Crear cuenta</button>
            </form>
        </>
    )
}
