import { ListContext } from '../../ListContext';
import { useContext, useState } from 'react';
import Tache from '../../../Tache/Tache';
import Filtre from '../../../Filtre/Filtre';
import Tri from '../../../Tri/Tri';

function Read() {
    const { list, dossiersList } = useContext(ListContext);

    // States pour le Filtre
    const [searchTerm, setSearchTerm] = useState("");
    const [activeEtats, setActiveEtats] = useState(["Nouveau", "En attente"]);
    const [activeDossiers, setActiveDossiers] = useState([]);
    const tousLesEtats = ["Nouveau", "En attente", "Reussi", "Abandoné"];

    // States pour le Tri
    const [sortBy, setSortBy] = useState("date_echeance");
    const [sortDesc, setSortDesc] = useState(true);

    const toggleEtat = (etatChoisi) => {
        if (activeEtats.includes(etatChoisi)) setActiveEtats(activeEtats.filter(etat => etat !== etatChoisi));
        else setActiveEtats([...activeEtats, etatChoisi]);
    };

    const toggleFiltreDossier = (intituleDossier) => {
        if (activeDossiers.includes(intituleDossier)) setActiveDossiers(activeDossiers.filter(d => d !== intituleDossier));
        else setActiveDossiers([...activeDossiers, intituleDossier]);
    };

    const processedList = list
        .filter((tache) => activeEtats.includes(tache.etat))
        .filter((tache) => {
            if (activeDossiers.length === 0) return true;
            const taskDossiersNoms = tache.dossiers ? tache.dossiers.map(d => d.intitule) : [];
            return activeDossiers.some(dossierFiltre => taskDossiersNoms.includes(dossierFiltre));
        })
        .filter((tache) => {
            if (searchTerm === "") return true;
            const lowerSearch = searchTerm.toLowerCase();
            return tache.title?.toLowerCase().includes(lowerSearch) || tache.description?.toLowerCase().includes(lowerSearch);
        })
        .sort((a, b) => {
            let valA = a[sortBy] || "";
            let valB = b[sortBy] || "";
            if (sortBy === "title") return sortDesc ? valB.localeCompare(valA) : valA.localeCompare(valB);
            else {
                if (!valA) return 1; if (!valB) return -1;
                return sortDesc ? new Date(valB) - new Date(valA) : new Date(valA) - new Date(valB);
            }
        });

    return (
        <div>
            <Filtre
                searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                activeEtats={activeEtats} setActiveEtats={setActiveEtats}
                tousLesEtats={tousLesEtats} toggleEtat={toggleEtat}
                dossiersList={dossiersList} activeDossiers={activeDossiers} toggleFiltreDossier={toggleFiltreDossier}
            />

            <Tri
                sortBy={sortBy} setSortBy={setSortBy}
                sortDesc={sortDesc} setSortDesc={setSortDesc}
            />

            <ul style={{ padding: 0 }}>
                {processedList.map((tache) => (
                    <Tache key={tache.id} tache={tache} />
            ))}

            {processedList.length === 0 && (
                <p style={{ textAlign: "center", color: "#888", fontStyle: "italic" }}>
                    Aucune tâche ne correspond à ces critères.
                </p>
            )}
        </ul>
</div>
);
}

export default Read;