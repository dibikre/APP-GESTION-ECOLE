import React from 'react';
import {
  UserPlus,
  Users,
  CalendarCheck,
  CreditCard,
  Clock,
  FileCheck,
} from '../../../composants/communs/IconesAcademie';
import { CarteStatistique } from '../../../composants/communs/CarteStatistique';
import { utiliserAcademie } from '../../../controleurs/contexteAcademie';

export const OngletSecretaireVueGlobale: React.FC = () => {
  const { listeEleves, listeFactures, listeDemandesDocs, traduire } = utiliserAcademie();

  const totalFacture = listeFactures.reduce((s, f) => s + f.montantTotal, 0);
  const totalEncaisse = listeFactures.reduce((s, f) => s + f.montantPaye, 0);
  const tauxEncaissement = totalFacture > 0 ? Math.round((totalEncaisse / totalFacture) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Administrative KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CarteStatistique
          titre={traduire('kpiDossiersInscrits')}
          valeur="24"
          sousTitre={traduire('kpiDossiersInscritsSousTitre')}
          icone={UserPlus}
          variation={{ texte: "+12.5%", positive: true }}
          identifiant="sec-kpi-inscriptions"
        />
        <CarteStatistique
          titre={traduire('kpiElevesInscrits')}
          valeur={listeEleves.length}
          sousTitre={traduire('kpiTauxPresenceGlobaleSousTitre')}
          icone={Users}
          identifiant="sec-kpi-eleves"
        />
        <CarteStatistique
          titre={traduire('indicateurRecouvrement')}
          valeur={`${tauxEncaissement}%`}
          sousTitre={`$${totalEncaisse.toLocaleString()} ${traduire('recettesEncaisses')}`}
          icone={CreditCard}
          identifiant="sec-kpi-finances"
        />
        <CarteStatistique
          titre={traduire('kpiDemandesDocs')}
          valeur={listeDemandesDocs.filter((d) => d.statut === 'en_attente').length}
          sousTitre={traduire('kpiDemandesDocsSousTitre')}
          icone={FileCheck}
          identifiant="sec-kpi-docs"
        />
      </div>

      {/* Quick Administrative Tasks & Student Roster Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h4 className="text-sm font-bold text-slate-900">{traduire('dernieresInscriptions')}</h4>
            <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">{traduire('anneeAcademiqueLibelle')}</span>
          </div>

          <div className="space-y-3 mt-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">Grade 11 Admissions Dossier Validation</span>
                <p className="text-[11px] text-slate-500">Birth certificate and medical vaccination records verified.</p>
              </div>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px] uppercase">
                Completed
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">Class Roster Printing for Term Examinations</span>
                <p className="text-[11px] text-slate-500">Generate signed proctor attendance sheets for Science tracks.</p>
              </div>
              <span className="font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded text-[10px] uppercase">
                Scheduled
              </span>
            </div>
          </div>
        </div>

        {/* Certificate Pending Queue */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="text-sm font-bold text-slate-900">{traduire('guichetDemandes')}</h4>
              <span className="text-xs font-bold text-slate-500">{listeDemandesDocs.length} {traduire('dossiersAValider')}</span>
            </div>
            <div className="space-y-2.5 mt-3 text-xs">
              {listeDemandesDocs.map((d) => (
                <div key={d.identifiant} className="p-2 bg-slate-50 rounded border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900">{d.demandeurNom}</span>
                    <span className="text-[10px] text-slate-500 block">{d.typeDocument.replace('_', ' ')}</span>
                  </div>
                  <span className="font-bold text-[10px] uppercase text-red-600">{d.statut}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
