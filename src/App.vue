<template>
  <!-- Intro (première visite) -->
  <IntroOverlay v-if="!store.introCompleted"
                @enter="onEnter"
                @done="showMusic = true" />

  <!-- Bouton musique (visible après intro) -->
  <MusicToggle v-show="store.introCompleted || showMusic" ref="musicRef" />

  <!-- Navigation -->
  <NavBar />

  <!-- Pages -->
  <RouterView v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAppStore } from './stores/app.js'
import IntroOverlay from './components/IntroOverlay.vue'
import MusicToggle  from './components/MusicToggle.vue'
import NavBar       from './components/NavBar.vue'

const store     = useAppStore()
const musicRef  = ref(null)
const showMusic = ref(false)

onMounted(() => store.loadContent())

function onEnter() {
  showMusic.value = true
  // Tenter de lancer la musique après interaction utilisateur
  setTimeout(() => musicRef.value?.tryPlay(), 200)
}
</script>
