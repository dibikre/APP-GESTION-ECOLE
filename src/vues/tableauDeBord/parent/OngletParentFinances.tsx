import React, { useState } from 'react';
import {
  CreditCard,
  Download,
  Smartphone,
  CheckCircle,
  Clock,
  Building,
  Calendar,
  AlertTriangle,
  Receipt,
  FileCheck,
  Percent,
  X,
  Printer,
  ChevronRight,
  ShieldCheck,
  Banknote,
  Coins,
} from 'lucide-react';
import { BoutonRouge } from '../../../composants/communs/BoutonRouge';
import { CarteStatistique } from '../../../composants/communs/CarteStatistique';
import { utiliserAcademie } from '../../../controleurs/contexteAcademie';

export interface LigneFactureParent {
  identifiant: string;
  numeroFacture: string;
  nomEleve: string;
  classe: string;
  matricule: string;
  description: string;
  trimestre: string;
  montantTotal: number;
  montantPaye: number;
  dateEmission: string;
  dateEcheance: string;
  statut: 'paye' | 'partiel' | 'en_retard' | 'a_venir';
  modeReglement?: string;
  referencePaiement?: string;
}

export const FACTURES_PARENT_DETAIL: LigneFactureParent[] = [
  {
    identifiant: 'fac-p1',
    numeroFacture: 'INV-2026-1044',
    nomEleve: 'Marcus Vance',
    classe: '1ère C (Lycée)',
    matricule: 'STU-2026-003',
    description: 'Frais de Scolarité Annuelle & Travaux Pratiques - Trimestre 2',
    trimestre: 'Trimestre 2 (Hiver 2026)',
    montantTotal: 4500,
    montantPaye: 4500,
    dateEmission: '2026-01-10',
    dateEcheance: '2026-02-15',
    statut: 'paye',
    modeReglement: 'Carte Bancaire (Visa ending 4412)',
    referencePaiement: 'REC-TXN-88419',
  },
  {
    identifiant: 'fac-p2',
    numeroFacture: 'INV-2026-1047',
    nomEleve: 'Sophie Vance',
    classe: '6ème A (Collège)',
    matricule: 'STU-2026-018',
    description: 'Frais de Scolarité & Section Bilingue - Trimestre 2',
    trimestre: 'Trimestre 2 (Hiver 2026)',
    montantTotal: 3800,
    montantPaye: 3800,
    dateEmission: '2026-01-10',
    dateEcheance: '2026-02-15',
    statut: 'paye',
    modeReglement: 'Mobile Money (Wave ID: 078921)',
    referencePaiement: 'REC-TXN-88425',
  },
  {
    identifiant: 'fac-p3',
    numeroFacture: 'INV-2026-1082',
    nomEleve: 'Marcus Vance',
    classe: '1ère C (Lycée)',
    matricule: 'STU-2026-003',
    description: 'Transport Scolaire Circuit Ouest & Voyage d’Étude CERN',
    trimestre: 'Trimestre 2 (Hiver 2026)',
    montantTotal: 650,
    montantPaye: 650,
    dateEmission: '2026-02-01',
    dateEcheance: '2026-02-28',
    statut: 'paye',
    modeReglement: 'Virement Bancaire SEPA',
    referencePaiement: 'REC-TXN-89012',
  },
  {
    identifiant: 'fac-p4',
    numeroFacture: 'INV-2026-1120',
    nomEleve: 'Sophie Vance',
    classe: '6ème A (Collège)',
    matricule: 'STU-2026-018',
    description: 'Frais de Scolarité & Activités Périscolaires - Trimestre 3 (Anticipé)',
    trimestre: 'Trimestre 3 (Printemps 2026)',
    montantTotal: 3800,
    montantPaye: 1900,
    dateEmission: '2026-02-20',
    dateEcheance: '2026-04-15',
    statut: 'partiel',
    modeReglement: 'Acompte CB',
    referencePaiement: 'REC-TXN-90214',
  },
];

export const OngletParentFinances: React.FC = () => {
  const { formaterMontant, deviseActuelle, symboleDevise } = utiliserAcademie();

  const [factures, setFactures] = useState<LigneFactureParent[]>(FACTURES_PARENT_DETAIL);
  const [filtreEnfant, setFiltreEnfant] = useState<'tous' | 'marcus' | 'sophie'>('tous');
  const [filtreStatut, setFiltreStatut] = useState<'tous' | 'paye' | 'partiel' | 'en_retard'>('tous');

  const [modalePaiement, setModalePaiement] = useState(false);
  const [factureCibleId, setFactureCibleId] = useState<string>(factures[3]?.identifiant || '');
  const [montantChoisi, setMontantChoisi] = useState<number>(1900);
  const [modePaiement, setModePaiement] = useState<'carte' | 'wave' | 'orange_money' | 'virement'>('carte');
  const [numeroTelephone, setNumeroTelephone] = useState('+33 6 12 34 56 78');
  const [nomTitulaire, setNomTitulaire] = useState('Eleanor Vance');
  const [paiementEnCours, setPaiementEnCours] = useState(false);
  const [messageSucces, setMessageSucces] = useState<string | null>(null);

  // Reçu quittance modal
  const [recuAffiche, setRecuAffiche] = useState<LigneFactureParent | null>(null);

  // Filtrage
  const facturesFiltrees = factures.filter((f) => {
    if (filtreEnfant === 'marcus' && !f.nomEleve.toLowerCase().includes('marcus')) return false;
    if (filtreEnfant === 'sophie' && !f.nomEleve.toLowerCase().includes('sophie')) return false;
    if (filtreStatut !== 'tous' && f.statut !== filtreStatut) return false;
    return true;
  });

  const totalFacture = factures.reduce((acc, curr) => acc + curr.montantTotal, 0);
  const totalRegle = factures.reduce((acc, curr) => acc + curr.montantPaye, 0);
  const soldeRestant = totalFacture - totalRegle;

  const executerPaiement = (e: React.FormEvent) => {
    e.preventDefault();
    setPaiementEnCours(true);

    setTimeout(() => {
      setFactures((anciennes) =>
        anciennes.map((f) => {
          if (f.identifiant === factureCibleId) {
            const nouveauPaye = Math.min(f.montantTotal, f.montantPaye + montantChoisi);
            return {
              ...f,
              montantPaye: nouveauPaye,
              statut: nouveauPaye >= f.montantTotal ? 'paye' : 'partiel',
              modeReglement: `Règlement en ligne (${modePaiement.toUpperCase()})`,
              referencePaiement: `REC-TXN-${Math.floor(100000 + Math.random() * 900000)}`,
            };
          }
          return f;
        })
      );

      setPaiementEnCours(false);
      setModalePaiement(false);
      setMessageSucces(`Paiement de ${formaterMontant(montantChoisi)} enregistré avec succès ! Reçu officiel disponible.`);
      setTimeout(() => setMessageSucces(null), 6000);
    }, 900);
  };

  const ouvrirPaiementPourFacture = (facture: LigneFactureParent) => {
    setFactureCibleId(facture.identifiant);
    setMontantChoisi(facture.montantTotal - facture.montantPaye);
    setModalePaiement(true);
  };

  return (
    <div className="space-y-6">
      {/* En-tête avec action principale de paiement */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-red-600" />
              Facturation & Paiements des Frais de Scolarité
            </h2>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 uppercase">
              Devise active : {deviseActuelle} ({symboleDevise})
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Consultez l'échéancier des frais, réglez en ligne par Carte ou Mobile Money et téléchargez les quittances certifiées.
          </p>
        </div>

        <BoutonRouge
          texte="Effectuer un Paiement en Ligne"
          icone={CreditCard}
          onClick={() => {
            const factureImpayee = factures.find((f) => f.montantTotal > f.montantPaye) || factures[0];
            ouvrirPaiementPourFacture(factureImpayee);
          }}
        />
      </div>

      {/* Bannière de succès */}
      {messageSucces && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-bold text-emerald-900 flex items-center justify-between shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{messageSucces}</span>
          </div>
          <button
            type="button"
            onClick={() => setMessageSucces(null)}
            className="text-emerald-700 hover:text-emerald-900 p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Cartes statistiques financières */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CarteStatistique
          titre="Total Facturé (2025-2026)"
          valeur={formaterMontant(totalFacture)}
          sousTitre="Marcus & Sophie réunis"
          icone={Banknote}
          identifiant="parent-kpi-total-facture"
        />
        <CarteStatistique
          titre="Frais Déjà Réglés"
          valeur={formaterMontant(totalRegle)}
          sousTitre={`${Math.round((totalRegle / totalFacture) * 100)}% de la scolarité`}
          icone={CheckCircle}
          variation={{ texte: "+100% T1 & T2", positive: true }}
          identifiant="parent-kpi-total-regle"
        />
        <CarteStatistique
          titre="Solde Restant à Régler"
          valeur={formaterMontant(soldeRestant)}
          sousTitre="Échéance T3 : 15 Avril 2026"
          icone={Clock}
          identifiant="parent-kpi-solde-restant"
        />
        <CarteStatistique
          titre="Statut Institutionnel"
          valeur="En Règle"
          sousTitre="Aucun retard de paiement"
          icone={ShieldCheck}
          identifiant="parent-kpi-statut-financier"
        />
      </div>

      {/* Échéancier Prévisionnel des Trimestres */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-red-600" />
            <h3 className="text-sm font-black text-slate-900">Échéancier Prévisionnel de la Fratrie (2025 - 2026)</h3>
          </div>
          <span className="text-xs font-bold text-slate-500">Année Scolaire en cours</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* T1 */}
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-black text-emerald-900">Trimestre 1 (Automne)</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-emerald-200 text-emerald-900">Soldé</span>
              </div>
              <p className="text-lg font-black text-slate-900 mt-1">{formaterMontant(4500 + 3800)}</p>
              <p className="text-[11px] text-slate-600 mt-1">Échéance : 15 Octobre 2025 &bull; Réglé intégralement</p>
            </div>
            <div className="mt-3 pt-2 border-t border-emerald-200/60 flex items-center justify-between text-[11px] text-emerald-800 font-bold">
              <span>Quittance certifiée T1</span>
              <FileCheck className="w-4 h-4 text-emerald-600" />
            </div>
          </div>

          {/* T2 */}
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-black text-emerald-900">Trimestre 2 (Hiver)</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-emerald-200 text-emerald-900">Soldé</span>
              </div>
              <p className="text-lg font-black text-slate-900 mt-1">{formaterMontant(4500 + 3800 + 650)}</p>
              <p className="text-[11px] text-slate-600 mt-1">Échéance : 15 Février 2026 &bull; Réglé intégralement</p>
            </div>
            <div className="mt-3 pt-2 border-t border-emerald-200/60 flex items-center justify-between text-[11px] text-emerald-800 font-bold">
              <span>Quittance certifiée T2</span>
              <FileCheck className="w-4 h-4 text-emerald-600" />
            </div>
          </div>

          {/* T3 */}
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-black text-amber-900">Trimestre 3 (Printemps)</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-amber-200 text-amber-900">Acompte versé</span>
              </div>
              <p className="text-lg font-black text-slate-900 mt-1">{formaterMontant(3800)}</p>
              <p className="text-[11px] text-slate-600 mt-1">Échéance : 15 Avril 2026 &bull; Reste {formaterMontant(1900)}</p>
            </div>
            <div className="mt-3 pt-2 border-t border-amber-200/60 flex items-center justify-between">
              <span className="text-[11px] text-amber-900 font-bold">Payer le solde avant l'échéance</span>
              <button
                type="button"
                onClick={() => ouvrirPaiementPourFacture(factures[3])}
                className="px-2 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-[10px] font-bold cursor-pointer transition-colors"
              >
                Régler le solde
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Registre des Factures & Reçus */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-black text-slate-900">Registre des Factures de la Famille</h3>
            <p className="text-xs text-slate-500">Historique complet des frais de scolarité, cantine, transport et activités.</p>
          </div>

          {/* Filtres */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Filtre Enfant */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setFiltreEnfant('tous')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  filtreEnfant === 'tous' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tous les enfants
              </button>
              <button
                type="button"
                onClick={() => setFiltreEnfant('marcus')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  filtreEnfant === 'marcus' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Marcus (1ère C)
              </button>
              <button
                type="button"
                onClick={() => setFiltreEnfant('sophie')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  filtreEnfant === 'sophie' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sophie (6ème A)
              </button>
            </div>
          </div>
        </div>

        {/* Tableau des factures */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">N° Facture</th>
                <th className="py-3 px-4">Élève & Classe</th>
                <th className="py-3 px-4">Objet & Période</th>
                <th className="py-3 px-4">Montant Total</th>
                <th className="py-3 px-4">Réglé</th>
                <th className="py-3 px-4">Reste Dû</th>
                <th className="py-3 px-4">Statut</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {facturesFiltrees.map((fac) => {
                const reste = fac.montantTotal - fac.montantPaye;
                return (
                  <tr key={fac.identifiant} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{fac.numeroFacture}</td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900 block">{fac.nomEleve}</span>
                      <span className="text-[11px] text-slate-500 font-mono">{fac.matricule} &bull; {fac.classe}</span>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs">
                      <span className="font-medium text-slate-800 block line-clamp-1">{fac.description}</span>
                      <span className="text-[10px] text-slate-400 font-semibold">{fac.trimestre} &bull; Échéance {fac.dateEcheance}</span>
                    </td>
                    <td className="py-3.5 px-4 font-extrabold text-slate-900">{formaterMontant(fac.montantTotal)}</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-700">{formaterMontant(fac.montantPaye)}</td>
                    <td className="py-3.5 px-4 font-bold text-amber-800">
                      {reste > 0 ? formaterMontant(reste) : '—'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full font-extrabold uppercase text-[10px] inline-flex items-center gap-1 ${
                          fac.statut === 'paye'
                            ? 'bg-emerald-100 text-emerald-800'
                            : fac.statut === 'partiel'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {fac.statut === 'paye' ? (
                          <>
                            <CheckCircle className="w-3 h-3 text-emerald-600" />
                            Soldée
                          </>
                        ) : (
                          <>
                            <Clock className="w-3 h-3 text-amber-600" />
                            Partiel ({Math.round((fac.montantPaye / fac.montantTotal) * 100)}%)
                          </>
                        )}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {reste > 0 && (
                          <button
                            type="button"
                            onClick={() => ouvrirPaiementPourFacture(fac)}
                            className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-xs transition-colors cursor-pointer shadow-2xs"
                          >
                            Payer {formaterMontant(reste)}
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setRecuAffiche(fac)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                          title="Télécharger la quittance officielle"
                        >
                          <Download className="w-3.5 h-3.5 text-red-600" />
                          <span>Quittance PDF</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODALE DE PAIEMENT EN LIGNE */}
      {modalePaiement && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-black">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">Règlement des Frais Scolaires</h3>
                  <p className="text-xs text-slate-500">Paiement 100% sécurisé &bull; Émission immédiate de quittance</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setModalePaiement(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={executerPaiement} className="space-y-4 text-xs">
              {/* Choix de la facture / élève */}
              <div>
                <label className="font-bold text-slate-800 block mb-1">Facture ou élève concerné :</label>
                <select
                  value={factureCibleId}
                  onChange={(e) => {
                    const id = e.target.value;
                    setFactureCibleId(id);
                    const sel = factures.find((f) => f.identifiant === id);
                    if (sel) {
                      setMontantChoisi(sel.montantTotal - sel.montantPaye);
                    }
                  }}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold"
                >
                  {factures.map((fac) => (
                    <option key={fac.identifiant} value={fac.identifiant}>
                      {fac.nomEleve} — {fac.description} (Reste : {formaterMontant(fac.montantTotal - fac.montantPaye)})
                    </option>
                  ))}
                </select>
              </div>

              {/* Montant à payer */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-slate-800">Montant à régler ({deviseActuelle}) :</label>
                  <span className="text-[11px] text-slate-500">Paiement total ou acompte</span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    min={10}
                    value={montantChoisi}
                    onChange={(e) => setMontantChoisi(Number(e.target.value))}
                    required
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-black text-slate-900 focus:outline-none focus:border-red-500"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 font-black text-slate-400">
                    {symboleDevise}
                  </span>
                </div>
              </div>

              {/* Mode de paiement */}
              <div>
                <label className="font-bold text-slate-800 block mb-2">Sélectionnez le moyen de paiement :</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setModePaiement('carte')}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      modePaiement === 'carte'
                        ? 'border-red-600 bg-red-50/80 text-red-800 shadow-2xs font-bold'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-red-600 mb-1" />
                    <span className="text-[11px] font-bold block">Carte Bancaire</span>
                    <span className="text-[9px] text-slate-500">Visa / Mastercard</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setModePaiement('wave')}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      modePaiement === 'wave'
                        ? 'border-red-600 bg-red-50/80 text-red-800 shadow-2xs font-bold'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-blue-600 mb-1" />
                    <span className="text-[11px] font-bold block">Wave</span>
                    <span className="text-[9px] text-slate-500">0% de frais</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setModePaiement('orange_money')}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      modePaiement === 'orange_money'
                        ? 'border-red-600 bg-red-50/80 text-red-800 shadow-2xs font-bold'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-orange-600 mb-1" />
                    <span className="text-[11px] font-bold block">Orange Money</span>
                    <span className="text-[9px] text-slate-500">MTN / Moov</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setModePaiement('virement')}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      modePaiement === 'virement'
                        ? 'border-red-600 bg-red-50/80 text-red-800 shadow-2xs font-bold'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <Building className="w-5 h-5 text-emerald-600 mb-1" />
                    <span className="text-[11px] font-bold block">Virement</span>
                    <span className="text-[9px] text-slate-500">SEPA Direct</span>
                  </button>
                </div>
              </div>

              {/* Détails du titulaire / téléphone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Titulaire du compte :</label>
                  <input
                    type="text"
                    value={nomTitulaire}
                    onChange={(e) => setNomTitulaire(e.target.value)}
                    required
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {modePaiement === 'carte' ? 'Numéro de Carte (Simulé)' : 'Numéro Mobile Money / Téléphone :'}
                  </label>
                  <input
                    type="text"
                    value={modePaiement === 'carte' ? '•••• •••• •••• 4412' : numeroTelephone}
                    onChange={(e) => setNumeroTelephone(e.target.value)}
                    required
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>
              </div>

              {/* Récapitulatif et boutons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 block">Total prélevé :</span>
                  <span className="text-base font-black text-red-600">{formaterMontant(montantChoisi)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setModalePaiement(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={paiementEnCours}
                    className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-black flex items-center gap-2 cursor-pointer shadow-md transition-all disabled:opacity-50"
                  >
                    {paiementEnCours ? (
                      <span>Validation en cours...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Confirmer & Payer {formaterMontant(montantChoisi)}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODALE D'APERÇU & TÉLÉCHARGEMENT DE LA QUITTANCE OFFICIELLE */}
      {recuAffiche && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-5 animate-in fade-in zoom-in-95 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileCheck className="w-6 h-6 text-red-600" />
                <div>
                  <h3 className="text-sm font-black text-slate-900">Quittance Officielle de Paiement</h3>
                  <span className="text-[10px] text-slate-500 font-mono">Réf : {recuAffiche.referencePaiement || 'REC-OFFICIEL-2026'}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setRecuAffiche(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document de quittance imprimable */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 text-xs">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-black text-slate-900 text-sm block">Établissement Scolaire d'Excellence</span>
                  <span className="text-[10px] text-slate-500">Service de la Comptabilité & du Trésor</span>
                  <span className="text-[10px] text-slate-500 block">Année Académique 2025-2026</span>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 border border-emerald-300 inline-block">
                    Payé & Certifié
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-200 text-slate-700">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">Élève Bénéficiaire :</span>
                  <span className="font-bold text-slate-900 block">{recuAffiche.nomEleve}</span>
                  <span className="text-[11px] text-slate-600">{recuAffiche.classe} &bull; {recuAffiche.matricule}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">Parent / Payeur :</span>
                  <span className="font-bold text-slate-900 block">Mme Eleanor Vance</span>
                  <span className="text-[11px] text-slate-600">Reçu le {recuAffiche.dateEmission}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 font-bold block mb-1">Détail du versement :</span>
                <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 block">{recuAffiche.description}</span>
                    <span className="text-[10px] text-slate-500">{recuAffiche.modeReglement || 'Paiement direct'}</span>
                  </div>
                  <span className="text-base font-black text-slate-900">{formaterMontant(recuAffiche.montantPaye)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2">
                <span>Tampon certifié numérique &bull; Signature Agent Comptable</span>
                <span className="font-bold text-red-600">Valide pour déduction fiscale</span>
              </div>
            </div>

            {/* Actions de téléchargement */}
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setRecuAffiche(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs cursor-pointer"
              >
                Fermer
              </button>
              <button
                type="button"
                onClick={() => {
                  alert(`Téléchargement de la quittance PDF officielle : ${recuAffiche.numeroFacture}.pdf`);
                  setRecuAffiche(null);
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Télécharger le PDF Certifié</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
