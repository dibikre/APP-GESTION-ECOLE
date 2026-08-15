import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  FileCheck,
  ShieldCheck,
} from 'lucide-react';
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
  const naviguer = useNavigate();

  const cleSousOnglet = (parametresUrl.sousOnglet || 'vue_globale') as CleSousOngletEleve;

  const listeOnglets = [
    { cle: 'vue_globale' as const, libelle: 'Student Dashboard', icone: LayoutDashboard },
    { cle: 'dossier' as const, libelle: 'Academic Transcript', icone: GraduationCap },
    { cle: 'cours' as const, libelle: 'Schedule & Homework', icone: BookOpen },
    { cle: 'demandes' as const, libelle: 'Certificates & Inquiries', icone: FileCheck },
    { cle: 'securite' as const, libelle: 'Security & Access', icone: ShieldCheck },
  ];

  const changerSousOnglet = (nouvelleCle: CleSousOngletEleve) => {
    naviguer(`/tableau-de-bord/eleve/${nouvelleCle}`);
  };

  return (
    <div className="space-y-6">
      {/* Sub-Navigation for Student */}
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
      {(cleSousOnglet === 'vue_globale' || !cleSousOnglet) && <OngletEleveVueGlobale />}
      {cleSousOnglet === 'dossier' && <OngletEleveDossierAcademique />}
      {cleSousOnglet === 'cours' && <OngletEleveCoursDevoirs />}
      {cleSousOnglet === 'demandes' && <OngletEleveDemandesMessages />}
      {cleSousOnglet === 'securite' && <OngletEleveSecurite />}
    </div>
  );
};
