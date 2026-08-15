import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  Layers,
  GraduationCap,
  Clock,
  Plus,
} from '../../../composants/communs/IconesAcademie';
import { BoutonRouge } from '../../../composants/communs/BoutonRouge';
import { utiliserAcademie } from '../../../controleurs/contexteAcademie';

export const OngletAcademique: React.FC = () => {
  const { listeProfesseurs, listeCoursHoraires } = utiliserAcademie();

  const [trimestres] = useState([
    { nom: 'Term 1 (Premier Trimestre)', debut: '2025-09-01', fin: '2025-12-19', statut: 'Completed', examens: '2025-12-08 - 2025-12-18' },
    { nom: 'Term 2 (Deuxième Trimestre)', debut: '2026-01-05', fin: '2026-03-27', statut: 'Active Current', examens: '2026-03-16 - 2026-03-26' },
    { nom: 'Term 3 (Troisième Trimestre - Brevet & Bac)', debut: '2026-04-13', fin: '2026-06-26', statut: 'Upcoming', examens: '2026-06-15 - 2026-06-25' },
  ]);

  const [classesList] = useState([
    // Collège (6e à 3e)
    { nom: '6e A', cycle: 'Collège', section: 'Sixième A (Grade 6)', capacite: 32, effectif: 30, tuteur: 'Sarah Jenkins', salle: 'Room 101' },
    { nom: '6e B', cycle: 'Collège', section: 'Sixième B (Grade 6)', capacite: 32, effectif: 29, tuteur: 'M. Jean-Paul Durand', salle: 'Room 102' },
    { nom: '5e A', cycle: 'Collège', section: 'Cinquième A (Grade 7)', capacite: 32, effectif: 28, tuteur: 'Mme Helene Bamba', salle: 'Room 103' },
    { nom: '5e B', cycle: 'Collège', section: 'Cinquième B (Grade 7)', capacite: 32, effectif: 28, tuteur: 'Sarah Jenkins', salle: 'Room 104' },
    { nom: '4e A', cycle: 'Collège', section: 'Quatrième A (Grade 8)', capacite: 30, effectif: 27, tuteur: 'Dr. Robert Chen', salle: 'Room 201' },
    { nom: '3e A', cycle: 'Collège', section: 'Troisième A (Grade 9 - Examen Brevet)', capacite: 30, effectif: 28, tuteur: 'Prof. Evelyn Reed', salle: 'Room 204' },
    
    // Lycée (2nde à Terminale)
    { nom: '2nde A', cycle: 'Lycée', section: 'Seconde Générale & Littéraire (Grade 10)', capacite: 30, effectif: 28, tuteur: 'Sarah Jenkins', salle: 'Room 301' },
    { nom: '2nde C', cycle: 'Lycée', section: 'Seconde Scientifique & STEM (Grade 10)', capacite: 30, effectif: 29, tuteur: 'Dr. Robert Chen', salle: 'Science Lab A' },
    { nom: '1ère A', cycle: 'Lycée', section: 'Première Littéraire A (Grade 11)', capacite: 28, effectif: 24, tuteur: 'M. Jean-Paul Durand', salle: 'Room 303' },
    { nom: '1ère C', cycle: 'Lycée', section: 'Première Mathématiques C (Grade 11)', capacite: 28, effectif: 26, tuteur: 'Prof. Evelyn Reed', salle: 'Room 302' },
    { nom: '1ère D', cycle: 'Lycée', section: 'Première Biologie & SVT D (Grade 11)', capacite: 28, effectif: 25, tuteur: 'Mme Helene Bamba', salle: 'Science Lab B' },
    { nom: 'Tle A', cycle: 'Lycée', section: 'Terminale Littéraire A (Grade 12 - Bac)', capacite: 28, effectif: 22, tuteur: 'Sarah Jenkins', salle: 'Lecture Hall 2' },
    { nom: 'Tle C', cycle: 'Lycée', section: 'Terminale Mathématiques C (Grade 12 - Bac)', capacite: 26, effectif: 24, tuteur: 'Prof. Evelyn Reed', salle: 'Lecture Hall 1' },
    { nom: 'Tle D', cycle: 'Lycée', section: 'Terminale Biologie & SVT D (Grade 12 - Bac)', capacite: 26, effectif: 23, tuteur: 'Dr. Robert Chen', salle: 'Amphi Sciences' },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900">Secondary Academic Structure & Curricular Planning (6e à Terminale)</h3>
        <p className="text-xs text-slate-500">Configure academic terms, exam schedules, class cohorts from 6ème to Terminale, and faculty assignments.</p>
      </div>

      {/* Terms & Exam Periods */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {trimestres.map((t) => (
          <div key={t.nom} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">{t.nom}</span>
              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                t.statut === 'Active Current' ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-600'
              }`}>
                {t.statut}
              </span>
            </div>
            <div className="mt-3 text-xs text-slate-600 space-y-1">
              <p>Period: <strong className="text-slate-800">{t.debut} to {t.fin}</strong></p>
              <p>Examinations: <span className="font-semibold text-red-600">{t.examens}</span></p>
            </div>
          </div>
        ))}
      </div>

      {/* Cohorts and Class Allocations */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <span className="text-sm font-bold text-slate-900">Secondary Class Cohorts (Collège & Lycée: 6e to Terminale)</span>
          <span className="text-xs font-bold text-slate-600">14 Active Cohorts &bull; 370 Enrolled</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Class Code</th>
                <th className="py-2.5 px-4">Cycle</th>
                <th className="py-2.5 px-4">Curriculum Track</th>
                <th className="py-2.5 px-4">Homeroom Tutor</th>
                <th className="py-2.5 px-4">Assigned Venue</th>
                <th className="py-2.5 px-4">Enrolled / Cap</th>
                <th className="py-2.5 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {classesList.map((c) => (
                <tr key={c.nom} className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-4 font-bold text-slate-900">{c.nom}</td>
                  <td className="py-2.5 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      c.cycle === 'Collège' ? 'bg-sky-50 text-sky-700' : 'bg-purple-50 text-purple-700'
                    }`}>
                      {c.cycle}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-slate-600">{c.section}</td>
                  <td className="py-2.5 px-4 font-semibold text-slate-800">{c.tuteur}</td>
                  <td className="py-2.5 px-4 text-slate-600">{c.salle}</td>
                  <td className="py-2.5 px-4 font-bold text-slate-900">{c.effectif} / {c.capacite}</td>
                  <td className="py-2.5 px-4 text-right">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                      Operational
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
