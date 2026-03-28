import { useContext } from 'react';
import { ListContext } from "../Todo/List/ListContext";

function Header() {
    const { list } = useContext(ListContext);

    const totalTasks = list.length;

    const unfinishedTasks = list.filter(
        (tache) => tache.etat !== 'Abandoné' && tache.etat !== 'Reussi'
    ).length;

    return (
        <header>
            <h1>TODO LIST</h1>

            <div>
                <p>
                    Total des tâches : <strong>{totalTasks}</strong>
                </p>
                <p>
                    Tâches en cours : <strong>{unfinishedTasks}</strong>
                </p>
            </div>
        </header>
    );
}

export default Header;