import React from 'react';
import { LivreBibliotheque } from '../../modeles/types';
import { utiliserAcademie } from '../../controleurs/contexteAcademie';

interface ProprietesTableauCatalogueLivres {
  livres: LivreBibliotheque[];
  termeRecherche: string;
  surChangementRecherche: (valeur: string) => void;
}

export const TableauCatalogueLivres: React.FC<ProprietesTableauCatalogueLivres> = ({
  livres,
  termeRecherche,
  surChangementRecherche,
}) => {
  const { traduire } = utiliserAcademie();

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-900">{traduire('catalogueOuvrages')}</h2>
          <p className="text-xs text-slate-500">{livres.length} items catalogued</p>
        </div>
        <div className="w-full sm:w-64">
          <input
            type="text"
            value={termeRecherche}
            onChange={(e) => surChangementRecherche(e.target.value)}
            placeholder="Search title, author or ISBN..."
            className="w-full px-3.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-100">
            <tr>
              <th className="px-4 py-3">{traduire('titre')} & {traduire('auteur')}</th>
              <th className="px-4 py-3">{traduire('categorie')}</th>
              <th className="px-4 py-3">{traduire('emplacement')}</th>
              <th className="px-4 py-3 text-right">{traduire('exemplairesDisponibles')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {livres.map((livre) => (
              <tr key={livre.identifiant} className="hover:bg-slate-50/80">
                <td className="px-4 py-3">
                  <span className="font-bold text-slate-900">{livre.titre}</span>
                  <div className="text-[11px] text-slate-500">{livre.auteur} &bull; ISBN: {livre.isbn}</div>
                </td>
                <td className="px-4 py-3 font-medium text-slate-700">{livre.categorie}</td>
                <td className="px-4 py-3 text-slate-600">{livre.emplacement}</td>
                <td className="px-4 py-3 text-right">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded text-[11px] font-bold ${
                      livre.exemplairesDisponibles > 0
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {livre.exemplairesDisponibles} / {livre.exemplairesTotal} {traduire('disponible')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
