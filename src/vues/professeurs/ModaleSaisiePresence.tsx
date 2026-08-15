import React, { useState } from 'react';
import { ModaleFormulaire } from '../../composants/communs/ModaleFormulaire';
import { Eleve } from '../../modeles/types';
import { utiliserAcademie } from '../../controleurs/contexteAcademie';

interface ProprietesModaleSaisiePresence {
  ouvert: boolean;
  surFermeture: () => void;
  listeEleves: Eleve[];
}

export const ModaleSaisiePresence: React.FC<ProprietesModaleSaisiePresence> = ({
  ouvert,
  surFermeture,
  listeEleves,
}) => {
  const { enregistrerPresence, traduire } = utiliserAcademie();

  const [formulaire, setFormulaire] = useState({
    identifiantEleve: listeEleves[0]?.identifiant || '',
    date: new Date().toISOString().split('T')[0],
    statut: 'present' as 'present' | 'absent' | 'retard' | 'justifie',
    remarque: '',
  });

  const soumettre = (e: React.FormEvent) => {
    e.preventDefault();
    const eleve = listeEleves.find((el) => el.identifiant === formulaire.identifiantEleve);
    if (!eleve) return;

    enregistrerPresence({
      identifiantEleve: eleve.identifiant,
      nomEleve: eleve.nomComplet,
      classe: eleve.classe,
      date: formulaire.date,
      statut: formulaire.statut,
      remarque: formulaire.remarque,
    });

    surFermeture();
  };

  return (
    <ModaleFormulaire
      ouvert={ouvert}
      surFermeture={surFermeture}
      titre={traduire('faireAppel')}
      sousTitre={traduire('presence')}
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
                {el.nomComplet} ({el.classe})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-900 mb-1">{traduire('date')}</label>
          <input
            type="date"
            value={formulaire.date}
            onChange={(e) => setFormulaire({ ...formulaire, date: e.target.value })}
            className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-900 mb-1">{traduire('statut')}</label>
          <select
            value={formulaire.statut}
            onChange={(e) =>
              setFormulaire({
                ...formulaire,
                statut: e.target.value as 'present' | 'absent' | 'retard' | 'justifie',
              })
            }
            className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
          >
            <option value="present">Present</option>
            <option value="retard">Late / Retard</option>
            <option value="absent">Absent</option>
            <option value="justifie">Excused / Justifié</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-900 mb-1">{traduire('appreciation')}</label>
          <input
            type="text"
            value={formulaire.remarque}
            onChange={(e) => setFormulaire({ ...formulaire, remarque: e.target.value })}
            className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
            placeholder="Observation..."
          />
        </div>
      </div>
    </ModaleFormulaire>
  );
};
