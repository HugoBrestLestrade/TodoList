import './Tri.css';

export default function Tri({ sortBy, setSortBy, sortDesc, setSortDesc }) {
    return (
        <div className="tri-container">
            <strong>Trier par : </strong>
            <select
                className="tri-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
            >
                <option value="date_echeance">Date d'échéance</option>
                <option value="date_creation">Date de création</option>
                <option value="title">Nom</option>
            </select>
            <button
                className="tri-button"
                onClick={() => setSortDesc(!sortDesc)}
            >
                {sortDesc ? "🔽 Décroissant" : "🔼 Croissant"}
            </button>
        </div>
    );
}