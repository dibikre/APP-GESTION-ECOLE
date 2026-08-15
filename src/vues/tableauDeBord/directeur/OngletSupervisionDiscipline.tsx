import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  Award,
  Users,
  Plus,
  CheckCircle,
} from 'lucide-react';
import { BoutonRouge } from '../../../composants/communs/BoutonRouge';
import { utiliserAcademie } from '../../../controleurs/contexteAcademie';

export const OngletSupervisionDiscipline: React.FC = () => {
  const { listeIncidents, ajouterIncident, listeEleves } = utiliserAcademie();

  const [formulaireOuvert, setFormulaireOuvert] = useState(false);
  const [eleveNom, setEleveNom] = useState('');
  const [classe, setClasse] = useState('Grade 11-A');
  const [gravite, setGravite] = useState<'mineure' | 'moyenne' | 'critique'>('moyenne');
  const [description, setDescription] = useState('');
  const [sanction, setSanction] = useState('');

  const soumettreIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eleveNom || !description) return;
    ajouterIncident({
      nomEleve: eleveNom,
      classe,
      gravite,
      description,
      sanction: sanction || 'Parent conference and disciplinary notice.',
      rapportePar: 'Executive Board',
      dateIncident: new Date().toISOString().split('T')[0],
      statut: 'en_cours',
    });
    setEleveNom('');
    setDescription('');
    setSanction('');
    setFormulaireOuvert(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Discipline Supervision & Academic Honor Roll</h3>
          <p className="text-xs text-slate-500">Record campus disciplinary incidents, assign sanctions, and audit academic rankings.</p>
        </div>
        <BoutonRouge
          texte="Log Disciplinary Incident"
          icone={Plus}
          onClick={() => setFormulaireOuvert(!formulaireOuvert)}
        />
      </div>

      {formulaireOuvert && (
        <form onSubmit={soumettreIncident} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <h4 className="text-sm font-bold text-slate-900">New Disciplinary Report</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block">Student Name</label>
              <input
                type="text"
                value={eleveNom}
                onChange={(e) => setEleveNom(e.target.value)}
                placeholder="e.g. Marcus Vance"
                className="w-full mt-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block">Cohort Class</label>
              <select
                value={classe}
                onChange={(e) => setClasse(e.target.value)}
                className="w-full mt-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              >
                <option value="Grade 9-A">Grade 9-A</option>
                <option value="Grade 10-A">Grade 10-A</option>
                <option value="Grade 11-A">Grade 11-A</option>
                <option value="Grade 12-A">Grade 12-A</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block">Severity Level</label>
              <select
                value={gravite}
                onChange={(e) => setGravite(e.target.value as any)}
                className="w-full mt-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              >
                <option value="mineure">Minor Infraction</option>
                <option value="moyenne">Moderate Violation</option>
                <option value="critique">Critical Incident</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 block">Incident Details</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the infraction or behavioral incident..."
              className="w-full mt-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              rows={2}
              required
            />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <BoutonRouge texte="Cancel" variante="secondaire" taille="petit" onClick={() => setFormulaireOuvert(false)} />
            <BoutonRouge texte="Submit Incident" taille="petit" type="submit" />
          </div>
        </form>
      )}

      {/* Disciplinary Register */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <span className="text-sm font-bold text-slate-900">Institutional Disciplinary Register</span>
          <span className="text-xs font-bold text-slate-600">{listeIncidents.length} Recorded Incidents</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Student & Class</th>
                <th className="py-2.5 px-4">Severity</th>
                <th className="py-2.5 px-4">Incident Description</th>
                <th className="py-2.5 px-4">Assigned Sanction</th>
                <th className="py-2.5 px-4">Reported By</th>
                <th className="py-2.5 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {listeIncidents.map((inc) => (
                <tr key={inc.identifiant} className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-4 font-bold text-slate-900">{inc.nomEleve} ({inc.classe})</td>
                  <td className="py-2.5 px-4">
                    <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                      inc.gravite === 'critique' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {inc.gravite}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-slate-700 max-w-xs">{inc.description}</td>
                  <td className="py-2.5 px-4 text-slate-600 italic">{inc.sanction}</td>
                  <td className="py-2.5 px-4 text-slate-500">{inc.rapportePar}</td>
                  <td className="py-2.5 px-4 text-right font-bold text-slate-800 uppercase text-[10px]">{inc.statut}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Academic Rankings */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <h4 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
          Institution Academic Honor Roll (Top Performers)
        </h4>
        <div className="divide-y divide-slate-100 mt-2">
          {listeEleves.slice(0, 4).map((el, index) => (
            <div key={el.identifiant} className="py-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-red-50 text-red-600 font-bold flex items-center justify-center text-xs">
                  #{index + 1}
                </span>
                <div>
                  <span className="font-bold text-slate-900">{el.nomComplet}</span>
                  <span className="text-slate-500 text-[11px] block">{el.matricule} &bull; {el.classe}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-extrabold text-red-600 block">{el.moyenneGenerale}%</span>
                <span className="text-[10px] font-semibold text-emerald-700">Attendance: {el.tauxPresence}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
