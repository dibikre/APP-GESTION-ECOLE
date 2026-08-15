import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Building2,
  Bookmark,
  AlertCircle,
  Plus,
  ArrowRightLeft,
} from '../../composants/communs/IconesAcademie';
import { CarteStatistique } from '../../composants/communs/CarteStatistique';
import { BoutonRouge } from '../../composants/communs/BoutonRouge';
import { utiliserAcademie } from '../../controleurs/contexteAcademie';
import { CHEMINS_APPLICATION } from '../../routes/cheminsApplication';

export const TableauDeBordBibliothecaire: React.FC = () => {
  const {
    listeLivres,
    listeEmprunts,
    retournerLivreEmprunte,
    traduire,
  } = utiliserAcademie();

  const naviguer = useNavigate();

  const totalLivres = listeLivres.reduce((s, l) => s + l.exemplairesTotal, 0);
  const totalDisponibles = listeLivres.reduce((s, l) => s + l.exemplairesDisponibles, 0);
  const empruntsEnCours = listeEmprunts.filter((e) => e.statut !== 'rendu');
  const empruntsEnRetard = listeEmprunts.filter((e) => e.statut === 'en_retard');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase bg-teal-700 text-white">
              {traduire('role_bibliothecaire')}
            </span>
            <span className="text-xs text-slate-500 font-medium">Hannah Campbell &bull; {traduire('apercuBibliotheque')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            {traduire('apercuBibliotheque')}
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <BoutonRouge
            texte={traduire('emprunterLivre')}
            icone={ArrowRightLeft}
            variante="secondaire"
            onClick={() => naviguer(CHEMINS_APPLICATION.BIBLIOTHEQUE)}
          />
          <BoutonRouge
            texte={traduire('ajouterLivre')}
            icone={Plus}
            onClick={() => naviguer(CHEMINS_APPLICATION.BIBLIOTHEQUE)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CarteStatistique
          titre={traduire('fondsDocumentaire')}
          valeur={totalLivres}
          sousTitre={traduire('titresReferences')}
          icone={BookOpen}
          identifiant="bib-carte-total"
        />
        <CarteStatistique
          titre={traduire('disponiblesEnRayon')}
          valeur={totalDisponibles}
          sousTitre={traduire('enRayonActuellement')}
          icone={Building2}
          identifiant="bib-carte-dispo"
        />
        <CarteStatistique
          titre={traduire('empruntsEnCours')}
          valeur={empruntsEnCours.length}
          sousTitre={traduire('retoursAttendusCeMois')}
          icone={Bookmark}
          identifiant="bib-carte-emprunts"
        />
        <CarteStatistique
          titre={traduire('empruntsEnRetardTitre')}
          valeur={empruntsEnRetard.length}
          sousTitre={traduire('rappelsEnvoyes')}
          icone={AlertCircle}
          variation={{ texte: "Urgent", positive: false }}
          identifiant="bib-carte-retard"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">{traduire('suiviEmprunts')}</h2>
              <p className="text-xs text-slate-500">{traduire('menu_emprunts_retours')}</p>
            </div>
            <BoutonRouge
              texte={traduire('voirTout')}
              variante="secondaire"
              taille="petit"
              onClick={() => naviguer(CHEMINS_APPLICATION.BIBLIOTHEQUE)}
            />
          </div>

          <div className="divide-y divide-slate-100 mt-2">
            {listeEmprunts.map((emprunt) => (
              <div key={emprunt.identifiant} className="py-3.5 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{emprunt.titreLivre}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {traduire('emprunteur')}: <strong className="text-slate-700">{emprunt.emprunteurNom}</strong> ({emprunt.emprunteurType}) &bull; {traduire('dateRetourPrevue')}: {emprunt.dateRetourPrevue}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded block mb-1.5 ${
                      emprunt.statut === 'en_retard'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    {emprunt.statut}
                  </span>
                  {emprunt.statut !== 'rendu' && (
                    <button
                      type="button"
                      onClick={() => retournerLivreEmprunte(emprunt.identifiant)}
                      className="text-xs font-bold text-red-600 hover:underline cursor-pointer"
                    >
                      {traduire('rendreLivre')}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">{traduire('titresPopulaires')}</h2>
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                {traduire('catalogueLivres')}
              </span>
            </div>

            <div className="space-y-3 mt-3">
              {listeLivres.slice(0, 3).map((livre) => (
                <div key={livre.identifiant} className="p-3 rounded-lg border border-slate-100 bg-slate-50/70 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{livre.titre}</span>
                    <span className="font-semibold text-emerald-700">{livre.exemplairesDisponibles} {traduire('disponible')}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{livre.auteur} &bull; {livre.emplacement}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <BoutonRouge
              texte={traduire('catalogueLivres')}
              variante="secondaire"
              largeurTotale
              onClick={() => naviguer(CHEMINS_APPLICATION.BIBLIOTHEQUE)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
