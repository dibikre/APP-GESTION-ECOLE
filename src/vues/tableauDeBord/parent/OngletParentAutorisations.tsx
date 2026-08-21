import React, { useState } from 'react';
import {
  FileCheck,
  CheckCircle,
  Clock,
  Download,
  ShieldCheck,
  Edit3,
  AlertCircle,
  Eye,
  X,
  Lock,
  UserCheck,
} from 'lucide-react';
import { BoutonRouge } from '../../../composants/communs/BoutonRouge';

export interface AutorisationParentale {
  id: string;
  titre: string;
  categorie: 'sortie' | 'droit_image' | 'reglement' | 'decharge';
  eleveConcerne: string;
  classe: string;
  dateLimite: string;
  statut: 'signe' | 'a_signer';
  dateSignature?: string;
  signataireNom?: string;
  description: string;
  pieceJointe?: string;
}

const AUTORISATIONS_INITIALES: AutorisationParentale[] = [
  {
    id: 'aut-1',
    titre: 'Voyage d’Étude Scientifique au CERN (Genève)',
    categorie: 'sortie',
    eleveConcerne: 'Marcus Vance',
    classe: '1ère C',
    dateLimite: '15 Mars 2026',
    statut: 'a_signer',
    description: 'Voyage de 3 jours à Genève pour visiter le grand collisionneur de hadrons (LHC) avec l’équipe de physique-chimie. Hébergement en auberge de jeunesse encadré par 3 professeurs.',
    pieceJointe: 'Programme_Voyage_CERN_2026.pdf',
  },
  {
    id: 'aut-2',
    titre: 'Droit à l’Image & Diffusion Médias Éducatifs (2025-2026)',
    categorie: 'droit_image',
    eleveConcerne: 'Sophie Vance',
    classe: '6ème A',
    dateLimite: '20 Septembre 2025',
    statut: 'signe',
    dateSignature: '08 Septembre 2025 à 14h22',
    signataireNom: 'Eleanor Vance (Signature Numérique Certifiée)',
    description: 'Autorisation de prise de vue photographique lors des cérémonies de remise de prix et projets artistiques pour le journal scolaire interne et le site de l’académie.',
  },
  {
    id: 'aut-3',
    titre: 'Droit à l’Image & Diffusion Médias Éducatifs (2025-2026)',
    categorie: 'droit_image',
    eleveConcerne: 'Marcus Vance',
    classe: '1ère C',
    dateLimite: '20 Septembre 2025',
    statut: 'signe',
    dateSignature: '08 Septembre 2025 à 14h24',
    signataireNom: 'Eleanor Vance (Signature Numérique Certifiée)',
    description: 'Autorisation de publication des projets de sciences et concours d’éloquence.',
  },
  {
    id: 'aut-4',
    titre: 'Règlement Intérieur & Charte Numérique de l’Établissement',
    categorie: 'reglement',
    eleveConcerne: 'Fratrie (Marcus & Sophie)',
    classe: 'Lycée & Collège',
    dateLimite: '10 Septembre 2025',
    statut: 'signe',
    dateSignature: '02 Septembre 2025 à 09h15',
    signataireNom: 'Eleanor Vance & David Vance',
    description: 'Engagement sur l’usage responsable du matériel informatique, de la connexion internet et des tablettes fournies par l’établissement.',
  },
  {
    id: 'aut-5',
    titre: 'Décharge de Sortie Autonome après les Cours (16h30 / 17h30)',
    categorie: 'decharge',
    eleveConcerne: 'Marcus Vance',
    classe: '1ère C',
    dateLimite: '15 Septembre 2025',
    statut: 'signe',
    dateSignature: '03 Septembre 2025 à 11h40',
    signataireNom: 'Eleanor Vance',
    description: 'Autorisation donnée à Marcus de quitter l’enceinte du lycée seul dès la fin de son dernier cours de l’emploi du temps.',
  },
];

export const OngletParentAutorisations: React.FC = () => {
  const [listeAutorisations, setListeAutorisations] = useState<AutorisationParentale[]>(AUTORISATIONS_INITIALES);
  const [autorisationSelectionnee, setAutorisationSelectionnee] = useState<AutorisationParentale | null>(null);
  const [nomSignataire, setNomSignataire] = useState('Eleanor Vance');
  const [consentementAccepte, setConsentementAccepte] = useState(false);
  const [signatureEnCours, setSignatureEnCours] = useState(false);
  const [succesSignature, setSuccesSignature] = useState<string | null>(null);

  const signerAutorisation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!autorisationSelectionnee || !consentementAccepte) return;

    setSignatureEnCours(true);
    setTimeout(() => {
      setListeAutorisations((anciennes) =>
        anciennes.map((a) =>
          a.id === autorisationSelectionnee.id
            ? {
                ...a,
                statut: 'signe',
                dateSignature: `Aujourd'hui à ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
                signataireNom: `${nomSignataire} (Signature Numérique Horodatée)`,
              }
            : a
        )
      );

      setSignatureEnCours(false);
      setAutorisationSelectionnee(null);
      setConsentementAccepte(false);
      setSuccesSignature(`Autorisation signée avec succès et transmise à la vie scolaire !`);
      setTimeout(() => setSuccesSignature(null), 5000);
    }, 700);
  };

  const nonSignees = listeAutorisations.filter((a) => a.statut === 'a_signer');
  const signees = listeAutorisations.filter((a) => a.statut === 'signe');

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <FileCheck className="w-6 h-6 text-red-600" />
            Autorisations, Sorties Scolaires & Signatures Électroniques
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Signez en ligne les autorisations parentales, décharges de sortie, voyages d'études et droits à l'image certifiés.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
            {signees.length} Signées
          </span>
          {nonSignees.length > 0 && (
            <span className="px-3 py-1.5 rounded-xl bg-red-50 text-red-700 border border-red-200 animate-pulse">
              {nonSignees.length} En attente de signature
            </span>
          )}
        </div>
      </div>

      {succesSignature && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-bold text-emerald-900 flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{succesSignature}</span>
        </div>
      )}

      {/* SECTION 1 : DOCUMENTS URGENTS EN ATTENTE DE SIGNATURE */}
      {nonSignees.length > 0 && (
        <div className="bg-red-50/60 border border-red-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-red-800">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <h3 className="text-sm font-black">Action Requise : Autorisation(s) en attente de votre signature</h3>
          </div>

          <div className="space-y-3">
            {nonSignees.map((aut) => (
              <div
                key={aut.id}
                className="bg-white p-4 rounded-xl border border-red-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{aut.titre}</span>
                    <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 font-extrabold text-[10px] uppercase">
                      Urgent
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11px] max-w-2xl">{aut.description}</p>
                  <div className="flex items-center gap-4 text-[11px] text-slate-500 font-semibold pt-1">
                    <span>Élève : <strong className="text-slate-900">{aut.eleveConcerne} ({aut.classe})</strong></span>
                    <span>Date limite : <strong className="text-red-600">{aut.dateLimite}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setAutorisationSelectionnee(aut)}
                    className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-black text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Signer Électroniquement</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2 : HISTORIQUE DES AUTORISATIONS SIGNÉES */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-black text-slate-900">Registre des Consentements & Décharges Signés (2025-2026)</h3>
          </div>
          <span className="text-xs font-bold text-slate-500">Valeur Légale & RGPD</span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {signees.map((aut) => (
            <div key={aut.id} className="p-4 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{aut.titre}</span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Signé & Certifié
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">{aut.description}</p>
                <div className="flex items-center gap-4 text-[10px] text-slate-400 font-mono pt-1">
                  <span>Élève : {aut.eleveConcerne}</span>
                  <span>Signé le : {aut.dateSignature}</span>
                  <span>Par : {aut.signataireNom}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => alert(`Téléchargement de l'attestation légale signée pour : ${aut.titre}`)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-red-600" />
                  <span>Attestation PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODALE DE SIGNATURE NUMÉRIQUE PARENTALE */}
      {autorisationSelectionnee && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                  <Edit3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">Signature Électronique Certifiée</h3>
                  <span className="text-[10px] text-slate-500">Portail Parents &bull; Signature à valeur légale</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setAutorisationSelectionnee(null)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={signerAutorisation} className="space-y-4 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block">{autorisationSelectionnee.titre}</span>
                <p className="text-[11px] text-slate-600 leading-relaxed">{autorisationSelectionnee.description}</p>
                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                  <span>Élève concerné : <strong>{autorisationSelectionnee.eleveConcerne} ({autorisationSelectionnee.classe})</strong></span>
                  <span>Date limite : <strong>{autorisationSelectionnee.dateLimite}</strong></span>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Nom et Prénom du représentant légal signataire :</label>
                <input
                  type="text"
                  value={nomSignataire}
                  onChange={(e) => setNomSignataire(e.target.value)}
                  required
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                />
              </div>

              {/* Paraphe numérique */}
              <div className="p-3 bg-slate-100/70 rounded-xl border border-dashed border-slate-300 text-center font-mono text-slate-700">
                <span className="text-[10px] text-slate-400 block mb-1">Aperçu du paraphe numérique horodaté :</span>
                <span className="text-sm font-black text-red-700 italic">
                  « Bon pour accord & autorisation parentale &bull; {nomSignataire} &bull; {new Date().toLocaleDateString('fr-FR')} »
                </span>
              </div>

              <div>
                <label className="flex items-start gap-2.5 p-2 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consentementAccepte}
                    onChange={(e) => setConsentementAccepte(e.target.checked)}
                    required
                    className="w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500 mt-0.5"
                  />
                  <span className="text-[11px] text-slate-700">
                    Je certifie être le titulaire de l'autorité parentale sur l'élève <strong>{autorisationSelectionnee.eleveConcerne}</strong> et donne expressément mon accord pour cette activité ou ce protocole.
                  </span>
                </label>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAutorisationSelectionnee(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={!consentementAccepte || signatureEnCours}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-black cursor-pointer shadow-md transition-all disabled:opacity-50 flex items-center gap-1.5"
                >
                  <Lock className="w-4 h-4" />
                  <span>{signatureEnCours ? 'Signature en cours...' : 'Signer & Valider Définitivement'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
