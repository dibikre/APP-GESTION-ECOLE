import React from 'react';
import {
  GraduationCap,
  Users,
  Award,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Calendar,
  ArrowUpRight,
  ShieldAlert,
} from 'lucide-react';
import { CarteStatistique } from '../../../composants/communs/CarteStatistique';
import { utiliserAcademie } from '../../../controleurs/contexteAcademie';

export const OngletVueGlobale: React.FC = () => {
  const {
    listeEleves,
    listeProfesseurs,
    listeFactures,
    listeTransactions,
    listeIncidents,
    traduire,
    formaterMontant,
  } = utiliserAcademie();

  const totalFacture = listeFactures.reduce((s, f) => s + f.montantTotal, 0);
  const totalEncaisse = listeFactures.reduce((s, f) => s + f.montantPaye, 0);
  const totalDepenses = listeTransactions
    .filter((t) => t.type === 'depense')
    .reduce((s, t) => s + t.montant, 0);
  const soldeCaisse = totalEncaisse - totalDepenses;
  const tauxPaiement = totalFacture > 0 ? Math.round((totalEncaisse / totalFacture) * 100) : 0;
  const ratioEleveProf = listeProfesseurs.length > 0 ? (listeEleves.length / listeProfesseurs.length).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      {/* KPIs Institutionnels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CarteStatistique
          titre="Enrolled Students"
          valeur={listeEleves.length}
          sousTitre="Active across 4 cohorts"
          icone={GraduationCap}
          variation={{ texte: "+8.4%", positive: true }}
          identifiant="dir-kpi-eleves"
        />
        <CarteStatistique
          titre="Attendance Rate"
          valeur="96.4%"
          sousTitre="Daily campus attendance"
          icone={Users}
          variation={{ texte: "+0.8%", positive: true }}
          identifiant="dir-kpi-presence"
        />
        <CarteStatistique
          titre="Academic Average"
          valeur="85.2 / 100"
          sousTitre="Institution-wide GPA"
          icone={Award}
          variation={{ texte: "+1.9%", positive: true }}
          identifiant="dir-kpi-gpa"
        />
        <CarteStatistique
          titre="Student / Teacher Ratio"
          valeur={`${ratioEleveProf} : 1`}
          sousTitre={`${listeProfesseurs.length} Faculty members`}
          icone={TrendingUp}
          identifiant="dir-kpi-ratio"
        />
      </div>

      {/* Indicateurs Financiers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-xs font-semibold text-slate-500 block">Total Invoiced Revenue</span>
          <span className="text-xl font-bold text-slate-900 mt-1 block">{formaterMontant(totalFacture)}</span>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Academic Year 2025-2026</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-xs font-semibold text-slate-500 block">Collected Cash Receipts</span>
          <span className="text-xl font-bold text-emerald-700 mt-1 block">{formaterMontant(totalEncaisse)}</span>
          <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 block">{tauxPaiement}% collection rate</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-xs font-semibold text-slate-500 block">Operating Disbursements</span>
          <span className="text-xl font-bold text-red-600 mt-1 block">{formaterMontant(totalDepenses)}</span>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Payroll & maintenance</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-xs font-semibold text-slate-500 block">Net Treasury Balance</span>
          <span className="text-xl font-bold text-slate-900 mt-1 block">{formaterMontant(soldeCaisse)}</span>
          <span className="text-[11px] text-emerald-600 font-bold mt-0.5 block">Healthy cashflow</span>
        </div>
      </div>

      {/* Graphiques et Alertes Critiques */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Academic Cohort Performance & Attendance</h3>
              <p className="text-xs text-slate-500">Comparative grade average and presence rate</p>
            </div>
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">Term 2</span>
          </div>

          <div className="mt-4 space-y-3">
            {[
              { classe: '6e A', cycle: 'Collège', effectif: 30, moyenne: 90.2, presence: 99.0 },
              { classe: '3e A', cycle: 'Collège (Brevet)', effectif: 28, moyenne: 94.6, presence: 97.8 },
              { classe: '2nde A', cycle: 'Lycée', effectif: 28, moyenne: 79.1, presence: 91.0 },
              { classe: '1ère C', cycle: 'Lycée (Maths)', effectif: 26, moyenne: 88.5, presence: 96.2 },
              { classe: 'Tle C', cycle: 'Lycée (Bac)', effectif: 24, moyenne: 95.8, presence: 99.1 },
            ].map((c) => (
              <div key={c.classe} className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 block">{c.classe} <span className="text-[10px] font-normal text-slate-500">({c.cycle})</span></span>
                  <span className="text-[11px] text-slate-500">{c.effectif} Enrolled students</span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-slate-500 text-[10px] uppercase font-bold block">Average</span>
                    <span className="font-extrabold text-slate-900 text-xs">{c.moyenne}%</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500 text-[10px] uppercase font-bold block">Attendance</span>
                    <span className="font-extrabold text-emerald-700 text-xs">{c.presence}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alertes Critiques */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-red-600" />
                Critical Institutional Alerts
              </h3>
              <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-red-100 text-red-700">
                Action Req.
              </span>
            </div>

            <div className="space-y-3 mt-3">
              {listeIncidents.map((inc) => (
                <div key={inc.identifiant} className="p-2.5 rounded-lg border border-red-100 bg-red-50/50 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{inc.nomEleve} ({inc.classe})</span>
                    <span className="text-[10px] font-bold text-red-700 uppercase">{inc.gravite}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">{inc.description}</p>
                </div>
              ))}
              <div className="p-2.5 rounded-lg border border-amber-100 bg-amber-50/50 text-xs">
                <span className="font-bold text-slate-900 block">3 Overdue Tuition Accounts</span>
                <p className="text-[11px] text-slate-600 mt-0.5">$3,300 total pending payment for Term 2.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
