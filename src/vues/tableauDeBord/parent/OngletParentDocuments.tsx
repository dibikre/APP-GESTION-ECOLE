import React from 'react';
import {
  FileText,
  Download,
  Calendar,
  CheckCircle,
  FileCheck,
} from '../../../composants/communs/IconesAcademie';
import { BoutonRouge } from '../../../composants/communs/BoutonRouge';
import { utiliserAcademie } from '../../../controleurs/contexteAcademie';

export const OngletParentDocuments: React.FC = () => {
  const { listeDemandesDocs, soumettreDemandeDoc } = utiliserAcademie();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Child Administrative Documents & Official Certificates</h3>
          <p className="text-xs text-slate-500">Download periodic report cards, official enrollment certificates, and school schedules.</p>
        </div>
        <BoutonRouge
          texte="Request Enrollment Certificate"
          icone={FileCheck}
          onClick={() => {
            soumettreDemandeDoc({
              typeDocument: 'certificat_scolarite',
              demandeurNom: 'Eleanor Vance',
              roleDemandeur: 'parent',
              classe: 'Grade 11-A',
            });
            alert('Certificate of Enrollment request submitted to admissions office!');
          }}
        />
      </div>

      {/* Official Downloads */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { titre: 'Term 1 Official Report Card', desc: 'Fall 2025 semester grades and comments.', date: 'Dec 2025' },
          { titre: 'Term 2 Midterm Progress Report', desc: 'Current winter continuous assessment standing.', date: 'Feb 2026' },
          { titre: 'Certified Student Enrollment Proof', desc: 'Signed certificate for tax and embassy purposes.', date: 'Jan 2026' },
        ].map((doc) => (
          <div key={doc.titre} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 block">{doc.titre}</span>
              <p className="text-[11px] text-slate-500 mt-2">{doc.desc}</p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-semibold">{doc.date}</span>
              <button
                type="button"
                onClick={() => alert(`Downloading verified PDF for ${doc.titre}`)}
                className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
