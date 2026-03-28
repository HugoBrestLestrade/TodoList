import { useState, useContext } from 'react';
import { ListContext } from '../../ListContext';
import "./../../../../Footer/Footer.css"


export default function Edit({ tache }) {
    const { list, setList } = useContext(ListContext);
    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date_echeance: "",
        etat: "Nouveau",
        contactsInput: ""
    });

    const handleOpen = () => {
        const initialContacts = tache.contacts || tache.equipiers || [];

        setFormData({
            title: tache.title || "",
            description: tache.description || "",
            date_echeance: tache.date_echeance || "",
            etat: tache.etat || "Nouveau",
            contactsInput: initialContacts.map(c => c.name).join(', ')
        });

        setOpen(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (formData.title.trim() === "") return;

        const formattedContacts = formData.contactsInput
            .split(',')
            .map(nom => nom.trim())
            .filter(nom => nom !== "")
            .map(nom => ({ name: nom }));

        const updatedList = list.map((item) => {
            if (item.id === tache.id) {
                return {
                    ...item,
                    title: formData.title,
                    description: formData.description,
                    date_echeance: formData.date_echeance,
                    etat: formData.etat,
                    contacts: formattedContacts
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

                        <input
                            name="contactsInput"
                            type="text"
                            placeholder="Contacts (séparés par des virgules)"
                            value={formData.contactsInput}
                            onChange={handleChange}
                        />


                        <select name="etat" value={formData.etat} onChange={handleChange}>
                            <option value="Nouveau">Nouveau</option>
                            <option value="En attente">En attente</option>
                            <option value="Reussi">Réussi</option>
                            <option value="Abandoné">Abandoné</option>
                        </select>

                        <div className="modal-actions">
                            <button onClick={handleSubmit}>Enregistrer</button>
                            <button onClick={() => setOpen(false)}>Annuler</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}