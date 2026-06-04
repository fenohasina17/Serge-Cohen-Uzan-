<template>
  <div class="gallery-view">
    <!-- Header -->
    <div class="gallery-header">
      <button class="back-btn" @click="$router.push('/')">Retour au portfolio</button>
      <h1>{{ gallery.title }}</h1>
      <div class="gallery-divider" />
      <p class="gallery-header-sub">{{ gallery.sub }}</p>
      <p class="gallery-count">{{ gallery.photos.length }} photographies</p>
    </div>

    <!-- Masonry grid -->
    <div class="gallery-grid">
      <div v-for="(photo, i) in gallery.photos" :key="i"
           class="gallery-photo" @click="openAt(i)">
        <img :src="ep(photo)" alt="" loading="lazy"
             @load="e => e.target.classList.add('loaded')"
             @error="e => e.target.parentElement.style.display='none'">
        <div class="gallery-photo-overlay"><span>⊕</span></div>
      </div>
    </div>

    <!-- Lightbox -->
    <LightBox v-if="lbIndex !== null"
              :photos="gallery.photos"
              v-model:index="lbIndex"
              @close="lbIndex = null" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { GALLERIES, ep } from '../data/galleries.js'
import LightBox from '../components/LightBox.vue'

const route   = useRoute()
const router  = useRouter()
const lbIndex = ref(null)

const gallery = computed(() => {
  const key = route.params.category
  return GALLERIES[key] || { title: '', sub: '', photos: [] }
})

function openAt(i) { lbIndex.value = i }
</script>
