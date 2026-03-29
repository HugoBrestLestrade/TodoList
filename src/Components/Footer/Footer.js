import { useState, useContext } from "react";
import { ListContext } from "../Todo/List/ListContext";
import "./Footer.css";

export default function Footer() {
    const [open, setOpen] = useState(false);
    // Liste des dossiers
    const { setList, dossiersList, setDossiersList } = useContext(ListContext);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date_echeance: "",
        contactsInput: ""
    });

    const [error, setError] = useState("");
    const [selectedDossiers, setSelectedDossiers] = useState([]);

    // créer un nouveau dossier
    const [newDossierName, setNewDossierName] = useState("");
    const [newDossierColor, setNewDossierColor] = useState("#000000");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError("");
    };

    // Cocher/Décocher un dossier
    const toggleDossier = (intitule) => {
        if (selectedDossiers.includes(intitule)) {
            setSelectedDossiers(selectedDossiers.filter(d => d !== intitule));
        } else {
            setSelectedDossiers([...selectedDossiers, intitule]);
        }
    };

    // Créer un nouveau dossier
    const handleCreateDossier = () => {
        if (newDossierName.trim().length < 3) {
            setError("Le nom du dossier doit contenir au moins 3 caractères.");
            return;
        }
        if (dossiersList.some(d => d.intitule === newDossierName.trim())) {
            setError("Ce dossier existe déjà.");
            return;
        }

        const newDossier = { intitule: newDossierName.trim(), couleur: newDossierColor };
        setDossiersList([...dossiersList, newDossier]);

        // On coche automatiquement le dossier qu'on vient de créer
        setSelectedDossiers([...selectedDossiers, newDossier.intitule]);

        // On vide les champs de création
        setNewDossierName("");
        setError("");
    };

    const handleSubmit = () => {
        if (formData.title.trim().length < 5) {
            setError("L'intitulé doit contenir au moins 5 caractères.");
            return;
        }
        if (!formData.date_echeance) {
            setError("La date d'échéance est obligatoire.");
            return;
        }
        setError("");

        const formattedContacts = formData.contactsInput
            .split(',')
            .map(nom => nom.trim())
            .filter(nom => nom !== "")
            .map(nom => ({ name: nom }));

        // On récupère les vrais objets Dossier correspondants aux intitulés cochés
        const taskDossiers = dossiersList.filter(d => selectedDossiers.includes(d.intitule));

        setList(prev => [...prev, {
            id: Date.now(),
            title: formData.title,
            description: formData.description,
            date_echeance: formData.date_echeance,
            etat: "Nouveau",
            date_creation: new Date().toISOString().split("T")[0],
            contacts: formattedContacts,
            dossiers: taskDossiers
        }]);

        setFormData({ title: "", description: "", date_echeance: "", contactsInput: "" });
        setSelectedDossiers([]);
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
        setError("");
        setSelectedDossiers([]);
    };

    return (
        <footer>
            <p>FOOTER</p>
            <button onClick={() => setOpen(true)}>+</button>

            {open && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Créer une tâche</h2>

                        {error && <p style={{ color: "red", fontSize: "14px", margin: "0" }}>{error}</p>}

                        <input name="title" type="text" placeholder="Titre de la tâche (5 car. min)" value={formData.title} onChange={handleChange} />
                        <textarea name="description" placeholder="Description..." value={formData.description} onChange={handleChange} />
                        <input name="date_echeance" type="date" value={formData.date_echeance} onChange={handleChange} />
                        <input name="contactsInput" type="text" placeholder="Contacts (séparés par des virgules)" value={formData.contactsInput} onChange={handleChange} />

                        <div style={{ borderTop: "1px solid #eee", paddingTop: "10px", marginTop: "10px" }}>
                            <strong>Dossiers :</strong>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "5px", marginBottom: "10px" }}>
                                {dossiersList.map(dossier => (
                                    <label key={dossier.intitule} style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
                                        <input
                                            type="checkbox"
                                            checked={selectedDossiers.includes(dossier.intitule)}
                                            onChange={() => toggleDossier(dossier.intitule)}
                                        />
                                        <span style={{ width: "12px", height: "12px", backgroundColor: dossier.couleur, borderRadius: "50%", margin: "0 5px" }}></span>
                                        {dossier.intitule}
                                    </label>
                                ))}
                            </div>

                            <div style={{ display: "flex", gap: "5px" }}>
                                <input
                                    type="text"
                                    placeholder="Nouveau dossier (3 car.)"
                                    value={newDossierName}
                                    onChange={(e) => setNewDossierName(e.target.value)}
                                    style={{ flex: 1 }}
                                />
                                <input
                                    type="color"
                                    value={newDossierColor}
                                    onChange={(e) => setNewDossierColor(e.target.value)}
                                    style={{ padding: "0", width: "30px", height: "30px" }}
                                />
                                <button type="button" onClick={handleCreateDossier}>Créer</button>
                            </div>
                        </div>

                        <div className="modal-actions" style={{ marginTop: "15px" }}>
                            <button onClick={handleSubmit}>Ajouter la tâche</button>
                            <button onClick={handleClose}>Fermer</button>
                        </div>
                    </div>
                </div>
            )}
        </footer>
    );
}