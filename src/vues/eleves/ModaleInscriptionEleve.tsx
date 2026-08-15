import React, { useState } from 'react';
import { ModaleFormulaire } from '../../composants/communs/ModaleFormulaire';
import { utiliserAcademie } from '../../controleurs/contexteAcademie';
import { CLASSES_SECONDAIRE } from '../../modeles/classesAcademiques';

interface ProprietesModaleInscriptionEleve {
  ouvert: boolean;
  surFermeture: () => void;
}

export const ModaleInscriptionEleve: React.FC<ProprietesModaleInscriptionEleve> = ({
  ouvert,
  surFermeture,
}) => {
  const { ajouterEleve, traduire } = utiliserAcademie();

  const [formulaire, setFormulaire] = useState({
    nomComplet: '',
    classe: '6e A',
    dateNaissance: '2014-05-15',
    courriel: '',
    telephoneParent: '',
    nomParent: '',
    statutFrais: 'paye' as 'paye' | 'partiel' | 'en_retard',
    moyenneGenerale: 85.0,
    tauxPresence: 95.0,
  });

  const soumettre = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formulaire.nomComplet || !formulaire.courriel) return;

    ajouterEleve({
      nomComplet: formulaire.nomComplet,
      classe: formulaire.classe,
      dateNaissance: formulaire.dateNaissance,
      courriel: formulaire.courriel,
      telephoneParent: formulaire.telephoneParent,
      nomParent: formulaire.nomParent,
      statutFrais: formulaire.statutFrais,
      moyenneGenerale: Number(formulaire.moyenneGenerale),
      tauxPresence: Number(formulaire.tauxPresence),
    });

    setFormulaire({
      nomComplet: '',
      classe: '6e A',
      dateNaissance: '2014-05-15',
      courriel: '',
      telephoneParent: '',
      nomParent: '',
      statutFrais: 'paye',
      moyenneGenerale: 85.0,
      tauxPresence: 95.0,
    });

    surFermeture();
  };

  const classesCollege = CLASSES_SECONDAIRE.filter((c) => c.cycle === 'college');
  const classesLycee = CLASSES_SECONDAIRE.filter((c) => c.cycle === 'lycee');

  return (
    <ModaleFormulaire
      ouvert={ouvert}
      surFermeture={surFermeture}
      titre={traduire('inscrireNouvelEleve')}
      sousTitre={traduire('descriptionEleves')}
      texteBoutonValidation={traduire('enregistrer')}
      surValidation={soumettre}
    >
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-semibold text-slate-900 mb-1">{traduire('nomEleve')}</label>
          <input
            type="text"
            value={formulaire.nomComplet}
            onChange={(e) => setFormulaire({ ...formulaire, nomComplet: e.target.value })}
            className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
            placeholder="e.g. Liam Walker"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1">{traduire('classe')}</label>
            <select
              value={formulaire.classe}
              onChange={(e) => setFormulaire({ ...formulaire, classe: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
            >
              <optgroup label="Cycle Collège (6e à 3e)">
                {classesCollege.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.nomCourt} - {c.nomComplet}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Cycle Lycée (2nde à Terminale)">
                {classesLycee.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.nomCourt} - {c.nomComplet}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1">{traduire('date')}</label>
            <input
              type="date"
              value={formulaire.dateNaissance}
              onChange={(e) => setFormulaire({ ...formulaire, dateNaissance: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-900 mb-1">Email</label>
          <input
            type="email"
            value={formulaire.courriel}
            onChange={(e) => setFormulaire({ ...formulaire, courriel: e.target.value })}
            className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
            placeholder="l.walker@student.academy.edu"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1">{traduire('contactParent')}</label>
            <input
              type="text"
              value={formulaire.nomParent}
              onChange={(e) => setFormulaire({ ...formulaire, nomParent: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
              placeholder="Parent Name"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1">Phone</label>
            <input
              type="tel"
              value={formulaire.telephoneParent}
              onChange={(e) => setFormulaire({ ...formulaire, telephoneParent: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
              placeholder="+1 (555) 000-0000"
              required
            />
          </div>
        </div>
      </div>
    </ModaleFormulaire>
  );
};

