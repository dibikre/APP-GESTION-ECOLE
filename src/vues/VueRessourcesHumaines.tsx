import React, { useState } from 'react';
import {
  Users,
  Calendar,
  DollarSign,
  UserPlus,
  Clock,
} from '../composants/communs/IconesAcademie';
import { BoutonRouge } from '../composants/communs/BoutonRouge';
import { CarteStatistique } from '../composants/communs/CarteStatistique';
import { utiliserAcademie } from '../controleurs/contexteAcademie';
import { TableauEmployes } from './rh/TableauEmployes';
import { SectionDemandesConges } from './rh/SectionDemandesConges';
import { ModaleNouvelEmploye } from './rh/ModaleNouvelEmploye';
import { ModaleDemandeConge } from './rh/ModaleDemandeConge';

export const VueRessourcesHumaines: React.FC = () => {
  const {
    listeEmployes,
    listeDemandesConges,
    traduire,
  } = utiliserAcademie();

  const [modaleEmployeOuverte, setModaleEmployeOuverte] = useState(false);
  const [modaleCongeOuverte, setModaleCongeOuverte] = useState(false);

  const masseSalariale = listeEmployes.reduce((s, emp) => s + emp.salaireMensuel, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {traduire('titreRH')}
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <BoutonRouge
            texte={traduire('demanderConge')}
            icone={Calendar}
            variante="secondaire"
            onClick={() => setModaleCongeOuverte(true)}
          />
          <BoutonRouge
            texte={traduire('ajouterEmploye')}
            icone={UserPlus}
            onClick={() => setModaleEmployeOuverte(true)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CarteStatistique
          titre={traduire('effectifActif')}
          valeur={listeEmployes.length}
          sousTitre="Full-time & contracted"
          icone={Users}
        />
        <CarteStatistique
          titre={traduire('masseSalarialeMensuelle')}
          valeur={`$${masseSalariale.toLocaleString()}`}
          sousTitre="Gross staff compensation"
          icone={DollarSign}
        />
        <CarteStatistique
          titre={traduire('congesEnAttente')}
          valeur={listeDemandesConges.filter((c) => c.statut === 'en_attente').length}
          sousTitre="Awaiting HR approval"
          icone={Clock}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TableauEmployes employes={listeEmployes} />
        </div>
        <div>
          <SectionDemandesConges demandes={listeDemandesConges} />
        </div>
      </div>

      <ModaleNouvelEmploye
        ouvert={modaleEmployeOuverte}
        surFermeture={() => setModaleEmployeOuverte(false)}
      />

      <ModaleDemandeConge
        ouvert={modaleCongeOuverte}
        surFermeture={() => setModaleCongeOuverte(false)}
        listeEmployes={listeEmployes}
      />
    </div>
  );
};
