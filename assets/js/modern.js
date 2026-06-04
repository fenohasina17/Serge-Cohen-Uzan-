/* ============================================
   SERGE COHEN-UZAN — Gallery & UI Script
   ============================================ */

// ─── Intro Explosion Photos ───────────────────────────────

const INTRO_PHOTOS = [
  // Positions: left/right/top/bottom in %, width/height in vw/vh, rotation in deg, delay in s
  { path: 'photos/mode/photo(1).jpg',
    s: 'left:-1%;top:0%;width:22vw;height:28vw',        rot:-8,  delay:0 },
  { path: 'photos/mode/photo(37).jpg',
    s: 'left:20%;top:-2%;width:18vw;height:23vw',        rot:5,   delay:0.13 },
  { path: 'photos/mode/photo(76).jpg',
    s: 'left:41%;top:0%;width:20vw;height:25vw',         rot:-11, delay:0.29 },
  { path: 'photos/portraits/1M5A3700a.jpg',
    s: 'right:-1%;top:0%;width:23vw;height:30vw',        rot:6,   delay:0.09 },
  { path: 'photos/hotellerie/sukhothai-bkk/SUKHOTHAI BKK (1).jpg',
    s: 'left:-1%;top:36%;width:20vw;height:26vw',        rot:-5,  delay:0.45 },
  { path: 'photos/lingerie/maison-close/photodemodeparis.com (64).jpg',
    s: 'right:-1%;top:30%;width:21vw;height:28vw',       rot:9,   delay:0.19 },
  { path: 'photos/mode/photo(117).jpg',
    s: 'left:-1%;bottom:0%;width:21vw;height:27vw',      rot:7,   delay:0.57 },
  { path: 'photos/gastronomie/paris-septanil/CASSITA.jpg',
    s: 'left:20%;bottom:-1%;width:19vw;height:24vw',     rot:-6,  delay:0.49 },
  { path: 'photos/mode/photo(156).jpg',
    s: 'left:41%;bottom:-1%;width:18vw;height:23vw',     rot:12,  delay:0.37 },
  { path: 'photos/reportages/graphic-pros/cohen-uzan archi (25)001.jpg',
    s: 'right:-1%;bottom:0%;width:23vw;height:29vw',     rot:-9,  delay:0.25 },
  { path: 'photos/portraits/1M5A2529a copie.jpg',
    s: 'left:24%;top:33%;width:14vw;height:19vw',        rot:-3,  delay:0.53 },
  { path: 'photos/hotellerie/sukhothai-bkk/SUKHOTHAI BKK (15).jpg',
    s: 'right:24%;top:29%;width:14vw;height:19vw',       rot:5,   delay:0.41 },
];

let introCompleted = false;
let musicEnabled   = false;

function buildIntroPhotos() {
  const container = document.getElementById('introPhotos');
  INTRO_PHOTOS.forEach(p => {
    const div = document.createElement('div');
    div.className = 'intro-photo';
    div.setAttribute('style', p.s + ';--rot:' + p.rot + 'deg');

    const img = document.createElement('img');
    img.src = ep(p.path);
    img.alt = '';
    img.loading = 'eager';

    div.appendChild(img);
    container.appendChild(div);
  });
}

function triggerIntroPhotos() {
  const photos = document.querySelectorAll('.intro-photo');
  photos.forEach((ph, i) => {
    setTimeout(() => ph.classList.add('visible'), INTRO_PHOTOS[i].delay * 1000);
  });
}

function enterSite() {
  if (introCompleted) return;
  introCompleted = true;

  const overlay = document.getElementById('introOverlay');
  overlay.classList.add('hiding');

  const musicBtn = document.getElementById('musicToggle');
  musicBtn.classList.add('visible');

  tryPlayMusic();

  setTimeout(() => { overlay.style.display = 'none'; }, 1100);
}

function initIntro() {
  // Skip if already visited this session (for testing convenience)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('skip') === '1') {
    document.getElementById('introOverlay').style.display = 'none';
    introCompleted = true;
    document.getElementById('musicToggle').classList.add('visible');
    return;
  }

  buildIntroPhotos();

  setTimeout(triggerIntroPhotos, 80);

  document.getElementById('introEnterBtn').addEventListener('click', enterSite);
  document.getElementById('introSkipBtn').addEventListener('click', enterSite);

  // Auto-dismiss after 8 seconds
  setTimeout(() => { if (!introCompleted) enterSite(); }, 8000);
}

// ─── MetalSynth : boucle guitare distorsion + batterie ──────
// Boucle complète de 2 mesures à 152 BPM.
// Si assets/music/intro.mp3 existe, il est joué en priorité.

const MetalSynth = {
  ctx:      null,
  timer:    null,
  nextTime: 0,
  step:     0,
  BPM:      152,

  // 1 pas = 1 double-croche  (= 1 16th note)
  get T16() { return (60 / this.BPM) / 4; },

  // Riff guitare – 32 pas (2 mesures), format [vélocité, accord]
  // accords : 0=Mi2, 1=Ré2, 2=Do2
  riff: [
    [.85,0],[.45,0],[0,0],  [.65,0],  [.45,0],[0,0],  [.65,0],[0,0],
    [.85,0],[.45,0],[0,0],  [.65,0],  [.45,0],[0,0],  [.72,1],[.85,0],
    [.85,0],[.45,0],[0,0],  [.65,0],  [.45,0],[0,0],  [.65,0],[0,0],
    [.85,0],[0,0],  [.65,0],[0,0],    [.85,2],[.65,1],[.85,0],[0,0],
  ],

  chords: [
    [82.4, 123.5],  // Mi2 + Si2  (accord de puissance Mi)
    [73.4, 110.0],  // Ré2 + La2  (accord de puissance Ré)
    [65.4,  98.0],  // Do2 + Sol2 (accord de puissance Do)
  ],

  //           1   e   +   a    2   e   +   a    3   e   +   a    4   e   +   a
  kickPat:  [  1,  0,  0,  0,   0,  0,  1,  0,   1,  0,  0,  0,   0,  0,  0,  0,
               1,  0,  0,  0,   0,  0,  1,  0,   1,  0,  0,  0,   0,  0,  0,  0 ],
  snarePat: [  0,  0,  0,  0,   1,  0,  0,  0,   0,  0,  0,  0,   1,  0,  0,  0,
               0,  0,  0,  0,   1,  0,  0,  0,   0,  0,  0,  0,   1,  0,  0,  0 ],
  hhPat:    [  1,  0,  1,  0,   1,  0,  1,  0,   1,  0,  1,  0,   1,  0,  1,  0,
               1,  0,  1,  0,   1,  0,  1,  0,   1,  0,  1,  0,   1,  0,  1,  0 ],

  distCurve: null,

  _buildDistCurve() {
    const n = 512; this.distCurve = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const x = (i * 2) / n - 1;
      this.distCurve[i] = (Math.PI + 360) * x / (Math.PI + 360 * Math.abs(x));
    }
  },

  init() {
    if (!this.ctx)
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (this.ctx.state === 'suspended') this.ctx.resume();
    if (!this.distCurve) this._buildDistCurve();
  },

  start() {
    this.init();
    this.step     = 0;
    this.nextTime = this.ctx.currentTime + 0.05;
    this._pump();
    this.timer = setInterval(() => this._pump(), 30);
  },

  stop() {
    clearInterval(this.timer);
    this.timer = null;
  },

  _pump() {
    while (this.nextTime < this.ctx.currentTime + 0.28) {
      this._step(this.step, this.nextTime);
      this.step = (this.step + 1) % 32;
      this.nextTime += this.T16;
    }
  },

  _step(s, t) {
    if (this.kickPat[s])  this._kick(t);
    if (this.snarePat[s]) this._snare(t);
    if (this.hhPat[s])    this._hihat(t);
    const [vel, ch] = this.riff[s];
    if (vel > 0) this._guitar(t, vel, ch);
  },

  // ── Guitare distorsion ──────────────────────────────────
  _guitar(t, vel, ch) {
    const ctx = this.ctx, freqs = this.chords[ch];
    const dur = this.T16 * 0.62;

    const dist = ctx.createWaveShaper();
    dist.curve = this.distCurve; dist.oversample = '4x';
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = 2400; lp.Q.value = 1.6;
    dist.connect(lp);

    // Compresseur doux pour éviter la saturation
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18; comp.ratio.value = 6;
    lp.connect(comp); comp.connect(ctx.destination);

    const env = ctx.createGain();
    env.gain.setValueAtTime(0, t);
    env.gain.linearRampToValueAtTime(vel * 0.40, t + 0.006);
    env.gain.exponentialRampToValueAtTime(vel * 0.28, t + dur * 0.5);
    env.gain.exponentialRampToValueAtTime(0.001, t + dur);
    comp.connect(env); env.connect(ctx.destination);

    // Deux oscillateurs légèrement désaccordés (épaisseur chorus)
    freqs.forEach(f => {
      [-1, +1].forEach(detune => {
        const o = ctx.createOscillator();
        o.type = 'sawtooth';
        o.frequency.value = f * (1 + detune * 0.003);
        const g = ctx.createGain(); g.gain.value = 0.22;
        o.connect(g); g.connect(dist);
        o.start(t); o.stop(t + dur + 0.01);
      });
    });

    // Sous-octave (sub-bass)
    const sub = ctx.createOscillator();
    sub.type = 'sine'; sub.frequency.value = freqs[0] / 2;
    const subE = ctx.createGain();
    subE.gain.setValueAtTime(0, t);
    subE.gain.linearRampToValueAtTime(vel * 0.38, t + 0.008);
    subE.gain.exponentialRampToValueAtTime(0.001, t + dur);
    sub.connect(subE); subE.connect(ctx.destination);
    sub.start(t); sub.stop(t + dur + 0.01);
  },

  // ── Grosse caisse ───────────────────────────────────────
  _kick(t) {
    const ctx = this.ctx;
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(140, t);
    o.frequency.exponentialRampToValueAtTime(30, t + 0.2);
    const e = ctx.createGain();
    e.gain.setValueAtTime(1.5, t);
    e.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
    o.connect(e); e.connect(ctx.destination);
    o.start(t); o.stop(t + 0.32);
    // Claquement d'attaque
    const b = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.015), ctx.sampleRate);
    const d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const ns = ctx.createBufferSource(); ns.buffer = b;
    const g = ctx.createGain(); g.gain.value = 0.55;
    ns.connect(g); g.connect(ctx.destination); ns.start(t);
  },

  // ── Caisse claire ───────────────────────────────────────
  _snare(t) {
    const ctx = this.ctx;
    // Corps (tonalité)
    const o = ctx.createOscillator();
    o.type = 'triangle';
    o.frequency.setValueAtTime(230, t);
    o.frequency.exponentialRampToValueAtTime(95, t + 0.1);
    const e = ctx.createGain();
    e.gain.setValueAtTime(0.55, t);
    e.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
    o.connect(e); e.connect(ctx.destination);
    o.start(t); o.stop(t + 0.15);
    // Timbre (bruit filtré)
    const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.18), ctx.sampleRate);
    const d   = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const ns  = ctx.createBufferSource(); ns.buffer = buf;
    const bp  = ctx.createBiquadFilter();
    bp.type   = 'bandpass'; bp.frequency.value = 3800; bp.Q.value = 0.85;
    const g   = ctx.createGain();
    g.gain.setValueAtTime(0.7, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.17);
    ns.connect(bp); bp.connect(g); g.connect(ctx.destination); ns.start(t);
  },

  // ── Charley (hi-hat) ────────────────────────────────────
  _hihat(t) {
    const ctx = this.ctx;
    const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.035), ctx.sampleRate);
    const d   = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const ns  = ctx.createBufferSource(); ns.buffer = buf;
    const hp  = ctx.createBiquadFilter();
    hp.type   = 'highpass'; hp.frequency.value = 8000;
    const g   = ctx.createGain();
    g.gain.setValueAtTime(0.20, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.035);
    ns.connect(hp); hp.connect(g); g.connect(ctx.destination); ns.start(t);
  },
};

// ─── Contrôle musique ─────────────────────────────────────

let usingMP3 = false;

function tryPlayMusic() {
  const audio = document.getElementById('bgMusic');
  const src   = audio && audio.querySelector('source');
  if (src && src.getAttribute('src')) {
    audio.volume = 0.42;
    audio.play()
      .then(() => { musicEnabled = true; usingMP3 = true; updateMusicBtn(); })
      .catch(() => _startSynth());
    return;
  }
  _startSynth();
}

function _startSynth() {
  try {
    MetalSynth.start();
    musicEnabled = true; usingMP3 = false;
    updateMusicBtn();
  } catch(e) {}
}

function toggleMusic() {
  if (musicEnabled) {
    if (usingMP3) document.getElementById('bgMusic').pause();
    else MetalSynth.stop();
    musicEnabled = false;
  } else {
    if (usingMP3) {
      document.getElementById('bgMusic').play()
        .then(() => { musicEnabled = true; })
        .catch(() => {});
    } else {
      _startSynth();
    }
  }
  updateMusicBtn();
}

function updateMusicBtn() {
  const btn = document.getElementById('musicToggle');
  if (!btn) return;
  btn.classList.toggle('playing', musicEnabled);
  btn.title = musicEnabled ? 'Couper la musique' : 'Lancer la musique';
}



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

// ─── loadContent : applique content.json au site ────────────
function loadContent() {
  fetch('/content.json')
    .then(r => r.ok ? r.json() : Promise.reject())
    .then(c => {
      // Textes simples via data-content
      document.querySelectorAll('[data-content]').forEach(el => {
        const key = el.getAttribute('data-content');
        if (c[key] !== undefined && c[key] !== '') el.textContent = c[key];
      });

      // Liens contact (href)
      if (c.contact_email) {
        const a = document.getElementById('contact_email_link');
        if (a) a.href = 'mailto:' + c.contact_email;
      }
      if (c.contact_phone) {
        const a = document.getElementById('contact_phone_link');
        if (a) a.href = 'tel:' + c.contact_phone.replace(/\s|\(0\)/g, '');
      }
      if (c.contact_instagram) {
        const a = document.getElementById('contact_instagram_link');
        const handle = c.contact_instagram.replace('@', '');
        if (a) a.href = 'https://www.instagram.com/' + handle;
      }
      if (c.contact_website) {
        const a = document.getElementById('contact_website_link');
        if (a) a.href = 'http://' + c.contact_website.replace(/^https?:\/\//, '');
      }

      // Photo portrait Serge
      if (c.about_portrait) {
        const img = document.querySelector('.about-image-wrap img');
        if (img) { img.src = c.about_portrait; img.removeAttribute('onerror'); }
      }

      // Covers des galeries (background-image)
      const coverMap = {
        cover_mode:        '[onclick*="mode"] .portfolio-bg',
        cover_portraits:   '[onclick*="portraits"] .portfolio-bg',
        cover_reportages:  '[onclick*="reportages"] .portfolio-bg',
        cover_hotellerie:  '[onclick*="hotellerie"] .portfolio-bg',
        cover_lingerie:    '[onclick*="lingerie"] .portfolio-bg',
        cover_gastronomie: '[onclick*="gastronomie"] .portfolio-bg',
      };
      Object.entries(coverMap).forEach(([key, sel]) => {
        if (c[key]) {
          const el = document.querySelector(sel);
          if (el) el.style.backgroundImage = `url('${ep(c[key])}')`;
        }
      });
    })
    .catch(() => {}); // Silencieux si pas de content.json
}

document.addEventListener('DOMContentLoaded', () => {
  loadContent();
  initIntro();
  initHero();
  initNav();
  initPortfolioKeys();

  const musicBtn = document.getElementById('musicToggle');
  if (musicBtn) musicBtn.addEventListener('click', toggleMusic);
});
