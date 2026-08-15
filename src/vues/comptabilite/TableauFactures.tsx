import React from 'react';
import { FactureComptabilite } from '../../modeles/types';
import { utiliserAcademie } from '../../controleurs/contexteAcademie';

interface ProprietesTableauFactures {
  factures: FactureComptabilite[];
}

export const TableauFactures: React.FC<ProprietesTableauFactures> = ({ factures }) => {
  const { traduire } = utiliserAcademie();

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900">{traduire('facturesEleves')}</h2>
          <p className="text-xs text-slate-500">{factures.length} invoices recorded</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-100">
            <tr>
              <th className="px-4 py-3">{traduire('nomEleve')}</th>
              <th className="px-4 py-3">{traduire('montant')}</th>
              <th className="px-4 py-3">{traduire('date')}</th>
              <th className="px-4 py-3 text-right">{traduire('statut')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {factures.map((fac) => (
              <tr key={fac.identifiant} className="hover:bg-slate-50/80">
                <td className="px-4 py-3">
                  <span className="font-bold text-slate-900">{fac.nomEleve}</span>
                  <div className="text-[11px] text-slate-500">{fac.numeroFacture} &bull; {fac.classe}</div>
                </td>
                <td className="px-4 py-3 font-semibold text-slate-900">
                  ${fac.montantPaye} / ${fac.montantTotal}
                </td>
                <td className="px-4 py-3 text-slate-500">{fac.dateEcheance}</td>
                <td className="px-4 py-3 text-right">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      fac.statut === 'paye'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {fac.statut}
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
