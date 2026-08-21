import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Award,
  CalendarCheck,
  BookOpen,
  AlertCircle,
  Megaphone,
  CreditCard,
  Clock,
  ChevronRight,
  Send,
  FileCheck,
  ArrowUpRight,
  CheckCircle2,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { CarteStatistique } from '../../../composants/communs/CarteStatistique';
import { utiliserAcademie } from '../../../controleurs/contexteAcademie';
import {
  COMPTE_CANTINE_INITIAL,
  MESSAGES_ADMINISTRATION_INITIAUX,
  MESSAGES_CHAT_PROFESSEURS_INITIAUX,
  EVENEMENTS_CALENDRIER_SCOLAIRE,
} from '../../../modeles/donneesInitiales/donneesEleveEtendu';

export const OngletEleveVueGlobale: React.FC = () => {
  const { listeNotes, listeAnnonces, listeDevoirs, formaterMontant } = utiliserAcademie();
  const navigate = useNavigate();

  const notesFiltrees = listeNotes.slice(0, 4);
  const prochainsEvenements = EVENEMENTS_CALENDRIER_SCOLAIRE.slice(0, 3);
  const messagesNonLus = MESSAGES_CHAT_PROFESSEURS_INITIAUX.filter((m) => !m.lu).length;

  return (
    <div className="space-y-6">
      {/* Bannière de Bienvenue Élève */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-slate-900 rounded-2xl p-6 text-white shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-white text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Espace Scolaire Élève &bull; Année Académique 2025-2026
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Bonjour, Marcus Vance 👋
            </h2>
            <p className="text-xs text-red-100 max-w-xl">
              Classe de <strong>1ère C (Spécialités Scientifiques)</strong> &bull; Délégué de classe &bull; Prochain cours à 14h00 : <em>Mathématiques Approfondies (Salle B-204)</em>.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => navigate('/tableau-de-bord/eleve/cours')}
              className="px-3.5 py-2 bg-white text-red-700 hover:bg-red-50 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              Emploi du temps
            </button>
            <button
              onClick={() => navigate('/tableau-de-bord/eleve/communication')}
              className="px-3.5 py-2 bg-red-800/80 hover:bg-red-800 text-white border border-red-500/40 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              Écrire à un professeur
            </button>
          </div>
        </div>
      </div>

      {/* Indicateurs Clés Élève */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CarteStatistique
          titre="Moyenne Générale (T2)"
          valeur="17.4 / 20"
          sousTitre="Rang : 2e / 28 élèves"
          icone={Award}
          variation={{ texte: "+0.8 pt ce trimestre", positive: true }}
          identifiant="eleve-kpi-gpa"
        />
        <CarteStatistique
          titre="Taux d'Assiduité"
          valeur="98.5%"
          sousTitre="0 absence injustifiée"
          icone={CalendarCheck}
          identifiant="eleve-kpi-presence"
        />
        <CarteStatistique
          titre="Solde Badge Cantine"
          valeur={formaterMontant(COMPTE_CANTINE_INITIAL.soldeActuel)}
          sousTitre={`${COMPTE_CANTINE_INITIAL.forfaitRestant} repas restants`}
          icone={CreditCard}
          identifiant="eleve-kpi-cantine"
        />
        <CarteStatistique
          titre="Devoirs & Travaux"
          valeur={listeDevoirs.length}
          sousTitre="2 à rendre sous 48h"
          icone={AlertCircle}
          identifiant="eleve-kpi-devoirs"
        />
      </div>

      {/* Planning d'Aujourd'hui & Actions Rapides */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Emploi du Temps du Jour */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-red-600" />
                <h3 className="text-sm font-bold text-slate-900">Cours du Jour (Lundi)</h3>
              </div>
              <button
                onClick={() => navigate('/tableau-de-bord/eleve/cours')}
                className="text-xs text-red-600 font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                Planning complet
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <div className="p-3 bg-red-50/50 border border-red-200/80 rounded-xl flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-12 text-center">
                    <span className="text-xs font-black text-red-700 block">08:00</span>
                    <span className="text-[10px] text-red-600">09:30</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">Mathématiques Approfondies</span>
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">Terminé</span>
                    </div>
                    <p className="text-[11px] text-slate-500">Prof. Evelyn Reed &bull; Salle B-204 &bull; Calcul Intégral & Développements Limités</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-700">1h30</span>
              </div>

              <div className="p-3 bg-red-50/50 border border-red-200/80 rounded-xl flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-12 text-center">
                    <span className="text-xs font-black text-red-700 block">10:00</span>
                    <span className="text-[10px] text-red-600">12:00</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">Physique-Chimie (Séance TP)</span>
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">Terminé</span>
                    </div>
                    <p className="text-[11px] text-slate-500">Dr. Robert Chen &bull; Labo Sciences L-102 &bull; Interférences & Diffraction</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-700">2h00</span>
              </div>

              <div className="p-3 bg-white border-2 border-red-500 rounded-xl flex items-center justify-between shadow-xs">
                <div className="flex items-start gap-3">
                  <div className="w-12 text-center">
                    <span className="text-xs font-black text-red-600 block">14:00</span>
                    <span className="text-[10px] text-slate-500">15:30</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">Littérature & Français</span>
                      <span className="text-[10px] font-bold bg-red-600 text-white px-2 py-0.5 rounded-full animate-pulse">En cours</span>
                    </div>
                    <p className="text-[11px] text-slate-600">Sarah Jenkins &bull; Salle A-108 &bull; Étude Linéaire : Les Fleurs du Mal</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-red-600">Prochain</span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between opacity-80">
                <div className="flex items-start gap-3">
                  <div className="w-12 text-center">
                    <span className="text-xs font-bold text-slate-700 block">16:00</span>
                    <span className="text-[10px] text-slate-500">17:00</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900">Histoire-Géographie & ECM</span>
                    <p className="text-[11px] text-slate-500">M. Jean-Paul Durand &bull; Salle C-301 &bull; Géopolitique Mondiale</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-500">1h00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Messages & Actions Prioritaires */}
        <div className="space-y-4">
          {/* Messages de l'administration */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Megaphone className="w-4 h-4 text-red-600" />
                Messages Officiels
              </h3>
              <button
                onClick={() => navigate('/tableau-de-bord/eleve/communication')}
                className="text-[11px] text-red-600 font-bold hover:underline cursor-pointer"
              >
                Voir tout
              </button>
            </div>
            <div className="mt-3 space-y-2.5">
              {MESSAGES_ADMINISTRATION_INITIAUX.slice(0, 2).map((adm) => (
                <div key={adm.identifiant} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-bold text-slate-900 line-clamp-1">{adm.titre}</span>
                    <span className="text-[10px] font-bold text-red-600 uppercase shrink-0">{adm.expediteurService}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">{adm.contenu}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Raccourcis Rapides */}
          <div className="bg-slate-900 text-white rounded-xl p-5 shadow-xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Raccourcis rapides</h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => navigate('/tableau-de-bord/eleve/notes')}
                className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-left transition-colors cursor-pointer"
              >
                <Award className="w-4 h-4 text-amber-400 mb-1" />
                <span className="text-xs font-bold block text-white">Mes Copies</span>
                <span className="text-[10px] text-slate-400">Corrections d'examens</span>
              </button>
              <button
                onClick={() => navigate('/tableau-de-bord/eleve/vie-scolaire')}
                className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-left transition-colors cursor-pointer"
              >
                <FileCheck className="w-4 h-4 text-emerald-400 mb-1" />
                <span className="text-xs font-bold block text-white">Justificatifs</span>
                <span className="text-[10px] text-slate-400">Déposer un motif</span>
              </button>
              <button
                onClick={() => navigate('/tableau-de-bord/eleve/ressources')}
                className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-left transition-colors cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-sky-400 mb-1" />
                <span className="text-xs font-bold block text-white">E-Books</span>
                <span className="text-[10px] text-slate-400">Bibliothèque en ligne</span>
              </button>
              <button
                onClick={() => navigate('/tableau-de-bord/eleve/communication')}
                className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-left transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4 text-red-400 mb-1" />
                <span className="text-xs font-bold block text-white">Forum 1ère C</span>
                <span className="text-[10px] text-slate-400">Entraide & révisions</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dernières Évaluations & Calendrier Scolaire Global */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dernières Notes */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Dernières Évaluations Publiées</h3>
              <p className="text-xs text-slate-500">Notes récentes, barèmes et appréciations des professeurs</p>
            </div>
            <button
              onClick={() => navigate('/tableau-de-bord/eleve/notes')}
              className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
              Relevé complet & analyses
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {notesFiltrees.map((n) => {
              const note20 = (n.noteObtenue / n.noteMaximale) * 20;
              return (
                <div key={n.identifiant} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{n.matiere}</span>
                      <span className="text-[10px] font-semibold text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200">{n.dateEvaluation}</span>
                    </div>
                    <p className="text-[11px] text-slate-600">{n.titreEvaluation}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-red-600 text-sm block">
                      {note20.toFixed(1)} / 20
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 flex items-center justify-end gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {note20 >= 16 ? 'Très Bien' : note20 >= 14 ? 'Bien' : 'Satisfaisant'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Événements & Calendrier */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-red-600" />
                Calendrier Scolaire
              </h3>
              <button
                onClick={() => navigate('/tableau-de-bord/eleve/cours')}
                className="text-xs text-red-600 font-bold hover:underline cursor-pointer"
              >
                Voir calendrier
              </button>
            </div>

            <div className="space-y-3 mt-3">
              {prochainsEvenements.map((ev) => (
                <div key={ev.identifiant} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{ev.titre}</span>
                    <span className="text-[10px] font-bold text-slate-500">{ev.dateDebut}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">{ev.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-slate-100 text-center">
            <span className="text-[11px] text-slate-500">
              Zone Académique C &bull; Trimestre 2 en cours
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
