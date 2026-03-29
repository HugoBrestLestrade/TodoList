import { ListContext } from '../../ListContext';
import { useContext, useState } from 'react';
import Edit from '../Edit/Edit';
import Tri from '../../../Tri/Tri';

function TaskItem({ tache }) {
    const [isComplet, setIsComplet] = useState(false);

    const personnes = tache.contacts || tache.equipiers || [];

    const dossiers = tache.dossiers || [];

    const renderDossier = (dossier, index) => (
        <span
            key={index}
            style={{
                backgroundColor: dossier.couleur || "#ccc", // Gris par défaut
                color: "white",
                padding: "3px 8px",
                borderRadius: "12px",
                fontSize: "0.8rem",
                marginRight: "5px",
                fontWeight: "bold"
            }}
        >
            {dossier.intitule}
        </span>
    );

    return (
        <li style={{ borderBottom: "1px solid #ccc", paddingBottom: "10px", marginBottom: "15px", listStyleType: "none" }}>

            {/* MODE SIMPLE */}
            <div style={{ display: "flex", alignItems: "center", cursor: "pointer", flexWrap: "wrap" }} onClick={() => setIsComplet(!isComplet)}>
                <span style={{ marginRight: "10px", fontSize: "1.2rem" }}>
                    {isComplet ? "▼" : "▶"}
                </span>

                <h3 style={{ margin: 0, marginRight: "15px" }}>{tache.title}</h3>

                <div style={{ display: "flex" }}>
                    {dossiers.slice(0, 2).map(renderDossier)}
                    {dossiers.length > 2 && !isComplet && (
                        <span style={{ fontSize: "0.8rem", color: "#888", marginLeft: "5px" }}>
                            +{dossiers.length - 2}
                        </span>
                    )}
                </div>

                <span style={{ marginLeft: "auto", fontSize: "0.9rem", color: "#666" }}>
                    Échéance : {tache.date_echeance || "Non définie"}
                </span>
            </div>

            {/* MODE COMPLET */}
            {isComplet && (
                <div style={{ marginTop: "15px", paddingLeft: "25px" }}>

                    {/* Affichage de TOUS les dossiers (Mode Complet) */}
                    {dossiers.length > 0 && (
                        <div style={{ marginBottom: "10px", display: "flex", flexWrap: "wrap", gap: "5px" }}>
                            <strong>Dossiers : </strong>
                            {dossiers.map(renderDossier)}
                        </div>
                    )}

                    <p><strong>Description :</strong> {tache.description || "Aucune description"}</p>
                    <p><strong>État :</strong> {tache.etat}</p>
                    <p><strong>Créée le :</strong> {tache.date_creation}</p>
                    <p>
                        <strong>Contacts :</strong>{' '}
                        {personnes.length > 0 ? personnes.map(p => p.name).join(', ') : "Aucun contact"}
                    </p>

                    <div style={{ marginTop: "10px" }}>
                        <Edit tache={tache} />
                    </div>
                </div>
            )}
        </li>
    );
}

function Read() {
    const { list } = useContext(ListContext);

    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("date_echeance");
    const [sortDesc, setSortDesc] = useState(true);
    const [activeEtats, setActiveEtats] = useState(["Nouveau", "En attente"]);

    const tousLesEtats = ["Nouveau", "En attente", "Reussi", "Abandoné"];

    const toggleEtat = (etatChoisi) => {
        if (activeEtats.includes(etatChoisi)) {
            setActiveEtats(activeEtats.filter(etat => etat !== etatChoisi));
        } else {
            setActiveEtats([...activeEtats, etatChoisi]);
        }
    };

    // filtrage + tri
    const processedList = list
        .filter((tache) => activeEtats.includes(tache.etat))
        .filter((tache) => {
            if (searchTerm === "") return true;
            const lowerSearch = searchTerm.toLowerCase();
            return (
                tache.title?.toLowerCase().includes(lowerSearch) ||
                tache.description?.toLowerCase().includes(lowerSearch)
            );
        })
        .sort((a, b) => {
            let valA = a[sortBy] || "";
            let valB = b[sortBy] || "";

            if (sortBy === "title") {
                return sortDesc ? valB.localeCompare(valA) : valA.localeCompare(valB);
            } else {
                if (!valA) return 1;
                if (!valB) return -1;
                return sortDesc ? new Date(valB) - new Date(valA) : new Date(valA) - new Date(valB);
            }
        });

    return (
        <div>
            <Tri
                searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                activeEtats={activeEtats} setActiveEtats={setActiveEtats}
                tousLesEtats={tousLesEtats} toggleEtat={toggleEtat}
                sortBy={sortBy} setSortBy={setSortBy}
                sortDesc={sortDesc} setSortDesc={setSortDesc}
            />

            <ul style={{ padding: 0 }}>
                {processedList.map((tache) => (
                    <TaskItem key={tache.id} tache={tache} />
                ))}

                {processedList.length === 0 && (
                    <p style={{ textAlign: "center", color: "#888", fontStyle: "italic" }}>
                        Aucune tâche ne correspond à ces filtres.
                    </p>
                )}
            </ul>
        </div>
    );
}

export default Read;