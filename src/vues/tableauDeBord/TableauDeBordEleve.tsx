import React from 'react';
import { useParams } from 'react-router-dom';
import { OngletEleveVueGlobale } from './eleve/OngletEleveVueGlobale';
import { OngletEleveDossierAcademique } from './eleve/OngletEleveDossierAcademique';
import { OngletEleveCoursDevoirs } from './eleve/OngletEleveCoursDevoirs';
import { OngletEleveDemandesMessages } from './eleve/OngletEleveDemandesMessages';
import { OngletEleveSecurite } from './eleve/OngletEleveSecurite';

type CleSousOngletEleve =
  | 'vue_globale'
  | 'dossier'
  | 'cours'
  | 'demandes'
  | 'securite';

export const TableauDeBordEleve: React.FC = () => {
  const parametresUrl = useParams<{ sousOnglet?: string }>();
  const cleSousOnglet = (parametresUrl.sousOnglet || 'vue_globale') as CleSousOngletEleve;

  return (
    <div className="space-y-6">
      {/* Affichage direct du module selectionne sans menu horizontal redondant */}
      {(cleSousOnglet === 'vue_globale' || !cleSousOnglet) && <OngletEleveVueGlobale />}
      {cleSousOnglet === 'dossier' && <OngletEleveDossierAcademique />}
      {cleSousOnglet === 'cours' && <OngletEleveCoursDevoirs />}
      {cleSousOnglet === 'demandes' && <OngletEleveDemandesMessages />}
      {cleSousOnglet === 'securite' && <OngletEleveSecurite />}
    </div>
  );
};
