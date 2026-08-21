import React, { useState } from 'react';
import {
  Award,
  CalendarCheck,
  GraduationCap,
  MessageSquare,
} from 'lucide-react';
import { BoutonRouge } from '../composants/communs/BoutonRouge';
import { ModaleFormulaire } from '../composants/communs/ModaleFormulaire';
import { CarteStatistique } from '../composants/communs/CarteStatistique';
import { utiliserAcademie } from '../controleurs/contexteAcademie';
import { SectionResultatsParents } from './parents/SectionResultatsParents';
import { SectionFacturesParents } from './parents/SectionFacturesParents';

export const VueParents: React.FC = () => {
  const {
    listeEleves,
    listeNotes,
    listeFactures,
    enregistrerPaiement,
    traduire,
  } = utiliserAcademie();

  const [eleveSelectionneId, setEleveSelectionneId] = useState<string>(
    listeEleves[0]?.identifiant || ''
  );
  const [modalePaiementOuverte, setModalePaiementOuverte] = useState(false);
  const [factureAPayer, setFactureAPayer] = useState<string | null>(null);
  const [montantPaiement, setMontantPaiement] = useState<number>(500);
  const [modaleMessageOuverte, setModaleMessageOuverte] = useState(false);

  const eleveActif =
    listeEleves.find((e) => e.identifiant === eleveSelectionneId) || listeEleves[0];
  const notesEleve = listeNotes.filter((n) => n.identifiantEleve === eleveActif?.identifiant);
  const facturesEleve = listeFactures.filter((f) => f.identifiantEleve === eleveActif?.identifiant);

  const executerPaiement = (e: React.FormEvent) => {
    e.preventDefault();
    if (factureAPayer && montantPaiement > 0) {
      enregistrerPaiement(factureAPayer, montantPaiement);
      setModalePaiementOuverte(false);
    }
  };

  const initierPaiement = (idFacture: string, montant: number) => {
    setFactureAPayer(idFacture);
    setMontantPaiement(montant);
    setModalePaiementOuverte(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {traduire('titreParents')}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {traduire('descriptionParents')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-slate-600">{traduire('eleveSelectionne')}</label>
          <select
            value={eleveActif?.identifiant}
            onChange={(e) => setEleveSelectionneId(e.target.value)}
            className="px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 font-bold shadow-xs focus:outline-none focus:ring-1 focus:ring-red-500"
          >
            {listeEleves.map((e) => (
              <option key={e.identifiant} value={e.identifiant}>
                {e.nomComplet} ({e.classe})
              </option>
            ))}
          </select>
          <BoutonRouge
            texte={traduire('contacterProfesseur')}
            icone={MessageSquare}
            variante="secondaire"
            onClick={() => setModaleMessageOuverte(true)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CarteStatistique
          titre={traduire('moyenneGenerale')}
          valeur={`${eleveActif?.moyenneGenerale || 0}%`}
          sousTitre="Standing"
          icone={Award}
        />
        <CarteStatistique
          titre={traduire('presence')}
          valeur={`${eleveActif?.tauxPresence || 0}%`}
          sousTitre="Active record"
          icone={CalendarCheck}
        />
        <CarteStatistique
          titre={traduire('classe')}
          valeur={eleveActif?.classe || 'N/A'}
          sousTitre={`Matricule: ${eleveActif?.matricule || 'N/A'}`}
          icone={GraduationCap}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionResultatsParents notesEleve={notesEleve} />
        <SectionFacturesParents
          facturesEleve={facturesEleve}
          surInitierPaiement={initierPaiement}
        />
      </div>

      <ModaleFormulaire
        ouvert={modalePaiementOuverte}
        surFermeture={() => setModalePaiementOuverte(false)}
        titre={traduire('payerFrais')}
        sousTitre="Secure transaction"
        texteBoutonValidation={traduire('enregistrer')}
        surValidation={executerPaiement}
      >
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1">{traduire('montant')} ($)</label>
            <input
              type="number"
              min="1"
              value={montantPaiement}
              onChange={(e) => setMontantPaiement(Number(e.target.value))}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-bold focus:bg-white focus:outline-none"
              required
            />
          </div>
        </div>
      </ModaleFormulaire>

      <ModaleFormulaire
        ouvert={modaleMessageOuverte}
        surFermeture={() => setModaleMessageOuverte(false)}
        titre={traduire('contacterProfesseur')}
        sousTitre="Direct faculty inquiry"
        texteBoutonValidation={traduire('envoyer')}
        surValidation={(e) => {
          e.preventDefault();
          setModaleMessageOuverte(false);
        }}
      >
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1">Subject</label>
            <input
              type="text"
              placeholder="Question..."
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1">Message</label>
            <textarea
              rows={4}
              placeholder="Type message..."
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none"
              required
            />
          </div>
        </div>
      </ModaleFormulaire>
    </div>
  );
};
