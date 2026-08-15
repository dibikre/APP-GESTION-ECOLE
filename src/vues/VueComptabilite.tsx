import React, { useState } from 'react';
import {
  DollarSign,
  Plus,
  ArrowDownLeft,
  AlertCircle,
  Receipt,
} from '../composants/communs/IconesAcademie';
import { BoutonRouge } from '../composants/communs/BoutonRouge';
import { CarteStatistique } from '../composants/communs/CarteStatistique';
import { utiliserAcademie } from '../controleurs/contexteAcademie';
import { TableauFactures } from './comptabilite/TableauFactures';
import { TableauTransactions } from './comptabilite/TableauTransactions';
import { ModaleNouvelleFacture } from './comptabilite/ModaleNouvelleFacture';
import { ModaleNouvelleTransaction } from './comptabilite/ModaleNouvelleTransaction';

export const VueComptabilite: React.FC = () => {
  const {
    listeFactures,
    listeTransactions,
    listeEleves,
    traduire,
  } = utiliserAcademie();

  const [modaleFactureOuverte, setModaleFactureOuverte] = useState(false);
  const [modaleTransactionOuverte, setModaleTransactionOuverte] = useState(false);

  const totalEmis = listeFactures.reduce((s, f) => s + f.montantTotal, 0);
  const totalRecouvre = listeFactures.reduce((s, f) => s + f.montantPaye, 0);
  const totalImpaye = totalEmis - totalRecouvre;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {traduire('titreComptabilite')}
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <BoutonRouge
            texte={traduire('enregistrerTransaction')}
            icone={Plus}
            variante="secondaire"
            onClick={() => setModaleTransactionOuverte(true)}
          />
          <BoutonRouge
            texte={traduire('genererFacture')}
            icone={Receipt}
            onClick={() => setModaleFactureOuverte(true)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CarteStatistique
          titre={traduire('totalFacture')}
          valeur={`$${totalEmis.toLocaleString()}`}
          sousTitre="All issued billing items"
          icone={DollarSign}
        />
        <CarteStatistique
          titre={traduire('recettesEncaissees')}
          valeur={`$${totalRecouvre.toLocaleString()}`}
          sousTitre="Processed to treasury"
          icone={ArrowDownLeft}
          variation={{ texte: "Cleared", positive: true }}
        />
        <CarteStatistique
          titre={traduire('impayesRestants')}
          valeur={`$${totalImpaye.toLocaleString()}`}
          sousTitre="Pending student dues"
          icone={AlertCircle}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TableauFactures factures={listeFactures} />
        <TableauTransactions transactions={listeTransactions} />
      </div>

      <ModaleNouvelleFacture
        ouvert={modaleFactureOuverte}
        surFermeture={() => setModaleFactureOuverte(false)}
        listeEleves={listeEleves}
      />

      <ModaleNouvelleTransaction
        ouvert={modaleTransactionOuverte}
        surFermeture={() => setModaleTransactionOuverte(false)}
      />
    </div>
  );
};
