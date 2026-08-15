import React, { useState } from 'react';
import { ModaleFormulaire } from '../../composants/communs/ModaleFormulaire';
import { utiliserAcademie } from '../../controleurs/contexteAcademie';

interface ProprietesModaleAjoutLivre {
  ouvert: boolean;
  surFermeture: () => void;
}

export const ModaleAjoutLivre: React.FC<ProprietesModaleAjoutLivre> = ({
  ouvert,
  surFermeture,
}) => {
  const { ajouterLivre, traduire } = utiliserAcademie();

  const [formulaire, setFormulaire] = useState({
    isbn: '',
    titre: '',
    auteur: '',
    categorie: 'STEM & Science',
    exemplairesTotal: 5,
    emplacement: 'Shelf A-01',
  });

  const soumettre = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formulaire.titre || !formulaire.auteur) return;

    ajouterLivre({
      isbn: formulaire.isbn || `978-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      titre: formulaire.titre,
      auteur: formulaire.auteur,
      categorie: formulaire.categorie,
      exemplairesTotal: Number(formulaire.exemplairesTotal),
      exemplairesDisponibles: Number(formulaire.exemplairesTotal),
      emplacement: formulaire.emplacement,
    });

    surFermeture();
  };

  return (
    <ModaleFormulaire
      ouvert={ouvert}
      surFermeture={surFermeture}
      titre={traduire('ajouterLivre')}
      sousTitre="Catalog new title"
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
            placeholder="e.g. Principia Mathematica"
            className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-900 mb-1">{traduire('auteur')}</label>
          <input
            type="text"
            value={formulaire.auteur}
            onChange={(e) => setFormulaire({ ...formulaire, auteur: e.target.value })}
            placeholder="e.g. Isaac Newton"
            className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1">{traduire('categorie')}</label>
            <select
              value={formulaire.categorie}
              onChange={(e) => setFormulaire({ ...formulaire, categorie: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
            >
              <option value="STEM & Science">STEM & Science</option>
              <option value="History & Humanities">History & Humanities</option>
              <option value="Literature & Fiction">Literature & Fiction</option>
              <option value="Computer Science">Computer Science</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1">{traduire('nombreTotalExemplaires')}</label>
            <input
              type="number"
              min="1"
              value={formulaire.exemplairesTotal}
              onChange={(e) =>
                setFormulaire({
                  ...formulaire,
                  exemplairesTotal: Number(e.target.value),
                })
              }
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
              required
            />
          </div>
        </div>
      </div>
    </ModaleFormulaire>
  );
};
