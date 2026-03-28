import { createContext, useState } from "react";
import data from './../../../data.json';
export const ListContext = createContext();

export function ListProvider({ children }) {
    const [list, setList] = useState(data.tasks);

    return (
        <ListContext.Provider value={{ list, setList }}>
            {children}
        </ListContext.Provider>
    );
}