import React from 'react';
import { FactureComptabilite } from '../../modeles/types';
import { BoutonRouge } from '../../composants/communs/BoutonRouge';
import { utiliserAcademie } from '../../controleurs/contexteAcademie';

interface ProprietesSectionFacturesParents {
  facturesEleve: FactureComptabilite[];
  surInitierPaiement: (idFacture: string, montant: number) => void;
}

export const SectionFacturesParents: React.FC<ProprietesSectionFacturesParents> = ({
  facturesEleve,
  surInitierPaiement,
}) => {
  const { traduire } = utiliserAcademie();

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
      <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
        {traduire('relevesFrais')}
      </h2>
      <div className="divide-y divide-slate-100 mt-2">
        {facturesEleve.length === 0 ? (
          <p className="text-xs text-slate-500 py-4">All school fees settled.</p>
        ) : (
          facturesEleve.map((fac) => {
            const resteAPayer = fac.montantTotal - fac.montantPaye;
            return (
              <div key={fac.identifiant} className="py-3.5 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{fac.numeroFacture}</span>
                    <span
                      className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                        fac.statut === 'paye'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {fac.statut}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {traduire('echeanceLe')} {fac.dateEcheance} &bull; Type: {fac.typePaiement}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-900 block">
                      ${fac.montantPaye} / ${fac.montantTotal}
                    </span>
                    {resteAPayer > 0 && (
                      <span className="text-[10px] text-red-600 font-semibold">
                        {traduire('resteAPayer')} ${resteAPayer}
                      </span>
                    )}
                  </div>
                  {resteAPayer > 0 && (
                    <BoutonRouge
                      texte={traduire('payer')}
                      taille="petit"
                      onClick={() => surInitierPaiement(fac.identifiant, resteAPayer)}
                    />
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
