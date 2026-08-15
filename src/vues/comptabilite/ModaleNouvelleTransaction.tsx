import React, { useState } from 'react';
import { ModaleFormulaire } from '../../composants/communs/ModaleFormulaire';
import { utiliserAcademie } from '../../controleurs/contexteAcademie';

interface ProprietesModaleNouvelleTransaction {
  ouvert: boolean;
  surFermeture: () => void;
}

export const ModaleNouvelleTransaction: React.FC<ProprietesModaleNouvelleTransaction> = ({
  ouvert,
  surFermeture,
}) => {
  const { ajouterTransaction, traduire } = utiliserAcademie();

  const [formulaire, setFormulaire] = useState({
    type: 'depense' as 'revenu' | 'depense',
    categorie: 'equipements' as 'frais_scolaires' | 'salaires' | 'equipements' | 'maintenance' | 'activites',
    description: '',
    montant: 1200,
    beneficiaire: '',
    dateTransaction: new Date().toISOString().split('T')[0],
  });

  const soumettre = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formulaire.description || !formulaire.beneficiaire) return;

    ajouterTransaction({
      type: formulaire.type,
      categorie: formulaire.categorie,
      description: formulaire.description,
      montant: Number(formulaire.montant),
      dateTransaction: formulaire.dateTransaction,
      beneficiaire: formulaire.beneficiaire,
    });

    surFermeture();
  };

  return (
    <ModaleFormulaire
      ouvert={ouvert}
      surFermeture={surFermeture}
      titre={traduire('enregistrerTransaction')}
      sousTitre="General ledger entry"
      texteBoutonValidation={traduire('enregistrer')}
      surValidation={soumettre}
    >
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1">{traduire('type')}</label>
            <select
              value={formulaire.type}
              onChange={(e) => setFormulaire({ ...formulaire, type: e.target.value as any })}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
            >
              <option value="depense">{traduire('depense')}</option>
              <option value="revenu">{traduire('revenu')}</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1">{traduire('categorie')}</label>
            <select
              value={formulaire.categorie}
              onChange={(e) => setFormulaire({ ...formulaire, categorie: e.target.value as any })}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
            >
              <option value="equipements">Educational Equipment</option>
              <option value="salaires">Payroll</option>
              <option value="maintenance">Campus Maintenance</option>
              <option value="frais_scolaires">Tuition Collection</option>
              <option value="activites">Clubs & Sports</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-900 mb-1">Description</label>
          <input
            type="text"
            value={formulaire.description}
            onChange={(e) => setFormulaire({ ...formulaire, description: e.target.value })}
            placeholder="e.g. Science lab chemical supplies"
            className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1">{traduire('montant')} ($)</label>
            <input
              type="number"
              min="1"
              value={formulaire.montant}
              onChange={(e) => setFormulaire({ ...formulaire, montant: Number(e.target.value) })}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1">Payee / Beneficiary</label>
            <input
              type="text"
              value={formulaire.beneficiaire}
              onChange={(e) => setFormulaire({ ...formulaire, beneficiaire: e.target.value })}
              placeholder="Vendor name"
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
              required
            />
          </div>
        </div>
      </div>
    </ModaleFormulaire>
  );
};
