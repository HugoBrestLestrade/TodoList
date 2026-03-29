import { useState, useContext } from 'react';
import { ListContext } from '../../ListContext';
import "./../../../../Footer/Footer.css"

export default function Edit({ tache }) {
    const { list, setList, dossiersList, setDossiersList } = useContext(ListContext);
    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date_echeance: "",
        etat: "Nouveau",
        contactsInput: ""
    });

    const [selectedDossiers, setSelectedDossiers] = useState([]);
    const [newDossierName, setNewDossierName] = useState("");
    const [newDossierColor, setNewDossierColor] = useState("#000000");
    const [error, setError] = useState("");

    const handleOpen = () => {
        const initialContacts = tache.contacts || tache.equipiers || [];

        setFormData({
            title: tache.title || "",
            description: tache.description || "",
            date_echeance: tache.date_echeance || "",
            etat: tache.etat || "Nouveau",
            contactsInput: initialContacts.map(c => c.name).join(', ')
        });

        const initialDossiers = tache.dossiers ? tache.dossiers.map(d => d.intitule) : [];
        setSelectedDossiers(initialDossiers);

        setOpen(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError("");
    };

    const toggleDossier = (intitule) => {
        if (selectedDossiers.includes(intitule)) {
            setSelectedDossiers(selectedDossiers.filter(d => d !== intitule));
        } else {
            setSelectedDossiers([...selectedDossiers, intitule]);
        }
    };

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
        setSelectedDossiers([...selectedDossiers, newDossier.intitule]);
        setNewDossierName("");
        setError("");
    };

    const handleSubmit = () => {
        if (formData.title.trim().length < 5) return;

        const formattedContacts = formData.contactsInput
            .split(',')
            .map(nom => nom.trim())
            .filter(nom => nom !== "")
            .map(nom => ({ name: nom }));

        const taskDossiers = dossiersList.filter(d => selectedDossiers.includes(d.intitule));

        const updatedList = list.map((item) => {
            if (item.id === tache.id) {
                return {
                    ...item,
                    title: formData.title,
                    description: formData.description,
                    date_echeance: formData.date_echeance,
                    etat: formData.etat,
                    contacts: formattedContacts,
                    dossiers: taskDossiers
                };
            }
            return item;
        });

        setList(updatedList);
        setOpen(false);
    };

    return (
        <>
            <button onClick={handleOpen}>Modifier</button>

            {open && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Modifier la tâche</h2>

                        {error && <p style={{ color: "red", fontSize: "14px", margin: "0" }}>{error}</p>}

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
                                <input type="text" placeholder="Nouveau dossier (3 car.)" value={newDossierName} onChange={(e) => setNewDossierName(e.target.value)} style={{ flex: 1 }} />
                                <input type="color" value={newDossierColor} onChange={(e) => setNewDossierColor(e.target.value)} style={{ padding: "0", width: "30px", height: "30px" }} />
                                <button type="button" onClick={handleCreateDossier}>Créer</button>
                            </div>
                        </div>

                        <div className="modal-actions" style={{ marginTop: "15px" }}>
                            <button onClick={handleSubmit}>Enregistrer</button>
                            <button onClick={() => setOpen(false)}>Annuler</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}