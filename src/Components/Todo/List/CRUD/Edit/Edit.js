import { useState, useContext } from 'react';
import { ListContext } from '../../ListContext';
import { createPortal } from 'react-dom';
import "./../../../../Footer/Footer.css";
import './Edit.css';

export default function Edit({ tache }) {
    const { list, setList, dossiersList, setDossiersList } = useContext(ListContext);
    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        title: "", description: "", date_echeance: "", etat: "Nouveau", contactsInput: ""
    });

    const [selectedDossiers, setSelectedDossiers] = useState([]);
    const [newDossierName, setNewDossierName] = useState("");
    const [newDossierColor, setNewDossierColor] = useState("#000000");
    const [error, setError] = useState("");

    const handleOpen = () => {
        const initialContacts = tache.contacts || tache.equipiers || [];
        setFormData({
            title: tache.title || "", description: tache.description || "",
            date_echeance: tache.date_echeance || "", etat: tache.etat || "Nouveau",
            contactsInput: initialContacts.map(c => c.name).join(', ')
        });

        const initialDossiers = tache.dossiers ? tache.dossiers.map(d => d.title) : [];
        setSelectedDossiers(initialDossiers);
        setOpen(true);
    };

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
        if (newDossierName.trim().length < 3) { setError("Le nom du dossier doit contenir au moins 3 caractères."); return; }
        if (dossiersList.some(d => d.title === newDossierName.trim())) { setError("Ce dossier existe déjà."); return; }
        const newDossier = { title: newDossierName.trim(), color: newDossierColor };
        setDossiersList([...dossiersList, newDossier]);
        setSelectedDossiers([...selectedDossiers, newDossier.title]);
        setNewDossierName(""); setError("");
    };

    const handleSubmit = () => {
        if (formData.title.trim().length < 5) return;
        const formattedContacts = formData.contactsInput.split(',').map(nom => nom.trim()).filter(nom => nom !== "").map(nom => ({ name: nom }));
        const taskDossiers = dossiersList.filter(d => selectedDossiers.includes(d.title));

        const updatedList = list.map((item) => {
            if (item.id === tache.id) {
                return { ...item, title: formData.title, description: formData.description, date_echeance: formData.date_echeance, etat: formData.etat, contacts: formattedContacts, dossiers: taskDossiers };
            }
            return item;
        });

        setList(updatedList);
        setOpen(false);
    };

    return (
        <>
            <button onClick={handleOpen}>Modifier</button>

            {open && createPortal(
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Modifier la tâche</h2>
                        {error && <p className="edit-error-msg">{error}</p>}
                        <input name="title" type="text" placeholder="Titre de la tâche" value={formData.title} onChange={handleChange} />
                        <textarea name="description" placeholder="Description..." value={formData.description} onChange={handleChange} />
                        <input name="date_echeance" type="date" value={formData.date_echeance} onChange={handleChange} />
                        <input name="contactsInput" type="text" placeholder="Contacts (séparés par des virgules)" value={formData.contactsInput} onChange={handleChange} />
                        <select name="etat" value={formData.etat} onChange={handleChange}>
                            <option value="Nouveau">Nouveau</option>
                            <option value="En attente">En attente</option>
                            <option value="Reussi">Réussi</option>
                            <option value="Abandoné">Abandoné</option>
                        </select>

                        <div className="edit-dossiers-section">
                            <strong>Dossiers :</strong>
                            <div className="edit-dossiers-list">
                                {dossiersList.map(dossier => (
                                    <label key={dossier.title} className="edit-dossier-label">
                                        <input type="checkbox" checked={selectedDossiers.includes(dossier.title)} onChange={() => toggleDossier(dossier.title)} />
                                        <span className="edit-dossier-dot" style={{ backgroundColor: dossier.color }}></span>
                                        {dossier.title}
                                    </label>
                                ))}
                            </div>
                            <div className="edit-new-dossier-wrapper">
                                <input type="text" className="edit-new-dossier-input" placeholder="Nouveau dossier (3 car.)" value={newDossierName} onChange={(e) => setNewDossierName(e.target.value)} />
                                <input type="color" className="edit-color-picker" value={newDossierColor} onChange={(e) => setNewDossierColor(e.target.value)} />
                                <button type="button" onClick={handleCreateDossier}>Créer</button>
                            </div>
                        </div>

                        <div className="modal-actions edit-modal-actions">
                            <button onClick={handleSubmit}>Enregistrer</button>
                            <button onClick={() => setOpen(false)}>Annuler</button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}