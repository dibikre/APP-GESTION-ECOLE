import React, { useState } from 'react';
import {
  FileCheck,
  MessageSquare,
  Plus,
  Send,
  Download,
  Paperclip,
  CheckCircle,
} from '../../../composants/communs/IconesAcademie';
import { BoutonRouge } from '../../../composants/communs/BoutonRouge';
import { utiliserAcademie } from '../../../controleurs/contexteAcademie';

export const OngletEleveDemandesMessages: React.FC = () => {
  const { listeDemandesDocs, soumettreDemandeDoc } = utiliserAcademie();

  const [formulaireDoc, setFormulaireDoc] = useState(false);
  const [typeDoc, setTypeDoc] = useState<'certificat_scolarite' | 'releve_notes' | 'certificat_transfert'>('certificat_scolarite');

  const [messageProf, setMessageProf] = useState('');
  const [profDestinataire, setProfDestinataire] = useState('Prof. Evelyn Reed (Mathematics)');
  const [messageEnvoye, setMessageEnvoye] = useState(false);

  const soumettreDoc = (e: React.FormEvent) => {
    e.preventDefault();
    soumettreDemandeDoc({
      typeDocument: typeDoc,
      demandeurNom: 'Marcus Vance',
      roleDemandeur: 'eleve',
      classe: 'Grade 11-A',
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
          <h3 className="text-lg font-bold text-slate-900">Official Certificate Requests & Teacher Inquiries</h3>
          <p className="text-xs text-slate-500">Request enrollment certificates, transcripts, or ask academic questions.</p>
        </div>
        <BoutonRouge
          texte="Request Official Document"
          icone={Plus}
          onClick={() => setFormulaireDoc(!formulaireDoc)}
        />
      </div>

      {formulaireDoc && (
        <form onSubmit={soumettreDoc} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <h4 className="text-sm font-bold text-slate-900">Request Administrative School Certificate</h4>
          <div>
            <label className="text-xs font-semibold text-slate-700 block">Select Document Type</label>
            <select
              value={typeDoc}
              onChange={(e) => setTypeDoc(e.target.value as any)}
              className="w-full mt-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
            >
              <option value="certificat_scolarite">Certificate of Enrollment (Certificat de Scolarité)</option>
              <option value="releve_notes">Certified Term Transcript (Relevé de Notes)</option>
              <option value="certificat_transfert">School Transfer & Clearance Certificate</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <BoutonRouge texte="Cancel" variante="secondaire" taille="petit" onClick={() => setFormulaireDoc(false)} />
            <BoutonRouge texte="Submit Request" taille="petit" type="submit" />
          </div>
        </form>
      )}

      {/* Requests History */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <h4 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-1.5">
          <FileCheck className="w-4 h-4 text-red-600" /> Submitted Document Requests
        </h4>
        <div className="divide-y divide-slate-100 mt-2">
          {listeDemandesDocs.map((d) => (
            <div key={d.identifiant} className="py-2.5 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-900">{d.typeDocument.replace('_', ' ').toUpperCase()}</span>
                <span className="text-slate-500 text-[11px] block">Requested on {d.dateDemande}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                  d.statut === 'pret' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-700'
                }`}>
                  {d.statut}
                </span>
                {d.statut === 'pret' && (
                  <button
                    type="button"
                    onClick={() => alert(`Downloading verified ${d.typeDocument}`)}
                    className="text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer"
                  >
                    Download PDF
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Direct Academic Message */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <h4 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-1.5">
          <MessageSquare className="w-4 h-4 text-red-600" /> Ask Teacher a Question
        </h4>
        <form onSubmit={envoyerMessage} className="mt-3 space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-700 block">Faculty Member</label>
            <select
              value={profDestinataire}
              onChange={(e) => setProfDestinataire(e.target.value)}
              className="w-full mt-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
            >
              <option value="Prof. Evelyn Reed (Mathematics)">Prof. Evelyn Reed (Advanced Mathematics)</option>
              <option value="Dr. Robert Chen (Physics)">Dr. Robert Chen (Physics & Astronomy)</option>
              <option value="Sarah Jenkins (English)">Sarah Jenkins (English Literature)</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 block">Inquiry / Question</label>
            <textarea
              value={messageProf}
              onChange={(e) => setMessageProf(e.target.value)}
              placeholder="Ask for clarification regarding homework, lab report, or syllabus..."
              className="w-full mt-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              rows={3}
              required
            />
          </div>
          <div className="flex items-center justify-between pt-1">
            {messageEnvoye ? (
              <span className="text-xs font-bold text-emerald-700">Inquiry sent to faculty member!</span>
            ) : <span />}
            <BoutonRouge texte="Send Message" icone={Send} taille="petit" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};
