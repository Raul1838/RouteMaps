import {Form} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {PathwayContext, PathwayContextInterface} from "../../context/PathwayContext.tsx";
import PathwayController, {getPathwayController} from "../../controller/PathwayController.ts";
import {AuthContext, AuthContextInterface} from "../../context/AuthContext.tsx";

export const PathwaysList = () => {

    const { user }: AuthContextInterface = useContext(AuthContext);
    const { pathways, setPathways }: PathwayContextInterface = useContext(PathwayContext);

    const pathwayController: PathwayController = getPathwayController();

    const [filterFavorites, setFilterFavorites] = useState<boolean>(false);

    useEffect(() => {
        if( pathways.length === 0 ) {
            pathwayController.getPathways(user.uid).then(dbPathways => setPathways([...dbPathways]) );
        }

        return () => {
            savePathwaysOnExit();
        }
    }, []);

    const savePathwaysOnExit = async() => {
        await pathwayController.replacePathways(pathways, user.uid);
    }

    return (
        <Form>
            <Form.Check
                type="switch"
                id="custom-switch"
                label="Filtrar por favoritos"
                checked={filterFavorites}
                onChange={() => setFilterFavorites(!filterFavorites)}
            />
        </Form>
    )
}
