import React, { useState } from 'react';
import {
  FileText,
  Award,
  Plus,
  Save,
  CheckCircle,
  FileSpreadsheet,
} from '../../../composants/communs/IconesAcademie';
import { BoutonRouge } from '../../../composants/communs/BoutonRouge';
import { utiliserAcademie } from '../../../controleurs/contexteAcademie';

export const OngletProfEvaluationNotes: React.FC = () => {
  const { listeEleves, listeNotes, ajouterNote } = utiliserAcademie();

  const [formulaireOuvert, setFormulaireOuvert] = useState(false);
  const [eleveSelectionne, setEleveSelectionne] = useState(listeEleves[0]?.nomComplet || '');
  const [typeEval, setTypeEval] = useState<'CC1' | 'CC2' | 'CC3' | 'Examen' | 'TP' | 'Projet'>('CC1');
  const [titreEval, setTitreEval] = useState('Continuous Assessment Quiz 1');
  const [noteObtenue, setNoteObtenue] = useState(18);
  const [noteMaximale, setNoteMaximale] = useState(20);
  const [commentaire, setCommentaire] = useState('Excellent mathematical reasoning.');

  const soumettreNote = (e: React.FormEvent) => {
    e.preventDefault();
    const eleve = listeEleves.find((el) => el.nomComplet === eleveSelectionne) || listeEleves[0];
    ajouterNote({
      identifiantEleve: eleve.identifiant,
      nomEleve: eleve.nomComplet,
      classe: eleve.classe,
      matiere: 'Advanced Mathematics',
      titreEvaluation: `${typeEval}: ${titreEval}`,
      typeEvaluation: typeEval,
      noteObtenue,
      noteMaximale,
      dateEvaluation: new Date().toISOString().split('T')[0],
      commentaire,
    });
    setFormulaireOuvert(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Grading Ledger & Academic Evaluation</h3>
          <p className="text-xs text-slate-500">Record assessment scores (CC1, CC2, CC3, Midterm, Lab), compute weighted averages.</p>
        </div>
        <div className="flex items-center gap-2">
          <BoutonRouge
            texte="Enter Assessment Marks"
            icone={Plus}
            onClick={() => setFormulaireOuvert(!formulaireOuvert)}
          />
        </div>
      </div>

      {formulaireOuvert && (
        <form onSubmit={soumettreNote} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <h4 className="text-sm font-bold text-slate-900">Record New Assessment Grade</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block">Select Student</label>
              <select
                value={eleveSelectionne}
                onChange={(e) => setEleveSelectionne(e.target.value)}
                className="w-full mt-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              >
                {listeEleves.map((el) => (
                  <option key={el.identifiant} value={el.nomComplet}>
                    {el.nomComplet} ({el.classe})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block">Assessment Type</label>
              <select
                value={typeEval}
                onChange={(e) => setTypeEval(e.target.value as any)}
                className="w-full mt-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              >
                <option value="CC1">CC1 (Continuous Assessment 1)</option>
                <option value="CC2">CC2 (Continuous Assessment 2)</option>
                <option value="CC3">CC3 (Continuous Assessment 3)</option>
                <option value="TP">Practical Lab (TP)</option>
                <option value="Examen">Midterm / Final Exam</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block">Score (Obtained / Max)</label>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="number"
                  value={noteObtenue}
                  onChange={(e) => setNoteObtenue(Number(e.target.value))}
                  className="w-1/2 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg font-bold"
                  required
                />
                <span>/</span>
                <input
                  type="number"
                  value={noteMaximale}
                  onChange={(e) => setNoteMaximale(Number(e.target.value))}
                  className="w-1/2 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg font-bold"
                  required
                />
              </div>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 block">Pedagogical Feedback / Remarks</label>
            <input
              type="text"
              value={commentaire}
              onChange={(e) => setCommentaire(e.target.value)}
              placeholder="e.g. Mastered integration techniques. Ready for Olympiad."
              className="w-full mt-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
            />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <BoutonRouge texte="Cancel" variante="secondaire" taille="petit" onClick={() => setFormulaireOuvert(false)} />
            <BoutonRouge texte="Save Mark" taille="petit" type="submit" />
          </div>
        </form>
      )}

      {/* Grade Ledger Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <span className="text-sm font-bold text-slate-900">Continuous Assessment Marks ({listeNotes.length})</span>
          <span className="text-xs font-bold text-slate-600">Advanced Mathematics &bull; Term 2</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Student & Class</th>
                <th className="py-2.5 px-4">Assessment Title</th>
                <th className="py-2.5 px-4">Date</th>
                <th className="py-2.5 px-4">Score</th>
                <th className="py-2.5 px-4">Feedback Remarks</th>
                <th className="py-2.5 px-4 text-right">Grade %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {listeNotes.map((n) => {
                const pourcentage = Math.round((n.noteObtenue / n.noteMaximale) * 100);
                return (
                  <tr key={n.identifiant} className="hover:bg-slate-50/70">
                    <td className="py-2.5 px-4 font-bold text-slate-900">{n.nomEleve} ({n.classe})</td>
                    <td className="py-2.5 px-4 text-slate-700 font-semibold">{n.titreEvaluation}</td>
                    <td className="py-2.5 px-4 text-slate-500">{n.dateEvaluation}</td>
                    <td className="py-2.5 px-4 font-extrabold text-slate-900">{n.noteObtenue} / {n.noteMaximale}</td>
                    <td className="py-2.5 px-4 text-slate-600 italic">{n.commentaire || '—'}</td>
                    <td className="py-2.5 px-4 text-right">
                      <span className="px-2 py-0.5 rounded font-extrabold bg-red-50 text-red-600 text-xs">
                        {pourcentage}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
