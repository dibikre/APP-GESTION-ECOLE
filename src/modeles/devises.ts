export type CodeDevise =
  | 'USD'
  | 'EUR'
  | 'XOF'
  | 'XAF'
  | 'GBP'
  | 'CAD'
  | 'GNF'
  | 'MAD'
  | 'DZD'
  | 'TND'
  | 'CHF';

export interface DefinitionDevise {
  code: CodeDevise;
  nom: string;
  symbole: string;
  position: 'avant' | 'apres';
  separateurMillier: string;
  description: string;
}

export const DEVISES_DISPONIBLES: DefinitionDevise[] = [
  {
    code: 'USD',
    nom: 'US Dollar ($)',
    symbole: '$',
    position: 'avant',
    separateurMillier: ',',
    description: 'United States Dollar & International benchmark',
  },
  {
    code: 'EUR',
    nom: 'Euro (€)',
    symbole: '€',
    position: 'apres',
    separateurMillier: ' ',
    description: 'European Union standard currency',
  },
  {
    code: 'XOF',
    nom: 'Franc CFA UEMOA (FCFA)',
    symbole: 'FCFA',
    position: 'apres',
    separateurMillier: ' ',
    description: 'West African Economic and Monetary Union (BCEAO)',
  },
  {
    code: 'XAF',
    nom: 'Franc CFA CEMAC (FCFA)',
    symbole: 'FCFA',
    position: 'apres',
    separateurMillier: ' ',
    description: 'Central African Economic and Monetary Community (BEAC)',
  },
  {
    code: 'GBP',
    nom: 'British Pound (£)',
    symbole: '£',
    position: 'avant',
    separateurMillier: ',',
    description: 'United Kingdom Sterling',
  },
  {
    code: 'CAD',
    nom: 'Canadian Dollar (CA$)',
    symbole: 'CA$',
    position: 'avant',
    separateurMillier: ',',
    description: 'Canadian Dollar',
  },
  {
    code: 'GNF',
    nom: 'Franc Guinéen (GNF)',
    symbole: 'GNF',
    position: 'apres',
    separateurMillier: ' ',
    description: 'Republic of Guinea Franc',
  },
  {
    code: 'MAD',
    nom: 'Dirham Marocain (MAD)',
    symbole: 'MAD',
    position: 'apres',
    separateurMillier: ' ',
    description: 'Kingdom of Morocco Dirham',
  },
  {
    code: 'DZD',
    nom: 'Dinar Algérien (DZD)',
    symbole: 'DZD',
    position: 'apres',
    separateurMillier: ' ',
    description: 'People\'s Democratic Republic of Algeria Dinar',
  },
  {
    code: 'TND',
    nom: 'Dinar Tunisien (TND)',
    symbole: 'TND',
    position: 'apres',
    separateurMillier: ' ',
    description: 'Republic of Tunisia Dinar',
  },
  {
    code: 'CHF',
    nom: 'Franc Suisse (CHF)',
    symbole: 'CHF',
    position: 'apres',
    separateurMillier: '\'',
    description: 'Swiss Confederation Franc',
  },
];

export const OBTENIR_DEFINITION_DEVISE = (code: CodeDevise): DefinitionDevise => {
  return DEVISES_DISPONIBLES.find((d) => d.code === code) || DEVISES_DISPONIBLES[0];
};

export const formaterMontantDevise = (montant: number, codeDevise: CodeDevise): string => {
  const definition = OBTENIR_DEFINITION_DEVISE(codeDevise);
  const nombreArrondi = Math.round(montant);
  const chaineNombre = nombreArrondi.toLocaleString('en-US').replace(/,/g, definition.separateurMillier);

  if (definition.position === 'avant') {
    return `${definition.symbole}${chaineNombre}`;
  }
  return `${chaineNombre} ${definition.symbole}`;
};
