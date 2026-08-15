import React from 'react';
import {
  Award,
  FileText,
  Download,
  CalendarCheck,
  TrendingUp,
} from '../../../composants/communs/IconesAcademie';
import { BoutonRouge } from '../../../composants/communs/BoutonRouge';

export const OngletEleveDossierAcademique: React.FC = () => {
  const releveMatieres = [
    { matiere: 'Advanced Mathematics', coeff: 5, cc1: 18, cc2: 17.5, examen: 19, moyenne: 18.3, appreciations: 'Outstanding analytical skills.' },
    { matiere: 'Physics & Astronomy', coeff: 4, cc1: 16, cc2: 16.5, examen: 17, moyenne: 16.6, appreciations: 'Strong experimental acumen.' },
    { matiere: 'Chemistry & Molecular Biology', coeff: 4, cc1: 17, cc2: 18, examen: 17.5, moyenne: 17.6, appreciations: 'Rigorous lab reporting.' },
    { matiere: 'English Literature', coeff: 3, cc1: 15, cc2: 16, examen: 15.5, moyenne: 15.6, appreciations: 'Thoughtful textual analysis.' },
    { matiere: 'World History & Philosophy', coeff: 2, cc1: 16, cc2: 15, examen: 16, moyenne: 15.7, appreciations: 'Active seminar engagement.' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Student Academic Record & Official Transcript</h3>
          <p className="text-xs text-slate-500">Official term-by-term grade breakdown, credit coefficients, and teacher appraisals.</p>
        </div>
        <BoutonRouge
          texte="Download Official Transcript"
          icone={Download}
          onClick={() => alert('Generating accredited PDF transcript...')}
        />
      </div>

      {/* Transcript Summary */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-sm font-bold text-slate-900">Term 2 Academic Report Card &bull; 1ère C (Première Scientifique)</span>
            <p className="text-xs text-slate-500">Student: Marcus Vance (ID: STU-2026-003) &bull; Cycle: Lycée</p>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-slate-500 block">General GPA Average</span>
            <span className="text-xl font-extrabold text-red-600">17.1 / 20 (91.4%)</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Subject</th>
                <th className="py-2.5 px-4">Coeff</th>
                <th className="py-2.5 px-4">CC1</th>
                <th className="py-2.5 px-4">CC2</th>
                <th className="py-2.5 px-4">Exam</th>
                <th className="py-2.5 px-4">Weighted Avg</th>
                <th className="py-2.5 px-4">Teacher Appraisal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {releveMatieres.map((m) => (
                <tr key={m.matiere} className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-4 font-bold text-slate-900">{m.matiere}</td>
                  <td className="py-2.5 px-4 text-slate-600 font-bold">{m.coeff}</td>
                  <td className="py-2.5 px-4 text-slate-700">{m.cc1}</td>
                  <td className="py-2.5 px-4 text-slate-700">{m.cc2}</td>
                  <td className="py-2.5 px-4 text-slate-700">{m.examen}</td>
                  <td className="py-2.5 px-4 font-extrabold text-red-600">{m.moyenne} / 20</td>
                  <td className="py-2.5 px-4 text-slate-600 italic">{m.appreciations}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
