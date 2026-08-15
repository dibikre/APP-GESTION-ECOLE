import React, { useState } from 'react';
import {
  ShieldCheck,
  Key,
  Smartphone,
  Lock,
  CheckCircle,
} from '../../../composants/communs/IconesAcademie';
import { BoutonRouge } from '../../../composants/communs/BoutonRouge';
import { utiliserAcademie } from '../../../controleurs/contexteAcademie';

export const OngletEleveSecurite: React.FC = () => {
  const { listeSecurite } = utiliserAcademie();
  const [mdpActuel, setMdpActuel] = useState('');
  const [nouveauMdp, setNouveauMdp] = useState('');
  const [confirmerMdp, setConfirmerMdp] = useState('');
  const [succes, setSucces] = useState(false);

  const changerMotDePasse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nouveauMdp || nouveauMdp !== confirmerMdp) return;
    setSucces(true);
    setMdpActuel('');
    setNouveauMdp('');
    setConfirmerMdp('');
    setTimeout(() => setSucces(false), 4000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-900">Student Account Security & Device Access</h3>
        <p className="text-xs text-slate-500">Update login credentials, view recent logins, and verify 2-factor security status.</p>
      </div>

      {/* Password Update Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <h4 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-1.5">
          <Key className="w-4 h-4 text-red-600" /> Update Account Password
        </h4>
        <form onSubmit={changerMotDePasse} className="mt-3 space-y-3 max-w-lg">
          <div>
            <label className="text-xs font-semibold text-slate-700 block">Current Password</label>
            <input
              type="password"
              value={mdpActuel}
              onChange={(e) => setMdpActuel(e.target.value)}
              placeholder="••••••••"
              className="w-full mt-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block">New Password</label>
              <input
                type="password"
                value={nouveauMdp}
                onChange={(e) => setNouveauMdp(e.target.value)}
                placeholder="••••••••"
                className="w-full mt-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block">Confirm Password</label>
              <input
                type="password"
                value={confirmerMdp}
                onChange={(e) => setConfirmerMdp(e.target.value)}
                placeholder="••••••••"
                className="w-full mt-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-between pt-1">
            {succes && (
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Password updated successfully!
              </span>
            )}
            <BoutonRouge texte="Save New Password" taille="petit" type="submit" />
          </div>
        </form>
      </div>

      {/* Login History */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <h4 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-1.5">
          <Smartphone className="w-4 h-4 text-red-600" /> Recent Security & Login History
        </h4>
        <div className="divide-y divide-slate-100 mt-2">
          {listeSecurite.map((sec) => (
            <div key={sec.identifiant} className="py-2.5 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-900">{sec.typeEvenement.replace('_', ' ').toUpperCase()}</span>
                <span className="text-slate-500 text-[11px] block">{sec.appareil} &bull; IP: {sec.adresseIp}</span>
              </div>
              <div className="text-right">
                <span className="font-semibold text-slate-700 block">{sec.horodatage}</span>
                <span className="text-[10px] font-bold text-emerald-700 uppercase">{sec.statut}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
