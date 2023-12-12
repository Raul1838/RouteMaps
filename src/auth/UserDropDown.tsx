import {Dropdown} from 'react-bootstrap';
import {AuthController, getAuthController} from "../controller/AuthController.ts";
import {useContext} from "react";
import {AuthContext, AuthContextInterface} from "../context/AuthContext.tsx";

export const UserDropDown = () => {

    const authContext: AuthContextInterface = useContext(AuthContext);

    const handleLogout = async () => {
        const authController: AuthController = getAuthController();
        await authController.logout();
        authContext.setUser({
            uid: '',
            email: '',
            displayName: '',
        });
    }

    return (
        <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                <i className="fas fa-user"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#">Detalles</Dropdown.Item>
                <Dropdown.Item href="#">Ajustes</Dropdown.Item>
                <Dropdown.Item onClick={ handleLogout }>Cerrar Sesión</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}
