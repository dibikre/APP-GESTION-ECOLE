import React, { useState } from 'react';
import {
  Users,
  Award,
  CalendarCheck,
  CreditCard,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Clock,
  BookOpen,
  Utensils,
  Bus,
  FileText,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CarteStatistique } from '../../../composants/communs/CarteStatistique';
import { BoutonRouge } from '../../../composants/communs/BoutonRouge';
import { utiliserAcademie } from '../../../controleurs/contexteAcademie';
import { CHEMINS_APPLICATION } from '../../../routes/cheminsApplication';

export interface EnfantFratrie {
  id: string;
  nom: string;
  prenom: string;
  classe: string;
  cycle: 'Lycée' | 'Collège' | 'Primaire';
  matricule: string;
  photoInitiales: string;
  couleurAvatar: string;
  moyenneGenerale: string;
  rangClasse: string;
  tauxPresence: string;
  professeurPrincipal: string;
  soldeCantine: number;
  statutFinancier: 'a_jour' | 'echeance_proche' | 'retard';
  derniereNote: { matiere: string; note: string; date: string };
  prochainDevoir: { matiere: string; titre: string; date: string };
  ligneBus: string;
  alertesActives: number;
}

export const ENFANTS_FRATRIE: EnfantFratrie[] = [
  {
    id: 'el-1',
    nom: 'Vance',
    prenom: 'Marcus',
    classe: '1ère C (Scientifique)',
    cycle: 'Lycée',
    matricule: 'STU-2026-003',
    photoInitiales: 'MV',
    couleurAvatar: 'bg-red-100 text-red-700 border-red-200',
    moyenneGenerale: '17.4 / 20 (91.4%)',
    rangClasse: '2e / 34 élèves',
    tauxPresence: '98.5%',
    professeurPrincipal: 'Prof. Evelyn Reed (Mathématiques)',
    soldeCantine: 45.0,
    statutFinancier: 'a_jour',
    derniereNote: { matiere: 'Physique-Chimie', note: '18.5 / 20', date: 'Hier' },
    prochainDevoir: { matiere: 'Mathématiques', titre: 'Devoir Maison n°4 - Suites récurrentes', date: 'Ven 27 Fév' },
    ligneBus: 'Ligne 4 - Arrêt Les Tilleuls (07h25)',
    alertesActives: 0,
  },
  {
    id: 'el-18',
    nom: 'Vance',
    prenom: 'Sophie',
    classe: '6ème A (Section Bilingue)',
    cycle: 'Collège',
    matricule: 'STU-2026-018',
    photoInitiales: 'SV',
    couleurAvatar: 'bg-amber-100 text-amber-800 border-amber-200',
    moyenneGenerale: '16.8 / 20 (88.2%)',
    rangClasse: '4e / 28 élèves',
    tauxPresence: '99.0%',
    professeurPrincipal: 'Sarah Jenkins (Français & Littérature)',
    soldeCantine: 32.5,
    statutFinancier: 'a_jour',
    derniereNote: { matiere: 'Anglais LV1', note: '19.0 / 20', date: '25 Fév' },
    prochainDevoir: { matiere: 'Histoire-Géo', titre: 'Exposé sur l’Égypte antique', date: 'Lun 02 Mar' },
    ligneBus: 'Ligne 4 - Arrêt Les Tilleuls (07h25)',
    alertesActives: 1,
  },
];

export const OngletParentMesEnfants: React.FC = () => {
  const { formaterMontant } = utiliserAcademie();
  const naviguer = useNavigate();
  const [enfantSelectionneId, setEnfantSelectionneId] = useState<string>(ENFANTS_FRATRIE[0].id);

  const enfantActif = ENFANTS_FRATRIE.find((e) => e.id === enfantSelectionneId) || ENFANTS_FRATRIE[0];

  return (
    <div className="space-y-6">
      {/* En-tête de la Fratrie */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-red-600" />
            Mes Enfants & Vue Consolidée Fratrie
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Suivi centralisé du parcours scolaire, des résultats, des comptes de scolarité et de la vie quotidienne de vos enfants.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => naviguer(`${CHEMINS_APPLICATION.TABLEAU_DE_BORD_PARENT}/finances`)}
            className="px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl text-xs font-bold transition-all border border-red-200 flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <CreditCard className="w-4 h-4 text-red-600" />
            <span>Facturation globale ({formaterMontant(8300)})</span>
          </button>
        </div>
      </div>

      {/* Cartes récapitulatives de la Fratrie */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ENFANTS_FRATRIE.map((enfant) => {
          const estSelectionne = enfant.id === enfantSelectionneId;
          return (
            <div
              key={enfant.id}
              onClick={() => setEnfantSelectionneId(enfant.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                estSelectionne
                  ? 'bg-white border-red-500 shadow-md ring-2 ring-red-500/20'
                  : 'bg-white/80 hover:bg-white border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className={`w-14 h-14 rounded-2xl ${enfant.couleurAvatar} border font-black text-lg flex items-center justify-center shadow-xs`}>
                    {enfant.photoInitiales}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-black text-slate-900">{enfant.prenom} {enfant.nom}</h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-100 text-slate-700 uppercase">
                        {enfant.cycle}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-red-600 mt-0.5">{enfant.classe}</p>
                    <p className="text-[11px] text-slate-400 font-mono">Matricule : {enfant.matricule}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle className="w-3 h-3" />
                    Scolarité à jour
                  </span>
                </div>
              </div>

              {/* Indicateurs clés */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-100 text-center">
                <div className="p-2 bg-slate-50 rounded-xl">
                  <span className="text-[10px] font-semibold text-slate-500 block">Moyenne</span>
                  <span className="text-xs font-black text-slate-900 mt-0.5 block">{enfant.moyenneGenerale.split(' ')[0]} / 20</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-xl">
                  <span className="text-[10px] font-semibold text-slate-500 block">Rang</span>
                  <span className="text-xs font-black text-slate-900 mt-0.5 block">{enfant.rangClasse.split(' ')[0]}</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-xl">
                  <span className="text-[10px] font-semibold text-slate-500 block">Présence</span>
                  <span className="text-xs font-black text-emerald-700 mt-0.5 block">{enfant.tauxPresence}</span>
                </div>
              </div>

              {/* Raccourcis d'actions rapides */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    naviguer(`${CHEMINS_APPLICATION.TABLEAU_DE_BORD_PARENT}/suivi`);
                  }}
                  className="text-red-600 hover:text-red-700 flex items-center gap-1 text-xs"
                >
                  <span>Voir le bulletin & notes</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] text-slate-400 font-normal">
                  Prof : {enfant.professeurPrincipal.split('(')[0]}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Focus détaillé sur l'enfant actif sélectionné */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Détail en temps réel
            </span>
            <h3 className="text-lg font-black text-slate-900 mt-0.5">
              Situation complète de {enfantActif.prenom} ({enfantActif.classe})
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => naviguer(`${CHEMINS_APPLICATION.TABLEAU_DE_BORD_PARENT}/cantine-transport`)}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Utensils className="w-3.5 h-3.5 text-amber-600" />
              <span>Cantine ({formaterMontant(enfantActif.soldeCantine)})</span>
            </button>
            <button
              type="button"
              onClick={() => naviguer(`${CHEMINS_APPLICATION.TABLEAU_DE_BORD_PARENT}/sante`)}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Dossier médical</span>
            </button>
          </div>
        </div>

        {/* 4 blocs synthétiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Bloc 1 : Dernier Résultat */}
          <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-red-600" />
                Dernière note
              </span>
              <span className="text-[10px] text-slate-400">{enfantActif.derniereNote.date}</span>
            </div>
            <p className="text-sm font-black text-slate-900">{enfantActif.derniereNote.matiere}</p>
            <div className="flex items-center justify-between pt-1">
              <span className="text-base font-black text-red-600">{enfantActif.derniereNote.note}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Excellent</span>
            </div>
          </div>

          {/* Bloc 2 : Prochain Devoir */}
          <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-600" />
                Prochain devoir
              </span>
              <span className="text-[10px] text-amber-600 font-bold">{enfantActif.prochainDevoir.date}</span>
            </div>
            <p className="text-xs font-bold text-slate-900 line-clamp-1">{enfantActif.prochainDevoir.matiere}</p>
            <p className="text-[11px] text-slate-500 line-clamp-2">{enfantActif.prochainDevoir.titre}</p>
          </div>

          {/* Bloc 3 : Transport & Ramassage */}
          <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
              <span className="flex items-center gap-1.5">
                <Bus className="w-4 h-4 text-amber-600" />
                Transport scolaire
              </span>
              <span className="text-[10px] font-bold text-emerald-600">Actif</span>
            </div>
            <p className="text-xs font-bold text-slate-900">{enfantActif.ligneBus}</p>
            <p className="text-[11px] text-slate-500">Chauffeur : M. Paul Kouassi (Bus n°4)</p>
          </div>

          {/* Bloc 4 : Professeur Référent */}
          <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
              <span className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-purple-600" />
                Professeur principal
              </span>
            </div>
            <p className="text-xs font-bold text-slate-900">{enfantActif.professeurPrincipal}</p>
            <button
              type="button"
              onClick={() => naviguer(`${CHEMINS_APPLICATION.TABLEAU_DE_BORD_PARENT}/communication`)}
              className="text-[11px] font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer pt-1"
            >
              <span>Envoyer un message</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Tableau comparatif consolidé de la fratrie */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
            Synthèse comparative de la scolarité
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-4">Élève</th>
                  <th className="py-2.5 px-4">Classe & Section</th>
                  <th className="py-2.5 px-4">Moyenne T2</th>
                  <th className="py-2.5 px-4">Taux Assiduité</th>
                  <th className="py-2.5 px-4">Solde Cantine</th>
                  <th className="py-2.5 px-4">Frais Scolarité</th>
                  <th className="py-2.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ENFANTS_FRATRIE.map((enfant) => (
                  <tr key={enfant.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                      <span className={`w-7 h-7 rounded-lg ${enfant.couleurAvatar} font-black text-xs flex items-center justify-center`}>
                        {enfant.photoInitiales}
                      </span>
                      <span>{enfant.prenom} {enfant.nom}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-700">{enfant.classe}</td>
                    <td className="py-3 px-4 font-extrabold text-red-600">{enfant.moyenneGenerale.split(' ')[0]} / 20</td>
                    <td className="py-3 px-4 font-bold text-emerald-700">{enfant.tauxPresence}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{formaterMontant(enfant.soldeCantine)}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-800">
                        Réglé à 100%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setEnfantSelectionneId(enfant.id);
                          naviguer(`${CHEMINS_APPLICATION.TABLEAU_DE_BORD_PARENT}/suivi`);
                        }}
                        className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-[11px] transition-colors cursor-pointer shadow-2xs"
                      >
                        Consulter
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
