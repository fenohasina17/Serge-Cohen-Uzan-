/* ============================================
   SERGE COHEN-UZAN — Gallery & UI Script
   ============================================ */

// ─── URL encoding for paths with spaces/special chars ───
function ep(path) {
  return path.split('/').map(seg =>
    seg.replace(/ /g, '%20')
       .replace(/\(/g, '%28')
       .replace(/\)/g, '%29')
       .replace(/&/g, '%26')
  ).join('/');
}

// ─── Gallery Data ────────────────────────────────────────

const GALLERIES = {

  mode: {
    title: 'Mode & Fashion',
    sub: 'Collections · Défilés · Catalogues',
    cover: 'photos/mode/photo(1).jpg',
    photos: (function() {
      const arr = [];
      for (let i = 1; i <= 199; i++) arr.push(`photos/mode/photo(${i}).jpg`);
      return arr;
    })()
  },

  portraits: {
    title: 'Portraits',
    sub: 'Portraits professionnels & artistiques',
    cover: 'photos/portraits/1M5A2529a copie.jpg',
    base: 'photos/portraits/',
    photos: [
      '1M5A1921a.jpg','1M5A1940a copie.jpg','1M5A1949a copie.jpg',
      '1M5A1951a copie.jpg','1M5A1974a copie.jpg','1M5A1987 copie.jpg',
      '1M5A2006a copie.jpg','1M5A2018q copie.jpg','1M5A2029a copie.jpg',
      '1M5A2033a copie.jpg','1M5A2062a copie.jpg','1M5A2073a copie.jpg',
      '1M5A2103 2 acopie.jpg','1M5A2103 2a copie.jpg','1M5A2168.jpg',
      '1M5A2254a copie.jpg','1M5A2267.jpg','1M5A2276 acopie.jpg',
      '1M5A2319a.jpg','1M5A2425.jpg','1M5A2466a copie.jpg','1M5A2466a.jpg',
      '1M5A2470.jpg','1M5A2473a copie.jpg','1M5A2523a copie.jpg',
      '1M5A2529a copie.jpg','1M5A2536a copie.jpg','1M5A2551a copie.jpg',
      '1M5A2577a copie.jpg','1M5A2605a copie.jpg','1M5A2625a copie.jpg',
      '1M5A2631a copie.jpg','1M5A2652a copie.jpg','1M5A2664a.jpg',
      '1M5A2700a copie.jpg','1M5A2728 copie.jpg','1M5A2728a copie.jpg',
      '1M5A2733a copie.jpg','1M5A2747.jpg','1M5A2773.jpg',
      '1M5A2774a copie.jpg','1M5A2774a.jpg','1M5A2806a copie.jpg',
      '1M5A2843a copie.jpg','1M5A2843a.jpg','1M5A2868a copie.jpg',
      '1M5A2894a copie.jpg','1M5A2896a.jpg','1M5A2921a copie.jpg',
      '1M5A2931a copie.jpg','1M5A2942a copie.jpg','1M5A2973a copie.jpg',
      '1M5A3065a 2 copie.jpg','1M5A3087a copie.jpg','1M5A3167a copie.jpg',
      '1M5A3168a copie.jpg','1M5A3221a copie.jpg','1M5A3231a copie.jpg',
      '1M5A3248a copie.jpg','1M5A3265a copie.jpg','1M5A3290a copie.jpg',
      '1M5A3336a.jpg','1M5A3369a.jpg','1M5A3396a copie.jpg',
      '1M5A3423a copie.jpg','1M5A3431a copie.jpg','1M5A3460a copie.jpg',
      '1M5A3502 acopie.jpg','1M5A3514a copie.jpg','1M5A3618a copie.jpg',
      '1M5A3651a copie.jpg','1M5A3700a.jpg','1M5A3755a copie.jpg',
      '1M5A3872a copie.jpg','1M5A3883a.jpg','1M5A3917a copie.jpg',
      '1M5A3983 2a copie.jpg','1M5A4005a copie.jpg','1M5A4087a copie.jpg',
      '1M5A4120a copie.jpg','1M5A4120a.jpg','1M5A4130a 2.jpg',
      '1M5A4179a copie.jpg','1M5A4179a.jpg','1M5A4220a.jpg',
      '1M5A4231a copie.jpg','1M5A4247 acopie.jpg','1M5A4348a copie.jpg',
      '1M5A4358a copie.jpg','1M5A4365 2 copie.jpg','1M5A4396 copie.jpg',
      '1M5A4463 copie.jpg','1M5A4520 copie.jpg','1M5A4576a.jpg',
      '1M5A4595 copie.jpg','1M5A4742a.jpg','1M5A4962a copie.jpg',
      '1M5A5217a copie.jpg','1M5A5268a copie.jpg','1M5A5375 acopie.jpg',
      '1M5A5410a copie.jpg','1M5A5640a.jpg','1M5A5790s.jpg',
      '1M5A7144a.jpg','1M5A7302a copie.jpg','1M5A7324a copie.jpg',
      '1M5A7360a copie.jpg','1M5A7404a copie.jpg'
    ].map(f => 'photos/portraits/' + f)
  },

  reportages: {
    title: 'Reportages',
    sub: 'Corporate · Événementiel · Presse',
    cover: 'photos/reportages/graphic-pros/cohen-uzan archi (25)001.jpg',
    photos: [
      '1SDT (2)001.jpg','1sifec (3)001.jpg','1sifec (4)001.jpg','1sifec (5)001.jpg',
      'FEUILLE ROUGE copie001.jpg','FEULLE OR001.jpg','FLASHFASHION (88)001.jpg',
      'REPORTS (64)001.jpg','RRR (147)001.jpg','TABLEAU FEUILLES 2001.jpg',
      'cohen uzan sweet (16)001.jpg',
      'cohen-uzan archi (2)001.jpg','cohen-uzan archi (3)001.jpg','cohen-uzan archi (4)001.jpg',
      'cohen-uzan archi (5)001.jpg','cohen-uzan archi (6)001.jpg','cohen-uzan archi (7)001.jpg',
      'cohen-uzan archi (8)001.jpg','cohen-uzan archi (10)001.jpg','cohen-uzan archi (12)001.jpg',
      'cohen-uzan archi (14)001.jpg','cohen-uzan archi (15)001.jpg','cohen-uzan archi (16)001.jpg',
      'cohen-uzan archi (17)001.jpg','cohen-uzan archi (18)001.jpg','cohen-uzan archi (19)001.jpg',
      'cohen-uzan archi (23)001.jpg','cohen-uzan archi (24)001.jpg','cohen-uzan archi (25)001.jpg',
      'cohen-uzan archi (26)001.jpg',
      'cohen-uzan graphic (2)001.jpg','cohen-uzan graphic (10)001.jpg','cohen-uzan graphic (12)001.jpg',
      'cohen-uzan graphic (19)001.jpg','cohen-uzan graphic (21)001.jpg','cohen-uzan graphic (23)001.jpg',
      'cohen-uzan graphic (24)001.jpg','cohen-uzan graphic (28)001.jpg','cohen-uzan graphic (30)001.jpg',
      'cohen-uzan graphic (33)001.jpg','cohen-uzan graphic (38)001.jpg','cohen-uzan graphic (138)001.jpg'
    ].map(f => 'photos/reportages/graphic-pros/' + f)
  },

  hotellerie: {
    title: 'Hôtellerie & Voyages',
    sub: 'Hôtels de luxe · Tourisme · Destinations',
    cover: 'photos/hotellerie/sukhothai-bkk/SUKHOTHAI BKK (1).jpg',
    photos: (function() {
      const arr = [];
      for (let i = 1; i <= 53; i++) {
        arr.push(`photos/hotellerie/sukhothai-bkk/SUKHOTHAI BKK (${i}).jpg`);
      }
      return arr;
    })()
  },

  lingerie: {
    title: 'Lingerie',
    sub: 'Défilés · Catalogues · Shooting',
    cover: 'photos/lingerie/maison-close/photodemodeparis.com (64).jpg',
    photos: (function() {
      const arr = ['photos/lingerie/maison-close/photodemodeparis.com.jpg'];
      for (let i = 1; i <= 77; i++) {
        arr.push(`photos/lingerie/maison-close/photodemodeparis.com (${i}).jpg`);
      }
      return arr;
    })()
  },

  gastronomie: {
    title: 'Gastronomie',
    sub: 'Restaurants · Art de vivre · Portraits culinaires',
    cover: 'photos/gastronomie/paris-septanil/CASSITA.jpg',
    photos: [
      'CASSITA.jpg','CASSITA (3).jpg','CASSITA (4).jpg','CASSITA (6).jpg',
      'FLASHFASHIONstudio219.jpg','REPORTS (63).jpg','RESID ROY (2).jpg',
      'RESIDENCE ROYALE (5).jpg','RESIDENCEROYALE (5).jpg','RESIDENCEROYALE (10).jpg',
      'RESIDENCEROYALE (12).jpg','RESIDENCEROYALE (13).jpg','RESIDENCEROYALE (14).jpg',
      'cohen uzan sweet (10)001.jpg','cohen uzan sweet (11).jpg','cohen uzan sweet (13).jpg',
      'cohen uzan sweet (17).jpg','cohen uzan sweet (18).jpg','cohenuzansweet (12).jpg',
      'julien septanil au grand hotel (2)001.jpg','julien septanil au grand hotel (3)001.jpg',
      'julien septanil au grand hotel (4)001.jpg'
    ].map(f => 'photos/gastronomie/paris-septanil/' + f)
  }
};

// ─── Hero Slideshow ──────────────────────────────────────

const HERO_PHOTOS = [
  'photos/mode/photo(1).jpg',
  'photos/portraits/1M5A2529a copie.jpg',
  'photos/hotellerie/sukhothai-bkk/SUKHOTHAI BKK (1).jpg',
  'photos/lingerie/maison-close/photodemodeparis.com (64).jpg'
];

let heroIndex = 0;
let heroTimer = null;

function initHero() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');

  function goTo(idx) {
    slides[heroIndex].classList.remove('active');
    dots[heroIndex].classList.remove('active');
    heroIndex = (idx + slides.length) % slides.length;
    slides[heroIndex].classList.add('active');
    dots[heroIndex].classList.add('active');
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      clearInterval(heroTimer);
      goTo(i);
      heroTimer = setInterval(() => goTo(heroIndex + 1), 5500);
    });
  });

  heroTimer = setInterval(() => goTo(heroIndex + 1), 5500);
}

// ─── Navigation ──────────────────────────────────────────

function initNav() {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    links.classList.toggle('open');
    document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      links.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && links.classList.contains('open')) {
      toggle.classList.remove('open');
      links.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

// ─── View Switching ──────────────────────────────────────

function showHome() {
  document.getElementById('homeView').style.display = '';
  document.getElementById('galleryView').classList.remove('active');
  window.scrollTo(0, 0);
}

function showSection(id) {
  const el = document.getElementById(id);
  if (el) {
    document.getElementById('homeView').style.display = '';
    document.getElementById('galleryView').classList.remove('active');
    setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 10);
  } else {
    showGallery(id);
  }
}

// ─── Gallery ─────────────────────────────────────────────

let currentGallery = null;
let currentPhotos = [];

function showGallery(key) {
  const g = GALLERIES[key];
  if (!g) return;

  currentGallery = key;
  currentPhotos = g.photos;

  document.getElementById('homeView').style.display = 'none';
  const view = document.getElementById('galleryView');
  view.classList.add('active');

  document.getElementById('galleryTitle').textContent = g.title;
  document.getElementById('gallerySubtitle').textContent = g.sub;
  document.getElementById('galleryCount').textContent = `${g.photos.length} photographies`;

  window.scrollTo(0, 0);
  buildGrid(g.photos);
}

function buildGrid(photos) {
  const grid = document.getElementById('galleryGrid');
  grid.innerHTML = '';

  photos.forEach((path, i) => {
    const div = document.createElement('div');
    div.className = 'gallery-photo';
    div.setAttribute('data-index', i);

    const img = document.createElement('img');
    img.src = ep(path);
    img.alt = '';
    img.loading = 'lazy';
    img.addEventListener('load', () => img.classList.add('loaded'));
    img.addEventListener('error', () => { div.style.display = 'none'; });

    const overlay = document.createElement('div');
    overlay.className = 'gallery-photo-overlay';
    overlay.innerHTML = '<span>⊕</span>';

    div.appendChild(img);
    div.appendChild(overlay);

    div.addEventListener('click', () => openLightbox(i));
    grid.appendChild(div);
  });
}

// ─── Lightbox ────────────────────────────────────────────

let lbIndex = 0;

function openLightbox(idx) {
  lbIndex = idx;
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
  loadLightboxImage(lbIndex);
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

function loadLightboxImage(idx) {
  const img = document.getElementById('lbImg');
  const counter = document.getElementById('lbCounter');
  const path = currentPhotos[idx];

  img.classList.add('fading');
  setTimeout(() => {
    img.src = ep(path);
    img.onload = () => img.classList.remove('fading');
    img.onerror = () => img.classList.remove('fading');
    counter.textContent = `${idx + 1} / ${currentPhotos.length}`;
  }, 220);
}

function prevPhoto() {
  lbIndex = (lbIndex - 1 + currentPhotos.length) % currentPhotos.length;
  loadLightboxImage(lbIndex);
}

function nextPhoto() {
  lbIndex = (lbIndex + 1) % currentPhotos.length;
  loadLightboxImage(lbIndex);
}

// Keyboard navigation
document.addEventListener('keydown', e => {
  const lb = document.getElementById('lightbox');
  if (!lb.classList.contains('active')) return;
  if (e.key === 'ArrowLeft')  prevPhoto();
  if (e.key === 'ArrowRight') nextPhoto();
  if (e.key === 'Escape')     closeLightbox();
});

// Click backdrop to close
document.getElementById('lightbox').addEventListener('click', function(e) {
  if (e.target === this || e.target.classList.contains('lb-image-wrap')) {
    closeLightbox();
  }
});

// Touch/swipe support
let touchStartX = 0;
document.getElementById('lightbox').addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });
document.getElementById('lightbox').addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) dx < 0 ? nextPhoto() : prevPhoto();
}, { passive: true });

// ─── Smooth scroll for anchor links ─────────────────────

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      document.getElementById('homeView').style.display = '';
      document.getElementById('galleryView').classList.remove('active');
      setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 10);
    }
  });
});

// ─── Keyboard support for portfolio items ────────────────

function initPortfolioKeys() {
  document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });
}

// ─── Init ────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initHero();
  initNav();
  initPortfolioKeys();
});
