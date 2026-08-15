export interface DefinitionClasse {
  code: string;
  nomCourt: string;
  nomComplet: string;
  niveau: '6e' | '5e' | '4e' | '3e' | '2nde' | '1ere' | 'terminale';
  cycle: 'college' | 'lycee';
  serie?: 'Generale' | 'A' | 'C' | 'D' | 'STMG' | 'Scientifique' | 'Litteraire';
  descriptionEn: string;
}

export const NIVEAUX_SECONDAIRE = [
  '6e',
  '5e',
  '4e',
  '3e',
  '2nde',
  '1ere',
  'terminale',
] as const;

export const CLASSES_SECONDAIRE: DefinitionClasse[] = [
  // --- Cycle Collège (Middle School: 6e -> 3e) ---
  {
    code: '6e A',
    nomCourt: '6ème A',
    nomComplet: 'Sixième A (Grade 6-A)',
    niveau: '6e',
    cycle: 'college',
    descriptionEn: '6th Grade - Section A (Collège Entry)',
  },
  {
    code: '6e B',
    nomCourt: '6ème B',
    nomComplet: 'Sixième B (Grade 6-B)',
    niveau: '6e',
    cycle: 'college',
    descriptionEn: '6th Grade - Section B (Collège Entry)',
  },
  {
    code: '5e A',
    nomCourt: '5ème A',
    nomComplet: 'Cinquième A (Grade 7-A)',
    niveau: '5e',
    cycle: 'college',
    descriptionEn: '7th Grade - Section A',
  },
  {
    code: '5e B',
    nomCourt: '5ème B',
    nomComplet: 'Cinquième B (Grade 7-B)',
    niveau: '5e',
    cycle: 'college',
    descriptionEn: '7th Grade - Section B',
  },
  {
    code: '4e A',
    nomCourt: '4ème A',
    nomComplet: 'Quatrième A (Grade 8-A)',
    niveau: '4e',
    cycle: 'college',
    descriptionEn: '8th Grade - Section A',
  },
  {
    code: '4e B',
    nomCourt: '4ème B',
    nomComplet: 'Quatrième B (Grade 8-B)',
    niveau: '4e',
    cycle: 'college',
    descriptionEn: '8th Grade - Section B',
  },
  {
    code: '3e A',
    nomCourt: '3ème A',
    nomComplet: 'Troisième A (Grade 9-A - Brevet)',
    niveau: '3e',
    cycle: 'college',
    descriptionEn: '9th Grade - Section A (Brevet Examination Year)',
  },
  {
    code: '3e B',
    nomCourt: '3ème B',
    nomComplet: 'Troisième B (Grade 9-B - Brevet)',
    niveau: '3e',
    cycle: 'college',
    descriptionEn: '9th Grade - Section B (Brevet Examination Year)',
  },

  // --- Cycle Lycée (High School: 2nde -> Terminale) ---
  {
    code: '2nde A',
    nomCourt: '2nde A',
    nomComplet: 'Seconde Générale A (Grade 10-A)',
    niveau: '2nde',
    cycle: 'lycee',
    serie: 'Generale',
    descriptionEn: '10th Grade - General High School Section A',
  },
  {
    code: '2nde C',
    nomCourt: '2nde C',
    nomComplet: 'Seconde Scientifique C (Grade 10-C)',
    niveau: '2nde',
    cycle: 'lycee',
    serie: 'Scientifique',
    descriptionEn: '10th Grade - STEM & Science Stream',
  },
  {
    code: '1ère A',
    nomCourt: '1ère A',
    nomComplet: 'Première Littéraire A (Grade 11-A)',
    niveau: '1ere',
    cycle: 'lycee',
    serie: 'A',
    descriptionEn: '11th Grade - Literature & Humanities Track',
  },
  {
    code: '1ère C',
    nomCourt: '1ère C',
    nomComplet: 'Première Mathématiques C (Grade 11-C)',
    niveau: '1ere',
    cycle: 'lycee',
    serie: 'C',
    descriptionEn: '11th Grade - Advanced Maths & Physics Track',
  },
  {
    code: '1ère D',
    nomCourt: '1ère D',
    nomComplet: 'Première Biologie/SVT D (Grade 11-D)',
    niveau: '1ere',
    cycle: 'lycee',
    serie: 'D',
    descriptionEn: '11th Grade - Biology & Life Sciences Track',
  },
  {
    code: 'Tle A',
    nomCourt: 'Tle A',
    nomComplet: 'Terminale Littéraire A (Grade 12-A - Bac)',
    niveau: 'terminale',
    cycle: 'lycee',
    serie: 'A',
    descriptionEn: '12th Grade - Terminale Literature (Baccalaureate Year)',
  },
  {
    code: 'Tle C',
    nomCourt: 'Tle C',
    nomComplet: 'Terminale Mathématiques C (Grade 12-C - Bac)',
    niveau: 'terminale',
    cycle: 'lycee',
    serie: 'C',
    descriptionEn: '12th Grade - Terminale Maths & Physics (Baccalaureate Year)',
  },
  {
    code: 'Tle D',
    nomCourt: 'Tle D',
    nomComplet: 'Terminale Sciences D (Grade 12-D - Bac)',
    niveau: 'terminale',
    cycle: 'lycee',
    serie: 'D',
    descriptionEn: '12th Grade - Terminale Life Sciences (Baccalaureate Year)',
  },
];

export const LISTE_CODES_CLASSES = CLASSES_SECONDAIRE.map((c) => c.code);

export const OBTENIR_CLASSES_PAR_CYCLE = (cycle: 'college' | 'lycee') =>
  CLASSES_SECONDAIRE.filter((c) => c.cycle === cycle);

export const OBTENIR_CLASSE_PAR_CODE = (code: string) =>
  CLASSES_SECONDAIRE.find((c) => c.code === code || c.nomCourt === code);
