import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Megaphone,
  Radio,
  Users,
  ShieldAlert,
  PlusCircle,
} from '../../composants/communs/IconesAcademie';
import { CarteStatistique } from '../../composants/communs/CarteStatistique';
import { BoutonRouge } from '../../composants/communs/BoutonRouge';
import { utiliserAcademie } from '../../controleurs/contexteAcademie';
import { CHEMINS_APPLICATION } from '../../routes/cheminsApplication';

export const TableauDeBordCommunication: React.FC = () => {
  const {
    listeAnnonces,
    traduire,
  } = utiliserAcademie();

  const naviguer = useNavigate();

  const parentsCount = listeAnnonces.filter((a) => a.cible === 'parents' || a.cible === 'tous').length;
  const alertesUrgentes = listeAnnonces.filter((a) => a.priorite === 'urgente').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase bg-indigo-700 text-white">
              {traduire('role_charge_communication')}
            </span>
            <span className="text-xs text-slate-500 font-medium">Julian Mercer &bull; {traduire('apercuCommunication')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            {traduire('apercuCommunication')}
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <BoutonRouge
            texte={traduire('publierAnnonce')}
            icone={PlusCircle}
            onClick={() => naviguer(CHEMINS_APPLICATION.COMMUNICATION)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CarteStatistique
          titre={traduire('bulletinsActifs')}
          valeur={listeAnnonces.length}
          sousTitre={traduire('publieesCeTrimestre')}
          icone={Radio}
          identifiant="comm-carte-bulletins"
        />
        <CarteStatistique
          titre={traduire('diffusionsParents')}
          valeur={parentsCount}
          sousTitre={traduire('notificationsEnvoyees')}
          icone={Users}
          identifiant="comm-carte-parents"
        />
        <CarteStatistique
          titre={traduire('alertesUrgentes')}
          valeur={alertesUrgentes}
          sousTitre={traduire('alertesCampusTitre')}
          icone={ShieldAlert}
          variation={{ texte: "Live broadcast", positive: true }}
          identifiant="comm-carte-urgentes"
        />
        <CarteStatistique
          titre={traduire('tauxOuvertureSMS')}
          valeur="98.5%"
          sousTitre={traduire('notificationsEnvoyees')}
          icone={Megaphone}
          identifiant="comm-carte-engagement"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">{traduire('diffusionsRecentes')}</h2>
              <p className="text-xs text-slate-500">{traduire('descriptionCommunication')}</p>
            </div>
            <BoutonRouge
              texte={traduire('publierAnnonce')}
              variante="secondaire"
              taille="petit"
              onClick={() => naviguer(CHEMINS_APPLICATION.COMMUNICATION)}
            />
          </div>

          <div className="divide-y divide-slate-100 mt-2">
            {listeAnnonces.map((annonce) => (
              <div key={annonce.identifiant} className="py-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                        annonce.priorite === 'urgente'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {annonce.priorite}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">
                      {traduire('publicCible')} <span className="uppercase text-red-600 font-bold">{annonce.cible}</span>
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">{annonce.datePublication}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">{annonce.titre}</h3>
                <p className="text-xs text-slate-600 line-clamp-2">{annonce.contenu}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">{traduire('syntheseCommunications')}</h2>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                {traduire('actif')}
              </span>
            </div>

            <div className="space-y-3 mt-3 text-xs">
              <div className="p-3 rounded-lg border border-slate-100 bg-slate-50">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{traduire('diffusionsParents')}</span>
                  <span className="text-emerald-700">100% {traduire('actif')}</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">{traduire('notificationsEnvoyees')}</p>
              </div>
              <div className="p-3 rounded-lg border border-slate-100 bg-slate-50">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{traduire('fluxAnnonces')}</span>
                  <span className="text-emerald-700">100% {traduire('actif')}</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">{traduire('descriptionCommunication')}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <BoutonRouge
              texte={traduire('module_communication')}
              variante="secondaire"
              largeurTotale
              onClick={() => naviguer(CHEMINS_APPLICATION.COMMUNICATION)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
