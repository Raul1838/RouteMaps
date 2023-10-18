import { OpenrouteserviceControllerInterface } from "./interfaces/OpenrouteserviceControllerInterface";
import { GeocodeResponse as GeocodeResponse } from "../model/Openroutingservice/GeocodeResponse";
import { error } from "console";
import { DirectionsResponse, Step } from "../model/Openroutingservice/DirectionsResponse";

class Controller
  implements
  OpenrouteserviceControllerInterface
{
  constructor() {}


  async getGeocode(req: any): Promise<Number[]> {
    try {
      var location = req.query.location as string;
      console.log(`La localización insertada es ${location}`);
      const response = await fetch(`${process.env.URL_OPENROUTESERVICE}/geocode/search?api_key=${process.env.APIKEY_OPENROUTESERVICE}&text=${location}`,
      {
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


  async getDirections(req: any): Promise<Step[]> {
    try{

      var mode = req.query.mode as string;
      var start = req.query.start as string;
      var end = req.query.end as string;
      
      var myHeaders = new Headers();
      myHeaders.append("Accept", "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8");
      myHeaders.append("Content-Type", "application/json; charset=utf-8");

      
      const response = await fetch(`${process.env.URL_OPENROUTESERVICE}/v2/directions/${mode}?api_key=${process.env.APIKEY_OPENROUTESERVICE}&start=${start}&end=${end}`,
      {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      });


      console.log(`${process.env.URL_OPENROUTESERVICE}/v2/directions/${mode}?api_key=${process.env.APIKEY_OPENROUTESERVICE}&start=${start}&end=${end}`);
      // const result : any = await response.json();
      // console.log(result);

      if (response.ok) {
        const result : DirectionsResponse = await response.json();
        if (typeof result?.features[0]?.properties?.segments[0]?.steps !== "undefined") {
          console.log(result.features[0].properties.segments[0].steps);
          return result.features[0].properties.segments[0].steps; // Add this line to return the result
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
