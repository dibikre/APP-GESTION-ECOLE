import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DollarSign,
  CreditCard,
  AlertTriangle,
  TrendingUp,
  Receipt,
  PlusCircle,
  ArrowUpRight,
  ArrowDownLeft,
} from 'lucide-react';
import { CarteStatistique } from '../../composants/communs/CarteStatistique';
import { BoutonRouge } from '../../composants/communs/BoutonRouge';
import { utiliserAcademie } from '../../controleurs/contexteAcademie';
import { CHEMINS_APPLICATION } from '../../routes/cheminsApplication';

export const TableauDeBordComptable: React.FC = () => {
  const {
    listeFactures,
    listeTransactions,
    traduire,
  } = utiliserAcademie();

  const naviguer = useNavigate();

  const totalFacture = listeFactures.reduce((cumul, f) => cumul + f.montantTotal, 0);
  const totalEncaisse = listeFactures.reduce((cumul, f) => cumul + f.montantPaye, 0);
  const totalImpayes = totalFacture - totalEncaisse;
  const facturesEnRetard = listeFactures.filter((f) => f.statut !== 'paye');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase bg-emerald-700 text-white">
              {traduire('role_comptable')}
            </span>
            <span className="text-xs text-slate-500 font-medium">David Hawthorne &bull; Bursar & Treasury Office</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            Financial & Bursar Overview
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Monitor tuition collection rates, track operational disbursements, and audit accounts.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <BoutonRouge
            texte={traduire('enregistrerTransaction')}
            icone={TrendingUp}
            variante="secondaire"
            onClick={() => naviguer(CHEMINS_APPLICATION.COMPTABILITE)}
          />
          <BoutonRouge
            texte={traduire('genererFacture')}
            icone={PlusCircle}
            onClick={() => naviguer(CHEMINS_APPLICATION.COMPTABILITE)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CarteStatistique
          titre={traduire('totalFacture')}
          valeur={`$${totalFacture.toLocaleString()}`}
          sousTitre="Term 2 Tuition & Fees"
          icone={DollarSign}
          identifiant="compta-carte-total"
        />
        <CarteStatistique
          titre={traduire('recettesEncaissees')}
          valeur={`$${totalEncaisse.toLocaleString()}`}
          sousTitre="Verified bank receipts"
          icone={CreditCard}
          variation={{ texte: "+15.4%", positive: true }}
          identifiant="compta-carte-recettes"
        />
        <CarteStatistique
          titre={traduire('impayesRestants')}
          valeur={`$${totalImpayes.toLocaleString()}`}
          sousTitre={`${facturesEnRetard.length} pending student invoices`}
          icone={AlertTriangle}
          identifiant="compta-carte-impayes"
        />
        <CarteStatistique
          titre={traduire('tauxPaiement')}
          valeur={`${Math.round((totalEncaisse / totalFacture) * 100)}%`}
          sousTitre="Receivable collection metric"
          icone={TrendingUp}
          variation={{ texte: "Target 85%", positive: true }}
          identifiant="compta-carte-taux"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">{traduire('facturesImpayees')}</h2>
              <p className="text-xs text-slate-500">Student accounts requiring collection or reminders</p>
            </div>
            <BoutonRouge
              texte="View All Invoices"
              variante="secondaire"
              taille="petit"
              onClick={() => naviguer(CHEMINS_APPLICATION.COMPTABILITE)}
            />
          </div>

          <div className="divide-y divide-slate-100 mt-2">
            {facturesEnRetard.map((facture) => (
              <div key={facture.identifiant} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold text-xs shrink-0">
                    <Receipt className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{facture.nomEleve}</h3>
                    <p className="text-xs text-slate-500">
                      {facture.numeroFacture} &bull; {facture.classe} &bull; Due {facture.dateEcheance}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-red-600 block">
                    ${facture.montantTotal - facture.montantPaye} Outstanding
                  </span>
                  <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                    {facture.statut}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">{traduire('dernieresTransactions')}</h2>
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                Ledger
              </span>
            </div>

            <div className="space-y-3 mt-3">
              {listeTransactions.slice(0, 3).map((txn) => (
                <div key={txn.identifiant} className="p-3 rounded-lg border border-slate-100 bg-slate-50/70 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                      {txn.type === 'revenu' ? (
                        <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <ArrowUpRight className="w-3.5 h-3.5 text-red-600" />
                      )}
                      {txn.reference}
                    </span>
                    <span className={`font-extrabold ${txn.type === 'revenu' ? 'text-emerald-700' : 'text-slate-900'}`}>
                      {txn.type === 'revenu' ? '+' : '-'}${txn.montant.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">{txn.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <BoutonRouge
              texte="Audit Ledger Desk"
              variante="secondaire"
              largeurTotale
              onClick={() => naviguer(CHEMINS_APPLICATION.COMPTABILITE)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
