import { TRADUCTIONS_FRANCAIS } from './traductions/traductionsFrancais';

export type LangueApplication = 'fr';

export const DICTIONNAIRE_TRADUCTIONS = {
  fr: TRADUCTIONS_FRANCAIS,
};

export const TRADUCTIONS = TRADUCTIONS_FRANCAIS;
export type CleTraduction = keyof typeof TRADUCTIONS_FRANCAIS;

