import { RoleUtilisateur } from '../types';
import { ElementMenuNavigation } from './typesMenus';
import { MENU_ADMINISTRATEUR, MENU_SECRETAIRE } from './menusAdministration';
import { MENU_PROFESSEUR, MENU_ELEVE, MENU_PARENT } from './menusPedagogie';
import {
  MENU_COMPTABLE,
  MENU_RESSOURCES_HUMAINES,
  MENU_BIBLIOTHECAIRE,
  MENU_CHARGE_COMMUNICATION,
} from './menusServices';

export const MENUS_PAR_ROLE: Record<RoleUtilisateur, ElementMenuNavigation[]> = {
  administrateur: MENU_ADMINISTRATEUR,
  professeur: MENU_PROFESSEUR,
  eleve: MENU_ELEVE,
  parent: MENU_PARENT,
  secretaire: MENU_SECRETAIRE,
  comptable: MENU_COMPTABLE,
  ressources_humaines: MENU_RESSOURCES_HUMAINES,
  bibliothecaire: MENU_BIBLIOTHECAIRE,
  charge_communication: MENU_CHARGE_COMMUNICATION,
};
