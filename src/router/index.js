import { createRouter, createWebHistory } from 'vue-router'
import HomeView    from '../views/HomeView.vue'
import GalleryView from '../views/GalleryView.vue'

const routes = [
  { path: '/',                   component: HomeView    },
  { path: '/galerie/:category',  component: GalleryView },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0, behavior: 'smooth' })
})
