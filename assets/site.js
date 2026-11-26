/*
 * En-tete et pied de page communs a toutes les pages de wumi.fr (hors accueil,
 * qui a les siens en dur). Meme structure que la page d'accueil : logo, quatre
 * onglets (Fonctionnalites, Premium, Docs, Statut), Support + Ajouter a Discord,
 * et le grand pied a colonnes.
 *
 * Utilisation :
 *   <div id="sw-entete" data-langue="boutons|chemin|aucun"></div>
 *   ... contenu ...
 *   <div id="sw-pied"></div>
 *   <script src="/assets/site.js" defer></script>
 *
 * data-langue :
 *   boutons : la page change de langue elle-meme sur un clic [data-lang]
 *             (commandes, premium, nouveautes, fonctionnalites) ;
 *   chemin  : la version francaise est sous /fr/ (pages legales) ;
 *   aucun   : pas de selecteur.
 * La langue affichee suit <html lang>, que les pages mettent a jour.
 */
(() => {
  'use strict';
  const INVITE = 'https://discord.com/oauth2/authorize?client_id=1545770920185045084&scope=bot%20applications.commands&permissions=1426362592470';
  const SUPPORT = 'https://discord.gg/VaGrXgnAHS';
  const DRAPEAU = {
    en: '<svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><clipPath id="sw-uk"><path d="M30,15h30v15zv15h-30zh-30v-15zv-15h30z"/></clipPath><rect width="60" height="30" fill="#012169"/><path d="M0,0L60,30M60,0L0,30" stroke="#fff" stroke-width="6"/><path d="M0,0L60,30M60,0L0,30" clip-path="url(#sw-uk)" stroke="#C8102E" stroke-width="4"/><path d="M30,0v30M0,15h60" stroke="#fff" stroke-width="10"/><path d="M30,0v30M0,15h60" stroke="#C8102E" stroke-width="6"/></svg>',
    fr: '<svg viewBox="0 0 3 2" aria-hidden="true"><rect width="1" height="2" fill="#0055A4"/><rect x="1" width="1" height="2" fill="#fff"/><rect x="2" width="1" height="2" fill="#EF4135"/></svg>',
  };
  const RESEAUX = [
    ['/discord/', 'Discord', 'M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .078-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .079.009c.12.1.246.198.373.292a.077.077 0 0 1-.007.128 12.3 12.3 0 0 1-1.873.891.077.077 0 0 0-.041.107c.36.698.772 1.363 1.225 1.993a.076.076 0 0 0 .084.029 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z'],
    ['/tiktok/', 'TikTok', 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z'],
    ['/x/', 'X (Twitter)', 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932zM17.61 20.644h2.039L6.486 3.24H4.298z'],
  ];
  const TXT = {
    fr: {
      fonc: 'Fonctionnalités', premium: 'Premium', docs: 'Docs', statut: 'Statut', support: 'Support', ajouter: 'Ajouter à Discord',
      slogan: 'Le petit compagnon tout-en-un de ton serveur Discord.',
      cols: [
        ['Fonctions', [['Musique', '/fonctionnalites/?lang=fr#musique'], ['Bienvenue', '/fonctionnalites/?lang=fr#bienvenue'], ['Niveaux', '/fonctionnalites/?lang=fr#niveaux'], ['Cartes', '/fonctionnalites/?lang=fr#cartes'], ['Tickets & FAQ', '/fonctionnalites/?lang=fr#tickets'], ['Alertes live', '/fonctionnalites/?lang=fr#annonces'], ['Modération', '/fonctionnalites/?lang=fr#moderation']]],
        ['Produit', [['Fonctionnalités', '/fonctionnalites/?lang=fr'], ['Nouveautés', '/nouveautes/?lang=fr'], ['Commandes', '/commandes/?lang=fr'], ['Premium', '/premium/?lang=fr'], ['Dashboard', '/dashboard/'], ['Inviter le bot', INVITE]]],
        ['Ressources', [['Docs', '/commandes/?lang=fr'], ['Serveur support', SUPPORT], ['Statut', '/statut/']]],
        ['Légal', [['Mentions légales', '/fr/mentions-legales.html'], ["Conditions d'utilisation", '/fr/conditions.html'], ['Confidentialité', '/fr/confidentialite.html'], ['Remboursement', '/fr/remboursement.html'], ["Droits d'auteur", '/fr/droits-auteur.html']]],
      ],
      bas: '© 2026 Wumi. Non affilié à Discord.', accueil: '/fr/',
    },
    en: {
      fonc: 'Features', premium: 'Premium', docs: 'Docs', statut: 'Status', support: 'Support', ajouter: 'Add to Discord',
      slogan: 'The little all-in-one companion for your Discord server.',
      cols: [
        ['Features', [['Music', '/fonctionnalites/?lang=en#musique'], ['Welcome', '/fonctionnalites/?lang=en#bienvenue'], ['Levels', '/fonctionnalites/?lang=en#niveaux'], ['Cards', '/fonctionnalites/?lang=en#cartes'], ['Tickets & FAQ', '/fonctionnalites/?lang=en#tickets'], ['Live alerts', '/fonctionnalites/?lang=en#annonces'], ['Moderation', '/fonctionnalites/?lang=en#moderation']]],
        ['Product', [['Features', '/fonctionnalites/?lang=en'], ["What's new", '/nouveautes/?lang=en'], ['Commands', '/commandes/?lang=en'], ['Premium', '/premium/?lang=en'], ['Dashboard', '/dashboard/'], ['Invite the bot', INVITE]]],
        ['Resources', [['Docs', '/commandes/?lang=en'], ['Support server', SUPPORT], ['Status', '/statut/']]],
        ['Legal', [['Legal notice', '/mentions-legales.html'], ['Terms of Service', '/conditions.html'], ['Privacy', '/confidentialite.html'], ['Refunds', '/remboursement.html'], ['Copyright', '/droits-auteur.html']]],
      ],
      bas: '© 2026 Wumi. Not affiliated with Discord.', accueil: '/',
    },
  };

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const langue = () => (/^fr/i.test(document.documentElement.lang || '') ? 'fr' : 'en');
  const ici = location.pathname;

  function selecteur(mode, l) {
    if (mode === 'boutons') {
      return `<div class="sw-lang" role="group" aria-label="Language">${['en', 'fr'].map((x) =>
        `<button type="button" data-lang="${x}" class="${x === l ? 'on' : ''}" title="${x === 'en' ? 'English' : 'Français'}">${DRAPEAU[x]}</button>`).join('')}</div>`;
    }
    if (mode === 'chemin') {
      const fr = ici.startsWith('/fr/') ? ici : `/fr${ici}`;
      const en = ici.startsWith('/fr/') ? ici.slice(3) : ici;
      return `<div class="sw-lang" role="group" aria-label="Language"><a href="${en}" hreflang="en" title="English" class="${l === 'en' ? 'on' : ''}">${DRAPEAU.en}</a><a href="${fr}" hreflang="fr" title="Français" class="${l === 'fr' ? 'on' : ''}">${DRAPEAU.fr}</a></div>`;
    }
    return '';
  }

  function entete(boite) {
    const l = langue();
    const T = TXT[l];
    const onglets = [[T.fonc, `/fonctionnalites/?lang=${l}`, '/fonctionnalites/'], [T.premium, `/premium/?lang=${l}`, '/premium/'], [T.docs, `/commandes/?lang=${l}`, '/commandes/'], [T.statut, '/statut/', '/statut/']];
    boite.innerHTML = `<div class="sw-entete" role="banner"><div class="sw-wrap sw-nav" role="navigation">
      <a href="${T.accueil}" class="sw-logo"><img src="/wumi-icone.svg" alt=""><span>wumi<span class="sw-dot">.</span></span></a>
      <div class="sw-liens">${onglets.map(([n, h, p]) => `<a href="${h}"${ici.startsWith(p) ? ' class="on" aria-current="page"' : ''}>${esc(n)}</a>`).join('')}</div>
      <div class="sw-fin">${selecteur(boite.dataset.langue || 'aucun', l)}
        ${document.documentElement.dataset.theme ? '<button class="sw-theme" type="button" aria-label="Light / dark" title="Light / dark"><span class="lune">🌙</span><span class="soleil">☀️</span></button>' : ''}
        <a class="sw-btn sw-btn-g" href="${SUPPORT}">${T.support}</a>
        <a class="sw-btn sw-btn-p" href="${INVITE}">${T.ajouter}</a>
        <button class="sw-burger" type="button" aria-label="Menu">☰</button>
      </div></div></div>`;
    boite.querySelector('.sw-burger').onclick = () => boite.firstElementChild.classList.toggle('open');
  }

  function pied(boite) {
    const T = TXT[langue()];
    boite.innerHTML = `<div class="sw-pied" role="contentinfo"><div class="sw-wrap">
      <div class="sw-grille">
        <div><a href="${T.accueil}" class="sw-logo"><img src="/wumi-icone.svg" alt=""><span>wumi<span class="sw-dot">.</span></span></a><p>${T.slogan}</p>
          <div class="sw-reseaux">${RESEAUX.map(([h, n, d]) => `<a href="${h}" aria-label="${n}" title="${n}"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${d}"/></svg></a>`).join('')}</div></div>
        ${T.cols.map(([titre, liens]) => `<div><h6>${esc(titre)}</h6>${liens.map(([n, h]) => `<a href="${esc(h)}">${esc(n)}</a>`).join('')}</div>`).join('')}
      </div>
      <div class="sw-bas"><span>${T.bas}</span><a href="https://wumi.fr">wumi.fr</a></div>
    </div></div>`;
  }

  function theme() {
    // Meme memoire que le reste du site (localStorage wumi-theme). Les pages
    // qui ont deja leur bouton .theme le gerent ; celui-ci a sa classe a lui.
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.sw-theme')) return;
      const m = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
      document.documentElement.dataset.theme = m;
      try { localStorage.setItem('wumi-theme', m); } catch { /* rien */ }
    });
  }

  function tout() {
    const e = document.getElementById('sw-entete');
    const p = document.getElementById('sw-pied');
    if (e) entete(e);
    if (p) pied(p);
  }

  function demarrer() {
    tout();
    theme();
    // Les pages a selecteur « boutons » changent <html lang> sans recharger :
    // on suit pour garder l'en-tete et le pied dans la bonne langue.
    let avant = langue();
    new MutationObserver(() => { if (langue() !== avant) { avant = langue(); tout(); } })
      .observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', demarrer);
  else demarrer();
})();
