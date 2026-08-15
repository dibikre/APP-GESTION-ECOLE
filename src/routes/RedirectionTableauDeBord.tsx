import React from 'react';
import { Navigate } from 'react-router-dom';
import { utiliserAcademie } from '../controleurs/contexteAcademie';
import { obtenirCheminTableauDeBordParRole } from './cheminsApplication';

export const RedirectionTableauDeBord: React.FC = () => {
  const { roleActif } = utiliserAcademie();
  const cheminCible = obtenirCheminTableauDeBordParRole(roleActif);

  return <Navigate to={cheminCible} replace />;
};
