import React, { useState } from 'react';
import {
  UploadCloud,
  FileText,
  MessageSquare,
  Send,
  Download,
  Plus,
  Paperclip,
} from '../../../composants/communs/IconesAcademie';
import { BoutonRouge } from '../../../composants/communs/BoutonRouge';
import { utiliserAcademie } from '../../../controleurs/contexteAcademie';

export const OngletProfRessourcesComm: React.FC = () => {
  const { listeRessources, ajouterRessource, listeAnnonces } = utiliserAcademie();

  const [formulaireFichier, setFormulaireFichier] = useState(false);
  const [titreFichier, setTitreFichier] = useState('');
  const [typeFichier, setTypeFichier] = useState<'PDF' | 'DOCX' | 'PPTX' | 'ZIP'>('PDF');

  const [messageParent, setMessageParent] = useState('');
  const [parentCible, setParentCible] = useState('Eleanor Vance (Marcus Vance)');
  const [messageEnvoye, setMessageEnvoye] = useState(false);

  const soumettreRessource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titreFichier) return;
    ajouterRessource({
      titre: titreFichier,
      matiere: 'Advanced Mathematics',
      classe: 'Grade 11-A',
      typeFichier,
      taille: '3.1 MB',
      professeurNom: 'Prof. Evelyn Reed',
    });
    setTitreFichier('');
    setFormulaireFichier(false);
  };

  const envoyerMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageParent) return;
    setMessageEnvoye(true);
    setMessageParent('');
    setTimeout(() => setMessageEnvoye(false), 4000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Pedagogical Resources & Parent Communication</h3>
          <p className="text-xs text-slate-500">Upload course materials, lecture notes, and send direct parent communications.</p>
        </div>
        <BoutonRouge
          texte="Upload Course Material"
          icone={UploadCloud}
          onClick={() => setFormulaireFichier(!formulaireFichier)}
        />
      </div>

      {formulaireFichier && (
        <form onSubmit={soumettreRessource} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <h4 className="text-sm font-bold text-slate-900">Upload Learning Resource</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block">Resource Title</label>
              <input
                type="text"
                value={titreFichier}
                onChange={(e) => setTitreFichier(e.target.value)}
                placeholder="e.g. Chapter 6: Integration Lecture Slides"
                className="w-full mt-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block">File Type</label>
              <select
                value={typeFichier}
                onChange={(e) => setTypeFichier(e.target.value as any)}
                className="w-full mt-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              >
                <option value="PDF">PDF Document</option>
                <option value="PPTX">PowerPoint Slides (PPTX)</option>
                <option value="DOCX">Word Notes (DOCX)</option>
                <option value="ZIP">Archive (ZIP)</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <BoutonRouge texte="Cancel" variante="secondaire" taille="petit" onClick={() => setFormulaireFichier(false)} />
            <BoutonRouge texte="Upload Document" taille="petit" type="submit" />
          </div>
        </form>
      )}

      {/* Course Files Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {listeRessources.map((res) => (
          <div key={res.identifiant} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">{res.titre}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                  {res.typeFichier}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2">{res.matiere} &bull; {res.classe}</p>
            </div>
            <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[10px]">{res.taille}</span>
              <button
                type="button"
                onClick={() => alert(`Downloading ${res.titre}`)}
                className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Parent Direct Messaging */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <h4 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-1.5">
          <MessageSquare className="w-4 h-4 text-red-600" /> Direct Guardian Communication
        </h4>
        <form onSubmit={envoyerMessage} className="mt-3 space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-700 block">Recipient Parent</label>
            <select
              value={parentCible}
              onChange={(e) => setParentCible(e.target.value)}
              className="w-full mt-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
            >
              <option value="Eleanor Vance (Marcus Vance)">Eleanor Vance (Parent of Marcus Vance - Grade 11-A)</option>
              <option value="All Parents - Grade 11-A">Mass Message: All Parents (Grade 11-A)</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 block">Message Content</label>
            <textarea
              value={messageParent}
              onChange={(e) => setMessageParent(e.target.value)}
              placeholder="Type message regarding academic progress, homework, or upcoming exam..."
              className="w-full mt-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              rows={3}
              required
            />
          </div>
          <div className="flex items-center justify-between pt-1">
            {messageEnvoye ? (
              <span className="text-xs font-bold text-emerald-700">Message sent successfully via SMS & Portal!</span>
            ) : <span />}
            <BoutonRouge texte="Send Message" icone={Send} taille="petit" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};
