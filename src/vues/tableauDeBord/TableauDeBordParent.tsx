import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Users,
  CreditCard,
  MessageSquare,
  FileText,
  Settings,
} from 'lucide-react';
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
  const naviguer = useNavigate();

  const cleSousOnglet = (parametresUrl.sousOnglet || 'suivi') as CleSousOngletParent;

  const listeOnglets = [
    { cle: 'suivi' as const, libelle: 'Child Progress & Attendance', icone: Users },
    { cle: 'finances' as const, libelle: 'Tuition & Payments', icone: CreditCard },
    { cle: 'communication' as const, libelle: 'Teacher Conferences & Chat', icone: MessageSquare },
    { cle: 'documents' as const, libelle: 'Official Documents & Cards', icone: FileText },
    { cle: 'parametres' as const, libelle: 'Notifications & Emergency', icone: Settings },
  ];

  const changerSousOnglet = (nouvelleCle: CleSousOngletParent) => {
    naviguer(`/tableau-de-bord/parent/${nouvelleCle}`);
  };

  return (
    <div className="space-y-6">
      {/* Sub-Navigation for Parents */}
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
      {(cleSousOnglet === 'suivi' || !cleSousOnglet) && <OngletParentSuiviEnfant />}
      {cleSousOnglet === 'finances' && <OngletParentFinances />}
      {cleSousOnglet === 'communication' && <OngletParentCommunication />}
      {cleSousOnglet === 'documents' && <OngletParentDocuments />}
      {cleSousOnglet === 'parametres' && <OngletParentParametres />}
    </div>
  );
};
