import React from 'react';
import { useParams } from 'react-router-dom';
import { OngletProfVueGlobale } from './professeur/OngletProfVueGlobale';
import { OngletProfMesClasses } from './professeur/OngletProfMesClasses';
import { OngletProfEvaluationNotes } from './professeur/OngletProfEvaluationNotes';
import { OngletProfSuiviDevoirs } from './professeur/OngletProfSuiviDevoirs';
import { OngletProfRessourcesComm } from './professeur/OngletProfRessourcesComm';
import { OngletProfEspacePersonnel } from './professeur/OngletProfEspacePersonnel';

type CleSousOngletProfesseur =
  | 'vue_globale'
  | 'mes_classes'
  | 'evaluation'
  | 'suivi'
  | 'ressources'
  | 'personnel';

export const TableauDeBordProfesseur: React.FC = () => {
  const parametresUrl = useParams<{ sousOnglet?: string }>();
  const cleSousOnglet = (parametresUrl.sousOnglet || 'vue_globale') as CleSousOngletProfesseur;

  return (
    <div className="space-y-6">
      {/* Affichage direct du module selectionne sans menu horizontal redondant */}
      {(cleSousOnglet === 'vue_globale' || !cleSousOnglet) && <OngletProfVueGlobale />}
      {cleSousOnglet === 'mes_classes' && <OngletProfMesClasses />}
      {cleSousOnglet === 'evaluation' && <OngletProfEvaluationNotes />}
      {cleSousOnglet === 'suivi' && <OngletProfSuiviDevoirs />}
      {cleSousOnglet === 'ressources' && <OngletProfRessourcesComm />}
      {cleSousOnglet === 'personnel' && <OngletProfEspacePersonnel />}
    </div>
  );
};
