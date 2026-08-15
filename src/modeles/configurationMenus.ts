import {
  LayoutDashboard,
  Shield,
  CreditCard,
  Briefcase,
  Megaphone,
  Users,
  FileText,
  BookOpen,
  GraduationCap,
  CalendarCheck,
  Building2,
  UserPlus,
  Calendar,
  DollarSign,
  FileSpreadsheet,
  BookMarked,
  FolderGit2,
  Newspaper,
  Bell,
  Share2,
  LucideIcon,
} from 'lucide-react';
import { RoleUtilisateur } from './types';
import { CHEMINS_APPLICATION, obtenirCheminTableauDeBordParRole } from '../routes/cheminsApplication';
import { CleTraduction } from './traductions';

export interface ElementMenuNavigation {
  cle: string;
  chemin: string;
  libelleCle: CleTraduction;
  icone: LucideIcon;
}

export const MENUS_PAR_ROLE: Record<RoleUtilisateur, ElementMenuNavigation[]> = {
  administrateur: [
    {
      cle: 'tableau_de_bord',
      chemin: CHEMINS_APPLICATION.TABLEAU_DE_BORD_DIRECTEUR,
      libelleCle: 'menu_tableau_de_bord',
      icone: LayoutDashboard,
    },
    {
      cle: 'administration',
      chemin: CHEMINS_APPLICATION.ADMINISTRATION,
      libelleCle: 'menu_administration',
      icone: Shield,
    },
    {
      cle: 'comptabilite_frais',
      chemin: CHEMINS_APPLICATION.COMPTABILITE,
      libelleCle: 'menu_comptabilite_frais',
      icone: CreditCard,
    },
    {
      cle: 'ressources_humaines',
      chemin: CHEMINS_APPLICATION.RESSOURCES_HUMAINES,
      libelleCle: 'menu_ressources_humaines',
      icone: Briefcase,
    },
    {
      cle: 'communications',
      chemin: CHEMINS_APPLICATION.COMMUNICATION,
      libelleCle: 'menu_communications',
      icone: Megaphone,
    },
  ],

  professeur: [
    {
      cle: 'tableau_de_bord',
      chemin: CHEMINS_APPLICATION.TABLEAU_DE_BORD_PROFESSEUR,
      libelleCle: 'menu_tableau_de_bord',
      icone: LayoutDashboard,
    },
    {
      cle: 'mes_classes',
      chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_PROFESSEUR}/mes_classes`,
      libelleCle: 'menu_mes_classes',
      icone: Users,
    },
    {
      cle: 'grading_marks',
      chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_PROFESSEUR}/evaluation`,
      libelleCle: 'menu_grading_marks',
      icone: FileText,
    },
    {
      cle: 'ressources_pedagogiques',
      chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_PROFESSEUR}/ressources`,
      libelleCle: 'menu_ressources_pedagogiques',
      icone: BookOpen,
    },
    {
      cle: 'communications',
      chemin: CHEMINS_APPLICATION.COMMUNICATION,
      libelleCle: 'menu_communications',
      icone: Megaphone,
    },
  ],

  eleve: [
    {
      cle: 'tableau_de_bord',
      chemin: CHEMINS_APPLICATION.TABLEAU_DE_BORD_ELEVE,
      libelleCle: 'menu_tableau_de_bord',
      icone: LayoutDashboard,
    },
    {
      cle: 'mes_cours',
      chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_ELEVE}/cours`,
      libelleCle: 'menu_mes_cours',
      icone: BookOpen,
    },
    {
      cle: 'mes_notes',
      chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_ELEVE}/dossier`,
      libelleCle: 'menu_mes_notes',
      icone: GraduationCap,
    },
    {
      cle: 'devoirs_examens',
      chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_ELEVE}/cours`,
      libelleCle: 'menu_devoirs_examens',
      icone: CalendarCheck,
    },
    {
      cle: 'ressources_eleves',
      chemin: CHEMINS_APPLICATION.BIBLIOTHEQUE,
      libelleCle: 'menu_ressources_eleves',
      icone: Building2,
    },
  ],

  parent: [
    {
      cle: 'tableau_de_bord',
      chemin: CHEMINS_APPLICATION.TABLEAU_DE_BORD_PARENT,
      libelleCle: 'menu_tableau_de_bord',
      icone: LayoutDashboard,
    },
    {
      cle: 'suivi_enfant',
      chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_PARENT}/suivi`,
      libelleCle: 'menu_suivi_enfant',
      icone: Users,
    },
    {
      cle: 'absences_justificatifs',
      chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_PARENT}/documents`,
      libelleCle: 'menu_absences_justificatifs',
      icone: FileText,
    },
    {
      cle: 'moyennes_resultats',
      chemin: CHEMINS_APPLICATION.PARENTS,
      libelleCle: 'menu_moyennes_resultats',
      icone: GraduationCap,
    },
    {
      cle: 'communications',
      chemin: CHEMINS_APPLICATION.COMMUNICATION,
      libelleCle: 'menu_communications',
      icone: Megaphone,
    },
  ],

  secretaire: [
    {
      cle: 'tableau_de_bord',
      chemin: CHEMINS_APPLICATION.TABLEAU_DE_BORD_SECRETAIRE,
      libelleCle: 'menu_tableau_de_bord',
      icone: LayoutDashboard,
    },
    {
      cle: 'dossiers_eleves',
      chemin: CHEMINS_APPLICATION.ELEVES,
      libelleCle: 'menu_dossiers_eleves',
      icone: GraduationCap,
    },
    {
      cle: 'inscriptions',
      chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_SECRETAIRE}/inscriptions`,
      libelleCle: 'menu_inscriptions',
      icone: UserPlus,
    },
    {
      cle: 'calendrier_horaires',
      chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_SECRETAIRE}/logistique`,
      libelleCle: 'menu_calendrier_horaires',
      icone: Calendar,
    },
    {
      cle: 'administratif',
      chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_SECRETAIRE}/administration`,
      libelleCle: 'menu_administratif',
      icone: Building2,
    },
  ],

  comptable: [
    {
      cle: 'tableau_de_bord',
      chemin: CHEMINS_APPLICATION.TABLEAU_DE_BORD_COMPTABLE,
      libelleCle: 'menu_tableau_de_bord',
      icone: LayoutDashboard,
    },
    {
      cle: 'comptabilite_frais',
      chemin: CHEMINS_APPLICATION.COMPTABILITE,
      libelleCle: 'menu_comptabilite_frais',
      icone: CreditCard,
    },
    {
      cle: 'budgets',
      chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_DIRECTEUR}/finances`,
      libelleCle: 'menu_budgets',
      icone: DollarSign,
    },
    {
      cle: 'rapports_financiers',
      chemin: CHEMINS_APPLICATION.COMPTABILITE,
      libelleCle: 'menu_rapports_financiers',
      icone: FileSpreadsheet,
    },
  ],

  ressources_humaines: [
    {
      cle: 'tableau_de_bord',
      chemin: CHEMINS_APPLICATION.TABLEAU_DE_BORD_RH,
      libelleCle: 'menu_tableau_de_bord',
      icone: LayoutDashboard,
    },
    {
      cle: 'ressources_humaines',
      chemin: CHEMINS_APPLICATION.RESSOURCES_HUMAINES,
      libelleCle: 'menu_ressources_humaines',
      icone: Briefcase,
    },
    {
      cle: 'paie',
      chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_DIRECTEUR}/personnel`,
      libelleCle: 'menu_paie',
      icone: DollarSign,
    },
    {
      cle: 'gestion_personnel',
      chemin: CHEMINS_APPLICATION.RESSOURCES_HUMAINES,
      libelleCle: 'menu_gestion_personnel',
      icone: Users,
    },
  ],

  bibliothecaire: [
    {
      cle: 'tableau_de_bord',
      chemin: CHEMINS_APPLICATION.TABLEAU_DE_BORD_BIBLIOTHECAIRE,
      libelleCle: 'menu_tableau_de_bord',
      icone: LayoutDashboard,
    },
    {
      cle: 'catalogue_bibliotheque',
      chemin: CHEMINS_APPLICATION.BIBLIOTHEQUE,
      libelleCle: 'menu_catalogue_bibliotheque',
      icone: BookOpen,
    },
    {
      cle: 'emprunts_retours',
      chemin: CHEMINS_APPLICATION.BIBLIOTHEQUE,
      libelleCle: 'menu_emprunts_retours',
      icone: BookMarked,
    },
    {
      cle: 'ressources_numeriques',
      chemin: CHEMINS_APPLICATION.BIBLIOTHEQUE,
      libelleCle: 'menu_ressources_numeriques',
      icone: FolderGit2,
    },
  ],

  charge_communication: [
    {
      cle: 'tableau_de_bord',
      chemin: CHEMINS_APPLICATION.TABLEAU_DE_BORD_COMMUNICATION,
      libelleCle: 'menu_tableau_de_bord',
      icone: LayoutDashboard,
    },
    {
      cle: 'communications',
      chemin: CHEMINS_APPLICATION.COMMUNICATION,
      libelleCle: 'menu_communications',
      icone: Megaphone,
    },
    {
      cle: 'actualites',
      chemin: CHEMINS_APPLICATION.COMMUNICATION,
      libelleCle: 'menu_actualites',
      icone: Newspaper,
    },
    {
      cle: 'annonces',
      chemin: CHEMINS_APPLICATION.COMMUNICATION,
      libelleCle: 'menu_annonces',
      icone: Bell,
    },
    {
      cle: 'medias',
      chemin: CHEMINS_APPLICATION.COMMUNICATION,
      libelleCle: 'menu_medias',
      icone: Share2,
    },
  ],
};

export const obtenirElementsMenuParRole = (role: RoleUtilisateur): ElementMenuNavigation[] => {
  const elements = MENUS_PAR_ROLE[role] || MENUS_PAR_ROLE.administrateur;
  return elements.map((item) => {
    if (item.cle === 'tableau_de_bord') {
      return {
        ...item,
        chemin: obtenirCheminTableauDeBordParRole(role),
      };
    }
    return item;
  });
};
