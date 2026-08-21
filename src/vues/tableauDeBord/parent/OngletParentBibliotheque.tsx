import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle,
  Clock,
  AlertTriangle,
  Search,
  BookMarked,
  Plus,
  RefreshCw,
  Info,
} from 'lucide-react';
import { CarteStatistique } from '../../../composants/communs/CarteStatistique';

interface EmpruntManuel {
  id: string;
  titre: string;
  matiere: string;
  eleveConcerne: string;
  type: 'manuel' | 'roman' | 'cdi';
  codeBarre: string;
  dateEmprunt: string;
  dateRetourPrevue: string;
  statut: 'en_cours' | 'a_rendre_bientot' | 'retard';
  etatLivre: 'Neuf' | 'Très bon' | 'Bon état';
}

const EMPRUNTS_INITIALS: EmpruntManuel[] = [
  {
    id: 'emp-1',
    titre: 'Mathématiques Spécialité 1ère (Collection Barbazo)',
    matiere: 'Mathématiques',
    eleveConcerne: 'Marcus Vance (1ère C)',
    type: 'manuel',
    codeBarre: 'MAN-2025-MAT-441',
    dateEmprunt: '04 Septembre 2025',
    dateRetourPrevue: '20 Juin 2026',
    statut: 'en_cours',
    etatLivre: 'Très bon',
  },
  {
    id: 'emp-2',
    titre: 'Physique-Chimie 1ère Spécialité (Hachette Éducation)',
    matiere: 'Physique-Chimie',
    eleveConcerne: 'Marcus Vance (1ère C)',
    type: 'manuel',
    codeBarre: 'MAN-2025-PHY-882',
    dateEmprunt: '04 Septembre 2025',
    dateRetourPrevue: '20 Juin 2026',
    statut: 'en_cours',
    etatLivre: 'Bon état',
  },
  {
    id: 'emp-3',
    titre: 'L’Étranger — Albert Camus (Édition Folio Plus Classiques)',
    matiere: 'Français & Littérature',
    eleveConcerne: 'Marcus Vance (1ère C)',
    type: 'roman',
    codeBarre: 'CDI-ROM-9912',
    dateEmprunt: '05 Février 2026',
    dateRetourPrevue: '05 Mars 2026',
    statut: 'en_cours',
    etatLivre: 'Très bon',
  },
  {
    id: 'emp-4',
    titre: 'Français Fleurs d’Encre 6ème (Hachette)',
    matiere: 'Français',
    eleveConcerne: 'Sophie Vance (6ème A)',
    type: 'manuel',
    codeBarre: 'MAN-2025-FRA-102',
    dateEmprunt: '04 Septembre 2025',
    dateRetourPrevue: '20 Juin 2026',
    statut: 'en_cours',
    etatLivre: 'Neuf',
  },
  {
    id: 'emp-5',
    titre: 'Les Mille et Une Nuits (Contes choisis illustrés)',
    matiere: 'Lecture CDI',
    eleveConcerne: 'Sophie Vance (6ème A)',
    type: 'cdi',
    codeBarre: 'CDI-JEU-3310',
    dateEmprunt: '10 Février 2026',
    dateRetourPrevue: '28 Février 2026',
    statut: 'a_rendre_bientot',
    etatLivre: 'Bon état',
  },
];

export const OngletParentBibliotheque: React.FC = () => {
  const [emprunts, setEmprunts] = useState<EmpruntManuel[]>(EMPRUNTS_INITIALS);
  const [filtreEnfant, setFiltreEnfant] = useState<'tous' | 'marcus' | 'sophie'>('tous');
  const [prolongationMessage, setProlongationMessage] = useState<string | null>(null);

  const prolongerPret = (id: string, titre: string) => {
    setEmprunts((anciens) =>
      anciens.map((e) =>
        e.id === id ? { ...e, dateRetourPrevue: '20 Mars 2026', statut: 'en_cours' } : e
      )
    );
    setProlongationMessage(`Prêt prolongé de 3 semaines pour « ${titre} » !`);
    setTimeout(() => setProlongationMessage(null), 4000);
  };

  const empruntsFiltres = emprunts.filter((e) => {
    if (filtreEnfant === 'marcus' && !e.eleveConcerne.toLowerCase().includes('marcus')) return false;
    if (filtreEnfant === 'sophie' && !e.eleveConcerne.toLowerCase().includes('sophie')) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-red-600" />
            Bibliothèque Scolaire, Manuels & Prêts CDI
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Inventaire des manuels scolaires attribués pour l'année, suivi des emprunts de romans au CDI et prolongation en ligne.
          </p>
        </div>

        {/* Filtre enfant */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <button
            type="button"
            onClick={() => setFiltreEnfant('tous')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              filtreEnfant === 'tous' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tous les livres ({emprunts.length})
          </button>
          <button
            type="button"
            onClick={() => setFiltreEnfant('marcus')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              filtreEnfant === 'marcus' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Marcus (1ère C)
          </button>
          <button
            type="button"
            onClick={() => setFiltreEnfant('sophie')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              filtreEnfant === 'sophie' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sophie (6ème A)
          </button>
        </div>
      </div>

      {prolongationMessage && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-bold text-emerald-900 flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{prolongationMessage}</span>
        </div>
      )}

      {/* Cartes KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CarteStatistique
          titre="Manuels Scolaires Prêtés"
          valeur="3 Manuels"
          sousTitre="Année complète 2025-2026"
          icone={BookMarked}
          identifiant="kpi-manuels"
        />
        <CarteStatistique
          titre="Emprunts CDI en Cours"
          valeur="2 Ouvrages"
          sousTitre="1 à restituer sous 7 jours"
          icone={Clock}
          identifiant="kpi-cdi"
        />
        <CarteStatistique
          titre="Caution & État Général"
          valeur="100% Conforme"
          sousTitre="Aucune pénalité ni dégradation"
          icone={CheckCircle}
          identifiant="kpi-caution"
        />
      </div>

      {/* Tableau des Livres & Manuels */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-900">Registre des Livres Attribués aux Enfants</h3>
          <span className="text-xs text-slate-500 font-bold">Portail CDI de l'Académie</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Titre de l'Ouvrage</th>
                <th className="py-3 px-4">Élève & Discipline</th>
                <th className="py-3 px-4">Type & Réf</th>
                <th className="py-3 px-4">Date de Prêt</th>
                <th className="py-3 px-4">Retour Prévu</th>
                <th className="py-3 px-4">État Initial</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {empruntsFiltres.map((livre) => (
                <tr key={livre.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900 max-w-xs">
                    {livre.titre}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-900 block">{livre.eleveConcerne}</span>
                    <span className="text-[10px] text-slate-500 font-semibold">{livre.matiere}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-700 block w-fit">
                      {livre.type === 'manuel' ? 'Manuel Annuel' : 'Roman / CDI'}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 mt-0.5 block">{livre.codeBarre}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{livre.dateEmprunt}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`font-bold inline-flex items-center gap-1 ${
                        livre.statut === 'a_rendre_bientot' ? 'text-amber-700' : 'text-slate-900'
                      }`}
                    >
                      {livre.statut === 'a_rendre_bientot' && <Clock className="w-3.5 h-3.5 text-amber-600" />}
                      {livre.dateRetourPrevue}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {livre.etatLivre}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {livre.type !== 'manuel' && (
                      <button
                        type="button"
                        onClick={() => prolongerPret(livre.id, livre.titre)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-bold text-xs flex items-center gap-1 ml-auto cursor-pointer transition-colors"
                      >
                        <RefreshCw className="w-3 h-3 text-red-600" />
                        <span>Prolonger</span>
                      </button>
                    )}
                    {livre.type === 'manuel' && (
                      <span className="text-[11px] text-slate-400 italic">Prêt jusqu'à fin juin</span>
                    )}
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
