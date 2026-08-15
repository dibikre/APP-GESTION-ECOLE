import React, { useState } from 'react';
import {
  Megaphone,
  Radio,
  Users,
  ShieldAlert,
} from '../composants/communs/IconesAcademie';
import { BoutonRouge } from '../composants/communs/BoutonRouge';
import { CarteStatistique } from '../composants/communs/CarteStatistique';
import { utiliserAcademie } from '../controleurs/contexteAcademie';
import { FilAnnonces } from './communication/FilAnnonces';
import { ModaleNouvelleAnnonce } from './communication/ModaleNouvelleAnnonce';

export const VueCommunication: React.FC = () => {
  const { listeAnnonces, traduire } = utiliserAcademie();
  const [modaleAnnonceOuverte, setModaleAnnonceOuverte] = useState(false);
  const [filtreCible, setFiltreCible] = useState<string>('all');

  const annoncesFiltrees = listeAnnonces.filter(
    (a) => filtreCible === 'all' || a.cible === filtreCible || a.cible === 'tous'
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {traduire('titreCommunication')}
          </h1>
        </div>
        <BoutonRouge
          texte={traduire('publierAnnonce')}
          icone={Megaphone}
          onClick={() => setModaleAnnonceOuverte(true)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CarteStatistique
          titre={traduire('bulletinsActifs')}
          valeur={listeAnnonces.length}
          sousTitre="Published this semester"
          icone={Radio}
        />
        <CarteStatistique
          titre={traduire('diffusionsParents')}
          valeur={listeAnnonces.filter((a) => a.cible === 'parents' || a.cible === 'tous').length}
          sousTitre="Dispatched to guardians"
          icone={Users}
        />
        <CarteStatistique
          titre={traduire('alertesUrgentes')}
          valeur={listeAnnonces.filter((a) => a.priorite === 'urgente').length}
          sousTitre="Critical notifications"
          icone={ShieldAlert}
        />
      </div>

      <FilAnnonces
        annonces={annoncesFiltrees}
        filtreCible={filtreCible}
        surChangementFiltre={setFiltreCible}
      />

      <ModaleNouvelleAnnonce
        ouvert={modaleAnnonceOuverte}
        surFermeture={() => setModaleAnnonceOuverte(false)}
      />
    </div>
  );
};
