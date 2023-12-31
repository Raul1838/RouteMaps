import React from "react";
import Vehicle from "../../interfaces/Vehicle.ts";

export const DefaultVehicleDetails: React.FC<{ defaultVehicle: Vehicle }> = ({ defaultVehicle }) => {
    return (
        <ul className="list-group list-group-flush">
            <li className="list-group-item"><strong>Matrícula</strong> - {defaultVehicle.plate}</li>
            <li className="list-group-item"><strong>Nombre</strong> - {defaultVehicle.name}</li>
        </ul>
    )
}
