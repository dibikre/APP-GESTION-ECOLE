import React from 'react';
import { RenduIcone, TypeIcone } from './Icone';

interface ProprietesBoutonRouge extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  texte: string;
  icone?: TypeIcone;
  variante?: 'primaire' | 'secondaire' | 'danger_bordure';
  taille?: 'petit' | 'moyen' | 'grand';
  largeurTotale?: boolean;
}

export const BoutonRouge: React.FC<ProprietesBoutonRouge> = ({
  texte,
  icone,
  variante = 'primaire',
  taille = 'moyen',
  largeurTotale = false,
  className = '',
  disabled,
  ...resteProprietes
}) => {
  const stylesTaille = {
    petit: 'px-3 py-1.5 text-xs h-9 min-h-[36px]',
    moyen: 'px-4 py-2 text-sm h-11 min-h-[44px]',
    grand: 'px-6 py-3 text-base h-12 min-h-[48px]',
  };

  const stylesVariante = {
    primaire:
      'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-medium shadow-sm hover:shadow transition-colors focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
    secondaire:
      'bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 font-medium shadow-xs focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
    danger_bordure:
      'bg-white hover:bg-red-50 text-red-700 border border-red-300 font-medium focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
  };

  return (
    <button
      type="button"
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-lg cursor-pointer transition-all select-none disabled:opacity-50 disabled:cursor-not-allowed ${stylesTaille[taille]} ${stylesVariante[variante]} ${largeurTotale ? 'w-full' : ''} ${className}`}
      {...resteProprietes}
    >
      {icone && <RenduIcone icone={icone} className="w-4 h-4 shrink-0 text-current" />}
      <span className="whitespace-nowrap font-medium">{texte}</span>
    </button>
  );
};
