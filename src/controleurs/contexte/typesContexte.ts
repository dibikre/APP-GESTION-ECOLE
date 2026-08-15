import {
  RoleUtilisateur,
  Eleve,
  Professeur,
  NoteEleve,
  PresenceEleve,
  FactureComptabilite,
  TransactionFinanciere,
  EmployeRH,
  DemandeConge,
  LivreBibliotheque,
  EmpruntLivre,
  AnnonceCommunication,
  CoursHoraire,
  IncidentDisciplinaire,
  DevoirMaison,
  RessourcePedagogique,
  DemandeDocument,
  RendezVousParent,
  NotificationSecurite,
  BudgetDepartement,
  CodeDevise,
  DefinitionDevise,
} from '../../modeles/types';
import { LangueApplication, DICTIONNAIRE_TRADUCTIONS } from '../../modeles/traductions';

export type CleTraduction = keyof typeof DICTIONNAIRE_TRADUCTIONS['fr'];

export interface ContexteAcademieType {
  // Langue & Localisation
  langueActuelle: LangueApplication;
  changerLangue: (nouvelleLangue: LangueApplication) => void;
  traduire: (cle: CleTraduction) => string;

  // Devise Institutionnelle
  deviseActuelle: CodeDevise;
  changerDevise: (nouvelleDevise: CodeDevise) => void;
  formaterMontant: (montant: number) => string;
  symboleDevise: string;
  definitionDeviseActuelle: DefinitionDevise;

  // Navigation & Rôles
  roleActif: RoleUtilisateur;
  changerRoleActif: (nouveauRole: RoleUtilisateur) => void;
  ongletActif: string;
  changerOngletActif: (onglet: string) => void;
  termeRecherche: string;
  definirTermeRecherche: (terme: string) => void;

  // Données et Actions Métier
  listeEleves: Eleve[];
  ajouterEleve: (eleve: Omit<Eleve, 'identifiant' | 'matricule'>) => void;
  supprimerEleve: (identifiant: string) => void;
  listeProfesseurs: Professeur[];
  listeNotes: NoteEleve[];
  ajouterNote: (note: Omit<NoteEleve, 'identifiant'>) => void;
  listePresences: PresenceEleve[];
  enregistrerPresence: (presence: Omit<PresenceEleve, 'identifiant'>) => void;
  listeFactures: FactureComptabilite[];
  ajouterFacture: (facture: Omit<FactureComptabilite, 'identifiant' | 'numeroFacture'>) => void;
  enregistrerPaiement: (identifiantFacture: string, montant: number) => void;
  listeTransactions: TransactionFinanciere[];
  ajouterTransaction: (transaction: Omit<TransactionFinanciere, 'identifiant' | 'reference'>) => void;
  listeEmployes: EmployeRH[];
  ajouterEmploye: (employe: Omit<EmployeRH, 'identifiant' | 'matricule'>) => void;
  supprimerEmploye: (identifiant: string) => void;
  listeDemandesConges: DemandeConge[];
  soumettreDemandeConge: (demande: Omit<DemandeConge, 'identifiant' | 'statut'>) => void;
  traiterDemandeConge: (identifiant: string, statut: 'approuve' | 'refuse') => void;
  listeLivres: LivreBibliotheque[];
  ajouterLivre: (livre: Omit<LivreBibliotheque, 'identifiant'>) => void;
  listeEmprunts: EmpruntLivre[];
  enregistrerEmpruntLivre: (identifiantLivre: string, emprunteurNom: string, type: 'eleve' | 'professeur') => void;
  retournerLivreEmprunte: (identifiantEmprunt: string) => void;
  listeAnnonces: AnnonceCommunication[];
  publierAnnonce: (annonce: Omit<AnnonceCommunication, 'identifiant' | 'datePublication'>) => void;
  listeCoursHoraires: CoursHoraire[];

  // Données étendues
  listeIncidents: IncidentDisciplinaire[];
  ajouterIncident: (incident: Omit<IncidentDisciplinaire, 'identifiant'>) => void;
  listeDevoirs: DevoirMaison[];
  ajouterDevoir: (devoir: Omit<DevoirMaison, 'identifiant'>) => void;
  listeRessources: RessourcePedagogique[];
  ajouterRessource: (ressource: Omit<RessourcePedagogique, 'identifiant' | 'dateAjout'>) => void;
  listeDemandesDocs: DemandeDocument[];
  soumettreDemandeDoc: (demande: Omit<DemandeDocument, 'identifiant' | 'dateDemande' | 'statut'>) => void;
  traiterDemandeDoc: (identifiant: string, statut: 'pret' | 'delivre') => void;
  listeRendezVous: RendezVousParent[];
  reserverRendezVous: (rdv: Omit<RendezVousParent, 'identifiant' | 'statut'>) => void;
  listeSecurite: NotificationSecurite[];
  listeBudgets: BudgetDepartement[];
}
