import React, { useState } from 'react';
import {
  MessageSquare,
  Calendar,
  Send,
  UserCheck,
  CheckCircle,
  Plus,
} from '../../../composants/communs/IconesAcademie';
import { BoutonRouge } from '../../../composants/communs/BoutonRouge';
import { utiliserAcademie } from '../../../controleurs/contexteAcademie';

export const OngletParentCommunication: React.FC = () => {
  const { listeRendezVous, reserverRendezVous, listeAnnonces } = utiliserAcademie();

  const [modalRdv, setModalRdv] = useState(false);
  const [profRdv, setProfRdv] = useState('Prof. Evelyn Reed (Mathematics)');
  const [dateRdv, setDateRdv] = useState('2026-03-18');
  const [heureRdv, setHeureRdv] = useState('16:00');
  const [motifRdv, setMotifRdv] = useState('');

  const [message, setMessage] = useState('');
  const [messageEnvoye, setMessageEnvoye] = useState(false);

  const soumettreRdv = (e: React.FormEvent) => {
    e.preventDefault();
    if (!motifRdv) return;
    reserverRendezVous({
      nomParent: 'Eleanor Vance',
      nomProfesseur: profRdv,
      eleveConcerne: 'Marcus Vance',
      dateRdv,
      heureRdv,
      motif: motifRdv,
    });
    setModalRdv(false);
    setMotifRdv('');
  };

  const envoyerMessageDirect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;
    setMessageEnvoye(true);
    setMessage('');
    setTimeout(() => setMessageEnvoye(false), 4000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Faculty Dialogue & Parent-Teacher Conferences</h3>
          <p className="text-xs text-slate-500">Schedule appointments with homeroom tutors and communicate directly with academic staff.</p>
        </div>
        <BoutonRouge
          texte="Request Teacher Meeting"
          icone={Calendar}
          onClick={() => setModalRdv(!modalRdv)}
        />
      </div>

      {modalRdv && (
        <form onSubmit={soumettreRdv} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <h4 className="text-sm font-bold text-slate-900">Schedule Parent-Teacher Conference (Rendez-vous)</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block">Teacher</label>
              <select
                value={profRdv}
                onChange={(e) => setProfRdv(e.target.value)}
                className="w-full mt-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
              >
                <option value="Prof. Evelyn Reed (Mathematics)">Prof. Evelyn Reed (Mathematics)</option>
                <option value="Dr. Robert Chen (Physics)">Dr. Robert Chen (Physics)</option>
                <option value="Dr. Arthur Sterling (Principal)">Dr. Arthur Sterling (Principal)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block">Preferred Date</label>
              <input
                type="date"
                value={dateRdv}
                onChange={(e) => setDateRdv(e.target.value)}
                className="w-full mt-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block">Preferred Time</label>
              <input
                type="time"
                value={heureRdv}
                onChange={(e) => setHeureRdv(e.target.value)}
                className="w-full mt-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                required
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 block">Meeting Subject & Agenda</label>
            <input
              type="text"
              value={motifRdv}
              onChange={(e) => setMotifRdv(e.target.value)}
              placeholder="e.g. Midterm exam review and Olympiad preparation"
              className="w-full mt-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              required
            />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <BoutonRouge texte="Cancel" variante="secondaire" taille="petit" onClick={() => setModalRdv(false)} />
            <BoutonRouge texte="Confirm Appointment" taille="petit" type="submit" />
          </div>
        </form>
      )}

      {/* Confirmed Appointments */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <h4 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-red-600" /> Confirmed Teacher Meetings
        </h4>
        <div className="divide-y divide-slate-100 mt-2">
          {listeRendezVous.map((rdv) => (
            <div key={rdv.identifiant} className="py-2.5 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-900">{rdv.nomProfesseur}</span> &bull; <span className="text-slate-500">{rdv.eleveConcerne}</span>
                <p className="text-[11px] text-slate-600 mt-0.5">{rdv.motif}</p>
                <span className="text-[10px] text-red-600 font-bold mt-0.5 block">{rdv.dateRdv} at {rdv.heureRdv}</span>
              </div>
              <span className="px-2 py-0.5 rounded font-bold uppercase text-[10px] bg-emerald-50 text-emerald-700">
                {rdv.statut}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Direct Messaging with Homeroom Teacher */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <h4 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-1.5">
          <MessageSquare className="w-4 h-4 text-red-600" /> Direct Message to Homeroom Tutor
        </h4>
        <form onSubmit={envoyerMessageDirect} className="mt-3 space-y-3">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your inquiry directly to Prof. Evelyn Reed..."
            className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
            rows={3}
            required
          />
          <div className="flex items-center justify-between pt-1">
            {messageEnvoye ? (
              <span className="text-xs font-bold text-emerald-700">Message delivered to teacher!</span>
            ) : <span />}
            <BoutonRouge texte="Send Message" icone={Send} taille="petit" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};
