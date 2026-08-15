import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Shield,
  BookOpen,
  GraduationCap,
  Users,
  CreditCard,
  Briefcase,
  Building2,
  Megaphone,
  X,
} from 'lucide-react';
import { utiliserAcademie } from '../../controleurs/contexteAcademie';
import { CHEMINS_APPLICATION, obtenirCheminTableauDeBordParRole } from '../../routes/cheminsApplication';

interface ProprietesBarreLaterale {
  menuMobileOuvert: boolean;
  surFermerMenuMobile: () => void;
}

export const BarreLaterale: React.FC<ProprietesBarreLaterale> = ({
  menuMobileOuvert,
  surFermerMenuMobile,
}) => {
  const { roleActif, traduire } = utiliserAcademie();
  const emplacement = useLocation();
  const naviguer = useNavigate();

  const cheminTableauDeBord = obtenirCheminTableauDeBordParRole(roleActif);

  const elementsNavigation = [
    {
      cle: 'tableau_de_bord',
      chemin: cheminTableauDeBord,
      estActif: emplacement.pathname.startsWith('/tableau-de-bord'),
      libelleCle: 'module_tableau_de_bord' as const,
      icone: LayoutDashboard,
    },
    {
      cle: 'administration',
      chemin: CHEMINS_APPLICATION.ADMINISTRATION,
      estActif: emplacement.pathname.startsWith(CHEMINS_APPLICATION.ADMINISTRATION),
      libelleCle: 'module_administration' as const,
      icone: Shield,
    },
    {
      cle: 'professeurs',
      chemin: CHEMINS_APPLICATION.PROFESSEURS,
      estActif: emplacement.pathname.startsWith(CHEMINS_APPLICATION.PROFESSEURS),
      libelleCle: 'module_professeurs' as const,
      icone: BookOpen,
    },
    {
      cle: 'eleves',
      chemin: CHEMINS_APPLICATION.ELEVES,
      estActif: emplacement.pathname.startsWith(CHEMINS_APPLICATION.ELEVES),
      libelleCle: 'module_eleves' as const,
      icone: GraduationCap,
    },
    {
      cle: 'parents',
      chemin: CHEMINS_APPLICATION.PARENTS,
      estActif: emplacement.pathname.startsWith(CHEMINS_APPLICATION.PARENTS),
      libelleCle: 'module_parents' as const,
      icone: Users,
    },
    {
      cle: 'comptabilite',
      chemin: CHEMINS_APPLICATION.COMPTABILITE,
      estActif: emplacement.pathname.startsWith(CHEMINS_APPLICATION.COMPTABILITE),
      libelleCle: 'module_comptabilite' as const,
      icone: CreditCard,
    },
    {
      cle: 'ressources_humaines',
      chemin: CHEMINS_APPLICATION.RESSOURCES_HUMAINES,
      estActif: emplacement.pathname.startsWith(CHEMINS_APPLICATION.RESSOURCES_HUMAINES),
      libelleCle: 'module_ressources_humaines' as const,
      icone: Briefcase,
    },
    {
      cle: 'bibliotheque',
      chemin: CHEMINS_APPLICATION.BIBLIOTHEQUE,
      estActif: emplacement.pathname.startsWith(CHEMINS_APPLICATION.BIBLIOTHEQUE),
      libelleCle: 'module_bibliotheque' as const,
      icone: Building2,
    },
    {
      cle: 'communication',
      chemin: CHEMINS_APPLICATION.COMMUNICATION,
      estActif: emplacement.pathname.startsWith(CHEMINS_APPLICATION.COMMUNICATION),
      libelleCle: 'module_communication' as const,
      icone: Megaphone,
    },
  ];

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
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-200 lg:static lg:translate-x-0 ${
          menuMobileOuvert ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 px-6 border-b border-slate-200 flex items-center justify-between lg:hidden">
          <span className="font-bold text-slate-900 text-sm">{traduire('nomEtablissement')}</span>
          <button
            type="button"
            onClick={surFermerMenuMobile}
            className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto space-y-1.5">
          <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {traduire('changerRole')}
          </div>

          {elementsNavigation.map((item) => {
            const Icone = item.icone;

            return (
              <button
                key={item.cle}
                type="button"
                onClick={() => naviguerVersChemin(item.chemin)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold min-h-[44px] transition-all text-left cursor-pointer ${
                  item.estActif
                    ? 'bg-red-50 text-red-700 font-bold border-l-4 border-red-600'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icone className={`w-4 h-4 shrink-0 ${item.estActif ? 'text-red-600' : 'text-slate-500'}`} />
                <span>{traduire(item.libelleCle)}</span>
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-200 bg-slate-50">
          <div className="rounded-xl p-3 bg-white border border-slate-200">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-slate-900">{traduire('trimestreActif')}</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">{traduire('anneeScolaire')}</p>
          </div>
        </div>
      </aside>
    </>
  );
};
