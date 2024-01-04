import { Link } from "react-router-dom";
import {MainLayout} from "../../layouts/MainLayout.tsx";
import { ListVehiclesComponent } from '../components/ListVehiclesComponent.tsx';


const GetVehiclesView = () => {

    return (
        <MainLayout>
            <h1>Vehículos guardados</h1>
            <hr />
            <ListVehiclesComponent/>
            <Link className="btn btn-outline-primary mt-3" to={'/vehicles/addVehicle'}>Añadir vehículo</Link>
            
        </MainLayout>
    );
};

export default GetVehiclesView;