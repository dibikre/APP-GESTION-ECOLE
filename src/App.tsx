/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { FournisseurAcademie } from './controleurs/contexteAcademie';
import { VuePrincipale } from './vues/VuePrincipale';

export default function App() {
  return (
    <BrowserRouter>
      <FournisseurAcademie>
        <VuePrincipale />
      </FournisseurAcademie>
    </BrowserRouter>
  );
}
