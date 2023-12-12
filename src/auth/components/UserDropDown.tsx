import { Dropdown } from 'react-bootstrap';

export const UserDropDown = () => {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                <i className="fas fa-user"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#">Detalles</Dropdown.Item>
                <Dropdown.Item href="#">Ajustes</Dropdown.Item>
                <Dropdown.Item href="#">Cerrar Sesión</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}
