import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Pathway } from '../../interfaces/Pathway';
import { AuthContext, AuthContextInterface } from '../../context/AuthContext';
import PathwaysController, { getPathwayController } from '../../controller/PathwayController';

interface PathwaysListProps {
    showCrudOptions?: boolean;
}

export const ListPathwaysView: React.FC<PathwaysListProps> = ({ showCrudOptions = true }) => {
    const navigate = useNavigate();
    const { user }: AuthContextInterface = useContext(AuthContext);
    const pathwaysController: PathwaysController = getPathwayController();
    const [pathways, setPathways] = useState<Pathway[]>([]);
    const [error, setError] = useState<string>("");
    const [filterFavorites, setFilterFavorites] = useState(false);

    useEffect(() => {
        if( pathways.length === 0 ){
            pathwaysController.getPathways(user.uid).then(pathways => setPathways([...pathways]));
        }
    }, [user.uid, pathwaysController]);

    const toggleFavorite = (pathway: Pathway) => {
        pathwaysController.toggleFavourite(pathway, user.uid);
        pathway.favourite = !pathway.favourite;
        setPathways([...pathways]);
    };

    const goToDetails = (pathwayId: number) => {
        navigate(`/pathways/modifyPathway/${pathwayId}`);
    };

    const deletePathway = (pathway: Pathway) => {
        pathwaysController.deletePathway(pathway, user.uid).then(() => {
            setPathways(pathways.filter(p => p.id !== pathway.id));
        });
    };

    return (
        <>
            <Form>
                <Form.Check
                    type="switch"
                    id="pathway-favorite-switch"
                    label="Filtrar por favoritos"
                    checked={filterFavorites}
                    onChange={() => setFilterFavorites(!filterFavorites)}
                />
            </Form>
            {error && <p className="text-danger">{error}</p>}
            {pathways.length === 0 ? (
                <p>No hay rutas guardadas</p>
            ) : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nombre de la Ruta</th>
                            <th>Distancia</th>
                            <th>Duración</th>
                            {showCrudOptions && <th>Acciones</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {pathways
                            .filter(pathway => !filterFavorites || pathway.favourite)
                            .map((pathway, index) => (
                                <tr key={index} onClick={() => goToDetails(pathway.id)}>
                                    <td>{pathway.codifiedPath}</td>
                                    <td>{pathway.distance}</td>
                                    <td>{pathway.duration}</td>
                                    {showCrudOptions && (
                                        <td>
                                            <Button 
                                                variant={pathway.favourite ? "warning" : "outline-warning"} 
                                                onClick={(e) => {e.stopPropagation(); toggleFavorite(pathway);}}>
                                                <i className={'fas fa-star'}></i>
                                            </Button>
                                            <Button 
                                                variant={'outline-danger'} 
                                                onClick={(e) => {e.stopPropagation(); deletePathway(pathway);}}>
                                                <i className={'fas fa-trash'}></i>
                                            </Button>
                                        </td>
                                    )}
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            )}
        </>
    );
};
