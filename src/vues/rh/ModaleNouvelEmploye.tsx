import React, { useState } from 'react';
import { ModaleFormulaire } from '../../composants/communs/ModaleFormulaire';
import { utiliserAcademie } from '../../controleurs/contexteAcademie';

interface ProprietesModaleNouvelEmploye {
  ouvert: boolean;
  surFermeture: () => void;
}

export const ModaleNouvelEmploye: React.FC<ProprietesModaleNouvelEmploye> = ({
  ouvert,
  surFermeture,
}) => {
  const { ajouterEmploye, traduire } = utiliserAcademie();

  const [formulaire, setFormulaire] = useState({
    nomComplet: '',
    poste: '',
    departement: 'Pedagogique' as 'Pedagogique' | 'Administration' | 'Comptabilite' | 'Technique' | 'Services',
    typeContrat: 'CDI' as 'CDI' | 'CDD' | 'Temps partiel' | 'Vacataire',
    salaireMensuel: 4500,
    dateDebut: new Date().toISOString().split('T')[0],
    joursCongesRestants: 25,
    statut: 'actif' as 'actif' | 'en_conge' | 'arret_maladie',
  });

  const soumettre = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formulaire.nomComplet || !formulaire.poste) return;

    ajouterEmploye({
      nomComplet: formulaire.nomComplet,
      poste: formulaire.poste,
      departement: formulaire.departement,
      typeContrat: formulaire.typeContrat,
      salaireMensuel: Number(formulaire.salaireMensuel),
      dateDebut: formulaire.dateDebut,
      joursCongesRestants: Number(formulaire.joursCongesRestants),
      statut: formulaire.statut,
    });

    surFermeture();
  };

  return (
    <ModaleFormulaire
      ouvert={ouvert}
      surFermeture={surFermeture}
      titre={traduire('ajouterEmploye')}
      sousTitre="Staff onboarding"
      texteBoutonValidation={traduire('enregistrer')}
      surValidation={soumettre}
    >
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-semibold text-slate-900 mb-1">{traduire('nomComplet')}</label>
          <input
            type="text"
            value={formulaire.nomComplet}
            onChange={(e) => setFormulaire({ ...formulaire, nomComplet: e.target.value })}
            placeholder="e.g. Dr. Jennifer Adams"
            className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-900 mb-1">{traduire('posteEtDepartement')}</label>
          <input
            type="text"
            value={formulaire.poste}
            onChange={(e) => setFormulaire({ ...formulaire, poste: e.target.value })}
            placeholder="e.g. Chemistry Instructor"
            className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1">{traduire('departement')}</label>
            <select
              value={formulaire.departement}
              onChange={(e) => setFormulaire({ ...formulaire, departement: e.target.value as any })}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
            >
              <option value="Pedagogique">Pedagogical / Teaching</option>
              <option value="Administration">Administration</option>
              <option value="Comptabilite">Finance & Bursar</option>
              <option value="Technique">IT & Infrastructure</option>
              <option value="Services">Services & Library</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1">{traduire('salaire')} ($)</label>
            <input
              type="number"
              min="100"
              value={formulaire.salaireMensuel}
              onChange={(e) => setFormulaire({ ...formulaire, salaireMensuel: Number(e.target.value) })}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
              required
            />
          </div>
        </div>
      </div>
    </ModaleFormulaire>
  );
};
