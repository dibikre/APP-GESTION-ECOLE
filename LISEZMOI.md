# Systeme de Gestion Academique (Academic Management System)

Systeme complet de gestion scolaire et academique pour etablissements primaires, secondaires et superieurs. L'application integre des tableaux de bord multi-roles, la gestion des dossiers scolaires, la facturation des frais de scolarite, les ressources humaines et salaires, la bibliotheque, le pointage des presences et la communication sur le campus.

---

## Remarque Importante concernant le Backend

> **Avertissement :** Le **Backend PHP n'est pas encore totalement implemente et operationnel**.
> 
> - L'application fonctionne actuellement avec une architecture **MVC** reactive cote client, des modeles TypeScript types (`src/modeles`), des controleurs d'etat (`src/controleurs`) et une persistance via le stockage local (`gestionnaireStockage.ts`).
> - Le backend d'API REST PHP autonome est en cours de developpement (gestion des bases de donnees relationnelles securisees, telechargement et stockage serveur des fichiers et documents, gestion multi-utilisateurs).

---

## Modules et Tableaux de Bord par Role

1. **Directeur / Administration (`/tableau-de-bord/directeur`)** : Vue globale, gestion du personnel, validation academique, suivi budgetaire, discipline et sauvegardes.
2. **Professeurs et Faculte (`/tableau-de-bord/professeur`)** : Gestion des classes, saisie des notes, appel des presences, devoirs et ressources de cours.
3. **Espace Eleves (`/tableau-de-bord/eleve`)** : Releves de notes, emploi du temps hebdomadaire, remise de devoirs et demandes d'attestations.
4. **Espace Parents (`/tableau-de-bord/parent`)** : Suivi de la scolarite des enfants, paiement des frais de scolarite, prise de rendez-vous avec les enseignants.
5. **Secretariat et Admissions (`/tableau-de-bord/secretaire`)** : Inscription des nouveaux eleves, gestion des emplois du temps, cartes scolaires et diffusion de messages.
6. **Comptabilite et Economat (`/tableau-de-bord/comptable`)** : Emission de factures, encaissement, balance des impayes et grand livre financier.
7. **Ressources Humaines (`/tableau-de-bord/ressources-humaines`)** : Fiches de paie, contrats et validation des demandes de conges.
8. **Bibliotheque (`/tableau-de-bord/bibliothecaire`)** : Catalogue des ouvrages, gestion des emprunts et retards.
9. **Communication et Relations Publiques (`/tableau-de-bord/communication`)** : Publication de circulaires officielles et alertes d'urgence.

---

## Demarrage Rapide

### Prerequis
- **Node.js** : Version 18 ou superieure
- **npm** : Version 9 ou superieure

### Instructions d'installation et d'execution

1. **Installer les dependances :**
   ```bash
   npm install
   ```

2. **Demarrer le serveur de developpement :**
   ```bash
   npm run dev
   ```
   L'application sera accessible sur `http://localhost:3000`.

3. **Verifier le typage et le code :**
   ```bash
   npm run lint
   ```

4. **Compiler pour la production :**
   ```bash
   npm run build
   ```
