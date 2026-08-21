import React, { useState } from 'react';
import {
  HeartPulse,
  ShieldAlert,
  Phone,
  User,
  Plus,
  Edit2,
  CheckCircle,
  FileText,
  AlertCircle,
  Stethoscope,
  Activity,
  Save,
  Hospital,
} from 'lucide-react';
import { BoutonRouge } from '../../../composants/communs/BoutonRouge';

interface ContactUrgence {
  id: string;
  nom: string;
  relation: string;
  telephone: string;
  priorite: number;
}

export const OngletParentSanteUrgences: React.FC = () => {
  const [enfantSelectionne, setEnfantSelectionne] = useState<'marcus' | 'sophie'>('sophie');

  // Contacts d'urgence éditables
  const [contacts, setContacts] = useState<ContactUrgence[]>([
    { id: 'c1', nom: 'Eleanor Vance', relation: 'Mère (Tutrice Principale)', telephone: '+33 6 12 34 56 78', priorite: 1 },
    { id: 'c2', nom: 'David Vance', relation: 'Père (Tuteur Légal)', telephone: '+33 6 98 76 54 32', priorite: 2 },
    { id: 'c3', nom: 'Dr. Martin Lemercier', relation: 'Médecin Traitant Référent', telephone: '+33 1 45 67 89 00', priorite: 3 },
  ]);

  const [sauvegardeSucces, setSauvegardeSucces] = useState(false);
  const [autorisationSoins, setAutorisationSoins] = useState(true);

  const enregistrerModifications = (e: React.FormEvent) => {
    e.preventDefault();
    setSauvegardeSucces(true);
    setTimeout(() => setSauvegardeSucces(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <HeartPulse className="w-6 h-6 text-red-600" />
            Dossier Médical, PAI & Contacts d'Urgence
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Fiches médicales scolaires, Projet d'Accueil Individualisé (PAI), vaccinations obligatoires et chaîne d'alerte en cas d'urgence.
          </p>
        </div>

        {/* Sélecteur d'enfant */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <button
            type="button"
            onClick={() => setEnfantSelectionne('sophie')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              enfantSelectionne === 'sophie' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sophie (6ème A - PAI Actif)
          </button>
          <button
            type="button"
            onClick={() => setEnfantSelectionne('marcus')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              enfantSelectionne === 'marcus' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Marcus (1ère C)
          </button>
        </div>
      </div>

      {sauvegardeSucces && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-bold text-emerald-900 flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Fiche médicale et contacts d'urgence mis à jour avec succès auprès de l'infirmerie scolaire !</span>
        </div>
      )}

      {/* Détail du Dossier Médical de l'enfant sélectionné */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne gauche : Synthèse Médicale & PAI */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-red-600" />
                <h3 className="text-sm font-black text-slate-900">
                  Fiche de Santé Scolaire &bull; {enfantSelectionne === 'sophie' ? 'Sophie Vance (6ème A)' : 'Marcus Vance (1ère C)'}
                </h3>
              </div>
              <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Dossier Conforme 2025-2026
              </span>
            </div>

            {/* Alerte PAI si Sophie */}
            {enfantSelectionne === 'sophie' ? (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
                  <span className="font-black text-amber-900">PAI Actif : Allergie Sévère aux Arachides & Fruits à Coque</span>
                </div>
                <p className="text-amber-800 leading-relaxed">
                  Trousse d'urgence avec <strong>2 stylos auto-injecteurs d'adrénaline (Epipen 0.15mg)</strong> et antihistaminiques déposés à l'infirmerie scolaire (armoire d'urgence n°2) et dans le sac de l'élève.
                </p>
                <div className="flex items-center gap-4 text-[11px] text-amber-900 font-bold pt-1">
                  <span>Signé le : 05 Septembre 2025</span>
                  <span>Médecin scolaire : Dr. Isabelle Fontaine</span>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
                <span className="font-bold text-slate-900 block mb-1">Aucun PAI (Projet d'Accueil Individualisé) nécessaire :</span>
                <p>Marcus ne présente aucune contre-indication médicale connue pour les activités sportives (EPS) ni les sorties scolaires.</p>
              </div>
            )}

            {/* Données physiologiques & vaccins */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold block">Groupe Sanguin</span>
                <span className="text-sm font-black text-slate-900 mt-0.5 block">
                  {enfantSelectionne === 'sophie' ? 'O Rhésus +' : 'A Rhésus +'}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold block">Vaccin DTPolio</span>
                <span className="text-xs font-bold text-emerald-700 mt-0.5 block">À jour (Rappel 2024)</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold block">Vaccin ROR / Hépatite</span>
                <span className="text-xs font-bold text-emerald-700 mt-0.5 block">À jour (2 doses)</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold block">Aptitude Sportive</span>
                <span className="text-xs font-bold text-slate-900 mt-0.5 block">Apte 100% EPS</span>
              </div>
            </div>

            {/* Médecin Référent */}
            <div className="p-3.5 bg-slate-50/70 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-bold">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Dr. Martin Lemercier (Pédiatre & Médecin Traitant)</span>
                  <span className="text-[11px] text-slate-500">Cabinet Médical des Pins &bull; 14 Avenue Foch, Paris</span>
                </div>
              </div>
              <a
                href="tel:+33145678900"
                className="px-3 py-1.5 bg-white hover:bg-slate-100 text-red-600 rounded-lg border border-slate-200 font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5" />
                Appeler
              </a>
            </div>
          </div>

          {/* Historique des Passages à l'Infirmerie Scolaire */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-red-600" />
                <h3 className="text-sm font-black text-slate-900">Registre des Soins & Passages à l'Infirmerie</h3>
              </div>
              <span className="text-xs text-slate-500">Année 2025-2026</span>
            </div>

            {enfantSelectionne === 'sophie' ? (
              <div className="divide-y divide-slate-100 text-xs">
                <div className="py-2.5 flex items-start justify-between gap-3">
                  <div>
                    <span className="font-bold text-slate-900 block">Malaise léger / Maux de tête après cours de sport</span>
                    <p className="text-[11px] text-slate-600 mt-0.5">Repos de 20 minutes en salle d'infirmerie, prise de tension normale (11/7) et verre d'eau sucrée. Retour en classe à 15h30.</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-slate-400 font-semibold block">18 Janvier 2026</span>
                    <span className="text-[10px] text-emerald-700 font-bold">Soigné sur place</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-slate-400">
                Aucun passage à l'infirmerie enregistré pour Marcus au cours de cette année scolaire.
              </div>
            )}
          </div>
        </div>

        {/* Colonne droite : Contacts d'Urgence Hiérarchisés */}
        <div className="space-y-6">
          <form onSubmit={enregistrerModifications} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4 text-xs">
            <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-red-600" />
                Contacts d'Urgence Prioritaires
              </h3>
            </div>

            <div className="space-y-3">
              {contacts.map((contact, idx) => (
                <div key={contact.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                      Priorité #{contact.priorite}
                    </span>
                    <span className="text-[10px] text-slate-400">{contact.relation}</span>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-500 font-bold block">Nom complet :</label>
                    <input
                      type="text"
                      value={contact.nom}
                      onChange={(e) => {
                        const val = e.target.value;
                        setContacts((prev) => prev.map((c) => (c.id === contact.id ? { ...c, nom: val } : c)));
                      }}
                      className="w-full mt-0.5 p-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-500 font-bold block">Téléphone direct :</label>
                    <input
                      type="tel"
                      value={contact.telephone}
                      onChange={(e) => {
                        const val = e.target.value;
                        setContacts((prev) => prev.map((c) => (c.id === contact.id ? { ...c, telephone: val } : c)));
                      }}
                      className="w-full mt-0.5 p-2 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-900"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Autorisation d'urgence */}
            <div className="pt-2 border-t border-slate-100">
              <label className="flex items-start gap-2.5 p-2.5 bg-red-50/50 rounded-xl border border-red-100 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autorisationSoins}
                  onChange={(e) => setAutorisationSoins(e.target.checked)}
                  className="w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500 mt-0.5"
                />
                <span className="text-[11px] text-slate-700 leading-snug">
                  <strong>Autorisation d'intervention d'urgence :</strong> J'autorise l'établissement à faire appel aux services de secours (SAMU 15 / Pompiers 18) et à transférer mon enfant vers l'hôpital le plus proche en cas de nécessité vitale.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Enregistrer les Contacts d'Urgence</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
