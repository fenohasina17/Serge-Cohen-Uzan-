<template>
  <section class="hero">
    <div class="hero-slides">
      <div v-for="(slide, i) in slides" :key="i"
           :class="['hero-slide', { active: current === i }]"
           :style="{ backgroundImage: `url('${ep(slide)}')` }" />
    </div>

    <div class="hero-overlay" />

    <div class="hero-content">
      <h1 class="hero-name">Serge Cohen-Uzan</h1>
      <p class="hero-profession">{{ c('hero_profession', 'Photographe · Créateur · Professionnel') }}</p>
      <p class="hero-location">{{ c('hero_location', 'Paris / Tana') }}</p>
      <div class="hero-rule" />
      <p class="hero-tagline">{{ c('hero_tagline', 'Mode · Portrait · Reportage · Hôtellerie') }}</p>
      <a href="#portfolio" class="hero-cta" @click.prevent="scrollToPortfolio">Découvrir le portfolio</a>
    </div>

    <div class="hero-scroll" @click="scrollToPortfolio"><span /></div>

    <div class="hero-dots">
      <div v-for="(_, i) in slides" :key="i"
           :class="['hero-dot', { active: current === i }]"
           @click="goTo(i)" />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAppStore } from '../stores/app.js'
import { HERO_SLIDES, ep } from '../data/galleries.js'

const store = useAppStore()
const slides  = HERO_SLIDES
const current = ref(0)
let timer     = null

function c(key, fallback) {
  return store.content[key] || fallback
}

function goTo(i) {
  current.value = i
  clearInterval(timer)
  timer = setInterval(advance, 5500)
}

function advance() {
  current.value = (current.value + 1) % slides.length
}

function scrollToPortfolio() {
  document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => { timer = setInterval(advance, 5500) })
onUnmounted(() => clearInterval(timer))
</script>
