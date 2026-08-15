import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap, Search, Bell, Shield, BookOpen, Briefcase, Users,
  CreditCard, Building2, Megaphone, Menu, ChevronDown, Languages, ClipboardList,
  UserCheck,
} from 'lucide-react';
import { utiliserAcademie } from '../../controleurs/contexteAcademie';
import { RoleUtilisateur } from '../../modeles/types';
import { obtenirCheminTableauDeBordParRole } from '../../routes/cheminsApplication';
import { SelecteurDevise } from './SelecteurDevise';

interface ProprietesEnteteNavigation {
  surBasculerMenuMobile: () => void;
}

export const EnteteNavigation: React.FC<ProprietesEnteteNavigation> = ({ surBasculerMenuMobile }) => {
  const {
    roleActif,
    changerRoleActif,
    termeRecherche,
    definirTermeRecherche,
    listeAnnonces,
    langueActuelle,
    changerLangue,
    traduire,
  } = utiliserAcademie();

  const naviguer = useNavigate();
  const [menuRoleOuvert, setMenuRoleOuvert] = useState(false);
  const [panneauNotificationsOuvert, setPanneauNotificationsOuvert] = useState(false);

  const rolesDisponibles: {
    cle: RoleUtilisateur;
    libelleCle: Parameters<typeof traduire>[0];
    icone: React.ElementType;
  }[] = [
    { cle: 'administrateur', libelleCle: 'role_administrateur', icone: Shield },
    { cle: 'professeur', libelleCle: 'role_professeur', icone: BookOpen },
    { cle: 'eleve', libelleCle: 'role_eleve', icone: GraduationCap },
    { cle: 'parent', libelleCle: 'role_parent', icone: Users },
    { cle: 'secretaire', libelleCle: 'role_secretaire', icone: ClipboardList },
    { cle: 'comptable', libelleCle: 'role_comptable', icone: CreditCard },
    { cle: 'ressources_humaines', libelleCle: 'role_ressources_humaines', icone: Briefcase },
    { cle: 'bibliothecaire', libelleCle: 'role_bibliothecaire', icone: Building2 },
    { cle: 'charge_communication', libelleCle: 'role_charge_communication', icone: Megaphone },
  ];

  const roleActuel = rolesDisponibles.find((r) => r.cle === roleActif) || rolesDisponibles[0];
  const IconeRole = roleActuel.icone;

  const changerRoleEtNaviguer = (role: RoleUtilisateur) => {
    changerRoleActif(role);
    setMenuRoleOuvert(false);
    naviguer(obtenirCheminTableauDeBordParRole(role));
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={surBasculerMenuMobile}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div
              className="flex items-center gap-2.5 cursor-pointer"
              onClick={() => naviguer(obtenirCheminTableauDeBordParRole(roleActif))}
            >
              <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-xs">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-slate-900 text-base leading-tight block">
                  {traduire('nomEtablissement')}
                </span>
                <span className="text-xs text-slate-500 font-medium block">
                  {traduire('sousTitreEtablissement')}
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={termeRecherche}
                onChange={(e) => definirTermeRecherche(e.target.value)}
                placeholder={traduire('recherchePlaceholder')}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Currency Selector */}
            <SelecteurDevise variante="compact" identifiant="selecteur-devise-entete" />

            {/* Sélecteur de Langue (Français / Anglais) */}
            <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200" title="Langue / Language">
              <button
                type="button"
                onClick={() => changerLangue('fr')}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-colors min-h-[32px] flex items-center gap-1 cursor-pointer ${
                  langueActuelle === 'fr'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                <Languages className="w-3 h-3" />
                FR
              </button>
              <button
                type="button"
                onClick={() => changerLangue('en')}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-colors min-h-[32px] flex items-center gap-1 cursor-pointer ${
                  langueActuelle === 'en'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                <Languages className="w-3 h-3" />
                EN
              </button>
            </div>

            {/* Notifications Bulletins */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setPanneauNotificationsOuvert(!panneauNotificationsOuvert)}
                className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="View announcements"
              >
                <Bell className="w-5 h-5" />
                {listeAnnonces.length > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-600" />
                )}
              </button>

              {panneauNotificationsOuvert && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-xl shadow-lg p-4 z-50 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="font-semibold text-sm text-slate-900">
                      {traduire('noticesEtBulletins')} ({listeAnnonces.length})
                    </span>
                    <button
                      type="button"
                      onClick={() => setPanneauNotificationsOuvert(false)}
                      className="text-xs text-red-600 font-semibold hover:underline cursor-pointer"
                    >
                      {traduire('fermer')}
                    </button>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto mt-2">
                    {listeAnnonces.map((annonce) => (
                      <div key={annonce.identifiant} className="py-2.5 text-left">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-900">{annonce.titre}</span>
                          <span className="text-[10px] text-slate-600">{annonce.datePublication}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 line-clamp-2">{annonce.contenu}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sélecteur de Rôles */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuRoleOuvert(!menuRoleOuvert)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-900 text-xs font-semibold min-h-[44px] transition-colors cursor-pointer"
              >
                <IconeRole className="w-4 h-4 text-red-600" />
                <span className="hidden sm:inline">{traduire(roleActuel.libelleCle)}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {menuRoleOuvert && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-50">
                  <div className="px-3 py-2 border-b border-slate-100 text-[11px] font-bold uppercase text-slate-400">
                    {traduire('changerRole')}
                  </div>
                  {rolesDisponibles.map((r) => {
                    const RoleIcone = r.icone;
                    const estSelectionne = r.cle === roleActif;
                    return (
                      <button
                        key={r.cle}
                        type="button"
                        onClick={() => changerRoleEtNaviguer(r.cle)}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer ${
                          estSelectionne ? 'bg-red-50 text-red-700 font-semibold' : 'text-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <RoleIcone className={`w-4 h-4 ${estSelectionne ? 'text-red-600' : 'text-slate-500'}`} />
                          <span>{traduire(r.libelleCle)}</span>
                        </div>
                        {estSelectionne && <UserCheck className="w-3.5 h-3.5 text-red-600" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
