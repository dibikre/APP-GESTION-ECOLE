import React from 'react';
import { useParams } from 'react-router-dom';
import { OngletEleveVueGlobale } from './eleve/OngletEleveVueGlobale';
import { OngletEleveEmploiDuTemps } from './eleve/OngletEleveEmploiDuTemps';
import { OngletEleveNotesAnalytique } from './eleve/OngletEleveNotesAnalytique';
import { OngletEleveDevoirsExamens } from './eleve/OngletEleveDevoirsExamens';
import { OngletEleveSupportsBibliotheque } from './eleve/OngletEleveSupportsBibliotheque';
import { OngletEleveMessagerieCommunication } from './eleve/OngletEleveMessagerieCommunication';
import { OngletEleveVieScolaireServices } from './eleve/OngletEleveVieScolaireServices';
import { OngletEleveProfilDemandes } from './eleve/OngletEleveProfilDemandes';

export const TableauDeBordEleve: React.FC = () => {
  const parametresUrl = useParams<{ sousOnglet?: string }>();
  const cleSousOnglet = parametresUrl.sousOnglet || 'vue_globale';

  return (
    <div className="space-y-6">
      {/* 1. Vue d'ensemble & KPIs */}
      {(cleSousOnglet === 'vue_globale' || !cleSousOnglet) && <OngletEleveVueGlobale />}

      {/* 2. Emploi du temps & Calendrier officiel */}
      {(cleSousOnglet === 'cours' || cleSousOnglet === 'emploi-du-temps') && <OngletEleveEmploiDuTemps />}

      {/* 3. Relevé de Notes, Examens & Copies scannées */}
      {(cleSousOnglet === 'notes' || cleSousOnglet === 'dossier') && <OngletEleveNotesAnalytique />}

      {/* 4. Devoirs, Soumissions numériques & Planning d'épreuves */}
      {(cleSousOnglet === 'devoirs' || cleSousOnglet === 'examens') && <OngletEleveDevoirsExamens />}

      {/* 5. Supports de cours & Bibliothèque numérique E-Books */}
      {(cleSousOnglet === 'ressources' || cleSousOnglet === 'supports' || cleSousOnglet === 'bibliotheque') && (
        <OngletEleveSupportsBibliotheque />
      )}

      {/* 6. Messagerie enseignants, Notifications Administration & Forum classe */}
      {(cleSousOnglet === 'communication' || cleSousOnglet === 'messages' || cleSousOnglet === 'chat' || cleSousOnglet === 'forum') && (
        <OngletEleveMessagerieCommunication />
      )}

      {/* 7. Vie scolaire, Frais, Cantine badge & Justificatifs d'absences */}
      {(cleSousOnglet === 'vie-scolaire' || cleSousOnglet === 'services' || cleSousOnglet === 'cantine' || cleSousOnglet === 'finances' || cleSousOnglet === 'absences') && (
        <OngletEleveVieScolaireServices />
      )}

      {/* 8. Profil complet éditable & Guichet d'actes administratifs */}
      {(cleSousOnglet === 'profil' || cleSousOnglet === 'demandes' || cleSousOnglet === 'securite') && (
        <OngletEleveProfilDemandes />
      )}
    </div>
  );
};
