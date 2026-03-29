export default function Tri({
                                searchTerm, setSearchTerm,
                                activeEtats, toggleEtat, tousLesEtats, setActiveEtats,
                                sortBy, setSortBy,
                                sortDesc, setSortDesc
                            }) {
    return (
        <div style={{ backgroundColor: "#f8f9fa", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>

            {/* Barre de recherche */}
            <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: "100%", padding: "8px", marginBottom: "15px", borderRadius: "4px", border: "1px solid #ccc" }}
            />

            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>

                {/*  Filtres par État */}
                <div>
                    <strong>Filtrer par état : </strong>
                    <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
                        {tousLesEtats.map(etat => (
                            <label key={etat} style={{ cursor: "pointer" }}>
                                <input
                                    type="checkbox"
                                    checked={activeEtats.includes(etat)}
                                    onChange={() => toggleEtat(etat)}
                                />
                                {etat}
                            </label>
                        ))}
                        {/* Bouton "En cours"*/}
                        <button
                            onClick={() => setActiveEtats(["Nouveau", "En attente"])}
                            style={{ marginLeft: "10px", padding: "2px 8px", cursor: "pointer" }}
                        >
                            Reset "En cours"
                        </button>
                    </div>
                </div>

                {/* Tri */}
                <div>
                    <strong>Trier par : </strong>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        style={{ padding: "5px", marginLeft: "5px", marginRight: "5px" }}
                    >
                        <option value="date_echeance">Date d'échéance</option>
                        <option value="date_creation">Date de création</option>
                        <option value="title">Nom</option>
                    </select>

                    <button onClick={() => setSortDesc(!sortDesc)} style={{ padding: "5px", cursor: "pointer" }}>
                        {sortDesc ? "🔽 Décroissant" : "🔼 Croissant"}
                    </button>
                </div>

            </div>
        </div>
    );
}