import {
  IncidentDisciplinaire,
  DevoirMaison,
  RessourcePedagogique,
  DemandeDocument,
  RendezVousParent,
  NotificationSecurite,
  BudgetDepartement,
} from '../types';

export const INCIDENTS_DISCIPLINAIRES_INITIAUX: IncidentDisciplinaire[] = [
  {
    identifiant: 'inc-1',
    nomEleve: 'Lucas Silva',
    classe: 'Tle C',
    gravite: 'moyenne',
    description: 'Unexcused departure during physics lab session without authorization.',
    sanction: '2 hours detention & written notice sent to parents.',
    rapportePar: 'Dr. Robert Chen',
    dateIncident: '2026-03-02',
    statut: 'en_cours',
  },
  {
    identifiant: 'inc-2',
    nomEleve: 'Chloe Bennett',
    classe: '3e A',
    gravite: 'mineure',
    description: 'Repeated phone usage in study hall after previous reminder.',
    sanction: 'Device stored at administrative office until 17:00.',
    rapportePar: 'Sarah Jenkins',
    dateIncident: '2026-02-28',
    statut: 'resolu',
  },
];

export const DEVOIRS_INITIAUX: DevoirMaison[] = [
  {
    identifiant: 'dev-1',
    matiere: 'Advanced Mathematics',
    classe: '1ère C',
    titre: 'Calculus Problem Set #4: Integration by Parts',
    description: 'Complete exercises 12 to 28 on Page 144 of the textbook. Show all derivation steps.',
    dateEcheance: '2026-03-08',
    soumissionsTotal: 22,
    effectifClasse: 28,
  },
  {
    identifiant: 'dev-2',
    matiere: 'Physics & Chemistry',
    classe: '1ère C',
    titre: 'Optics & Wave Motion Lab Report',
    description: 'Submit experimental data table and graphical analysis for Snell’s Law lab.',
    dateEcheance: '2026-03-10',
    soumissionsTotal: 18,
    effectifClasse: 28,
  },
  {
    identifiant: 'dev-3',
    matiere: 'Histoire-Géographie & ECM',
    classe: '3e A',
    titre: 'Brevet Prep Dossier: La Seconde Guerre Mondiale',
    description: 'Étude critique de documents et rédaction argumentée.',
    dateEcheance: '2026-03-14',
    soumissionsTotal: 25,
    effectifClasse: 30,
  },
  {
    identifiant: 'dev-4',
    matiere: 'English & French Literature',
    classe: '6e A',
    titre: 'Fiche de lecture: Les Contes et Récits Mythologiques',
    description: 'Remplir le questionnaire analytique sur les métamorphoses.',
    dateEcheance: '2026-03-15',
    soumissionsTotal: 28,
    effectifClasse: 32,
  },
];

export const RESSOURCES_PEDAGOGIQUES_INITIALES: RessourcePedagogique[] = [
  {
    identifiant: 'res-1',
    titre: 'Differential Equations Study Guide & Formulas',
    matiere: 'Advanced Mathematics',
    classe: '1ère C',
    typeFichier: 'PDF',
    taille: '2.4 MB',
    dateAjout: '2026-03-01',
    professeurNom: 'Prof. Evelyn Reed',
  },
  {
    identifiant: 'res-2',
    titre: 'Quantum Mechanics Overview & Lecture Slides',
    matiere: 'Physics & Chemistry',
    classe: '1ère C',
    typeFichier: 'PPTX',
    taille: '5.8 MB',
    dateAjout: '2026-02-26',
    professeurNom: 'Dr. Robert Chen',
  },
  {
    identifiant: 'res-3',
    titre: 'Shakespeare Midsummer Night’s Dream Annotated Text',
    matiere: 'English & French Literature',
    classe: '2nde A',
    typeFichier: 'PDF',
    taille: '1.9 MB',
    dateAjout: '2026-02-24',
    professeurNom: 'Sarah Jenkins',
  },
  {
    identifiant: 'res-4',
    titre: 'Annales Officielles du Brevet - Mathématiques',
    matiere: 'Advanced Mathematics',
    classe: '3e A',
    typeFichier: 'PDF',
    taille: '4.2 MB',
    dateAjout: '2026-02-20',
    professeurNom: 'Prof. Evelyn Reed',
  },
  {
    identifiant: 'res-5',
    titre: 'Programme Officiel et Schémas SVT 6ème',
    matiere: 'SVT',
    classe: '6e A',
    typeFichier: 'PDF',
    taille: '3.1 MB',
    dateAjout: '2026-02-18',
    professeurNom: 'Mme Helene Bamba',
  },
];

export const DEMANDES_DOCUMENTS_INITIALES: DemandeDocument[] = [
  {
    identifiant: 'doc-1',
    typeDocument: 'certificat_scolarite',
    demandeurNom: 'Marcus Vance',
    roleDemandeur: 'eleve',
    classe: '1ère C',
    dateDemande: '2026-03-02',
    statut: 'pret',
  },
  {
    identifiant: 'doc-2',
    typeDocument: 'releve_notes',
    demandeurNom: 'Eleanor Vance',
    roleDemandeur: 'parent',
    classe: '1ère C',
    dateDemande: '2026-02-27',
    statut: 'delivre',
  },
];

export const RENDEZ_VOUS_PARENTS_INITIAUX: RendezVousParent[] = [
  {
    identifiant: 'rdv-1',
    nomParent: 'Eleanor Vance',
    nomProfesseur: 'Prof. Evelyn Reed',
    eleveConcerne: 'Marcus Vance (1ère C)',
    dateRdv: '2026-03-12',
    heureRdv: '16:30',
    motif: 'Academic progress review for National Olympiad preparation.',
    statut: 'confirme',
  },
];

export const NOTIFICATIONS_SECURITE_INITIALES: NotificationSecurite[] = [
  {
    identifiant: 'sec-1',
    typeEvenement: 'connexion',
    adresseIp: '192.168.1.45',
    appareil: 'Chrome / macOS Sonoma',
    horodatage: '2026-03-03 08:24:12',
    statut: 'reussi',
  },
  {
    identifiant: 'sec-2',
    typeEvenement: 'changement_mot_de_passe',
    adresseIp: '192.168.1.45',
    appareil: 'Chrome / macOS Sonoma',
    horodatage: '2026-02-15 14:10:05',
    statut: 'reussi',
  },
];

export const BUDGETS_DEPARTEMENTS_INITIAUX: BudgetDepartement[] = [
  {
    identifiant: 'bud-1',
    departement: 'Sciences & STEM Labs (Collège & Lycée)',
    budgetAlloue: 45000,
    budgetDepense: 31200,
    anneeFiscale: '2025-2026',
    responsableNom: 'Dr. Robert Chen',
  },
  {
    identifiant: 'bud-2',
    departement: 'Library & Secondary Media Center',
    budgetAlloue: 25000,
    budgetDepense: 16800,
    anneeFiscale: '2025-2026',
    responsableNom: 'Hannah Campbell',
  },
  {
    identifiant: 'bud-3',
    departement: 'Athletics & Sports Facilities',
    budgetAlloue: 30000,
    budgetDepense: 22400,
    anneeFiscale: '2025-2026',
    responsableNom: 'Coach Marcus Bell',
  },
  {
    identifiant: 'bud-4',
    departement: 'Campus IT & Infrastructure',
    budgetAlloue: 50000,
    budgetDepense: 38900,
    anneeFiscale: '2025-2026',
    responsableNom: 'David Hawthorne',
  },
];
