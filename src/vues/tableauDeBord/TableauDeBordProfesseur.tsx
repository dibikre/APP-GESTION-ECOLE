import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileText,
  CalendarCheck,
  UploadCloud,
  UserCheck,
} from 'lucide-react';
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
  const naviguer = useNavigate();

  const cleSousOnglet = (parametresUrl.sousOnglet || 'vue_globale') as CleSousOngletProfesseur;

  const listeOnglets = [
    { cle: 'vue_globale' as const, libelle: 'Faculty Overview', icone: LayoutDashboard },
    { cle: 'mes_classes' as const, libelle: 'My Classes & Roster', icone: Users },
    { cle: 'evaluation' as const, libelle: 'Grading & Marks', icone: FileText },
    { cle: 'suivi' as const, libelle: 'Roll-Call & Homework', icone: CalendarCheck },
    { cle: 'ressources' as const, libelle: 'Resources & Messaging', icone: UploadCloud },
    { cle: 'personnel' as const, libelle: 'Faculty Portal & Payslips', icone: UserCheck },
  ];

  const changerSousOnglet = (nouvelleCle: CleSousOngletProfesseur) => {
    naviguer(`/tableau-de-bord/professeur/${nouvelleCle}`);
  };

  return (
    <div className="space-y-6">
      {/* Sub-Navigation for Teacher */}
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
      {(cleSousOnglet === 'vue_globale' || !cleSousOnglet) && <OngletProfVueGlobale />}
      {cleSousOnglet === 'mes_classes' && <OngletProfMesClasses />}
      {cleSousOnglet === 'evaluation' && <OngletProfEvaluationNotes />}
      {cleSousOnglet === 'suivi' && <OngletProfSuiviDevoirs />}
      {cleSousOnglet === 'ressources' && <OngletProfRessourcesComm />}
      {cleSousOnglet === 'personnel' && <OngletProfEspacePersonnel />}
    </div>
  );
};
