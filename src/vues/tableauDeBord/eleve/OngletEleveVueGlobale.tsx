import React from 'react';
import {
  Award,
  CalendarCheck,
  BookOpen,
  AlertCircle,
  Megaphone,
  Download,
} from 'lucide-react';
import { CarteStatistique } from '../../../composants/communs/CarteStatistique';
import { utiliserAcademie } from '../../../controleurs/contexteAcademie';

export const OngletEleveVueGlobale: React.FC = () => {
  const { listeNotes, listeAnnonces, listeDevoirs } = utiliserAcademie();

  return (
    <div className="space-y-6">
      {/* Student Top KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CarteStatistique
          titre="Cumulative GPA"
          valeur="91.4%"
          sousTitre="Class Rank: #2 / 28"
          icone={Award}
          variation={{ texte: "+1.8%", positive: true }}
          identifiant="eleve-kpi-gpa"
        />
        <CarteStatistique
          titre="Term Attendance"
          valeur="98.5%"
          sousTitre="0 Unexcused absences"
          icone={CalendarCheck}
          identifiant="eleve-kpi-presence"
        />
        <CarteStatistique
          titre="Enrolled Courses"
          valeur="8"
          sousTitre="Science Track Major"
          icone={BookOpen}
          identifiant="eleve-kpi-cours"
        />
        <CarteStatistique
          titre="Pending Homework"
          valeur={listeDevoirs.length}
          sousTitre="2 Due this week"
          icone={AlertCircle}
          identifiant="eleve-kpi-devoirs"
        />
      </div>

      {/* Recent Grades and Campus Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Recent Assessment Scores</h3>
              <p className="text-xs text-slate-500">Continuous assessments and quizzes for Term 2</p>
            </div>
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">Term 2</span>
          </div>

          <div className="mt-4 space-y-3">
            {listeNotes.map((n) => {
              const pct = Math.round((n.noteObtenue / n.noteMaximale) * 100);
              return (
                <div key={n.identifiant} className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block">{n.matiere}</span>
                    <span className="text-[11px] text-slate-500">{n.titreEvaluation} &bull; {n.dateEvaluation}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-red-600 text-sm block">{n.noteObtenue} / {n.noteMaximale}</span>
                    <span className="text-[10px] font-bold text-emerald-700">{pct}% (Grade A)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Campus Announcements */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Megaphone className="w-4 h-4 text-red-600" />
                School Bulletins
              </h3>
            </div>

            <div className="space-y-3 mt-3">
              {listeAnnonces.map((ann) => (
                <div key={ann.identifiant} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{ann.titre}</span>
                    <span className="text-[10px] font-bold text-red-600 uppercase">{ann.priorite}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">{ann.contenu}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
