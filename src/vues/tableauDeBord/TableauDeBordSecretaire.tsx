import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  UserPlus,
  Calendar,
  Users,
  Printer,
  CreditCard,
  Megaphone,
  ShieldCheck,
} from 'lucide-react';
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
  const naviguer = useNavigate();

  const cleSousOnglet = (parametresUrl.sousOnglet || 'vue_globale') as CleSousOngletSecretaire;

  const listeOnglets = [
    { cle: 'vue_globale' as const, libelle: 'Admissions Desk', icone: LayoutDashboard },
    { cle: 'inscriptions' as const, libelle: 'Student Enrolment', icone: UserPlus },
    { cle: 'logistique' as const, libelle: 'Schedules & Rooms', icone: Calendar },
    { cle: 'administration' as const, libelle: 'Staff Directory', icone: Users },
    { cle: 'rapports' as const, libelle: 'Certificates & Rosters', icone: Printer },
    { cle: 'finances' as const, libelle: 'Billing & Reminders', icone: CreditCard },
    { cle: 'communication' as const, libelle: 'Mass SMS Broadcast', icone: Megaphone },
    { cle: 'securite' as const, libelle: 'System Backup', icone: ShieldCheck },
  ];

  const changerSousOnglet = (nouvelleCle: CleSousOngletSecretaire) => {
    naviguer(`/tableau-de-bord/secretaire/${nouvelleCle}`);
  };

  return (
    <div className="space-y-6">
      {/* Sub-Navigation for Secretary */}
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
