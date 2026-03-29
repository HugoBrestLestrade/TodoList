import { useContext } from 'react';
import { ListContext } from '../../ListContext';
import data from './../../../../../data.json';

export default function Reset() {
    const { setList } = useContext(ListContext);


    const handleReset = () => {

        const isConfirmed = window.confirm("Êtes-vous sûr(e) de vouloir repartir de zéro ?");


        if (isConfirmed) {
            setList([]);
        }
    };

    return (
        <>
            <button className="reset-buttons-container" onClick={handleReset}>
                Partir de 0
            </button>
            <RevenirJson/>
        </>
    );
}

function RevenirJson() {
    const { setList } = useContext(ListContext);

    const handleRestore = () => {
        const isConfirmed = window.confirm("Revenir au fichier JSON ?");

        if (isConfirmed) {
            setList(data.tasks);
        }
    };

    return (
        <button className="reset-buttons-container" onClick={handleRestore}>
            Revenir au fichier JSON
        </button>
    );
}