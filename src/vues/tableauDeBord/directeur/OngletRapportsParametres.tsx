import React, { useState } from 'react';
import {
  FileText,
  Download,
  Shield,
  Database,
  Lock,
  CheckCircle,
  Key,
  Coins,
  DollarSign,
} from 'lucide-react';
import { BoutonRouge } from '../../../composants/communs/BoutonRouge';
import { SelecteurDevise } from '../../../composants/communs/SelecteurDevise';
import { utiliserAcademie } from '../../../controleurs/contexteAcademie';

export const OngletRapportsParametres: React.FC = () => {
  const { listeSecurite, deviseActuelle, definitionDeviseActuelle, formaterMontant } = utiliserAcademie();
  const [sauvegardeFaite, setSauvegardeFaite] = useState(false);

  const declencherSauvegarde = () => {
    setSauvegardeFaite(true);
    setTimeout(() => setSauvegardeFaite(false), 4000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900">Institutional Configuration, Currency & RBAC Security</h3>
        <p className="text-xs text-slate-500">Configure global currency, generate executive statistical digests, manage access matrices, and export databases.</p>
      </div>

      {/* Global Currency & Financial Localization */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 mb-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Coins className="w-4 h-4 text-red-600" />
              Institutional Financial Currency & Symbol
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Select the primary operating currency for all tuition fees, invoices, expense ledgers, and staff payroll slips.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
            <span className="text-[11px] text-slate-500 font-semibold">Active Currency:</span>
            <span className="text-xs font-bold text-red-600 font-mono">
              {deviseActuelle} ({definitionDeviseActuelle.symbole})
            </span>
          </div>
        </div>

        <SelecteurDevise variante="grille" identifiant="selecteur-devise-parametres" />

        <div className="mt-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="text-slate-600">
            <span className="font-bold text-slate-900">Live Preview: </span>
            Standard Tuition: <span className="font-bold text-slate-900">{formaterMontant(3500)}</span> &bull; 
            Monthly Faculty Payroll: <span className="font-bold text-slate-900">{formaterMontant(120000)}</span> &bull; 
            Disbursement: <span className="font-bold text-slate-900">{formaterMontant(450)}</span>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 flex items-center gap-1 shrink-0">
            <CheckCircle className="w-3.5 h-3.5" /> Instant Global Sync
          </span>
        </div>
      </div>

      {/* Reports and Official Documents */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { titre: 'Annual Institutional Digest', desc: 'Comprehensive financial, academic, and attendance breakdown.', ext: 'PDF' },
          { titre: 'Official Transfer Certificates', desc: 'Accredited student clearance and dossier transcripts.', ext: 'PDF' },
          { titre: 'Ministry Statistical Return', desc: 'Official government compliance census and teacher ratios.', ext: 'XLSX' },
        ].map((r) => (
          <div key={r.titre} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">{r.titre}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">{r.ext}</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2">{r.desc}</p>
            </div>
            <div className="pt-3 mt-2 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                onClick={() => alert(`Generating ${r.titre}...`)}
              >
                <Download className="w-3.5 h-3.5" /> Download Export
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Access Permission Matrix */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <h4 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
          Role-Based Access Control (RBAC Matrix)
        </h4>
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="py-2 px-3">System Role</th>
                <th className="py-2 px-3">Academic Management</th>
                <th className="py-2 px-3">Grading & Transcripts</th>
                <th className="py-2 px-3">Financials & Tuition</th>
                <th className="py-2 px-3">Staff & HR</th>
                <th className="py-2 px-3">System Config</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-2 px-3 font-bold text-slate-900">Headmaster / Director</td>
                <td className="py-2 px-3 text-emerald-700 font-bold">Full Access</td>
                <td className="py-2 px-3 text-emerald-700 font-bold">Full Access</td>
                <td className="py-2 px-3 text-emerald-700 font-bold">Full Access</td>
                <td className="py-2 px-3 text-emerald-700 font-bold">Full Access</td>
                <td className="py-2 px-3 text-emerald-700 font-bold">Full Access</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-bold text-slate-900">Faculty & Teachers</td>
                <td className="py-2 px-3 text-slate-600">Assigned Classes</td>
                <td className="py-2 px-3 text-emerald-700 font-bold">Full Access</td>
                <td className="py-2 px-3 text-slate-400">No Access</td>
                <td className="py-2 px-3 text-slate-400">Personal Only</td>
                <td className="py-2 px-3 text-slate-400">No Access</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-bold text-slate-900">Secretary / Admissions</td>
                <td className="py-2 px-3 text-emerald-700 font-bold">Full Access</td>
                <td className="py-2 px-3 text-slate-600">Read-Only</td>
                <td className="py-2 px-3 text-slate-600">Billing Admin</td>
                <td className="py-2 px-3 text-slate-600">Directory</td>
                <td className="py-2 px-3 text-slate-400">Restricted</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-bold text-slate-900">Parents & Guardians</td>
                <td className="py-2 px-3 text-slate-400">No Access</td>
                <td className="py-2 px-3 text-slate-600">Child Portal</td>
                <td className="py-2 px-3 text-slate-600">Pay Fees</td>
                <td className="py-2 px-3 text-slate-400">No Access</td>
                <td className="py-2 px-3 text-slate-400">No Access</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* System Security & Database Backup */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <Database className="w-4 h-4 text-red-600" />
            Live SQL Database Snapshot & Backup
          </h4>
          <p className="text-xs text-slate-500 mt-1">Export encrypted snapshot of all student files, grades, and accounting ledgers.</p>
        </div>
        <div className="flex items-center gap-3">
          {sauvegardeFaite && (
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
              <CheckCircle className="w-4 h-4" /> Snapshot Verified (2.4 MB)
            </span>
          )}
          <BoutonRouge
            texte="Create System Backup"
            icone={Database}
            onClick={declencherSauvegarde}
          />
        </div>
      </div>
    </div>
  );
};
