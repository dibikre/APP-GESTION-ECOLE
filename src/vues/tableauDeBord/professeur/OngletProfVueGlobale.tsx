import React from 'react';
import {
  Users,
  Award,
  CalendarCheck,
  CheckSquare,
  Clock,
  BookOpen,
  MessageSquare,
} from '../../../composants/communs/IconesAcademie';
import { CarteStatistique } from '../../../composants/communs/CarteStatistique';
import { utiliserAcademie } from '../../../controleurs/contexteAcademie';

export const OngletProfVueGlobale: React.FC = () => {
  const { listeDevoirs, listeCoursHoraires, listeNotes, traduire } = utiliserAcademie();

  const notesProf = listeNotes.filter((n) => n.matiere.includes('Math'));
  const moyenneClasse = notesProf.length > 0
    ? Math.round(notesProf.reduce((s, n) => s + (n.noteObtenue / n.noteMaximale) * 100, 0) / notesProf.length)
    : 87;

  return (
    <div className="space-y-6">
      {/* Teacher KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CarteStatistique
          titre={traduire('kpiElevesAssignes')}
          valeur="28"
          sousTitre="Grade 11-A (Science Track)"
          icone={Users}
          identifiant="prof-kpi-eleves"
        />
        <CarteStatistique
          titre={traduire('kpiMoyenneClasse')}
          valeur={`${moyenneClasse}%`}
          sousTitre="Advanced Mathematics"
          icone={Award}
          variation={{ texte: "+2.4%", positive: true }}
          identifiant="prof-kpi-moyenne"
        />
        <CarteStatistique
          titre={traduire('kpiPresenceAppel')}
          valeur="98.2%"
          sousTitre={traduire('kpiPresenceAppelSousTitre')}
          icone={CalendarCheck}
          identifiant="prof-kpi-presence"
        />
        <CarteStatistique
          titre={traduire('kpiHeuresHebdo')}
          valeur="16h / wk"
          sousTitre={traduire('kpiHeuresHebdoSousTitre')}
          icone={Clock}
          identifiant="prof-kpi-heures"
        />
      </div>

      {/* Today's Schedule & Priority Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">{traduire('emploiDuTempsEnseignant')}</h3>
              <p className="text-xs text-slate-500">{traduire('emploiDuTempsEnseignantDesc')}</p>
            </div>
            <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">{traduire('anneeAcademiqueLibelle')}</span>
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

        {/* Priority Teacher Checklist */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4 text-red-600" />
                {traduire('tachesPedaPrioritaires')}
              </h3>
              <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                3 {traduire('enAttenteEvaluation')}
              </span>
            </div>

            <div className="space-y-2.5 mt-3 text-xs">
              <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                <span className="font-bold text-slate-900 block">Grade Integration Test #4</span>
                <p className="text-[11px] text-slate-600">6 submissions remaining to evaluate.</p>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                <span className="font-bold text-slate-900 block">Review Absence Justifications</span>
                <p className="text-[11px] text-slate-600">2 medical certificates submitted by parents.</p>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                <span className="font-bold text-slate-900 block">Upload Midterm Revision Slides</span>
                <p className="text-[11px] text-slate-600">Post PDF file before Wednesday.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
