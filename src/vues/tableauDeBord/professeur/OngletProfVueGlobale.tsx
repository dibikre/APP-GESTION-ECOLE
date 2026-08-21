import React from 'react';
import {
  Users,
  Award,
  CalendarCheck,
  CheckSquare,
  Clock,
} from 'lucide-react';
import { CarteStatistique } from '../../../composants/communs/CarteStatistique';
import { utiliserAcademie } from '../../../controleurs/contexteAcademie';

export const OngletProfVueGlobale: React.FC = () => {
  const { listeCoursHoraires, listeNotes } = utiliserAcademie();

  const notesProf = listeNotes.filter((n) => n.matiere.includes('Math'));
  const moyenneClasse = notesProf.length > 0
    ? (notesProf.reduce((s, n) => s + (n.noteObtenue / n.noteMaximale) * 20, 0) / notesProf.length).toFixed(1)
    : '14.8';

  return (
    <div className="space-y-6">
      {/* Indicateurs Clés Enseignant */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CarteStatistique
          titre="Élèves Assignés"
          valeur="28"
          sousTitre="Classe 1ère S1 (Filière Scientifique)"
          icone={Users}
          identifiant="prof-kpi-eleves"
        />
        <CarteStatistique
          titre="Moyenne de Classe"
          valeur={`${moyenneClasse} / 20`}
          sousTitre="Mathématiques Approfondies"
          icone={Award}
          variation={{ texte: "+0.6 pt", positive: true }}
          identifiant="prof-kpi-moyenne"
        />
        <CarteStatistique
          titre="Taux de Présence"
          valeur="98.2%"
          sousTitre="Appel quotidien du matin"
          icone={CalendarCheck}
          identifiant="prof-kpi-presence"
        />
        <CarteStatistique
          titre="Volume Horaire Hebdo"
          valeur="16h / sem"
          sousTitre="4 modules de cours"
          icone={Clock}
          identifiant="prof-kpi-heures"
        />
      </div>

      {/* Emploi du temps du jour & Tâches prioritaires */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Emploi du Temps d'Aujourd'hui</h3>
              <p className="text-xs text-slate-500">Cours magistraux, TD et séances de TP programmés</p>
            </div>
            <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">Lundi</span>
          </div>

          <div className="mt-4 space-y-3">
            {listeCoursHoraires.map((c) => (
              <div key={c.identifiant} className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 block">{c.matiere}</span>
                  <span className="text-[11px] text-slate-500">{c.classe} &bull; {c.salle}</span>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-red-600 block">{c.heureDebut} - {c.heureFin}</span>
                  <span className="text-[10px] text-slate-500">{c.professeurNom}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tâches Pédagogiques Prioritaires */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4 text-red-600" />
                Actions & Suivi Pédagogique
              </h3>
              <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                3 En attente
              </span>
            </div>

            <div className="space-y-2.5 mt-3 text-xs">
              <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                <span className="font-bold text-slate-900 block">Corriger le Devoir Surveillé #4</span>
                <p className="text-[11px] text-slate-600">6 copies restantes à évaluer et annoter.</p>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                <span className="font-bold text-slate-900 block">Valider les Justificatifs d'Absence</span>
                <p className="text-[11px] text-slate-600">2 certificats médicaux transmis par les familles.</p>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                <span className="font-bold text-slate-900 block">Publier le Polycopié de Révision</span>
                <p className="text-[11px] text-slate-600">Mettre en ligne le support PDF avant mercredi.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

