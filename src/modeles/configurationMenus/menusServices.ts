import { CHEMINS_APPLICATION } from '../../routes/cheminsApplication';
import { ElementMenuNavigation } from './typesMenus';

export const MENU_COMPTABLE: ElementMenuNavigation[] = [
  {
    cle: 'tableau_de_bord',
    chemin: CHEMINS_APPLICATION.TABLEAU_DE_BORD_COMPTABLE,
    libelleCle: 'menu_tableau_de_bord',
    icone: 'ph:layout-bold',
  },
  {
    cle: 'comptabilite_frais',
    chemin: CHEMINS_APPLICATION.COMPTABILITE,
    libelleCle: 'menu_comptabilite_frais',
    icone: 'ph:credit-card-bold',
  },
  {
    cle: 'budgets',
    chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_DIRECTEUR}/finances`,
    libelleCle: 'menu_budgets',
    icone: 'ph:currency-dollar-bold',
  },
  {
    cle: 'rapports_financiers',
    chemin: CHEMINS_APPLICATION.COMPTABILITE,
    libelleCle: 'menu_rapports_financiers',
    icone: 'ph:table-bold',
  },
];

export const MENU_RESSOURCES_HUMAINES: ElementMenuNavigation[] = [
  {
    cle: 'tableau_de_bord',
    chemin: CHEMINS_APPLICATION.TABLEAU_DE_BORD_RH,
    libelleCle: 'menu_tableau_de_bord',
    icone: 'ph:layout-bold',
  },
  {
    cle: 'ressources_humaines',
    chemin: CHEMINS_APPLICATION.RESSOURCES_HUMAINES,
    libelleCle: 'menu_ressources_humaines',
    icone: 'ph:briefcase-bold',
  },
  {
    cle: 'paie',
    chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_DIRECTEUR}/personnel`,
    libelleCle: 'menu_paie',
    icone: 'ph:currency-dollar-bold',
  },
  {
    cle: 'gestion_personnel',
    chemin: CHEMINS_APPLICATION.RESSOURCES_HUMAINES,
    libelleCle: 'menu_gestion_personnel',
    icone: 'ph:users-bold',
  },
];

export const MENU_BIBLIOTHECAIRE: ElementMenuNavigation[] = [
  {
    cle: 'tableau_de_bord',
    chemin: CHEMINS_APPLICATION.TABLEAU_DE_BORD_BIBLIOTHECAIRE,
    libelleCle: 'menu_tableau_de_bord',
    icone: 'ph:layout-bold',
  },
  {
    cle: 'catalogue_bibliotheque',
    chemin: CHEMINS_APPLICATION.BIBLIOTHEQUE,
    libelleCle: 'menu_catalogue_bibliotheque',
    icone: 'ph:book-open-bold',
  },
  {
    cle: 'emprunts_retours',
    chemin: CHEMINS_APPLICATION.BIBLIOTHEQUE,
    libelleCle: 'menu_emprunts_retours',
    icone: 'ph:book-bookmark-bold',
  },
  {
    cle: 'ressources_numeriques',
    chemin: CHEMINS_APPLICATION.BIBLIOTHEQUE,
    libelleCle: 'menu_ressources_numeriques',
    icone: 'ph:folder-notch-open-bold',
  },
];

export const MENU_CHARGE_COMMUNICATION: ElementMenuNavigation[] = [
  {
    cle: 'tableau_de_bord',
    chemin: CHEMINS_APPLICATION.TABLEAU_DE_BORD_COMMUNICATION,
    libelleCle: 'menu_tableau_de_bord',
    icone: 'ph:layout-bold',
  },
  {
    cle: 'communications',
    chemin: CHEMINS_APPLICATION.COMMUNICATION,
    libelleCle: 'menu_communications',
    icone: 'ph:megaphone-bold',
  },
  {
    cle: 'actualites',
    chemin: CHEMINS_APPLICATION.COMMUNICATION,
    libelleCle: 'menu_actualites',
    icone: 'ph:newspaper-bold',
  },
  {
    cle: 'annonces',
    chemin: CHEMINS_APPLICATION.COMMUNICATION,
    libelleCle: 'menu_annonces',
    icone: 'ph:bell-bold',
  },
  {
    cle: 'medias',
    chemin: CHEMINS_APPLICATION.COMMUNICATION,
    libelleCle: 'menu_medias',
    icone: 'ph:share-network-bold',
  },
];
