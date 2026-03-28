import { useState, useContext } from "react";
import { ListContext } from "../Todo/List/ListContext";
import "./Footer.css";

export default function Footer() {
    const [open, setOpen] = useState(false);
    const { setList } = useContext(ListContext);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date_echeance: "",
        contactsInput: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (formData.title.trim() < 5) return;

        // On passe de "Bob, Alice" en  : [{ name: "Bob" }, { name: "Alice" }] pour les contacts
        const formattedContacts = formData.contactsInput
            .split(',')
            .map(nom => nom.trim())
            .filter(nom => nom !== "")
            .map(nom => ({ name: nom }));

        setList(prev => [...prev, {
            id: Date.now(),
            title: formData.title,
            description: formData.description,
            date_echeance: formData.date_echeance,
            etat: "Nouveau",
            date_creation: new Date().toISOString().split("T")[0],
            contacts: formattedContacts
        }]);

        setFormData({ title: "", description: "", date_echeance: "", contactsInput: "" });
        setOpen(false);
    };

    return (
        <footer>
            <p>FOOTER</p>
            <button onClick={() => setOpen(true)}>+</button>

            {open && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Créer une tâche</h2>

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

                        <div className="modal-actions">
                            <button onClick={handleSubmit}>Ajouter</button>
                            <button onClick={() => setOpen(false)}>Fermer</button>
                        </div>
                    </div>
                </div>
            )}
        </footer>
    );
}