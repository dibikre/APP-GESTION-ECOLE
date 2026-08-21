import React, { useState } from 'react';
import {
  Plus,
} from 'lucide-react';
import { BoutonRouge } from '../../../composants/communs/BoutonRouge';
import { utiliserAcademie } from '../../../controleurs/contexteAcademie';

export const OngletSupervisionDiscipline: React.FC = () => {
  const { listeIncidents, ajouterIncident, listeEleves } = utiliserAcademie();

  const [formulaireOuvert, setFormulaireOuvert] = useState(false);
  const [eleveNom, setEleveNom] = useState('');
  const [classe, setClasse] = useState('1ère S1');
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
      sanction: sanction || 'Convocation des parents et avertissement sur le livret scolaire.',
      rapportePar: 'Direction des Études',
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
          <h3 className="text-lg font-bold text-slate-900">Supervision Disciplinaire & Tableau d'Honneur</h3>
          <p className="text-xs text-slate-500">Enregistrez les incidents disciplinaires, attribuez des sanctions et suivez le tableau d'excellence.</p>
        </div>
        <BoutonRouge
          texte="Signaler un incident"
          icone={Plus}
          onClick={() => setFormulaireOuvert(!formulaireOuvert)}
        />
      </div>

      {formulaireOuvert && (
        <form onSubmit={soumettreIncident} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <h4 className="text-sm font-bold text-slate-900">Nouveau Rapport Disciplinaire</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block">Nom de l'élève</label>
              <input
                type="text"
                value={eleveNom}
                onChange={(e) => setEleveNom(e.target.value)}
                placeholder="Ex. Marcus Vance"
                className="w-full mt-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block">Classe</label>
              <select
                value={classe}
                onChange={(e) => setClasse(e.target.value)}
                className="w-full mt-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              >
                <option value="3ème A">3ème A</option>
                <option value="2nde B">2nde B</option>
                <option value="1ère S1">1ère S1</option>
                <option value="Terminale S">Terminale S</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block">Niveau de Gravité</label>
              <select
                value={gravite}
                onChange={(e) => setGravite(e.target.value as any)}
                className="w-full mt-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              >
                <option value="mineure">Infraction Mineure (Bavardage, Retard)</option>
                <option value="moyenne">Manquement Modéré (Devoir non fait, attitude)</option>
                <option value="critique">Incident Critique (Bagarre, Tricherie)</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 block">Détails de l'incident</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez les faits constatés..."
              className="w-full mt-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              rows={2}
              required
            />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <BoutonRouge texte="Annuler" variante="secondaire" taille="petit" onClick={() => setFormulaireOuvert(false)} />
            <BoutonRouge texte="Enregistrer l'incident" taille="petit" type="submit" />
          </div>
        </form>
      )}

      {/* Registre Disciplinaire */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <span className="text-sm font-bold text-slate-900">Registre Disciplinaire de l'Établissement</span>
          <span className="text-xs font-bold text-slate-600">{listeIncidents.length} Incident(s) consigné(s)</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Élève & Classe</th>
                <th className="py-2.5 px-4">Gravité</th>
                <th className="py-2.5 px-4">Description des Faits</th>
                <th className="py-2.5 px-4">Sanction Décidée</th>
                <th className="py-2.5 px-4">Signalé Par</th>
                <th className="py-2.5 px-4 text-right">Statut</th>
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

      {/* Tableau d'Honneur Academique */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <h4 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
          Tableau d'Honneur & Majors de Promotion
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
                <span className="text-sm font-extrabold text-red-600 block">{el.moyenneGenerale} / 20</span>
                <span className="text-[10px] font-semibold text-emerald-700">Assiduité : {el.tauxPresence}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

