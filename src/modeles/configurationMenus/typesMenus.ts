import { CleTraduction } from '../traductions';
import { TypeIcone } from '../../composants/communs/Icone';

export interface ElementMenuNavigation {
  cle: string;
  chemin: string;
  libelleCle: CleTraduction;
  icone: TypeIcone;
}
