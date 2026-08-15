import React, { useState } from 'react';
import { ModaleFormulaire } from '../../composants/communs/ModaleFormulaire';
import { EmployeRH } from '../../modeles/types';
import { utiliserAcademie } from '../../controleurs/contexteAcademie';

interface ProprietesModaleDemandeConge {
  ouvert: boolean;
  surFermeture: () => void;
  listeEmployes: EmployeRH[];
}

export const ModaleDemandeConge: React.FC<ProprietesModaleDemandeConge> = ({
  ouvert,
  surFermeture,
  listeEmployes,
}) => {
  const { soumettreDemandeConge, traduire } = utiliserAcademie();

  const [formulaire, setFormulaire] = useState({
    identifiantEmploye: listeEmployes[0]?.identifiant || '',
    typeConge: 'annuel' as 'annuel' | 'maladie' | 'maternite' | 'autre',
    dateDebut: '2026-04-01',
    dateFin: '2026-04-05',
    motif: '',
  });

  const soumettre = (e: React.FormEvent) => {
    e.preventDefault();
    const emp = listeEmployes.find((item) => item.identifiant === formulaire.identifiantEmploye);
    if (!emp) return;

    soumettreDemandeConge({
      identifiantEmploye: emp.identifiant,
      nomEmploye: emp.nomComplet,
      typeConge: formulaire.typeConge,
      dateDebut: formulaire.dateDebut,
      dateFin: formulaire.dateFin,
      motif: formulaire.motif,
    });

    surFermeture();
  };

  return (
    <ModaleFormulaire
      ouvert={ouvert}
      surFermeture={surFermeture}
      titre={traduire('demanderConge')}
      sousTitre="Time-off request"
      texteBoutonValidation={traduire('enregistrer')}
      surValidation={soumettre}
    >
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-semibold text-slate-900 mb-1">{traduire('nomComplet')}</label>
          <select
            value={formulaire.identifiantEmploye}
            onChange={(e) => setFormulaire({ ...formulaire, identifiantEmploye: e.target.value })}
            className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
          >
            {listeEmployes.map((emp) => (
              <option key={emp.identifiant} value={emp.identifiant}>
                {emp.nomComplet} ({emp.poste})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-900 mb-1">{traduire('type')}</label>
          <select
            value={formulaire.typeConge}
            onChange={(e) => setFormulaire({ ...formulaire, typeConge: e.target.value as any })}
            className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
          >
            <option value="annuel">Annual Vacation</option>
            <option value="maladie">Medical / Sick Leave</option>
            <option value="maternite">Maternity / Parental</option>
            <option value="autre">Academic Sabbatical</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1">Start Date</label>
            <input
              type="date"
              value={formulaire.dateDebut}
              onChange={(e) => setFormulaire({ ...formulaire, dateDebut: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1">End Date</label>
            <input
              type="date"
              value={formulaire.dateFin}
              onChange={(e) => setFormulaire({ ...formulaire, dateFin: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-900 mb-1">{traduire('appreciation')}</label>
          <textarea
            rows={2}
            value={formulaire.motif}
            onChange={(e) => setFormulaire({ ...formulaire, motif: e.target.value })}
            placeholder="Reason..."
            className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
            required
          />
        </div>
      </div>
    </ModaleFormulaire>
  );
};
