import React, { useState } from 'react';
import {
  Users,
  Award,
  CalendarCheck,
  AlertTriangle,
  ChevronDown,
  Clock,
} from '../../../composants/communs/IconesAcademie';
import { CarteStatistique } from '../../../composants/communs/CarteStatistique';
import { utiliserAcademie } from '../../../controleurs/contexteAcademie';

export const OngletParentSuiviEnfant: React.FC = () => {
  const { listeNotes, listePresences, traduire } = utiliserAcademie();
  const [enfantActif, setEnfantActif] = useState<'marcus' | 'sophie'>('marcus');

  const donneesEnfant = enfantActif === 'marcus' ? {
    nom: 'Marcus Vance',
    classe: '1ère C (Première Scientifique - Lycée)',
    matricule: 'STU-2026-003',
    gpa: '91.4%',
    presence: '98.5%',
    rang: '#2 in class',
    tuteur: 'Prof. Evelyn Reed',
  } : {
    nom: 'Sophie Vance',
    classe: '6e A (Sixième - Collège)',
    matricule: 'STU-2026-018',
    gpa: '88.2%',
    presence: '99.0%',
    rang: '#4 in class',
    tuteur: 'Sarah Jenkins',
  };

  return (
    <div className="space-y-6">
      {/* Child Switcher Banner */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{traduire('vueEnsembleParent')}</span>
          <h3 className="text-lg font-bold text-slate-900">{donneesEnfant.nom} &bull; {donneesEnfant.classe}</h3>
          <p className="text-xs text-slate-500">ID: {donneesEnfant.matricule} &bull; Tuteur: {donneesEnfant.tuteur}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setEnfantActif('marcus')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer ${
              enfantActif === 'marcus' ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Marcus (1ère C - Lycée)
          </button>
          <button
            type="button"
            onClick={() => setEnfantActif('sophie')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer ${
              enfantActif === 'sophie' ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Sophie (6e A - Collège)
          </button>
        </div>
      </div>

      {/* Child Performance KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CarteStatistique
          titre={traduire('kpiMoyenneEnfant')}
          valeur={donneesEnfant.gpa}
          sousTitre={donneesEnfant.rang}
          icone={Award}
          variation={{ texte: "+1.8%", positive: true }}
          identifiant="parent-kpi-gpa"
        />
        <CarteStatistique
          titre={traduire('kpiAssiduiteEnfant')}
          valeur={donneesEnfant.presence}
          sousTitre={traduire('kpiAssiduiteEnfantSousTitre')}
          icone={CalendarCheck}
          identifiant="parent-kpi-presence"
        />
        <CarteStatistique
          titre={traduire('assiduite')}
          valeur="100%"
          sousTitre={traduire('incidentsSignales')}
          icone={Users}
          identifiant="parent-kpi-conduite"
        />
        <CarteStatistique
          titre={traduire('kpiSoldeFrais')}
          valeur="$0.00"
          sousTitre={traduire('kpiSoldeFraisSousTitre')}
          icone={Clock}
          identifiant="parent-kpi-frais"
        />
      </div>

      {/* Recent Evaluations and Attendance Record */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h4 className="text-sm font-bold text-slate-900">Latest Academic Scores</h4>
            <span className="text-xs font-bold text-slate-600">Term 2 Marks</span>
          </div>
          <div className="divide-y divide-slate-100 mt-2">
            {listeNotes.slice(0, 4).map((n) => (
              <div key={n.identifiant} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900">{n.matiere}</span>
                  <span className="text-[11px] text-slate-500 block">{n.titreEvaluation} &bull; {n.dateEvaluation}</span>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-red-600 text-sm block">{n.noteObtenue} / {n.noteMaximale}</span>
                  <span className="text-[10px] text-slate-500 italic">{n.commentaire || 'Good work'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Attendance / Roll-Call Log */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h4 className="text-sm font-bold text-slate-900">Attendance & Punctuality Log</h4>
            <span className="text-xs font-bold text-emerald-700">98.5% Rate</span>
          </div>
          <div className="space-y-2.5 mt-3 text-xs">
            <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900">Monday, March 02, 2026</span>
                <p className="text-[11px] text-slate-500">Morning Session & Laboratories</p>
              </div>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px] uppercase">
                Present on time
              </span>
            </div>
            <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900">Friday, February 27, 2026</span>
                <p className="text-[11px] text-slate-500">Full Day Academic Schedule</p>
              </div>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px] uppercase">
                Present on time
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
