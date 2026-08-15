import React, { useState } from 'react';
import {
  CreditCard,
  DollarSign,
  Download,
  Smartphone,
  CheckCircle,
  FileText,
} from '../../../composants/communs/IconesAcademie';
import { BoutonRouge } from '../../../composants/communs/BoutonRouge';
import { utiliserAcademie } from '../../../controleurs/contexteAcademie';

export const OngletParentFinances: React.FC = () => {
  const { listeFactures, enregistrerPaiement } = utiliserAcademie();
  const [modalPaiement, setModalPaiement] = useState(false);
  const [modePaiement, setModePaiement] = useState<'mobile_money' | 'carte' | 'virement'>('mobile_money');
  const [succesPaiement, setSuccesPaiement] = useState(false);

  const facturesParent = listeFactures.filter((f) => f.nomEleve.includes('Marcus') || f.nomEleve.includes('Chloe') || f.nomEleve.includes('Lucas'));

  const executerPaiement = (e: React.FormEvent) => {
    e.preventDefault();
    if (facturesParent[0]) {
      enregistrerPaiement(facturesParent[0].identifiant, facturesParent[0].montantTotal - facturesParent[0].montantPaye);
    }
    setSuccesPaiement(true);
    setModalPaiement(false);
    setTimeout(() => setSuccesPaiement(false), 4000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Tuition Accounts & Digital Settlement</h3>
          <p className="text-xs text-slate-500">Review term tuition invoices, pay online via Mobile Money or Card, and download official receipts.</p>
        </div>
        <BoutonRouge
          texte="Make a Payment"
          icone={CreditCard}
          onClick={() => setModalPaiement(true)}
        />
      </div>

      {succesPaiement && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" /> Payment successfully processed! Official digital receipt generated.
        </div>
      )}

      {modalPaiement && (
        <form onSubmit={executerPaiement} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <h4 className="text-sm font-bold text-slate-900">Select Digital Payment Channel</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setModePaiement('mobile_money')}
              className={`p-3 rounded-lg border text-left text-xs font-bold cursor-pointer ${
                modePaiement === 'mobile_money' ? 'border-red-600 bg-red-50 text-red-700' : 'border-slate-200 bg-slate-50 text-slate-700'
              }`}
            >
              <Smartphone className="w-4 h-4 mb-1 text-red-600" />
              Mobile Money (Orange / MTN / Wave)
            </button>
            <button
              type="button"
              onClick={() => setModePaiement('carte')}
              className={`p-3 rounded-lg border text-left text-xs font-bold cursor-pointer ${
                modePaiement === 'carte' ? 'border-red-600 bg-red-50 text-red-700' : 'border-slate-200 bg-slate-50 text-slate-700'
              }`}
            >
              <CreditCard className="w-4 h-4 mb-1 text-red-600" />
              Credit / Debit Card (Visa / Mastercard)
            </button>
            <button
              type="button"
              onClick={() => setModePaiement('virement')}
              className={`p-3 rounded-lg border text-left text-xs font-bold cursor-pointer ${
                modePaiement === 'virement' ? 'border-red-600 bg-red-50 text-red-700' : 'border-slate-200 bg-slate-50 text-slate-700'
              }`}
            >
              <DollarSign className="w-4 h-4 mb-1 text-red-600" />
              Direct Bank Wire Transfer
            </button>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <BoutonRouge texte="Cancel" variante="secondaire" taille="petit" onClick={() => setModalPaiement(false)} />
            <BoutonRouge texte="Confirm & Pay Tuition" taille="petit" type="submit" />
          </div>
        </form>
      )}

      {/* Invoices List */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <span className="text-sm font-bold text-slate-900">Child Tuition & Incidental Invoices</span>
          <span className="text-xs font-bold text-slate-600">Family Ledger</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Invoice #</th>
                <th className="py-2.5 px-4">Student</th>
                <th className="py-2.5 px-4">Description</th>
                <th className="py-2.5 px-4">Total Fee</th>
                <th className="py-2.5 px-4">Paid</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4 text-right">Official Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {facturesParent.map((fac) => (
                <tr key={fac.identifiant} className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-4 font-mono font-bold text-slate-900">{fac.numeroFacture}</td>
                  <td className="py-2.5 px-4 font-bold text-slate-900">{fac.nomEleve} ({fac.classe})</td>
                  <td className="py-2.5 px-4 text-slate-600 capitalize">{fac.typePaiement} Fee &bull; Term 2</td>
                  <td className="py-2.5 px-4 font-bold text-slate-900">${fac.montantTotal}</td>
                  <td className="py-2.5 px-4 text-emerald-700 font-bold">${fac.montantPaye}</td>
                  <td className="py-2.5 px-4">
                    <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                      fac.statut === 'paye' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-800'
                    }`}>
                      {fac.statut}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => alert(`Downloading official quittance receipt for invoice ${fac.numeroFacture}`)}
                      className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer ml-auto"
                    >
                      <Download className="w-3.5 h-3.5" /> PDF Quittance
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
