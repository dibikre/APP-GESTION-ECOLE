import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  X,
  Sparkles,
  ChevronRight,
  Shield,
  BookOpen,
  GraduationCap,
  Users,
  CreditCard,
  Briefcase,
  Building2,
  Megaphone,
} from 'lucide-react';
import { utiliserAcademie } from '../../controleurs/contexteAcademie';
import { OBTENIR_MENU_PAR_ROLE, ElementMenuRole } from '../../modeles/menusParRole';
import { obtenirCheminTableauDeBordParRole } from '../../routes/cheminsApplication';
import { RoleUtilisateur } from '../../modeles/types';

interface ProprietesBarreLaterale {
  menuMobileOuvert: boolean;
  surFermerMenuMobile: () => void;
}

const LIBELLES_ESPACE_ROLE: Record<RoleUtilisateur, { titreEn: string; titreFr: string; couleur: string }> = {
  administrateur: { titreEn: 'Director & Admin', titreFr: 'Direction & Admin', couleur: 'bg-red-600' },
  professeur: { titreEn: 'Faculty Portal', titreFr: 'Portail Enseignant', couleur: 'bg-blue-600' },
  eleve: { titreEn: 'Student Portal', titreFr: 'Portail Élève', couleur: 'bg-purple-600' },
  parent: { titreEn: 'Guardian & Family', titreFr: 'Parent & Tuteur', couleur: 'bg-amber-600' },
  secretaire: { titreEn: 'Registrar & Desk', titreFr: 'Secrétariat & Scolarité', couleur: 'bg-indigo-600' },
  comptable: { titreEn: 'Bursar & Treasury', titreFr: 'Comptabilité & Économe', couleur: 'bg-emerald-600' },
  ressources_humaines: { titreEn: 'Human Resources', titreFr: 'Ressources Humaines', couleur: 'bg-rose-600' },
  bibliothecaire: { titreEn: 'Library Center', titreFr: 'Bibliothèque & Médias', couleur: 'bg-teal-600' },
  charge_communication: { titreEn: 'Public Relations', titreFr: 'Communication & Médias', couleur: 'bg-cyan-600' },
};

export const BarreLaterale: React.FC<ProprietesBarreLaterale> = ({
  menuMobileOuvert,
  surFermerMenuMobile,
}) => {
  const { roleActif, langueActuelle, traduire } = utiliserAcademie();
  const emplacement = useLocation();
  const naviguer = useNavigate();

  const elementsNavigation: ElementMenuRole[] = OBTENIR_MENU_PAR_ROLE(roleActif);
  const infosEspace = LIBELLES_ESPACE_ROLE[roleActif] || LIBELLES_ESPACE_ROLE.administrateur;

  const verifierElementActif = (item: ElementMenuRole): boolean => {
    const cheminActuel = emplacement.pathname;
    const cheminTableauDeBordRole = obtenirCheminTableauDeBordParRole(roleActif);

    if (item.estTableauDeBord) {
      if (cheminActuel === '/tableau-de-bord' || cheminActuel === cheminTableauDeBordRole) {
        return true;
      }
      return cheminActuel.startsWith(cheminTableauDeBordRole) && !elementsNavigation.some(
        (autre) => !autre.estTableauDeBord && autre.chemin === cheminActuel
      );
    }

    if (item.chemin === cheminActuel) {
      return true;
    }

    if (item.chemin.includes('/tableau-de-bord/') && cheminActuel.startsWith(item.chemin)) {
      return true;
    }

    if (!item.chemin.includes('/tableau-de-bord/') && item.chemin !== '/' && cheminActuel.startsWith(item.chemin)) {
      return true;
    }

    return false;
  };

  const naviguerVersChemin = (chemin: string) => {
    naviguer(chemin);
    surFermerMenuMobile();
  };

  return (
    <>
      {menuMobileOuvert && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
          onClick={surFermerMenuMobile}
        />
      )}

      <aside
        id="barre-laterale-contextuelle"
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-200 lg:static lg:translate-x-0 ${
          menuMobileOuvert ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile Header */}
        <div className="h-16 px-5 border-b border-slate-200 flex items-center justify-between lg:hidden">
          <span className="font-bold text-slate-900 text-sm">{traduire('nomEtablissement')}</span>
          <button
            type="button"
            onClick={surFermerMenuMobile}
            className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Workspace Banner */}
        <div className="px-4 py-3.5 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${infosEspace.couleur}`} />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                {langueActuelle === 'fr' ? 'Espace Rôle Dédié' : 'Contextual Workspace'}
              </span>
              <span className="text-xs font-bold text-slate-900 truncate block">
                {langueActuelle === 'fr' ? infosEspace.titreFr : infosEspace.titreEn}
              </span>
            </div>
          </div>
        </div>

        {/* Contextual Navigation Items */}
        <div className="p-3.5 flex-1 overflow-y-auto space-y-1">
          <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {langueActuelle === 'fr' ? 'Menu Principal' : 'Dedicated Navigation'}
          </div>

          {elementsNavigation.map((item) => {
            const Icone = item.icone;
            const estActif = verifierElementActif(item);
            const libelleAffiche = langueActuelle === 'fr' ? item.libelleFr : item.libelleEn;

            return (
              <button
                key={item.identifiant}
                type="button"
                id={`menu-lateral-${item.identifiant}`}
                onClick={() => naviguerVersChemin(item.chemin)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold min-h-[42px] transition-all text-left cursor-pointer group ${
                  estActif
                    ? 'bg-red-50 text-red-700 border-l-4 border-red-600 shadow-2xs font-bold'
                    : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900 border-l-4 border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icone
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      estActif ? 'text-red-600' : 'text-slate-400 group-hover:text-slate-700'
                    }`}
                  />
                  <span className="truncate">{libelleAffiche}</span>
                </div>

                {estActif ? (
                  <ChevronRight className="w-3.5 h-3.5 text-red-600 shrink-0" />
                ) : item.badge ? (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Academic Status Card */}
        <div className="p-3.5 border-t border-slate-200 bg-slate-50/60">
          <div className="rounded-xl p-3 bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-900">{traduire('trimestreActif')}</span>
              </div>
              <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                Live
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">{traduire('anneeScolaire')}</p>
          </div>
        </div>
      </aside>
    </>
  );
};
