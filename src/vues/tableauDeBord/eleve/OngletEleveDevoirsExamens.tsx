import React, { useState } from 'react';
import {
  CalendarCheck,
  UploadCloud,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Download,
  Calendar,
  X,
  Sparkles,
  Send,
} from 'lucide-react';
import { BoutonRouge } from '../../../composants/communs/BoutonRouge';
import { utiliserAcademie } from '../../../controleurs/contexteAcademie';

interface DevoirSoumission {
  id: string;
  titre: string;
  matiere: string;
  dateEcheance: string;
  professeur: string;
  description: string;
  statut: 'a_rendre' | 'rendu' | 'corrige';
  noteObtenue?: string;
  fichierDepose?: string;
  dateDepot?: string;
  consigneFichierUrl?: string;
}

const DEVOIRS_ELEVE_INITIAUX: DevoirSoumission[] = [
  {
    id: 'dev-1',
    titre: 'Dissertation : La modernité poétique chez Baudelaire',
    matiere: 'Français & Littérature',
    dateEcheance: '2026-03-08 (23h59)',
    professeur: 'Sarah Jenkins',
    description: 'Rédiger une dissertation complète (3 axes) sur la rupture esthétique des Fleurs du Mal avec le romantisme classique.',
    statut: 'a_rendre',
    consigneFichierUrl: 'Consignes_Dissertation_Baudelaire_2026.pdf',
  },
  {
    id: 'dev-2',
    titre: 'Devoir Maison #4 : Intégrales multiples et équations différentielles',
    matiere: 'Mathématiques Approfondies',
    dateEcheance: '2026-03-10 (08h00)',
    professeur: 'Prof. Evelyn Reed',
    description: 'Exercices 18 à 25 du polycopié de cours. Justifier avec rigueur les hypothèses de continuité et de dérivabilité.',
    statut: 'a_rendre',
    consigneFichierUrl: 'DM4_Maths_Integrales_1ereC.pdf',
  },
  {
    id: 'dev-3',
    titre: 'Compte-rendu de TP : Interféromètre de Michelson',
    matiere: 'Physique & Chimie',
    dateEcheance: '2026-03-04 (18h00)',
    professeur: 'Dr. Robert Chen',
    description: 'Exploitation des mesures du vernier et estimation des barres d’incertitude avec k=2.',
    statut: 'rendu',
    fichierDepose: 'CR_TP_Michelson_Marcus_Vance.pdf',
    dateDepot: '2026-03-04 à 16h45',
  },
  {
    id: 'dev-4',
    titre: 'Commentaire de Carte : Les corridors maritimes mondiaux',
    matiere: 'Histoire-Géographie',
    dateEcheance: '2026-02-28 (12h00)',
    professeur: 'M. Jean-Paul Durand',
    description: 'Analyse géostratégique du détroit de Malacca et du canal de Suez.',
    statut: 'corrige',
    noteObtenue: '18 / 20',
    fichierDepose: 'Devoir_Geopolitique_Detroits_Vance.pdf',
    dateDepot: '2026-02-27 à 20h10',
  },
];

interface EpreuveExamen {
  id: string;
  epreuve: string;
  matiere: string;
  date: string;
  horaire: string;
  salle: string;
  surveillant: string;
  materielAutorise: string;
}

const PLANNING_EXAMENS: EpreuveExamen[] = [
  {
    id: 'ep-1',
    epreuve: 'Devoir Commun #2 : Mathématiques Spécialité (4h)',
    matiere: 'Mathématiques',
    date: '2026-03-16',
    horaire: '08h00 - 12h00',
    salle: 'Salle Polyvalente B12',
    surveillant: 'Dr. Robert Chen & Mme Hélène Bamba',
    materielAutorise: 'Calculatrice mode examen activé, règle, compas',
  },
  {
    epreuve: 'Devoir Commun #2 : Physique-Chimie (3h30)',
    id: 'ep-2',
    matiere: 'Physique & Chimie',
    date: '2026-03-18',
    horaire: '08h30 - 12h00',
    salle: 'Salle Polyvalente B12',
    surveillant: 'Prof. Evelyn Reed & M. Jean-Paul Durand',
    materielAutorise: 'Calculatrice scientifique, formulaire officiel fourni',
  },
  {
    epreuve: 'Bac Blanc : Épreuve Écrite Anticipée de Français (4h)',
    id: 'ep-3',
    matiere: 'Français',
    date: '2026-03-20',
    horaire: '08h00 - 12h00',
    salle: 'Grand Hall Lycée',
    surveillant: 'Sarah Jenkins & M. Mercier',
    materielAutorise: 'Aucun document ni matériel électronique autorisé',
  },
];

export const OngletEleveDevoirsExamens: React.FC = () => {
  const [devoirs, setDevoirs] = useState<DevoirSoumission[]>(DEVOIRS_ELEVE_INITIAUX);
  const [filtreStatut, setFiltreStatut] = useState<string>('tous');
  const [devoirADeposer, setDevoirADeposer] = useState<DevoirSoumission | null>(null);
  const [nomFichierSelectionne, setNomFichierSelectionne] = useState<string>('');
  const [commentaireEleve, setCommentaireEleve] = useState<string>('');
  const [depotSucces, setDepotSucces] = useState<boolean>(false);

  const devoirsFiltres = devoirs.filter((d) => {
    if (filtreStatut === 'tous') return true;
    return d.statut === filtreStatut;
  });

  const soumettreDevoir = (e: React.FormEvent) => {
    e.preventDefault();
    if (!devoirADeposer) return;

    setDevoirs((prev) =>
      prev.map((d) =>
        d.id === devoirADeposer.id
          ? {
              ...d,
              statut: 'rendu',
              fichierDepose: nomFichierSelectionne || 'Devoir_Vance_Marcus_Final.pdf',
              dateDepot: `Aujourd'hui à ${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`,
            }
          : d
      )
    );

    setDepotSucces(true);
    setTimeout(() => {
      setDepotSucces(false);
      setDevoirADeposer(null);
      setNomFichierSelectionne('');
      setCommentaireEleve('');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-red-600" />
            <h2 className="text-base font-bold text-slate-900">Devoirs Maison, Dépôts & Planning d'Examens</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Déposez vos travaux numériques, consultez les consignes et suivez le calendrier des épreuves surveillées.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
          {[
            { id: 'tous', libelle: 'Tous les devoirs' },
            { id: 'a_rendre', libelle: 'À rendre' },
            { id: 'rendu', libelle: 'Déposés' },
            { id: 'corrige', libelle: 'Notés' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFiltreStatut(f.id)}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                filtreStatut === f.id ? 'bg-white text-red-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {f.libelle}
            </button>
          ))}
        </div>
      </div>

      {/* Liste des Devoirs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {devoirsFiltres.map((d) => (
          <div
            key={d.id}
            className={`p-5 rounded-2xl border shadow-2xs transition-all flex flex-col justify-between space-y-4 bg-white ${
              d.statut === 'a_rendre'
                ? 'border-red-200 hover:border-red-300'
                : d.statut === 'rendu'
                ? 'border-emerald-200 bg-emerald-50/20'
                : 'border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                  {d.matiere}
                </span>
                {d.statut === 'a_rendre' && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-800 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    À rendre : {d.dateEcheance}
                  </span>
                )}
                {d.statut === 'rendu' && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Déposé avec succès
                  </span>
                )}
                {d.statut === 'corrige' && (
                  <span className="text-xs font-black text-red-600 bg-red-50 px-2.5 py-0.5 rounded-lg border border-red-200">
                    Note : {d.noteObtenue}
                  </span>
                )}
              </div>

              <h3 className="text-sm font-bold text-slate-900 leading-snug">{d.titre}</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">{d.description}</p>

              <div className="mt-3 text-[11px] text-slate-500">
                Enseignant : <strong>{d.professeur}</strong>
              </div>

              {d.fichierDepose && (
                <div className="mt-3 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold text-slate-800 text-[11px]">{d.fichierDepose}</span>
                  </div>
                  <span className="text-[10px] text-slate-500">{d.dateDepot}</span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              {d.consigneFichierUrl && (
                <button
                  onClick={() => alert(`Téléchargement des consignes : ${d.consigneFichierUrl}`)}
                  className="text-xs font-bold text-slate-700 hover:text-red-600 flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Consignes (PDF)
                </button>
              )}

              {d.statut === 'a_rendre' ? (
                <button
                  onClick={() => setDevoirADeposer(d)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer ml-auto"
                >
                  <UploadCloud className="w-4 h-4" />
                  Déposer mon devoir
                </button>
              ) : (
                <button
                  onClick={() => setDevoirADeposer(d)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer ml-auto"
                >
                  Remplacer le fichier
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Planning Officiel des Examens Surveillés */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-red-600" />
              Planning des Devoirs Surveillés Communs & Examens Blancs
            </h3>
            <p className="text-xs text-slate-500">
              Épreuves en conditions officielles de baccalauréat (convocation obligatoire)
            </p>
          </div>
          <span className="text-xs font-bold text-red-700 bg-red-50 px-2.5 py-1 rounded-lg">Session Mars 2026</span>
        </div>

        <div className="divide-y divide-slate-100">
          {PLANNING_EXAMENS.map((ep) => (
            <div key={ep.id} className="py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-16 text-center py-2 bg-red-50 rounded-xl border border-red-200 text-red-800">
                  <span className="text-xs font-black block">{ep.date.split('-')[2]} Mars</span>
                  <span className="text-[10px] font-bold">2026</span>
                </div>
                <div>
                  <span className="font-bold text-sm text-slate-900 block">{ep.epreuve}</span>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    Horaire : <strong>{ep.horaire}</strong> &bull; Salle : <strong>{ep.salle}</strong> &bull; Surveillant : {ep.surveillant}
                  </p>
                  <p className="text-emerald-700 text-[10px] font-semibold mt-1">
                    Matériel autorisé : {ep.materielAutorise}
                  </p>
                </div>
              </div>

              <button
                onClick={() => alert(`Téléchargement de la convocation officielle pour ${ep.epreuve}`)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-bold flex items-center gap-1.5 transition-colors cursor-pointer self-start md:self-auto"
              >
                <Download className="w-3.5 h-3.5" />
                Convocation (PDF)
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL DE DÉPÔT DE DEVOIR */}
      {devoirADeposer && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-black uppercase text-red-600">{devoirADeposer.matiere}</span>
                <h3 className="text-base font-bold text-slate-900">Dépôt Numérique de Devoir</h3>
              </div>
              <button
                onClick={() => setDevoirADeposer(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {depotSucces ? (
              <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-900">Devoir transmis avec succès !</h4>
                <p className="text-xs text-emerald-700">
                  Votre fichier a été horodaté et envoyé à <strong>{devoirADeposer.professeur}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={soumettreDevoir} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Devoir concerné :</label>
                  <p className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-semibold">
                    {devoirADeposer.titre}
                  </p>
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">Sélectionner votre fichier (PDF, DOCX, ZIP max 25 Mo) :</label>
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-5 text-center hover:border-red-400 transition-colors bg-slate-50/50">
                    <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <input
                      type="file"
                      id="input-devoir-fichier"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setNomFichierSelectionne(e.target.files[0].name);
                        }
                      }}
                    />
                    <label
                      htmlFor="input-devoir-fichier"
                      className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer inline-block"
                    >
                      {nomFichierSelectionne ? nomFichierSelectionne : 'Choisir un fichier sur mon appareil'}
                    </label>
                    <p className="text-[10px] text-slate-400 mt-2">Glisser-déposer ou cliquer pour parcourir</p>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">Commentaire pour l'enseignant (optionnel) :</label>
                  <textarea
                    rows={3}
                    value={commentaireEleve}
                    onChange={(e) => setCommentaireEleve(e.target.value)}
                    placeholder="Ex: Bonjour Professeur, voici ma dissertation. J'ai ajouté des références en annexe..."
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setDevoirADeposer(null)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Valider le dépôt officiel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
