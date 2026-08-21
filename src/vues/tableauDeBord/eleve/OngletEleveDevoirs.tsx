import React, { useState } from 'react';
import {
  Clock,
  UploadCloud,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Filter,
} from 'lucide-react';
import { BoutonRouge } from '../../../composants/communs/BoutonRouge';
import { utiliserAcademie } from '../../../controleurs/contexteAcademie';

export const OngletEleveDevoirs: React.FC = () => {
  const { listeDevoirs } = utiliserAcademie();
  const [filtreStatut, setFiltreStatut] = useState<'tous' | 'a_rendre' | 'rendu'>('tous');
  const [messageConfirmation, setMessageConfirmation] = useState<string | null>(null);

  const devoirsFiltres = listeDevoirs.filter((dev) => {
    if (filtreStatut === 'a_rendre') return dev.statut === 'a_rendre';
    if (filtreStatut === 'rendu') return dev.statut === 'rendu';
    return true;
  });

  const soumettreDevoir = (titre: string) => {
    setMessageConfirmation(`Document pour "${titre}" téléversé et horodaté avec succès.`);
    setTimeout(() => setMessageConfirmation(null), 4000);
  };

  const calendrierExamens = [
    {
      identifiant: 'exam-1',
      matiere: 'Mathématiques Approfondies',
      titre: 'Épreuve Finale - Trimestre 2',
      date: '2026-03-24',
      horaire: '08:30 - 11:30',
      salle: 'Amphithéâtre B',
      coefficient: 4,
      statut: 'À venir',
    },
    {
      identifiant: 'exam-2',
      matiere: 'Physique & Chimie',
      titre: 'Évaluation Pratique & Thermodynamique',
      date: '2026-03-26',
      horaire: '10:00 - 12:00',
      salle: 'Labo Sciences 2',
      coefficient: 3,
      statut: 'À venir',
    },
    {
      identifiant: 'exam-3',
      matiere: 'Littérature & Philosophie',
      titre: 'Dissertation Comparative',
      date: '2026-03-28',
      horaire: '14:00 - 16:00',
      salle: 'Salle 104',
      coefficient: 2,
      statut: 'À venir',
    },
  ];

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Devoirs, Travaux Pratiques & Planning d'Examens</h3>
          <p className="text-xs text-slate-500">
            Rendez vos travaux, suivez les dates d'examens et consultez les corrections des professeurs.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-slate-400" /> Filtrer :
          </span>
          <button
            type="button"
            onClick={() => setFiltreStatut('tous')}
            className={`px-2.5 py-1 text-xs font-bold rounded-md cursor-pointer transition-colors ${
              filtreStatut === 'tous'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Tous ({listeDevoirs.length})
          </button>
          <button
            type="button"
            onClick={() => setFiltreStatut('a_rendre')}
            className={`px-2.5 py-1 text-xs font-bold rounded-md cursor-pointer transition-colors ${
              filtreStatut === 'a_rendre'
                ? 'bg-amber-600 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            En attente
          </button>
          <button
            type="button"
            onClick={() => setFiltreStatut('rendu')}
            className={`px-2.5 py-1 text-xs font-bold rounded-md cursor-pointer transition-colors ${
              filtreStatut === 'rendu'
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Rendus
          </button>
        </div>
      </div>

      {messageConfirmation && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          {messageConfirmation}
        </div>
      )}

      {/* Liste des devoirs */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <h4 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-red-600" /> Travaux Continus & Devoirs Maison
          </span>
          <span className="text-xs font-normal text-slate-500">{devoirsFiltres.length} devoir(s)</span>
        </h4>

        <div className="divide-y divide-slate-100 mt-2">
          {devoirsFiltres.map((dev) => {
            const estRendu = dev.statut === 'rendu';
            return (
              <div
                key={dev.identifiant}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs hover:bg-slate-50/60 rounded-lg px-2 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-slate-900 text-sm">{dev.titre}</span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {dev.matiere}
                    </span>
                    {estRendu ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Rendu
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> À rendre sous peu
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 max-w-2xl">{dev.description}</p>
                  <div className="flex items-center gap-4 text-[11px] text-slate-400 font-semibold pt-1">
                    <span>Date limite : <strong className="text-red-600">{dev.dateEcheance}</strong></span>
                    <span>&bull;</span>
                    <span>Assigné par : Équipe Pédagogique</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <BoutonRouge
                    texte={estRendu ? 'Remplacer le fichier' : 'Déposer le devoir'}
                    icone={UploadCloud}
                    taille="petit"
                    onClick={() => soumettreDevoir(dev.titre)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Calendrier des examens a venir */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <h4 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-red-600" /> Épreuves & Examens Trimestriels à Venir
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {calendrierExamens.map((exam) => (
            <div
              key={exam.identifiant}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded">
                  Coeff. {exam.coefficient}
                </span>
                <span className="text-xs font-bold text-slate-500">{exam.date}</span>
              </div>
              <h5 className="font-bold text-slate-900 text-sm">{exam.titre}</h5>
              <p className="text-xs text-slate-600">{exam.matiere}</p>
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                <span>{exam.horaire}</span>
                <strong className="text-slate-800">{exam.salle}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

