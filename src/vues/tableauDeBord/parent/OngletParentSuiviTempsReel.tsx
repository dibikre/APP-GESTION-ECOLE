import React, { useState } from 'react';
import {
  Activity,
  MapPin,
  Clock,
  Bus,
  CheckCircle,
  UserCheck,
  Radio,
  BookOpen,
  Calendar,
  AlertCircle,
  BellRing,
  Navigation,
} from 'lucide-react';
import { CarteStatistique } from '../../../composants/communs/CarteStatistique';

export const OngletParentSuiviTempsReel: React.FC = () => {
  const [enfantActif, setEnfantActif] = useState<'marcus' | 'sophie'>('marcus');

  return (
    <div className="space-y-6">
      {/* En-tête avec signal Live */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Activity className="w-6 h-6 text-red-600" />
              Suivi Scolaire & Présence en Temps Réel
            </h2>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-red-100 text-red-700 animate-pulse">
              <Radio className="w-3 h-3 text-red-600" />
              Direct Live
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Localisation sur le campus, statut du cours en cours, pointage du badge et suivi GPS du bus de ramassage.
          </p>
        </div>

        {/* Sélecteur enfant */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <button
            type="button"
            onClick={() => setEnfantActif('marcus')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              enfantActif === 'marcus' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Marcus (1ère C)
          </button>
          <button
            type="button"
            onClick={() => setEnfantActif('sophie')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              enfantActif === 'sophie' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sophie (6ème A)
          </button>
        </div>
      </div>

      {/* Cartes KPI Temps Réel */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CarteStatistique
          titre="Statut de Présence Actuel"
          valeur="Présent(e) en cours"
          sousTitre={`Badgé à 07h45 au portail principal`}
          icone={CheckCircle}
          identifiant="kpi-presence-direct"
        />
        <CarteStatistique
          titre="Cours en Cours (14h00 - 15h30)"
          valeur={enfantActif === 'marcus' ? 'Physique-Chimie (TP)' : 'Français & Grammaire'}
          sousTitre={enfantActif === 'marcus' ? 'Dr. Robert Chen • Labo 204' : 'Sarah Jenkins • Salle 102'}
          icone={BookOpen}
          identifiant="kpi-cours-direct"
        />
        <CarteStatistique
          titre="Prochain Cours"
          valeur={enfantActif === 'marcus' ? 'Mathématiques (15h30)' : 'Histoire-Géo (15h30)'}
          sousTitre="Fin des cours prévue à 16h30"
          icone={Clock}
          identifiant="kpi-prochain-cours"
        />
      </div>

      {/* Grille : Chronologie du Campus & Position du Bus */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne 1 & 2 : Chronologie de la journée de l'élève */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-red-600" />
              <h3 className="text-sm font-black text-slate-900">
                Déroulement de la Journée &bull; {enfantActif === 'marcus' ? 'Marcus (1ère C)' : 'Sophie (6ème A)'}
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-500">Vendredi 20 Février 2026</span>
          </div>

          <div className="space-y-3 text-xs">
            {enfantActif === 'marcus' ? (
              <>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="font-bold text-slate-900">07h45 &bull; Entrée Portail Principal</span>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-bold">Badge Scanné OK</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="font-bold text-slate-900">08h00 - 10h00 &bull; Mathématiques Spécialité</span>
                  </div>
                  <span className="text-[11px] text-slate-600">Prof. Evelyn Reed &bull; Salle 104</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="font-bold text-slate-900">12h00 - 13h15 &bull; Déjeuner Cantine Scolaire</span>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-bold">Repas enregistré (Menu du jour)</span>
                </div>

                <div className="p-3 bg-red-50/80 border border-red-200 rounded-xl flex items-center justify-between shadow-2xs">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                    <span className="font-black text-slate-900">14h00 - 15h30 &bull; Physique-Chimie (Travaux Pratiques)</span>
                  </div>
                  <span className="text-[11px] font-black text-red-700">EN COURS ACTUELLEMENT (Labo 204)</span>
                </div>

                <div className="p-3 bg-slate-50/60 rounded-xl border border-slate-200/80 flex items-center justify-between opacity-70">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                    <span className="font-medium text-slate-700">15h30 - 16h30 &bull; Philosophie & Culture</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-semibold">À venir &bull; Salle 108</span>
                </div>
              </>
            ) : (
              <>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="font-bold text-slate-900">07h45 &bull; Entrée Collège</span>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-bold">Badge Scanné OK</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="font-bold text-slate-900">08h00 - 10h00 &bull; Anglais LV1 Bilingue</span>
                  </div>
                  <span className="text-[11px] text-slate-600">Mrs. Taylor &bull; Salle 22</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="font-bold text-slate-900">12h00 - 13h15 &bull; Déjeuner Cantine Scolaire</span>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-bold">Plateau sans allergènes servi</span>
                </div>

                <div className="p-3 bg-red-50/80 border border-red-200 rounded-xl flex items-center justify-between shadow-2xs">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                    <span className="font-black text-slate-900">14h00 - 15h30 &bull; Français & Dictée Préparée</span>
                  </div>
                  <span className="text-[11px] font-black text-red-700">EN COURS ACTUELLEMENT (Salle 102)</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Colonne 3 : Suivi GPS Bus de Ramassage du Soir */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Bus className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-black text-slate-900">Navette Bus Soir &bull; Ligne 4</h3>
            </div>
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800">
              GPS Actif
            </span>
          </div>

          <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-blue-700">Arrivée estimée à votre arrêt</span>
              <span className="text-base font-black text-blue-900">17:15</span>
            </div>
            <p className="text-[11px] text-blue-800 font-medium">
              Arrêt n°3 : <strong>Les Tilleuls (Avenue Victor Hugo)</strong>
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Détails du véhicule :</span>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">Autocar Mercedes Intouro</span>
                <span className="font-mono text-slate-600">AA-784-ZZ</span>
              </div>
              <p className="text-[11px] text-slate-500">Chauffeur : M. Paul Kouassi (+33 1 80 00 44 55)</p>
            </div>
          </div>

          <div className="p-3 bg-slate-100 rounded-xl flex items-center gap-2 text-[11px] text-slate-600">
            <Navigation className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Le bus partira du campus scolaire à 16h50 précises.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
