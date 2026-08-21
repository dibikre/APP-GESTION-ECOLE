import React from 'react';
import {
  BookOpen,
  Calendar,
  Download,
  UploadCloud,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { BoutonRouge } from '../../../composants/communs/BoutonRouge';
import { utiliserAcademie } from '../../../controleurs/contexteAcademie';

export const OngletEleveCoursDevoirs: React.FC = () => {
  const { listeCoursHoraires, listeDevoirs, listeRessources } = utiliserAcademie();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900">Weekly Schedule, Course Slides & Homework</h3>
        <p className="text-xs text-slate-500">Access classroom schedules, lecture slide decks, and submit homework sets.</p>
      </div>

      {/* Weekly Timetable */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <h4 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-red-600" /> Weekly Class Timetable (Grade 11-A)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
          {listeCoursHoraires.map((c) => (
            <div key={c.identifiant} className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">{c.matiere}</span>
                <span className="font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded text-[10px]">{c.jourSemaine}</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1">{c.professeurNom} &bull; <strong className="text-slate-800">{c.salle}</strong></p>
              <span className="text-[10px] text-slate-400 mt-2 block font-semibold">{c.heureDebut} - {c.heureFin}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pending Homework */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <h4 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-red-600" /> Pending Problem Sets & Homework
        </h4>
        <div className="divide-y divide-slate-100 mt-2">
          {listeDevoirs.map((dev) => (
            <div key={dev.identifiant} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-bold text-slate-900">{dev.titre}</span> &bull; <span className="text-slate-500">{dev.matiere}</span>
                <p className="text-[11px] text-slate-600 mt-0.5">{dev.description}</p>
                <span className="text-[10px] font-bold text-red-600 mt-1 block">Due by: {dev.dateEcheance}</span>
              </div>
              <BoutonRouge
                texte="Submit Homework"
                icone={UploadCloud}
                taille="petit"
                onClick={() => alert(`Submitting document for ${dev.titre}`)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Downloadable Lecture Resources */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <h4 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-1.5">
          <Download className="w-4 h-4 text-red-600" /> Course Handouts & Slide Decks
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
          {listeRessources.map((res) => (
            <div key={res.identifiant} className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex flex-col justify-between text-xs">
              <div>
                <span className="font-bold text-slate-900 block">{res.titre}</span>
                <span className="text-[11px] text-slate-500">{res.matiere}</span>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-semibold">{res.typeFichier} &bull; {res.taille}</span>
                <button
                  type="button"
                  onClick={() => alert(`Downloading ${res.titre}`)}
                  className="text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer"
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
