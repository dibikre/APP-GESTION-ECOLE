import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Users,
  CalendarCheck,
  DollarSign,
  UserPlus,
  Check,
  X,
} from 'lucide-react';
import { CarteStatistique } from '../../composants/communs/CarteStatistique';
import { BoutonRouge } from '../../composants/communs/BoutonRouge';
import { utiliserAcademie } from '../../controleurs/contexteAcademie';
import { CHEMINS_APPLICATION } from '../../routes/cheminsApplication';

export const TableauDeBordRH: React.FC = () => {
  const {
    listeEmployes,
    listeDemandesConges,
    traiterDemandeConge,
    traduire,
  } = utiliserAcademie();

  const naviguer = useNavigate();

  const masseSalariale = listeEmployes.reduce((cumul, e) => cumul + e.salaireMensuel, 0);
  const congesEnAttente = listeDemandesConges.filter((d) => d.statut === 'en_attente');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase bg-amber-600 text-white">
              {traduire('role_ressources_humaines')}
            </span>
            <span className="text-xs text-slate-500 font-medium">Clara Bennett &bull; HR & Staffing Office</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            Human Resources & Staffing
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Oversee staff contracts, process time-off requests, and audit monthly payroll.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <BoutonRouge
            texte={traduire('demanderConge')}
            icone={CalendarCheck}
            variante="secondaire"
            onClick={() => naviguer(CHEMINS_APPLICATION.RESSOURCES_HUMAINES)}
          />
          <BoutonRouge
            texte={traduire('ajouterPersonnel')}
            icone={UserPlus}
            onClick={() => naviguer(CHEMINS_APPLICATION.RESSOURCES_HUMAINES)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CarteStatistique
          titre={traduire('personnelActif')}
          valeur={listeEmployes.length}
          sousTitre="Permanent & contracted staff"
          icone={Users}
          identifiant="rh-carte-effectif"
        />
        <CarteStatistique
          titre={traduire('masseSalarialeMensuelle')}
          valeur={`$${masseSalariale.toLocaleString()}`}
          sousTitre="Monthly staff disbursements"
          icone={DollarSign}
          identifiant="rh-carte-payroll"
        />
        <CarteStatistique
          titre={traduire('demandesAValider')}
          valeur={congesEnAttente.length}
          sousTitre="Action required"
          icone={CalendarCheck}
          variation={{ texte: "Priority", positive: false }}
          identifiant="rh-carte-conges"
        />
        <CarteStatistique
          titre="Staff Retention"
          valeur="98.5%"
          sousTitre="Institutional stability index"
          icone={Briefcase}
          variation={{ texte: "High", positive: true }}
          identifiant="rh-carte-retention"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">{traduire('demandesAValider')}</h2>
              <p className="text-xs text-slate-500">Employee leave and time-off requests</p>
            </div>
            <BoutonRouge
              texte="View All Leaves"
              variante="secondaire"
              taille="petit"
              onClick={() => naviguer(CHEMINS_APPLICATION.RESSOURCES_HUMAINES)}
            />
          </div>

          <div className="divide-y divide-slate-100 mt-2">
            {listeDemandesConges.map((demande) => (
              <div key={demande.identifiant} className="py-3.5 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">{demande.nomEmploye}</h3>
                    <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                      {demande.typeConge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {demande.dateDebut} &rarr; {demande.dateFin} &bull; Reason: {demande.motif}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {demande.statut === 'en_attente' ? (
                    <>
                      <button
                        type="button"
                        onClick={() => traiterDemandeConge(demande.identifiant, 'approuve')}
                        className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 cursor-pointer flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" /> Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => traiterDemandeConge(demande.identifiant, 'refuse')}
                        className="px-2.5 py-1 text-xs font-bold rounded-lg bg-red-50 text-red-700 hover:bg-red-100 cursor-pointer flex items-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" /> Reject
                      </button>
                    </>
                  ) : (
                    <span className="text-xs font-bold uppercase text-emerald-700">
                      {demande.statut}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">{traduire('annuairePersonnel')}</h2>
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                Active Staff
              </span>
            </div>

            <div className="space-y-3 mt-3">
              {listeEmployes.slice(0, 3).map((employe) => (
                <div key={employe.identifiant} className="p-3 rounded-lg border border-slate-100 bg-slate-50/70 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{employe.nomComplet}</span>
                    <span className="font-semibold text-slate-600">${employe.salaireMensuel}/mo</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{employe.poste} &bull; {employe.departement}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <BoutonRouge
              texte="Open Staff Management"
              variante="secondaire"
              largeurTotale
              onClick={() => naviguer(CHEMINS_APPLICATION.RESSOURCES_HUMAINES)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
