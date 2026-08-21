import React, { useState } from 'react';
import {
  CreditCard,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  UploadCloud,
  Clock,
  Plus,
  Bus,
  Utensils,
  DollarSign,
  Receipt,
  Download,
  Calendar,
  X,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { BoutonRouge } from '../../../composants/communs/BoutonRouge';
import { utiliserAcademie } from '../../../controleurs/contexteAcademie';
import {
  COMPTE_CANTINE_INITIAL,
  CARTE_TRANSPORT_INITIALE,
  JUSTIFICATIFS_ABSENCES_INITIAUX,
} from '../../../modeles/donneesInitiales/donneesEleveEtendu';
import { JustificatifAbsence } from '../../../modeles/typesEtendus';

const FRAIS_SCOLARITE_ELEVE = [
  { id: 'fr-1', libelle: 'Frais de scolarité & Enseignement (Trimestre 2)', montant: 1450.0, statut: 'paye', dateReglement: '15/01/2026', mode: 'Prélèvement automatique' },
  { id: 'fr-2', libelle: 'Demi-pension & Restauration scolaire (Forfait T2)', montant: 380.0, statut: 'paye', dateReglement: '15/01/2026', mode: 'Carte Bancaire' },
  { id: 'fr-3', libelle: 'Cotisation Club Sciences & Olympiades Nationales', montant: 45.0, statut: 'paye', dateReglement: '05/02/2026', mode: 'En ligne' },
  { id: 'fr-4', libelle: 'Sortie Pédagogique - Observatoire Astronomique', montant: 25.0, statut: 'en_attente', dateEcheance: '25/03/2026', mode: 'Paiement en ligne ouvert' },
];

export const OngletEleveVieScolaireServices: React.FC = () => {
  const { formaterMontant } = utiliserAcademie();
  const [ongletService, setOngletService] = useState<'finances' | 'cantine' | 'absences' | 'transport'>('finances');

  // État Justificatifs d'Absences
  const [justificatifs, setJustificatifs] = useState<JustificatifAbsence[]>(JUSTIFICATIFS_ABSENCES_INITIAUX);
  const [modalDepotAbsence, setModalDepotAbsence] = useState(false);
  const [motifAbsence, setMotifAbsence] = useState<'maladie' | 'raison_familiale' | 'transport' | 'convocation_officielle' | 'autre'>('maladie');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [nombreHeures, setNombreHeures] = useState(4);
  const [commentaireAbsence, setCommentaireAbsence] = useState('');
  const [nomFichierJustif, setNomFichierJustif] = useState('');
  const [depotJustifSucces, setDepotJustifSucces] = useState(false);

  // État Cantine / Recharge
  const [compteCantine, setCompteCantine] = useState(COMPTE_CANTINE_INITIAL);
  const [modalRecharge, setModalRecharge] = useState(false);
  const [montantRecharge, setMontantRecharge] = useState<number>(48.0);
  const [rechargeEffectuee, setRechargeEffectuee] = useState(false);

  const soumettreJustificatif = (e: React.FormEvent) => {
    e.preventDefault();
    const nouv: JustificatifAbsence = {
      identifiant: `just-${Date.now()}`,
      dateAbsenceDebut: dateDebut || new Date().toISOString().split('T')[0],
      dateAbsenceFin: dateFin || dateDebut || new Date().toISOString().split('T')[0],
      nombreHeures: Number(nombreHeures),
      motif: motifAbsence,
      commentaire: commentaireAbsence,
      nomFichierJoint: nomFichierJustif || 'certificat_medical_fourni.pdf',
      dateDepot: new Date().toISOString().split('T')[0],
      statut: 'en_attente',
      reponseVieScolaire: 'En cours de vérification par le bureau de la Vie Scolaire.',
    };

    setJustificatifs((prev) => [nouv, ...prev]);
    setDepotJustifSucces(true);

    setTimeout(() => {
      setDepotJustifSucces(false);
      setModalDepotAbsence(false);
      setCommentaireAbsence('');
      setNomFichierJustif('');
    }, 2000);
  };

  const executerRechargeBadge = (e: React.FormEvent) => {
    e.preventDefault();
    setCompteCantine((prev) => ({
      ...prev,
      soldeActuel: prev.soldeActuel + montantRecharge,
      forfaitRestant: prev.forfaitRestant + Math.floor(montantRecharge / 4.8),
      derniersPassages: [
        {
          id: `pas-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          heure: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
          typeRepas: `Recharge Compte (+${montantRecharge}€)`,
          debit: 0,
          borne: 'Paiement Sécurisé CB',
        },
        ...prev.derniersPassages,
      ],
    }));

    setRechargeEffectuee(true);
    setTimeout(() => {
      setRechargeEffectuee(false);
      setModalRecharge(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* En-tête avec onglets de sous-navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-red-600" />
            <h2 className="text-base font-bold text-slate-900">Vie Scolaire, Frais, Cantine & Absences</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Suivi des frais de scolarité, recharges du badge cantine, carte de transport et justificatifs d'absence.
          </p>
        </div>

        <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
          <button
            onClick={() => setOngletService('finances')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              ongletService === 'finances' ? 'bg-white text-red-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Frais & Factures
          </button>
          <button
            onClick={() => setOngletService('cantine')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              ongletService === 'cantine' ? 'bg-white text-red-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Badge Cantine & Repas
          </button>
          <button
            onClick={() => setOngletService('absences')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              ongletService === 'absences' ? 'bg-white text-red-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Justificatifs d'Absence ({justificatifs.length})
          </button>
          <button
            onClick={() => setOngletService('transport')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              ongletService === 'transport' ? 'bg-white text-red-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Transport Scolaire
          </button>
        </div>
      </div>

      {/* VUE 1 : FRAIS DE SCOLARITÉ & FACTURES */}
      {ongletService === 'finances' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 block">Statut Compte Scolaire</span>
              <div className="mt-1 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span className="text-lg font-black text-slate-900">En Règle (Trimestre 2)</span>
              </div>
              <span className="text-[11px] text-emerald-700 font-bold mt-1 block">Aucun impayé constaté</span>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 block">Total Cotisations Réglées</span>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-2xl font-black text-slate-900">{formaterMontant(1875)}</span>
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">Année académique 2025-2026</span>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-500 block">Frais en Attente</span>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-2xl font-black text-amber-600">{formaterMontant(25)}</span>
              </div>
              <span className="text-[11px] text-amber-700 font-semibold mt-1 block">Sortie pédagogique (25 Mars)</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Historique des Échéances & Facturations Élève</h3>
                <p className="text-xs text-slate-500">Quittances téléchargeables et reçus de paiement officiel</p>
              </div>
              <button
                onClick={() => alert("Téléchargement du relevé de compte annuel complet en PDF")}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Relevé Annuel (PDF)
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {FRAIS_SCOLARITE_ELEVE.map((f) => (
                <div key={f.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-900 text-sm block">{f.libelle}</span>
                    <span className="text-[11px] text-slate-500">
                      {f.statut === 'paye' ? `Réglé le ${f.dateReglement} (${f.mode})` : `À régler avant le ${f.dateEcheance}`}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-black text-sm text-slate-900">{formaterMontant(f.montant)}</span>
                    {f.statut === 'paye' ? (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                        Payé & Acquitté
                      </span>
                    ) : (
                      <button
                        onClick={() => alert(`Paiement en ligne de ${formaterMontant(f.montant)} pour : ${f.libelle}`)}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-xs cursor-pointer shadow-2xs"
                      >
                        Payer en ligne
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VUE 2 : BADGE CANTINE & RESTAURATION */}
      {ongletService === 'cantine' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Carte de Badge Numérique */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-red-950 rounded-2xl p-6 text-white shadow-md flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black tracking-wider uppercase text-red-400">Badge Restauration Scolaire</span>
                  <Utensils className="w-5 h-5 text-amber-300" />
                </div>
                <div className="mt-4">
                  <span className="text-xs text-slate-400">Numéro de carte RFID</span>
                  <p className="text-base font-mono font-bold tracking-widest text-slate-100">{compteCantine.numeroBadge}</p>
                </div>
              </div>

              <div>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400">Solde Disponible</span>
                    <h3 className="text-3xl font-black text-white">{formaterMontant(compteCantine.soldeActuel)}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-amber-300 block">{compteCantine.forfaitRestant} repas</span>
                    <span className="text-[10px] text-slate-400">4.80 € / repas</span>
                  </div>
                </div>

                <button
                  onClick={() => setModalRecharge(true)}
                  className="w-full mt-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Recharger mon badge en ligne
                </button>
              </div>
            </div>

            {/* Menu de la Semaine */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-red-600" />
                    Menu du Chef de la Semaine (Demi-Pension)
                  </h3>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Produits Locaux & Bio 60%
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="font-bold text-red-700 block">Lundi</span>
                    <p className="text-slate-700 mt-1">Carottes râpées bio &bull; Pavé de saumon au four, riz basmati &bull; Tarte aux pommes</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="font-bold text-red-700 block">Mardi</span>
                    <p className="text-slate-700 mt-1">Velouté de potimarron &bull; Lasagnes végétariennes aux épinards &bull; Fromage blanc & miel</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="font-bold text-red-700 block">Jeudi</span>
                    <p className="text-slate-700 mt-1">Salade de lentilles du Puy &bull; Émincé de volaille rôtie, purée maison &bull; Éclair chocolat</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="font-bold text-red-700 block">Vendredi</span>
                    <p className="text-slate-700 mt-1">Taboulé à la menthe &bull; Filet de cabillaud en croûte d'herbes, haricots verts &bull; Fruit de saison</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Historique des Passages à la Borne */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Historique des Passages au Self</h3>
              <p className="text-xs text-slate-500">Traçabilité des déjeuners et des recharges financières</p>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {compteCantine.derniersPassages.map((p) => (
                <div key={p.id} className="p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">{p.typeRepas}</span>
                      <span className="text-[11px] text-slate-500">{p.date} à {p.heure} &bull; {p.borne}</span>
                    </div>
                  </div>
                  <span className="font-black text-slate-800">
                    {p.debit > 0 ? `-${formaterMontant(p.debit)}` : '+ Recharge'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VUE 3 : JUSTIFICATIFS D'ABSENCE & ASSIDUITÉ */}
      {ongletService === 'absences' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-red-600" />
                Gestion & Dépôt des Justificatifs d'Absence
              </h3>
              <p className="text-xs text-slate-500">
                Taux d'assiduité : <strong>98.5%</strong> &bull; 0 absence injustifiée enregistrée ce trimestre
              </p>
            </div>

            <BoutonRouge
              texte="Déposer un Justificatif en Ligne"
              icone={Plus}
              taille="petit"
              onClick={() => setModalDepotAbsence(true)}
            />
          </div>

          <div className="space-y-3">
            {justificatifs.map((j) => (
              <div
                key={j.identifiant}
                className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-slate-900 capitalize">Motif : {j.motif.replace('_', ' ')}</span>
                    <span className="text-slate-400">&bull;</span>
                    <span className="text-slate-600">Du {j.dateAbsenceDebut} au {j.dateAbsenceFin} ({j.nombreHeures}h)</span>
                  </div>

                  {j.statut === 'valide_vie_scolaire' ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Validé par la Vie Scolaire
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      En attente de traitement
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">{j.commentaire}</p>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                  <span>Pièce jointe : <strong>{j.nomFichierJoint || 'Document scanné'}</strong></span>
                  <span>Avis officiel : <em>{j.reponseVieScolaire}</em></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VUE 4 : TRANSPORT SCOLAIRE */}
      {ongletService === 'transport' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                <Bus className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Carte & Pass de Transport Scolaire</h3>
                <p className="text-xs text-slate-500">Abonnement Annuel Île-de-France Mobilités / Lignes Dédiées</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Abonnement Valide
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 block">Détails de l'Abonnement :</span>
              <p>Numéro de Pass : <strong>{CARTE_TRANSPORT_INITIALE.numeroCarte}</strong></p>
              <p>Ligne attitrée : <strong>{CARTE_TRANSPORT_INITIALE.ligneBus}</strong></p>
              <p>Arrêt de montée : <strong>{CARTE_TRANSPORT_INITIALE.arretPrincipal}</strong></p>
              <p>Date d'expiration : <strong>{CARTE_TRANSPORT_INITIALE.dateExpiration}</strong></p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 block">Horaires de Passage Express :</span>
              <p>Matin (Aller) : <strong>07h25 - 07h45 (Départ toutes les 10 min)</strong></p>
              <p>Soir (Retour) : <strong>16h10 - 17h15 - 18h00</strong></p>
              <p className="text-emerald-700 font-semibold pt-1">Arrêt desservi directement devant l'entrée du Lycée.</p>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE RECHARGE DE BADGE CANTINE */}
      {modalRecharge && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Recharger le Badge de Cantine</h3>
              <button
                onClick={() => setModalRecharge(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {rechargeEffectuee ? (
              <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-900">Recharge de {formaterMontant(montantRecharge)} validée !</h4>
                <p className="text-xs text-emerald-700">Le solde de votre badge a été actualisé instantanément.</p>
              </div>
            ) : (
              <form onSubmit={executerRechargeBadge} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-800 block mb-2">Choisir un forfait de recharge :</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { montant: 24.0, repas: 5 },
                      { montant: 48.0, repas: 10 },
                      { montant: 96.0, repas: 20 },
                    ].map((opt) => (
                      <button
                        key={opt.montant}
                        type="button"
                        onClick={() => setMontantRecharge(opt.montant)}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          montantRecharge === opt.montant
                            ? 'bg-red-50 border-red-500 text-red-700 font-bold'
                            : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        <span className="text-sm font-black block">{formaterMontant(opt.montant)}</span>
                        <span className="text-[10px] text-slate-500">{opt.repas} repas</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold text-slate-800">Paiement sécurisé Stripe / 3D Secure</span>
                  </div>
                  <span className="font-black text-red-600">{formaterMontant(montantRecharge)}</span>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModalRecharge(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold cursor-pointer"
                  >
                    Payer {formaterMontant(montantRecharge)}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL DE DÉPÔT DE JUSTIFICATIF D'ABSENCE */}
      {modalDepotAbsence && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Déposer un Justificatif d'Absence</h3>
              <button
                onClick={() => setModalDepotAbsence(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {depotJustifSucces ? (
              <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-900">Justificatif transmis à la Vie Scolaire !</h4>
                <p className="text-xs text-emerald-700">Le CPE validera votre document sous 24h.</p>
              </div>
            ) : (
              <form onSubmit={soumettreJustificatif} className="space-y-3.5 text-xs">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Motif principal :</label>
                  <select
                    value={motifAbsence}
                    onChange={(e: any) => setMotifAbsence(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                  >
                    <option value="maladie">Raison Médicale / Maladie (Certificat)</option>
                    <option value="transport">Incident de transport en commun</option>
                    <option value="raison_familiale">Événement familial exceptionnel</option>
                    <option value="convocation_officielle">Convocation administrative / Permis</option>
                    <option value="autre">Autre motif</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Date début :</label>
                    <input
                      type="date"
                      required
                      value={dateDebut}
                      onChange={(e) => setDateDebut(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-800 block mb-1">Date fin :</label>
                    <input
                      type="date"
                      value={dateFin}
                      onChange={(e) => setDateFin(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">Nombre d'heures manquées :</label>
                  <input
                    type="number"
                    min={1}
                    max={40}
                    value={nombreHeures}
                    onChange={(e) => setNombreHeures(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">Commentaire explicatif :</label>
                  <textarea
                    rows={2}
                    required
                    value={commentaireAbsence}
                    onChange={(e) => setCommentaireAbsence(e.target.value)}
                    placeholder="Préciser les circonstances de l'absence..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">Pièce justificative (PDF, JPG) :</label>
                  <input
                    type="file"
                    id="input-justif-file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setNomFichierJustif(e.target.files[0].name);
                      }
                    }}
                  />
                  <label
                    htmlFor="input-justif-file"
                    className="w-full p-3 border border-dashed border-slate-300 rounded-xl text-center block bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer text-slate-600"
                  >
                    {nomFichierJustif ? nomFichierJustif : 'Cliquer pour joindre le certificat ou justificatif'}
                  </label>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModalDepotAbsence(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold cursor-pointer"
                  >
                    Transmettre le justificatif
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
