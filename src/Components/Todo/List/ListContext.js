import { createContext, useState } from "react";
import data from './../../../data.json';
export const ListContext = createContext();

export function ListProvider({ children }) {
    const [list, setList] = useState(data.tasks);

    // Dossiers de base
    const [dossiersList, setDossiersList] = useState([
        { intitule: "Urgent", couleur: "#ff4757" },
        { intitule: "Pro", couleur: "#1e90ff" },
        { intitule: "Perso", couleur: "#2ed573" }
    ]);

    return (
        <ListContext.Provider value={{ list, setList, dossiersList, setDossiersList }}>
            {children}
        </ListContext.Provider>
    );
}