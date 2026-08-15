import React, { useState } from 'react';
import {
  Megaphone,
  Mail,
  Smartphone,
  Send,
  Plus,
  CheckCircle,
} from '../../../composants/communs/IconesAcademie';
import { BoutonRouge } from '../../../composants/communs/BoutonRouge';
import { utiliserAcademie } from '../../../controleurs/contexteAcademie';

export const OngletSecretaireCommMasse: React.FC = () => {
  const { listeAnnonces, publierAnnonce } = utiliserAcademie();

  const [titre, setTitre] = useState('');
  const [contenu, setContenu] = useState('');
  const [cible, setCible] = useState<'tous' | 'professeurs' | 'eleves' | 'parents'>('tous');
  const [priorite, setPriorite] = useState<'normale' | 'importante' | 'urgente'>('normale');
  const [envoye, setEnvoye] = useState(false);

  const diffuserAnnonce = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titre || !contenu) return;
    publierAnnonce({
      titre,
      contenu,
      auteurNom: 'Admissions & Secretary Office',
      cible,
      priorite,
    });
    setTitre('');
    setContenu('');
    setEnvoye(true);
    setTimeout(() => setEnvoye(false), 4000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900">Broadcast Communication & Mass SMS Dispatch</h3>
        <p className="text-xs text-slate-500">Transmit circulars, weather closures, and emergency notifications to parents and staff.</p>
      </div>

      <form onSubmit={diffuserAnnonce} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4 max-w-2xl">
        <h4 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-1.5">
          <Megaphone className="w-4 h-4 text-red-600" /> Transmit School Bulletin
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block">Announcement Headline</label>
            <input
              type="text"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              placeholder="e.g. Term 2 Examination Timetable Released"
              className="w-full mt-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="font-semibold text-slate-700 block">Recipient Audience</label>
            <select
              value={cible}
              onChange={(e) => setCible(e.target.value as any)}
              className="w-full mt-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
            >
              <option value="tous">Entire School Community (All)</option>
              <option value="parents">Parents & Guardians Only</option>
              <option value="professeurs">Faculty & Teachers Only</option>
              <option value="eleves">Enrolled Students Only</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 block">Message Body (SMS & Email)</label>
          <textarea
            value={contenu}
            onChange={(e) => setContenu(e.target.value)}
            placeholder="Type official notification content..."
            className="w-full mt-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
            rows={3}
            required
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          {envoye ? (
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> Broadcast sent successfully!
            </span>
          ) : <span />}
          <BoutonRouge texte="Broadcast Notification" icone={Send} taille="petit" type="submit" />
        </div>
      </form>
    </div>
  );
};
