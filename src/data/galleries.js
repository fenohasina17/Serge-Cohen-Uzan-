export function ep(path) {
  return path.split('/').map(seg =>
    seg.replace(/ /g,'%20').replace(/\(/g,'%28').replace(/\)/g,'%29').replace(/&/g,'%26')
  ).join('/')
}

// ─── Catégories exactes du site sergecohenuzan.com ──────────────────────────

export const GALLERIES = {

  pressbook: {
    title: 'Pressbook',
    sub: 'Sélection · Best of · Publications',
    cover: 'photos/mode/photo(37).jpg',
    photos: [
      'photos/mode/photo(1).jpg','photos/mode/photo(37).jpg','photos/mode/photo(76).jpg',
      'photos/mode/photo(117).jpg','photos/mode/photo(156).jpg','photos/mode/photo(4).jpg',
      'photos/mode/photo(60).jpg','photos/mode/photo(99).jpg','photos/mode/photo(140).jpg',
      'photos/mode/photo(183).jpg',
      'photos/portraits/1M5A2529a copie.jpg','photos/portraits/1M5A3700a.jpg',
      'photos/portraits/1M5A2625a copie.jpg','photos/portraits/1M5A2773.jpg',
      'photos/hotellerie/sukhothai-bkk/SUKHOTHAI BKK (1).jpg',
      'photos/hotellerie/sukhothai-bkk/SUKHOTHAI BKK (10).jpg',
      'photos/lingerie/maison-close/photodemodeparis.com (64).jpg',
      'photos/lingerie/maison-close/photodemodeparis.com (30).jpg',
      'photos/reportages/graphic-pros/cohen-uzan archi (25)001.jpg',
      'photos/gastronomie/paris-septanil/CASSITA.jpg',
    ]
  },

  fashion: {
    title: 'Fashion',
    sub: 'Collections · Défilés · Catalogues',
    cover: 'photos/mode/photo(1).jpg',
    photos: Array.from({ length: 199 }, (_, i) => `photos/mode/photo(${i + 1}).jpg`)
  },

  'makeup-artistes': {
    title: 'Makeup Artistes',
    sub: 'Maquillage artistique · Beauté · Création',
    cover: 'photos/portraits/1M5A4179a copie.jpg',
    photos: [
      'photos/portraits/1M5A1921a.jpg','photos/portraits/1M5A1940a copie.jpg',
      'photos/portraits/1M5A1949a copie.jpg','photos/portraits/1M5A1974a copie.jpg',
      'photos/portraits/1M5A2006a copie.jpg','photos/portraits/1M5A2062a copie.jpg',
      'photos/portraits/1M5A2073a copie.jpg','photos/portraits/1M5A2103 2a copie.jpg',
      'photos/portraits/1M5A2168.jpg','photos/portraits/1M5A2254a copie.jpg',
      'photos/portraits/1M5A2319a.jpg','photos/portraits/1M5A2425.jpg',
      'photos/portraits/1M5A4179a copie.jpg','photos/portraits/1M5A4179a.jpg',
      'photos/portraits/1M5A4231a copie.jpg','photos/portraits/1M5A4463 copie.jpg',
      'photos/portraits/1M5A4595 copie.jpg','photos/portraits/1M5A4742a.jpg',
      'photos/portraits/1M5A4962a copie.jpg',
    ]
  },

  beauty: {
    title: 'Beauty',
    sub: 'Portrait beauté · Glamour · Éditorial',
    cover: 'photos/portraits/1M5A2529a copie.jpg',
    photos: [
      'photos/portraits/1M5A2529a copie.jpg','photos/portraits/1M5A2536a copie.jpg',
      'photos/portraits/1M5A2551a copie.jpg','photos/portraits/1M5A2577a copie.jpg',
      'photos/portraits/1M5A2605a copie.jpg','photos/portraits/1M5A2625a copie.jpg',
      'photos/portraits/1M5A2631a copie.jpg','photos/portraits/1M5A2652a copie.jpg',
      'photos/portraits/1M5A2664a.jpg','photos/portraits/1M5A2700a copie.jpg',
      'photos/portraits/1M5A2728a copie.jpg','photos/portraits/1M5A2733a copie.jpg',
      'photos/portraits/1M5A2747.jpg','photos/portraits/1M5A2773.jpg',
      'photos/portraits/1M5A2774a copie.jpg','photos/portraits/1M5A2806a copie.jpg',
      'photos/portraits/1M5A2843a copie.jpg','photos/portraits/1M5A2868a copie.jpg',
      'photos/portraits/1M5A2894a copie.jpg','photos/portraits/1M5A2921a copie.jpg',
      'photos/portraits/1M5A2931a copie.jpg','photos/portraits/1M5A2942a copie.jpg',
      'photos/portraits/1M5A2973a copie.jpg',
    ]
  },

  advertising: {
    title: 'Advertising',
    sub: 'Publicité · Corporate · Éditorial',
    cover: 'photos/reportages/graphic-pros/cohen-uzan archi (25)001.jpg',
    photos: [
      'photos/reportages/graphic-pros/1SDT (2)001.jpg',
      'photos/reportages/graphic-pros/1sifec (3)001.jpg',
      'photos/reportages/graphic-pros/1sifec (4)001.jpg',
      'photos/reportages/graphic-pros/1sifec (5)001.jpg',
      'photos/reportages/graphic-pros/FEUILLE ROUGE copie001.jpg',
      'photos/reportages/graphic-pros/FEULLE OR001.jpg',
      'photos/reportages/graphic-pros/FLASHFASHION (88)001.jpg',
      'photos/reportages/graphic-pros/REPORTS (64)001.jpg',
      'photos/reportages/graphic-pros/RRR (147)001.jpg',
      'photos/reportages/graphic-pros/TABLEAU FEUILLES 2001.jpg',
      'photos/reportages/graphic-pros/cohen uzan sweet (16)001.jpg',
      'photos/reportages/graphic-pros/cohen-uzan archi (2)001.jpg',
      'photos/reportages/graphic-pros/cohen-uzan archi (3)001.jpg',
      'photos/reportages/graphic-pros/cohen-uzan archi (4)001.jpg',
      'photos/reportages/graphic-pros/cohen-uzan archi (5)001.jpg',
      'photos/reportages/graphic-pros/cohen-uzan archi (6)001.jpg',
      'photos/reportages/graphic-pros/cohen-uzan archi (7)001.jpg',
      'photos/reportages/graphic-pros/cohen-uzan archi (8)001.jpg',
      'photos/reportages/graphic-pros/cohen-uzan archi (10)001.jpg',
      'photos/reportages/graphic-pros/cohen-uzan archi (12)001.jpg',
      'photos/reportages/graphic-pros/cohen-uzan archi (14)001.jpg',
      'photos/reportages/graphic-pros/cohen-uzan archi (15)001.jpg',
      'photos/reportages/graphic-pros/cohen-uzan archi (16)001.jpg',
      'photos/reportages/graphic-pros/cohen-uzan archi (17)001.jpg',
      'photos/reportages/graphic-pros/cohen-uzan archi (18)001.jpg',
      'photos/reportages/graphic-pros/cohen-uzan archi (19)001.jpg',
      'photos/reportages/graphic-pros/cohen-uzan archi (23)001.jpg',
      'photos/reportages/graphic-pros/cohen-uzan archi (24)001.jpg',
      'photos/reportages/graphic-pros/cohen-uzan archi (25)001.jpg',
      'photos/reportages/graphic-pros/cohen-uzan archi (26)001.jpg',
      'photos/reportages/graphic-pros/cohen-uzan graphic (2)001.jpg',
      'photos/reportages/graphic-pros/cohen-uzan graphic (10)001.jpg',
      'photos/reportages/graphic-pros/cohen-uzan graphic (12)001.jpg',
      'photos/reportages/graphic-pros/cohen-uzan graphic (19)001.jpg',
      'photos/reportages/graphic-pros/cohen-uzan graphic (21)001.jpg',
      'photos/reportages/graphic-pros/cohen-uzan graphic (23)001.jpg',
      'photos/reportages/graphic-pros/cohen-uzan graphic (24)001.jpg',
      'photos/reportages/graphic-pros/cohen-uzan graphic (28)001.jpg',
      'photos/reportages/graphic-pros/cohen-uzan graphic (30)001.jpg',
      'photos/reportages/graphic-pros/cohen-uzan graphic (33)001.jpg',
      'photos/reportages/graphic-pros/cohen-uzan graphic (38)001.jpg',
      'photos/reportages/graphic-pros/cohen-uzan graphic (138)001.jpg',
      'photos/gastronomie/paris-septanil/CASSITA.jpg',
      'photos/gastronomie/paris-septanil/CASSITA (3).jpg',
      'photos/gastronomie/paris-septanil/CASSITA (4).jpg',
      'photos/gastronomie/paris-septanil/FLASHFASHIONstudio219.jpg',
      'photos/gastronomie/paris-septanil/REPORTS (63).jpg',
      'photos/gastronomie/paris-septanil/RESID ROY (2).jpg',
      'photos/gastronomie/paris-septanil/RESIDENCE ROYALE (5).jpg',
      'photos/gastronomie/paris-septanil/cohen uzan sweet (10)001.jpg',
      'photos/gastronomie/paris-septanil/cohen uzan sweet (11).jpg',
      'photos/gastronomie/paris-septanil/julien septanil au grand hotel (2)001.jpg',
      'photos/gastronomie/paris-septanil/julien septanil au grand hotel (3)001.jpg',
    ]
  },

  'fine-art': {
    title: 'Fine Art',
    sub: 'Art · Création · Expression',
    cover: 'photos/mode/photo(195).jpg',
    photos: [
      'photos/mode/photo(195).jpg','photos/mode/photo(194).jpg','photos/mode/photo(193).jpg',
      'photos/mode/photo(192).jpg','photos/mode/photo(191).jpg','photos/mode/photo(190).jpg',
      'photos/mode/photo(189).jpg','photos/mode/photo(188).jpg','photos/mode/photo(187).jpg',
      'photos/mode/photo(186).jpg','photos/mode/photo(185).jpg','photos/mode/photo(184).jpg',
      'photos/mode/photo(183).jpg','photos/mode/photo(182).jpg','photos/mode/photo(181).jpg',
      'photos/mode/photo(180).jpg','photos/mode/photo(179).jpg','photos/mode/photo(178).jpg',
      'photos/portraits/1M5A5790s.jpg','photos/portraits/1M5A5640a.jpg',
      'photos/portraits/1M5A5410a copie.jpg','photos/portraits/1M5A5375 acopie.jpg',
      'photos/portraits/1M5A5268a copie.jpg','photos/portraits/1M5A5217a copie.jpg',
      'photos/portraits/1M5A4962a copie.jpg',
    ]
  },

  'portraits-people': {
    title: 'Portraits / People',
    sub: 'Portraits professionnels · Artistiques · Book',
    cover: 'photos/portraits/1M5A3700a.jpg',
    photos: [
      'photos/portraits/1M5A2029a copie.jpg','photos/portraits/1M5A2033a copie.jpg',
      'photos/portraits/1M5A3065a 2 copie.jpg','photos/portraits/1M5A3087a copie.jpg',
      'photos/portraits/1M5A3167a copie.jpg','photos/portraits/1M5A3168a copie.jpg',
      'photos/portraits/1M5A3221a copie.jpg','photos/portraits/1M5A3231a copie.jpg',
      'photos/portraits/1M5A3248a copie.jpg','photos/portraits/1M5A3265a copie.jpg',
      'photos/portraits/1M5A3290a copie.jpg','photos/portraits/1M5A3336a.jpg',
      'photos/portraits/1M5A3369a.jpg','photos/portraits/1M5A3396a copie.jpg',
      'photos/portraits/1M5A3423a copie.jpg','photos/portraits/1M5A3431a copie.jpg',
      'photos/portraits/1M5A3460a copie.jpg','photos/portraits/1M5A3502 acopie.jpg',
      'photos/portraits/1M5A3514a copie.jpg','photos/portraits/1M5A3618a copie.jpg',
      'photos/portraits/1M5A3651a copie.jpg','photos/portraits/1M5A3700a.jpg',
      'photos/portraits/1M5A3755a copie.jpg','photos/portraits/1M5A3872a copie.jpg',
      'photos/portraits/1M5A3883a.jpg','photos/portraits/1M5A3917a copie.jpg',
      'photos/portraits/1M5A3983 2a copie.jpg','photos/portraits/1M5A4005a copie.jpg',
      'photos/portraits/1M5A4087a copie.jpg','photos/portraits/1M5A4120a copie.jpg',
      'photos/portraits/1M5A4130a 2.jpg','photos/portraits/1M5A4220a.jpg',
      'photos/portraits/1M5A4247 acopie.jpg','photos/portraits/1M5A4348a copie.jpg',
      'photos/portraits/1M5A4358a copie.jpg','photos/portraits/1M5A4365 2 copie.jpg',
      'photos/portraits/1M5A4396 copie.jpg','photos/portraits/1M5A4520 copie.jpg',
      'photos/portraits/1M5A4576a.jpg','photos/portraits/1M5A7144a.jpg',
      'photos/portraits/1M5A7302a copie.jpg','photos/portraits/1M5A7324a copie.jpg',
      'photos/portraits/1M5A7360a copie.jpg','photos/portraits/1M5A7404a copie.jpg',
    ]
  },

  'fashion-modeles': {
    title: 'Fashion Modèles',
    sub: 'Défilés · Lingerie · Shooting · Book modèle',
    cover: 'photos/lingerie/maison-close/photodemodeparis.com (64).jpg',
    photos: [
      'photos/lingerie/maison-close/photodemodeparis.com.jpg',
      ...Array.from({ length: 77 }, (_, i) =>
        `photos/lingerie/maison-close/photodemodeparis.com (${i + 1}).jpg`
      )
    ]
  },

  'hotels-tourisme': {
    title: 'Hôtels / Tourisme',
    sub: 'Hôtels de luxe · Tourisme · Destinations',
    cover: 'photos/hotellerie/sukhothai-bkk/SUKHOTHAI BKK (1).jpg',
    photos: Array.from({ length: 53 }, (_, i) =>
      `photos/hotellerie/sukhothai-bkk/SUKHOTHAI BKK (${i + 1}).jpg`
    )
  },

}

// ─── Hero slideshow ──────────────────────────────────────────────────────────
export const HERO_SLIDES = [
  'photos/mode/photo(1).jpg',
  'photos/portraits/1M5A3700a.jpg',
  'photos/hotellerie/sukhothai-bkk/SUKHOTHAI BKK (1).jpg',
  'photos/lingerie/maison-close/photodemodeparis.com (64).jpg',
]

// ─── Photos explosion intro ──────────────────────────────────────────────────
export const INTRO_PHOTOS = [
  { path: 'photos/mode/photo(1).jpg',           style: 'left:-1%;top:0%;width:22vw;height:28vw',      rot: -8,  delay: 0    },
  { path: 'photos/mode/photo(37).jpg',           style: 'left:20%;top:-2%;width:18vw;height:23vw',     rot:  5,  delay: 0.13 },
  { path: 'photos/mode/photo(76).jpg',           style: 'left:41%;top:0%;width:20vw;height:25vw',      rot:-11,  delay: 0.29 },
  { path: 'photos/portraits/1M5A3700a.jpg',      style: 'right:-1%;top:0%;width:23vw;height:30vw',     rot:  6,  delay: 0.09 },
  { path: 'photos/hotellerie/sukhothai-bkk/SUKHOTHAI BKK (1).jpg',               style: 'left:-1%;top:36%;width:20vw;height:26vw',  rot: -5, delay: 0.45 },
  { path: 'photos/lingerie/maison-close/photodemodeparis.com (64).jpg',           style: 'right:-1%;top:30%;width:21vw;height:28vw', rot:  9, delay: 0.19 },
  { path: 'photos/mode/photo(117).jpg',          style: 'left:-1%;bottom:0%;width:21vw;height:27vw',   rot:  7,  delay: 0.57 },
  { path: 'photos/gastronomie/paris-septanil/CASSITA.jpg',                        style: 'left:20%;bottom:-1%;width:19vw;height:24vw', rot: -6, delay: 0.49 },
  { path: 'photos/mode/photo(156).jpg',          style: 'left:41%;bottom:-1%;width:18vw;height:23vw',  rot: 12,  delay: 0.37 },
  { path: 'photos/reportages/graphic-pros/cohen-uzan archi (25)001.jpg',          style: 'right:-1%;bottom:0%;width:23vw;height:29vw', rot: -9, delay: 0.25 },
  { path: 'photos/portraits/1M5A2529a copie.jpg',style: 'left:24%;top:33%;width:14vw;height:19vw',    rot: -3,  delay: 0.53 },
  { path: 'photos/hotellerie/sukhothai-bkk/SUKHOTHAI BKK (15).jpg',              style: 'right:24%;top:29%;width:14vw;height:19vw',  rot:  5, delay: 0.41 },
]

// ─── Fond de villes ──────────────────────────────────────────────────────────
export const CITIES = 'PARIS TANA NEW YORK HONG KONG TOKYO ROME BARCELONE MADRID VENISE BERLIN AMSTERDAM DUBAI SINGAPOUR BANGKOK MUMBAI BALI KYOTO MONTRÉAL MIAMI ST TROPEZ CANNES NICE SEYCHELLES TAHITI HAWAI MARRAKECH ISTANBUL ATHÈNES MYKONOS MOSCOU ST PETERSBOURG BUDAPEST VIENNE FLORENCE CAPRI NAPLES LISBONNE PORTO BRUXELLES ZÜRICH STOCKHOLM OSLO HELSINKI PRAGUE VARSOVIE JAKARTA PENANG KUALA LUMPUR MANILLE PÉKIN SHANGHAI SÉOUL TAIPEI CARACAS RIO SÃO PAULO BUENOS AIRES MEXICO BOGOTA LIMA CASABLANCA TUNIS DJERBA NOSYBE DIEGO SUAREZ ANTSIRABE TULEAR MAJUNGA QUÉBEC GUADELOUPE MARTINIQUE RÉUNION MAURICE ZANZIBAR MALDIVES BAGAN ANGKOR VARANASI JAIPUR AGRA COLOMBO KATMANDU JÉRUSALEM LE CAIRE ALEXANDRIE RABAT FES PAROS SANTORIN CRETE RHODES MALTE SICILE SARDAIGNE CORSE MAJORQUE PARIS TANA'
