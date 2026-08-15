import React from 'react';
import { Eleve } from '../../modeles/types';
import { utiliserAcademie } from '../../controleurs/contexteAcademie';

interface ProprietesTableauEleves {
  eleves: Eleve[];
}

export const TableauEleves: React.FC<ProprietesTableauEleves> = ({ eleves }) => {
  const { traduire, termeRecherche, definirTermeRecherche } = utiliserAcademie();

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-900">{traduire('effectifInscrit')}</h2>
          <p className="text-xs text-slate-500">{eleves.length} {traduire('elevesInscrits')}</p>
        </div>
        <div className="w-full sm:w-64">
          <input
            type="text"
            value={termeRecherche}
            onChange={(e) => definirTermeRecherche(e.target.value)}
            placeholder={traduire('rechercheMatricule')}
            className="w-full px-3.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-100">
            <tr>
              <th className="px-6 py-3.5">{traduire('matriculeEtNom')}</th>
              <th className="px-6 py-3.5">{traduire('classe')}</th>
              <th className="px-6 py-3.5">{traduire('contactParent')}</th>
              <th className="px-6 py-3.5">{traduire('moyenneGenerale')}</th>
              <th className="px-6 py-3.5">{traduire('presence')}</th>
              <th className="px-6 py-3.5 text-right">{traduire('statutScolarite')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800">
            {eleves.map((eleve) => (
              <tr key={eleve.identifiant} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-900">{eleve.nomComplet}</div>
                  <div className="text-[11px] text-slate-500">{eleve.matricule}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-slate-900">{eleve.classe}</span>
                  <div className="text-[11px] text-slate-500">{eleve.courriel}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900">{eleve.nomParent}</div>
                  <div className="text-[11px] text-slate-500">{eleve.telephoneParent}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-bold text-slate-900">{eleve.moyenneGenerale}%</span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-emerald-700">{eleve.tauxPresence}%</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                      eleve.statutFrais === 'paye'
                        ? 'bg-emerald-50 text-emerald-700'
                        : eleve.statutFrais === 'partiel'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {eleve.statutFrais === 'paye'
                      ? traduire('soldeRegle')
                      : eleve.statutFrais === 'partiel'
                      ? traduire('soldePartiel')
                      : traduire('enRetard')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
