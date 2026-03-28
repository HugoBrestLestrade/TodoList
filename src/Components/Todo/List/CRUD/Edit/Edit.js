import { useContext } from 'react';
import { ListContext } from '../../ListContext';

export default function Edit({ tache }) {
    const { list, setList } = useContext(ListContext);

    const handleChange = (e) => {
        const newEtat = e.target.value;

        const updatedList = list.map((item) => item.id === tache.id
                ? { ...item, etat: newEtat }
                : item
        );

        setList(updatedList);
    };

    return (
        <select value={tache.etat} onChange={handleChange}>
            <option value="Nouveau">Nouveau</option>
            <option value="En attente">En attente</option>
            <option value="Reussi">Réussi</option>
            <option value="Abandoné">Abandoné</option>
        </select>
    );
}