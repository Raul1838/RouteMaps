import {Button, Form, Table} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {PathwayContext, PathwayContextInterface} from "../../context/PathwayContext.tsx";
import PathwayController, {getPathwayController} from "../../controller/PathwayController.ts";
import {AuthContext, AuthContextInterface} from "../../context/AuthContext.tsx";
import {Pathway} from "../../interfaces/Pathway.ts";
import {PathwayTransportMeans} from "../../enums/PathwayTransportMeans.ts";
import {useNavigate} from "react-router-dom";
import {NavigationContext, NavigationContextInterface} from "../../context/NavigationContext.tsx";

export const PathwaysList = () => {

    const navigation = useNavigate();

    const { user }: AuthContextInterface = useContext(AuthContext);
    const { pathways, setPathways, setLoadedPathway }: PathwayContextInterface = useContext(PathwayContext);
    const navigationContext : NavigationContextInterface = useContext(NavigationContext);

    const pathwayController: PathwayController = getPathwayController();

    const [filterFavorites, setFilterFavorites] = useState<boolean>(false);

    useEffect(() => {
        if( pathways.length === 0 ) {
            pathwayController.getPathways(user.uid).then(dbPathways => {
                setPathways([...dbPathways]);
            } );
        }

        return () => {
            savePathwaysOnExit();
        }
    }, []);

    const savePathwaysOnExit = async() => {
        await pathwayController.updatePathways(pathways, user.uid);
    }

    const toggleFavorite = (pathway: Pathway) => {
        pathway.favourite = !pathway.favourite;
        setPathways([...pathways]);
    }

    const deletePathway = (pathway: Pathway) => {
        pathwayController.deletePathway(pathway, user.uid).then(() => {
            setPathways([...pathways.filter(element => !pathwayController.pathwaysAreEqual(pathway, element))] );
        });
    }

    const loadPathwayIntoMap = (pathway: Pathway) => {
        navigationContext.setFrom(pathway.start);
        navigationContext.setTo(pathway.end);
        navigationContext.setPathwayType(pathway.type);
        navigationContext.setPathwayTransportMean(pathway.transportMean);
        setLoadedPathway(pathway);
        navigation('/');
    }

    return (
        <>
            <Form>
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Filtrar por favoritos"
                    checked={filterFavorites}
                    onChange={() => setFilterFavorites(!filterFavorites)}
                />
            </Form>
            {
                pathways.length === 0
                ? <p>No hay rutas guardadas</p>
                :   <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Origen</th>
                                <th>Destino</th>
                                <th>Distancia</th>
                                <th>Duración</th>
                                <th>Coste</th>
                                <th>Tipo transporte</th>
                                <th>Vehículo</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            pathways.filter(p => !filterFavorites || p.favourite).map((pathway, index) => (
                                <tr key={index} onClick={ () => loadPathwayIntoMap(pathway) }>
                                    <td>{pathway.start.name}</td>
                                    <td>{pathway.end.name}</td>
                                    <td>{(pathway.distance / 1000).toFixed(4)} km</td>
                                    <td>{Math.floor(pathway.duration / 3600)} h
                                        {Math.round((pathway.duration % 3600) / 60)} min</td>
                                    <td>{
                                        pathway.cost.toFixed(2)
                                    } {
                                        pathway.transportMean === PathwayTransportMeans.VEHICLE ? '€' : 'cal'
                                    }</td>
                                    <td>{ pathway.transportMean }</td>
                                    <td>
                                        {
                                            pathway.transportMean === PathwayTransportMeans.VEHICLE
                                            ? pathway.vehiclePlate
                                            : 'A pata'
                                        }
                                    </td>
                                    <td className="text-center">
                                        <Button variant={pathway.favourite ? "warning" : "outline-warning"} onClick={(e) => {e.stopPropagation(); toggleFavorite(pathway);}}>
                                            <i className={'fas fa-star'}></i>
                                        </Button>
                                    </td>
                                    <td className="text-center">
                                        <Button variant={'outline-danger'} onClick={(e) => {e.stopPropagation(); deletePathway(pathway);}}>
                                            <i className={'fas fa-trash'}></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
            }
        </>
    )
}
