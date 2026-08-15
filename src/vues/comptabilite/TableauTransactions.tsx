import React from 'react';
import { TransactionFinanciere } from '../../modeles/types';
import { utiliserAcademie } from '../../controleurs/contexteAcademie';

interface ProprietesTableauTransactions {
  transactions: TransactionFinanciere[];
}

export const TableauTransactions: React.FC<ProprietesTableauTransactions> = ({ transactions }) => {
  const { traduire } = utiliserAcademie();

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900">{traduire('journalFinancier')}</h2>
          <p className="text-xs text-slate-500">{transactions.length} general ledger entries</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-100">
            <tr>
              <th className="px-4 py-3">{traduire('type')}</th>
              <th className="px-4 py-3">{traduire('categorie')}</th>
              <th className="px-4 py-3">{traduire('date')}</th>
              <th className="px-4 py-3 text-right">{traduire('montant')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {transactions.map((tr) => (
              <tr key={tr.identifiant} className="hover:bg-slate-50/80">
                <td className="px-4 py-3">
                  <span className="font-bold text-slate-900">{tr.description}</span>
                  <div className="text-[11px] text-slate-500">{tr.beneficiaire} &bull; {tr.reference}</div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-[11px] font-medium text-slate-700 uppercase">
                    {tr.categorie.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-500">{tr.dateTransaction}</td>
                <td className="px-4 py-3 text-right">
                  <span
                    className={`font-bold ${
                      tr.type === 'revenu' ? 'text-emerald-700' : 'text-red-700'
                    }`}
                  >
                    {tr.type === 'revenu' ? '+' : '-'}${tr.montant.toLocaleString()}
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
