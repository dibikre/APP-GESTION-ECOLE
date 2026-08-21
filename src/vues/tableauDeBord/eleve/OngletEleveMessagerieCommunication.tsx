import React, { useState, useMemo } from 'react';
import {
  MessageSquare,
  Send,
  User,
  Paperclip,
  ShieldCheck,
  Megaphone,
  Users,
  CheckCircle2,
  Clock,
  Download,
  Plus,
  Sparkles,
  FileText,
  AlertCircle,
  Search,
  ArrowLeft,
  Circle,
  MessageCircle,
  UserCheck,
  CheckCheck,
  Building2,
  GraduationCap,
} from 'lucide-react';
import { BoutonRouge } from '../../../composants/communs/BoutonRouge';
import {
  MESSAGES_CHAT_PROFESSEURS_INITIAUX,
  MESSAGES_ADMINISTRATION_INITIAUX,
  SUJETS_FORUM_CLASSE_INITIAUX,
} from '../../../modeles/donneesInitiales/donneesEleveEtendu';
import {
  MessageChatProfesseur,
  MessageAdministrationEleve,
  SujetForumClasse,
} from '../../../modeles/typesEtendus';

export interface InterlocuteurContact {
  id: string;
  nom: string;
  role: string;
  matiere: string;
  categorie: 'professeur' | 'administration' | 'orientation';
  enLigne: boolean;
  email: string;
  initiales: string;
  couleurAvatar: string;
  dernierMessage?: string;
  heureDernierMessage?: string;
}

const INTERLOCUTEURS_DISPONIBLES: InterlocuteurContact[] = [
  {
    id: 'prof-1',
    nom: 'Prof. Evelyn Reed',
    role: 'Professeure Principale & Enseignante',
    matiere: 'Mathématiques Approfondies',
    categorie: 'professeur',
    enLigne: true,
    email: 'e.reed@academy.edu',
    initiales: 'ER',
    couleurAvatar: 'bg-red-100 text-red-700',
    dernierMessage: 'Bonjour Marcus. Une double intégration par parties est la méthode la plus directe...',
    heureDernierMessage: '17:48',
  },
  {
    id: 'prof-2',
    nom: 'Dr. Robert Chen',
    role: 'Enseignant Chercheur',
    matiere: 'Physique & Chimie',
    categorie: 'professeur',
    enLigne: true,
    email: 'r.chen@academy.edu',
    initiales: 'RC',
    couleurAvatar: 'bg-blue-100 text-blue-700',
    dernierMessage: 'N’oubliez pas d’apporter vos blouses blanches pour la séance de TP d’optique.',
    heureDernierMessage: 'Hier',
  },
  {
    id: 'prof-3',
    nom: 'Sarah Jenkins',
    role: 'Professeure Certifiée',
    matiere: 'Littérature & Philosophie',
    categorie: 'professeur',
    enLigne: false,
    email: 's.jenkins@academy.edu',
    initiales: 'SJ',
    couleurAvatar: 'bg-purple-100 text-purple-700',
    dernierMessage: 'Votre commentaire de texte sur Baudelaire est très bien structuré.',
    heureDernierMessage: 'Mar 02',
  },
  {
    id: 'prof-4',
    nom: 'M. Jean-Paul Durand',
    role: 'Enseignant d’Histoire',
    matiere: 'Histoire-Géographie & Géopolitique',
    categorie: 'professeur',
    enLigne: true,
    email: 'jp.durand@academy.edu',
    initiales: 'JD',
    couleurAvatar: 'bg-amber-100 text-amber-700',
    dernierMessage: 'La carte de synthèse sur les flux mondiaux est à rendre pour vendredi.',
    heureDernierMessage: 'Lun 01',
  },
  {
    id: 'prof-5',
    nom: 'Mme Hélène Valette',
    role: 'Enseignante Spécialité',
    matiere: 'Sciences de l’Ingénieur & Mécatronique',
    categorie: 'professeur',
    enLigne: true,
    email: 'h.valette@academy.edu',
    initiales: 'HV',
    couleurAvatar: 'bg-teal-100 text-teal-700',
    dernierMessage: 'Le projet de CAO SolidWorks a été validé avec mention.',
    heureDernierMessage: '28 Fév',
  },
  {
    id: 'admin-cpe',
    nom: 'M. David Moreau',
    role: 'Conseiller Principal d’Éducation (CPE)',
    matiere: 'Vie Scolaire & Suivi des Élèves',
    categorie: 'administration',
    enLigne: true,
    email: 'vie-scolaire@academy.edu',
    initiales: 'DM',
    couleurAvatar: 'bg-emerald-100 text-emerald-700',
    dernierMessage: 'Votre justificatif médical pour le mardi 17 a bien été validé.',
    heureDernierMessage: '26 Fév',
  },
  {
    id: 'admin-orientation',
    nom: 'Thomas Bernard',
    role: 'Conseiller d’Orientation & Parcoursup',
    matiere: 'Orientation & Enseignement Supérieur',
    categorie: 'orientation',
    enLigne: false,
    email: 'orientation@academy.edu',
    initiales: 'TB',
    couleurAvatar: 'bg-indigo-100 text-indigo-700',
    dernierMessage: 'Créneaux d’entretiens individuels ouverts pour les prépas scientifiques.',
    heureDernierMessage: '20 Fév',
  },
];

export const OngletEleveMessagerieCommunication: React.FC = () => {
  const [vueOnglet, setVueOnglet] = useState<'chat' | 'administration' | 'forum'>('chat');

  // État de la sélection de la personne avec qui converser
  const [personneSelectionnee, setPersonneSelectionnee] = useState<InterlocuteurContact | null>(null);
  const [rechercheContact, setRechercheContact] = useState('');
  const [filtreCategorie, setFiltreCategorie] = useState<'tous' | 'professeur' | 'administration' | 'enLigne'>('tous');

  // Messages Chat
  const [messagesChat, setMessagesChat] = useState<MessageChatProfesseur[]>(MESSAGES_CHAT_PROFESSEURS_INITIAUX);
  const [nouveauMessageTexte, setNouveauMessageTexte] = useState('');
  const [nomFichierJoint, setNomFichierJoint] = useState('');

  // État Messages Administration
  const [messagesAdmin, setMessagesAdmin] = useState<MessageAdministrationEleve[]>(MESSAGES_ADMINISTRATION_INITIAUX);
  const [adminMsgSelectionne, setAdminMsgSelectionne] = useState<MessageAdministrationEleve | null>(MESSAGES_ADMINISTRATION_INITIAUX[0]);

  // État Forum de Classe
  const [sujetsForum, setSujetsForum] = useState<SujetForumClasse[]>(SUJETS_FORUM_CLASSE_INITIAUX);
  const [sujetActif, setSujetActif] = useState<SujetForumClasse | null>(SUJETS_FORUM_CLASSE_INITIAUX[0]);
  const [nouveauSujetTitre, setNouveauSujetTitre] = useState('');
  const [nouveauSujetContenu, setNouveauSujetContenu] = useState('');
  const [nouveauSujetMatiere, setNouveauSujetMatiere] = useState('Mathématiques');
  const [modalNouveauSujet, setModalNouveauSujet] = useState(false);
  const [reponseForumTexte, setReponseForumTexte] = useState('');

  // Filtrage des contacts
  const contactsFiltres = useMemo(() => {
    return INTERLOCUTEURS_DISPONIBLES.filter((contact) => {
      const correspondRecherche =
        contact.nom.toLowerCase().includes(rechercheContact.toLowerCase()) ||
        contact.matiere.toLowerCase().includes(rechercheContact.toLowerCase()) ||
        contact.role.toLowerCase().includes(rechercheContact.toLowerCase()) ||
        contact.email.toLowerCase().includes(rechercheContact.toLowerCase());

      if (!correspondRecherche) return false;

      if (filtreCategorie === 'professeur') return contact.categorie === 'professeur';
      if (filtreCategorie === 'administration') return contact.categorie === 'administration' || contact.categorie === 'orientation';
      if (filtreCategorie === 'enLigne') return contact.enLigne;

      return true;
    });
  }, [rechercheContact, filtreCategorie]);

  // Envoi de message chat prof
  const envoyerMessageProf = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nouveauMessageTexte.trim() || !personneSelectionnee) return;

    const contactActuel = personneSelectionnee;
    const texteEnvoye = nouveauMessageTexte.trim();

    const nouveauMsg: MessageChatProfesseur = {
      identifiant: `msg-${Date.now()}`,
      destinataireId: contactActuel.id,
      destinataireNom: contactActuel.nom,
      expediteurNom: 'Marcus Vance',
      expediteurRole: 'eleve',
      matiere: contactActuel.matiere,
      contenu: texteEnvoye,
      dateEnvoi: new Date().toISOString().split('T')[0],
      heureEnvoi: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      lu: true,
      fichierJoint: nomFichierJoint ? { nom: nomFichierJoint, taille: '210 KB' } : undefined,
    };

    setMessagesChat((prev) => [...prev, nouveauMsg]);
    setNouveauMessageTexte('');
    setNomFichierJoint('');

    // Simulation d'une réponse de l'interlocuteur
    setTimeout(() => {
      const reponseAuto: MessageChatProfesseur = {
        identifiant: `msg-${Date.now() + 1}`,
        destinataireId: contactActuel.id,
        destinataireNom: contactActuel.nom,
        expediteurNom: contactActuel.nom,
        expediteurRole: 'professeur',
        matiere: contactActuel.matiere,
        contenu: `Bien reçu Marcus. J'ai pris note de votre message. Je vous réponds précisément très prochainement.`,
        dateEnvoi: new Date().toISOString().split('T')[0],
        heureEnvoi: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        lu: true,
      };
      setMessagesChat((prev) => [...prev, reponseAuto]);
    }, 1200);
  };

  // Envoi de réponse sur le forum
  const envoyerReponseForum = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reponseForumTexte.trim() || !sujetActif) return;

    const nouvelleRep = {
      identifiant: `rep-${Date.now()}`,
      auteurNom: 'Marcus Vance (Délégué)',
      date: `Aujourd'hui à ${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`,
      contenu: reponseForumTexte.trim(),
    };

    setSujetsForum((prev) =>
      prev.map((s) =>
        s.identifiant === sujetActif.identifiant
          ? { ...s, reponses: [...s.reponses, nouvelleRep] }
          : s
      )
    );

    setSujetActif((prev) =>
      prev ? { ...prev, reponses: [...prev.reponses, nouvelleRep] } : null
    );

    setReponseForumTexte('');
  };

  // Création d'un nouveau sujet forum
  const creerSujetForum = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nouveauSujetTitre.trim() || !nouveauSujetContenu.trim()) return;

    const nouv: SujetForumClasse = {
      identifiant: `forum-${Date.now()}`,
      auteurNom: 'Marcus Vance',
      auteurRole: 'delegue',
      matiere: nouveauSujetMatiere,
      titre: nouveauSujetTitre.trim(),
      contenu: nouveauSujetContenu.trim(),
      dateCreation: new Date().toISOString().split('T')[0],
      resolu: false,
      reponses: [],
    };

    setSujetsForum((prev) => [nouv, ...prev]);
    setSujetActif(nouv);
    setNouveauSujetTitre('');
    setNouveauSujetContenu('');
    setModalNouveauSujet(false);
  };

  const messagesFiltresPersonne = personneSelectionnee
    ? messagesChat.filter(
        (m) =>
          (m.destinataireId === personneSelectionnee.id && m.expediteurRole === 'eleve') ||
          (m.expediteurNom === personneSelectionnee.nom && m.expediteurRole === 'professeur')
      )
    : [];

  return (
    <div className="space-y-6">
      {/* En-tête avec onglets de sous-navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-red-600" />
            <h2 className="text-base font-bold text-slate-900">Communication, Messagerie & Entraide de Classe</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Échangez en direct avec vos professeurs, consultez les notifications officielles et collaborez sur le forum 1ère C.
          </p>
        </div>

        <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
          <button
            onClick={() => setVueOnglet('chat')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              vueOnglet === 'chat' ? 'bg-white text-red-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Chat Direct Enseignants
          </button>
          <button
            onClick={() => setVueOnglet('administration')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              vueOnglet === 'administration' ? 'bg-white text-red-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Messages Administration ({messagesAdmin.length})
          </button>
          <button
            onClick={() => setVueOnglet('forum')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              vueOnglet === 'forum' ? 'bg-white text-red-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Forum 1ère C ({sujetsForum.length})
          </button>
        </div>
      </div>

      {/* VUE 1 : CHAT DIRECT AVEC LES ENSEIGNANTS / INTERLOCUTEURS */}
      {vueOnglet === 'chat' && (
        <>
          {!personneSelectionnee ? (
            /* ÉTAT 1 : LISTE DES PERSONNES AVEC RECHERCHE ET FILTRES */
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs min-h-[550px] p-6 space-y-6">
              {/* Barre de Recherche et Filtres */}
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <Users className="w-5 h-5 text-red-600" />
                      Sélectionnez un interlocuteur pour démarrer la discussion
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Professeurs principaux, équipe pédagogique, vie scolaire et conseillers
                    </p>
                  </div>

                  <div className="relative w-full md:w-80">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={rechercheContact}
                      onChange={(e) => setRechercheContact(e.target.value)}
                      placeholder="Rechercher par nom, matière, fonction..."
                      className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-red-500 focus:bg-white transition-all"
                    />
                    {rechercheContact && (
                      <button
                        onClick={() => setRechercheContact('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>

                {/* Filtres par Catégorie */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                  <button
                    onClick={() => setFiltreCategorie('tous')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer shrink-0 ${
                      filtreCategorie === 'tous'
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Tous les contacts ({INTERLOCUTEURS_DISPONIBLES.length})
                  </button>
                  <button
                    onClick={() => setFiltreCategorie('professeur')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer shrink-0 ${
                      filtreCategorie === 'professeur'
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Professeurs ({INTERLOCUTEURS_DISPONIBLES.filter((c) => c.categorie === 'professeur').length})
                  </button>
                  <button
                    onClick={() => setFiltreCategorie('administration')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer shrink-0 ${
                      filtreCategorie === 'administration'
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Vie Scolaire & Orientation ({INTERLOCUTEURS_DISPONIBLES.filter((c) => c.categorie !== 'professeur').length})
                  </button>
                  <button
                    onClick={() => setFiltreCategorie('enLigne')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                      filtreCategorie === 'enLigne'
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                    En ligne ({INTERLOCUTEURS_DISPONIBLES.filter((c) => c.enLigne).length})
                  </button>
                </div>
              </div>

              {/* Grille des Personnes avec qui Converser */}
              {contactsFiltres.length === 0 ? (
                <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <User className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-700">Aucun interlocuteur trouvé pour "{rechercheContact}"</p>
                  <p className="text-[11px] text-slate-400 mt-1">Modifiez votre recherche ou réinitialisez les filtres.</p>
                  <button
                    onClick={() => {
                      setRechercheContact('');
                      setFiltreCategorie('tous');
                    }}
                    className="mt-3 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
                  >
                    Réinitialiser les critères
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {contactsFiltres.map((contact) => (
                    <div
                      key={contact.id}
                      onClick={() => setPersonneSelectionnee(contact)}
                      className="group bg-white hover:bg-slate-50/80 p-4 rounded-2xl border border-slate-200 hover:border-red-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="relative shrink-0">
                            <div className={`w-11 h-11 rounded-2xl ${contact.couleurAvatar} font-bold text-sm flex items-center justify-center shadow-xs`}>
                              {contact.initiales}
                            </div>
                            <span
                              className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                                contact.enLigne ? 'bg-emerald-500' : 'bg-slate-300'
                              }`}
                              title={contact.enLigne ? 'En ligne actuellement' : 'Hors ligne'}
                            />
                          </div>

                          <div>
                            <h4 className="text-xs font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                              {contact.nom}
                            </h4>
                            <span className="text-[11px] font-semibold text-slate-600 block mt-0.5">
                              {contact.matiere}
                            </span>
                            <span className="text-[10px] text-slate-400 block">
                              {contact.role}
                            </span>
                          </div>
                        </div>

                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase shrink-0 ${
                          contact.enLigne ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {contact.enLigne ? 'En ligne' : 'Hors ligne'}
                        </span>
                      </div>

                      {/* Aperçu du dernier message */}
                      {contact.dernierMessage && (
                        <div className="p-2.5 bg-slate-50 group-hover:bg-white rounded-xl border border-slate-100 text-xs text-slate-600 space-y-1 transition-colors">
                          <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                            <span className="flex items-center gap-1">
                              <MessageCircle className="w-3 h-3 text-slate-400" />
                              Dernier échange
                            </span>
                            <span>{contact.heureDernierMessage}</span>
                          </div>
                          <p className="text-[11px] line-clamp-2 text-slate-600 leading-snug">
                            {contact.dernierMessage}
                          </p>
                        </div>
                      )}

                      {/* Action Ouvrir */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-[10px] text-slate-400 truncate max-w-[170px]">
                          {contact.email}
                        </span>
                        <span className="inline-flex items-center gap-1 font-bold text-red-600 group-hover:translate-x-0.5 transition-transform text-xs">
                          Ouvrir le chat
                          <Send className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* ÉTAT 2 : CETTE ZONE EST COMPLÈTEMENT REMPLACÉE PAR LE CHAT AVEC LA PERSONNE CHOISIE */
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs min-h-[550px] flex flex-col justify-between animate-in fade-in duration-200">
              {/* En-tête du Chat plein écran */}
              <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setPersonneSelectionnee(null)}
                    className="p-2 rounded-xl bg-white hover:bg-slate-200 border border-slate-200 text-slate-700 transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer shadow-2xs"
                    title="Retourner à la liste de tous les interlocuteurs"
                  >
                    <ArrowLeft className="w-4 h-4 text-slate-700" />
                    <span>Retour à la liste</span>
                  </button>

                  <div className="h-6 w-px bg-slate-200 hidden sm:block" />

                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      <div className={`w-10 h-10 rounded-xl ${personneSelectionnee.couleurAvatar} font-bold text-xs flex items-center justify-center shadow-xs`}>
                        {personneSelectionnee.initiales}
                      </div>
                      <span
                        className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${
                          personneSelectionnee.enLigne ? 'bg-emerald-500' : 'bg-slate-300'
                        }`}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xs font-bold text-slate-900">{personneSelectionnee.nom}</h3>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-bold">
                          {personneSelectionnee.matiere}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 block">
                        {personneSelectionnee.role} &bull; {personneSelectionnee.email} &bull;{' '}
                        <span className={personneSelectionnee.enLigne ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
                          {personneSelectionnee.enLigne ? 'En ligne' : 'Hors ligne'}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    Canal Pédagogique Chiffré
                  </span>
                </div>
              </div>

              {/* Corps des Messages de la conversation */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-[380px] max-h-[460px] bg-slate-50/30">
                {messagesFiltresPersonne.length === 0 ? (
                  <div className="text-center py-16 text-slate-400 text-xs space-y-2">
                    <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 mx-auto flex items-center justify-center">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <p className="font-bold text-slate-700">Aucun message échangé pour le moment avec {personneSelectionnee.nom}.</p>
                    <p className="text-slate-400 text-[11px]">
                      Posez votre question pédagogique ou adressez votre demande directement ci-dessous.
                    </p>
                  </div>
                ) : (
                  messagesFiltresPersonne.map((msg) => {
                    const estMoi = msg.expediteurRole === 'eleve';
                    return (
                      <div
                        key={msg.identifiant}
                        className={`flex flex-col ${estMoi ? 'items-end' : 'items-start'} space-y-1`}
                      >
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 px-1">
                          <span className="font-semibold">{msg.expediteurNom}</span>
                          <span>&bull;</span>
                          <span>{msg.heureEnvoi}</span>
                        </div>

                        <div
                          className={`p-3.5 rounded-2xl max-w-lg text-xs leading-relaxed shadow-2xs ${
                            estMoi
                              ? 'bg-red-600 text-white rounded-tr-xs'
                              : 'bg-white text-slate-900 rounded-tl-xs border border-slate-200'
                          }`}
                        >
                          <p className="whitespace-pre-line">{msg.contenu}</p>

                          {msg.fichierJoint && (
                            <div
                              onClick={() => alert(`Téléchargement de la pièce jointe : ${msg.fichierJoint?.nom}`)}
                              className={`mt-2 p-2 rounded-xl flex items-center justify-between gap-2 cursor-pointer transition-all ${
                                estMoi ? 'bg-red-700/80 text-white hover:bg-red-800' : 'bg-slate-50 border border-slate-200 text-slate-800 hover:bg-slate-100'
                              }`}
                            >
                              <div className="flex items-center gap-2 truncate">
                                <FileText className="w-4 h-4 shrink-0" />
                                <span className="font-bold text-[11px] truncate">{msg.fichierJoint.nom}</span>
                              </div>
                              <span className="text-[10px] opacity-80 shrink-0">({msg.fichierJoint.taille})</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Formulaire d'Envoi */}
              <form onSubmit={envoyerMessageProf} className="p-4 bg-white border-t border-slate-200 space-y-2">
                {nomFichierJoint && (
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs flex items-center justify-between">
                    <span className="font-semibold text-slate-700 text-[11px] flex items-center gap-1.5">
                      <Paperclip className="w-3.5 h-3.5 text-red-600" />
                      {nomFichierJoint}
                    </span>
                    <button
                      type="button"
                      onClick={() => setNomFichierJoint('')}
                      className="text-slate-400 hover:text-slate-700 text-xs font-bold cursor-pointer"
                    >
                      Supprimer
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    id="chat-file-input-fullscreen"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setNomFichierJoint(e.target.files[0].name);
                      }
                    }}
                  />
                  <label
                    htmlFor="chat-file-input-fullscreen"
                    className="p-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-600 transition-colors cursor-pointer"
                    title="Joindre un fichier (PDF, devoir, image)"
                  >
                    <Paperclip className="w-4 h-4" />
                  </label>

                  <input
                    type="text"
                    value={nouveauMessageTexte}
                    onChange={(e) => setNouveauMessageTexte(e.target.value)}
                    placeholder={`Écrire un message à ${personneSelectionnee.nom}...`}
                    className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-red-500 focus:bg-white transition-all"
                  />

                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span className="hidden sm:inline text-xs">Envoyer</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      )}

      {/* VUE 2 : MESSAGES OFFICIELS DE L'ADMINISTRATION */}
      {vueOnglet === 'administration' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs min-h-[500px]">
          {/* Liste des Messages Reçus */}
          <div className="border-r border-slate-200 p-4 space-y-3 bg-slate-50/50">
            <span className="text-xs font-bold text-slate-900 block pb-2 border-b border-slate-200">
              Boîte de Réception Institutionnelle
            </span>

            <div className="space-y-2">
              {messagesAdmin.map((adm) => {
                const estSelectionne = adminMsgSelectionne?.identifiant === adm.identifiant;
                return (
                  <button
                    key={adm.identifiant}
                    onClick={() => setAdminMsgSelectionne(adm)}
                    className={`w-full p-3 rounded-xl text-left transition-all flex flex-col justify-between cursor-pointer ${
                      estSelectionne
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'bg-white text-slate-800 border border-slate-200 hover:border-red-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] mb-1">
                      <span className={`font-black uppercase ${estSelectionne ? 'text-red-100' : 'text-red-600'}`}>
                        {adm.expediteurService}
                      </span>
                      <span className={estSelectionne ? 'text-red-100' : 'text-slate-400'}>{adm.date}</span>
                    </div>
                    <span className="font-bold text-xs line-clamp-1">{adm.titre}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Détail du Message Sélectionné */}
          <div className="lg:col-span-2 p-6 flex flex-col justify-between space-y-6">
            {adminMsgSelectionne ? (
              <div className="space-y-4">
                <div className="pb-4 border-b border-slate-100">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-red-50 text-red-700">
                      Service Émetteur : {adminMsgSelectionne.expediteurService}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">Reçu le {adminMsgSelectionne.date}</span>
                  </div>
                  <h3 className="text-base font-black text-slate-900 mt-2">{adminMsgSelectionne.titre}</h3>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                  <p className="whitespace-pre-line">{adminMsgSelectionne.contenu}</p>
                </div>

                {adminMsgSelectionne.actionRequise && (
                  <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs flex items-center justify-between text-amber-900">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Action attendue : <strong>{adminMsgSelectionne.actionRequise}</strong></span>
                    </div>
                    <button
                      onClick={() => alert(`Action validée pour : ${adminMsgSelectionne?.titre}`)}
                      className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-xs transition-colors cursor-pointer"
                    >
                      Émarger / Valider
                    </button>
                  </div>
                )}

                {adminMsgSelectionne.documentAttache && (
                  <div className="p-3 bg-white border border-slate-200 rounded-xl text-xs flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-red-600" />
                      <span className="font-bold text-slate-800">{adminMsgSelectionne.documentAttache}</span>
                    </div>
                    <button
                      onClick={() => alert(`Téléchargement de : ${adminMsgSelectionne?.documentAttache}`)}
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Télécharger
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 text-xs">
                Sélectionnez un message de l'administration pour en lire le contenu officiel.
              </div>
            )}
          </div>
        </div>
      )}

      {/* VUE 3 : FORUM D'ENTRAIDE DE CLASSE 1ÈRE C */}
      {vueOnglet === 'forum' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-red-600" />
                Salon d'Entraide & Projets Collectifs - Classe 1ère C
              </h3>
              <p className="text-xs text-slate-500">28 élèves connectés &bull; Modération assurée par les professeurs référents</p>
            </div>

            <BoutonRouge
              texte="Nouveau Sujet de Discussion"
              icone={Plus}
              taille="petit"
              onClick={() => setModalNouveauSujet(true)}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Liste des Sujets */}
            <div className="space-y-3">
              {sujetsForum.map((s) => {
                const estActif = s.identifiant === sujetActif?.identifiant;
                return (
                  <div
                    key={s.identifiant}
                    onClick={() => setSujetActif(s)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      estActif
                        ? 'bg-red-50/60 border-red-300 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold mb-1">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">{s.matiere}</span>
                      <span>{s.dateCreation}</span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 line-clamp-2 mt-1">{s.titre}</h4>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
                      <span>Par {s.auteurNom}</span>
                      <span className="font-bold text-red-600">{s.reponses.length} réponses</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Discussion Détaillée du Sujet Actif */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
              {sujetActif ? (
                <div>
                  <div className="pb-3 border-b border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-red-100 text-red-800">
                        {sujetActif.matiere}
                      </span>
                      <span className="text-xs text-slate-400">Initié le {sujetActif.dateCreation}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mt-2">{sujetActif.titre}</h3>
                    <p className="text-xs text-slate-700 mt-2 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                      {sujetActif.contenu}
                    </p>
                  </div>

                  {/* Réponses */}
                  <div className="mt-4 space-y-3 max-h-[300px] overflow-y-auto pr-1">
                    <h4 className="text-xs font-bold text-slate-900">Réponses des camarades ({sujetActif.reponses.length}) :</h4>
                    {sujetActif.reponses.length === 0 ? (
                      <p className="text-xs text-slate-400 italic">Aucune réponse pour l'instant. Soyez le premier à répondre !</p>
                    ) : (
                      sujetActif.reponses.map((rep) => (
                        <div key={rep.identifiant} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                          <div className="flex items-center justify-between text-[10px] text-slate-500">
                            <span className="font-bold text-slate-800">{rep.auteurNom}</span>
                            <span>{rep.date}</span>
                          </div>
                          <p className="text-slate-700 leading-relaxed">{rep.contenu}</p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Formulaire de Réponse */}
                  <form onSubmit={envoyerReponseForum} className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
                    <input
                      type="text"
                      value={reponseForumTexte}
                      onChange={(e) => setReponseForumTexte(e.target.value)}
                      placeholder="Partager une explication ou astuce..."
                      className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-red-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Répondre
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400 text-xs">
                  Sélectionnez un sujet sur la gauche pour participer à la discussion.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL CRÉATION DE NOUVEAU SUJET FORUM */}
      {modalNouveauSujet && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
            <h3 className="text-base font-bold text-slate-900">Ouvrir une nouvelle discussion pour la classe</h3>
            <form onSubmit={creerSujetForum} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-800 block mb-1">Matière ou thème :</label>
                <select
                  value={nouveauSujetMatiere}
                  onChange={(e) => setNouveauSujetMatiere(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                >
                  <option value="Mathématiques">Mathématiques</option>
                  <option value="Physique & Chimie">Physique & Chimie</option>
                  <option value="Littérature & Français">Littérature & Français</option>
                  <option value="Sciences de l’Ingénieur">Sciences de l’Ingénieur</option>
                  <option value="Vie de Classe">Vie de Classe / Projets</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Titre de votre question :</label>
                <input
                  type="text"
                  required
                  value={nouveauSujetTitre}
                  onChange={(e) => setNouveauSujetTitre(e.target.value)}
                  placeholder="Ex: Astuce pour calculer le terme général de la suite..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Détail de votre message :</label>
                <textarea
                  rows={4}
                  required
                  value={nouveauSujetContenu}
                  onChange={(e) => setNouveauSujetContenu(e.target.value)}
                  placeholder="Expliquez ce qui vous pose difficulté ou partagez votre fiche..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalNouveauSujet(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold cursor-pointer"
                >
                  Publier sur le forum
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

