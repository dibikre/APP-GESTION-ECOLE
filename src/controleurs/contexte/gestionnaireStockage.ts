export const recupererDonneesLocales = <T>(cle: string, donneesParDefaut: T): T => {
  try {
    const enregistrement = localStorage.getItem(cle);
    return enregistrement ? JSON.parse(enregistrement) : donneesParDefaut;
  } catch (erreur) {
    console.error(`Erreur lecture stockage ${cle}:`, erreur);
    return donneesParDefaut;
  }
};

export const sauvegarderDonneesLocales = <T>(cle: string, donnees: T): void => {
  try {
    localStorage.setItem(cle, JSON.stringify(donnees));
  } catch (erreur) {
    console.error(`Erreur écriture stockage ${cle}:`, erreur);
  }
};
