import React, { useState } from 'react';
import {
  Building2,
  BookOpen,
  Plus,
  ArrowRightLeft,
  Bookmark,
} from '../composants/communs/IconesAcademie';
import { BoutonRouge } from '../composants/communs/BoutonRouge';
import { CarteStatistique } from '../composants/communs/CarteStatistique';
import { utiliserAcademie } from '../controleurs/contexteAcademie';
import { TableauCatalogueLivres } from './bibliotheque/TableauCatalogueLivres';
import { SectionEmpruntsLivres } from './bibliotheque/SectionEmpruntsLivres';
import { ModaleAjoutLivre } from './bibliotheque/ModaleAjoutLivre';
import { ModaleEmpruntLivre } from './bibliotheque/ModaleEmpruntLivre';

export const VueBibliotheque: React.FC = () => {
  const {
    listeLivres,
    listeEmprunts,
    traduire,
  } = utiliserAcademie();

  const [modaleLivreOuverte, setModaleLivreOuverte] = useState(false);
  const [modaleEmpruntOuverte, setModaleEmpruntOuverte] = useState(false);
  const [termeRechercheLivre, setTermeRechercheLivre] = useState('');

  const totalLivres = listeLivres.reduce((s, l) => s + l.exemplairesTotal, 0);
  const totalDisponibles = listeLivres.reduce((s, l) => s + l.exemplairesDisponibles, 0);
  const empruntsEnCours = listeEmprunts.filter((e) => e.statut !== 'rendu');

  const livresFiltres = listeLivres.filter(
    (l) =>
      l.titre.toLowerCase().includes(termeRechercheLivre.toLowerCase()) ||
      l.auteur.toLowerCase().includes(termeRechercheLivre.toLowerCase()) ||
      l.isbn.includes(termeRechercheLivre)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {traduire('titreBibliotheque')}
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <BoutonRouge
            texte={traduire('emprunterLivre')}
            icone={ArrowRightLeft}
            variante="secondaire"
            onClick={() => setModaleEmpruntOuverte(true)}
          />
          <BoutonRouge
            texte={traduire('ajouterLivre')}
            icone={Plus}
            onClick={() => setModaleLivreOuverte(true)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CarteStatistique
          titre={traduire('fondsDocumentaire')}
          valeur={totalLivres}
          sousTitre="Catalogued volumes"
          icone={BookOpen}
        />
        <CarteStatistique
          titre={traduire('disponiblesEnRayon')}
          valeur={totalDisponibles}
          sousTitre="Ready for checkout"
          icone={Building2}
        />
        <CarteStatistique
          titre={traduire('empruntsEnCours')}
          valeur={empruntsEnCours.length}
          sousTitre="Checked out to patrons"
          icone={Bookmark}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TableauCatalogueLivres
            livres={livresFiltres}
            termeRecherche={termeRechercheLivre}
            surChangementRecherche={setTermeRechercheLivre}
          />
        </div>
        <div>
          <SectionEmpruntsLivres emprunts={listeEmprunts} />
        </div>
      </div>

      <ModaleAjoutLivre
        ouvert={modaleLivreOuverte}
        surFermeture={() => setModaleLivreOuverte(false)}
      />

      <ModaleEmpruntLivre
        ouvert={modaleEmpruntOuverte}
        surFermeture={() => setModaleEmpruntOuverte(false)}
        livresDisponibles={listeLivres.filter((l) => l.exemplairesDisponibles > 0)}
      />
    </div>
  );
};
