import React from 'react';
import { EmpruntLivre } from '../../modeles/types';
import { utiliserAcademie } from '../../controleurs/contexteAcademie';

interface ProprietesSectionEmpruntsLivres {
  emprunts: EmpruntLivre[];
}

export const SectionEmpruntsLivres: React.FC<ProprietesSectionEmpruntsLivres> = ({ emprunts }) => {
  const { retournerLivreEmprunte, traduire } = utiliserAcademie();

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
      <div>
        <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
          {traduire('empruntsEnCours')}
        </h2>
        <div className="divide-y divide-slate-100 mt-2">
          {emprunts.map((emprunt) => (
            <div key={emprunt.identifiant} className="py-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">{emprunt.titreLivre}</span>
                <span
                  className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                    emprunt.statut === 'rendu'
                      ? 'bg-slate-100 text-slate-700'
                      : emprunt.statut === 'en_retard'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-emerald-50 text-emerald-700'
                  }`}
                >
                  {emprunt.statut}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1">
                Borrower: <span className="font-semibold">{emprunt.emprunteurNom}</span> ({emprunt.emprunteurType})
              </p>
              <p className="text-[11px] text-slate-500">Due: {emprunt.dateRetourPrevue}</p>
              {emprunt.statut !== 'rendu' && (
                <button
                  type="button"
                  onClick={() => retournerLivreEmprunte(emprunt.identifiant)}
                  className="mt-2 text-[11px] font-bold text-red-600 hover:text-red-800 hover:underline cursor-pointer"
                >
                  Mark as Returned
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
