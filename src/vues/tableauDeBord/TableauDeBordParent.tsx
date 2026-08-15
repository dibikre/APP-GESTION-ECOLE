import React from 'react';
import { useParams } from 'react-router-dom';
import { OngletParentSuiviEnfant } from './parent/OngletParentSuiviEnfant';
import { OngletParentFinances } from './parent/OngletParentFinances';
import { OngletParentCommunication } from './parent/OngletParentCommunication';
import { OngletParentDocuments } from './parent/OngletParentDocuments';
import { OngletParentParametres } from './parent/OngletParentParametres';

type CleSousOngletParent =
  | 'suivi'
  | 'finances'
  | 'communication'
  | 'documents'
  | 'parametres';

export const TableauDeBordParent: React.FC = () => {
  const parametresUrl = useParams<{ sousOnglet?: string }>();
  const cleSousOnglet = (parametresUrl.sousOnglet || 'suivi') as CleSousOngletParent;

  return (
    <div className="space-y-6">
      {(cleSousOnglet === 'suivi' || !cleSousOnglet) && <OngletParentSuiviEnfant />}
      {cleSousOnglet === 'finances' && <OngletParentFinances />}
      {cleSousOnglet === 'communication' && <OngletParentCommunication />}
      {cleSousOnglet === 'documents' && <OngletParentDocuments />}
      {cleSousOnglet === 'parametres' && <OngletParentParametres />}
    </div>
  );
};
