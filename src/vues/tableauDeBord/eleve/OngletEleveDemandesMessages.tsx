import React, { useState } from 'react';
import {
  FileCheck,
  MessageSquare,
  Plus,
  Send,
} from 'lucide-react';
import { BoutonRouge } from '../../../composants/communs/BoutonRouge';
import { utiliserAcademie } from '../../../controleurs/contexteAcademie';

export const OngletEleveDemandesMessages: React.FC = () => {
  const { listeDemandesDocs, soumettreDemandeDoc } = utiliserAcademie();

  const [formulaireDoc, setFormulaireDoc] = useState(false);
  const [typeDoc, setTypeDoc] = useState<'certificat_scolarite' | 'releve_notes' | 'certificat_transfert'>('certificat_scolarite');

  const [messageProf, setMessageProf] = useState('');
  const [profDestinataire, setProfDestinataire] = useState('Prof. Sophie Martin (Mathématiques)');
  const [messageEnvoye, setMessageEnvoye] = useState(false);

  const soumettreDoc = (e: React.FormEvent) => {
    e.preventDefault();
    soumettreDemandeDoc({
      typeDocument: typeDoc,
      demandeurNom: 'Marcus Vance',
      roleDemandeur: 'eleve',
      classe: '1ère S1',
    });
    setFormulaireDoc(false);
  };

  const envoyerMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageProf) return;
    setMessageEnvoye(true);
    setMessageProf('');
    setTimeout(() => setMessageEnvoye(false), 4000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Demandes de Certificats & Échanges avec les Enseignants</h3>
          <p className="text-xs text-slate-500">Demandez des attestations de scolarité, relevés officiels ou posez une question pédagogique.</p>
        </div>
        <BoutonRouge
          texte="Demander un document"
          icone={Plus}
          onClick={() => setFormulaireDoc(!formulaireDoc)}
        />
      </div>

      {formulaireDoc && (
        <form onSubmit={soumettreDoc} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <h4 className="text-sm font-bold text-slate-900">Demande de document administratif</h4>
          <div>
            <label className="text-xs font-semibold text-slate-700 block">Type de document souhaité</label>
            <select
              value={typeDoc}
              onChange={(e) => setTypeDoc(e.target.value as any)}
              className="w-full mt-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
            >
              <option value="certificat_scolarite">Certificat de Scolarité</option>
              <option value="releve_notes">Relevé de Notes Certifié</option>
              <option value="certificat_transfert">Certificat de Radiation / Transfert</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <BoutonRouge texte="Annuler" variante="secondaire" taille="petit" onClick={() => setFormulaireDoc(false)} />
            <BoutonRouge texte="Envoyer la demande" taille="petit" type="submit" />
          </div>
        </form>
      )}

      {/* Historique des demandes */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <h4 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-1.5">
          <FileCheck className="w-4 h-4 text-red-600" /> Historique des Demandes de Documents
        </h4>
        <div className="divide-y divide-slate-100 mt-2">
          {listeDemandesDocs.map((d) => (
            <div key={d.identifiant} className="py-2.5 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-900">{d.typeDocument.replace('_', ' ').toUpperCase()}</span>
                <span className="text-slate-500 text-[11px] block">Demandé le {d.dateDemande}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                  d.statut === 'pret' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-700'
                }`}>
                  {d.statut === 'pret' ? 'Prêt' : 'En traitement'}
                </span>
                {d.statut === 'pret' && (
                  <button
                    type="button"
                    onClick={() => alert(`Téléchargement de l'attestation vérifiée`)}
                    className="text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer"
                  >
                    Télécharger PDF
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message pédagogique direct */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <h4 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-1.5">
          <MessageSquare className="w-4 h-4 text-red-600" /> Poser une Question à un Professeur
        </h4>
        <form onSubmit={envoyerMessage} className="mt-3 space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-700 block">Enseignant destinataire</label>
            <select
              value={profDestinataire}
              onChange={(e) => setProfDestinataire(e.target.value)}
              className="w-full mt-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
            >
              <option value="Prof. Sophie Martin (Mathématiques)">Prof. Sophie Martin (Mathématiques Approfondies)</option>
              <option value="Dr. Thomas Bernard (Physique)">Dr. Thomas Bernard (Physique & Chimie)</option>
              <option value="Claire Dubois (Français)">Claire Dubois (Littérature & Philosophie)</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 block">Votre message</label>
            <textarea
              value={messageProf}
              onChange={(e) => setMessageProf(e.target.value)}
              placeholder="Précisez votre question sur un devoir, un exercice ou une notion de cours..."
              className="w-full mt-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              rows={3}
              required
            />
          </div>
          <div className="flex items-center justify-between pt-1">
            {messageEnvoye ? (
              <span className="text-xs font-bold text-emerald-700">Message transmis avec succès à l'enseignant !</span>
            ) : <span />}
            <BoutonRouge texte="Envoyer le message" icone={Send} taille="petit" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

