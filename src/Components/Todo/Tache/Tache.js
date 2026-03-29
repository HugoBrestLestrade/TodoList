import { useState } from 'react';
import Edit from '../List/CRUD/Edit/Edit';
import './Tache.css';

export default function Tache({ tache }) {
    const [isComplet, setIsComplet] = useState(false);
    const personnes = tache.contacts || tache.equipiers || [];
    const dossiers = tache.dossiers || [];

    const renderDossier = (dossier, index) => (
        <span
            key={index}
            className="tache-dossier-tag"
            style={{ backgroundColor: dossier.color || "#ccc" }}
        >
            {dossier.title}
        </span>
    );

    return (
        <li className="tache-item">
            {/* Mode Simple */}
            <div className="tache-simple-mode" onClick={() => setIsComplet(!isComplet)}>
                <span className="tache-toggle-icon">
                    {isComplet ? "▼" : "▶"}
                </span>
                <h3 className="tache-title">{tache.title}</h3>

                <div className="tache-dossiers-preview">
                    {dossiers.slice(0, 2).map(renderDossier)}
                    {dossiers.length > 2 && !isComplet && (
                        <span className="tache-dossiers-more">
                            +{dossiers.length - 2}
                        </span>
                    )}
                </div>

                <span className="tache-date">
                    Échéance : {tache.date_echeance || "Non définie"}
                </span>
            </div>

            {/* Mode Complet */}
            {isComplet && (
                <div className="tache-complet-mode">
                    {dossiers.length > 0 && (
                        <div className="tache-dossiers-full">
                            <strong>Dossiers : </strong>{dossiers.map(renderDossier)}
                        </div>
                    )}

                    <p><strong>Description :</strong> {tache.description || "Aucune description"}</p>
                    <p><strong>État :</strong> {tache.etat}</p>
                    <p><strong>Créée le :</strong> {tache.date_creation}</p>
                    <p><strong>Contacts :</strong> {personnes.length > 0 ? personnes.map(p => p.name).join(', ') : "Aucun contact"}</p>

                    <div className="tache-edit-wrapper">
                        <Edit tache={tache} />
                    </div>
                </div>
            )}
        </li>
    );
}