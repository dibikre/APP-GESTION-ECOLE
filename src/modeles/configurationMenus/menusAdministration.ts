import { CHEMINS_APPLICATION } from '../../routes/cheminsApplication';
import { ElementMenuNavigation } from './typesMenus';

export const MENU_ADMINISTRATEUR: ElementMenuNavigation[] = [
  {
    cle: 'tableau_de_bord',
    chemin: CHEMINS_APPLICATION.TABLEAU_DE_BORD_DIRECTEUR,
    libelleCle: 'menu_tableau_de_bord',
    icone: 'lucide:layout-dashboard',
  },
  {
    cle: 'administration',
    chemin: CHEMINS_APPLICATION.ADMINISTRATION,
    libelleCle: 'menu_administration',
    icone: 'lucide:shield',
  },
  {
    cle: 'comptabilite_frais',
    chemin: CHEMINS_APPLICATION.COMPTABILITE,
    libelleCle: 'menu_comptabilite_frais',
    icone: 'lucide:credit-card',
  },
  {
    cle: 'ressources_humaines',
    chemin: CHEMINS_APPLICATION.RESSOURCES_HUMAINES,
    libelleCle: 'menu_ressources_humaines',
    icone: 'lucide:briefcase',
  },
  {
    cle: 'communications',
    chemin: CHEMINS_APPLICATION.COMMUNICATION,
    libelleCle: 'menu_communications',
    icone: 'lucide:megaphone',
  },
];

export const MENU_SECRETAIRE: ElementMenuNavigation[] = [
  {
    cle: 'tableau_de_bord',
    chemin: CHEMINS_APPLICATION.TABLEAU_DE_BORD_SECRETAIRE,
    libelleCle: 'menu_tableau_de_bord',
    icone: 'lucide:layout-dashboard',
  },
  {
    cle: 'dossiers_eleves',
    chemin: CHEMINS_APPLICATION.ELEVES,
    libelleCle: 'menu_dossiers_eleves',
    icone: 'lucide:graduation-cap',
  },
  {
    cle: 'inscriptions',
    chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_SECRETAIRE}/inscriptions`,
    libelleCle: 'menu_inscriptions',
    icone: 'lucide:user-plus',
  },
  {
    cle: 'calendrier_horaires',
    chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_SECRETAIRE}/logistique`,
    libelleCle: 'menu_calendrier_horaires',
    icone: 'lucide:calendar',
  },
  {
    cle: 'administratif',
    chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_SECRETAIRE}/administration`,
    libelleCle: 'menu_administratif',
    icone: 'lucide:building-2',
  },
];
