import React from 'react';
import {
  UserPlus,
  Users,
  CreditCard,
  FileCheck,
} from 'lucide-react';
import { CarteStatistique } from '../../../composants/communs/CarteStatistique';
import { utiliserAcademie } from '../../../controleurs/contexteAcademie';

export const OngletSecretaireVueGlobale: React.FC = () => {
  const { listeEleves, listeFactures, listeDemandesDocs, formaterDevise } = utiliserAcademie();

  const totalFacture = listeFactures.reduce((s, f) => s + f.montantTotal, 0);
  const totalEncaisse = listeFactures.reduce((s, f) => s + f.montantPaye, 0);
  const tauxEncaissement = totalFacture > 0 ? Math.round((totalEncaisse / totalFacture) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Indicateurs Clés Secrétariat */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CarteStatistique
          titre="Nouvelles Inscriptions"
          valeur="24"
          sousTitre="4 dossiers en cours d'examen"
          icone={UserPlus}
          variation={{ texte: "+12.5%", positive: true }}
          identifiant="sec-kpi-inscriptions"
        />
        <CarteStatistique
          titre="Registre des Élèves"
          valeur={listeEleves.length}
          sousTitre="Effectif total scolarisé"
          icone={Users}
          identifiant="sec-kpi-eleves"
        />
        <CarteStatistique
          titre="Taux de Recouvrement"
          valeur={`${tauxEncaissement}%`}
          sousTitre={`${formaterDevise(totalEncaisse)} encaissés`}
          icone={CreditCard}
          identifiant="sec-kpi-finances"
        />
        <CarteStatistique
          titre="Demandes de Documents"
          valeur={listeDemandesDocs.filter((d) => d.statut === 'en_attente').length}
          sousTitre="Certificats & Relevés"
          icone={FileCheck}
          identifiant="sec-kpi-docs"
        />
      </div>

      {/* Activités du jour */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h4 className="text-sm font-bold text-slate-900">Activité Administrative & Inscriptions du Jour</h4>
            <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">Trimestre en cours</span>
          </div>

          <div className="space-y-3 mt-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">Validation des Dossiers d'Entrée en 1ère S1</span>
                <p className="text-[11px] text-slate-500">Actes de naissance et carnets de vaccination vérifiés.</p>
              </div>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px] uppercase">
                Validé
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">Édition des Feuilles d'Émargement d'Examens</span>
                <p className="text-[11px] text-slate-500">Génération des listes officielles pour les surveillants d'épreuves.</p>
              </div>
              <span className="font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded text-[10px] uppercase">
                Planifié
              </span>
            </div>
          </div>
        </div>

        {/* File d'attente des attestations */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="text-sm font-bold text-slate-900">Demandes de Certificats</h4>
              <span className="text-xs font-bold text-slate-500">{listeDemandesDocs.length} Demandes</span>
            </div>
            <div className="space-y-2.5 mt-3 text-xs">
              {listeDemandesDocs.map((d) => (
                <div key={d.identifiant} className="p-2 bg-slate-50 rounded border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900">{d.demandeurNom}</span>
                    <span className="text-[10px] text-slate-500 block">{d.typeDocument.replace('_', ' ')}</span>
                  </div>
                  <span className={`font-bold text-[10px] uppercase ${d.statut === 'pret' ? 'text-emerald-700' : 'text-amber-600'}`}>
                    {d.statut === 'pret' ? 'Prêt' : 'En cours'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

