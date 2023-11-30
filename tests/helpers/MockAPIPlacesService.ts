import VehicleEnum from "../../src/enums/VehicleEnum";
import APIPlacesInterface from "../../src/interfaces/APIPlacesInterface";
import { APIRouteModel } from "../../src/interfaces/APIRouteModel";
import { Coords } from "../../src/interfaces/Coords";
import Place from "../../src/interfaces/Place";
import Route from "../../src/interfaces/Route";
import Vehicle from "../../src/interfaces/Vehicle";



export default class MockAPIPlacesService implements APIPlacesInterface {
    getRoute(Inicio: Coords, Final: Coords, Vehicle: string): Promise<APIRouteModel> {
        var route: APIRouteModel;
        if (Inicio.Latitud === 39.988126910927626
            && Inicio.Longitud === -0.05202140449041774
            && Final.Latitud === 39.986597808112535
            && Final.Longitud === -0.05682265874338428
            && Vehicle === 'driving-car') {
            route = {
                "type": "FeatureCollection",
                "metadata": {
                    "attribution": "openrouteservice.org | OpenStreetMap contributors",
                    "service": "routing",
                    "timestamp": 1701333361978,
                    "query": {
                        "coordinates": [
                            [
                                -0.05202140449041774,
                                39.988126910927626
                            ],
                            [
                                -0.05682265874338428,
                                39.986597808112535
                            ]
                        ],
                        "profile": "driving-car",
                        "format": "json"
                    },
                    "engine": {
                        "version": "7.1.0",
                        "build_date": "2023-07-09T01:31:50Z",
                        "graph_date": "2023-11-26T14:19:16Z"
                    }
                },
                "features": [
                    {
                        "bbox": [
                            -0.056833,
                            39.986023,
                            -0.052002,
                            39.988117
                        ],
                        "type": "Feature",
                        "properties": {
                            "transfers": 0,
                            "fare": 0,
                            "segments": [
                                {
                                    "distance": 552.5,
                                    "duration": 103.0,
                                    "steps": [
                                        {
                                            "distance": 267.2,
                                            "duration": 49.2,
                                            "type": 11,
                                            "instruction": "Head southwest on Calle Pintor Oliet",
                                            "name": "Calle Pintor Oliet",
                                            "way_points": [
                                                0,
                                                8
                                            ]
                                        },
                                        {
                                            "distance": 285.3,
                                            "duration": 53.8,
                                            "type": 7,
                                            "instruction": "Enter the roundabout and take the 1st exit onto Avenida Alcora, CV-1540",
                                            "name": "Avenida Alcora, CV-1540",
                                            "exit_number": 1,
                                            "way_points": [
                                                8,
                                                16
                                            ]
                                        },
                                        {
                                            "distance": 0.0,
                                            "duration": 0.0,
                                            "type": 10,
                                            "instruction": "Arrive at Avenida Alcora, CV-1540, on the right",
                                            "name": "-",
                                            "way_points": [
                                                16,
                                                16
                                            ]
                                        }
                                    ]
                                }
                            ],
                            "summary": {
                                "distance": 552.5,
                                "duration": 103.0
                            },
                            "way_points": [
                                0,
                                16
                            ]
                        },
                        "geometry": {
                            "coordinates": [
                                [
                                    -0.052002,
                                    39.988117
                                ],
                                [
                                    -0.052137,
                                    39.987959
                                ],
                                [
                                    -0.05241,
                                    39.987599
                                ],
                                [
                                    -0.052468,
                                    39.987519
                                ],
                                [
                                    -0.052799,
                                    39.987036
                                ],
                                [
                                    -0.053098,
                                    39.986553
                                ],
                                [
                                    -0.053242,
                                    39.986345
                                ],
                                [
                                    -0.053398,
                                    39.986187
                                ],
                                [
                                    -0.053573,
                                    39.98605
                                ],
                                [
                                    -0.053663,
                                    39.986023
                                ],
                                [
                                    -0.053937,
                                    39.986034
                                ],
                                [
                                    -0.054268,
                                    39.986096
                                ],
                                [
                                    -0.054771,
                                    39.986188
                                ],
                                [
                                    -0.055155,
                                    39.986258
                                ],
                                [
                                    -0.055259,
                                    39.986277
                                ],
                                [
                                    -0.056302,
                                    39.986467
                                ],
                                [
                                    -0.056833,
                                    39.986564
                                ]
                            ],
                            "type": "LineString"
                        }
                    }
                ],
                "bbox": [
                    -0.056833,
                    39.986023,
                    -0.052002,
                    39.988117
                ]
            };
            return Promise.resolve(route);

        }
        throw new Error();
    }
}