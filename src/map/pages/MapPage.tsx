import {NavBar} from "../../components/NavBar.tsx";
import {DetailsPage} from "../../auth/pages/DetailsPage.tsx";
import {AuthContext, AuthContextInterface} from "../../context/AuthContext.tsx";
import {useContext} from "react";
import {PreferencesPage} from "../../auth/pages/PreferencesPage.tsx";

export const MapPage = () => {

    const { wantDetails, wantPreferences }: AuthContextInterface = useContext(AuthContext);

    return (
        <>
            <NavBar />
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <h1>Map Page</h1>
            </div>
            {
                wantDetails && <DetailsPage />
            }
            {
                wantPreferences && <PreferencesPage />
            }
        </>
    )
}
