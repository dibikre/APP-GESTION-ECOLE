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
export const IconeTableauDeBord = fabriquerIcone('lucide:layout-dashboard');
export const IconeBouclier = fabriquerIcone('lucide:shield');
export const IconeLivre = fabriquerIcone('lucide:book-open');
export const IconeDiplome = fabriquerIcone('lucide:graduation-cap');
export const IconeUtilisateurs = fabriquerIcone('lucide:users');
export const IconeCarteCredit = fabriquerIcone('lucide:credit-card');
export const IconeMallette = fabriquerIcone('lucide:briefcase');
export const IconeBatiment = fabriquerIcone('lucide:building-2');
export const IconeBatimentSimple = fabriquerIcone('lucide:building');
export const IconeMegaphone = fabriquerIcone('lucide:megaphone');
export const IconeRecherche = fabriquerIcone('lucide:search');
export const IconeCloche = fabriquerIcone('lucide:bell');
export const IconeMenu = fabriquerIcone('lucide:menu');
export const IconeFermer = fabriquerIcone('lucide:x');
export const IconeChevronBas = fabriquerIcone('lucide:chevron-down');
export const IconeChevronHaut = fabriquerIcone('lucide:chevron-up');
export const IconeChevronDroite = fabriquerIcone('lucide:chevron-right');
export const IconeChevronGauche = fabriquerIcone('lucide:chevron-left');
export const IconeLangues = fabriquerIcone('lucide:languages');
export const IconePressePapiers = fabriquerIcone('lucide:clipboard-list');
export const IconeUtilisateurCoche = fabriquerIcone('lucide:user-check');
export const IconeAjoutUtilisateur = fabriquerIcone('lucide:user-plus');
export const IconePlus = fabriquerIcone('lucide:plus');
export const IconePlusCercle = fabriquerIcone('lucide:plus-circle');
export const IconeFiltre = fabriquerIcone('lucide:filter');
export const IconeCalendrier = fabriquerIcone('lucide:calendar');
export const IconeCalendrierCoche = fabriquerIcone('lucide:calendar-check');
export const IconeDocument = fabriquerIcone('lucide:file-text');
export const IconeTableur = fabriquerIcone('lucide:file-spreadsheet');
export const IconeTelecharger = fabriquerIcone('lucide:download');
export const IconeTeleverserNuage = fabriquerIcone('lucide:upload-cloud');
export const IconePartage = fabriquerIcone('lucide:share-2');
export const IconePiecesMonnaie = fabriquerIcone('lucide:coins');
export const IconeCoche = fabriquerIcone('lucide:check');
export const IconeCocheCercle = fabriquerIcone('lucide:check-circle');
export const IconeCocheCarre = fabriquerIcone('lucide:check-square');
export const IconeFichierValide = fabriquerIcone('lucide:file-check');
export const IconeAlerte = fabriquerIcone('lucide:alert-circle');
export const IconeAlerteTriangle = fabriquerIcone('lucide:alert-triangle');
export const IconeBouclierAlerte = fabriquerIcone('lucide:shield-alert');
export const IconeBouclierCoche = fabriquerIcone('lucide:shield-check');
export const IconeInfo = fabriquerIcone('lucide:info');
export const IconeModifier = fabriquerIcone('lucide:edit');
export const IconePoubelle = fabriquerIcone('lucide:trash-2');
export const IconeOeil = fabriquerIcone('lucide:eye');
export const IconeParametres = fabriquerIcone('lucide:settings');
export const IconeCurseurs = fabriquerIcone('lucide:sliders');
export const IconeCourriel = fabriquerIcone('lucide:mail');
export const IconeTelephone = fabriquerIcone('lucide:phone');
export const IconeSmartphone = fabriquerIcone('lucide:smartphone');
export const IconeMessage = fabriquerIcone('lucide:message-square');
export const IconeHorloge = fabriquerIcone('lucide:clock');
export const IconeDollar = fabriquerIcone('lucide:dollar-sign');
export const IconeFlecheHautDroite = fabriquerIcone('lucide:arrow-up-right');
export const IconeFlecheBasDroite = fabriquerIcone('lucide:arrow-down-right');
export const IconeFlecheBasGauche = fabriquerIcone('lucide:arrow-down-left');
export const IconeFlechesEchange = fabriquerIcone('lucide:arrow-right-left');
export const IconeTendanceHaut = fabriquerIcone('lucide:trending-up');
export const IconeCle = fabriquerIcone('lucide:key');
export const IconeVerrou = fabriquerIcone('lucide:lock');
export const IconeEtoile = fabriquerIcone('lucide:star');
export const IconeRecompense = fabriquerIcone('lucide:award');
export const IconeSignalement = fabriquerIcone('lucide:flag');
export const IconeJournal = fabriquerIcone('lucide:newspaper');
export const IconeSignet = fabriquerIcone('lucide:book-marked');
export const IconeMarquePage = fabriquerIcone('lucide:bookmark');
export const IconeDossier = fabriquerIcone('lucide:folder-git-2');
export const IconeEnvoyer = fabriquerIcone('lucide:send');
export const IconeRafraichir = fabriquerIcone('lucide:refresh-cw');
export const IconeImprimante = fabriquerIcone('lucide:printer');
export const IconeTrombone = fabriquerIcone('lucide:paperclip');
export const IconeSauvegarder = fabriquerIcone('lucide:save');
export const IconeArchive = fabriquerIcone('lucide:archive');
export const IconeBaseDeDonnees = fabriquerIcone('lucide:database');
export const IconeRadio = fabriquerIcone('lucide:radio');
export const IconeRecu = fabriquerIcone('lucide:receipt');
export const IconeCouches = fabriquerIcone('lucide:layers');
export const IconeGraphiqueCamembert = fabriquerIcone('lucide:pie-chart');

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
