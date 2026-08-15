import React, { useState } from 'react';
import { CalendarCheck, Plus } from '../composants/communs/IconesAcademie';
import { BoutonRouge } from '../composants/communs/BoutonRouge';
import { utiliserAcademie } from '../controleurs/contexteAcademie';
import { TableauNotes } from './professeurs/TableauNotes';
import { ModaleSaisieNote } from './professeurs/ModaleSaisieNote';
import { ModaleSaisiePresence } from './professeurs/ModaleSaisiePresence';

export const VueProfesseurs: React.FC = () => {
  const { listeEleves, listeNotes, traduire } = utiliserAcademie();

  const [modaleNoteOuverte, setModaleNoteOuverte] = useState(false);
  const [modalePresenceOuverte, setModalePresenceOuverte] = useState(false);
  const [classeSelectionnee, setClasseSelectionnee] = useState('All');

  const notesFiltrees = listeNotes.filter(
    (n) => classeSelectionnee === 'All' || n.classe === classeSelectionnee
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {traduire('titreProfesseurs')}
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <BoutonRouge
            texte={traduire('faireAppel')}
            icone={CalendarCheck}
            variante="secondaire"
            onClick={() => setModalePresenceOuverte(true)}
          />
          <BoutonRouge
            texte={traduire('saisirNote')}
            icone={Plus}
            onClick={() => setModaleNoteOuverte(true)}
          />
        </div>
      </div>

      <TableauNotes
        notes={notesFiltrees}
        classeSelectionnee={classeSelectionnee}
        surChangementClasse={setClasseSelectionnee}
      />

      <ModaleSaisieNote
        ouvert={modaleNoteOuverte}
        surFermeture={() => setModaleNoteOuverte(false)}
        listeEleves={listeEleves}
      />

      <ModaleSaisiePresence
        ouvert={modalePresenceOuverte}
        surFermeture={() => setModalePresenceOuverte(false)}
        listeEleves={listeEleves}
      />
    </div>
  );
};
