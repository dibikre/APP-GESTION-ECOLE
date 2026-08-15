import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { X, LucideIcon } from 'lucide-react';
import { utiliserAcademie } from '../../controleurs/contexteAcademie';
import { obtenirElementsMenuParRole } from '../../modeles/configurationMenus';
import { CleTraduction } from '../../modeles/traductions';

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

  const elementsNavigation = obtenirElementsMenuParRole(roleActif);

  const naviguerVersChemin = (chemin: string) => {
    naviguer(chemin);
    surFermerMenuMobile();
  };

  const verifierEstActif = (itemChemin: string, itemCle: string): boolean => {
    if (itemCle === 'tableau_de_bord') {
      const autresElements = elementsNavigation.filter((el) => el.cle !== 'tableau_de_bord');
      const correspondAutre = autresElements.some((el) => emplacement.pathname.startsWith(el.chemin));
      if (correspondAutre) return false;
      return emplacement.pathname.startsWith('/tableau-de-bord') || emplacement.pathname === '/';
    }
    return emplacement.pathname === itemChemin || emplacement.pathname.startsWith(itemChemin);
  };

  const cleLibelleRole: CleTraduction = `role_${roleActif}` as CleTraduction;

  return (
    <>
      {menuMobileOuvert && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
          onClick={surFermerMenuMobile}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-200 lg:top-16 lg:z-30 lg:translate-x-0 ${
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
          <div className="px-3 py-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Workspace Menu
            </div>
            <div className="text-xs font-bold text-red-600 mt-0.5 truncate">
              {traduire(cleLibelleRole)}
            </div>
          </div>

          <div className="pt-1 space-y-1">
            {elementsNavigation.map((item) => {
              const Icone: LucideIcon = item.icone;
              const estActif = verifierEstActif(item.chemin, item.cle);

              return (
                <button
                  key={item.cle}
                  type="button"
                  onClick={() => naviguerVersChemin(item.chemin)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold min-h-[44px] transition-all text-left cursor-pointer border-l-4 border-b-2 ${
                    estActif
                      ? 'bg-red-50 text-red-700 font-bold border-l-red-600 border-b-red-600 shadow-xs'
                      : 'border-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icone className={`w-4 h-4 shrink-0 ${estActif ? 'text-red-600' : 'text-slate-500'}`} />
                  <span className="truncate">{traduire(item.libelleCle)}</span>
                </button>
              );
            })}
          </div>
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

