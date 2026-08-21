import React, { useState } from 'react';
import {
  Users,
  BookOpen,
  GraduationCap,
  Download,
  Mail,
  Phone,
  Search,
} from 'lucide-react';
import { utiliserAcademie } from '../../../controleurs/contexteAcademie';
import { CLASSES_SECONDAIRE } from '../../../modeles/classesAcademiques';

export const OngletProfMesClasses: React.FC = () => {
  const { listeEleves } = utiliserAcademie();
  const [classeSelectionnee, setClasseSelectionnee] = useState('1ère C');
  const [recherche, setRecherche] = useState('');

  const elevesFiltres = listeEleves.filter(
    (e) =>
      e.classe === classeSelectionnee &&
      (e.nomComplet.toLowerCase().includes(recherche.toLowerCase()) ||
        e.matricule.toLowerCase().includes(recherche.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">My Assigned Cohorts & Student Directory (6e à Terminale)</h3>
          <p className="text-xs text-slate-500">Access student identity profiles, guardian contacts, and class rosters across secondary levels.</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={classeSelectionnee}
            onChange={(e) => setClasseSelectionnee(e.target.value)}
            className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg font-bold text-slate-800"
          >
            <optgroup label="Cycle Collège (6e - 3e)">
              {CLASSES_SECONDAIRE.filter(c => c.cycle === 'college').map(c => (
                <option key={c.code} value={c.code}>{c.nomCourt} - {c.nomComplet}</option>
              ))}
            </optgroup>
            <optgroup label="Cycle Lycée (2nde - Terminale)">
              {CLASSES_SECONDAIRE.filter(c => c.cycle === 'lycee').map(c => (
                <option key={c.code} value={c.code}>{c.nomCourt} - {c.nomComplet}</option>
              ))}
            </optgroup>
          </select>
        </div>
      </div>


      {/* Class Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block">Class Enrollment</span>
          <span className="text-xl font-bold text-slate-900 mt-1 block">28 Students</span>
          <span className="text-[11px] text-emerald-700 font-semibold mt-0.5 block">100% Active attendance</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block">Subject Curriculum</span>
          <span className="text-xl font-bold text-red-600 mt-1 block">Advanced Mathematics</span>
          <span className="text-[11px] text-slate-500 mt-0.5 block">Room 302 &bull; 6h / week</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block">Term 2 Progress</span>
          <span className="text-xl font-bold text-slate-900 mt-1 block">85% Syllabus Complete</span>
          <span className="text-[11px] text-slate-500 mt-0.5 block">Chapter 7: Differential Equations</span>
        </div>
      </div>

      {/* Student Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-sm font-bold text-slate-900">Student Roll for {classeSelectionnee}</span>
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              placeholder="Search student or ID..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Student Name & ID</th>
                <th className="py-2.5 px-4">Birthdate</th>
                <th className="py-2.5 px-4">Guardian Contact</th>
                <th className="py-2.5 px-4">Academic GPA</th>
                <th className="py-2.5 px-4">Attendance</th>
                <th className="py-2.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {elevesFiltres.map((el) => (
                <tr key={el.identifiant} className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-4">
                    <span className="font-bold text-slate-900 block">{el.nomComplet}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{el.matricule}</span>
                  </td>
                  <td className="py-2.5 px-4 text-slate-600">{el.dateNaissance}</td>
                  <td className="py-2.5 px-4">
                    <span className="font-semibold text-slate-800 block">{el.nomParent}</span>
                    <span className="text-[10px] text-slate-500">{el.telephoneParent}</span>
                  </td>
                  <td className="py-2.5 px-4 font-extrabold text-red-600">{el.moyenneGenerale}%</td>
                  <td className="py-2.5 px-4 font-bold text-emerald-700">{el.tauxPresence}%</td>
                  <td className="py-2.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => alert(`Opening student portfolio for ${el.nomComplet}`)}
                      className="text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer"
                    >
                      View Profile
                    </button>
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
