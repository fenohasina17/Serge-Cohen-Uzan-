<template>
  <section id="about" class="about-section">
    <div class="cities-bg" aria-hidden="true">{{ CITIES }}</div>
    <div class="about-inner">
      <div class="about-text">
        <p class="about-label">À propos</p>
        <h2>Serge Cohen-Uzan</h2>
        <p class="about-profession">{{ c('hero_profession', 'Photographe · Créateur · Professionnel') }}</p>
        <p class="about-location">Paris / Tana · New York · Hong Kong · Kuala Lumpur</p>
        <p>{{ c('about_bio_1', bio1) }}</p>
        <p>{{ c('about_bio_2', bio2) }}</p>
        <p>{{ c('about_bio_3', bio3) }}</p>
        <div class="about-specialites">
          <span>Mode &amp; Fashion</span>
          <span>Portrait Institutionnel</span>
          <span>Reportage Corporate</span>
          <span>Hôtellerie &amp; Voyages</span>
          <span>Lingerie</span>
          <span>Gastronomie</span>
        </div>
      </div>
      <div class="about-image-wrap">
        <img :src="portraitSrc"
             @error="onImgError"
             alt="Serge Cohen-Uzan, photographe">
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '../stores/app.js'
import { CITIES } from '../data/galleries.js'

const store = useAppStore()

const bio1 = 'Photographe de réputation internationale, Serge Cohen-Uzan développe depuis plus de deux décennies une œuvre photographique d\'exception. Entre Paris, New York, Hong Kong, Kuala Lumpur et Madagascar, son objectif capture avec la même intensité les visages, les lieux et les instants qui font l\'histoire.'
const bio2 = 'Spécialisé dans la mode, le portrait et le reportage institutionnel, il collabore avec les plus grandes maisons de couture, agences de communication et publications internationales.'
const bio3 = 'Directeur de la photographie pour Madagascar Magazine, son approche subtile du portrait révèle l\'essence de chaque sujet avec une lumière maîtrisée et un sens aigu de la composition.'

function c(key, fallback) { return store.content[key] || fallback }

const portraitSrc = computed(() =>
  store.content.about_portrait || 'photos/portraits/1M5A2529a%20copie.jpg'
)

function onImgError(e) {
  e.target.src = 'photos/portraits/1M5A2529a%20copie.jpg'
}
</script>
