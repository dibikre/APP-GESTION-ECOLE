import { RoleUtilisateur } from '../types';
import { obtenirCheminTableauDeBordParRole } from '../../routes/cheminsApplication';
import { ElementMenuNavigation } from './typesMenus';
import { MENUS_PAR_ROLE } from './menusParRole';

export * from './typesMenus';
export * from './menusParRole';

export const obtenirElementsMenuParRole = (role: RoleUtilisateur): ElementMenuNavigation[] => {
  const elements = MENUS_PAR_ROLE[role] || MENUS_PAR_ROLE.administrateur;
  return elements.map((item) => {
    if (item.cle === 'tableau_de_bord') {
      return {
        ...item,
        chemin: obtenirCheminTableauDeBordParRole(role),
      };
    }
    return item;
  });
};
