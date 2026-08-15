import React, { useState } from 'react';
import { ModaleFormulaire } from '../../composants/communs/ModaleFormulaire';
import { utiliserAcademie } from '../../controleurs/contexteAcademie';

interface ProprietesModaleNouvelleAnnonce {
  ouvert: boolean;
  surFermeture: () => void;
}

export const ModaleNouvelleAnnonce: React.FC<ProprietesModaleNouvelleAnnonce> = ({
  ouvert,
  surFermeture,
}) => {
  const { publierAnnonce, traduire } = utiliserAcademie();

  const [formulaire, setFormulaire] = useState({
    titre: '',
    contenu: '',
    auteurNom: 'Julian Mercer (Communications Director)',
    cible: 'tous' as 'tous' | 'professeurs' | 'eleves' | 'parents' | 'personnel',
    priorite: 'normale' as 'normale' | 'importante' | 'urgente',
  });

  const soumettre = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formulaire.titre || !formulaire.contenu) return;

    publierAnnonce({
      titre: formulaire.titre,
      contenu: formulaire.contenu,
      auteurNom: formulaire.auteurNom,
      cible: formulaire.cible,
      priorite: formulaire.priorite,
    });

    setFormulaire({
      titre: '',
      contenu: '',
      auteurNom: 'Julian Mercer (Communications Director)',
      cible: 'tous',
      priorite: 'normale',
    });

    surFermeture();
  };

  return (
    <ModaleFormulaire
      ouvert={ouvert}
      surFermeture={surFermeture}
      titre={traduire('publierAnnonce')}
      sousTitre="Broadcast official statement to selected recipients"
      texteBoutonValidation={traduire('enregistrer')}
      surValidation={soumettre}
    >
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-semibold text-slate-900 mb-1">{traduire('titre')}</label>
          <input
            type="text"
            value={formulaire.titre}
            onChange={(e) => setFormulaire({ ...formulaire, titre: e.target.value })}
            placeholder="e.g. Science Fair Registration Deadline"
            className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1">{traduire('destinataire')}</label>
            <select
              value={formulaire.cible}
              onChange={(e) =>
                setFormulaire({ ...formulaire, cible: e.target.value as any })
              }
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
            >
              <option value="tous">All Campus (Everyone)</option>
              <option value="parents">Parents & Guardians</option>
              <option value="eleves">Enrolled Students</option>
              <option value="professeurs">Faculty Members</option>
              <option value="personnel">Administrative Staff</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1">{traduire('priorite')}</label>
            <select
              value={formulaire.priorite}
              onChange={(e) =>
                setFormulaire({ ...formulaire, priorite: e.target.value as any })
              }
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
            >
              <option value="normale">Normal</option>
              <option value="importante">Important Circular</option>
              <option value="urgente">Urgent Alert</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-900 mb-1">Content</label>
          <textarea
            rows={4}
            value={formulaire.contenu}
            onChange={(e) => setFormulaire({ ...formulaire, contenu: e.target.value })}
            placeholder="Write announcement..."
            className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
            required
          />
        </div>
      </div>
    </ModaleFormulaire>
  );
};
