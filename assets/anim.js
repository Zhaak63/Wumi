/**
 * Animations du site Wumi : apparitions au defilement, messages des
 * maquettes Discord un par un, entree du haut de page, compteurs.
 * A inclure avec assets/anim.css. Ne fait rien si l'appareil demande
 * moins de mouvement.
 */
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.documentElement.classList.add('anim');

  // Elements qui apparaissent au defilement ; les freres d'un meme groupe
  // arrivent en decale (--i).
  const GROUPES = [
    '.sec .sec-txt', '.sec .dc', '.sec .duo', '.trio .mini', '.tout h2', '.tout .sub', '.groupes .gr',
    '.preuve', '.cta', '.final', '.faq-acc details',
    '.tete', '.themes', '.duo > div', '.tab', '.etapes .etape', '.faq details', '.fin',
    '.cartes .carte', '.version', '.pan',
  ];
  const vus = new IntersectionObserver((entrees) => {
    for (const e of entrees) {
      if (!e.isIntersecting) continue;
      e.target.classList.add('ra-on');
      vus.unobserve(e.target);
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

  function preparer(racine) {
    const deja = new Set();
    for (const sel of GROUPES) {
      racine.querySelectorAll(sel).forEach((el) => {
        if (deja.has(el) || el.classList.contains('ra') || el.closest('.hero')) return;
        deja.add(el);
        const freres = el.parentElement ? [...el.parentElement.children].filter((x) => x.matches(sel)) : [el];
        el.style.setProperty('--i', String(Math.min(6, Math.max(0, freres.indexOf(el)))));
        el.classList.add('ra');
        vus.observe(el);
      });
    }
    // Messages des maquettes : un apres l'autre une fois la fenetre visible
    racine.querySelectorAll('.dc').forEach((dc) => {
      dc.querySelectorAll('.m, .msg').forEach((m, j) => m.style.setProperty('--j', String(j)));
      if (!dc.classList.contains('ra')) { dc.classList.add('ra'); vus.observe(dc); }
    });
  }

  // Haut de page : le texte monte, les cartes tombent, l'eventail s'ouvre
  function hautDePage() {
    const hero = document.querySelector('.hero');
    if (hero) {
      const txt = hero.querySelector(':scope > div:first-child');
      if (txt) [...txt.children].forEach((el, i) => { el.style.setProperty('--i', String(i)); el.classList.add('ra-h'); });
    }
    document.querySelectorAll('.collage .cl').forEach((el, i) => el.style.setProperty('--i', String(i)));
    document.querySelectorAll('.pile img').forEach((el, i) => el.style.setProperty('--i', String(i)));
  }

  // Compteurs : « 20 serveurs · 197 945 membres » montent depuis zero
  function compteurs() {
    const anime = (el) => {
      if (el.dataset.compte) return;
      const brut = el.textContent;
      const m = brut.match(/\d[\d\s  .,]*/);
      if (!m) return;
      const cible = parseInt(m[0].replace(/[^\d]/g, ''), 10);
      if (!cible || cible < 5) return;
      el.dataset.compte = '1';
      const sep = /\d[   ]\d/.test(m[0]) ? ' ' : /\d,\d/.test(m[0]) ? ',' : (/\d\.\d/.test(m[0]) ? '.' : '');
      const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, sep);
      const t0 = performance.now(); const duree = 1300;
      const pas = (t) => {
        const p = Math.min(1, (t - t0) / duree);
        const v = Math.round(cible * (1 - Math.pow(1 - p, 3)));
        el.textContent = brut.replace(m[0], fmt(v) + (m[0].match(/\s$/) ? ' ' : ''));
        if (p < 1) requestAnimationFrame(pas);
      };
      requestAnimationFrame(pas);
    };
    const cibles = ['#nb-serveurs', '#nb-membres'];
    const obs = new MutationObserver(() => cibles.forEach((s) => { const el = document.querySelector(s); if (el && /\d/.test(el.textContent)) anime(el); }));
    cibles.forEach((s) => { const el = document.querySelector(s); if (el) obs.observe(el, { childList: true, characterData: true, subtree: true }); });
  }

  // Page Fonctionnalites : les puces du panneau glissent en decale
  function panneau() {
    const pan = document.getElementById('pan');
    if (!pan) return;
    const decaler = () => pan.querySelectorAll('.atouts li').forEach((li, k) => li.style.setProperty('--k', String(k)));
    new MutationObserver(decaler).observe(pan, { childList: true });
    decaler();
  }

  function demarrer() {
    hautDePage();
    preparer(document);
    compteurs();
    panneau();
    // Les pages qui se dessinent en JavaScript (premium, nouveautes...)
    const page = document.getElementById('page') || document.getElementById('contenu');
    if (page) new MutationObserver(() => { preparer(page); hautDePage(); }).observe(page, { childList: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', demarrer);
  else demarrer();
}());
