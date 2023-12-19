import {AuthContext, AuthContextInterface} from "../../context/AuthContext.tsx";
import {useContext} from "react";
import {AuthController, getAuthController} from "../../controller/AuthController.ts";

export const DetailsPage = () => {

    const authContext: AuthContextInterface = useContext(AuthContext);
    const { displayName, email } = authContext.user;

    const closeDetails = () => {
        authContext.setWantDetails(false);
    }

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
        <div className="card" style={{ width: '24rem', height: 'auto', position: 'absolute', top: '60px', right: '10px' }}>
            <div className="card-body">
                <h5 className="card-title">Detalles de la cuenta</h5>
                <hr />
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><strong>Display name</strong> - { displayName }</li>
                    <li className="list-group-item"><strong>e-mail</strong> - { email }</li>
                </ul>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button className="btn btn-outline-primary mt-3" onClick={ closeDetails }>Cerrar</button>
                    <button className="btn btn-outline-danger mt-3" onClick={ deleteAccount }>Eliminar cuenta</button>
                </div>
            </div>
        </div>
    )

}
