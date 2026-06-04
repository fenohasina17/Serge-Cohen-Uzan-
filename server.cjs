/*
  Serge Cohen-Uzan — Serveur Express (API + production)
  ──────────────────────────────────────────────────────
  Développement : npm run dev  (Vite :5173 + API :3001)
  Production    : npm run build && npm run serve  (:3000)
  Admin         : /admin/   —  Mot de passe : ADMIN_PASSWORD || "scu2025"
*/

const express  = require('express');
const session  = require('express-session');
const multer   = require('multer');
const crypto   = require('crypto');
const fs       = require('fs');
const path     = require('path');

const app  = express();
const isDev = process.env.NODE_ENV !== 'production';
const PORT = isDev ? 3001 : (process.env.PORT || 3000);

// ── Mot de passe admin ───────────────────────────────────
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'scu2025';
const ADMIN_HASH = crypto.createHash('sha256').update(ADMIN_PASS).digest('hex');

// ── Middleware ───────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'scu-secret-' + ADMIN_HASH.slice(0, 8),
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 8 * 60 * 60 * 1000 } // 8 heures
}));

// Fichiers statiques partagés (photos, son, content.json, admin)
app.use('/photos',       express.static(path.join(__dirname, 'photos')));
app.use('/son.mp3',      express.static(path.join(__dirname, 'son.mp3')));
app.use('/content.json', express.static(path.join(__dirname, 'content.json')));
app.use('/admin',        express.static(path.join(__dirname, 'admin')));

// En production : servir le build Vue (dist/)
if (!isDev) {
  app.use(express.static(path.join(__dirname, 'dist')));
  // SPA fallback — toutes les routes → index.html
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/admin')) return next();
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

// ── Upload photos ────────────────────────────────────────
const uploadDir = path.join(__dirname, 'photos', 'uploads');
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${req.params.key}_${Date.now()}${ext}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15 Mo max
  fileFilter: (req, file, cb) => {
    if (/^image\/(jpeg|jpg|png|webp|gif)$/i.test(file.mimetype)) cb(null, true);
    else cb(new Error('Seules les images sont acceptées'));
  }
});

// ── Auth middleware ───────────────────────────────────────
function requireAuth(req, res, next) {
  if (req.session && req.session.authenticated) return next();
  res.status(401).json({ error: 'Non autorisé' });
}

// ── Routes API ────────────────────────────────────────────

// Connexion
app.post('/api/login', (req, res) => {
  const hash = crypto.createHash('sha256').update(req.body.password || '').digest('hex');
  if (hash === ADMIN_HASH) {
    req.session.authenticated = true;
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Mot de passe incorrect' });
  }
});

// Déconnexion
app.post('/api/logout', (req, res) => {
  req.session.destroy(() => res.json({ success: true }));
});

// Vérifier session
app.get('/api/me', (req, res) => {
  res.json({ authenticated: !!(req.session && req.session.authenticated) });
});

// Lire le contenu
app.get('/api/content', (req, res) => {
  try {
    const raw = fs.readFileSync(path.join(__dirname, 'content.json'), 'utf8');
    res.json(JSON.parse(raw));
  } catch (e) {
    res.json({});
  }
});

// Sauvegarder les textes
app.post('/api/content', requireAuth, (req, res) => {
  try {
    const file = path.join(__dirname, 'content.json');
    const current = JSON.parse(fs.readFileSync(file, 'utf8') || '{}');
    const updated = { ...current, ...req.body };
    fs.writeFileSync(file, JSON.stringify(updated, null, 2), 'utf8');
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Upload une photo et enregistrer son chemin
app.post('/api/upload/:key', requireAuth, upload.single('photo'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Aucun fichier reçu' });

  const url = `photos/uploads/${req.file.filename}`;
  try {
    const file = path.join(__dirname, 'content.json');
    const current = JSON.parse(fs.readFileSync(file, 'utf8') || '{}');
    current[req.params.key] = url;
    fs.writeFileSync(file, JSON.stringify(current, null, 2), 'utf8');
    res.json({ success: true, url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── Démarrage ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n✓ Serveur démarré (${isDev ? 'développement' : 'production'})`);
  if (isDev) {
    console.log(`  API   → http://localhost:${PORT}`);
    console.log(`  Site  → http://localhost:5173  (npm run dev)`);
  } else {
    console.log(`  Site  → http://localhost:${PORT}`);
  }
  console.log(`  Admin → http://localhost:${PORT}/admin/`);
  console.log(`  Mot de passe : ${ADMIN_PASS}\n`);
});
