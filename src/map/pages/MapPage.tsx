import {DetailsPage} from "../../auth/pages/DetailsPage.tsx";
import {AuthContext, AuthContextInterface} from "../../context/AuthContext.tsx";
import {useContext} from "react";
import {Buscador} from "../components/Buscador.tsx";
import {InteractiveMap} from "../components/InteractiveMap.tsx";
import {PreferencesPage} from "../../auth/pages/PreferencesPage.tsx";
import {MainLayout} from "../../layouts/MainLayout.tsx";
import {NavigationContext, NavigationContextInterface} from "../../context/NavigationContext.tsx";
import {PlacesList} from "../../places/components/PlacesList.tsx";
import Card from 'react-bootstrap/Card';
import {ListVehiclesComponent} from "../../vehicles/components/ListVehiclesComponent.tsx";
import VehiclesController from "../../controller/VehiclesController.ts";
import {FirebaseService} from "../../services/FirebaseService.ts";
import VehiclesViewModel from "../../vehicles/viewModel/VehiclesViewModel.ts";

const vehiclesController = new VehiclesController(new FirebaseService);
const vehiclesViewModel = new VehiclesViewModel(vehiclesController);

export const MapPage = () => {

    const {wantDetails, wantPreferences}: AuthContextInterface = useContext(AuthContext);
    const { showSavedPlaces, showVehicles }: NavigationContextInterface = useContext(NavigationContext);

    return (
        <>
            <MainLayout>
                <Buscador />
                <InteractiveMap />
                {
                    showSavedPlaces &&
                    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh', position: 'relative', zIndex: 2 }}>
                        <Buscador />
                        <Card style={{ width: 'calc(100% - 350px)', position: 'fixed', top: '55px', left: '350px', height: 'calc(100% - 60px)' }}>
                            <Card.Body>
                                <PlacesList showCrudOptions={ false } />
                            </Card.Body>
                        </Card>
                    </div>
                }
                {
                    showVehicles &&
                    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh', position: 'relative', zIndex: 2 }}>
                        <Buscador />
                        <Card style={{ width: 'calc(100% - 350px)', position: 'fixed', top: '55px', left: '350px', height: 'calc(100% - 60px)' }}>
                            <Card.Body>
                                <ListVehiclesComponent vehiclesViewModel={ vehiclesViewModel } />
                            </Card.Body>
                        </Card>
                    </div>
                }
                {
                    wantDetails && <DetailsPage />
                }
                {
                    wantPreferences && <PreferencesPage />
                }
            </MainLayout>
        </>
    );
}
