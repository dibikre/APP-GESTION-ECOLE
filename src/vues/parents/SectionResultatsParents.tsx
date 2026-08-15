import React from 'react';
import { NoteEleve } from '../../modeles/types';
import { utiliserAcademie } from '../../controleurs/contexteAcademie';

interface ProprietesSectionResultatsParents {
  notesEleve: NoteEleve[];
}

export const SectionResultatsParents: React.FC<ProprietesSectionResultatsParents> = ({ notesEleve }) => {
  const { traduire } = utiliserAcademie();

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
      <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
        {traduire('derniersResultats')}
      </h2>
      <div className="divide-y divide-slate-100 mt-2">
        {notesEleve.length === 0 ? (
          <p className="text-xs text-slate-500 py-4">{traduire('aucuneAppreciation')}</p>
        ) : (
          notesEleve.map((note) => (
            <div key={note.identifiant} className="py-3 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-900">{note.matiere}</h3>
                <p className="text-[11px] text-slate-500">{note.titreEvaluation}</p>
                {note.commentaire && (
                  <p className="text-[11px] text-slate-600 italic mt-0.5">"{note.commentaire}"</p>
                )}
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-slate-900">
                  {note.noteObtenue} / {note.noteMaximale}
                </span>
                <span className="text-[10px] text-slate-600 block">{note.dateEvaluation}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
