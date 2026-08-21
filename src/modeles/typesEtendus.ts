export interface IncidentDisciplinaire {
  identifiant: string;
  nomEleve: string;
  classe: string;
  gravite: 'mineure' | 'moyenne' | 'critique';
  description: string;
  sanction: string;
  rapportePar: string;
  dateIncident: string;
  statut: 'en_cours' | 'resolu' | 'conseil_discipline';
}

export interface DevoirMaison {
  identifiant: string;
  matiere: string;
  classe: string;
  titre: string;
  description: string;
  dateEcheance: string;
  soumissionsTotal: number;
  effectifClasse: number;
  fichierJointUrl?: string;
}

export interface RessourcePedagogique {
  identifiant: string;
  titre: string;
  matiere: string;
  classe: string;
  typeFichier: 'PDF' | 'DOCX' | 'PPTX' | 'ZIP';
  taille: string;
  dateAjout: string;
  professeurNom: string;
}

export interface DemandeDocument {
  identifiant: string;
  typeDocument: 'certificat_scolarite' | 'releve_notes' | 'certificat_transfert' | 'attestation_inscription';
  demandeurNom: string;
  roleDemandeur: 'eleve' | 'parent';
  classe: string;
  dateDemande: string;
  statut: 'en_attente' | 'pret' | 'delivre';
}

export interface RendezVousParent {
  identifiant: string;
  nomParent: string;
  nomProfesseur: string;
  eleveConcerne: string;
  dateRdv: string;
  heureRdv: string;
  motif: string;
  statut: 'confirme' | 'en_attente' | 'termine' | 'annule';
}

export interface NotificationSecurite {
  identifiant: string;
  typeEvenement: 'connexion' | 'changement_mot_de_passe' | 'echec_connexion' | 'export_donnees';
  adresseIp: string;
  appareil: string;
  horodatage: string;
  statut: 'reussi' | 'bloque' | 'alerte';
}

export interface BudgetDepartement {
  identifiant: string;
  departement: string;
  budgetAlloue: number;
  budgetDepense: number;
  anneeFiscale: string;
  responsableNom: string;
}

// -------------------------------------------------------------
// Extensions spécifiques au Portail Élève
// -------------------------------------------------------------

export interface MessageChatProfesseur {
  identifiant: string;
  destinataireId: string;
  destinataireNom: string;
  expediteurNom: string;
  expediteurRole: 'eleve' | 'professeur';
  matiere: string;
  contenu: string;
  dateEnvoi: string;
  heureEnvoi: string;
  lu: boolean;
  fichierJoint?: { nom: string; taille: string };
}

export interface MessageAdministrationEleve {
  identifiant: string;
  titre: string;
  expediteurService: 'Direction des Études' | 'Vie Scolaire' | 'Secrétariat Général' | 'Comptabilité' | 'Infirmerie';
  date: string;
  priorite: 'normale' | 'urgente' | 'officiel';
  contenu: string;
  lu: boolean;
  actionRequise?: string;
  documentAttache?: string;
}

export interface EvenementCalendrierScolaire {
  identifiant: string;
  titre: string;
  type: 'vacances' | 'ferie' | 'examen' | 'conseil_classe' | 'evenement_culturel' | 'reunion_parents';
  dateDebut: string;
  dateFin?: string;
  description: string;
  lieu?: string;
  concerne: string;
}

export interface CompteCantineBadge {
  soldeActuel: number;
  numeroBadge: string;
  regime: 'demi_pensionnaire' | 'externe' | 'interne';
  forfaitRestant: number;
  derniersPassages: Array<{ id: string; date: string; heure: string; typeRepas: string; debit: number; borne: string }>;
}

export interface CarteTransportScolaire {
  numeroCarte: string;
  ligneBus: string;
  arretPrincipal: string;
  statutValidite: 'valide' | 'a_renouveler' | 'suspendu';
  dateExpiration: string;
}

export interface CorrectionExamenDetaillee {
  identifiant: string;
  titreEvaluation: string;
  matiere: string;
  dateExamen: string;
  noteObtenue: number;
  noteMaximale: number;
  moyenneClasse: number;
  noteMin: number;
  noteMax: number;
  rangEleve: number;
  effectifTotal: number;
  appreciationProfesseur: string;
  baremeDetaille: Array<{ question: string; pointsObtenus: number; totalPoints: number; commentaire: string }>;
  copieScanneNom?: string;
  corrigeTypeNom?: string;
}

export interface JustificatifAbsence {
  identifiant: string;
  dateAbsenceDebut: string;
  dateAbsenceFin: string;
  nombreHeures: number;
  motif: 'maladie' | 'raison_familiale' | 'transport' | 'convocation_officielle' | 'autre';
  commentaire: string;
  nomFichierJoint?: string;
  dateDepot: string;
  statut: 'en_attente' | 'valide_vie_scolaire' | 'refuse';
  reponseVieScolaire?: string;
}

export interface ProfilEleveComplet {
  identifiant: string;
  matricule: string;
  nomComplet: string;
  avatarUrl?: string;
  dateNaissance: string;
  lieuNaissance: string;
  sexe: 'M' | 'F';
  classe: string;
  delegueClasse: boolean;
  specialites: string[];
  languesVivantes: string[];
  courriel: string;
  telephone: string;
  adresse: string;
  regimeScolaire: 'Externe' | 'Demi-pensionnaire' | 'Interne';
  contactUrgence: {
    nom: string;
    lienParente: string;
    telephone: string;
    courriel: string;
  };
  medecinTraitant?: string;
  allergiesAmenagements?: string;
}

export interface SujetForumClasse {
  identifiant: string;
  auteurNom: string;
  auteurRole: 'eleve' | 'delegue' | 'professeur';
  matiere: string;
  titre: string;
  contenu: string;
  dateCreation: string;
  resolu: boolean;
  reponses: Array<{
    identifiant: string;
    auteurNom: string;
    date: string;
    contenu: string;
    estMeilleureReponse?: boolean;
  }>;
}

export interface EbookNumerique {
  identifiant: string;
  titre: string;
  auteur: string;
  matiere: string;
  format: 'PDF' | 'EPUB';
  taille: string;
  niveau: string;
  nombrePages: number;
  description: string;
  disponibleLecture: boolean;
  lecturesEnCours?: boolean;
}

