import React from 'react';
import { RenduIcone, TypeIcone } from './Icone';

interface ProprietesCarteStatistique {
  titre: string;
  valeur: string | number;
  sousTitre?: string;
  icone: TypeIcone;
  variation?: {
    texte: string;
    positive: boolean;
  };
  identifiant?: string;
}

export const CarteStatistique: React.FC<ProprietesCarteStatistique> = ({
  titre,
  valeur,
  sousTitre,
  icone,
  variation,
  identifiant,
}) => {
  return (
    <div
      id={identifiant}
      className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition-colors flex flex-col justify-between"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
          <RenduIcone icone={icone} className="w-5 h-5" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-800 underline decoration-black decoration-2 underline-offset-4">
          {titre}
        </span>
      </div>
      <div className="mt-4">
        <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{valeur}</div>
        {(sousTitre || variation) && (
          <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-600">
            {variation && (
              <span
                className={`font-semibold px-1.5 py-0.5 rounded ${
                  variation.positive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                }`}
              >
                {variation.texte}
              </span>
            )}
            {sousTitre && <span>{sousTitre}</span>}
          </div>
        )}
      </div>
    </div>
  );
};
