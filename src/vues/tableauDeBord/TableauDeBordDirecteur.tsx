import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  DollarSign,
  ShieldAlert,
  FileSpreadsheet,
} from 'lucide-react';
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
  const naviguer = useNavigate();

  const cleSousOnglet = (parametresUrl.sousOnglet || 'vue_globale') as CleSousOngletDirecteur;

  const listeOnglets = [
    { cle: 'vue_globale' as const, libelle: 'Executive Overview', icone: LayoutDashboard },
    { cle: 'personnel' as const, libelle: 'Personnel & Payroll', icone: Users },
    { cle: 'academique' as const, libelle: 'Academic Curricula', icone: BookOpen },
    { cle: 'finances' as const, libelle: 'Budgets & Tuition', icone: DollarSign },
    { cle: 'supervision' as const, libelle: 'Discipline & Honor Roll', icone: ShieldAlert },
    { cle: 'rapports' as const, libelle: 'RBAC & Backups', icone: FileSpreadsheet },
  ];

  const changerSousOnglet = (nouvelleCle: CleSousOngletDirecteur) => {
    naviguer(`/tableau-de-bord/directeur/${nouvelleCle}`);
  };

  return (
    <div className="space-y-6">
      {/* Sub-Navigation for Director */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {listeOnglets.map((onglet) => {
          const Icone = onglet.icone;
          const estActif = cleSousOnglet === onglet.cle;
          return (
            <button
              key={onglet.cle}
              type="button"
              onClick={() => changerSousOnglet(onglet.cle)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                estActif
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icone className="w-4 h-4" />
              {onglet.libelle}
            </button>
          );
        })}
      </div>

      {/* Render selected module */}
      {(cleSousOnglet === 'vue_globale' || !cleSousOnglet) && <OngletVueGlobale />}
      {cleSousOnglet === 'personnel' && <OngletPersonnelSalaires />}
      {cleSousOnglet === 'academique' && <OngletAcademique />}
      {cleSousOnglet === 'finances' && <OngletFinancesBudget />}
      {cleSousOnglet === 'supervision' && <OngletSupervisionDiscipline />}
      {cleSousOnglet === 'rapports' && <OngletRapportsParametres />}
    </div>
  );
};
