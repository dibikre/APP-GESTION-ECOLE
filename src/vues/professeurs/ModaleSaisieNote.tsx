import React, { useState } from 'react';
import { ModaleFormulaire } from '../../composants/communs/ModaleFormulaire';
import { Eleve } from '../../modeles/types';
import { utiliserAcademie } from '../../controleurs/contexteAcademie';

interface ProprietesModaleSaisieNote {
  ouvert: boolean;
  surFermeture: () => void;
  listeEleves: Eleve[];
}

export const ModaleSaisieNote: React.FC<ProprietesModaleSaisieNote> = ({
  ouvert,
  surFermeture,
  listeEleves,
}) => {
  const { ajouterNote, traduire } = utiliserAcademie();

  const [formulaire, setFormulaire] = useState({
    identifiantEleve: listeEleves[0]?.identifiant || '',
    matiere: 'Advanced Mathematics',
    titreEvaluation: 'Term 2 Quiz 1',
    noteObtenue: 85,
    noteMaximale: 100,
    commentaire: '',
  });

  const soumettre = (e: React.FormEvent) => {
    e.preventDefault();
    const eleve = listeEleves.find((el) => el.identifiant === formulaire.identifiantEleve);
    if (!eleve) return;

    ajouterNote({
      identifiantEleve: eleve.identifiant,
      nomEleve: eleve.nomComplet,
      classe: eleve.classe,
      matiere: formulaire.matiere,
      titreEvaluation: formulaire.titreEvaluation,
      noteObtenue: Number(formulaire.noteObtenue),
      noteMaximale: Number(formulaire.noteMaximale),
      dateEvaluation: new Date().toISOString().split('T')[0],
      commentaire: formulaire.commentaire,
    });

    surFermeture();
  };

  return (
    <ModaleFormulaire
      ouvert={ouvert}
      surFermeture={surFermeture}
      titre={traduire('saisirNote')}
      sousTitre={traduire('registreNotesDesc')}
      texteBoutonValidation={traduire('enregistrer')}
      surValidation={soumettre}
    >
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-semibold text-slate-900 mb-1">{traduire('nomEleve')}</label>
          <select
            value={formulaire.identifiantEleve}
            onChange={(e) => setFormulaire({ ...formulaire, identifiantEleve: e.target.value })}
            className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
          >
            {listeEleves.map((el) => (
              <option key={el.identifiant} value={el.identifiant}>
                {el.nomComplet} ({el.classe}) - {el.matricule}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-900 mb-1">{traduire('matiereEtTitre')}</label>
          <input
            type="text"
            value={formulaire.matiere}
            onChange={(e) => setFormulaire({ ...formulaire, matiere: e.target.value })}
            className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-900 mb-1">Evaluation Title</label>
          <input
            type="text"
            value={formulaire.titreEvaluation}
            onChange={(e) => setFormulaire({ ...formulaire, titreEvaluation: e.target.value })}
            className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1">{traduire('note')}</label>
            <input
              type="number"
              min="0"
              max={formulaire.noteMaximale}
              value={formulaire.noteObtenue}
              onChange={(e) => setFormulaire({ ...formulaire, noteObtenue: Number(e.target.value) })}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1">Max</label>
            <input
              type="number"
              min="1"
              value={formulaire.noteMaximale}
              onChange={(e) => setFormulaire({ ...formulaire, noteMaximale: Number(e.target.value) })}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-900 mb-1">{traduire('appreciation')}</label>
          <textarea
            rows={2}
            value={formulaire.commentaire}
            onChange={(e) => setFormulaire({ ...formulaire, commentaire: e.target.value })}
            className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
            placeholder="Feedback..."
          />
        </div>
      </div>
    </ModaleFormulaire>
  );
};
