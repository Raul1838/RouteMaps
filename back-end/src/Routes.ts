import { Router } from "express";
import { OpenrouteserviceControllerInterface } from "./controller/interfaces/OpenrouteserviceControllerInterface";
import { Segment, Step } from "./model/Openroutingservice/DirectionsResponse";
import { PreciodelaluzControllerInterface } from "./controller/interfaces/PreciodelaluzControllerInterface";
import { GeoportalgasolinerasControllerInterface } from "./controller/interfaces/GeoportalgasolinerasControllerInterface";
import { ListaEESSPrecio } from "./model/Geoportalgasolineras/Geoportalgasolineras";

/* 
 * Esta clase genera los endpoints de la api y desde los mismos llama al controller para
 * ejecutar la función necesaria.
 */

class Routes {
  private router;
  private OpenrouteserviceController: OpenrouteserviceControllerInterface;
  private PreciodelaluzController: PreciodelaluzControllerInterface;
  private GeoportalgasolinerasController: GeoportalgasolinerasControllerInterface;

  constructor(
    openrouteserviceController: OpenrouteserviceControllerInterface,
    preciodelaluzController: PreciodelaluzControllerInterface,
    geoportalgasolinerasController: GeoportalgasolinerasControllerInterface
  ) {
    this.OpenrouteserviceController = openrouteserviceController;
    this.PreciodelaluzController = preciodelaluzController;
    this.GeoportalgasolinerasController = geoportalgasolinerasController;
    this.router = Router();
    this.setRoutes();
  }

  private setRoutes(): void {

    /**
     * 
     * Openrouteservice methods
     * 
     */

    this.router.get("/get-geocode", async (req: any, res: any) => {
      console.log("get-geocode");
      const promise: Promise<Number[]> =
        this.OpenrouteserviceController.getGeocode(req);
      promise.then((response) => {
        res.status(200).json(response);
      })
        .catch((error) => {
          res.status(500).send(this.getErrorMessage(error));
        });
    });

    this.router.get("/get-directions", async (req: any, res: any) => {
      console.log("get-directions");
      const promise: Promise<Segment[]> =
        this.OpenrouteserviceController.getDirections(req);
      promise.then((response) => {
        res.status(200).json(response);
      })
        .catch((error) => {
          res.status(500).send(this.getErrorMessage(error));
        });
    });

    /**
     * 
     * API PRECIODELALUZ methods
     * 
     */

    this.router.get("/get-light-price", async (req: any, res: any) => {
      console.log("get-light-price");
      const promise: Promise<Number | any> =
        this.PreciodelaluzController.getLightPrice(req);
      promise.then((response) => {
        res.status(200).json(response);
      })
        .catch((error) => {
          res.status(500).send(this.getErrorMessage(error));
        });
    });

    this.router.get("/get-fuel-price", async (req: any, res: any) => {
      console.log("get-fuel-price");
      const promise: Promise<ListaEESSPrecio[] | any> =
        this.GeoportalgasolinerasController.getFuelPrice(req);
      promise.then((response) => {
        res.status(200).json(response);
      })
        .catch((error) => {
          res.status(500).send(this.getErrorMessage(error));
        });
    });

  }

  private getErrorMessage(error: any): string {
    if (error instanceof Error) {
      return error.message;
    } else {
      return String(error);
    }
  }
  public getRouter(): Router {
    return this.router;
  }
}


export { Routes };
