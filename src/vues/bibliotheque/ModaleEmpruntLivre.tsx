import React, { useState } from 'react';
import { ModaleFormulaire } from '../../composants/communs/ModaleFormulaire';
import { LivreBibliotheque } from '../../modeles/types';
import { utiliserAcademie } from '../../controleurs/contexteAcademie';

interface ProprietesModaleEmpruntLivre {
  ouvert: boolean;
  surFermeture: () => void;
  livresDisponibles: LivreBibliotheque[];
}

export const ModaleEmpruntLivre: React.FC<ProprietesModaleEmpruntLivre> = ({
  ouvert,
  surFermeture,
  livresDisponibles,
}) => {
  const { enregistrerEmpruntLivre, traduire } = utiliserAcademie();

  const [formulaire, setFormulaire] = useState({
    identifiantLivre: livresDisponibles[0]?.identifiant || '',
    emprunteurNom: '',
    type: 'eleve' as 'eleve' | 'professeur',
  });

  const soumettre = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formulaire.identifiantLivre || !formulaire.emprunteurNom) return;

    enregistrerEmpruntLivre(
      formulaire.identifiantLivre,
      formulaire.emprunteurNom,
      formulaire.type
    );

    surFermeture();
  };

  return (
    <ModaleFormulaire
      ouvert={ouvert}
      surFermeture={surFermeture}
      titre={traduire('emprunterLivre')}
      sousTitre="Issue book loan"
      texteBoutonValidation={traduire('enregistrer')}
      surValidation={soumettre}
    >
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-semibold text-slate-900 mb-1">{traduire('titre')}</label>
          <select
            value={formulaire.identifiantLivre}
            onChange={(e) =>
              setFormulaire({ ...formulaire, identifiantLivre: e.target.value })
            }
            className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
          >
            {livresDisponibles.map((l) => (
              <option key={l.identifiant} value={l.identifiant}>
                {l.titre} ({l.exemplairesDisponibles} {traduire('disponible')})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-900 mb-1">Borrower Name</label>
          <input
            type="text"
            value={formulaire.emprunteurNom}
            onChange={(e) =>
              setFormulaire({ ...formulaire, emprunteurNom: e.target.value })
            }
            placeholder="e.g. Marcus Vance"
            className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
            required
          />
        </div>
      </div>
    </ModaleFormulaire>
  );
};
