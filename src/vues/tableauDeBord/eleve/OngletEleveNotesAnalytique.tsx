import React, { useState } from 'react';
import {
  Award,
  TrendingUp,
  FileText,
  Download,
  Eye,
  X,
  CheckCircle2,
  AlertCircle,
  BarChart2,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { BoutonRouge } from '../../../composants/communs/BoutonRouge';
import { utiliserAcademie } from '../../../controleurs/contexteAcademie';
import { CORRECTIONS_EXAMENS_INITIALES } from '../../../modeles/donneesInitiales/donneesEleveEtendu';
import { CorrectionExamenDetaillee } from '../../../modeles/typesEtendus';


const DONNEES_EVOLUTION_TRIMESTRES = [
  { trimestre: 'T1 (Sept-Déc)', moyenneEleve: 16.6, moyenneClasse: 13.2, noteMax: 18.8 },
  { trimestre: 'T2 (Jan-Mars)', moyenneEleve: 17.4, moyenneClasse: 13.8, noteMax: 19.5 },
  { trimestre: 'T3 (Projeté)', moyenneEleve: 17.8, moyenneClasse: 14.1, noteMax: 19.8 },
];

const DONNEES_COMPARAISON_MATIERES = [
  { matiere: 'Mathématiques', eleve: 18.5, classe: 13.8, max: 19.5 },
  { matiere: 'Physique-Chimie', eleve: 17.0, classe: 12.4, max: 18.0 },
  { matiere: 'Français & Litt.', eleve: 16.0, classe: 13.1, max: 17.5 },
  { matiere: 'Histoire-Géo', eleve: 16.5, classe: 14.0, max: 18.5 },
  { matiere: 'Sciences Ingénieur', eleve: 17.5, classe: 14.2, max: 19.0 },
  { matiere: 'Anglais LV1', eleve: 18.0, classe: 14.6, max: 19.5 },
  { matiere: 'EPS', eleve: 16.0, classe: 15.2, max: 18.0 },
];

export const OngletEleveNotesAnalytique: React.FC = () => {
  const { listeNotes } = utiliserAcademie();
  const [matiereFiltree, setMatiereFiltree] = useState<string>('toutes');
  const [examenSelectionne, setExamenSelectionne] = useState<CorrectionExamenDetaillee | null>(null);
  const [telechargementBulletinReussi, setTelechargementBulletinReussi] = useState(false);

  const matieresUniques = Array.from(new Set(listeNotes.map((n) => n.matiere)));

  const notesAffichees = listeNotes.filter((n) => {
    if (matiereFiltree === 'toutes') return true;
    return n.matiere === matiereFiltree;
  });

  const moyenneGlobale = (
    notesAffichees.reduce((s, n) => s + (n.noteObtenue / n.noteMaximale) * 20, 0) /
    (notesAffichees.length || 1)
  ).toFixed(1);

  const telechargerBulletin = () => {
    setTelechargementBulletinReussi(true);
    setTimeout(() => setTelechargementBulletinReussi(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* En-tête & Export du Bulletin Officiel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-red-600" />
            <h2 className="text-base font-bold text-slate-900">Relevé de Notes, Évolution & Copies Scannées</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Élève : <strong>Marcus Vance</strong> &bull; Classe : <strong>1ère C</strong> &bull; Année Scolaire 2025-2026
          </p>
        </div>

        <div className="flex items-center gap-2">
          <BoutonRouge
            texte={telechargementBulletinReussi ? 'Bulletin PDF Exporté !' : 'Télécharger le Bulletin (T2)'}
            icone={Download}
            onClick={telechargerBulletin}
          />
        </div>
      </div>

      {telechargementBulletinReussi && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          Bulletin officiel du 2e Trimestre généré avec signature de la Direction des Études. Fichier sécurisé téléchargé.
        </div>
      )}

      {/* Indicateurs Synthétiques de Performance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block">Moyenne Générale Actuelle</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-red-600">17.4</span>
            <span className="text-xs text-slate-400 font-bold">/ 20</span>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 mt-1 block">+0.8 pt vs Trimestre 1</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block">Moyenne de la Classe</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-800">13.8</span>
            <span className="text-xs text-slate-400 font-bold">/ 20</span>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 mt-1 block">Écart positif : +3.6 pts</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block">Rang de Promotion</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-800">2e</span>
            <span className="text-xs text-slate-400 font-bold">/ 28 élèves</span>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 mt-1 block">Tableau d'Honneur Félicitations</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block">Évaluations Réalisées</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-800">{listeNotes.length}</span>
            <span className="text-xs text-slate-400 font-bold">épreuves</span>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 mt-1 block">100% notées & corrigées</span>
        </div>
      </div>

      {/* Graphiques Analytiques Recharts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique 1 : Évolution des Moyennes dans le Temps */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-red-600" />
              <h3 className="text-sm font-bold text-slate-900">Évolution de la Moyenne dans le Temps</h3>
            </div>
            <span className="text-[10px] font-bold uppercase bg-red-50 text-red-700 px-2 py-0.5 rounded">
              Progression Trimestrielle
            </span>
          </div>

          <div className="h-64 mt-4 text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={DONNEES_EVOLUTION_TRIMESTRES} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="trimestre" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis domain={[10, 20]} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '0.75rem', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Line
                  type="monotone"
                  dataKey="moyenneEleve"
                  name="Marcus Vance (Élève)"
                  stroke="#dc2626"
                  strokeWidth={3}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="moyenneClasse"
                  name="Moyenne de Classe"
                  stroke="#64748b"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                />
                <Line
                  type="monotone"
                  dataKey="noteMax"
                  name="Meilleure Note"
                  stroke="#10b981"
                  strokeWidth={1.5}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Graphique 2 : Comparaison par Matière vs Classe */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-red-600" />
              <h3 className="text-sm font-bold text-slate-900">Comparaison par Matière vs Moyenne de Classe</h3>
            </div>
            <span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
              Barème / 20
            </span>
          </div>

          <div className="h-64 mt-4 text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DONNEES_COMPARAISON_MATIERES} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="matiere" tick={{ fontSize: 10, fill: '#64748b' }} angle={-15} textAnchor="end" height={35} />
                <YAxis domain={[0, 20]} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '0.75rem', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="eleve" name="Note Élève" fill="#dc2626" radius={[4, 4, 0, 0]} />
                <Bar dataKey="classe" name="Moyenne Classe" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Section : Copies Scannées & Examens Détaillés */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-red-600" />
              Copies Scannées & Corrigés Types d'Examens
            </h3>
            <p className="text-xs text-slate-500">
              Consultez vos copies d'épreuves annotées par les professeurs avec le barème question par question
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CORRECTIONS_EXAMENS_INITIALES.map((cor) => (
            <div
              key={cor.identifiant}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-red-300 transition-all flex flex-col justify-between space-y-3 shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold mb-1">
                  <span>{cor.matiere}</span>
                  <span>{cor.dateExamen}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 leading-snug">{cor.titreEvaluation}</h4>
                <p className="text-[11px] text-slate-600 mt-1.5 line-clamp-2 italic">
                  "{cor.appreciationProfesseur}"
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-base font-black text-red-600">{cor.noteObtenue} / {cor.noteMaximale}</span>
                  <span className="text-[10px] text-slate-500 block">Classe : {cor.moyenneClasse}/20</span>
                </div>
                <button
                  onClick={() => setExamenSelectionne(cor)}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Voir la copie
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tableau Complet du Relevé de Notes */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Relevé Synthétique par Évaluation</h3>
            <p className="text-xs text-slate-500">Filtrer par matière pour examiner les coefficients et mentions</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600">Discipline :</span>
            <select
              value={matiereFiltree}
              onChange={(e) => setMatiereFiltree(e.target.value)}
              className="text-xs px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-red-500"
            >
              <option value="toutes">Toutes les matières</option>
              {matieresUniques.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">Matière & Épreuve</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Note Obtenue</th>
                <th className="py-3 px-4">Barème / %</th>
                <th className="py-3 px-4">Appréciation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {notesAffichees.map((note) => {
                const note20 = (note.noteObtenue / note.noteMaximale) * 20;
                const pct = Math.round((note.noteObtenue / note.noteMaximale) * 100);

                return (
                  <tr key={note.identifiant} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-bold text-slate-900 block">{note.matiere}</span>
                      <span className="text-[11px] text-slate-500">{note.titreEvaluation}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 whitespace-nowrap">{note.dateEvaluation}</td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-[10px] uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {note.typeEvaluation || 'Contrôle Continu'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm font-extrabold text-red-600">
                        {note20.toFixed(1)} / 20
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-emerald-700">{pct}%</span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 text-[11px]">
                      {note.commentaire || 'Travail très sérieux et bien structuré.'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DE VISUALISATION DE COPIE SCANNÉE & BARÈME */}
      {examenSelectionne && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-black uppercase text-red-600">{examenSelectionne.matiere}</span>
                <h3 className="text-base font-bold text-slate-900">{examenSelectionne.titreEvaluation}</h3>
                <p className="text-xs text-slate-500">Date d'examen : {examenSelectionne.dateExamen} &bull; Rang : {examenSelectionne.rangEleve}e / {examenSelectionne.effectifTotal}</p>
              </div>
              <button
                onClick={() => setExamenSelectionne(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Note & Statistiques de l'Examen */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-center">
                <span className="text-[10px] font-bold text-red-800 block">Note de l'Élève</span>
                <span className="text-xl font-black text-red-600">{examenSelectionne.noteObtenue} / {examenSelectionne.noteMaximale}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[10px] font-bold text-slate-600 block">Moyenne Classe</span>
                <span className="text-xl font-black text-slate-800">{examenSelectionne.moyenneClasse} / 20</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[10px] font-bold text-slate-600 block">Note Minimale</span>
                <span className="text-xl font-black text-slate-600">{examenSelectionne.noteMin} / 20</span>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
                <span className="text-[10px] font-bold text-emerald-800 block">Note Maximale</span>
                <span className="text-xl font-black text-emerald-700">{examenSelectionne.noteMax} / 20</span>
              </div>
            </div>

            {/* Appréciation du Professeur */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <span className="font-bold text-slate-900 block mb-1">Appréciation de l'Enseignant :</span>
              <p className="text-slate-700 italic">"{examenSelectionne.appreciationProfesseur}"</p>
            </div>

            {/* Barème Détaillé Question par Question */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Barème & Annotations Détaillées :</h4>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                {examenSelectionne.baremeDetaille.map((item, idx) => (
                  <div key={idx} className="p-3 flex items-start justify-between gap-4 text-xs bg-white">
                    <div className="space-y-0.5">
                      <span className="font-bold text-slate-900 block">{item.question}</span>
                      <p className="text-[11px] text-slate-600">{item.commentaire}</p>
                    </div>
                    <span className="font-black text-red-600 text-xs whitespace-nowrap bg-red-50 px-2 py-1 rounded">
                      {item.pointsObtenus} / {item.totalPoints} pts
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Téléchargements de la Copie & du Corrigé */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <div className="text-xs text-slate-500">
                Fichiers archivés dans le coffre académique
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <BoutonRouge
                  texte="Télécharger la Copie Scannée (PDF)"
                  icone={Download}
                  variante="secondaire"
                  taille="petit"
                  onClick={() => alert(`Téléchargement de : ${examenSelectionne.copieScanneNom}`)}
                />
                <BoutonRouge
                  texte="Corrigé Type Officiel"
                  icone={Download}
                  taille="petit"
                  onClick={() => alert(`Téléchargement de : ${examenSelectionne.corrigeTypeNom}`)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
