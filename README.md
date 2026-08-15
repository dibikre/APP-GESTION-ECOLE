# Système de Gestion Académique

Un système complet et professionnel de gestion scolaire et académique conçu pour les établissements d'enseignement primaire, secondaire et supérieur. L'application intègre des tableaux de bord multi-rôles, la gestion des dossiers scolaires, la facturation des frais de scolarité, les ressources humaines et les fiches de paie, la circulation en bibliothèque, le suivi des présences et la communication sur le campus.

---

## Remarque Importante concernant le Backend

> **Avertissement :** Le **Backend PHP n'est pas encore totalement implémenté et opérationnel**. 
> 
> - L'application fonctionne actuellement avec une architecture **MVC** complète et réactive côté client, utilisant des modèles TypeScript typés (`src/modeles`), des contrôleurs d'état (`src/controleurs`) et une persistance via le stockage local (`gestionnaireStockage.ts`).
> - Le backend d'API REST PHP autonome est prévu pour les prochaines étapes d'intégration (qui gérera le stockage en base de données relationnelle sécurisée, le téléchargement et le stockage des fichiers côté serveur, ainsi que l'authentification multi-utilisateurs).

---

## Fonctionnalités Principales et Modules par Rôle

La plateforme propose 9 perspectives de rôles dédiées avec des autorisations adaptées, des tableaux de bord spécialisés et une sous-navigation par onglets :

1. **Directeur / Administration (`/tableau-de-bord/directeur`)** :
   - Indicateurs clés (KPI), annuaire du personnel, validation du programme académique, suivi du budget, registre disciplinaire et gestion des sauvegardes.
2. **Professeurs et Faculté (`/tableau-de-bord/professeur`)** :
   - Listes de classes, saisie des notes, appel des présences, devoirs et ressources pédagogiques.
3. **Espace Élèves (`/tableau-de-bord/eleve`)** :
   - Bulletins et relevés de notes, emploi du temps hebdomadaire, suivi des devoirs à rendre, demandes d'attestations et historique des accès.
4. **Espace Parents (`/tableau-de-bord/parent`)** :
   - Suivi de la scolarité des enfants, bordereaux de paiement des frais, prise de rendez-vous avec les enseignants et contacts d'urgence.
5. **Secrétariat et Admissions (`/tableau-de-bord/secretaire`)** :
   - Processus d'inscription des élèves, planification des salles et des cours, annuaire du personnel, cartes scolaires imprimables et diffusion SMS/e-mail de masse.
6. **Comptabilité et Économat (`/tableau-de-bord/comptable`)** :
   - Facturation des frais de scolarité, vérification des encaissements, audit du grand livre financier et suivi des impayés.
7. **Ressources Humaines et Paie (`/tableau-de-bord/ressources-humaines`)** :
   - Gestion des contrats d'employés, livre de paie mensuel et validation des demandes de congés.
8. **Bibliothèque et Médiathèque (`/tableau-de-bord/bibliothecaire`)** :
   - Gestion du catalogue, suivi des emprunts et relances des retards.
9. **Communication du Campus (`/tableau-de-bord/communication`)** :
   - Circulaires officielles, alertes d'urgence et diffusions ciblées par groupes.

---

## Architecture et Technologies

- **Framework Frontend :** React 19 + TypeScript
- **Moteur de Routage :** React Router DOM (Navigation avec sous-onglets)
- **Système de Design et Styles :** Tailwind CSS (Thème clair, boutons rouges d'action, texte sombre lisible, conception réactive mobile-first)
- **Icônes Graphiques :** Lucide React (composants d'icônes vectorielles purs, aucun émoji)
- **Modèle d'Architecture :** MVC (Modèle - Vue - Contrôleur)
  - `src/modeles/` : Types de données, entités du domaine et jeux de données initiaux.
  - `src/vues/` : Vues de pages et composants d'onglets modulaires.
  - `src/controleurs/` : Contexte d'application, logique métier, gestionnaires de stockage et dictionnaire de traductions.
  - `src/composants/` : Composants d'interface réutilisables (boutons rouges, cartes statistiques, modales, en-têtes, barres latérales).
  - `src/routes/` : Définition des routes et redirections basées sur les rôles.

---

## Démarrage Rapide

### Prérequis
- **Node.js** : Version 18 ou supérieure
- **npm** : Version 9 ou supérieure

### Étapes d'Installation

1. **Naviguer dans le dossier du projet :**
   ```bash
   cd academic-management-system
   ```

2. **Installer toutes les dépendances :**
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement :**
   ```bash
   npm run dev
   ```
   L'application sera accessible sur : `http://localhost:3000`

4. **Vérifier la compilation TypeScript et le code :**
   ```bash
   npm run lint
   ```

5. **Compiler pour la production :**
   ```bash
   npm run build
   ```

---

## Structure du Projet

```
src/
├── modeles/               # Interfaces TypeScript et entités métier
│   ├── types.ts           # Définitions centrales des types
│   └── donneesInitiales.ts # Jeu de données de démonstration
├── controleurs/           # Contrôleurs d'état et logique métier
│   ├── contexteAcademie.tsx # Hook et export du contexte
│   └── contexte/          # Gestionnaires de stockage et fournisseur
├── vues/                  # Vues et tableaux de bord (Couche Vue MVC)
│   ├── tableauDeBord/     # Tableaux de bord spécialisés par rôle
│   ├── eleves/            # Module de gestion des élèves
│   ├── professeurs/       # Module de gestion des enseignants
│   ├── comptabilite/      # Module financier et facturation
│   └── ...
├── composants/            # Composants UI réutilisables
│   └── communs/           # Boutons rouges, cartes métriques, en-têtes, etc.
└── routes/                # Routage de l'application
```

