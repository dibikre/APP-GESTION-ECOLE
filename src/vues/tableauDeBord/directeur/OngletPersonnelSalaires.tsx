import React, { useState } from 'react';
import {
  Users,
  DollarSign,
  CalendarCheck,
  FileText,
  Plus,
  Trash2,
  Check,
  X,
  Award,
} from 'lucide-react';
import { BoutonRouge } from '../../../composants/communs/BoutonRouge';
import { utiliserAcademie } from '../../../controleurs/contexteAcademie';

export const OngletPersonnelSalaires: React.FC = () => {
  const {
    listeEmployes,
    ajouterEmploye,
    supprimerEmploye,
    listeDemandesConges,
    traiterDemandeConge,
    traduire,
  } = utiliserAcademie();

  const [formulaireOuvert, setFormulaireOuvert] = useState(false);
  const [nouveauNom, setNouveauNom] = useState('');
  const [nouveauPoste, setNouveauPoste] = useState('');
  const [nouveauDept, setNouveauDept] = useState<'Pedagogique' | 'Administration' | 'Comptabilite' | 'Technique' | 'Services'>('Pedagogique');
  const [nouveauSalaire, setNouveauSalaire] = useState(4500);
  const [nouveauContrat, setNouveauContrat] = useState<'CDI' | 'CDD' | 'Temps partiel' | 'Vacataire'>('CDI');

  const masseSalariale = listeEmployes.reduce((s, e) => s + e.salaireMensuel, 0);

  const gererSoumission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nouveauNom || !nouveauPoste) return;
    ajouterEmploye({
      nomComplet: nouveauNom,
      poste: nouveauPoste,
      departement: nouveauDept,
      typeContrat: nouveauContrat,
      salaireMensuel: nouveauSalaire,
      dateDebut: new Date().toISOString().split('T')[0],
      joursCongesRestants: 25,
      statut: 'actif',
    });
    setNouveauNom('');
    setNouveauPoste('');
    setFormulaireOuvert(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Faculty & Personnel Governance</h3>
          <p className="text-xs text-slate-500">Manage employment contracts, payroll calculations, and leave authorizations.</p>
        </div>
        <BoutonRouge
          texte="Add Staff Member"
          icone={Plus}
          onClick={() => setFormulaireOuvert(!formulaireOuvert)}
        />
      </div>

      {formulaireOuvert && (
        <form onSubmit={gererSoumission} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <h4 className="text-sm font-bold text-slate-900">New Staff Contract Registration</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block">Full Name</label>
              <input
                type="text"
                value={nouveauNom}
                onChange={(e) => setNouveauNom(e.target.value)}
                placeholder="e.g. Dr. Samuel King"
                className="w-full mt-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block">Job Role & Title</label>
              <input
                type="text"
                value={nouveauPoste}
                onChange={(e) => setNouveauPoste(e.target.value)}
                placeholder="e.g. Senior Biology Lecturer"
                className="w-full mt-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block">Monthly Base Salary ($)</label>
              <input
                type="number"
                value={nouveauSalaire}
                onChange={(e) => setNouveauSalaire(Number(e.target.value))}
                className="w-full mt-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <BoutonRouge texte="Cancel" variante="secondaire" taille="petit" onClick={() => setFormulaireOuvert(false)} />
            <BoutonRouge texte="Save Employee" taille="petit" type="submit" />
          </div>
        </form>
      )}

      {/* Staff Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <span className="text-sm font-bold text-slate-900">Personnel Directory & Salary Ledger ({listeEmployes.length})</span>
          <span className="text-xs font-bold text-slate-700">Total Monthly Payroll: ${masseSalariale.toLocaleString()}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Employee</th>
                <th className="py-2.5 px-4">Department & Role</th>
                <th className="py-2.5 px-4">Contract</th>
                <th className="py-2.5 px-4">Monthly Salary</th>
                <th className="py-2.5 px-4">Annual Leave</th>
                <th className="py-2.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {listeEmployes.map((emp) => (
                <tr key={emp.identifiant} className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-4 font-bold text-slate-900">{emp.nomComplet}</td>
                  <td className="py-2.5 px-4 text-slate-600">{emp.poste} &bull; {emp.departement}</td>
                  <td className="py-2.5 px-4"><span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">{emp.typeContrat}</span></td>
                  <td className="py-2.5 px-4 font-extrabold text-slate-900">${emp.salaireMensuel.toLocaleString()}</td>
                  <td className="py-2.5 px-4 text-slate-600">{emp.joursCongesRestants} days balance</td>
                  <td className="py-2.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => supprimerEmploye(emp.identifiant)}
                      className="p-1 text-slate-400 hover:text-red-600 cursor-pointer"
                      title="Remove record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Demandes de Congés */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <h4 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100">Demandes de Congés en Attente d'Approbation</h4>
        <div className="divide-y divide-slate-100 mt-2">
          {listeDemandesConges.map((dem) => (
            <div key={dem.identifiant} className="py-3 flex items-center justify-between gap-4 text-xs">
              <div>
                <span className="font-bold text-slate-900">{dem.nomEmploye}</span> &bull; <span className="text-slate-500">{dem.typeConge}</span>
                <p className="text-[11px] text-slate-500 mt-0.5">Du {dem.dateDebut} au {dem.dateFin} &bull; {dem.motif}</p>
              </div>
              <div className="flex items-center gap-2">
                {dem.statut === 'en_attente' ? (
                  <>
                    <button
                      type="button"
                      onClick={() => traiterDemandeConge(dem.identifiant, 'approuve')}
                      className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 cursor-pointer flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" /> Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => traiterDemandeConge(dem.identifiant, 'refuse')}
                      className="px-2.5 py-1 text-xs font-bold rounded-lg bg-red-50 text-red-700 hover:bg-red-100 cursor-pointer flex items-center gap-1"
                    >
                      <X className="w-3.5 h-3.5" /> Reject
                    </button>
                  </>
                ) : (
                  <span className="font-bold uppercase text-emerald-700">{dem.statut}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
