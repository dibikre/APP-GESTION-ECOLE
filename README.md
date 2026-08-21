# Academic Management System (Systeme de Gestion Academique)

A comprehensive, enterprise-grade School and Academic Management System designed for educational institutions. The application features multi-role dashboards, student records, fee and tuition billing, human resources and payroll tracking, library circulation, attendance tracking, and campus communications.

---

## Important Note regarding Backend Status / Statut du Backend

> **Notice:** The **PHP Backend is currently NOT yet fully implemented and operational**. 
> 
> - The application currently operates with a complete, reactive **MVC architecture** on the client side, using typed TypeScript models (`src/modeles`), state controllers (`src/controleurs`), and local storage persistence (`gestionnaireStockage.ts`).
> - The standalone PHP REST API backend is slated for upcoming integration milestones (which will handle secure database storage, server-side asset downloads, and multi-tenant authentication).

---

## Key Features and Role-Based Modules

The platform implements 9 dedicated role perspectives with tailored permissions, specialized dashboards, and deep-link sub-navigation:

1. **Executive Director / Administrator (`/tableau-de-bord/directeur`)**:
   - Executive KPIs, personnel roster, academic curriculum approvals, budget balance sheets, disciplinary tracking, and system backup management.
2. **Faculty and Teachers (`/tableau-de-bord/professeur`)**:
   - Class rosters, student mark sheets, attendance roll-calls, homework assignments, and teaching resources.
3. **Student Portal (`/tableau-de-bord/eleve`)**:
   - Academic transcripts, weekly timetable, homework submission status, official certificate requests, and access logs.
4. **Parent and Guardian Portal (`/tableau-de-bord/parent`)**:
   - Multi-child progress monitoring, tuition payment slips, teacher conference bookings, and emergency contacts.
5. **Admissions and Secretary Desk (`/tableau-de-bord/secretaire`)**:
   - Student enrolment workflows, room and class scheduling, staff directory, printable ID cards, and mass SMS broadcast.
6. **Bursar and Accounting (`/tableau-de-bord/comptable`)**:
   - Tuition invoicing, receipt verification, ledger audit, and fee recovery.
7. **Human Resources and Payroll (`/tableau-de-bord/ressources-humaines`)**:
   - Employee contracts, monthly payroll ledger, and leave request approvals.
8. **Library and Media Center (`/tableau-de-bord/bibliothecaire`)**:
   - Catalog management, checkout circulation tracking, and overdue return reminders.
9. **Campus Communications (`/tableau-de-bord/communication`)**:
   - Official circulars, urgent campus alerts, and targeted group dispatches.

---

## Architecture and Technologies

- **Frontend Framework:** React 19 + TypeScript
- **Routing Engine:** React Router DOM (Deep-link routing with nested sub-tabs)
- **Styling and Design System:** Tailwind CSS (Light theme, red action accents, dark text, fully responsive mobile-first layout)
- **Design Icons:** Lucide React (vector icon components only, no emoji or keyboard symbols)
- **Architecture Pattern:** MVC (Model - View - Controller)
  - `src/modeles/`: Data types, entity models, and default datasets.
  - `src/vues/`: Page views and modular tab components.
  - `src/controleurs/`: Application context, business logic, storage engines, and translation dictionary.
  - `src/composants/`: Reusable atomic UI components (buttons, stat cards, dialogs, headers, sidebars).
  - `src/routes/`: Route definitions and role-based redirect handlers.

---

## Getting Started / Comment Demarrer le Projet

### Prerequisites
- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher

### Installation Steps

1. **Clone or navigate to the repository directory:**
   ```bash
   cd academic-management-system
   ```

2. **Install all dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be accessible at:
   ```
   http://localhost:3000
   ```

4. **Verify TypeScript compilation and linting:**
   ```bash
   npm run lint
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## Project Structure

```
src/
├── modeles/               # TypeScript interfaces and domain entities
│   ├── types.ts           # Central type definitions
│   └── donneesInitiales.ts # Default structured demo dataset
├── controleurs/           # State controllers and business logic
│   ├── contexteAcademie.tsx # Context hook and export
│   └── contexte/          # Storage managers, dictionary, and provider
├── vues/                  # Views and Dashboards (MVC View layer)
│   ├── tableauDeBord/     # Role-specific dashboard views and sub-tabs
│   ├── eleves/            # Student management module
│   ├── professeurs/       # Faculty management module
│   ├── comptabilite/      # Accounting and fees module
│   └── ...
├── composants/            # Reusable UI components
│   └── communs/           # Red buttons, metric cards, navigation headers, etc.
└── routes/                # Application routes and deep links
```
