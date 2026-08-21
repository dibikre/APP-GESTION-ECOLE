import React from 'react';
import { useParams } from 'react-router-dom';
import { OngletParentMesEnfants } from './parent/OngletParentMesEnfants';
import { OngletParentSuiviEnfant } from './parent/OngletParentSuiviEnfant';
import { OngletParentFinances } from './parent/OngletParentFinances';
import { OngletParentCantineTransport } from './parent/OngletParentCantineTransport';
import { OngletParentSanteUrgences } from './parent/OngletParentSanteUrgences';
import { OngletParentCalendrier } from './parent/OngletParentCalendrier';
import { OngletParentAutorisations } from './parent/OngletParentAutorisations';
import { OngletParentBibliotheque } from './parent/OngletParentBibliotheque';
import { OngletParentSuiviTempsReel } from './parent/OngletParentSuiviTempsReel';
import { OngletParentCommunication } from './parent/OngletParentCommunication';
import { OngletParentDocuments } from './parent/OngletParentDocuments';
import { OngletParentParametres } from './parent/OngletParentParametres';

export const TableauDeBordParent: React.FC = () => {
  const parametresUrl = useParams<{ sousOnglet?: string }>();
  const cleSousOnglet = parametresUrl.sousOnglet || 'mes-enfants';

  return (
    <div className="space-y-6">
      {/* Route vers les différents sous-modules du Portail Parent */}
      {(cleSousOnglet === 'mes-enfants' || cleSousOnglet === 'accueil' || !parametresUrl.sousOnglet) && (
        <OngletParentMesEnfants />
      )}
      {cleSousOnglet === 'suivi' && <OngletParentSuiviEnfant />}
      {cleSousOnglet === 'finances' && <OngletParentFinances />}
      {cleSousOnglet === 'cantine-transport' && <OngletParentCantineTransport />}
      {cleSousOnglet === 'sante' && <OngletParentSanteUrgences />}
      {cleSousOnglet === 'calendrier' && <OngletParentCalendrier />}
      {cleSousOnglet === 'autorisations' && <OngletParentAutorisations />}
      {cleSousOnglet === 'bibliotheque' && <OngletParentBibliotheque />}
      {cleSousOnglet === 'suivi-temps-reel' && <OngletParentSuiviTempsReel />}
      {(cleSousOnglet === 'documents' || cleSousOnglet === 'resultats') && <OngletParentDocuments />}
      {(cleSousOnglet === 'parametres' || cleSousOnglet === 'absences') && <OngletParentParametres />}
      {cleSousOnglet === 'communication' && <OngletParentCommunication />}
    </div>
  );
};
