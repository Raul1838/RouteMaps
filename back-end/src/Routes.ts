import { Router } from "express";
import { OpenrouteserviceControllerInterface } from "./controller/interfaces/OpenrouteserviceControllerInterface";

/* 
 * Esta clase genera los endpoints de la api y desde los mismos llama al controller para
 * ejecutar la función necesaria.
 */

class Routes {
  private router;
  private OpenrouteserviceController: OpenrouteserviceControllerInterface;

  constructor(
    openrouteserviceController: OpenrouteserviceControllerInterface
  ) {
    this.OpenrouteserviceController = openrouteserviceController;
    this.router = Router();
    this.setRoutes();
  }

  private setRoutes(): void {
    
    /**
     * 
     * Openrouteservice methods
     * 
     */
    
    this.router.get("/getGeocode", async (req: any, res: any) => {
      console.log("getGeocode");
      const promise: Promise<Number[]> =
        this.OpenrouteserviceController.getGeocode(req);
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
