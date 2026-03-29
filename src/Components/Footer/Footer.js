import { useState, useContext } from "react";
import { ListContext } from "../Todo/List/ListContext";
import { createPortal } from "react-dom";
import "./Footer.css";

export default function Footer() {
    const [open, setOpen] = useState(false);
    const { setList, dossiersList, setDossiersList } = useContext(ListContext);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date_echeance: "",
        contactsInput: ""
    });

    const [error, setError] = useState("");
    const [selectedDossiers, setSelectedDossiers] = useState([]);

    const [newDossierName, setNewDossierName] = useState("");
    const [newDossierColor, setNewDossierColor] = useState("#000000");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError("");
    };

    const toggleDossier = (title) => {
        if (selectedDossiers.includes(title)) {
            setSelectedDossiers(selectedDossiers.filter(d => d !== title));
        } else {
            setSelectedDossiers([...selectedDossiers, title]);
        }
    };

    const handleCreateDossier = () => {
        if (newDossierName.trim().length < 3) {
            setError("Le nom du dossier doit contenir au moins 3 caractères.");
            return;
        }
        if (dossiersList.some(d => d.title === newDossierName.trim())) {
            setError("Ce dossier existe déjà.");
            return;
        }

        const newDossier = { title: newDossierName.trim(), color: newDossierColor };
        setDossiersList([...dossiersList, newDossier]);
        setSelectedDossiers([...selectedDossiers, newDossier.title]);
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

        const taskDossiers = dossiersList.filter(d => selectedDossiers.includes(d.title));

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
            <button onClick={() => setOpen(true)}>+</button>

            {open && createPortal(
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Créer une tâche</h2>

                        {error && <p style={{ color: "red", fontSize: "14px", margin: "0" }}>{error}</p>}

                        <input name="title" type="text" placeholder="Titre de la tâche (5 car. min)" value={formData.title} onChange={handleChange} />
                        <textarea name="description" placeholder="Description..." value={formData.description} onChange={handleChange} />
                        <input name="date_echeance" type="date" value={formData.date_echeance} onChange={handleChange} />
                        <input name="contactsInput" type="text" placeholder="Contacts (séparés par des virgules)" value={formData.contactsInput} onChange={handleChange} />

                        <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "10px", marginTop: "10px" }}>
                            <strong>Dossiers :</strong>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "5px", marginBottom: "10px" }}>
                                {dossiersList.map(dossier => (
                                    <label key={dossier.title} style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
                                        <input
                                            type="checkbox"
                                            checked={selectedDossiers.includes(dossier.title)}
                                            onChange={() => toggleDossier(dossier.title)}
                                        />

                                        <span style={{ width: "12px", height: "12px", backgroundColor: dossier.color, borderRadius: "50%", margin: "0 5px", flexShrink: 0 }}></span>
                                        {dossier.title}
                                    </label>
                                ))}
                            </div>

                            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                <input
                                    type="text"
                                    placeholder="Nouveau dossier (3 car.)"
                                    value={newDossierName}
                                    onChange={(e) => setNewDossierName(e.target.value)}
                                    style={{ flex: 1, marginBottom: 0 }}
                                />
                                <input
                                    type="color"
                                    value={newDossierColor}
                                    onChange={(e) => setNewDossierColor(e.target.value)}
                                    style={{ padding: "0", width: "30px", height: "30px", flexShrink: 0 }}
                                />
                                <button type="button" onClick={handleCreateDossier}>Créer</button>
                            </div>
                        </div>

                        <div className="modal-actions" style={{ marginTop: "15px" }}>
                            <button onClick={handleSubmit}>Ajouter la tâche</button>
                            <button onClick={handleClose}>Fermer</button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </footer>
    );
}