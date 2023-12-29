import {NavBar} from "../../components/NavBar.tsx";
import {DetailsPage} from "../../auth/pages/DetailsPage.tsx";
import {AuthContext, AuthContextInterface} from "../../context/AuthContext.tsx";
import {useContext} from "react";
import {Buscador} from "../components/Buscador.tsx";
import {InteractiveMap} from "../components/InteractiveMap.tsx";

export const MapPage = () => {

    const { wantDetails }: AuthContextInterface = useContext(AuthContext);

    return (
        <>
            <NavBar />
            <Buscador />
            <InteractiveMap />
            {
                wantDetails && <DetailsPage />
            }
        </>
    )
}
