import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  User,
  Download,
  CalendarCheck,
  Flag,
  Sun,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { BoutonRouge } from '../../../composants/communs/BoutonRouge';
import { EVENEMENTS_CALENDRIER_SCOLAIRE } from '../../../modeles/donneesInitiales/donneesEleveEtendu';

interface CreneauCours {
  id: string;
  jour: 'Lundi' | 'Mardi' | 'Mercredi' | 'Jeudi' | 'Vendredi' | 'Samedi';
  heureDebut: string;
  heureFin: string;
  matiere: string;
  professeur: string;
  salle: string;
  type: 'Cours Magistral' | 'Travaux Dirigés' | 'Séance de TP' | 'Évaluation';
  couleur: string;
  statut: 'Maintenu' | 'Salle modifiée' | 'Devoir programmé';
}

const EMPLOI_DU_TEMPS_SEMAINE: CreneauCours[] = [
  // Lundi
  {
    id: 'c-1',
    jour: 'Lundi',
    heureDebut: '08:00',
    heureFin: '09:30',
    matiere: 'Mathématiques Approfondies',
    professeur: 'Prof. Evelyn Reed',
    salle: 'B-204 (Sciences)',
    type: 'Cours Magistral',
    couleur: 'border-l-4 border-red-600 bg-red-50/70',
    statut: 'Maintenu',
  },
  {
    id: 'c-2',
    jour: 'Lundi',
    heureDebut: '10:00',
    heureFin: '12:00',
    matiere: 'Physique & Chimie',
    professeur: 'Dr. Robert Chen',
    salle: 'Labo L-102',
    type: 'Séance de TP',
    couleur: 'border-l-4 border-sky-600 bg-sky-50/70',
    statut: 'Maintenu',
  },
  {
    id: 'c-3',
    jour: 'Lundi',
    heureDebut: '14:00',
    heureFin: '15:30',
    matiere: 'Littérature & Français',
    professeur: 'Sarah Jenkins',
    salle: 'A-108',
    type: 'Travaux Dirigés',
    couleur: 'border-l-4 border-amber-600 bg-amber-50/70',
    statut: 'Maintenu',
  },
  {
    id: 'c-4',
    jour: 'Lundi',
    heureDebut: '16:00',
    heureFin: '17:00',
    matiere: 'Histoire-Géographie & ECM',
    professeur: 'M. Jean-Paul Durand',
    salle: 'C-301',
    type: 'Cours Magistral',
    couleur: 'border-l-4 border-emerald-600 bg-emerald-50/70',
    statut: 'Maintenu',
  },

  // Mardi
  {
    id: 'c-5',
    jour: 'Mardi',
    heureDebut: '08:00',
    heureFin: '10:00',
    matiere: 'Physique & Chimie',
    professeur: 'Dr. Robert Chen',
    salle: 'B-201',
    type: 'Cours Magistral',
    couleur: 'border-l-4 border-sky-600 bg-sky-50/70',
    statut: 'Maintenu',
  },
  {
    id: 'c-6',
    jour: 'Mardi',
    heureDebut: '10:15',
    heureFin: '12:00',
    matiere: 'Mathématiques Approfondies',
    professeur: 'Prof. Evelyn Reed',
    salle: 'B-204',
    type: 'Travaux Dirigés',
    couleur: 'border-l-4 border-red-600 bg-red-50/70',
    statut: 'Devoir programmé',
  },
  {
    id: 'c-7',
    jour: 'Mardi',
    heureDebut: '13:30',
    heureFin: '15:30',
    matiere: 'Anglais (LV1)',
    professeur: 'Mme Claire Vance-Taylor',
    salle: 'D-102 (Audio)',
    type: 'Travaux Dirigés',
    couleur: 'border-l-4 border-purple-600 bg-purple-50/70',
    statut: 'Maintenu',
  },
  {
    id: 'c-8',
    jour: 'Mardi',
    heureDebut: '15:45',
    heureFin: '17:45',
    matiere: 'Éducation Physique & Sportive (EPS)',
    professeur: 'Coach Marc Leblanc',
    salle: 'Gymnase Olympique',
    type: 'Séance de TP',
    couleur: 'border-l-4 border-teal-600 bg-teal-50/70',
    statut: 'Maintenu',
  },

  // Mercredi
  {
    id: 'c-9',
    jour: 'Mercredi',
    heureDebut: '08:00',
    heureFin: '10:00',
    matiere: 'Sciences de la Vie et de la Terre (SVT)',
    professeur: 'Mme Hélène Bamba',
    salle: 'Labo L-104',
    type: 'Séance de TP',
    couleur: 'border-l-4 border-emerald-600 bg-emerald-50/70',
    statut: 'Maintenu',
  },
  {
    id: 'c-10',
    jour: 'Mercredi',
    heureDebut: '10:15',
    heureFin: '12:15',
    matiere: 'Sciences de l’Ingénieur (SI)',
    professeur: 'Ing. Antoine Mercier',
    salle: 'FabLab Tech-01',
    type: 'Travaux Dirigés',
    couleur: 'border-l-4 border-indigo-600 bg-indigo-50/70',
    statut: 'Maintenu',
  },

  // Jeudi
  {
    id: 'c-11',
    jour: 'Jeudi',
    heureDebut: '08:30',
    heureFin: '10:30',
    matiere: 'Mathématiques Approfondies',
    professeur: 'Prof. Evelyn Reed',
    salle: 'B-204',
    type: 'Cours Magistral',
    couleur: 'border-l-4 border-red-600 bg-red-50/70',
    statut: 'Maintenu',
  },
  {
    id: 'c-12',
    jour: 'Jeudi',
    heureDebut: '10:45',
    heureFin: '12:15',
    matiere: 'Philosophie & Humanités',
    professeur: 'Dr. Arthur Vane',
    salle: 'A-201',
    type: 'Cours Magistral',
    couleur: 'border-l-4 border-amber-600 bg-amber-50/70',
    statut: 'Maintenu',
  },
  {
    id: 'c-13',
    jour: 'Jeudi',
    heureDebut: '14:00',
    heureFin: '16:00',
    matiere: 'Physique & Chimie',
    professeur: 'Dr. Robert Chen',
    salle: 'B-201',
    type: 'Travaux Dirigés',
    couleur: 'border-l-4 border-sky-600 bg-sky-50/70',
    statut: 'Salle modifiée',
  },
  {
    id: 'c-14',
    jour: 'Jeudi',
    heureDebut: '16:15',
    heureFin: '17:15',
    matiere: 'Espagnol (LV2)',
    professeur: 'Mme Sofia Gomez',
    salle: 'A-104',
    type: 'Travaux Dirigés',
    couleur: 'border-l-4 border-rose-600 bg-rose-50/70',
    statut: 'Maintenu',
  },

  // Vendredi
  {
    id: 'c-15',
    jour: 'Vendredi',
    heureDebut: '08:00',
    heureFin: '10:00',
    matiere: 'Devoir Surveillé Commun (DS)',
    professeur: 'Équipe Pédagogique',
    salle: 'Salle Polyvalente B12',
    type: 'Évaluation',
    couleur: 'border-l-4 border-red-700 bg-red-100/80',
    statut: 'Devoir programmé',
  },
  {
    id: 'c-16',
    jour: 'Vendredi',
    heureDebut: '10:15',
    heureFin: '12:00',
    matiere: 'Littérature & Français',
    professeur: 'Sarah Jenkins',
    salle: 'A-108',
    type: 'Travaux Dirigés',
    couleur: 'border-l-4 border-amber-600 bg-amber-50/70',
    statut: 'Maintenu',
  },
  {
    id: 'c-17',
    jour: 'Vendredi',
    heureDebut: '13:30',
    heureFin: '15:30',
    matiere: 'Sciences de l’Ingénieur (SI)',
    professeur: 'Ing. Antoine Mercier',
    salle: 'FabLab Tech-01',
    type: 'Séance de TP',
    couleur: 'border-l-4 border-indigo-600 bg-indigo-50/70',
    statut: 'Maintenu',
  },
  {
    id: 'c-18',
    jour: 'Vendredi',
    heureDebut: '15:45',
    heureFin: '17:00',
    matiere: 'Heure de Vie de Classe & Mentorat',
    professeur: 'Prof. Evelyn Reed (Prof. Principal)',
    salle: 'B-204',
    type: 'Travaux Dirigés',
    couleur: 'border-l-4 border-slate-700 bg-slate-100',
    statut: 'Maintenu',
  },

  // Samedi
  {
    id: 'c-19',
    jour: 'Samedi',
    heureDebut: '08:30',
    heureFin: '11:30',
    matiere: 'Olympiades de Mathématiques (Club Sciences)',
    professeur: 'Prof. Evelyn Reed',
    salle: 'Amphithéâtre Pasteur',
    type: 'Travaux Dirigés',
    couleur: 'border-l-4 border-amber-600 bg-amber-50/70',
    statut: 'Maintenu',
  },
];

const JOURS_SEMAINE: Array<'Lundi' | 'Mardi' | 'Mercredi' | 'Jeudi' | 'Vendredi' | 'Samedi'> = [
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
];

export const OngletEleveEmploiDuTemps: React.FC = () => {
  const [jourSelectionne, setJourSelectionne] = useState<'Lundi' | 'Mardi' | 'Mercredi' | 'Jeudi' | 'Vendredi' | 'Samedi'>('Lundi');
  const [vueMode, setVueMode] = useState<'semaine' | 'jour' | 'calendrier'>('semaine');
  const [filtreTypeCalendrier, setFiltreTypeCalendrier] = useState<string>('tous');
  const [telechargementReussi, setTelechargementReussi] = useState(false);

  const coursDuJour = EMPLOI_DU_TEMPS_SEMAINE.filter((c) => c.jour === jourSelectionne);

  const evenementsFiltres = EVENEMENTS_CALENDRIER_SCOLAIRE.filter((ev) => {
    if (filtreTypeCalendrier === 'tous') return true;
    return ev.type === filtreTypeCalendrier;
  });

  const gererTelechargement = () => {
    setTelechargementReussi(true);
    setTimeout(() => setTelechargementReussi(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* En-tête avec bascule de mode */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-red-600" />
            <h2 className="text-base font-bold text-slate-900">Emploi du Temps Hebdomadaire & Calendrier Scolaire</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Classe de <strong>1ère C</strong> &bull; Volume : 32h / semaine &bull; Salle principale : <strong>B-204</strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => setVueMode('semaine')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                vueMode === 'semaine' ? 'bg-white text-red-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Vue Semaine Grille
            </button>
            <button
              onClick={() => setVueMode('jour')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                vueMode === 'jour' ? 'bg-white text-red-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Vue Jour par Jour
            </button>
            <button
              onClick={() => setVueMode('calendrier')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                vueMode === 'calendrier' ? 'bg-white text-red-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Calendrier Annuel
            </button>
          </div>

          <BoutonRouge
            texte={telechargementReussi ? 'PDF Téléchargé !' : 'Exporter PDF / iCal'}
            icone={Download}
            variante="secondaire"
            taille="petit"
            onClick={gererTelechargement}
          />
        </div>
      </div>

      {telechargementReussi && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          Emploi du temps officiel généré avec cachet académique. Fichier PDF prêt pour l'impression.
        </div>
      )}

      {/* VUE SEMAINE GRILLE */}
      {vueMode === 'semaine' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">Semaine du Lundi 02 au Samedi 07 Mars 2026</span>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Semaine A &bull; 100% des cours assurés</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 bg-slate-50/50">
            {JOURS_SEMAINE.map((jour) => {
              const coursJour = EMPLOI_DU_TEMPS_SEMAINE.filter((c) => c.jour === jour);
              const estAujourdhui = jour === 'Lundi';

              return (
                <div key={jour} className="p-3 space-y-3 min-h-[480px]">
                  <div className={`p-2 rounded-lg text-center ${estAujourdhui ? 'bg-red-600 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-800'}`}>
                    <span className="text-xs font-black block">{jour}</span>
                    <span className={`text-[10px] ${estAujourdhui ? 'text-red-100' : 'text-slate-500'}`}>
                      {coursJour.length} créneaux
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {coursJour.length === 0 ? (
                      <div className="p-4 text-center text-slate-400 text-xs italic">
                        Aucun cours prévu
                      </div>
                    ) : (
                      coursJour.map((c) => (
                        <div
                          key={c.id}
                          className={`p-2.5 rounded-xl border border-slate-200/80 shadow-2xs transition-all hover:scale-[1.02] bg-white ${c.couleur}`}
                        >
                          <div className="flex items-center justify-between text-[10px] text-slate-600 font-bold mb-1">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              {c.heureDebut} - {c.heureFin}
                            </span>
                            <span className="text-[9px] px-1 py-0.5 bg-slate-100 rounded text-slate-700">
                              {c.type.split(' ')[0]}
                            </span>
                          </div>

                          <span className="font-bold text-xs text-slate-900 block leading-tight">
                            {c.matiere}
                          </span>

                          <div className="mt-1.5 space-y-0.5 text-[10px] text-slate-500">
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3 text-slate-400 shrink-0" />
                              <span className="truncate">{c.professeur}</span>
                            </span>
                            <span className="flex items-center gap-1 font-medium text-slate-700">
                              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                              {c.salle}
                            </span>
                          </div>

                          {c.statut !== 'Maintenu' && (
                            <span className="mt-1.5 inline-block text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900">
                              {c.statut}
                            </span>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VUE JOUR PAR JOUR */}
      {vueMode === 'jour' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {JOURS_SEMAINE.map((j) => (
              <button
                key={j}
                onClick={() => setJourSelectionne(j)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  jourSelectionne === j
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {j}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Planning détaillé du {jourSelectionne}</h3>
                <p className="text-xs text-slate-500">{coursDuJour.length} cours programmés pour la journée</p>
              </div>
              <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">Classe 1ère C</span>
            </div>

            <div className="divide-y divide-slate-100">
              {coursDuJour.map((c) => (
                <div key={c.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-20 text-center py-2 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-xs font-black text-red-600 block">{c.heureDebut}</span>
                      <span className="text-[10px] text-slate-500">{c.heureFin}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">{c.matiere}</span>
                        <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">{c.type}</span>
                        {c.statut !== 'Maintenu' && (
                          <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">{c.statut}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          {c.professeur}
                        </span>
                        <span className="flex items-center gap-1 font-semibold text-slate-700">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {c.salle}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-slate-700 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 self-start sm:self-auto">
                    Présence Obligatoire
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VUE CALENDRIER SCOLAIRE GLOBAL */}
      {vueMode === 'calendrier' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-red-600" />
              <span className="text-xs font-bold text-slate-900">Filtre des événements officiels :</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'tous', libelle: 'Tous les événements' },
                { id: 'vacances', libelle: 'Vacances Scolaires' },
                { id: 'examen', libelle: 'Périodes d’Examens' },
                { id: 'conseil_classe', libelle: 'Conseils de Classe' },
                { id: 'ferie', libelle: 'Jours Fériés' },
                { id: 'evenement_culturel', libelle: 'Vie Institutionnelle' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFiltreTypeCalendrier(f.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    filtreTypeCalendrier === f.id
                      ? 'bg-red-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {f.libelle}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {evenementsFiltres.map((ev) => {
              const estVacances = ev.type === 'vacances';
              const estExamen = ev.type === 'examen';
              const estConseil = ev.type === 'conseil_classe';

              return (
                <div
                  key={ev.identifiant}
                  className={`p-4 rounded-xl border shadow-2xs transition-all hover:shadow-xs ${
                    estVacances
                      ? 'bg-amber-50/70 border-amber-200'
                      : estExamen
                      ? 'bg-red-50/70 border-red-200'
                      : estConseil
                      ? 'bg-purple-50/70 border-purple-200'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200/50">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-white/90 text-slate-800 border border-slate-200">
                      {ev.type.replace('_', ' ')}
                    </span>
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {ev.dateDebut} {ev.dateFin ? `au ${ev.dateFin}` : ''}
                    </span>
                  </div>

                  <div className="mt-3 space-y-1.5">
                    <h4 className="text-xs font-bold text-slate-900">{ev.titre}</h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{ev.description}</p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-200/40 flex items-center justify-between text-[10px] text-slate-500">
                    <span>Concerne : <strong>{ev.concerne}</strong></span>
                    {ev.lieu && <span>{ev.lieu}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
