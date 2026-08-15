import React, { useState, useRef, useEffect } from 'react';
import { Icone } from './Icone';
import { utiliserAcademie } from '../../controleurs/contexteAcademie';
import { DEVISES_DISPONIBLES, CodeDevise } from '../../modeles/devises';

interface ProprietesSelecteurDevise {
  variante?: 'bouton' | 'grille' | 'compact';
  classePersonnalisee?: string;
  identifiant?: string;
}

export const SelecteurDevise: React.FC<ProprietesSelecteurDevise> = ({
  variante = 'bouton',
  classePersonnalisee = '',
  identifiant = 'selecteur-devise-global',
}) => {
  const { deviseActuelle, changerDevise, definitionDeviseActuelle } = utiliserAcademie();
  const [ouvert, setOuvert] = useState(false);
  const refMenu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gestionnaireClicExterieur = (event: MouseEvent) => {
      if (refMenu.current && !refMenu.current.contains(event.target as Node)) {
        setOuvert(false);
      }
    };
    document.addEventListener('mousedown', gestionnaireClicExterieur);
    return () => document.removeEventListener('mousedown', gestionnaireClicExterieur);
  }, []);

  if (variante === 'grille') {
    return (
      <div id={identifiant} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 ${classePersonnalisee}`}>
        {DEVISES_DISPONIBLES.map((dev) => {
          const estActif = dev.code === deviseActuelle;
          return (
            <button
              key={dev.code}
              type="button"
              id={`${identifiant}-item-${dev.code.toLowerCase()}`}
              onClick={() => changerDevise(dev.code)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-start justify-between ${
                estActif
                  ? 'border-red-600 bg-red-50/70 shadow-xs'
                  : 'border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                    estActif ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {dev.code} ({dev.symbole})
                  </span>
                  <span className="text-xs font-bold text-slate-900">{dev.nom}</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5 leading-snug">{dev.description}</p>
                <div className="text-[11px] font-mono text-slate-600 mt-2 bg-slate-100/70 px-2 py-1 rounded inline-block">
                  Sample: {dev.position === 'avant' ? `${dev.symbole}12,500` : `12 500 ${dev.symbole}`}
                </div>
              </div>
              {estActif && <Icone icone="lucide:check" className="w-4 h-4 text-red-600 shrink-0 ml-2 mt-0.5" />}
            </button>
          );
        })}
      </div>
    );
  }

  if (variante === 'compact') {
    return (
      <div id={identifiant} className={`relative inline-block ${classePersonnalisee}`} ref={refMenu}>
        <button
          type="button"
          id={`${identifiant}-declencheur`}
          onClick={() => setOuvert(!ouvert)}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg border border-slate-200 transition-colors cursor-pointer"
          title="Change institutional currency"
        >
          <Icone icone="lucide:coins" className="w-3.5 h-3.5 text-red-600" />
          <span>{deviseActuelle} ({definitionDeviseActuelle.symbole})</span>
          <Icone icone="lucide:chevron-down" className={`w-3 h-3 text-slate-500 transition-transform ${ouvert ? 'rotate-180' : ''}`} />
        </button>

        {ouvert && (
          <div className="absolute right-0 mt-1.5 w-64 bg-white border border-slate-200 rounded-xl shadow-lg z-50 p-1.5 space-y-0.5 max-h-72 overflow-y-auto">
            <div className="px-2.5 py-1.5 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Select Currency
            </div>
            {DEVISES_DISPONIBLES.map((dev) => (
              <button
                key={dev.code}
                type="button"
                id={`${identifiant}-option-${dev.code.toLowerCase()}`}
                onClick={() => {
                  changerDevise(dev.code);
                  setOuvert(false);
                }}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium text-left transition-colors cursor-pointer ${
                  dev.code === deviseActuelle
                    ? 'bg-red-50 text-red-700 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-[11px]">{dev.code}</span>
                  <span className="text-slate-600">{dev.nom}</span>
                </div>
                {dev.code === deviseActuelle && <Icone icone="lucide:check" className="w-3.5 h-3.5 text-red-600" />}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div id={identifiant} className={`relative inline-block ${classePersonnalisee}`} ref={refMenu}>
      <button
        type="button"
        id={`${identifiant}-declencheur`}
        onClick={() => setOuvert(!ouvert)}
        className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 hover:border-slate-300 rounded-lg text-xs font-bold text-slate-800 shadow-2xs transition-all cursor-pointer"
      >
        <Icone icone="lucide:coins" className="w-4 h-4 text-red-600" />
        <div className="text-left leading-none">
          <div className="text-[9px] text-slate-400 font-semibold uppercase">Currency</div>
          <div className="text-xs text-slate-900 font-bold">{deviseActuelle} ({definitionDeviseActuelle.symbole})</div>
        </div>
        <Icone icone="lucide:chevron-down" className={`w-3.5 h-3.5 text-slate-400 transition-transform ml-1 ${ouvert ? 'rotate-180' : ''}`} />
      </button>

      {ouvert && (
        <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2 space-y-1 max-h-80 overflow-y-auto">
          <div className="px-2 py-1.5 text-xs font-bold text-slate-900 border-b border-slate-100 flex items-center justify-between">
            <span>Institutional Currency</span>
            <span className="text-[10px] text-red-600 font-bold bg-red-50 px-1.5 py-0.5 rounded">Global</span>
          </div>
          {DEVISES_DISPONIBLES.map((dev) => {
            const estActif = dev.code === deviseActuelle;
            return (
              <button
                key={dev.code}
                type="button"
                id={`${identifiant}-choix-${dev.code.toLowerCase()}`}
                onClick={() => {
                  changerDevise(dev.code);
                  setOuvert(false);
                }}
                className={`w-full flex items-center justify-between p-2 rounded-lg text-xs text-left transition-colors cursor-pointer ${
                  estActif
                    ? 'bg-red-50 text-red-700 font-bold border border-red-200'
                    : 'text-slate-700 hover:bg-slate-50 border border-transparent'
                }`}
              >
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{dev.nom}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Example: {dev.position === 'avant' ? `${dev.symbole}100,000` : `100 000 ${dev.symbole}`}
                  </div>
                </div>
                {estActif && <Icone icone="lucide:check" className="w-4 h-4 text-red-600 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
