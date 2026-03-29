import { useContext } from 'react';
import { ListContext } from "../Todo/List/ListContext";
import './Header.css';

function Header() {
    const { list } = useContext(ListContext);

    const totalTasks = list.length;
    const unfinishedTasks = list.filter(
        (tache) => tache.etat !== 'Abandoné' && tache.etat !== 'Reussi'
    ).length;

    // Calcul pour le Camembert
    const counts = { "Nouveau": 0, "En attente": 0, "Reussi": 0, "Abandoné": 0 };
    list.forEach(tache => {
        if (counts[tache.etat] !== undefined) {
            counts[tache.etat]++;
        }
    });

    let currentPct = 0;
    const segments = [
        { label: "Nouveau", color: "#3498db", count: counts["Nouveau"] },
        { label: "En attente", color: "#f39c12", count: counts["En attente"] },
        { label: "Reussi", color: "#2ecc71", count: counts["Reussi"] },
        { label: "Abandoné", color: "#e74c3c", count: counts["Abandoné"] }
    ];

    const gradientParts = totalTasks > 0 ? segments.map(seg => {
        const pct = (seg.count / totalTasks) * 100;
        const start = currentPct;
        currentPct += pct;
        return `${seg.color} ${start}% ${currentPct}%`;
    }).join(', ') : "transparent 0% 100%";

    return (
        <header className="header-container">
            <h1 className="header-title">TODO LIST</h1>

            <div className="header-stats-wrapper">

                {/*COMPTEURS*/}
                <div className="header-text-stats">
                    <p className="header-total-text">
                        Total des tâches : <strong>{totalTasks}</strong>
                    </p>
                    <p className="header-unfinished-text">
                        Tâches en cours : <strong>{unfinishedTasks}</strong>
                    </p>
                </div>

                {/* CAMEMBERT + LÉGENDE */}
                {totalTasks > 0 && (
                    <div className="header-pie-section">

                        {/* Camenbert */}
                        <div
                            className="header-pie-chart"
                            style={{ background: `conic-gradient(${gradientParts})` }}
                        ></div>

                        {/* Légende */}
                        <div className="header-pie-legend">
                            {segments.map(seg => (
                                <div key={seg.label} className="header-pie-legend-item">
                                    <span
                                        className="header-pie-dot"
                                        style={{ backgroundColor: seg.color }}
                                    ></span>
                                    {seg.label} ({seg.count})
                                </div>
                            ))}
                        </div>

                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;