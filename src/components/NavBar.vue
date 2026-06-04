<template>
  <nav :class="['nav', { scrolled }]">
    <div class="nav-inner">
      <router-link to="/" class="nav-logo">Serge Cohen-Uzan</router-link>

      <button :class="['nav-toggle', { open: menuOpen }]"
              @click="menuOpen = !menuOpen" aria-label="Menu">
        <span/><span/><span/>
      </button>

      <ul :class="['nav-links', { open: menuOpen }]" @click="menuOpen = false">
        <li><router-link to="/galerie/mode">Mode</router-link></li>
        <li><router-link to="/galerie/portraits">Portraits</router-link></li>
        <li><router-link to="/galerie/reportages">Reportages</router-link></li>
        <li><router-link to="/galerie/hotellerie">Hôtellerie</router-link></li>
        <li><router-link to="/galerie/lingerie">Lingerie</router-link></li>
        <li><router-link to="/galerie/gastronomie">Gastronomie</router-link></li>
        <li><a href="#about"   @click.prevent="scrollTo('about')">À propos</a></li>
        <li><a href="#contact" @click.prevent="scrollTo('contact')">Contact</a></li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router  = useRouter()
const scrolled = ref(false)
const menuOpen = ref(false)

function onScroll() { scrolled.value = window.scrollY > 60 }

function scrollTo(id) {
  menuOpen.value = false
  if (router.currentRoute.value.path !== '/') {
    router.push('/').then(() => setTimeout(() => scrollById(id), 80))
  } else {
    scrollById(id)
  }
}

function scrollById(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>
