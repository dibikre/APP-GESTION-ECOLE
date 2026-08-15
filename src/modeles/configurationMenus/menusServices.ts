import { CHEMINS_APPLICATION } from '../../routes/cheminsApplication';
import { ElementMenuNavigation } from './typesMenus';

export const MENU_COMPTABLE: ElementMenuNavigation[] = [
  {
    cle: 'tableau_de_bord',
    chemin: CHEMINS_APPLICATION.TABLEAU_DE_BORD_COMPTABLE,
    libelleCle: 'menu_tableau_de_bord',
    icone: 'lucide:layout-dashboard',
  },
  {
    cle: 'comptabilite_frais',
    chemin: CHEMINS_APPLICATION.COMPTABILITE,
    libelleCle: 'menu_comptabilite_frais',
    icone: 'lucide:credit-card',
  },
  {
    cle: 'budgets',
    chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_DIRECTEUR}/finances`,
    libelleCle: 'menu_budgets',
    icone: 'lucide:dollar-sign',
  },
  {
    cle: 'rapports_financiers',
    chemin: CHEMINS_APPLICATION.COMPTABILITE,
    libelleCle: 'menu_rapports_financiers',
    icone: 'lucide:file-spreadsheet',
  },
];

export const MENU_RESSOURCES_HUMAINES: ElementMenuNavigation[] = [
  {
    cle: 'tableau_de_bord',
    chemin: CHEMINS_APPLICATION.TABLEAU_DE_BORD_RH,
    libelleCle: 'menu_tableau_de_bord',
    icone: 'lucide:layout-dashboard',
  },
  {
    cle: 'ressources_humaines',
    chemin: CHEMINS_APPLICATION.RESSOURCES_HUMAINES,
    libelleCle: 'menu_ressources_humaines',
    icone: 'lucide:briefcase',
  },
  {
    cle: 'paie',
    chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_DIRECTEUR}/personnel`,
    libelleCle: 'menu_paie',
    icone: 'lucide:dollar-sign',
  },
  {
    cle: 'gestion_personnel',
    chemin: CHEMINS_APPLICATION.RESSOURCES_HUMAINES,
    libelleCle: 'menu_gestion_personnel',
    icone: 'lucide:users',
  },
];

export const MENU_BIBLIOTHECAIRE: ElementMenuNavigation[] = [
  {
    cle: 'tableau_de_bord',
    chemin: CHEMINS_APPLICATION.TABLEAU_DE_BORD_BIBLIOTHECAIRE,
    libelleCle: 'menu_tableau_de_bord',
    icone: 'lucide:layout-dashboard',
  },
  {
    cle: 'catalogue_bibliotheque',
    chemin: CHEMINS_APPLICATION.BIBLIOTHEQUE,
    libelleCle: 'menu_catalogue_bibliotheque',
    icone: 'lucide:book-open',
  },
  {
    cle: 'emprunts_retours',
    chemin: CHEMINS_APPLICATION.BIBLIOTHEQUE,
    libelleCle: 'menu_emprunts_retours',
    icone: 'lucide:book-marked',
  },
  {
    cle: 'ressources_numeriques',
    chemin: CHEMINS_APPLICATION.BIBLIOTHEQUE,
    libelleCle: 'menu_ressources_numeriques',
    icone: 'lucide:folder-git-2',
  },
];

export const MENU_CHARGE_COMMUNICATION: ElementMenuNavigation[] = [
  {
    cle: 'tableau_de_bord',
    chemin: CHEMINS_APPLICATION.TABLEAU_DE_BORD_COMMUNICATION,
    libelleCle: 'menu_tableau_de_bord',
    icone: 'lucide:layout-dashboard',
  },
  {
    cle: 'communications',
    chemin: CHEMINS_APPLICATION.COMMUNICATION,
    libelleCle: 'menu_communications',
    icone: 'lucide:megaphone',
  },
  {
    cle: 'actualites',
    chemin: CHEMINS_APPLICATION.COMMUNICATION,
    libelleCle: 'menu_actualites',
    icone: 'lucide:newspaper',
  },
  {
    cle: 'annonces',
    chemin: CHEMINS_APPLICATION.COMMUNICATION,
    libelleCle: 'menu_annonces',
    icone: 'lucide:bell',
  },
  {
    cle: 'medias',
    chemin: CHEMINS_APPLICATION.COMMUNICATION,
    libelleCle: 'menu_medias',
    icone: 'lucide:share-2',
  },
];
