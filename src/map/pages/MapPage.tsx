import {useContext} from "react";
import {Buscador} from "../components/Buscador.tsx";
import {InteractiveMap} from "../components/InteractiveMap.tsx";
import {MainLayout} from "../../layouts/MainLayout.tsx";
import {NavigationContext, NavigationContextInterface} from "../../context/NavigationContext.tsx";
import {PlacesList} from "../../places/components/PlacesList.tsx";
import Card from 'react-bootstrap/Card';
import {ListVehiclesComponent} from "../../vehicles/components/ListVehiclesComponent.tsx";


export const MapPage = () => {

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
                                <ListVehiclesComponent showCrudOptions={ false } />
                            </Card.Body>
                        </Card>
                    </div>
                }
            </MainLayout>
        </>
    );
}
