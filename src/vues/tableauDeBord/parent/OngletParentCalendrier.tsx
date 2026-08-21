import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  UserCheck,
  Plus,
  Video,
  MapPin,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  BookOpen,
  CalendarDays,
} from 'lucide-react';
import { BoutonRouge } from '../../../composants/communs/BoutonRouge';
import { utiliserAcademie } from '../../../controleurs/contexteAcademie';

interface EvenementScolaire {
  id: string;
  titre: string;
  type: 'vacances' | 'examen' | 'reunion' | 'pedagogique' | 'conseil';
  dateDebut: string;
  dateFin?: string;
  concerne: string;
  description: string;
}

const EVENEMENTS_CALENDRIER: EvenementScolaire[] = [
  {
    id: 'ev-1',
    titre: 'Vacances d’Hiver (Février)',
    type: 'vacances',
    dateDebut: '14 Février 2026',
    dateFin: '02 Mars 2026',
    concerne: 'Toutes les classes (Zone C)',
    description: 'Fermeture pédagogique de l’établissement. Reprise des cours le lundi 02 mars à 08h00.',
  },
  {
    id: 'ev-2',
    titre: 'Conseils de Classe du 2ème Trimestre',
    type: 'conseil',
    dateDebut: '16 Mars 2026',
    dateFin: '20 Mars 2026',
    concerne: 'Lycée & Collège (1ère C & 6ème A)',
    description: 'Bilan trimestriel des résultats avec les délégués parents et élèves.',
  },
  {
    id: 'ev-3',
    titre: 'Soirée Rencontre Parents - Professeurs (T2)',
    type: 'reunion',
    dateDebut: '24 Mars 2026 (17h00 - 20h30)',
    concerne: 'Classes de 1ère et Terminale (Marcus)',
    description: 'Entretiens individuels de 15 minutes avec l’équipe pédagogique.',
  },
  {
    id: 'ev-4',
    titre: 'Bac Blanc & Épreuves Communes de Spécialité',
    type: 'examen',
    dateDebut: '06 Avril 2026',
    dateFin: '10 Avril 2026',
    concerne: 'Élèves de 1ère et Terminale',
    description: 'Épreuves écrites de Mathématiques, Physique et Français en conditions réelles d’examen.',
  },
  {
    id: 'ev-5',
    titre: 'Vacances de Printemps (Pâques)',
    type: 'vacances',
    dateDebut: '18 Avril 2026',
    dateFin: '04 Mai 2026',
    concerne: 'Toutes les classes',
    description: 'Période de révisions et congés scolaires de printemps.',
  },
];

export const OngletParentCalendrier: React.FC = () => {
  const { listeRendezVous, reserverRendezVous } = utiliserAcademie();

  const [modalNouveauRdv, setModalNouveauRdv] = useState(false);
  const [eleveCible, setEleveCible] = useState<'Marcus Vance (1ère C)' | 'Sophie Vance (6ème A)'>('Marcus Vance (1ère C)');
  const [professeurCible, setProfesseurCible] = useState('Prof. Evelyn Reed (Mathématiques & Prof. Principal 1ère C)');
  const [dateRdv, setDateRdv] = useState('2026-03-24');
  const [heureRdv, setHeureRdv] = useState('17:30');
  const [modeRdv, setModeRdv] = useState<'presentiel' | 'visio'>('presentiel');
  const [motifRdv, setMotifRdv] = useState('');
  const [succesRdv, setSuccesRdv] = useState(false);

  const soumettreRdv = (e: React.FormEvent) => {
    e.preventDefault();
    if (!motifRdv) return;

    reserverRendezVous({
      nomParent: 'Eleanor Vance',
      nomProfesseur: professeurCible,
      eleveConcerne: eleveCible,
      dateRdv: `${dateRdv} (${modeRdv === 'visio' ? 'Visio Teams' : 'Salle 104'})`,
      heureRdv,
      motif: motifRdv,
    });

    setModalNouveauRdv(false);
    setMotifRdv('');
    setSuccesRdv(true);
    setTimeout(() => setSuccesRdv(false), 5000);
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Calendar className="w-6 h-6 text-red-600" />
            Calendrier Scolaire & Prise de Rendez-vous
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Agenda officiel des événements, vacances scolaires, examens et planification d'entretiens individuels avec les enseignants.
          </p>
        </div>

        <BoutonRouge
          texte="Demander un Rendez-vous Enseignant"
          icone={Plus}
          onClick={() => setModalNouveauRdv(true)}
        />
      </div>

      {succesRdv && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-bold text-emerald-900 flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Votre demande de rendez-vous a été transmise à l'enseignant ! Confirmation ajoutée à votre agenda.</span>
        </div>
      )}

      {/* Grille : Calendrier des Événements & Rendez-vous confirmés */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne 1 & 2 : Événements Scolaires Majeurs */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-red-600" />
              <h3 className="text-sm font-black text-slate-900">Agenda Scolaire & Événements Institutionnels (2025-2026)</h3>
            </div>
            <span className="text-xs font-bold text-slate-500">Trimestre 2 & 3</span>
          </div>

          <div className="space-y-3">
            {EVENEMENTS_CALENDRIER.map((ev) => {
              const badgeCouleur =
                ev.type === 'vacances'
                  ? 'bg-blue-100 text-blue-800 border-blue-200'
                  : ev.type === 'examen'
                  ? 'bg-red-100 text-red-800 border-red-200'
                  : ev.type === 'reunion'
                  ? 'bg-purple-100 text-purple-800 border-purple-200'
                  : 'bg-amber-100 text-amber-800 border-amber-200';

              return (
                <div
                  key={ev.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors space-y-2 text-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase border ${badgeCouleur}`}>
                          {ev.type}
                        </span>
                        <span className="font-bold text-slate-900 text-sm">{ev.titre}</span>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500 block mt-1">
                        {ev.dateDebut} {ev.dateFin ? `au ${ev.dateFin}` : ''} &bull; <strong className="text-slate-700">{ev.concerne}</strong>
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11px]">{ev.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Colonne 3 : Rendez-vous Parents-Professeurs Confirmés */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-red-600" />
              <h3 className="text-sm font-black text-slate-900">Mes Entretiens Planifiés</h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              {listeRendezVous.length} RDV
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {listeRendezVous.map((rdv) => (
              <div key={rdv.identifiant} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{rdv.nomProfesseur}</span>
                  <span className="px-2 py-0.5 rounded font-black text-[9px] uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Confirmé
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 font-medium">{rdv.eleveConcerne}</p>
                <p className="text-[11px] text-slate-500 italic line-clamp-2">« {rdv.motif} »</p>
                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-red-600 font-bold">
                  <span>{rdv.dateRdv} à {rdv.heureRdv}</span>
                  <span className="text-slate-400">Établissement</span>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setModalNouveauRdv(true)}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            + Programmer un autre créneau
          </button>
        </div>
      </div>

      {/* MODALE PRISE DE RENDEZ-VOUS ENSEIGNANT */}
      {modalNouveauRdv && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-red-600" />
              Demande d'Entretien avec un Enseignant
            </h3>

            <form onSubmit={soumettreRdv} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-800 block mb-1">Enfant concerné :</label>
                <select
                  value={eleveCible}
                  onChange={(e) => setEleveCible(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                >
                  <option value="Marcus Vance (1ère C)">Marcus Vance (1ère C - Lycée)</option>
                  <option value="Sophie Vance (6ème A)">Sophie Vance (6ème A - Collège)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Enseignant / Interlocuteur :</label>
                <select
                  value={professeurCible}
                  onChange={(e) => setProfesseurCible(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                >
                  <option value="Prof. Evelyn Reed (Mathématiques & Prof. Principal 1ère C)">Prof. Evelyn Reed (Mathématiques & Prof. Principal 1ère C)</option>
                  <option value="Sarah Jenkins (Français & Prof. Principal 6ème A)">Sarah Jenkins (Français & Prof. Principal 6ème A)</option>
                  <option value="Dr. Robert Chen (Physique-Chimie)">Dr. Robert Chen (Physique-Chimie)</option>
                  <option value="Dr. Arthur Sterling (Proviseur / Directeur)">Dr. Arthur Sterling (Direction)</option>
                  <option value="M. Thomas Mercier (CPE & Vie Scolaire)">M. Thomas Mercier (Vie Scolaire)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Date souhaitée :</label>
                  <input
                    type="date"
                    value={dateRdv}
                    onChange={(e) => setDateRdv(e.target.value)}
                    required
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Créneau horaire :</label>
                  <select
                    value={heureRdv}
                    onChange={(e) => setHeureRdv(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                  >
                    <option value="16:30">16h30 - 16h50</option>
                    <option value="17:00">17h00 - 17h20</option>
                    <option value="17:30">17h30 - 17h50</option>
                    <option value="18:00">18h00 - 18h20</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Format de l'entretien :</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setModeRdv('presentiel')}
                    className={`p-2.5 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                      modeRdv === 'presentiel' ? 'border-red-600 bg-red-50 text-red-700' : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  >
                    <MapPin className="w-4 h-4 mx-auto mb-0.5 text-red-600" />
                    En Présentiel (Salle 104)
                  </button>
                  <button
                    type="button"
                    onClick={() => setModeRdv('visio')}
                    className={`p-2.5 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                      modeRdv === 'visio' ? 'border-red-600 bg-red-50 text-red-700' : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  >
                    <Video className="w-4 h-4 mx-auto mb-0.5 text-blue-600" />
                    Visioconférence Teams
                  </button>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Objet / Motif de l'entretien :</label>
                <textarea
                  rows={3}
                  value={motifRdv}
                  onChange={(e) => setMotifRdv(e.target.value)}
                  placeholder="Ex : Point d'étape sur les spécialités de Terminale et les résultats du 2ème trimestre..."
                  required
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalNouveauRdv(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-black cursor-pointer shadow-md"
                >
                  Confirmer la demande de RDV
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
