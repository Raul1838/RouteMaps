import {DetailsPage} from "../../auth/pages/DetailsPage.tsx";
import {AuthContext, AuthContextInterface} from "../../context/AuthContext.tsx";
import {useContext} from "react";
import {Buscador} from "../components/Buscador.tsx";
import {InteractiveMap} from "../components/InteractiveMap.tsx";
import {PreferencesPage} from "../../auth/pages/PreferencesPage.tsx";
import {MainLayout} from "../../layouts/MainLayout.tsx";

export const MapPage = () => {

    const {wantDetails, wantPreferences}: AuthContextInterface = useContext(AuthContext);

    return (
        <>
            <MainLayout>
                <Buscador />
                <InteractiveMap />
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
