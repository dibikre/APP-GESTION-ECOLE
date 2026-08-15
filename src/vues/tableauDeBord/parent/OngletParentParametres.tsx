import React, { useState } from 'react';
import {
  Bell,
  Phone,
  Mail,
  Shield,
  Save,
  CheckCircle,
} from 'lucide-react';
import { BoutonRouge } from '../../../composants/communs/BoutonRouge';

export const OngletParentParametres: React.FC = () => {
  const [smsAbsence, setSmsAbsence] = useState(true);
  const [emailNotes, setEmailNotes] = useState(true);
  const [smsFrais, setSmsFrais] = useState(true);
  const [contactUrgenceNom, setContactUrgenceNom] = useState('David Vance');
  const [contactUrgenceTel, setContactUrgenceTel] = useState('+1 (555) 014-7799');
  const [sauvegarde, setSauvegarde] = useState(false);

  const enregistrerPreferences = (e: React.FormEvent) => {
    e.preventDefault();
    setSauvegarde(true);
    setTimeout(() => setSauvegarde(false), 4000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900">Guardian Notification Channels & Emergency Contacts</h3>
        <p className="text-xs text-slate-500">Configure instant SMS alerts for child absences, grade releases, and medical contacts.</p>
      </div>

      <form onSubmit={enregistrerPreferences} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4 max-w-xl">
        <h4 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-1.5">
          <Bell className="w-4 h-4 text-red-600" /> Instant Notification Preferences
        </h4>

        <div className="space-y-3 text-xs">
          <label className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-100 cursor-pointer">
            <div>
              <span className="font-bold text-slate-900 block">Immediate Absence & Tardiness SMS Alert</span>
              <span className="text-[11px] text-slate-500">Receive instant SMS if child is unrecorded during morning roll-call.</span>
            </div>
            <input
              type="checkbox"
              checked={smsAbsence}
              onChange={(e) => setSmsAbsence(e.target.checked)}
              className="w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500"
            />
          </label>

          <label className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-100 cursor-pointer">
            <div>
              <span className="font-bold text-slate-900 block">Assessment Marks Email Digest</span>
              <span className="text-[11px] text-slate-500">Weekly email recap of all newly graded homework and quiz scores.</span>
            </div>
            <input
              type="checkbox"
              checked={emailNotes}
              onChange={(e) => setEmailNotes(e.target.checked)}
              className="w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500"
            />
          </label>

          <label className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-100 cursor-pointer">
            <div>
              <span className="font-bold text-slate-900 block">Tuition Due Date Reminders</span>
              <span className="text-[11px] text-slate-500">SMS notification 7 days prior to term payment deadline.</span>
            </div>
            <input
              type="checkbox"
              checked={smsFrais}
              onChange={(e) => setSmsFrais(e.target.checked)}
              className="w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500"
            />
          </label>
        </div>

        <h4 className="text-sm font-bold text-slate-900 pt-3 pb-2 border-b border-slate-100 flex items-center gap-1.5">
          <Phone className="w-4 h-4 text-red-600" /> Secondary Emergency Medical Contact
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block">Contact Name</label>
            <input
              type="text"
              value={contactUrgenceNom}
              onChange={(e) => setContactUrgenceNom(e.target.value)}
              className="w-full mt-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="font-semibold text-slate-700 block">Phone Number</label>
            <input
              type="text"
              value={contactUrgenceTel}
              onChange={(e) => setContactUrgenceTel(e.target.value)}
              className="w-full mt-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          {sauvegarde && (
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> Preferences saved!
            </span>
          )}
          <BoutonRouge texte="Save Preferences" icone={Save} taille="petit" type="submit" />
        </div>
      </form>
    </div>
  );
};
