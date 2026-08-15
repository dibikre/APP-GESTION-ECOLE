import React from 'react';
import { AnnonceCommunication } from '../../modeles/types';
import { utiliserAcademie } from '../../controleurs/contexteAcademie';

interface ProprietesFilAnnonces {
  annonces: AnnonceCommunication[];
  filtreCible: string;
  surChangementFiltre: (valeur: string) => void;
}

export const FilAnnonces: React.FC<ProprietesFilAnnonces> = ({
  annonces,
  filtreCible,
  surChangementFiltre,
}) => {
  const { traduire } = utiliserAcademie();

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-900">{traduire('fluxAnnonces')}</h2>
          <p className="text-xs text-slate-500">Live notices and institutional memos</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-600">Audience:</label>
          <select
            value={filtreCible}
            onChange={(e) => surChangementFiltre(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-semibold focus:outline-none"
          >
            <option value="all">All Audiences</option>
            <option value="parents">Parents & Guardians</option>
            <option value="professeurs">Faculty Only</option>
            <option value="eleves">Students</option>
          </select>
        </div>
      </div>

      <div className="divide-y divide-slate-100 p-6 space-y-4">
        {annonces.map((annonce) => (
          <div
            key={annonce.identifiant}
            className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all shadow-xs"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    annonce.priorite === 'urgente'
                      ? 'bg-red-100 text-red-700 font-extrabold'
                      : annonce.priorite === 'importante'
                      ? 'bg-amber-100 text-amber-800 font-bold'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {annonce.priorite} Priority
                </span>
                <span className="text-xs font-semibold text-slate-600">
                  Target: <span className="uppercase text-red-600">{annonce.cible}</span>
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium">{annonce.datePublication}</span>
            </div>

            <h3 className="text-base font-bold text-slate-900 mt-3">{annonce.titre}</h3>
            <p className="text-sm text-slate-700 mt-2 leading-relaxed">{annonce.contenu}</p>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Issued by: <strong className="text-slate-800">{annonce.auteurNom}</strong></span>
              <span className="text-emerald-700 font-medium">Delivered to Portal feeds</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
