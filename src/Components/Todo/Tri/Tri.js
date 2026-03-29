export default function Tri({
                                searchTerm, setSearchTerm,
                                activeEtats, toggleEtat, tousLesEtats, setActiveEtats,
                                sortBy, setSortBy, sortDesc, setSortDesc,
                                dossiersList, activeDossiers, toggleFiltreDossier
                            }) {
    return (
        <div style={{ backgroundColor: "#f8f9fa", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>

            <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: "100%", padding: "8px", marginBottom: "15px", borderRadius: "4px", border: "1px solid #ccc" }}
            />

            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>

                <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", flex: 1 }}>
                    {/* Filtres par État */}
                    <div>
                        <strong>Filtrer par état : </strong>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "5px" }}>
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
                            <button
                                onClick={() => setActiveEtats(["Nouveau", "En attente"])}
                                style={{ marginLeft: "10px", padding: "2px 8px", cursor: "pointer", fontSize: "0.8rem" }}
                            >
                                Reset "En cours"
                            </button>
                        </div>
                    </div>

                    {/* Filtres par Dossiers */}
                    {dossiersList.length > 0 && (
                        <div style={{ borderLeft: "1px solid #ddd", paddingLeft: "20px" }}>
                            <strong>Filtrer par dossier : </strong>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "5px" }}>
                                {dossiersList.map(dossier => (
                                    <label key={dossier.intitule} style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
                                        <input
                                            type="checkbox"
                                            checked={activeDossiers.includes(dossier.intitule)}
                                            onChange={() => toggleFiltreDossier(dossier.intitule)}
                                        />
                                        <span style={{ width: "10px", height: "10px", backgroundColor: dossier.couleur, borderRadius: "50%", margin: "0 5px" }}></span>
                                        {dossier.intitule}
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Le Tri (existant) */}
                <div style={{ minWidth: "250px" }}>
                    <strong>Trier par : </strong>
                    <div style={{ display: "flex", marginTop: "5px", gap: "5px" }}>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            style={{ padding: "5px", flex: 1 }}
                        >
                            <option value="date_echeance">Date d'échéance</option>
                            <option value="date_creation">Date de création</option>
                            <option value="title">Nom</option>
                        </select>
                        <button onClick={() => setSortDesc(!sortDesc)} style={{ padding: "5px", cursor: "pointer" }}>
                            {sortDesc ? "🔽" : "🔼"}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}