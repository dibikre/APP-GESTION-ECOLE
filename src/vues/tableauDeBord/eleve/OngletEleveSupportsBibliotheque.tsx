import React, { useState } from 'react';
import {
  BookOpen,
  Download,
  FileText,
  Search,
  Book,
  Bookmark,
  Eye,
  CheckCircle2,
  Clock,
  Layers,
  X,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { BoutonRouge } from '../../../composants/communs/BoutonRouge';
import { RESSOURCES_PEDAGOGIQUES_INITIALES } from '../../../modeles/donneesInitiales/donneesAvancees';
import { EBOOKS_NUMERIQUES_INITIAUX } from '../../../modeles/donneesInitiales/donneesEleveEtendu';
import { RessourcePedagogique, EbookNumerique } from '../../../modeles/typesEtendus';


export const OngletEleveSupportsBibliotheque: React.FC = () => {
  const [recherche, setRecherche] = useState('');
  const [matiereFiltree, setMatiereFiltree] = useState<string>('toutes');
  const [ongletActif, setOngletActif] = useState<'supports' | 'ebooks' | 'cdi'>('supports');
  const [ebookEnLecture, setEbookEnLecture] = useState<EbookNumerique | null>(null);

  const matieresDisponibles = Array.from(
    new Set(RESSOURCES_PEDAGOGIQUES_INITIALES.map((r) => r.matiere))
  );

  const supportsFiltres = RESSOURCES_PEDAGOGIQUES_INITIALES.filter((r) => {
    const matchMatiere = matiereFiltree === 'toutes' || r.matiere === matiereFiltree;
    const matchTexte =
      r.titre.toLowerCase().includes(recherche.toLowerCase()) ||
      r.professeurNom.toLowerCase().includes(recherche.toLowerCase()) ||
      r.matiere.toLowerCase().includes(recherche.toLowerCase());
    return matchMatiere && matchTexte;
  });

  const ebooksFiltres = EBOOKS_NUMERIQUES_INITIAUX.filter((ebk) => {
    return (
      ebk.titre.toLowerCase().includes(recherche.toLowerCase()) ||
      ebk.auteur.toLowerCase().includes(recherche.toLowerCase()) ||
      ebk.matiere.toLowerCase().includes(recherche.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* En-tête avec onglets de sous-navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-red-600" />
            <h2 className="text-base font-bold text-slate-900">Supports de Cours & Bibliothèque Numérique</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Polycopiés, diaporamas de cours, annales corrigées et manuels numériques officiels du lycée.
          </p>
        </div>

        <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
          <button
            onClick={() => setOngletActif('supports')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              ongletActif === 'supports' ? 'bg-white text-red-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Supports & Polycopiés ({RESSOURCES_PEDAGOGIQUES_INITIALES.length})
          </button>
          <button
            onClick={() => setOngletActif('ebooks')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              ongletActif === 'ebooks' ? 'bg-white text-red-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            E-Books & Manuels ({EBOOKS_NUMERIQUES_INITIAUX.length})
          </button>
          <button
            onClick={() => setOngletActif('cdi')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              ongletActif === 'cdi' ? 'bg-white text-red-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Emprunts CDI (2)
          </button>
        </div>
      </div>

      {/* Barre de Recherche & Filtres */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            placeholder="Rechercher un chapitre, auteur, polycopié..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-red-500"
          />
        </div>

        {ongletActif === 'supports' && (
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-semibold text-slate-600 whitespace-nowrap">Matière :</span>
            <select
              value={matiereFiltree}
              onChange={(e) => setMatiereFiltree(e.target.value)}
              className="text-xs px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-red-500 w-full sm:w-auto"
            >
              <option value="toutes">Toutes les disciplines</option>
              {matieresDisponibles.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* VUE 1 : SUPPORTS DE COURS TÉLÉCHARGEABLES */}
      {ongletActif === 'supports' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {supportsFiltres.map((r) => (
            <div
              key={r.identifiant}
              className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-red-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold mb-2">
                  <span className="px-2 py-0.5 rounded bg-red-50 text-red-700 font-extrabold uppercase">
                    {r.typeFichier}
                  </span>
                  <span>{r.taille}</span>
                </div>

                <h3 className="text-xs font-bold text-slate-900 leading-snug">{r.titre}</h3>
                <div className="mt-2 space-y-0.5 text-[11px] text-slate-500">
                  <p>Matière : <strong className="text-slate-800">{r.matiere}</strong></p>
                  <p>Enseignant : {r.professeurNom}</p>
                  <p className="text-[10px] text-slate-400">Ajouté le {r.dateAjout} &bull; Classe {r.classe}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Format validé
                </span>
                <button
                  onClick={() => alert(`Téléchargement de la ressource : ${r.titre} (${r.typeFichier})`)}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Télécharger
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VUE 2 : CATALOGUE E-BOOKS & MANUELS EN LIGNE */}
      {ongletActif === 'ebooks' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ebooksFiltres.map((ebk) => (
            <div
              key={ebk.identifiant}
              className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-red-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-20 bg-gradient-to-br from-red-600 to-slate-900 rounded-xl flex items-center justify-center text-white shrink-0 shadow-xs">
                  <Book className="w-8 h-8 text-red-200" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {ebk.matiere}
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold">{ebk.format} &bull; {ebk.taille}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mt-1">{ebk.titre}</h3>
                  <p className="text-xs text-slate-600 mt-0.5">{ebk.auteur}</p>
                  <p className="text-[11px] text-slate-500 mt-2 line-clamp-2">{ebk.description}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  {ebk.nombrePages} pages &bull; Niveau {ebk.niveau}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEbookEnLecture(ebk)}
                    className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Lire en ligne
                  </button>
                  <button
                    onClick={() => alert(`Téléchargement du livre numérique complet : ${ebk.titre}`)}
                    className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Télécharger
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VUE 3 : EMPRUNTS AU CENTRE DE DOCUMENTATION (CDI) */}
      {ongletActif === 'cdi' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Ouvrages Physiques Empruntés au CDI</h3>
              <p className="text-xs text-slate-500">Badge lecteur : BDG-75016-889 &bull; Limite d'emprunt : 4 ouvrages simultanés</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">Compte CDI en règle</span>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-start gap-3">
                <Bookmark className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Physique Quantique : Fondements et Applications</span>
                  <p className="text-slate-500 text-[11px]">Auteur : Pr. Claude Cohen-Tannoudji &bull; Cote : 530.12 COH</p>
                  <p className="text-[10px] text-slate-400 mt-1">Emprunté le 20/02/2026</p>
                </div>
              </div>
              <div className="text-right sm:self-center">
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 block">
                  À restituer avant le 15 Mars 2026
                </span>
                <span className="text-[10px] text-slate-500 mt-1 block">9 jours restants</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-start gap-3">
                <Bookmark className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Les Fleurs du Mal (Édition Critique Annotée)</span>
                  <p className="text-slate-500 text-[11px]">Auteur : Charles Baudelaire &bull; Cote : 841.8 BAU</p>
                  <p className="text-[10px] text-slate-400 mt-1">Emprunté le 25/02/2026</p>
                </div>
              </div>
              <div className="text-right sm:self-center">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 block">
                  À restituer avant le 22 Mars 2026
                </span>
                <span className="text-[10px] text-slate-500 mt-1 block">16 jours restants</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE LECTURE D'E-BOOK EN LIGNE */}
      {ebookEnLecture && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <Book className="w-5 h-5 text-red-600" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{ebookEnLecture.titre}</h3>
                  <p className="text-[11px] text-slate-500">{ebookEnLecture.auteur} &bull; {ebookEnLecture.nombrePages} pages</p>
                </div>
              </div>
              <button
                onClick={() => setEbookEnLecture(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs bg-slate-100 flex-1">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4 max-w-2xl mx-auto">
                <div className="text-center pb-4 border-b border-slate-100">
                  <span className="text-[10px] font-bold uppercase text-red-600 tracking-wider">Manuel Académique Officiel</span>
                  <h2 className="text-base font-black text-slate-900 mt-1">{ebookEnLecture.titre}</h2>
                  <p className="text-xs text-slate-500">{ebookEnLecture.auteur}</p>
                </div>

                <div className="space-y-3 leading-relaxed text-slate-700">
                  <h4 className="text-xs font-bold text-slate-900">Sommaire Général du Cours :</h4>
                  <ul className="list-disc pl-5 space-y-1.5 text-[11px] text-slate-600">
                    <li><strong>Chapitre 1 :</strong> Fondements, définitions et cadres théoriques</li>
                    <li><strong>Chapitre 2 :</strong> Propriétés mathématiques et calculs différentiels</li>
                    <li><strong>Chapitre 3 :</strong> Modélisation et expérimentation en laboratoire</li>
                    <li><strong>Chapitre 4 :</strong> Étude de cas et annales des épreuves de baccalauréat</li>
                    <li><strong>Chapitre 5 :</strong> Formulaire complet et corrigés détaillés</li>
                  </ul>

                  <p className="text-[11px] text-slate-600 pt-3 border-t border-slate-100">
                    {ebookEnLecture.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-white border-t border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-500">Visualiseur intégré &bull; Licence établissement active</span>
              <button
                onClick={() => alert(`Téléchargement du livre complet en PDF (${ebookEnLecture.taille})`)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Télécharger la version intégrale
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
