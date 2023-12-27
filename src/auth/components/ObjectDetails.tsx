import React from "react";

export interface Data {
    label: string;
    value: string;
}

export const ObjectDetails: React.FC<{ items: Data[] }> = ({ items }) => {
    return (
        <ul className="list-group list-group-flush">
            {items.map((item) => (
                <li className="list-group-item">
                    <strong>{item.label}</strong> - {item.value}
                </li>
            ))}
        </ul>
    )
}
