import React from 'react';
import {
  Users,
  Shield,
  Key,
  Archive,
  Mail,
  Phone,
} from '../../../composants/communs/IconesAcademie';
import { utiliserAcademie } from '../../../controleurs/contexteAcademie';

export const OngletSecretaireAdministration: React.FC = () => {
  const { listeEmployes } = utiliserAcademie();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900">Administrative Staff Directory & User Accounts</h3>
        <p className="text-xs text-slate-500">Reset portal access passwords, assign institutional emails, and archive past dossiers.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <span className="text-sm font-bold text-slate-900">Active Staff Directory ({listeEmployes.length})</span>
          <span className="text-xs font-bold text-slate-600">Enterprise Access Ledger</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Staff Member & ID</th>
                <th className="py-2.5 px-4">Department & Role</th>
                <th className="py-2.5 px-4">Contract</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4 text-right">Account Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {listeEmployes.map((emp) => (
                <tr key={emp.identifiant} className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-4">
                    <span className="font-bold text-slate-900 block">{emp.nomComplet}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{emp.matricule}</span>
                  </td>
                  <td className="py-2.5 px-4 text-slate-700">{emp.poste} &bull; {emp.departement}</td>
                  <td className="py-2.5 px-4 font-semibold text-slate-800">{emp.typeContrat}</td>
                  <td className="py-2.5 px-4">
                    <span className="px-2 py-0.5 rounded font-bold uppercase text-[10px] bg-emerald-50 text-emerald-700">
                      {emp.statut}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => alert(`Reset password token sent for ${emp.nomComplet}`)}
                      className="text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer"
                    >
                      Reset Password
                    </button>
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
