import {AuthContext, AuthContextInterface} from "../../context/AuthContext.tsx";
import {useContext} from "react";
import {AuthController, getAuthController} from "../../controller/AuthController.ts";

export const DetailsPage = () => {

    const authContext: AuthContextInterface = useContext(AuthContext);
    const { displayName, email } = authContext.user;

    const deleteAccount = () => {
        const authController: AuthController = getAuthController();
        authController.deleteUser().then(() => {
            authContext.setUser({
                uid: '',
                displayName: '',
                email: '',
            });
            authContext.setIsLogged(false);
        });
    };

    return (
        <>
            <h1>Detalles de la cuenta</h1>
            <hr />
            <ul className="list-group">
                <li className="list-group-item"><strong>Display name</strong> - { displayName }</li>
                <li className="list-group-item"><strong>e-mail</strong> - { email }</li>
            </ul>
            <button className="btn btn-danger mt-3" onClick={ deleteAccount }>Eliminar cuenta</button>
        </>
    )
}
