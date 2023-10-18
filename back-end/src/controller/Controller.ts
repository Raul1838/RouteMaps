import { OpenrouteserviceControllerInterface } from "./interfaces/OpenrouteserviceControllerInterface";
import { GeocodeResponse as GeocodeResponse } from "../model/Openroutingservice/GeocodeResponse";
import { error } from "console";

class Controller
  implements
  OpenrouteserviceControllerInterface
{
  constructor() {}


  async getGeocode(req: any): Promise<Number[]> {
    try {
      const location = req.query.location as string;
      console.log(`La localización insertada es ${location}`);
      const url = `${process.env.URL_OPENROUTESERVICE}/geocode/search?api_key=${process.env.APIKEY_OPENROUTESERVICE}&text=${location}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
        },
        redirect: "follow",
      });
  
      if (response.ok) {
        const result : GeocodeResponse = await response.json();
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
}

export { Controller };
