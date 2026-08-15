import React from 'react';
import { Icon } from '@iconify/react';

export interface ProprietesIconeSpecifique {
  className?: string;
  onClick?: () => void;
}

export const fabriquerIcone = (nomIconeIconify: string) => {
  const ComposantIcone: React.FC<ProprietesIconeSpecifique> = ({ className = 'w-5 h-5', onClick }) => {
    return <Icon icon={nomIconeIconify} className={className} onClick={onClick} />;
  };
  return ComposantIcone;
};

// Catalogue complet d'icones Iconify (https://icon-sets.iconify.design)
export const IconeTableauDeBord = fabriquerIcone('ph:layout-bold');
export const IconeBouclier = fabriquerIcone('ph:shield-bold');
export const IconeLivre = fabriquerIcone('ph:book-open-bold');
export const IconeDiplome = fabriquerIcone('ph:graduation-cap-bold');
export const IconeUtilisateurs = fabriquerIcone('ph:users-bold');
export const IconeCarteCredit = fabriquerIcone('ph:credit-card-bold');
export const IconeMallette = fabriquerIcone('ph:briefcase-bold');
export const IconeBatiment = fabriquerIcone('ph:buildings-bold');
export const IconeBatimentSimple = fabriquerIcone('ph:building-bold');
export const IconeMegaphone = fabriquerIcone('ph:megaphone-bold');
export const IconeRecherche = fabriquerIcone('ph:magnifying-glass-bold');
export const IconeCloche = fabriquerIcone('ph:bell-bold');
export const IconeMenu = fabriquerIcone('ph:list-bold');
export const IconeFermer = fabriquerIcone('ph:x-bold');
export const IconeChevronBas = fabriquerIcone('ph:caret-down-bold');
export const IconeChevronHaut = fabriquerIcone('ph:caret-up-bold');
export const IconeChevronDroite = fabriquerIcone('ph:caret-right-bold');
export const IconeChevronGauche = fabriquerIcone('ph:caret-left-bold');
export const IconeLangues = fabriquerIcone('ph:translate-bold');
export const IconePressePapiers = fabriquerIcone('ph:clipboard-text-bold');
export const IconeUtilisateurCoche = fabriquerIcone('ph:user-check-bold');
export const IconeAjoutUtilisateur = fabriquerIcone('ph:user-plus-bold');
export const IconePlus = fabriquerIcone('ph:plus-bold');
export const IconePlusCercle = fabriquerIcone('ph:plus-circle-bold');
export const IconeFiltre = fabriquerIcone('ph:funnel-bold');
export const IconeCalendrier = fabriquerIcone('ph:calendar-blank-bold');
export const IconeCalendrierCoche = fabriquerIcone('ph:calendar-check-bold');
export const IconeDocument = fabriquerIcone('ph:file-text-bold');
export const IconeTableur = fabriquerIcone('ph:table-bold');
export const IconeTelecharger = fabriquerIcone('ph:download-simple-bold');
export const IconeTeleverserNuage = fabriquerIcone('ph:cloud-arrow-up-bold');
export const IconePartage = fabriquerIcone('ph:share-network-bold');
export const IconePiecesMonnaie = fabriquerIcone('ph:coins-bold');
export const IconeCoche = fabriquerIcone('ph:check-bold');
export const IconeCocheCercle = fabriquerIcone('ph:check-circle-bold');
export const IconeCocheCarre = fabriquerIcone('ph:check-square-bold');
export const IconeFichierValide = fabriquerIcone('ph:file-check-bold');
export const IconeAlerte = fabriquerIcone('ph:warning-circle-bold');
export const IconeAlerteTriangle = fabriquerIcone('ph:warning-bold');
export const IconeBouclierAlerte = fabriquerIcone('ph:shield-warning-bold');
export const IconeBouclierCoche = fabriquerIcone('ph:shield-check-bold');
export const IconeInfo = fabriquerIcone('ph:info-bold');
export const IconeModifier = fabriquerIcone('ph:pencil-simple-bold');
export const IconePoubelle = fabriquerIcone('ph:trash-bold');
export const IconeOeil = fabriquerIcone('ph:eye-bold');
export const IconeParametres = fabriquerIcone('ph:gear-bold');
export const IconeCurseurs = fabriquerIcone('ph:sliders-bold');
export const IconeCourriel = fabriquerIcone('ph:envelope-simple-bold');
export const IconeTelephone = fabriquerIcone('ph:phone-bold');
export const IconeSmartphone = fabriquerIcone('ph:device-mobile-bold');
export const IconeMessage = fabriquerIcone('ph:chat-circle-dots-bold');
export const IconeHorloge = fabriquerIcone('ph:clock-bold');
export const IconeDollar = fabriquerIcone('ph:currency-dollar-bold');
export const IconeFlecheHautDroite = fabriquerIcone('ph:arrow-up-right-bold');
export const IconeFlecheBasDroite = fabriquerIcone('ph:arrow-down-right-bold');
export const IconeFlecheBasGauche = fabriquerIcone('ph:arrow-down-left-bold');
export const IconeFlechesEchange = fabriquerIcone('ph:arrows-left-right-bold');
export const IconeTendanceHaut = fabriquerIcone('ph:trend-up-bold');
export const IconeCle = fabriquerIcone('ph:key-bold');
export const IconeVerrou = fabriquerIcone('ph:lock-simple-bold');
export const IconeEtoile = fabriquerIcone('ph:star-bold');
export const IconeRecompense = fabriquerIcone('ph:trophy-bold');
export const IconeSignalement = fabriquerIcone('ph:flag-bold');
export const IconeJournal = fabriquerIcone('ph:newspaper-bold');
export const IconeSignet = fabriquerIcone('ph:book-bookmark-bold');
export const IconeMarquePage = fabriquerIcone('ph:bookmark-simple-bold');
export const IconeDossier = fabriquerIcone('ph:folder-notch-open-bold');
export const IconeEnvoyer = fabriquerIcone('ph:paper-plane-tilt-bold');
export const IconeRafraichir = fabriquerIcone('ph:arrows-clockwise-bold');
export const IconeImprimante = fabriquerIcone('ph:printer-bold');
export const IconeTrombone = fabriquerIcone('ph:paperclip-bold');
export const IconeSauvegarder = fabriquerIcone('ph:floppy-disk-bold');
export const IconeArchive = fabriquerIcone('ph:archive-box-bold');
export const IconeBaseDeDonnees = fabriquerIcone('ph:database-bold');
export const IconeRadio = fabriquerIcone('ph:broadcast-bold');
export const IconeRecu = fabriquerIcone('ph:receipt-bold');
export const IconeCouches = fabriquerIcone('ph:stack-bold');
export const IconeGraphiqueCamembert = fabriquerIcone('ph:chart-pie-bold');

// Exports nominatifs
export {
  IconeTableauDeBord as LayoutDashboard,
  IconeBouclier as Shield,
  IconeLivre as BookOpen,
  IconeDiplome as GraduationCap,
  IconeUtilisateurs as Users,
  IconeCarteCredit as CreditCard,
  IconeMallette as Briefcase,
  IconeBatiment as Building2,
  IconeBatimentSimple as Building,
  IconeMegaphone as Megaphone,
  IconeRecherche as Search,
  IconeCloche as Bell,
  IconeMenu as Menu,
  IconeFermer as X,
  IconeChevronBas as ChevronDown,
  IconeChevronHaut as ChevronUp,
  IconeChevronDroite as ChevronRight,
  IconeChevronGauche as ChevronLeft,
  IconeLangues as Languages,
  IconePressePapiers as ClipboardList,
  IconeUtilisateurCoche as UserCheck,
  IconeAjoutUtilisateur as UserPlus,
  IconePlus as Plus,
  IconePlusCercle as PlusCircle,
  IconeFiltre as Filter,
  IconeCalendrier as Calendar,
  IconeCalendrierCoche as CalendarCheck,
  IconeDocument as FileText,
  IconeTableur as FileSpreadsheet,
  IconeTelecharger as Download,
  IconeTeleverserNuage as UploadCloud,
  IconePartage as Share2,
  IconePiecesMonnaie as Coins,
  IconeCoche as Check,
  IconeCocheCercle as CheckCircle,
  IconeCocheCarre as CheckSquare,
  IconeFichierValide as FileCheck,
  IconeAlerte as AlertCircle,
  IconeAlerteTriangle as AlertTriangle,
  IconeBouclierAlerte as ShieldAlert,
  IconeBouclierCoche as ShieldCheck,
  IconeInfo as Info,
  IconeModifier as Edit,
  IconeModifier as Edit3,
  IconePoubelle as Trash2,
  IconeOeil as Eye,
  IconeParametres as Settings,
  IconeCurseurs as Sliders,
  IconeCourriel as Mail,
  IconeTelephone as Phone,
  IconeSmartphone as Smartphone,
  IconeMessage as MessageSquare,
  IconeHorloge as Clock,
  IconeDollar as DollarSign,
  IconeFlecheHautDroite as ArrowUpRight,
  IconeFlecheBasDroite as ArrowDownRight,
  IconeFlecheBasGauche as ArrowDownLeft,
  IconeFlechesEchange as ArrowRightLeft,
  IconeTendanceHaut as TrendingUp,
  IconeCle as Key,
  IconeVerrou as Lock,
  IconeEtoile as Star,
  IconeRecompense as Award,
  IconeSignalement as Flag,
  IconeJournal as Newspaper,
  IconeSignet as BookMarked,
  IconeMarquePage as Bookmark,
  IconeDossier as FolderGit2,
  IconeEnvoyer as Send,
  IconeRafraichir as RefreshCw,
  IconeImprimante as Printer,
  IconeTrombone as Paperclip,
  IconeSauvegarder as Save,
  IconeArchive as Archive,
  IconeBaseDeDonnees as Database,
  IconeRadio as Radio,
  IconeRecu as Receipt,
  IconeCouches as Layers,
  IconeGraphiqueCamembert as PieChart,
};
