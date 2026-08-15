import React from 'react';
import { useParams } from 'react-router-dom';
import { OngletSecretaireVueGlobale } from './secretaire/OngletSecretaireVueGlobale';
import { OngletSecretaireInscriptions } from './secretaire/OngletSecretaireInscriptions';
import { OngletSecretaireGestionScolaire } from './secretaire/OngletSecretaireGestionScolaire';
import { OngletSecretaireAdministration } from './secretaire/OngletSecretaireAdministration';
import { OngletSecretaireRapportsDocs } from './secretaire/OngletSecretaireRapportsDocs';
import { OngletSecretaireFinancesAdmin } from './secretaire/OngletSecretaireFinancesAdmin';
import { OngletSecretaireCommMasse } from './secretaire/OngletSecretaireCommMasse';
import { OngletSecretaireSecurite } from './secretaire/OngletSecretaireSecurite';

type CleSousOngletSecretaire =
  | 'vue_globale'
  | 'inscriptions'
  | 'logistique'
  | 'administration'
  | 'rapports'
  | 'finances'
  | 'communication'
  | 'securite';

export const TableauDeBordSecretaire: React.FC = () => {
  const parametresUrl = useParams<{ sousOnglet?: string }>();
  const cleSousOnglet = (parametresUrl.sousOnglet || 'vue_globale') as CleSousOngletSecretaire;

  return (
    <div className="space-y-6">
      {(cleSousOnglet === 'vue_globale' || !cleSousOnglet) && <OngletSecretaireVueGlobale />}
      {cleSousOnglet === 'inscriptions' && <OngletSecretaireInscriptions />}
      {cleSousOnglet === 'logistique' && <OngletSecretaireGestionScolaire />}
      {cleSousOnglet === 'administration' && <OngletSecretaireAdministration />}
      {cleSousOnglet === 'rapports' && <OngletSecretaireRapportsDocs />}
      {cleSousOnglet === 'finances' && <OngletSecretaireFinancesAdmin />}
      {cleSousOnglet === 'communication' && <OngletSecretaireCommMasse />}
      {cleSousOnglet === 'securite' && <OngletSecretaireSecurite />}
    </div>
  );
};
