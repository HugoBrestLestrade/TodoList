import { createContext, useState } from "react";
import data from './../../../data.json';

export const ListContext = createContext();

export function ListProvider({ children }) {
    const initialCategories = data.categories.map(c => ({
        id: c.id,
        title: c.title,

        color: c.color === "bluesky" ? "skyblue" : c.color
    }));


    const initialTasks = data.tasks.map(tache => {

        const relationsDeLaTache = data.relations.filter(r => r.tache === tache.id);


        const dossiersDeLaTache = relationsDeLaTache.map(rel =>
            initialCategories.find(c => c.id === rel.categorie)
        ).filter(Boolean);

        return {
            ...tache,
            dossiers: dossiersDeLaTache
        };
    });


    const [list, setList] = useState(initialTasks);
    const [dossiersList, setDossiersList] = useState(initialCategories);

    return (
        <ListContext.Provider value={{ list, setList, dossiersList, setDossiersList }}>
            {children}
        </ListContext.Provider>
    );
}