import {PathwayTypes} from "../../enums/PathwayTypes.ts";
import React, {useContext, useState} from "react";
import {Dropdown} from 'react-bootstrap';
import {AuthContext, AuthContextInterface} from "../../context/AuthContext.tsx";

const options: PathwayTypes[] = Object.values(PathwayTypes).filter(value => value !== PathwayTypes.UNDEFINED);
export const DefaultPathwayTypeSwitcher: React.FC<{ pathwayType: PathwayTypes }> = ({ pathwayType }) => {
    const authContext: AuthContextInterface = useContext(AuthContext);
    const [selection, setSelection] = useState<PathwayTypes>(pathwayType);

    const handleSelect = (eventKey: string | null) => {
        if (eventKey) {
            setSelection(eventKey as PathwayTypes);
            authContext.setDefaultPathwayType(eventKey as PathwayTypes);
        }
    }

    return (
        <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {selection}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {options.map((option, index) =>
                    <Dropdown.Item eventKey={option} key={index}>{option}</Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
}
