import {Button, Form, Table} from "react-bootstrap";
import Place from "../../interfaces/Place.ts";
import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {PlacesContext, PlacesContextInterface} from "../../context/PlacesContext.tsx";
import {getPlacesController, PlacesController} from "../../controller/PlacesController.ts";
import {AuthContext, AuthContextInterface} from "../../context/AuthContext.tsx";
import {NavigationContext, NavigationContextInterface} from "../../context/NavigationContext.tsx";

interface PlacesListProps {
    showCrudOptions?: boolean;
}

export const PlacesList: React.FC<PlacesListProps> = ({ showCrudOptions = true }) => {

    const navigate = useNavigate()
    const { places, setPlaces }: PlacesContextInterface = useContext(PlacesContext);
    const { user }: AuthContextInterface = useContext(AuthContext);
    const { fieldInSelection, setShowSavedPlaces, from, setFrom, to, setTo }: NavigationContextInterface = useContext(NavigationContext);

    const placesController: PlacesController = getPlacesController();

    const [filterFavorites, setFilterFavorites] = useState(false);

    useEffect(() => {
        if( places.length === 0 ) {
            placesController.getPlaces(user.uid).then(places => setPlaces([...places]) );
        }

        return () => {
            savePlacesOnExit();
        }
    }, []);

    const savePlacesOnExit = async() => {
        await placesController.setPlaces(places, user.uid);
    }

    const toggleFavorite = (place: Place) => {
        place.Favorito = !place.Favorito;
        setPlaces([...places]);
    };

    const goToDetails = (placeName: string) => {
        if( !showCrudOptions ) {
            if( fieldInSelection === 'from' ) setFrom({
                ...from,
                name: placeName
            });
            if( fieldInSelection === 'to' ) setTo({
                ...to,
                name: placeName
            });
            setShowSavedPlaces(false);
            return
        }
        navigate(`/places/editPlace/${placeName}`);
    }

    const deletePlace = (place: Place) => {
        placesController.deletePlace(place, user.uid).then(() => {
            setPlaces(places.filter(p => p.Nombre !== place.Nombre));
        });
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
                places.length === 0
                    ? <p>No hay lugares guardados</p>
                    :   <>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th className="col-10"></th>
                                {
                                    showCrudOptions
                                    ?   <>
                                            <th className="col-1"></th>
                                            <th className="col-1"></th>
                                        </>
                                    :   <th className="col-2"></th>
                                }
                                <th className="col-1"></th>
                                <th className="col-1"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                places
                                    .filter(place => !filterFavorites || place.Favorito)
                                    .map((place, index) => (
                                        <tr key={index} onClick={() => goToDetails(place.Nombre)}>
                                            <td>{place.Nombre}</td>
                                            <td className="text-center">
                                                <Button disabled={ !showCrudOptions } variant={place.Favorito ? "warning" : "outline-warning"} onClick={(e) => {e.stopPropagation(); toggleFavorite(place);}}>
                                                    <i className={'fas fa-star'}></i>
                                                </Button>
                                            </td>
                                            {
                                                showCrudOptions &&
                                                <td className="text-center">
                                                    <Button variant={'outline-danger'} onClick={(e) => {e.stopPropagation(); deletePlace(place);}}>
                                                        <i className={'fas fa-trash'}></i>
                                                    </Button>
                                                </td>
                                            }
                                        </tr>
                                    ))
                            }
                            </tbody>
                        </Table>
                    </>
            }
        </>
    )
}
