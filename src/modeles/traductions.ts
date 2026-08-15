import { TRADUCTIONS_FRANCAIS } from './traductions/traductionsFrancais';
import { TRADUCTIONS_ANGLAIS } from './traductions/traductionsAnglais';

export type LangueApplication = 'fr' | 'en';

export const DICTIONNAIRE_TRADUCTIONS = {
  fr: TRADUCTIONS_FRANCAIS,
  en: TRADUCTIONS_ANGLAIS,
};

export type CleTraduction = keyof typeof TRADUCTIONS_FRANCAIS;
