<template>
  <section id="portfolio">
    <div class="portfolio-grid">
      <div v-for="cat in categories" :key="cat.key"
           class="portfolio-item"
           role="button" tabindex="0"
           @click="$router.push('/galerie/' + cat.key)"
           @keydown.enter="$router.push('/galerie/' + cat.key)">
        <div class="portfolio-bg"
             :style="{ backgroundImage: `url('${ep(coverFor(cat.key))}')` }" />
        <div class="portfolio-shade" />
        <div class="portfolio-info">
          <div class="portfolio-arrow">→</div>
          <h2>{{ cat.title }}</h2>
          <p>{{ cat.sub }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useAppStore } from '../stores/app.js'
import { GALLERIES, ep } from '../data/galleries.js'

const store = useAppStore()

const categories = Object.entries(GALLERIES).map(([key, g]) => ({
  key, title: g.title, sub: g.sub, cover: g.cover
}))

function coverFor(key) {
  return store.content['cover_' + key] || GALLERIES[key].cover
}
</script>
