import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  RoleUtilisateur, Eleve, Professeur, NoteEleve, PresenceEleve, FactureComptabilite,
  TransactionFinanciere, EmployeRH, DemandeConge, LivreBibliotheque, EmpruntLivre,
  AnnonceCommunication, CoursHoraire, IncidentDisciplinaire, DevoirMaison,
  RessourcePedagogique, DemandeDocument, RendezVousParent, NotificationSecurite,
  BudgetDepartement, CodeDevise, DefinitionDevise, OBTENIR_DEFINITION_DEVISE, formaterMontantDevise,
} from '../../modeles/types';
import {
  ELEVES_INITIAUX, PROFESSEURS_INITIAUX, NOTES_INITIALES, PRESENCES_INITIALES,
  FACTURES_INITIALES, TRANSACTIONS_INITIALES, EMPLOYES_INITIAUX, DEMANDES_CONGES_INITIALES,
  LIVRES_INITIAUX, EMPRUNTS_INITIAUX, ANNONCES_INITIALES, COURS_HORAIRES_INITIAUX,
  INCIDENTS_DISCIPLINAIRES_INITIAUX, DEVOIRS_INITIAUX, RESSOURCES_PEDAGOGIQUES_INITIALES,
  DEMANDES_DOCUMENTS_INITIALES, RENDEZ_VOUS_PARENTS_INITIAUX, NOTIFICATIONS_SECURITE_INITIALES,
  BUDGETS_DEPARTEMENTS_INITIAUX,
} from '../../modeles/donneesInitiales';
import { LangueApplication, DICTIONNAIRE_TRADUCTIONS } from '../../modeles/traductions';
import { ContexteAcademieType, CleTraduction } from './typesContexte';
import { recupererDonneesLocales, sauvegarderDonneesLocales } from './gestionnaireStockage';

const ContexteAcademie = createContext<ContexteAcademieType | undefined>(undefined);

export const FournisseurAcademie: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [langueActuelle, setLangueActuelle] = useState<LangueApplication>('fr');
  const [deviseActuelle, setDeviseActuelle] = useState<CodeDevise>(() =>
    recupererDonneesLocales<CodeDevise>('academie_devise', 'EUR')
  );
  const [roleActif, setRoleActif] = useState<RoleUtilisateur>('administrateur');
  const [ongletActif, setOngletActif] = useState<string>('tableau_de_bord');
  const [termeRecherche, setTermeRecherche] = useState<string>('');

  const [listeEleves, setListeEleves] = useState<Eleve[]>(() => recupererDonneesLocales('academie_eleves', ELEVES_INITIAUX));
  const [listeProfesseurs] = useState<Professeur[]>(PROFESSEURS_INITIAUX);
  const [listeNotes, setListeNotes] = useState<NoteEleve[]>(() => recupererDonneesLocales('academie_notes', NOTES_INITIALES));
  const [listePresences, setListePresences] = useState<PresenceEleve[]>(() => recupererDonneesLocales('academie_presences', PRESENCES_INITIALES));
  const [listeFactures, setListeFactures] = useState<FactureComptabilite[]>(() => recupererDonneesLocales('academie_factures', FACTURES_INITIALES));
  const [listeTransactions, setListeTransactions] = useState<TransactionFinanciere[]>(() => recupererDonneesLocales('academie_transactions', TRANSACTIONS_INITIALES));
  const [listeEmployes, setListeEmployes] = useState<EmployeRH[]>(() => recupererDonneesLocales('academie_employes', EMPLOYES_INITIAUX));
  const [listeDemandesConges, setListeDemandesConges] = useState<DemandeConge[]>(() => recupererDonneesLocales('academie_conges', DEMANDES_CONGES_INITIALES));
  const [listeLivres, setListeLivres] = useState<LivreBibliotheque[]>(() => recupererDonneesLocales('academie_livres', LIVRES_INITIAUX));
  const [listeEmprunts, setListeEmprunts] = useState<EmpruntLivre[]>(() => recupererDonneesLocales('academie_emprunts', EMPRUNTS_INITIAUX));
  const [listeAnnonces, setListeAnnonces] = useState<AnnonceCommunication[]>(() => recupererDonneesLocales('academie_annonces', ANNONCES_INITIALES));
  const [listeCoursHoraires] = useState<CoursHoraire[]>(COURS_HORAIRES_INITIAUX);

  const [listeIncidents, setListeIncidents] = useState<IncidentDisciplinaire[]>(() => recupererDonneesLocales('academie_incidents', INCIDENTS_DISCIPLINAIRES_INITIAUX));
  const [listeDevoirs, setListeDevoirs] = useState<DevoirMaison[]>(() => recupererDonneesLocales('academie_devoirs', DEVOIRS_INITIAUX));
  const [listeRessources, setListeRessources] = useState<RessourcePedagogique[]>(() => recupererDonneesLocales('academie_ressources', RESSOURCES_PEDAGOGIQUES_INITIALES));
  const [listeDemandesDocs, setListeDemandesDocs] = useState<DemandeDocument[]>(() => recupererDonneesLocales('academie_demandes_docs', DEMANDES_DOCUMENTS_INITIALES));
  const [listeRendezVous, setListeRendezVous] = useState<RendezVousParent[]>(() => recupererDonneesLocales('academie_rdv', RENDEZ_VOUS_PARENTS_INITIAUX));
  const [listeSecurite] = useState<NotificationSecurite[]>(NOTIFICATIONS_SECURITE_INITIALES);
  const [listeBudgets] = useState<BudgetDepartement[]>(BUDGETS_DEPARTEMENTS_INITIAUX);

  useEffect(() => sauvegarderDonneesLocales('academie_langue', langueActuelle), [langueActuelle]);
  useEffect(() => sauvegarderDonneesLocales('academie_devise', deviseActuelle), [deviseActuelle]);
  useEffect(() => sauvegarderDonneesLocales('academie_eleves', listeEleves), [listeEleves]);
  useEffect(() => sauvegarderDonneesLocales('academie_notes', listeNotes), [listeNotes]);
  useEffect(() => sauvegarderDonneesLocales('academie_presences', listePresences), [listePresences]);
  useEffect(() => sauvegarderDonneesLocales('academie_factures', listeFactures), [listeFactures]);
  useEffect(() => sauvegarderDonneesLocales('academie_transactions', listeTransactions), [listeTransactions]);
  useEffect(() => sauvegarderDonneesLocales('academie_employes', listeEmployes), [listeEmployes]);
  useEffect(() => sauvegarderDonneesLocales('academie_conges', listeDemandesConges), [listeDemandesConges]);
  useEffect(() => sauvegarderDonneesLocales('academie_livres', listeLivres), [listeLivres]);
  useEffect(() => sauvegarderDonneesLocales('academie_emprunts', listeEmprunts), [listeEmprunts]);
  useEffect(() => sauvegarderDonneesLocales('academie_annonces', listeAnnonces), [listeAnnonces]);
  useEffect(() => sauvegarderDonneesLocales('academie_incidents', listeIncidents), [listeIncidents]);
  useEffect(() => sauvegarderDonneesLocales('academie_devoirs', listeDevoirs), [listeDevoirs]);
  useEffect(() => sauvegarderDonneesLocales('academie_ressources', listeRessources), [listeRessources]);
  useEffect(() => sauvegarderDonneesLocales('academie_demandes_docs', listeDemandesDocs), [listeDemandesDocs]);
  useEffect(() => sauvegarderDonneesLocales('academie_rdv', listeRendezVous), [listeRendezVous]);

  const changerLangue = (nouvelleLangue: LangueApplication) => setLangueActuelle(nouvelleLangue);
  const traduire = (cle: CleTraduction): string => DICTIONNAIRE_TRADUCTIONS[langueActuelle][cle] || cle;
  const changerDevise = (nouvelleDevise: CodeDevise) => setDeviseActuelle(nouvelleDevise);
  const definitionDeviseActuelle = OBTENIR_DEFINITION_DEVISE(deviseActuelle);
  const symboleDevise = definitionDeviseActuelle.symbole;
  const formaterMontant = (montant: number) => formaterMontantDevise(montant, deviseActuelle);

  const changerRoleActif = (role: RoleUtilisateur) => { setRoleActif(role); setOngletActif('tableau_de_bord'); };
  const changerOngletActif = (onglet: string) => setOngletActif(onglet);
  const definirTermeRecherche = (terme: string) => setTermeRecherche(terme);

  const ajouterEleve = (donnees: Omit<Eleve, 'identifiant' | 'matricule'>) => {
    const matricule = `STU-2026-${String(listeEleves.length + 1).padStart(3, '0')}`;
    setListeEleves((p) => [{ ...donnees, identifiant: `el-${Date.now()}`, matricule }, ...p]);
  };
  const supprimerEleve = (identifiant: string) => setListeEleves((p) => p.filter((e) => e.identifiant !== identifiant));
  const ajouterNote = (donnees: Omit<NoteEleve, 'identifiant'>) => setListeNotes((p) => [{ ...donnees, identifiant: `note-${Date.now()}` }, ...p]);
  const enregistrerPresence = (donnees: Omit<PresenceEleve, 'identifiant'>) => setListePresences((p) => [{ ...donnees, identifiant: `pres-${Date.now()}` }, ...p]);
  const ajouterFacture = (donnees: Omit<FactureComptabilite, 'identifiant' | 'numeroFacture'>) => {
    const numeroFacture = `INV-2026-${1000 + listeFactures.length + 1}`;
    setListeFactures((p) => [{ ...donnees, identifiant: `fac-${Date.now()}`, numeroFacture }, ...p]);
  };
  const enregistrerPaiement = (idFacture: string, montant: number) => {
    setListeFactures((p) =>
      p.map((f) => {
        if (f.identifiant === idFacture) {
          const nouveauPaye = Math.min(f.montantTotal, f.montantPaye + montant);
          return { ...f, montantPaye: nouveauPaye, statut: nouveauPaye >= f.montantTotal ? 'paye' : 'partiel' };
        }
        return f;
      })
    );
  };
  const ajouterTransaction = (donnees: Omit<TransactionFinanciere, 'identifiant' | 'reference'>) => {
    const reference = `TXN-${Math.floor(1000 + Math.random() * 9000)}`;
    setListeTransactions((p) => [{ ...donnees, identifiant: `tr-${Date.now()}`, reference }, ...p]);
  };
  const ajouterEmploye = (donnees: Omit<EmployeRH, 'identifiant' | 'matricule'>) => {
    const matricule = `EMP-${String(listeEmployes.length + 1).padStart(3, '0')}`;
    setListeEmployes((p) => [{ ...donnees, identifiant: `emp-${Date.now()}`, matricule }, ...p]);
  };
  const supprimerEmploye = (identifiant: string) => setListeEmployes((p) => p.filter((e) => e.identifiant !== identifiant));
  const soumettreDemandeConge = (donnees: Omit<DemandeConge, 'identifiant' | 'statut'>) => setListeDemandesConges((p) => [{ ...donnees, identifiant: `cg-${Date.now()}`, statut: 'en_attente' }, ...p]);
  const traiterDemandeConge = (id: string, statut: 'approuve' | 'refuse') => setListeDemandesConges((p) => p.map((d) => (d.identifiant === id ? { ...d, statut } : d)));
  const ajouterLivre = (donnees: Omit<LivreBibliotheque, 'identifiant'>) => setListeLivres((p) => [{ ...donnees, identifiant: `liv-${Date.now()}` }, ...p]);

  const enregistrerEmpruntLivre = (idLivre: string, nom: string, type: 'eleve' | 'professeur') => {
    const livre = listeLivres.find((l) => l.identifiant === idLivre);
    if (!livre || livre.exemplairesDisponibles <= 0) return;
    const nouvelEmprunt: EmpruntLivre = {
      identifiant: `emp-liv-${Date.now()}`,
      identifiantLivre: idLivre,
      titreLivre: livre.titre,
      emprunteurNom: nom,
      emprunteurType: type,
      dateEmprunt: new Date().toISOString().split('T')[0],
      dateRetourPrevue: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      statut: 'en_cours',
    };
    setListeEmprunts((p) => [nouvelEmprunt, ...p]);
    setListeLivres((p) => p.map((l) => (l.identifiant === idLivre ? { ...l, exemplairesDisponibles: l.exemplairesDisponibles - 1 } : l)));
  };

  const retournerLivreEmprunte = (idEmprunt: string) => {
    const emprunt = listeEmprunts.find((e) => e.identifiant === idEmprunt);
    if (!emprunt || emprunt.statut === 'rendu') return;
    setListeEmprunts((p) => p.map((e) => (e.identifiant === idEmprunt ? { ...e, statut: 'rendu', dateRetourEffective: new Date().toISOString().split('T')[0] } : e)));
    setListeLivres((p) => p.map((l) => (l.identifiant === emprunt.identifiantLivre ? { ...l, exemplairesDisponibles: l.exemplairesDisponibles + 1 } : l)));
  };

  const publierAnnonce = (donnees: Omit<AnnonceCommunication, 'identifiant' | 'datePublication'>) => setListeAnnonces((p) => [{ ...donnees, identifiant: `ann-${Date.now()}`, datePublication: new Date().toISOString().split('T')[0] }, ...p]);
  const ajouterIncident = (donnees: Omit<IncidentDisciplinaire, 'identifiant'>) => setListeIncidents((p) => [{ ...donnees, identifiant: `inc-${Date.now()}` }, ...p]);
  const ajouterDevoir = (donnees: Omit<DevoirMaison, 'identifiant'>) => setListeDevoirs((p) => [{ ...donnees, identifiant: `dev-${Date.now()}` }, ...p]);
  const ajouterRessource = (donnees: Omit<RessourcePedagogique, 'identifiant' | 'dateAjout'>) => setListeRessources((p) => [{ ...donnees, identifiant: `res-${Date.now()}`, dateAjout: new Date().toISOString().split('T')[0] }, ...p]);
  const soumettreDemandeDoc = (donnees: Omit<DemandeDocument, 'identifiant' | 'dateDemande' | 'statut'>) => setListeDemandesDocs((p) => [{ ...donnees, identifiant: `doc-${Date.now()}`, dateDemande: new Date().toISOString().split('T')[0], statut: 'en_attente' }, ...p]);
  const traiterDemandeDoc = (id: string, statut: 'pret' | 'delivre') => setListeDemandesDocs((p) => p.map((d) => (d.identifiant === id ? { ...d, statut } : d)));
  const reserverRendezVous = (donnees: Omit<RendezVousParent, 'identifiant' | 'statut'>) => setListeRendezVous((p) => [{ ...donnees, identifiant: `rdv-${Date.now()}`, statut: 'confirme' }, ...p]);

  return (
    <ContexteAcademie.Provider
      value={{
        langueActuelle,
        changerLangue,
        traduire,
        deviseActuelle,
        changerDevise,
        formaterMontant,
        symboleDevise,
        definitionDeviseActuelle,
        roleActif,
        changerRoleActif,
        ongletActif,
        changerOngletActif,
        termeRecherche,
        definirTermeRecherche,
        listeEleves,
        ajouterEleve,
        supprimerEleve,
        listeProfesseurs,
        listeNotes,
        ajouterNote,
        listePresences,
        enregistrerPresence,
        listeFactures,
        ajouterFacture,
        enregistrerPaiement,
        listeTransactions,
        ajouterTransaction,
        listeEmployes,
        ajouterEmploye,
        supprimerEmploye,
        listeDemandesConges,
        soumettreDemandeConge,
        traiterDemandeConge,
        listeLivres,
        ajouterLivre,
        listeEmprunts,
        enregistrerEmpruntLivre,
        retournerLivreEmprunte,
        listeAnnonces,
        publierAnnonce,
        listeCoursHoraires,
        listeIncidents,
        ajouterIncident,
        listeDevoirs,
        ajouterDevoir,
        listeRessources,
        ajouterRessource,
        listeDemandesDocs,
        soumettreDemandeDoc,
        traiterDemandeDoc,
        listeRendezVous,
        reserverRendezVous,
        listeSecurite,
        listeBudgets,
      }}
    >
      {children}
    </ContexteAcademie.Provider>
  );
};

export const utiliserAcademie = () => {
  const ctx = useContext(ContexteAcademie);
  if (!ctx) throw new Error('utiliserAcademie doit etre utilise au sein de FournisseurAcademie');
  return ctx;
};
