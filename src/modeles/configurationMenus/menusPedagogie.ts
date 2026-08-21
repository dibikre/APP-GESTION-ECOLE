import { CHEMINS_APPLICATION } from '../../routes/cheminsApplication';
import { ElementMenuNavigation } from './typesMenus';

export const MENU_PROFESSEUR: ElementMenuNavigation[] = [
  {
    cle: 'tableau_de_bord',
    chemin: CHEMINS_APPLICATION.TABLEAU_DE_BORD_PROFESSEUR,
    libelleCle: 'menu_tableau_de_bord',
    icone: 'ph:layout-bold',
  },
  {
    cle: 'mes_classes',
    chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_PROFESSEUR}/mes_classes`,
    libelleCle: 'menu_mes_classes',
    icone: 'ph:users-bold',
  },
  {
    cle: 'grading_marks',
    chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_PROFESSEUR}/evaluation`,
    libelleCle: 'menu_grading_marks',
    icone: 'ph:file-text-bold',
  },
  {
    cle: 'ressources_pedagogiques',
    chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_PROFESSEUR}/ressources`,
    libelleCle: 'menu_ressources_pedagogiques',
    icone: 'ph:book-open-bold',
  },
  {
    cle: 'communications',
    chemin: CHEMINS_APPLICATION.COMMUNICATION,
    libelleCle: 'menu_communications',
    icone: 'ph:megaphone-bold',
  },
];

export const MENU_ELEVE: ElementMenuNavigation[] = [
  {
    cle: 'tableau_de_bord',
    chemin: CHEMINS_APPLICATION.TABLEAU_DE_BORD_ELEVE,
    libelleCle: 'menu_tableau_de_bord',
    icone: 'ph:layout-bold',
  },
  {
    cle: 'mes_cours',
    chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_ELEVE}/cours`,
    libelleCle: 'menu_mes_cours',
    icone: 'ph:book-open-bold',
  },
  {
    cle: 'mes_notes',
    chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_ELEVE}/dossier`,
    libelleCle: 'menu_mes_notes',
    icone: 'ph:graduation-cap-bold',
  },
  {
    cle: 'devoirs_examens',
    chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_ELEVE}/devoirs`,
    libelleCle: 'menu_devoirs_examens',
    icone: 'ph:calendar-check-bold',
  },
  {
    cle: 'ressources_eleves',
    chemin: CHEMINS_APPLICATION.BIBLIOTHEQUE,
    libelleCle: 'menu_ressources_eleves',
    icone: 'ph:buildings-bold',
  },
];

export const MENU_PARENT: ElementMenuNavigation[] = [
  {
    cle: 'tableau_de_bord',
    chemin: CHEMINS_APPLICATION.TABLEAU_DE_BORD_PARENT,
    libelleCle: 'menu_tableau_de_bord',
    icone: 'ph:layout-bold',
  },
  {
    cle: 'suivi_enfant',
    chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_PARENT}/suivi`,
    libelleCle: 'menu_suivi_enfant',
    icone: 'ph:users-bold',
  },
  {
    cle: 'absences_justificatifs',
    chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_PARENT}/documents`,
    libelleCle: 'menu_absences_justificatifs',
    icone: 'ph:file-text-bold',
  },
  {
    cle: 'moyennes_resultats',
    chemin: CHEMINS_APPLICATION.PARENTS,
    libelleCle: 'menu_moyennes_resultats',
    icone: 'ph:graduation-cap-bold',
  },
  {
    cle: 'communications',
    chemin: CHEMINS_APPLICATION.COMMUNICATION,
    libelleCle: 'menu_communications',
    icone: 'ph:megaphone-bold',
  },
];
