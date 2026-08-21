import React, { useState } from 'react';
import {
  UserCheck,
  FileCheck,
  Download,
  Plus,
  Edit2,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  MapPin,
  HeartPulse,
  Shield,
  Save,
  Sparkles,
  User,
} from 'lucide-react';
import { BoutonRouge } from '../../../composants/communs/BoutonRouge';
import { PROFIL_ELEVE_INITIAL } from '../../../modeles/donneesInitiales/donneesEleveEtendu';
import { ProfilEleveComplet, DemandeDocument } from '../../../modeles/typesEtendus';

const DEMANDES_DOCUMENTS_INITIALES: DemandeDocument[] = [
  {
    identifiant: 'dem-1',
    typeDocument: 'certificat_scolarite',
    demandeurNom: 'Marcus Vance',
    roleDemandeur: 'eleve',
    classe: '1ère C',
    dateDemande: '2026-02-15',
    statut: 'delivre',
  },
  {
    identifiant: 'dem-2',
    typeDocument: 'releve_notes',
    demandeurNom: 'Marcus Vance',
    roleDemandeur: 'eleve',
    classe: '1ère C',
    dateDemande: '2026-03-01',
    statut: 'pret',
  },
];

export const OngletEleveProfilDemandes: React.FC = () => {
  const [profil, setProfil] = useState<ProfilEleveComplet>(PROFIL_ELEVE_INITIAL);
  const [enModeEdition, setEnModeEdition] = useState(false);
  const [sauvegardeSucces, setSauvegardeSucces] = useState(false);

  // État Demandes de Documents
  const [demandes, setDemandes] = useState<DemandeDocument[]>(DEMANDES_DOCUMENTS_INITIALES);
  const [typeDocDemande, setTypeDocDemande] = useState<'certificat_scolarite' | 'releve_notes' | 'certificat_transfert' | 'attestation_inscription'>('certificat_scolarite');
  const [demandeCreeSucces, setDemandeCreeSucces] = useState(false);

  const enregistrerProfil = (e: React.FormEvent) => {
    e.preventDefault();
    setEnModeEdition(false);
    setSauvegardeSucces(true);
    setTimeout(() => setSauvegardeSucces(false), 3000);
  };

  const commanderDocument = (e: React.FormEvent) => {
    e.preventDefault();
    const nouv: DemandeDocument = {
      identifiant: `dem-${Date.now()}`,
      typeDocument: typeDocDemande,
      demandeurNom: profil.nomComplet,
      roleDemandeur: 'eleve',
      classe: profil.classe,
      dateDemande: new Date().toISOString().split('T')[0],
      statut: 'pret',
    };

    setDemandes((prev) => [nouv, ...prev]);
    setDemandeCreeSucces(true);
    setTimeout(() => setDemandeCreeSucces(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-red-600" />
            <h2 className="text-base font-bold text-slate-900">Fiche Profil Élève & Actes Administratifs</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Mettez à jour vos coordonnées personnelles, contacts d'urgence et commandez vos certificats officiels.
          </p>
        </div>

        <button
          onClick={() => setEnModeEdition(!enModeEdition)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            enModeEdition
              ? 'bg-slate-200 text-slate-800'
              : 'bg-red-600 hover:bg-red-700 text-white shadow-xs'
          }`}
        >
          <Edit2 className="w-3.5 h-3.5" />
          {enModeEdition ? 'Annuler les modifications' : 'Modifier mes informations'}
        </button>
      </div>

      {sauvegardeSucces && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          Votre profil et vos contacts d'urgence ont été mis à jour dans le système du secrétariat général.
        </div>
      )}

      {/* FORMULAIRE DE PROFIL ÉLÈVE COMPLET */}
      <form onSubmit={enregistrerProfil} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        {/* Identité Générale */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-slate-100">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-red-600 to-slate-900 text-white flex items-center justify-center font-black text-2xl shadow-sm shrink-0">
            {profil.nomComplet.split(' ').map((n) => n[0]).join('')}
          </div>

          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-slate-900">{profil.nomComplet}</h3>
              {profil.delegueClasse && (
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-red-100 text-red-800">
                  Délégué de classe
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500">
              Matricule : <strong>{profil.matricule}</strong> &bull; Né le {profil.dateNaissance} ({profil.lieuNaissance}) &bull; Sexe : {profil.sexe}
            </p>
            <p className="text-xs text-slate-600 font-semibold">
              Classe : {profil.classe} &bull; Régime : {profil.regimeScolaire}
            </p>
          </div>
        </div>

        {/* Coordonnées & Spécialités */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase text-slate-900 tracking-wider">Coordonnées de l'Élève</h4>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Courriel Académique :</label>
              <input
                type="email"
                disabled={!enModeEdition}
                value={profil.courriel}
                onChange={(e) => setProfil({ ...profil, courriel: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 disabled:opacity-75"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Téléphone Mobile :</label>
              <input
                type="tel"
                disabled={!enModeEdition}
                value={profil.telephone}
                onChange={(e) => setProfil({ ...profil, telephone: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 disabled:opacity-75"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Adresse de Résidence :</label>
              <input
                type="text"
                disabled={!enModeEdition}
                value={profil.adresse}
                onChange={(e) => setProfil({ ...profil, adresse: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 disabled:opacity-75"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase text-slate-900 tracking-wider">Parcours & Spécialités</h4>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <span className="font-bold text-slate-800 block">Majeures Scientifiques Choisies :</span>
              {profil.specialites.map((sp, idx) => (
                <span key={idx} className="inline-block px-2 py-0.5 bg-white border border-slate-200 rounded text-[11px] font-semibold text-slate-700 mr-1.5 mb-1">
                  {sp}
                </span>
              ))}
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <span className="font-bold text-slate-800 block">Langues Vivantes :</span>
              {profil.languesVivantes.map((lv, idx) => (
                <span key={idx} className="inline-block px-2 py-0.5 bg-white border border-slate-200 rounded text-[11px] font-semibold text-slate-700 mr-1.5 mb-1">
                  {lv}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Tuteur Légal & Contact d'Urgence */}
        <div className="pt-4 border-t border-slate-100 space-y-4 text-xs">
          <h4 className="text-xs font-bold uppercase text-slate-900 tracking-wider flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-red-600" />
            Responsable Légal & Contact d'Urgence
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Nom du Responsable :</label>
              <input
                type="text"
                disabled={!enModeEdition}
                value={profil.contactUrgence.nom}
                onChange={(e) =>
                  setProfil({
                    ...profil,
                    contactUrgence: { ...profil.contactUrgence, nom: e.target.value },
                  })
                }
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 disabled:opacity-75"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Lien de Parenté :</label>
              <input
                type="text"
                disabled={!enModeEdition}
                value={profil.contactUrgence.lienParente}
                onChange={(e) =>
                  setProfil({
                    ...profil,
                    contactUrgence: { ...profil.contactUrgence, lienParente: e.target.value },
                  })
                }
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 disabled:opacity-75"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Téléphone d'Urgence :</label>
              <input
                type="tel"
                disabled={!enModeEdition}
                value={profil.contactUrgence.telephone}
                onChange={(e) =>
                  setProfil({
                    ...profil,
                    contactUrgence: { ...profil.contactUrgence, telephone: e.target.value },
                  })
                }
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 disabled:opacity-75"
              />
            </div>
          </div>
        </div>

        {/* Santé & PAI */}
        <div className="pt-4 border-t border-slate-100 space-y-3 text-xs">
          <h4 className="text-xs font-bold uppercase text-slate-900 tracking-wider flex items-center gap-1.5">
            <HeartPulse className="w-4 h-4 text-emerald-600" />
            Informations Médicales & Protocole PAI
          </h4>

          <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1">
            <p className="text-emerald-950 font-bold">Médecin Traitant : {profil.medecinTraitant}</p>
            <p className="text-emerald-900 text-[11px]">{profil.allergiesAmenagements}</p>
          </div>
        </div>

        {enModeEdition && (
          <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
            <button
              type="submit"
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" />
              Enregistrer les modifications
            </button>
          </div>
        )}
      </form>

      {/* GUICHET DE DEMANDES ADMINISTRATIVES */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-red-600" />
              Guichet des Actes & Certificats de Scolarité Officiels
            </h3>
            <p className="text-xs text-slate-500">
              Commandez et téléchargez vos documents avec cachet et signature numérique de l'établissement
            </p>
          </div>
        </div>

        {demandeCreeSucces && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Votre document a été généré instantanément et est prêt pour le téléchargement.
          </div>
        )}

        <form onSubmit={commanderDocument} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center gap-3 text-xs">
          <span className="font-bold text-slate-800 whitespace-nowrap">Nouveau document :</span>
          <select
            value={typeDocDemande}
            onChange={(e: any) => setTypeDocDemande(e.target.value)}
            className="flex-1 p-2 bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-red-500"
          >
            <option value="certificat_scolarite">Certificat de Scolarité Officiel (2025-2026)</option>
            <option value="releve_notes">Relevé de Notes Certifié Conforme (Trimestre 2)</option>
            <option value="attestation_inscription">Attestation d'Inscription & Assiduité</option>
            <option value="certificat_transfert">Certificat de Radiation / Transfert</option>
          </select>
          <button
            type="submit"
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Générer le document
          </button>
        </form>

        <div className="divide-y divide-slate-100 text-xs">
          {demandes.map((d) => (
            <div key={d.identifiant} className="py-3 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block capitalize">
                  {d.typeDocument.replace('_', ' ')}
                </span>
                <span className="text-[11px] text-slate-500">
                  Demandé le {d.dateDemande} &bull; Émis au nom de {d.demandeurNom} ({d.classe})
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                  Document Prêt
                </span>
                <button
                  onClick={() => alert(`Téléchargement du document certifié : ${d.typeDocument}.pdf`)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Télécharger (PDF)
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
