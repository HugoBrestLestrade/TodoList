import { ListContext } from '../../ListContext';
import { useContext, useState } from 'react';
import Edit from '../Edit/Edit';

function TaskItem({ tache }) {
    const [isComplet, setIsComplet] = useState(false);
    const personnes = tache.contacts || tache.equipiers || [];

    return (
        <li style={{ borderBottom: "1px solid #ccc", paddingBottom: "10px", marginBottom: "15px", listStyleType: "none" }}>

            {/* --- MODE SIMPLE --- */}
            <div
                style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                onClick={() => setIsComplet(!isComplet)}
            >
                <span style={{ marginRight: "10px", fontSize: "1.2rem" }}>
                    {isComplet ? "▼" : "▶"}
                </span>
                <h3 style={{ margin: 0 }}>{tache.title}</h3>
                <span style={{ marginLeft: "auto", fontSize: "0.9rem", color: "#666" }}>
                    Échéance : {tache.date_echeance || "Non définie"}
                </span>
            </div>

            {/* --- MODE COMPLET --- */}
            {isComplet && (
                <div style={{ marginTop: "15px", paddingLeft: "25px" }}>
                    <p><strong>Description :</strong> {tache.description || "Aucune description"}</p>
                    <p><strong>État :</strong> {tache.etat}</p>
                    <p><strong>Créée le :</strong> {tache.date_creation}</p>
                    <p>
                        <strong>Contacts :</strong>{' '}
                        {personnes.length > 0
                            ? personnes.map((personne) => personne.name).join(', ')
                            : "Aucun contact"}
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

    // State pour stocker ce que l'utilisateur tape dans la barre de recherche
    const [searchTerm, setSearchTerm] = useState("");


    const processedList = list
        .filter((tache) => tache.etat !== 'Abandoné' && tache.etat !== 'Reussi')

        .filter((tache) => {
            if (searchTerm === "") return true;

            const lowerSearch = searchTerm.toLowerCase();
            const titleMatch = tache.title?.toLowerCase().includes(lowerSearch);
            const descMatch = tache.description?.toLowerCase().includes(lowerSearch);

            return titleMatch || descMatch; // Recherche dans le titre et la description
        })

        // Tri
        .sort((a, b) => {

            if (!a.date_echeance) return 1;
            if (!b.date_echeance) return -1;

            return new Date(b.date_echeance) - new Date(a.date_echeance);
        });

    return (
        <div>
            <div style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Rechercher dans les tâches..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        fontSize: "1rem"
                    }}
                />
            </div>

            <ul style={{ padding: 0 }}>
                {processedList.map((tache) => (
                    <TaskItem key={tache.id} tache={tache} />
                ))}

                {processedList.length === 0 && (
                    <p style={{ textAlign: "center", color: "#888", fontStyle: "italic" }}>
                        Aucune tâche trouvée.
                    </p>
                )}
            </ul>
        </div>
    );
}

export default Read;