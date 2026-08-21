import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Building,
  Plus,
  BookOpen,
} from 'lucide-react';
import { BoutonRouge } from '../../../composants/communs/BoutonRouge';
import { utiliserAcademie } from '../../../controleurs/contexteAcademie';

export const OngletSecretaireGestionScolaire: React.FC = () => {
  const { listeCoursHoraires } = utiliserAcademie();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Academic Timetable & Classroom Allocation</h3>
          <p className="text-xs text-slate-500">Configure lecture time blocks, prevent room scheduling conflicts, and manage hall capacity.</p>
        </div>
        <BoutonRouge
          texte="Add Course Schedule"
          icone={Plus}
          onClick={() => alert('Opening Timetable Period Editor...')}
        />
      </div>

      {/* Classroom Utilization Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block">Classroom Utilization</span>
          <span className="text-xl font-bold text-slate-900 mt-1 block">88.4% Efficiency</span>
          <span className="text-[11px] text-emerald-700 font-semibold mt-0.5 block">0 Scheduling overlaps</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block">Active Teaching Venues</span>
          <span className="text-xl font-bold text-red-600 mt-1 block">12 Laboratories & Halls</span>
          <span className="text-[11px] text-slate-500 mt-0.5 block">Main Campus & Science Wing</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block">Weekly Scheduled Periods</span>
          <span className="text-xl font-bold text-slate-900 mt-1 block">142 Periods</span>
          <span className="text-[11px] text-slate-500 mt-0.5 block">Monday to Friday (08:00 - 17:00)</span>
        </div>
      </div>

      {/* Timetable Ledger */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <span className="text-sm font-bold text-slate-900">Master Class Scheduling Ledger</span>
          <span className="text-xs font-bold text-slate-600">Active Academic Calendar</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Day</th>
                <th className="py-2.5 px-4">Time Slot</th>
                <th className="py-2.5 px-4">Subject</th>
                <th className="py-2.5 px-4">Class</th>
                <th className="py-2.5 px-4">Instructor</th>
                <th className="py-2.5 px-4 text-right">Venue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {listeCoursHoraires.map((c) => (
                <tr key={c.identifiant} className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-4 font-bold text-slate-900">{c.jourSemaine}</td>
                  <td className="py-2.5 px-4 font-bold text-red-600">{c.heureDebut} - {c.heureFin}</td>
                  <td className="py-2.5 px-4 font-bold text-slate-900">{c.matiere}</td>
                  <td className="py-2.5 px-4 text-slate-600">{c.classe}</td>
                  <td className="py-2.5 px-4 text-slate-700">{c.professeurNom}</td>
                  <td className="py-2.5 px-4 text-right font-semibold text-slate-800">{c.salle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
