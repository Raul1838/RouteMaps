import VehiclesViewModel from '../viewModel/VehiclesViewModel';

import { Link } from "react-router-dom";
import {MainLayout} from "../../layouts/MainLayout.tsx";
import { ListVehiclesComponent } from '../components/ListVehiclesComponent.tsx';

interface ListVehiclesComponentProps {
    vehiclesViewModel: VehiclesViewModel;
}

const GetVehiclesView = ({ vehiclesViewModel }: ListVehiclesComponentProps) => {

    return (
        <MainLayout>
            <div>
            <ListVehiclesComponent vehiclesViewModel={vehiclesViewModel} />
                <Link to={'/vehicles/addVehicle'}>Añadir vehículo</Link>
            </div>
        </MainLayout>
    );
};

export default GetVehiclesView;