import React, { useState } from 'react';
import {
  ShieldCheck,
  Database,
  Lock,
  CheckCircle,
  FileCheck,
} from 'lucide-react';
import { BoutonRouge } from '../../../composants/communs/BoutonRouge';

export const OngletSecretaireSecurite: React.FC = () => {
  const [sauvegardeFaite, setSauvegardeFaite] = useState(false);

  const lancerSauvegarde = () => {
    setSauvegardeFaite(true);
    setTimeout(() => setSauvegardeFaite(false), 4000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900">System Logs, Administrative Audit & Registry Backup</h3>
        <p className="text-xs text-slate-500">Perform routine daily student records backup and monitor administrative access logs.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <Database className="w-4 h-4 text-red-600" />
            Registry & Student Records Snapshot
          </h4>
          <p className="text-xs text-slate-500 mt-1">Export an encrypted archive of student matricules, identity records, and attendance data.</p>
        </div>
        <div className="flex items-center gap-3">
          {sauvegardeFaite && (
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
              <CheckCircle className="w-4 h-4" /> Backup archive verified (1.8 MB)
            </span>
          )}
          <BoutonRouge
            texte="Generate Daily Archive"
            icone={Database}
            onClick={lancerSauvegarde}
          />
        </div>
      </div>
    </div>
  );
};
