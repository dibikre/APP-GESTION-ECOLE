import React from 'react';
import { Icone } from './Icone';
import { BoutonRouge } from './BoutonRouge';

interface ProprietesModaleFormulaire {
  ouvert: boolean;
  surFermeture: () => void;
  titre: string;
  sousTitre?: string;
  texteBoutonValidation?: string;
  surValidation?: (e: React.FormEvent) => void;
  enfants: React.ReactNode;
  desactiveValidation?: boolean;
}

export const ModaleFormulaire: React.FC<ProprietesModaleFormulaire> = ({
  ouvert,
  surFermeture,
  titre,
  sousTitre,
  texteBoutonValidation = 'Save Record',
  surValidation,
  enfants,
  desactiveValidation = false,
}) => {
  if (!ouvert) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{titre}</h3>
            {sousTitre && <p className="text-xs text-slate-500 mt-0.5">{sousTitre}</p>}
          </div>
          <button
            type="button"
            onClick={surFermeture}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <Icone icone="ph:x-bold" className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={surValidation}>
          <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">{enfants}</div>

          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
            <BoutonRouge
              texte="Cancel"
              variante="secondaire"
              onClick={surFermeture}
            />
            {surValidation && (
              <button
                type="submit"
                disabled={desactiveValidation}
                className="inline-flex items-center justify-center gap-2 rounded-lg cursor-pointer px-4 py-2 text-sm h-11 min-h-[44px] bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-medium shadow-sm transition-colors focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {texteBoutonValidation}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
