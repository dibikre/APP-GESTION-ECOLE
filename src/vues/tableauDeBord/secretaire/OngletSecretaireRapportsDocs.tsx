import React from 'react';
import {
  FileText,
  Download,
  Printer,
  CheckCircle,
} from '../../../composants/communs/IconesAcademie';
import { BoutonRouge } from '../../../composants/communs/BoutonRouge';
import { utiliserAcademie } from '../../../controleurs/contexteAcademie';

export const OngletSecretaireRapportsDocs: React.FC = () => {
  const { listeDemandesDocs, traiterDemandeDoc } = utiliserAcademie();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Bulk Document Generation & Official Certificates</h3>
          <p className="text-xs text-slate-500">Produce batch report cards in PDF, print attendance registers, and sign enrollment letters.</p>
        </div>
        <div className="flex items-center gap-2">
          <BoutonRouge
            texte="Bulk Generate Report Cards"
            icone={Printer}
            onClick={() => alert('Generating batch PDF report cards for all enrolled cohorts...')}
          />
        </div>
      </div>

      {/* Certificate Processing Queue */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <span className="text-sm font-bold text-slate-900">Certificate Processing & Issue Ledger ({listeDemandesDocs.length})</span>
          <span className="text-xs font-bold text-slate-600">Secretary Signature Queue</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Student & Class</th>
                <th className="py-2.5 px-4">Document Type</th>
                <th className="py-2.5 px-4">Requester</th>
                <th className="py-2.5 px-4">Date</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {listeDemandesDocs.map((d) => (
                <tr key={d.identifiant} className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-4 font-bold text-slate-900">{d.demandeurNom} ({d.classe})</td>
                  <td className="py-2.5 px-4 text-slate-700 capitalize font-semibold">{d.typeDocument.replace('_', ' ')}</td>
                  <td className="py-2.5 px-4 text-slate-600 capitalize">{d.roleDemandeur}</td>
                  <td className="py-2.5 px-4 text-slate-500">{d.dateDemande}</td>
                  <td className="py-2.5 px-4">
                    <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                      d.statut === 'pret' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-800'
                    }`}>
                      {d.statut}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-right">
                    {d.statut === 'en_attente' ? (
                      <button
                        type="button"
                        onClick={() => traiterDemandeDoc(d.identifiant, 'pret')}
                        className="text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer"
                      >
                        Approve & Sign PDF
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => alert(`Printing official certificate for ${d.demandeurNom}`)}
                        className="text-xs font-bold text-slate-700 hover:text-red-600 cursor-pointer flex items-center gap-1 ml-auto"
                      >
                        <Download className="w-3.5 h-3.5" /> Download
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
