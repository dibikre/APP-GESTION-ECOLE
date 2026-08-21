export type RoleUtilisateur =
  | 'administrateur'
  | 'professeur'
  | 'eleve'
  | 'parent'
  | 'secretaire'
  | 'comptable'
  | 'ressources_humaines'
  | 'bibliothecaire'
  | 'charge_communication';

export interface Utilisateur {
  identifiant: string;
  nomComplet: string;
  courriel: string;
  role: RoleUtilisateur;
  avatarUrl?: string;
  telephone?: string;
  departement?: string;
}

export interface Eleve {
  identifiant: string;
  matricule: string;
  nomComplet: string;
  classe: string;
  dateNaissance: string;
  courriel: string;
  telephoneParent: string;
  nomParent: string;
  statutFrais: 'paye' | 'partiel' | 'en_retard';
  moyenneGenerale: number;
  tauxPresence: number;
}

export interface Professeur {
  identifiant: string;
  matricule: string;
  nomComplet: string;
  matiere: string;
  classesAssignees: string[];
  courriel: string;
  telephone: string;
  dateEmbauche: string;
}

export interface NoteEleve {
  identifiant: string;
  identifiantEleve: string;
  nomEleve: string;
  classe: string;
  matiere: string;
  titreEvaluation: string;
  typeEvaluation?: 'CC1' | 'CC2' | 'CC3' | 'Examen' | 'TP' | 'Projet';
  ponderation?: number;
  noteObtenue: number;
  noteMaximale: number;
  dateEvaluation: string;
  commentaire?: string;
}

export interface PresenceEleve {
  identifiant: string;
  identifiantEleve: string;
  nomEleve: string;
  classe: string;
  date: string;
  statut: 'present' | 'absent' | 'retard' | 'justifie';
  remarque?: string;
}

export interface FactureComptabilite {
  identifiant: string;
  numeroFacture: string;
  identifiantEleve: string;
  nomEleve: string;
  classe: string;
  montantTotal: number;
  montantPaye: number;
  dateEmission: string;
  dateEcheance: string;
  statut: 'paye' | 'partiel' | 'en_attente' | 'en_retard';
  typePaiement: 'scolarite' | 'cantine' | 'transport' | 'uniforme' | 'activite';
}

export interface TransactionFinanciere {
  identifiant: string;
  reference: string;
  type: 'revenu' | 'depense';
  categorie: 'frais_scolaires' | 'salaires' | 'equipements' | 'maintenance' | 'activites';
  description: string;
  montant: number;
  dateTransaction: string;
  beneficiaire: string;
}

export interface EmployeRH {
  identifiant: string;
  matricule: string;
  nomComplet: string;
  poste: string;
  departement: 'Pedagogique' | 'Administration' | 'Comptabilite' | 'Technique' | 'Services';
  typeContrat: 'CDI' | 'CDD' | 'Temps partiel' | 'Vacataire';
  salaireMensuel: number;
  dateDebut: string;
  joursCongesRestants: number;
  statut: 'actif' | 'en_conge' | 'arret_maladie';
}

export interface DemandeConge {
  identifiant: string;
  identifiantEmploye: string;
  nomEmploye: string;
  typeConge: 'annuel' | 'maladie' | 'maternite' | 'autre';
  dateDebut: string;
  dateFin: string;
  motif: string;
  statut: 'en_attente' | 'approuve' | 'refuse';
}

export interface LivreBibliotheque {
  identifiant: string;
  isbn: string;
  titre: string;
  auteur: string;
  categorie: string;
  exemplairesTotal: number;
  exemplairesDisponibles: number;
  emplacement: string;
}

export interface EmpruntLivre {
  identifiant: string;
  identifiantLivre: string;
  titreLivre: string;
  emprunteurNom: string;
  emprunteurType: 'eleve' | 'professeur';
  dateEmprunt: string;
  dateRetourPrevue: string;
  dateRetourEffective?: string;
  statut: 'en_cours' | 'rendu' | 'en_retard';
}

export interface AnnonceCommunication {
  identifiant: string;
  titre: string;
  contenu: string;
  auteurNom: string;
  datePublication: string;
  cible: 'tous' | 'professeurs' | 'eleves' | 'parents' | 'personnel';
  priorite: 'normale' | 'importante' | 'urgente';
  piecesJointes?: string[];
}

export interface CoursHoraire {
  identifiant: string;
  classe: string;
  matiere: string;
  professeurNom: string;
  jourSemaine: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  heureDebut: string;
  heureFin: string;
  salle: string;
}

export * from './typesEtendus';
export * from './classesAcademiques';
export * from './devises';
export * from './menusParRole';
