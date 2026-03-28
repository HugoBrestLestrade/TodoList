import { useState, useContext } from "react";
import { ListContext } from "../Todo/List/ListContext";

// Sortir les styles du composant allège considérablement la lecture
const overlayStyle = {
    position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center",
};

const modalStyle = {
    background: "white", padding: "20px", borderRadius: "10px", minWidth: "300px", display: "flex", flexDirection: "column", gap: "10px"
};

export default function Footer() {
    const [open, setOpen] = useState(false);
    const { setList } = useContext(ListContext);

    // 1. Un seul state (objet) pour gérer TOUS tes futurs champs facilement
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date_echeance: ""
    });

    // 2. Une seule fonction pour gérer la frappe sur n'importe quel input
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (formData.title.trim() === "") return; // Sécurité de base

        // 3. Création de la tâche avec les données du formulaire et les valeurs par défaut
        setList(prev => [...prev, {
            id: Date.now(),
            ...formData, // Injecte automatiquement title, description, date_echeance
            etat: "Nouveau",
            date_creation: new Date().toISOString().split("T")[0],
            contacts: []
        }]);

        // Reset et fermeture
        setFormData({ title: "", description: "", date_echeance: "" });
        setOpen(false);
    };

    return (
        <footer>
            <p>FOOTER</p>
            <button onClick={() => setOpen(true)}>+</button>

            {open && (
                <div style={overlayStyle}>
                    <div style={modalStyle}>
                        <h2>Créer une tâche</h2>

                        {/* Remarque l'attribut "name" : il doit correspondre aux clés de formData */}
                        <input
                            name="title"
                            type="text"
                            placeholder="Titre de la tâche"
                            value={formData.title}
                            onChange={handleChange}
                        />

                        <textarea
                            name="description"
                            placeholder="Description..."
                            value={formData.description}
                            onChange={handleChange}
                        />

                        <input
                            name="date_echeance"
                            type="date"
                            value={formData.date_echeance}
                            onChange={handleChange}
                        />

                        <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                            <button onClick={handleSubmit}>Ajouter</button>
                            <button onClick={() => setOpen(false)}>Fermer</button>
                        </div>
                    </div>
                </div>
            )}
        </footer>
    );
}