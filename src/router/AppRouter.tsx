import {Navigate, Route, Routes} from "react-router-dom";
import {AuthContext, AuthContextInterface} from "../context/AuthContext.tsx";
import {useContext, useEffect} from "react";
import {AuthRouter} from "../auth/router/AuthRouter.tsx";
import {MapRouter} from "./MapRouter.tsx";
import {PathwayTypes} from "../enums/PathwayTypes.ts";


export const AppRouter = () => {

    const { isLogged, setIsLogged, setUser, setDefaultPathwayType, setDefaultVehiclePlate }: AuthContextInterface = useContext(AuthContext);

    useEffect(() => {
        const uid: string = localStorage.getItem('uuid') || '';
        const displayName: string = localStorage.getItem('displayName') || '';
        const email: string = localStorage.getItem('email') || '';
        const defaultPathwayTypeValue: string = localStorage.getItem('defaultPathwayType') || 'undefined';
        const defaultPathwayType: PathwayTypes = defaultPathwayTypeValue as PathwayTypes;
        const defaultVehiclePlate: string = localStorage.getItem('defaultVehiclePlate') || '';
        if( !uid || !email || defaultPathwayType === PathwayTypes.UNDEFINED ) {
            setIsLogged(false);
            return;
        }
        setUser({ uid, displayName, email });
        setDefaultPathwayType(defaultPathwayType);
        setDefaultVehiclePlate(defaultVehiclePlate);
        setIsLogged(true);
    }, []);


    return (
        <Routes>
            {
                isLogged
                    ? <Route path='/*' element={ <MapRouter /> } />
                    : <>
                        <Route path='/auth/*' element={ <AuthRouter /> } />
                        <Route path='/*' element={ <Navigate to="/auth" /> } />
                    </>
            }
        </Routes>
    )
}
