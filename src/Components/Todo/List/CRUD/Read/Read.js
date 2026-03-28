import { ListContext } from '../../ListContext';
import { useContext } from 'react';
import Edit from '../Edit/Edit';

function Read() {
    const { list } = useContext(ListContext);

    const filteredList = list.filter(
        (tache) => tache.etat !== 'Abandoné' && tache.etat !== 'Reussi'
    );

    return (
        <ul>
            {filteredList.map((tache) => (
                <li
                    key={tache.id}
                    style={{ borderBottom: "1px solid #ccc", paddingBottom: "10px", marginBottom: "15px", listStyleType: "none" }}
                >
                    <h3>{tache.title}</h3>

                    <p><strong>Description :</strong> {tache.description || "Aucune description"}</p>
                    <p><strong>État :</strong> {tache.etat}</p>
                    <p><strong>Créée le :</strong> {tache.date_creation}</p>
                    <p><strong>Échéance :</strong> {tache.date_echeance || "Non définie"}</p>

                    <p>
                        <strong>Contacts :</strong>{' '}
                        {tache.contacts && tache.contacts.length > 0
                            ? tache.contacts.join(', ')
                            : "Aucun contact"}
                    </p>

                    <Edit tache={tache} />
                </li>
            ))}
        </ul>
    );
}

export default Read;