import React from 'react';
import { Filter } from 'lucide-react';
import { NoteEleve } from '../../modeles/types';
import { utiliserAcademie } from '../../controleurs/contexteAcademie';

interface ProprietesTableauNotes {
  notes: NoteEleve[];
  classeSelectionnee: string;
  surChangementClasse: (classe: string) => void;
}

export const TableauNotes: React.FC<ProprietesTableauNotes> = ({
  notes,
  classeSelectionnee,
  surChangementClasse,
}) => {
  const { traduire } = utiliserAcademie();

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-900">{traduire('registreNotes')}</h2>
          <p className="text-xs text-slate-500">{traduire('registreNotesDesc')}</p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={classeSelectionnee}
            onChange={(e) => surChangementClasse(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-semibold focus:outline-none"
          >
            <option value="All">{traduire('toutesLesClasses')}</option>
            <option value="Grade 11-A">Grade 11-A</option>
            <option value="Grade 10-B">Grade 10-B</option>
            <option value="Grade 12-A">Grade 12-A</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-100">
            <tr>
              <th className="px-6 py-3.5">{traduire('nomEleve')}</th>
              <th className="px-6 py-3.5">{traduire('classe')}</th>
              <th className="px-6 py-3.5">{traduire('matiereEtTitre')}</th>
              <th className="px-6 py-3.5">{traduire('note')}</th>
              <th className="px-6 py-3.5">{traduire('date')}</th>
              <th className="px-6 py-3.5">{traduire('appreciation')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800">
            {notes.map((note) => {
              const pourcentage = Math.round((note.noteObtenue / note.noteMaximale) * 100);
              return (
                <tr key={note.identifiant} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">{note.nomEleve}</td>
                  <td className="px-6 py-4 text-slate-600">{note.classe}</td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900">{note.matiere}</div>
                    <div className="text-[11px] text-slate-500">{note.titreEvaluation}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 font-bold text-slate-900">
                      {note.noteObtenue}/{note.noteMaximale}
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                          pourcentage >= 80
                            ? 'bg-emerald-50 text-emerald-700'
                            : pourcentage >= 60
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-red-50 text-red-700'
                        }`}
                      >
                        {pourcentage}%
                      </span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{note.dateEvaluation}</td>
                  <td className="px-6 py-4 text-slate-600 italic">
                    {note.commentaire || traduire('aucuneAppreciation')}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
