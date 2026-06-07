import { createRouter, createWebHistory } from 'vue-router'
import HomeView    from '../views/HomeView.vue'
import GalleryView from '../views/GalleryView.vue'

const PAGE_TITLES = {
  '/':                          'Serge Cohen-Uzan — Photographe Créateur Professionnel | Paris / Tana',
  '/galerie/pressbook':         'Pressbook — Serge Cohen-Uzan Photographe | Paris',
  '/galerie/fashion':           'Fashion Photography — Serge Cohen-Uzan Photographe de Mode | Paris',
  '/galerie/makeup-artistes':   'Makeup Artistes — Serge Cohen-Uzan Photographe Beauté | Paris',
  '/galerie/beauty':            'Beauty Photography — Serge Cohen-Uzan Photographe | Paris',
  '/galerie/advertising':       'Advertising & Corporate — Serge Cohen-Uzan Photographe Publicitaire | Paris',
  '/galerie/fine-art':          'Fine Art Photography — Serge Cohen-Uzan Photographe Artistique',
  '/galerie/portraits-people':  'Portraits & People — Serge Cohen-Uzan Photographe Portraitiste | Paris',
  '/galerie/fashion-modeles':   'Fashion Modèles & Lingerie — Serge Cohen-Uzan Photographe | Paris',
  '/galerie/hotels-tourisme':   'Hôtels & Tourisme — Serge Cohen-Uzan Photographe | Paris / Monde',
}

const PAGE_DESCRIPTIONS = {
  '/':                          'Serge Cohen-Uzan, Photographe Créateur Professionnel. Fashion, Beauty, Advertising, Fine Art, Portraits, Hôtels & Tourisme. Paris / Tana — Tous déplacements monde.',
  '/galerie/pressbook':         'Pressbook de Serge Cohen-Uzan. Sélection des meilleures photographies : mode, portraits, hôtellerie, advertising. Photographe professionnel Paris.',
  '/galerie/fashion':           'Fashion photography par Serge Cohen-Uzan. Collections, défilés, catalogues mode. Photographe de mode professionnel à Paris et dans le monde.',
  '/galerie/makeup-artistes':   'Photographies makeup artistes par Serge Cohen-Uzan. Maquillage artistique, beauté, création. Photographe beauty Paris.',
  '/galerie/beauty':            'Beauty photography par Serge Cohen-Uzan. Portraits beauté glamour éditorial. Photographe beauté professionnel Paris.',
  '/galerie/advertising':       'Photographie publicitaire et corporate par Serge Cohen-Uzan. Advertising, reportage, événementiel. Photographe entreprises Paris.',
  '/galerie/fine-art':          'Fine Art Photography par Serge Cohen-Uzan. Photographie artistique, création, expression. Photographe d\'art Paris.',
  '/galerie/portraits-people':  'Portraits et People par Serge Cohen-Uzan. Portraits professionnels, institutionnels, artistiques, book. Photographe portraitiste Paris.',
  '/galerie/fashion-modeles':   'Fashion Modèles et Lingerie par Serge Cohen-Uzan. Défilés, catalogues, shooting lingerie. Photographe de lingerie Paris.',
  '/galerie/hotels-tourisme':   'Hôtels & Tourisme par Serge Cohen-Uzan. Hôtels de luxe, tourisme, destinations monde. Photographe hôtellerie Paris.',
}

const routes = [
  { path: '/',                  component: HomeView    },
  { path: '/galerie/:category', component: GalleryView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0, behavior: 'smooth' })
})

// Titre + meta description dynamiques par page
router.afterEach((to) => {
  const path = to.path
  document.title = PAGE_TITLES[path] || 'Serge Cohen-Uzan — Photographe Créateur Professionnel'

  const desc = PAGE_DESCRIPTIONS[path]
  if (desc) {
    let meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', desc)
  }
})

export default router
