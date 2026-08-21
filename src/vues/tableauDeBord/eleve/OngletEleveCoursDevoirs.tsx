import React from 'react';
import {
  Calendar,
  Download,
  UploadCloud,
  Clock,
} from 'lucide-react';
import { BoutonRouge } from '../../../composants/communs/BoutonRouge';
import { utiliserAcademie } from '../../../controleurs/contexteAcademie';

export const OngletEleveCoursDevoirs: React.FC = () => {
  const { listeCoursHoraires, listeDevoirs, listeRessources } = utiliserAcademie();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900">Emploi du Temps, Supports de Cours & Devoirs</h3>
        <p className="text-xs text-slate-500">Consultez les horaires de cours, les fiches pédagogiques et soumettez vos devoirs.</p>
      </div>

      {/* Emploi du temps hebdomadaire */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <h4 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-red-600" /> Emploi du Temps Hebdomadaire (Classe 1ère S1)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
          {listeCoursHoraires.map((c) => (
            <div key={c.identifiant} className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">{c.matiere}</span>
                <span className="font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded text-[10px]">{c.jourSemaine}</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1">{c.professeurNom} &bull; <strong className="text-slate-800">{c.salle}</strong></p>
              <span className="text-[10px] text-slate-400 mt-2 block font-semibold">{c.heureDebut} - {c.heureFin}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Devoirs en attente */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <h4 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-red-600" /> Devoirs & Travaux à Rendre
        </h4>
        <div className="divide-y divide-slate-100 mt-2">
          {listeDevoirs.map((dev) => (
            <div key={dev.identifiant} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-bold text-slate-900">{dev.titre}</span> &bull; <span className="text-slate-500">{dev.matiere}</span>
                <p className="text-[11px] text-slate-600 mt-0.5">{dev.description}</p>
                <span className="text-[10px] font-bold text-red-600 mt-1 block">Échéance : {dev.dateEcheance}</span>
              </div>
              <BoutonRouge
                texte="Déposer le travail"
                icone={UploadCloud}
                taille="petit"
                onClick={() => alert(`Dépôt du document pour : ${dev.titre}`)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Supports de cours telechargeables */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <h4 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-1.5">
          <Download className="w-4 h-4 text-red-600" /> Supports de Cours & Polycopiés
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
          {listeRessources.map((res) => (
            <div key={res.identifiant} className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex flex-col justify-between text-xs">
              <div>
                <span className="font-bold text-slate-900 block">{res.titre}</span>
                <span className="text-[11px] text-slate-500">{res.matiere}</span>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-semibold">{res.typeFichier} &bull; {res.taille}</span>
                <button
                  type="button"
                  onClick={() => alert(`Téléchargement de : ${res.titre}`)}
                  className="text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer"
                >
                  Télécharger
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

