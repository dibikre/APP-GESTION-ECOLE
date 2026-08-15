import React, { useState } from 'react';
import { EnteteNavigation } from '../composants/communs/EnteteNavigation';
import { BarreLaterale } from '../composants/communs/BarreLaterale';
import { RouteurPrincipal } from '../routes/RouteurPrincipal';
import { utiliserAcademie } from '../controleurs/contexteAcademie';

export const VuePrincipale: React.FC = () => {
  const [menuMobileOuvert, setMenuMobileOuvert] = useState(false);
  const { traduire } = utiliserAcademie();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-red-100 selection:text-red-900">
      <EnteteNavigation surBasculerMenuMobile={() => setMenuMobileOuvert(!menuMobileOuvert)} />

      <div className="flex-1 flex w-full">
        <BarreLaterale
          menuMobileOuvert={menuMobileOuvert}
          surFermerMenuMobile={() => setMenuMobileOuvert(false)}
        />

        <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-6 max-w-full overflow-x-hidden lg:ml-64">
          <div className="w-full mx-auto animate-in fade-in duration-200">
            <RouteurPrincipal />
          </div>
        </main>
      </div>

      <footer className="bg-white border-t border-slate-200 py-4 px-6 text-center text-xs text-slate-500 lg:ml-64">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
          <span>&copy; {new Date().getFullYear()} {traduire('nomEtablissement')}. {traduire('droitsReserves')}</span>
          <span>{traduire('editionEntreprise')}</span>
        </div>
      </footer>
    </div>
  );
};
