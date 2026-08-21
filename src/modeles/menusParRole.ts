import {
  LayoutDashboard,
  Shield,
  BookOpen,
  GraduationCap,
  Users,
  CreditCard,
  Briefcase,
  Building2,
  Megaphone,
  UserPlus,
  FileText,
  Award,
  UploadCloud,
  CalendarCheck,
  UserCheck,
  Calendar,
  Printer,
  MessageSquare,
  DollarSign,
  FileSpreadsheet,
  TrendingUp,
  Bookmark,
  RefreshCw,
  Laptop,
  Newspaper,
  BellRing,
  Radio,
  FileCheck,
  CalendarX,
  LucideIcon,
  ShieldCheck,
  Landmark,
  Wallet,
  Utensils,
  HeartPulse,
  Bus,
} from 'lucide-react';
import { RoleUtilisateur } from './types';
import { CHEMINS_APPLICATION } from '../routes/cheminsApplication';

export interface ElementMenuRole {
  identifiant: string;
  libelleEn: string;
  libelleFr: string;
  chemin: string;
  icone: LucideIcon;
  badge?: string;
  estTableauDeBord?: boolean;
}

export const MENUS_PAR_ROLE: Record<RoleUtilisateur, ElementMenuRole[]> = {
  // 1. Directeur / Administration
  administrateur: [
    {
      identifiant: 'dir_tableau_de_bord',
      libelleEn: 'Dashboard',
      libelleFr: 'Tableau de bord',
      chemin: CHEMINS_APPLICATION.TABLEAU_DE_BORD_DIRECTEUR,
      icone: LayoutDashboard,
      estTableauDeBord: true,
    },
    {
      identifiant: 'dir_administration',
      libelleEn: 'Administration',
      libelleFr: 'Administration',
      chemin: CHEMINS_APPLICATION.ADMINISTRATION,
      icone: Shield,
    },
    {
      identifiant: 'dir_comptabilite',
      libelleEn: 'Tuition & Accounting',
      libelleFr: 'Comptabilité & Frais',
      chemin: CHEMINS_APPLICATION.COMPTABILITE,
      icone: CreditCard,
    },
    {
      identifiant: 'dir_rh',
      libelleEn: 'Human Resources',
      libelleFr: 'Ressources Humaines',
      chemin: CHEMINS_APPLICATION.RESSOURCES_HUMAINES,
      icone: Briefcase,
    },
    {
      identifiant: 'dir_communication',
      libelleEn: 'Communications',
      libelleFr: 'Communications',
      chemin: CHEMINS_APPLICATION.COMMUNICATION,
      icone: Megaphone,
    },
  ],

  // 2. Professeur & Enseignant
  professeur: [
    {
      identifiant: 'prof_tableau_de_bord',
      libelleEn: 'Dashboard',
      libelleFr: 'Tableau de bord',
      chemin: CHEMINS_APPLICATION.TABLEAU_DE_BORD_PROFESSEUR,
      icone: LayoutDashboard,
      estTableauDeBord: true,
    },
    {
      identifiant: 'prof_mes_classes',
      libelleEn: 'My Classes & Roster',
      libelleFr: 'Mes Classes',
      chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_PROFESSEUR}/mes_classes`,
      icone: Users,
    },
    {
      identifiant: 'prof_grading',
      libelleEn: 'Grading & Marks',
      libelleFr: 'Grading & Notes',
      chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_PROFESSEUR}/evaluation`,
      icone: Award,
    },
    {
      identifiant: 'prof_ressources',
      libelleEn: 'Teaching Resources',
      libelleFr: 'Ressources Pédagogiques',
      chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_PROFESSEUR}/ressources`,
      icone: UploadCloud,
    },
    {
      identifiant: 'prof_communication',
      libelleEn: 'Communications',
      libelleFr: 'Communications',
      chemin: CHEMINS_APPLICATION.COMMUNICATION,
      icone: Megaphone,
    },
  ],

  // 3. Portail Élève
  eleve: [
    {
      identifiant: 'eleve_tableau_de_bord',
      libelleEn: 'Dashboard',
      libelleFr: 'Tableau de bord',
      chemin: CHEMINS_APPLICATION.TABLEAU_DE_BORD_ELEVE,
      icone: LayoutDashboard,
      estTableauDeBord: true,
    },
    {
      identifiant: 'eleve_cours',
      libelleEn: 'Schedule & Calendar',
      libelleFr: 'Emploi du temps & Calendrier',
      chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_ELEVE}/cours`,
      icone: Calendar,
    },
    {
      identifiant: 'eleve_notes',
      libelleEn: 'Grades & Exam Reviews',
      libelleFr: 'Notes, Examens & Copies',
      chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_ELEVE}/notes`,
      icone: GraduationCap,
    },
    {
      identifiant: 'eleve_devoirs',
      libelleEn: 'Homework & Submissions',
      libelleFr: 'Devoirs & Travaux',
      chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_ELEVE}/devoirs`,
      icone: CalendarCheck,
    },
    {
      identifiant: 'eleve_ressources',
      libelleEn: 'Courses & Digital Library',
      libelleFr: 'Supports & Bibliothèque',
      chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_ELEVE}/ressources`,
      icone: BookOpen,
    },
    {
      identifiant: 'eleve_communication',
      libelleEn: 'Chat, Admin & Class Forum',
      libelleFr: 'Messagerie & Entraide',
      chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_ELEVE}/communication`,
      icone: MessageSquare,
    },
    {
      identifiant: 'eleve_vie_scolaire',
      libelleEn: 'School Life & Services',
      libelleFr: 'Vie Scolaire & Services',
      chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_ELEVE}/vie-scolaire`,
      icone: CreditCard,
    },
    {
      identifiant: 'eleve_profil',
      libelleEn: 'My Profile & Requests',
      libelleFr: 'Mon Profil & Demandes',
      chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_ELEVE}/profil`,
      icone: UserCheck,
    },
  ],

  // 4. Parent & Tuteur
  parent: [
    {
      identifiant: 'parent_mes_enfants',
      libelleEn: 'My Children',
      libelleFr: 'Mes Enfants',
      chemin: CHEMINS_APPLICATION.TABLEAU_DE_BORD_PARENT,
      icone: Users,
      estTableauDeBord: true,
    },
    {
      identifiant: 'parent_finances',
      libelleEn: 'Tuition & Invoicing',
      libelleFr: 'Facturation & Paiements',
      chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_PARENT}/finances`,
      icone: CreditCard,
    },
    {
      identifiant: 'parent_suivi_temps_reel',
      libelleEn: 'Live Status & Bus',
      libelleFr: 'Suivi en Temps Réel',
      chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_PARENT}/suivi-temps-reel`,
      icone: Bus,
    },
    {
      identifiant: 'parent_cantine_transport',
      libelleEn: 'Canteen & Transport',
      libelleFr: 'Cantine & Transport',
      chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_PARENT}/cantine-transport`,
      icone: Utensils,
    },
    {
      identifiant: 'parent_sante',
      libelleEn: 'Health & Medical',
      libelleFr: 'Santé & Urgences',
      chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_PARENT}/sante`,
      icone: HeartPulse,
    },
    {
      identifiant: 'parent_calendrier',
      libelleEn: 'Calendar & Meetings',
      libelleFr: 'Calendrier Scolaire',
      chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_PARENT}/calendrier`,
      icone: Calendar,
    },
    {
      identifiant: 'parent_autorisations',
      libelleEn: 'Consents & Signatures',
      libelleFr: 'Autorisations & Décharges',
      chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_PARENT}/autorisations`,
      icone: FileCheck,
    },
    {
      identifiant: 'parent_bibliotheque',
      libelleEn: 'Books & Textbooks',
      libelleFr: 'Bibliothèque & Manuels',
      chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_PARENT}/bibliotheque`,
      icone: BookOpen,
    },
    {
      identifiant: 'parent_suivi',
      libelleEn: 'Detailed Progress',
      libelleFr: 'Suivi Scolaire Détaillé',
      chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_PARENT}/suivi`,
      icone: GraduationCap,
    },
    {
      identifiant: 'parent_communication',
      libelleEn: 'Messages & Teachers',
      libelleFr: 'Messagerie & Équipe',
      chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_PARENT}/communication`,
      icone: MessageSquare,
    },
  ],

  // 5. Secrétariat & Scolarité
  secretaire: [
    {
      identifiant: 'sec_tableau_de_bord',
      libelleEn: 'Dashboard',
      libelleFr: 'Tableau de bord',
      chemin: CHEMINS_APPLICATION.TABLEAU_DE_BORD_SECRETAIRE,
      icone: LayoutDashboard,
      estTableauDeBord: true,
    },
    {
      identifiant: 'sec_eleves',
      libelleEn: 'Student Records',
      libelleFr: 'Dossiers Élèves',
      chemin: CHEMINS_APPLICATION.ELEVES,
      icone: GraduationCap,
    },
    {
      identifiant: 'sec_inscriptions',
      libelleEn: 'Admissions & Enrolment',
      libelleFr: 'Inscriptions',
      chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_SECRETAIRE}/inscriptions`,
      icone: UserPlus,
    },
    {
      identifiant: 'sec_calendrier',
      libelleEn: 'Timetable & Rooms',
      libelleFr: 'Calendrier & Horaires',
      chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_SECRETAIRE}/logistique`,
      icone: Calendar,
    },
    {
      identifiant: 'sec_administratif',
      libelleEn: 'Administrative Desk',
      libelleFr: 'Administratif',
      chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_SECRETAIRE}/administration`,
      icone: Building2,
    },
  ],

  // 6. Comptabilité & Économe
  comptable: [
    {
      identifiant: 'cpt_tableau_de_bord',
      libelleEn: 'Dashboard',
      libelleFr: 'Tableau de bord',
      chemin: CHEMINS_APPLICATION.TABLEAU_DE_BORD_COMPTABLE,
      icone: LayoutDashboard,
      estTableauDeBord: true,
    },
    {
      identifiant: 'cpt_factures',
      libelleEn: 'Tuition & Fees',
      libelleFr: 'Comptabilité & Frais',
      chemin: CHEMINS_APPLICATION.COMPTABILITE,
      icone: CreditCard,
    },
    {
      identifiant: 'cpt_budgets',
      libelleEn: 'Departmental Budgets',
      libelleFr: 'Budgets',
      chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_DIRECTEUR}/finances`,
      icone: Landmark,
    },
    {
      identifiant: 'cpt_rapports',
      libelleEn: 'Financial Reports',
      libelleFr: 'Rapports Financiers',
      chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_DIRECTEUR}/rapports`,
      icone: FileSpreadsheet,
    },
  ],

  // 7. Ressources Humaines
  ressources_humaines: [
    {
      identifiant: 'rh_tableau_de_bord',
      libelleEn: 'Dashboard',
      libelleFr: 'Tableau de bord',
      chemin: CHEMINS_APPLICATION.TABLEAU_DE_BORD_RH,
      icone: LayoutDashboard,
      estTableauDeBord: true,
    },
    {
      identifiant: 'rh_gestion',
      libelleEn: 'Human Resources',
      libelleFr: 'Ressources Humaines',
      chemin: CHEMINS_APPLICATION.RESSOURCES_HUMAINES,
      icone: Briefcase,
    },
    {
      identifiant: 'rh_paie',
      libelleEn: 'Payroll & Salaries',
      libelleFr: 'Paie & Rémunération',
      chemin: `${CHEMINS_APPLICATION.TABLEAU_DE_BORD_DIRECTEUR}/personnel`,
      icone: Wallet,
    },
    {
      identifiant: 'rh_personnel',
      libelleEn: 'Staff Directory',
      libelleFr: 'Gestion du Personnel',
      chemin: CHEMINS_APPLICATION.RESSOURCES_HUMAINES,
      icone: Users,
    },
  ],

  // 8. Bibliothécaire
  bibliothecaire: [
    {
      identifiant: 'bib_tableau_de_bord',
      libelleEn: 'Dashboard',
      libelleFr: 'Tableau de bord',
      chemin: CHEMINS_APPLICATION.TABLEAU_DE_BORD_BIBLIOTHECAIRE,
      icone: LayoutDashboard,
      estTableauDeBord: true,
    },
    {
      identifiant: 'bib_catalogue',
      libelleEn: 'Library Catalog',
      libelleFr: 'Catalogue Bibliothèque',
      chemin: CHEMINS_APPLICATION.BIBLIOTHEQUE,
      icone: BookOpen,
    },
    {
      identifiant: 'bib_emprunts',
      libelleEn: 'Loans & Returns',
      libelleFr: 'Emprunts & Retours',
      chemin: CHEMINS_APPLICATION.BIBLIOTHEQUE,
      icone: RefreshCw,
    },
    {
      identifiant: 'bib_numerique',
      libelleEn: 'Digital Media & E-Books',
      libelleFr: 'Ressources Numériques',
      chemin: CHEMINS_APPLICATION.BIBLIOTHEQUE,
      icone: Laptop,
    },
  ],

  // 9. Communication
  charge_communication: [
    {
      identifiant: 'com_tableau_de_bord',
      libelleEn: 'Dashboard',
      libelleFr: 'Tableau de bord',
      chemin: CHEMINS_APPLICATION.TABLEAU_DE_BORD_COMMUNICATION,
      icone: LayoutDashboard,
      estTableauDeBord: true,
    },
    {
      identifiant: 'com_communications',
      libelleEn: 'Communications',
      libelleFr: 'Communications',
      chemin: CHEMINS_APPLICATION.COMMUNICATION,
      icone: Megaphone,
    },
    {
      identifiant: 'com_actualites',
      libelleEn: 'News & Events',
      libelleFr: 'Actualités',
      chemin: CHEMINS_APPLICATION.COMMUNICATION,
      icone: Newspaper,
    },
    {
      identifiant: 'com_annonces',
      libelleEn: 'Campus Broadcasts',
      libelleFr: 'Annonces',
      chemin: CHEMINS_APPLICATION.COMMUNICATION,
      icone: BellRing,
    },
    {
      identifiant: 'com_medias',
      libelleEn: 'Media & Bulletins',
      libelleFr: 'Médias',
      chemin: CHEMINS_APPLICATION.COMMUNICATION,
      icone: Radio,
    },
  ],
};

export const OBTENIR_MENU_PAR_ROLE = (role: RoleUtilisateur): ElementMenuRole[] => {
  return MENUS_PAR_ROLE[role] || MENUS_PAR_ROLE.administrateur;
};
