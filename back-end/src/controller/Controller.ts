import { OpenrouteserviceControllerInterface } from "./interfaces/OpenrouteserviceControllerInterface";
import { GeocodeResponse as GeocodeResponse } from "../model/Openroutingservice/GeocodeResponse";
import { error } from "console";
import { DirectionsResponse, ErrorResponse, Segment, Step } from "../model/Openroutingservice/DirectionsResponse";
import { PreciodelaluzControllerInterface } from "./interfaces/PreciodelaluzControllerInterface";
import { PreciodelaluzResponse } from "../model/Preciodelaluz/PreciodelaluzResponse";
import { GeoportalgasolinerasControllerInterface } from "./interfaces/GeoportalgasolinerasControllerInterface";
import { GeoportalgasolinerasResponse, ListaEESSPrecio } from "../model/Geoportalgasolineras/Geoportalgasolineras";

class Controller
  implements
  OpenrouteserviceControllerInterface,
  PreciodelaluzControllerInterface,
  GeoportalgasolinerasControllerInterface {
  constructor() { }



  /**
   * 
   * Openrouteservice methods
   * 
   */
  async getGeocode(req: any): Promise<Number[]> {
    try {
      var location = req.query.location as string;
      console.log(`La localización insertada es ${location}`);
      const response = await fetch(`https://api.openrouteservice.org/geocode/search?api_key=${process.env.APIKEY_OPENROUTESERVICE}&text=${location}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
          },
          redirect: "follow",
        });

      if (response.ok) {
        const result: GeocodeResponse = await response.json();
        if (typeof result.features[0]?.geometry?.coordinates !== "undefined") {
          console.log(result.features[0].geometry.coordinates);
          return result.features[0].geometry.coordinates; // Add this line to return the result
        } else {
          throw new Error("Not found");
        }

      } else {
        console.error("Request failed with status:", response.status);
        throw error;
      }
    } catch (error) {
      console.error('Error:', error);
      throw error; // Rethrow the error or handle it as needed
    }
  }


  async getDirections(req: any): Promise<Segment[]> {
    try {

      var mode = req.query.mode as string;
      var start = req.query.start as string;
      var end = req.query.end as string;
      var preference = req.query.preference as string;
      if (typeof preference === "undefined") {
        preference = "recommended";
      }


      const response = await fetch(`https://api.openrouteservice.org/v2/directions/${mode}`, {
        body: `{\"coordinates\":[[${start}],[${end}]],\"preference\":\"${preference}\"}`,
        headers: {
          Accept: "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
          Authorization: `${process.env.APIKEY_OPENROUTESERVICE}`,
          "Content-Type": "application/json; charset=utf-8"
        },
        method: "POST"
      });


      const result: DirectionsResponse | ErrorResponse = await response.json();
      if (response.ok) {
        const directionsResult = result as DirectionsResponse;
        if (typeof directionsResult.routes[0].segments !== "undefined") {
          console.log(directionsResult.routes[0].segments);
          return directionsResult.routes[0].segments; // Add this line to return the result
        } else {
          throw new Error("Not found");
        }

      } else {
        console.error("Request failed with status:", response.status);
        const errorResponse = result as ErrorResponse;
        if (typeof errorResponse.error.message !== undefined) {
          throw new Error(`Request failed with status: ${response.status}\nError: ${errorResponse.error.message}`);
        } else {
          throw new Error(`Request failed with status: ${response.status}`);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      throw error; // Rethrow the error or handle it as needed
    }



  }

  /**
  * 
  * Preciodelaluz methods
  * 
  */

  async getLightPrice(req: any): Promise<Number | any> {
    try {
      console.log(`http://api.preciodelaluz.org/prices/avg?zone=PCB`);

      const response = await fetch(`http://api.preciodelaluz.org/prices/avg?zone=PCB`, {
        method: "GET",
        credentials: 'include'
      });



      const result: PreciodelaluzResponse | any = await response.json();
      if (response.ok) {
        const precioResult = result as PreciodelaluzResponse;
        if (typeof precioResult.price !== "undefined") {
          console.log(precioResult.price);
          return precioResult.price;
        } else {
          throw new Error("Not found");
        }

      } else {
        console.error("Request failed with status:", response.status);
        const errorResponse = result as any;
        if (typeof errorResponse.error.message !== undefined) {
          throw new Error(`Request failed with status: ${response.status}\nError: ${errorResponse.error.message}`);
        } else {
          throw new Error(`Request failed with status: ${response.status}`);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  /**
   * 
   * Geoportalgasolineras methods
   * 
   */

  async getFuelPrice(req: any): Promise<ListaEESSPrecio[] | any> {
    try {

      const response = await fetch(`https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/`, {
        method: "GET"
      });

      const result: GeoportalgasolinerasResponse | any = await response.json();
      if (response.ok) {
        const resultGasolineras = result as GeoportalgasolinerasResponse;
        if ('ListaEESSPrecio' in resultGasolineras) {
          return resultGasolineras.ListaEESSPrecio;
        }
      } else {
        console.error("Request failed with status:", response.status);
        const errorResponse = result as any;
        if (typeof errorResponse.error.message !== undefined) {
          throw new Error(`Request failed with status: ${response.status}\nError: ${errorResponse.error.message}`);
        } else {
          throw new Error(`Request failed with status: ${response.status}`);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}


export { Controller };
