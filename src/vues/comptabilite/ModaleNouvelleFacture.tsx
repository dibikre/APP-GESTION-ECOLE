import React, { useState } from 'react';
import { ModaleFormulaire } from '../../composants/communs/ModaleFormulaire';
import { Eleve } from '../../modeles/types';
import { utiliserAcademie } from '../../controleurs/contexteAcademie';

interface ProprietesModaleNouvelleFacture {
  ouvert: boolean;
  surFermeture: () => void;
  listeEleves: Eleve[];
}

export const ModaleNouvelleFacture: React.FC<ProprietesModaleNouvelleFacture> = ({
  ouvert,
  surFermeture,
  listeEleves,
}) => {
  const { ajouterFacture, traduire } = utiliserAcademie();

  const [formulaire, setFormulaire] = useState({
    identifiantEleve: listeEleves[0]?.identifiant || '',
    montantTotal: 3500,
    dateEcheance: '2026-04-15',
    typePaiement: 'scolarite' as 'scolarite' | 'cantine' | 'transport' | 'uniforme' | 'activite',
  });

  const soumettre = (e: React.FormEvent) => {
    e.preventDefault();
    const eleve = listeEleves.find((el) => el.identifiant === formulaire.identifiantEleve);
    if (!eleve) return;

    ajouterFacture({
      identifiantEleve: eleve.identifiant,
      nomEleve: eleve.nomComplet,
      classe: eleve.classe,
      montantTotal: Number(formulaire.montantTotal),
      montantPaye: 0,
      dateEmission: new Date().toISOString().split('T')[0],
      dateEcheance: formulaire.dateEcheance,
      statut: 'en_attente',
      typePaiement: formulaire.typePaiement,
    });

    surFermeture();
  };

  return (
    <ModaleFormulaire
      ouvert={ouvert}
      surFermeture={surFermeture}
      titre={traduire('genererFacture')}
      sousTitre="Billing statement generator"
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
          <label className="block text-xs font-semibold text-slate-900 mb-1">{traduire('categorie')}</label>
          <select
            value={formulaire.typePaiement}
            onChange={(e) => setFormulaire({ ...formulaire, typePaiement: e.target.value as any })}
            className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
          >
            <option value="scolarite">Tuition Fee</option>
            <option value="cantine">Cafeteria / Meals</option>
            <option value="transport">Bus & Transportation</option>
            <option value="uniforme">Uniforms & Kits</option>
            <option value="activite">Extracurricular Activity</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1">{traduire('montant')} ($)</label>
            <input
              type="number"
              min="1"
              value={formulaire.montantTotal}
              onChange={(e) => setFormulaire({ ...formulaire, montantTotal: Number(e.target.value) })}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1">{traduire('date')}</label>
            <input
              type="date"
              value={formulaire.dateEcheance}
              onChange={(e) => setFormulaire({ ...formulaire, dateEcheance: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
              required
            />
          </div>
        </div>
      </div>
    </ModaleFormulaire>
  );
};
