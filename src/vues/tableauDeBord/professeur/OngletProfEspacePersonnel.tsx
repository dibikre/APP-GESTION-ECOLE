import React from 'react';
import {
  Calendar,
  FileCheck,
  CreditCard,
  Download,
  Clock,
  UserCheck,
} from 'lucide-react';
import { utiliserAcademie } from '../../../controleurs/contexteAcademie';

export const OngletProfEspacePersonnel: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900">Faculty Personal Portal & Pay Ledger</h3>
        <p className="text-xs text-slate-500">Access employment history, approved leave records, and monthly remuneration payslips.</p>
      </div>

      {/* Monthly Payslips */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <h4 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-1.5">
          <CreditCard className="w-4 h-4 text-red-600" /> Remuneration & Monthly Payslips
        </h4>
        <div className="divide-y divide-slate-100 mt-2">
          {[
            { periode: 'February 2026', montant: 4800, dateVirement: '2026-02-28', statut: 'Disbursed' },
            { periode: 'January 2026', montant: 4800, dateVirement: '2026-01-31', statut: 'Disbursed' },
            { periode: 'December 2025 (With Bonus)', montant: 5300, dateVirement: '2025-12-22', statut: 'Disbursed' },
          ].map((p) => (
            <div key={p.periode} className="py-2.5 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-900">{p.periode}</span>
                <span className="text-[11px] text-slate-500 block">Bank transfer on {p.dateVirement}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-extrabold text-slate-900">${p.montant}</span>
                <button
                  type="button"
                  onClick={() => alert(`Downloading payslip for ${p.periode}`)}
                  className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Academic Deadlines Calendar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <h4 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-red-600" /> Pedagogical Calendar Deadlines
        </h4>
        <div className="space-y-2.5 mt-3 text-xs">
          <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-900">Term 2 Continuous Assessment Marks Deadline</span>
              <p className="text-[11px] text-slate-500">All CC1, CC2, and CC3 marks must be committed to the master ledger.</p>
            </div>
            <span className="font-bold text-red-600">March 14, 2026</span>
          </div>
          <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-900">Midterm Examination Question Submission</span>
              <p className="text-[11px] text-slate-500">Deliver sealed exam papers to Academic Dean.</p>
            </div>
            <span className="font-bold text-slate-700">March 10, 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
};
