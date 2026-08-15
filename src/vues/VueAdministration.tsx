import React, { useState } from 'react';
import {
  ShieldCheck,
  Building,
  GraduationCap,
  Sliders,
} from '../composants/communs/IconesAcademie';
import { BoutonRouge } from '../composants/communs/BoutonRouge';
import { ModaleFormulaire } from '../composants/communs/ModaleFormulaire';
import { utiliserAcademie } from '../controleurs/contexteAcademie';

export const VueAdministration: React.FC = () => {
  const { traduire } = utiliserAcademie();
  const [modaleConfigOuverte, setModaleConfigOuverte] = useState(false);
  const [nomSession, setNomSession] = useState('2025–2026 / Term 2');

  const repartitionClasses = [
    { classe: 'Grade 10-A', effectif: 28, salle: 'Room 201', tuteur: 'Dr. Robert Chen' },
    { classe: 'Grade 10-B', effectif: 26, salle: 'Room 202', tuteur: 'Sarah Jenkins' },
    { classe: 'Grade 11-A', effectif: 30, salle: 'Room 301', tuteur: 'Prof. Evelyn Reed' },
    { classe: 'Grade 12-A', effectif: 24, salle: 'Room 401', tuteur: 'Dr. Arthur Sterling' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {traduire('titreAdministration')}
          </h1>
        </div>
        <BoutonRouge
          texte={traduire('parametresAcademiques')}
          icone={Sliders}
          onClick={() => setModaleConfigOuverte(true)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-red-50 text-red-600">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-semibold uppercase">{traduire('sessionAcademique')}</span>
              <p className="text-base font-bold text-slate-900">{nomSession}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-red-50 text-red-600">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-semibold uppercase">{traduire('cohortesActives')}</span>
              <p className="text-base font-bold text-slate-900">{traduire('capaciteCohortes')}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-red-50 text-red-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-semibold uppercase">{traduire('conformiteSecurite')}</span>
              <p className="text-base font-bold text-slate-900">{traduire('normeSecurite')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">{traduire('repartitionClassesTitre')}</h2>
            <p className="text-xs text-slate-500">{traduire('repartitionClassesDesc')}</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-100">
              <tr>
                <th className="px-6 py-3.5">{traduire('classeCohorte')}</th>
                <th className="px-6 py-3.5">{traduire('salleAssignee')}</th>
                <th className="px-6 py-3.5">{traduire('professeurPrincipal')}</th>
                <th className="px-6 py-3.5">{traduire('effectifEleves')}</th>
                <th className="px-6 py-3.5 text-right">{traduire('statut')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {repartitionClasses.map((item, index) => (
                <tr key={index} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">{item.classe}</td>
                  <td className="px-6 py-4 text-slate-600">{item.salle}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">{item.tuteur}</td>
                  <td className="px-6 py-4 text-slate-600">{item.effectif}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700">
                      {traduire('actif')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ModaleFormulaire
        ouvert={modaleConfigOuverte}
        surFermeture={() => setModaleConfigOuverte(false)}
        titre={traduire('parametresAcademiques')}
        sousTitre="Configuration"
        texteBoutonValidation={traduire('enregistrer')}
        surValidation={(e) => {
          e.preventDefault();
          setModaleConfigOuverte(false);
        }}
      >
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1">
              {traduire('sessionAcademique')}
            </label>
            <input
              type="text"
              value={nomSession}
              onChange={(e) => setNomSession(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              required
            />
          </div>
        </div>
      </ModaleFormulaire>
    </div>
  );
};
