import { RoleUtilisateur } from '../modeles/types';

export const CHEMINS_APPLICATION = {
  ACCUEIL: '/',
  TABLEAU_DE_BORD: '/tableau-de-bord',
  TABLEAU_DE_BORD_DIRECTEUR: '/tableau-de-bord/directeur',
  TABLEAU_DE_BORD_PROFESSEUR: '/tableau-de-bord/professeur',
  TABLEAU_DE_BORD_ELEVE: '/tableau-de-bord/eleve',
  TABLEAU_DE_BORD_PARENT: '/tableau-de-bord/parent',
  TABLEAU_DE_BORD_SECRETAIRE: '/tableau-de-bord/secretaire',
  TABLEAU_DE_BORD_COMPTABLE: '/tableau-de-bord/comptable',
  TABLEAU_DE_BORD_RH: '/tableau-de-bord/ressources-humaines',
  TABLEAU_DE_BORD_BIBLIOTHECAIRE: '/tableau-de-bord/bibliothecaire',
  TABLEAU_DE_BORD_COMMUNICATION: '/tableau-de-bord/communication',

  ADMINISTRATION: '/administration',
  PROFESSEURS: '/professeurs',
  ELEVES: '/eleves',
  PARENTS: '/parents',
  COMPTABILITE: '/comptabilite',
  RESSOURCES_HUMAINES: '/ressources-humaines',
  BIBLIOTHEQUE: '/bibliotheque',
  COMMUNICATION: '/communication',
} as const;

export const obtenirCheminTableauDeBordParRole = (role: RoleUtilisateur): string => {
  switch (role) {
    case 'professeur':
      return CHEMINS_APPLICATION.TABLEAU_DE_BORD_PROFESSEUR;
    case 'eleve':
      return CHEMINS_APPLICATION.TABLEAU_DE_BORD_ELEVE;
    case 'parent':
      return CHEMINS_APPLICATION.TABLEAU_DE_BORD_PARENT;
    case 'secretaire':
      return CHEMINS_APPLICATION.TABLEAU_DE_BORD_SECRETAIRE;
    case 'comptable':
      return CHEMINS_APPLICATION.TABLEAU_DE_BORD_COMPTABLE;
    case 'ressources_humaines':
      return CHEMINS_APPLICATION.TABLEAU_DE_BORD_RH;
    case 'bibliothecaire':
      return CHEMINS_APPLICATION.TABLEAU_DE_BORD_BIBLIOTHECAIRE;
    case 'charge_communication':
      return CHEMINS_APPLICATION.TABLEAU_DE_BORD_COMMUNICATION;
    case 'administrateur':
    default:
      return CHEMINS_APPLICATION.TABLEAU_DE_BORD_DIRECTEUR;
  }
};
