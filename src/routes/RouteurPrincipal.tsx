import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { TableauDeBordDirecteur } from '../vues/tableauDeBord/TableauDeBordDirecteur';
import { TableauDeBordProfesseur } from '../vues/tableauDeBord/TableauDeBordProfesseur';
import { TableauDeBordEleve } from '../vues/tableauDeBord/TableauDeBordEleve';
import { TableauDeBordParent } from '../vues/tableauDeBord/TableauDeBordParent';
import { TableauDeBordSecretaire } from '../vues/tableauDeBord/TableauDeBordSecretaire';
import { TableauDeBordComptable } from '../vues/tableauDeBord/TableauDeBordComptable';
import { TableauDeBordRH } from '../vues/tableauDeBord/TableauDeBordRH';
import { TableauDeBordBibliothecaire } from '../vues/tableauDeBord/TableauDeBordBibliothecaire';
import { TableauDeBordCommunication } from '../vues/tableauDeBord/TableauDeBordCommunication';
import { VueAdministration } from '../vues/VueAdministration';
import { VueProfesseurs } from '../vues/VueProfesseurs';
import { VueEleves } from '../vues/VueEleves';
import { VueParents } from '../vues/VueParents';
import { VueComptabilite } from '../vues/VueComptabilite';
import { VueRessourcesHumaines } from '../vues/VueRessourcesHumaines';
import { VueBibliotheque } from '../vues/VueBibliotheque';
import { VueCommunication } from '../vues/VueCommunication';
import { RedirectionTableauDeBord } from './RedirectionTableauDeBord';
import { CHEMINS_APPLICATION } from './cheminsApplication';

export const RouteurPrincipal: React.FC = () => {
  return (
    <Routes>
      {/* Redirection racine vers tableau de bord */}
      <Route path={CHEMINS_APPLICATION.ACCUEIL} element={<Navigate to={CHEMINS_APPLICATION.TABLEAU_DE_BORD} replace />} />

      {/* Redirection dynamique selon le rôle actif */}
      <Route path={CHEMINS_APPLICATION.TABLEAU_DE_BORD} element={<RedirectionTableauDeBord />} />

      {/* Routes dédiées pour chaque tableau de bord et ses sous-onglets */}
      <Route path={`${CHEMINS_APPLICATION.TABLEAU_DE_BORD_DIRECTEUR}/:sousOnglet?`} element={<TableauDeBordDirecteur />} />
      <Route path="/tableau-de-bord/administrateur/:sousOnglet?" element={<TableauDeBordDirecteur />} />
      <Route path={`${CHEMINS_APPLICATION.TABLEAU_DE_BORD_PROFESSEUR}/:sousOnglet?`} element={<TableauDeBordProfesseur />} />
      <Route path={`${CHEMINS_APPLICATION.TABLEAU_DE_BORD_ELEVE}/:sousOnglet?`} element={<TableauDeBordEleve />} />
      <Route path={`${CHEMINS_APPLICATION.TABLEAU_DE_BORD_PARENT}/:sousOnglet?`} element={<TableauDeBordParent />} />
      <Route path={`${CHEMINS_APPLICATION.TABLEAU_DE_BORD_SECRETAIRE}/:sousOnglet?`} element={<TableauDeBordSecretaire />} />
      <Route path={CHEMINS_APPLICATION.TABLEAU_DE_BORD_COMPTABLE} element={<TableauDeBordComptable />} />
      <Route path={CHEMINS_APPLICATION.TABLEAU_DE_BORD_RH} element={<TableauDeBordRH />} />
      <Route path={CHEMINS_APPLICATION.TABLEAU_DE_BORD_BIBLIOTHECAIRE} element={<TableauDeBordBibliothecaire />} />
      <Route path={CHEMINS_APPLICATION.TABLEAU_DE_BORD_COMMUNICATION} element={<TableauDeBordCommunication />} />

      {/* Routes des modules principaux */}
      <Route path={CHEMINS_APPLICATION.ADMINISTRATION} element={<VueAdministration />} />
      <Route path={CHEMINS_APPLICATION.PROFESSEURS} element={<VueProfesseurs />} />
      <Route path={CHEMINS_APPLICATION.ELEVES} element={<VueEleves />} />
      <Route path={CHEMINS_APPLICATION.PARENTS} element={<VueParents />} />
      <Route path={CHEMINS_APPLICATION.COMPTABILITE} element={<VueComptabilite />} />
      <Route path={CHEMINS_APPLICATION.RESSOURCES_HUMAINES} element={<VueRessourcesHumaines />} />
      <Route path={CHEMINS_APPLICATION.BIBLIOTHEQUE} element={<VueBibliotheque />} />
      <Route path={CHEMINS_APPLICATION.COMMUNICATION} element={<VueCommunication />} />

      {/* Route de secours */}
      <Route path="*" element={<Navigate to={CHEMINS_APPLICATION.TABLEAU_DE_BORD} replace />} />
    </Routes>
  );
};
