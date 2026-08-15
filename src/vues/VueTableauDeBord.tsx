import React from 'react';
import { utiliserAcademie } from '../controleurs/contexteAcademie';
import { TableauDeBordAdministrateur } from './tableauDeBord/TableauDeBordAdministrateur';
import { TableauDeBordProfesseur } from './tableauDeBord/TableauDeBordProfesseur';
import { TableauDeBordEleve } from './tableauDeBord/TableauDeBordEleve';
import { TableauDeBordParent } from './tableauDeBord/TableauDeBordParent';
import { TableauDeBordSecretaire } from './tableauDeBord/TableauDeBordSecretaire';
import { TableauDeBordComptable } from './tableauDeBord/TableauDeBordComptable';
import { TableauDeBordRH } from './tableauDeBord/TableauDeBordRH';
import { TableauDeBordBibliothecaire } from './tableauDeBord/TableauDeBordBibliothecaire';
import { TableauDeBordCommunication } from './tableauDeBord/TableauDeBordCommunication';

export const VueTableauDeBord: React.FC = () => {
  const { roleActif } = utiliserAcademie();

  switch (roleActif) {
    case 'professeur':
      return <TableauDeBordProfesseur />;
    case 'eleve':
      return <TableauDeBordEleve />;
    case 'parent':
      return <TableauDeBordParent />;
    case 'secretaire':
      return <TableauDeBordSecretaire />;
    case 'comptable':
      return <TableauDeBordComptable />;
    case 'ressources_humaines':
      return <TableauDeBordRH />;
    case 'bibliothecaire':
      return <TableauDeBordBibliothecaire />;
    case 'charge_communication':
      return <TableauDeBordCommunication />;
    case 'administrateur':
    default:
      return <TableauDeBordAdministrateur />;
  }
};
