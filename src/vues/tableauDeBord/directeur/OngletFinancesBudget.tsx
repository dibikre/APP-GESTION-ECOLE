import React from 'react';
import {
  DollarSign,
  PieChart,
  Layers,
  FileCheck,
  TrendingUp,
  CreditCard,
  Building,
} from 'lucide-react';
import { utiliserAcademie } from '../../../controleurs/contexteAcademie';

export const OngletFinancesBudget: React.FC = () => {
  const { listeBudgets, listeFactures, listeTransactions } = utiliserAcademie();

  const totalFacture = listeFactures.reduce((s, f) => s + f.montantTotal, 0);
  const totalEncaisse = listeFactures.reduce((s, f) => s + f.montantPaye, 0);
  const totalDepenses = listeTransactions
    .filter((t) => t.type === 'depense')
    .reduce((s, t) => s + t.montant, 0);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900">Institutional Financial Governance & Budgets</h3>
        <p className="text-xs text-slate-500">Review departmental allocations, tuition matrices, and supplier disbursements.</p>
      </div>

      {/* Tuition Structure Matrix */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <h4 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
          Academic Tuition Structure (Per Term)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-3">
          {[
            { niveau: 'Grade 9 (Secondary)', montant: 3800, rabais: '5% Sibling Discount' },
            { niveau: 'Grade 10 (Secondary)', montant: 4000, rabais: '5% Sibling Discount' },
            { niveau: 'Grade 11 (Science)', montant: 4500, rabais: 'Merit Scholarship Avail.' },
            { niveau: 'Grade 12 (Baccalaureate)', montant: 4800, rabais: 'Merit Scholarship Avail.' },
          ].map((item) => (
            <div key={item.niveau} className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs">
              <span className="font-bold text-slate-900 block">{item.niveau}</span>
              <span className="text-base font-extrabold text-red-600 block mt-1">${item.montant} / term</span>
              <span className="text-[10px] text-slate-500 mt-1 block">{item.rabais}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Departmental Annual Budgets */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <span className="text-sm font-bold text-slate-900">Annual Departmental Budget Tracking</span>
          <span className="text-xs font-bold text-slate-600">Fiscal Year 2025-2026</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Department</th>
                <th className="py-2.5 px-4">Department Head</th>
                <th className="py-2.5 px-4">Allocated Budget</th>
                <th className="py-2.5 px-4">Disbursed YTD</th>
                <th className="py-2.5 px-4">Remaining Balance</th>
                <th className="py-2.5 px-4 text-right">Burn Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {listeBudgets.map((b) => {
                const restant = b.budgetAlloue - b.budgetDepense;
                const ratio = Math.round((b.budgetDepense / b.budgetAlloue) * 100);
                return (
                  <tr key={b.identifiant} className="hover:bg-slate-50/70">
                    <td className="py-2.5 px-4 font-bold text-slate-900">{b.departement}</td>
                    <td className="py-2.5 px-4 text-slate-600">{b.responsableNom}</td>
                    <td className="py-2.5 px-4 font-bold text-slate-900">${b.budgetAlloue.toLocaleString()}</td>
                    <td className="py-2.5 px-4 text-red-600 font-semibold">${b.budgetDepense.toLocaleString()}</td>
                    <td className="py-2.5 px-4 text-emerald-700 font-bold">${restant.toLocaleString()}</td>
                    <td className="py-2.5 px-4 text-right">
                      <span className="font-extrabold text-slate-900">{ratio}%</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
