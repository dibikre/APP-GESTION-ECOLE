import React, { useState } from 'react';
import {
  UserPlus,
  UploadCloud,
  FileText,
  Search,
  Plus,
  Trash2,
  CheckCircle,
} from '../../../composants/communs/IconesAcademie';
import { BoutonRouge } from '../../../composants/communs/BoutonRouge';
import { utiliserAcademie } from '../../../controleurs/contexteAcademie';
import { CLASSES_SECONDAIRE } from '../../../modeles/classesAcademiques';

export const OngletSecretaireInscriptions: React.FC = () => {
  const { listeEleves, ajouterEleve, supprimerEleve } = utiliserAcademie();

  const [formulaireOuvert, setFormulaireOuvert] = useState(false);
  const [nomComplet, setNomComplet] = useState('');
  const [classe, setClasse] = useState('6e A');
  const [dateNaissance, setDateNaissance] = useState('2014-04-12');
  const [courriel, setCourriel] = useState('');
  const [nomParent, setNomParent] = useState('');
  const [telephoneParent, setTelephoneParent] = useState('');
  const [recherche, setRecherche] = useState('');

  const soumettreInscription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomComplet || !nomParent) return;
    ajouterEleve({
      nomComplet,
      classe,
      dateNaissance,
      courriel: courriel || `${nomComplet.toLowerCase().replace(/\s+/g, '.')}@student.academy.edu`,
      nomParent,
      telephoneParent,
      statutFrais: 'en_retard',
      moyenneGenerale: 85,
      tauxPresence: 100,
    });
    setNomComplet('');
    setNomParent('');
    setTelephoneParent('');
    setFormulaireOuvert(false);
  };

  const elevesFiltres = listeEleves.filter(
    (e) =>
      e.nomComplet.toLowerCase().includes(recherche.toLowerCase()) ||
      e.matricule.toLowerCase().includes(recherche.toLowerCase()) ||
      e.classe.toLowerCase().includes(recherche.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Student Enrolment & Admissions Office (6e à Terminale)</h3>
          <p className="text-xs text-slate-500">Register new students, upload civil dossier attachments, and manage secondary transfers.</p>
        </div>
        <div className="flex items-center gap-2">
          <BoutonRouge
            texte="Import Student CSV"
            variante="secondaire"
            icone={UploadCloud}
            onClick={() => alert('Opening CSV Batch Student Importer...')}
          />
          <BoutonRouge
            texte="Enroll New Student"
            icone={UserPlus}
            onClick={() => setFormulaireOuvert(!formulaireOuvert)}
          />
        </div>
      </div>

      {formulaireOuvert && (
        <form onSubmit={soumettreInscription} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h4 className="text-sm font-bold text-slate-900">New Student Registration Form (Dossier d'Inscription)</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block">Student Full Name</label>
              <input
                type="text"
                value={nomComplet}
                onChange={(e) => setNomComplet(e.target.value)}
                placeholder="e.g. Liam Anderson"
                className="w-full mt-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block">Cohort & Class (6e à Terminale)</label>
              <select
                value={classe}
                onChange={(e) => setClasse(e.target.value)}
                className="w-full mt-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
              >
                <optgroup label="Cycle Collège (6e à 3e)">
                  {CLASSES_SECONDAIRE.filter(c => c.cycle === 'college').map(c => (
                    <option key={c.code} value={c.code}>{c.nomCourt} - {c.nomComplet}</option>
                  ))}
                </optgroup>
                <optgroup label="Cycle Lycée (2nde à Terminale)">
                  {CLASSES_SECONDAIRE.filter(c => c.cycle === 'lycee').map(c => (
                    <option key={c.code} value={c.code}>{c.nomCourt} - {c.nomComplet}</option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block">Date of Birth</label>
              <input
                type="date"
                value={dateNaissance}
                onChange={(e) => setDateNaissance(e.target.value)}
                className="w-full mt-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block">Parent / Guardian Full Name</label>
              <input
                type="text"
                value={nomParent}
                onChange={(e) => setNomParent(e.target.value)}
                placeholder="e.g. Robert Anderson"
                className="w-full mt-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block">Parent Emergency Telephone</label>
              <input
                type="text"
                value={telephoneParent}
                onChange={(e) => setTelephoneParent(e.target.value)}
                placeholder="+1 (555) 019-3344"
                className="w-full mt-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block">Required Attachments Status</label>
              <span className="text-[11px] text-slate-500 block mt-2">Birth cert &bull; Vaccine record &bull; Photos</span>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <BoutonRouge texte="Cancel" variante="secondaire" taille="petit" onClick={() => setFormulaireOuvert(false)} />
            <BoutonRouge texte="Register Student" taille="petit" type="submit" />
          </div>
        </form>
      )}

      {/* Student Registry Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-sm font-bold text-slate-900">Enrolled Student Register ({listeEleves.length})</span>
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              placeholder="Search by name, ID, class..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Student ID & Name</th>
                <th className="py-2.5 px-4">Cohort</th>
                <th className="py-2.5 px-4">Guardian Contact</th>
                <th className="py-2.5 px-4">Tuition Status</th>
                <th className="py-2.5 px-4">Academic Standing</th>
                <th className="py-2.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {elevesFiltres.map((el) => (
                <tr key={el.identifiant} className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-4">
                    <span className="font-bold text-slate-900 block">{el.nomComplet}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{el.matricule}</span>
                  </td>
                  <td className="py-2.5 px-4 font-semibold text-slate-700">{el.classe}</td>
                  <td className="py-2.5 px-4">
                    <span className="font-semibold text-slate-800 block">{el.nomParent}</span>
                    <span className="text-[10px] text-slate-500">{el.telephoneParent}</span>
                  </td>
                  <td className="py-2.5 px-4">
                    <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                      el.statutFrais === 'paye' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
                    }`}>
                      {el.statutFrais}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 font-extrabold text-slate-900">{el.moyenneGenerale}% GPA</td>
                  <td className="py-2.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => supprimerEleve(el.identifiant)}
                      className="p-1 text-slate-400 hover:text-red-600 cursor-pointer"
                      title="De-register student"
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
    </div>
  );
};
