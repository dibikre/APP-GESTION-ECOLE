import React, { useState } from 'react';
import {
  Utensils,
  Bus,
  CreditCard,
  CheckCircle,
  AlertTriangle,
  Clock,
  Calendar,
  Plus,
  ShieldAlert,
  MapPin,
  Phone,
  UserCheck,
  ChevronRight,
  Leaf,
  Sparkles,
  Info,
} from 'lucide-react';
import { BoutonRouge } from '../../../composants/communs/BoutonRouge';
import { CarteStatistique } from '../../../composants/communs/CarteStatistique';
import { utiliserAcademie } from '../../../controleurs/contexteAcademie';

interface RepasJour {
  jour: string;
  date: string;
  entree: string;
  platPrincipal: string;
  accompagnement: string;
  dessert: string;
  optionVegetarienne: string;
  allergènes: string[];
  bioOuLocal: boolean;
}

const MENUS_SEMAINE: RepasJour[] = [
  {
    jour: 'Lundi',
    date: '23 Février 2026',
    entree: 'Velouté de potimarron bio & graines de courge',
    platPrincipal: 'Filet de colin d’Alaska sauce citronnée',
    accompagnement: 'Riz basmati & poêlée de carottes glacées',
    dessert: 'Compote pomme-poire sans sucre ajouté',
    optionVegetarienne: 'Galette de quinoa aux petits légumes',
    allergènes: ['Poisson', 'Lactose'],
    bioOuLocal: true,
  },
  {
    jour: 'Mardi',
    date: '24 Février 2026',
    entree: 'Salade de mâche, betteraves rôties et feta AOP',
    platPrincipal: 'Émincé de volaille fermière au thym',
    accompagnement: 'Purée de pommes de terre maison',
    dessert: 'Mousse au chocolat noir 70%',
    optionVegetarienne: 'Curry doux de pois chiches au lait de coco',
    allergènes: ['Lactose'],
    bioOuLocal: true,
  },
  {
    jour: 'Mercredi',
    date: '25 Février 2026',
    entree: 'Carottes râpées à l’orange & graines de sésame',
    platPrincipal: 'Lasagnes végétariennes aux épinards et ricotta',
    accompagnement: 'Salade verte assaisonnée',
    dessert: 'Fruit frais de saison (Pomme Fuji bio)',
    optionVegetarienne: 'Lasagnes végétariennes aux épinards',
    allergènes: ['Gluten', 'Lactose', 'Sésame'],
    bioOuLocal: true,
  },
  {
    jour: 'Jeudi',
    date: '26 Février 2026',
    entree: 'Tarte fine aux poireaux et emmental',
    platPrincipal: 'Sauté de bœuf braisé au jus d’herbes',
    accompagnement: 'Haricots verts extra-fins & pommes rissolées',
    dessert: 'Yaourt fermier nature sucré au miel local',
    optionVegetarienne: 'Dahl de lentilles corail au curcuma',
    allergènes: ['Gluten', 'Lactose'],
    bioOuLocal: true,
  },
  {
    jour: 'Vendredi',
    date: '27 Février 2026',
    entree: 'Céleri rémoulade maison & ciboulette',
    platPrincipal: 'Pavé de saumon rôti au four label rouge',
    accompagnement: 'Gratin de chou-fleur à la béchamel légère',
    dessert: 'Tartelette normande aux pommes tièdes',
    optionVegetarienne: 'Risotto crémeux aux champignons des bois',
    allergènes: ['Poisson', 'Gluten', 'Lactose', 'Moutarde'],
    bioOuLocal: true,
  },
];

export const OngletParentCantineTransport: React.FC = () => {
  const { formaterMontant } = utiliserAcademie();

  const [sousOnglet, setSousOnglet] = useState<'cantine' | 'transport'>('cantine');

  // État Cantine
  const [soldeMarcus, setSoldeMarcus] = useState<number>(45.0);
  const [soldeSophie, setSoldeSophie] = useState<number>(32.5);
  const [modaleRecharge, setModaleRecharge] = useState(false);
  const [enfantRecharge, setEnfantRecharge] = useState<'marcus' | 'sophie'>('marcus');
  const [montantRecharge, setMontantRecharge] = useState<number>(50);
  const [succesRecharge, setSuccesRecharge] = useState<string | null>(null);

  // État Allergies
  const [allergieSophie, setAllergieSophie] = useState('Arachides & Fruits à coque (Déclaré au PAI)');
  const [allergieMarcus, setAllergieMarcus] = useState('Aucune allergie alimentaire signalée');

  const executerRecharge = (e: React.FormEvent) => {
    e.preventDefault();
    if (enfantRecharge === 'marcus') {
      setSoldeMarcus((prev) => prev + montantRecharge);
    } else {
      setSoldeSophie((prev) => prev + montantRecharge);
    }
    setModaleRecharge(false);
    setSuccesRecharge(`Compte cantine de ${enfantRecharge === 'marcus' ? 'Marcus' : 'Sophie'} rechargé de ${formaterMontant(montantRecharge)} avec succès !`);
    setTimeout(() => setSuccesRecharge(null), 5000);
  };

  return (
    <div className="space-y-6">
      {/* En-tête avec bascule Cantine / Transport */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Utensils className="w-6 h-6 text-red-600" />
            Restauration Scolaire & Transport de Ramassage
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Gérez le solde des repas, consultez les menus de la semaine, signalez les régimes et suivez le circuit de bus scolaire.
          </p>
        </div>

        {/* Onglets de bascule */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <button
            type="button"
            onClick={() => setSousOnglet('cantine')}
            className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
              sousOnglet === 'cantine'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Utensils className="w-4 h-4 text-red-600" />
            <span>Restauration & Menus</span>
          </button>
          <button
            type="button"
            onClick={() => setSousOnglet('transport')}
            className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
              sousOnglet === 'transport'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Bus className="w-4 h-4 text-blue-600" />
            <span>Transport Scolaire & Bus</span>
          </button>
        </div>
      </div>

      {succesRecharge && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-bold text-emerald-900 flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{succesRecharge}</span>
        </div>
      )}

      {/* SECTION 1 : RESTAURATION SCOLAIRE & CANTINE */}
      {sousOnglet === 'cantine' && (
        <div className="space-y-6">
          {/* Soldes Cantine des Enfants */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Marcus */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Badge Cantine N°8841</span>
                  <h3 className="text-base font-black text-slate-900">Marcus Vance (1ère C)</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Forfait Déjeuner &bull; Demi-pensionnaire 4 jours/semaine</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Actif
                </span>
              </div>

              <div className="flex items-baseline justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-500 font-semibold block">Solde Disponible</span>
                  <span className="text-xl font-black text-slate-900">{formaterMontant(soldeMarcus)}</span>
                </div>
                <span className="text-xs font-bold text-slate-600">
                  ≈ {Math.floor(soldeMarcus / 5)} repas restants
                </span>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-500 text-[11px]">Dernier repas : Déjeuner du 20 Fév</span>
                <button
                  type="button"
                  onClick={() => {
                    setEnfantRecharge('marcus');
                    setModaleRecharge(true);
                  }}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Recharger le compte</span>
                </button>
              </div>
            </div>

            {/* Sophie */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Badge Cantine N°8842</span>
                  <h3 className="text-base font-black text-slate-900">Sophie Vance (6ème A)</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Forfait Déjeuner &bull; Demi-pensionnaire 4 jours/semaine</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Actif
                </span>
              </div>

              <div className="flex items-baseline justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-500 font-semibold block">Solde Disponible</span>
                  <span className="text-xl font-black text-slate-900">{formaterMontant(soldeSophie)}</span>
                </div>
                <span className="text-xs font-bold text-slate-600">
                  ≈ {Math.floor(soldeSophie / 5)} repas restants
                </span>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-500 text-[11px]">Dernier repas : Déjeuner du 20 Fév</span>
                <button
                  type="button"
                  onClick={() => {
                    setEnfantRecharge('sophie');
                    setModaleRecharge(true);
                  }}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Recharger le compte</span>
                </button>
              </div>
            </div>
          </div>

          {/* Menus de la Semaine */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm font-black text-slate-900">Menus de la Semaine en Direct (Cuisine Centrale)</h3>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                70% Produits Bio & Circuits Courts
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {MENUS_SEMAINE.map((menu) => (
                <div
                  key={menu.jour}
                  className="p-3.5 bg-slate-50/70 hover:bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col justify-between space-y-3 transition-colors text-xs"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                      <span className="font-black text-slate-900">{menu.jour}</span>
                      <span className="text-[10px] text-slate-400">{menu.date.split(' ')[0]}</span>
                    </div>

                    <div className="space-y-2 mt-2">
                      <div>
                        <span className="text-[9px] font-bold uppercase text-slate-400 block">Entrée</span>
                        <p className="text-[11px] font-semibold text-slate-800 line-clamp-2">{menu.entree}</p>
                      </div>

                      <div>
                        <span className="text-[9px] font-bold uppercase text-red-600 block">Plat du Jour</span>
                        <p className="text-[11px] font-bold text-slate-900 line-clamp-2">{menu.platPrincipal}</p>
                        <p className="text-[10px] text-slate-500 italic mt-0.5 line-clamp-1">{menu.accompagnement}</p>
                      </div>

                      <div>
                        <span className="text-[9px] font-bold uppercase text-slate-400 block">Dessert</span>
                        <p className="text-[11px] font-semibold text-slate-800 line-clamp-2">{menu.dessert}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60">
                    <span className="text-[9px] font-bold uppercase text-emerald-700 block">Option Végétarienne :</span>
                    <p className="text-[10px] text-slate-600 line-clamp-1">{menu.optionVegetarienne}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section Allergies & Régimes Spécifiques */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <ShieldAlert className="w-5 h-5 text-amber-600" />
              <h3 className="text-sm font-black text-slate-900">Allergies & Régimes Alimentaires Déclarés</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs">
              <div className="p-3.5 bg-amber-50/60 border border-amber-200 rounded-xl space-y-1.5">
                <span className="font-black text-amber-900 block">Sophie Vance (6ème A) :</span>
                <p className="text-amber-800 font-semibold">{allergieSophie}</p>
                <p className="text-[11px] text-amber-700">Plateau repas adapté préparé en zone sécurisée par le chef de cuisine.</p>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <span className="font-black text-slate-900 block">Marcus Vance (1ère C) :</span>
                <p className="text-slate-700">{allergieMarcus}</p>
                <p className="text-[11px] text-slate-500">Régime standard &bull; Aucun protocole particulier.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2 : TRANSPORT SCOLAIRE & BUS */}
      {sousOnglet === 'transport' && (
        <div className="space-y-6">
          {/* Fiche Circuit de Ramassage */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Colonne gauche : Carte & Circuit assigné */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Bus className="w-5 h-5 text-blue-600" />
                  <div>
                    <h3 className="text-sm font-black text-slate-900">Ligne 4 — Circuit Ouest & Résidences</h3>
                    <span className="text-[11px] text-slate-500">Bus scolaire dédié Lycée & Collège (Marcus & Sophie)</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Service en Service
                </span>
              </div>

              {/* Arrêt assigné */}
              <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-blue-700 block">Arrêt Assigné à la Famille</span>
                    <span className="text-sm font-black text-slate-900">Arrêt n°3 : Les Tilleuls (Avenue Victor Hugo)</span>
                    <p className="text-[11px] text-slate-600 mt-0.5">À 180 mètres du domicile familial</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 font-bold block">Heure Matin</span>
                  <span className="text-base font-black text-blue-700">07:25</span>
                </div>
              </div>

              {/* Étapes du Circuit */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Itinéraire & Horaires de Passage Matin / Soir
                </h4>

                <div className="space-y-2 text-xs">
                  {[
                    { nom: 'Départ Dépôt Central', matin: '07:05', soir: '17:35', passe: true },
                    { nom: 'Arrêt 1 : Mairie Annexe', matin: '07:12', soir: '17:28', passe: true },
                    { nom: 'Arrêt 2 : Place du Marché', matin: '07:18', soir: '17:22', passe: true },
                    { nom: 'Arrêt 3 : Les Tilleuls (Votre arrêt)', matin: '07:25', soir: '17:15', actuel: true },
                    { nom: 'Arrêt 4 : Parc des Sports', matin: '07:35', soir: '17:05', passe: false },
                    { nom: 'Arrivée Campus Scolaire Principal', matin: '07:48', soir: '16:50', passe: false },
                  ].map((etape, index) => (
                    <div
                      key={etape.nom}
                      className={`p-2.5 rounded-xl border flex items-center justify-between ${
                        etape.actuel
                          ? 'bg-blue-50 border-blue-300 font-bold text-blue-900 shadow-2xs'
                          : 'bg-slate-50/60 border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center ${
                          etape.actuel ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {index + 1}
                        </span>
                        <span>{etape.nom}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-mono">
                        <span>Matin : <strong>{etape.matin}</strong></span>
                        <span>Soir : <strong>{etape.soir}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Colonne droite : Chauffeur & Numéros d'astreinte */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4 text-xs">
                <h4 className="text-sm font-black text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-red-600" />
                  Équipage du Bus n°4
                </h4>

                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Chauffeur Titulaire</span>
                    <span className="font-black text-slate-900 text-sm block">M. Paul Kouassi</span>
                    <span className="text-[11px] text-slate-500">Permis D & FCO Transport Scolaire à jour</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Accompagnatrice Vie Scolaire</span>
                    <span className="font-black text-slate-900 text-sm block">Mme Fatima Bamba</span>
                    <span className="text-[11px] text-slate-500">Pointage des élèves à bord & discipline</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-bold uppercase text-red-600 block mb-1">Astreinte Transport Express :</span>
                  <a
                    href="tel:+33180004455"
                    className="p-2.5 bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded-xl border border-red-200 flex items-center justify-center gap-2 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>+33 (0)1 80 00 44 55</span>
                  </a>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 space-y-1">
                <span className="font-black block flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Pass Transport Validé 2025-2026
                </span>
                <p className="text-[11px] text-emerald-800">
                  Les deux pass annuels pour Marcus et Sophie sont entièrement réglés et activés.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODALE RECHARGE DU COMPTE CANTINE */}
      {modaleRecharge && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Utensils className="w-5 h-5 text-red-600" />
              Recharger le Solde Repas Cantine
            </h3>

            <form onSubmit={executerRecharge} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-800 block mb-1">Élève bénéficiaire :</label>
                <select
                  value={enfantRecharge}
                  onChange={(e) => setEnfantRecharge(e.target.value as 'marcus' | 'sophie')}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                >
                  <option value="marcus">Marcus Vance (1ère C) — Solde actuel : {formaterMontant(soldeMarcus)}</option>
                  <option value="sophie">Sophie Vance (6ème A) — Solde actuel : {formaterMontant(soldeSophie)}</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Formule de recharge :</label>
                <div className="grid grid-cols-3 gap-2">
                  {[25, 50, 100].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMontantRecharge(m)}
                      className={`p-2.5 rounded-xl border text-center font-black transition-all cursor-pointer ${
                        montantRecharge === m
                          ? 'border-red-600 bg-red-50 text-red-700 shadow-2xs'
                          : 'border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-300'
                      }`}
                    >
                      {formaterMontant(m)}
                      <span className="text-[9px] font-normal text-slate-500 block">≈ {Math.floor(m / 5)} repas</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModaleRecharge(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-black cursor-pointer shadow-md"
                >
                  Payer & Créditer {formaterMontant(montantRecharge)}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
