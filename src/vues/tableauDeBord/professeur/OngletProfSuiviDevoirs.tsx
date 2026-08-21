import React, { useState } from 'react';
import {
  CalendarCheck,
  FileCheck,
  AlertCircle,
  Plus,
  Check,
  X,
  Clock,
} from 'lucide-react';
import { BoutonRouge } from '../../../composants/communs/BoutonRouge';
import { utiliserAcademie } from '../../../controleurs/contexteAcademie';

export const OngletProfSuiviDevoirs: React.FC = () => {
  const { listeDevoirs, ajouterDevoir, listeEleves, listePresences, enregistrerPresence } = utiliserAcademie();

  const [formulaireDevoir, setFormulaireDevoir] = useState(false);
  const [titreDevoir, setTitreDevoir] = useState('');
  const [description, setDescription] = useState('');
  const [echeance, setEcheance] = useState('2026-03-15');

  const soumettreDevoir = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titreDevoir) return;
    ajouterDevoir({
      matiere: 'Advanced Mathematics',
      classe: 'Grade 11-A',
      titre: titreDevoir,
      description,
      dateEcheance: echeance,
      soumissionsTotal: 0,
      effectifClasse: 28,
    });
    setTitreDevoir('');
    setDescription('');
    setFormulaireDevoir(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Student Roll-Call & Homework Assignments</h3>
          <p className="text-xs text-slate-500">Record daily classroom attendance, log tardiness, and assign problem sets.</p>
        </div>
        <BoutonRouge
          texte="Assign Homework"
          icone={Plus}
          onClick={() => setFormulaireDevoir(!formulaireDevoir)}
        />
      </div>

      {formulaireDevoir && (
        <form onSubmit={soumettreDevoir} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <h4 className="text-sm font-bold text-slate-900">Create New Homework Assignment</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block">Assignment Title</label>
              <input
                type="text"
                value={titreDevoir}
                onChange={(e) => setTitreDevoir(e.target.value)}
                placeholder="e.g. Calculus: Matrix Inversions & Eigenvalues"
                className="w-full mt-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block">Due Date</label>
              <input
                type="date"
                value={echeance}
                onChange={(e) => setEcheance(e.target.value)}
                className="w-full mt-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                required
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 block">Instructions & Textbook References</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Specify problem numbers, submission criteria, format..."
              className="w-full mt-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              rows={2}
            />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <BoutonRouge texte="Cancel" variante="secondaire" taille="petit" onClick={() => setFormulaireDevoir(false)} />
            <BoutonRouge texte="Publish Assignment" taille="petit" type="submit" />
          </div>
        </form>
      )}

      {/* Homework Submissions Tracker */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {listeDevoirs.map((dev) => {
          const ratio = Math.round((dev.soumissionsTotal / dev.effectifClasse) * 100);
          return (
            <div key={dev.identifiant} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{dev.titre}</span>
                  <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                    Due: {dev.dateEcheance}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mt-2">{dev.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500 font-medium">Submissions:</span>{' '}
                  <strong className="text-slate-900">{dev.soumissionsTotal} / {dev.effectifClasse}</strong> ({ratio}%)
                </div>
                <button
                  type="button"
                  onClick={() => alert(`Reviewing student submissions for ${dev.titre}`)}
                  className="text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer"
                >
                  Review Papers
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Roll-Call Attendance */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <h4 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
          Today's Attendance Roll-Call (Grade 11-A)
        </h4>
        <div className="divide-y divide-slate-100 mt-2">
          {listeEleves.slice(0, 4).map((el) => (
            <div key={el.identifiant} className="py-2.5 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-900">{el.nomComplet}</span>
                <span className="text-slate-500 text-[11px] block">{el.matricule}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => enregistrerPresence({ identifiantEleve: el.identifiant, nomEleve: el.nomComplet, classe: el.classe, date: '2026-03-03', statut: 'present' })}
                  className="px-2 py-1 bg-emerald-50 text-emerald-700 font-bold rounded text-xs hover:bg-emerald-100 cursor-pointer"
                >
                  Present
                </button>
                <button
                  type="button"
                  onClick={() => enregistrerPresence({ identifiantEleve: el.identifiant, nomEleve: el.nomComplet, classe: el.classe, date: '2026-03-03', statut: 'retard' })}
                  className="px-2 py-1 bg-amber-50 text-amber-800 font-bold rounded text-xs hover:bg-amber-100 cursor-pointer"
                >
                  Late
                </button>
                <button
                  type="button"
                  onClick={() => enregistrerPresence({ identifiantEleve: el.identifiant, nomEleve: el.nomComplet, classe: el.classe, date: '2026-03-03', statut: 'absent' })}
                  className="px-2 py-1 bg-red-50 text-red-700 font-bold rounded text-xs hover:bg-red-100 cursor-pointer"
                >
                  Absent
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
