import { Dropdown } from 'react-bootstrap';
import {AuthContext, AuthContextInterface} from "../../context/AuthContext.tsx";
import {useContext} from "react";
import {AuthController, getAuthController} from "../../controller/AuthController.ts";
import {Link} from "react-router-dom";

export const UserDropDown = () => {

    const authContext : AuthContextInterface = useContext(AuthContext);
    const logout = () => {
        const authController: AuthController = getAuthController();
        authController.logout().then(() => {
            authContext.setUser({
                uid: '',
                displayName: '',
                email: '',
            });
            authContext.setIsLogged(false);
        });
    };

    const showDetails = () => {
        authContext.setWantDetails(true);
    };

    return (
        <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                <i className="fas fa-user"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={ showDetails }>Detalles</Dropdown.Item>
                <Dropdown.Item as={Link} to="/account/preferences">Preferencias</Dropdown.Item>
                <Dropdown.Item onClick={ logout } >Cerrar Sesión</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}
