import React, { useState } from 'react';
import { UserPlus } from '../composants/communs/IconesAcademie';
import { BoutonRouge } from '../composants/communs/BoutonRouge';
import { utiliserAcademie } from '../controleurs/contexteAcademie';
import { TableauEleves } from './eleves/TableauEleves';
import { ModaleInscriptionEleve } from './eleves/ModaleInscriptionEleve';

export const VueEleves: React.FC = () => {
  const { listeEleves, termeRecherche, traduire } = utiliserAcademie();
  const [modaleEleveOuverte, setModaleEleveOuverte] = useState(false);

  const elevesFiltres = listeEleves.filter(
    (e) =>
      e.nomComplet.toLowerCase().includes(termeRecherche.toLowerCase()) ||
      e.matricule.toLowerCase().includes(termeRecherche.toLowerCase()) ||
      e.classe.toLowerCase().includes(termeRecherche.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {traduire('titreEleves')}
          </h1>
        </div>
        <BoutonRouge
          texte={traduire('inscrireNouvelEleve')}
          icone={UserPlus}
          onClick={() => setModaleEleveOuverte(true)}
        />
      </div>

      <TableauEleves eleves={elevesFiltres} />

      <ModaleInscriptionEleve
        ouvert={modaleEleveOuverte}
        surFermeture={() => setModaleEleveOuverte(false)}
      />
    </div>
  );
};
