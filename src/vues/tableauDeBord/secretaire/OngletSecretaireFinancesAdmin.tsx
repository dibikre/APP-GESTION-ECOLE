import React, { useState } from 'react';
import {
  CreditCard,
  DollarSign,
  Plus,
  Send,
  UploadCloud,
  CheckCircle,
} from 'lucide-react';
import { BoutonRouge } from '../../../composants/communs/BoutonRouge';
import { utiliserAcademie } from '../../../controleurs/contexteAcademie';

export const OngletSecretaireFinancesAdmin: React.FC = () => {
  const { listeFactures, ajouterFacture, listeEleves } = utiliserAcademie();

  const [formulaireFacture, setFormulaireFacture] = useState(false);
  const [eleveSelectionne, setEleveSelectionne] = useState(listeEleves[0]?.nomComplet || '');
  const [montant, setMontant] = useState(4200);
  const [typeFrais, setTypeFrais] = useState<'scolarite' | 'cantine' | 'transport' | 'uniforme' | 'activite'>('scolarite');

  const creerFacture = (e: React.FormEvent) => {
    e.preventDefault();
    const eleve = listeEleves.find((el) => el.nomComplet === eleveSelectionne) || listeEleves[0];
    ajouterFacture({
      identifiantEleve: eleve.identifiant,
      nomEleve: eleve.nomComplet,
      classe: eleve.classe,
      montantTotal: montant,
      montantPaye: 0,
      dateEmission: new Date().toISOString().split('T')[0],
      dateEcheance: '2026-03-31',
      statut: 'en_attente',
      typePaiement: typeFrais,
    });
    setFormulaireFacture(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Administrative Billing & Tuition Collection</h3>
          <p className="text-xs text-slate-500">Issue student tuition invoices, monitor pending balances, and dispatch payment reminders.</p>
        </div>
        <div className="flex items-center gap-2">
          <BoutonRouge
            texte="Send Payment Reminders"
            variante="secondaire"
            icone={Send}
            onClick={() => alert('Automated SMS & Email payment reminders dispatched to all overdue accounts!')}
          />
          <BoutonRouge
            texte="Issue New Invoice"
            icone={Plus}
            onClick={() => setFormulaireFacture(!formulaireFacture)}
          />
        </div>
      </div>

      {formulaireFacture && (
        <form onSubmit={creerFacture} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <h4 className="text-sm font-bold text-slate-900">Generate Student Tuition / Auxiliary Invoice</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block">Select Enrolled Student</label>
              <select
                value={eleveSelectionne}
                onChange={(e) => setEleveSelectionne(e.target.value)}
                className="w-full mt-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
              >
                {listeEleves.map((el) => (
                  <option key={el.identifiant} value={el.nomComplet}>
                    {el.nomComplet} ({el.classe})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block">Fee Category</label>
              <select
                value={typeFrais}
                onChange={(e) => setTypeFrais(e.target.value as any)}
                className="w-full mt-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
              >
                <option value="scolarite">Tuition Fee (Scolarité)</option>
                <option value="cantine">Cafeteria & Lunch Plan</option>
                <option value="transport">School Bus Transport</option>
                <option value="uniforme">Uniforms & Athletic Kit</option>
                <option value="activite">Extracurricular Activity</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block">Invoice Total ($)</label>
              <input
                type="number"
                value={montant}
                onChange={(e) => setMontant(Number(e.target.value))}
                className="w-full mt-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <BoutonRouge texte="Cancel" variante="secondaire" taille="petit" onClick={() => setFormulaireFacture(false)} />
            <BoutonRouge texte="Commit Invoice" taille="petit" type="submit" />
          </div>
        </form>
      )}

      {/* Invoice Ledger Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <span className="text-sm font-bold text-slate-900">Student Billing Ledger ({listeFactures.length})</span>
          <span className="text-xs font-bold text-slate-600">Active Academic Invoices</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Invoice #</th>
                <th className="py-2.5 px-4">Student & Cohort</th>
                <th className="py-2.5 px-4">Fee Category</th>
                <th className="py-2.5 px-4">Total Amount</th>
                <th className="py-2.5 px-4">Settled Amount</th>
                <th className="py-2.5 px-4 text-right">Payment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {listeFactures.map((fac) => (
                <tr key={fac.identifiant} className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-4 font-mono font-bold text-slate-900">{fac.numeroFacture}</td>
                  <td className="py-2.5 px-4 font-bold text-slate-900">{fac.nomEleve} ({fac.classe})</td>
                  <td className="py-2.5 px-4 text-slate-700 capitalize">{fac.typePaiement}</td>
                  <td className="py-2.5 px-4 font-extrabold text-slate-900">${fac.montantTotal}</td>
                  <td className="py-2.5 px-4 text-emerald-700 font-bold">${fac.montantPaye}</td>
                  <td className="py-2.5 px-4 text-right">
                    <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                      fac.statut === 'paye' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
                    }`}>
                      {fac.statut}
                    </span>
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
