import React from 'react';
import { useParams } from 'react-router-dom';
import { OngletVueGlobale } from './directeur/OngletVueGlobale';
import { OngletPersonnelSalaires } from './directeur/OngletPersonnelSalaires';
import { OngletAcademique } from './directeur/OngletAcademique';
import { OngletFinancesBudget } from './directeur/OngletFinancesBudget';
import { OngletSupervisionDiscipline } from './directeur/OngletSupervisionDiscipline';
import { OngletRapportsParametres } from './directeur/OngletRapportsParametres';

type CleSousOngletDirecteur =
  | 'vue_globale'
  | 'personnel'
  | 'academique'
  | 'finances'
  | 'supervision'
  | 'rapports';

export const TableauDeBordDirecteur: React.FC = () => {
  const parametresUrl = useParams<{ sousOnglet?: string }>();
  const cleSousOnglet = (parametresUrl.sousOnglet || 'vue_globale') as CleSousOngletDirecteur;

  return (
    <div className="space-y-6">
      {(cleSousOnglet === 'vue_globale' || !cleSousOnglet) && <OngletVueGlobale />}
      {cleSousOnglet === 'personnel' && <OngletPersonnelSalaires />}
      {cleSousOnglet === 'academique' && <OngletAcademique />}
      {cleSousOnglet === 'finances' && <OngletFinancesBudget />}
      {cleSousOnglet === 'supervision' && <OngletSupervisionDiscipline />}
      {cleSousOnglet === 'rapports' && <OngletRapportsParametres />}
    </div>
  );
};
