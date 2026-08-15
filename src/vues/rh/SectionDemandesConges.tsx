import React from 'react';
import { DemandeConge } from '../../modeles/types';
import { utiliserAcademie } from '../../controleurs/contexteAcademie';

interface ProprietesSectionDemandesConges {
  demandes: DemandeConge[];
}

export const SectionDemandesConges: React.FC<ProprietesSectionDemandesConges> = ({ demandes }) => {
  const { traiterDemandeConge, traduire } = utiliserAcademie();

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
      <div>
        <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
          {traduire('demandesConges')}
        </h2>
        <div className="divide-y divide-slate-100 mt-2">
          {demandes.length === 0 ? (
            <p className="text-xs text-slate-500 py-4">No pending leave requests.</p>
          ) : (
            demandes.map((demande) => (
              <div key={demande.identifiant} className="py-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{demande.nomEmploye}</span>
                  <span
                    className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                      demande.statut === 'approuve'
                        ? 'bg-emerald-50 text-emerald-700'
                        : demande.statut === 'refuse'
                        ? 'bg-red-50 text-red-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {demande.statut}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  {demande.typeConge} &bull; {demande.dateDebut} to {demande.dateFin}
                </p>
                <p className="text-[11px] text-slate-500 italic mt-0.5">"{demande.motif}"</p>

                {demande.statut === 'en_attente' && (
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => traiterDemandeConge(demande.identifiant, 'approuve')}
                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-bold cursor-pointer"
                    >
                      {traduire('approuver')}
                    </button>
                    <button
                      type="button"
                      onClick={() => traiterDemandeConge(demande.identifiant, 'refuse')}
                      className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-[11px] font-bold cursor-pointer"
                    >
                      {traduire('refuser')}
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
