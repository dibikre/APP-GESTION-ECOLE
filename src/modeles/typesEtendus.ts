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
