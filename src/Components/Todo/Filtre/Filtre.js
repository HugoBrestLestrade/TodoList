import './Filtre.css';

export default function Filtre({
                                   searchTerm, setSearchTerm,
                                   activeEtats, toggleEtat, tousLesEtats, setActiveEtats,
                                   dossiersList, activeDossiers, toggleFiltreDossier
                               }) {
    return (
        <div className="filtre-container">

            {/* Barre de recherche */}
            <input
                type="text"
                className="filtre-search-input"
                placeholder="Rechercher une tâche..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="filtre-options-wrapper">
                {/* Filtres par État */}
                <div>
                    <strong>Filtrer par état : </strong>
                    <div className="filtre-checkbox-group">
                        {tousLesEtats.map(etat => (
                            <label key={etat} className="filtre-label">
                                <input
                                    type="checkbox"
                                    checked={activeEtats.includes(etat)}
                                    onChange={() => toggleEtat(etat)}
                                />
                                {etat}
                            </label>
                        ))}
                        <button
                            className="filtre-reset-btn"
                            onClick={() => setActiveEtats(["Nouveau", "En attente"])}
                        >
                            Reset "En cours"
                        </button>
                    </div>
                </div>

                {/* Filtres par Dossiers */}
                {dossiersList && dossiersList.length > 0 && (
                    <div className="filtre-dossiers-section">
                        <strong>Filtrer par dossier : </strong>
                        <div className="filtre-checkbox-group">
                            {dossiersList.map(dossier => (
                                <label key={dossier.intitule} className="filtre-label">
                                    <input
                                        type="checkbox"
                                        checked={activeDossiers.includes(dossier.intitule)}
                                        onChange={() => toggleFiltreDossier(dossier.intitule)}
                                    />
                                    <span
                                        className="filtre-dossier-dot"
                                        style={{ backgroundColor: dossier.couleur }}
                                    ></span>
                                    {dossier.intitule}
                                </label>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}