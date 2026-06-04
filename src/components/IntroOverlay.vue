<template>
  <Transition name="intro-fade" @after-leave="$emit('done')">
    <div v-if="visible" class="intro-overlay">
      <div v-for="(p, i) in photos" :key="i"
           :class="['intro-photo', { visible: shown[i] }]"
           :style="p.style + ';--rot:' + p.rot + 'deg'">
        <img :src="ep(p.path)" alt="" loading="eager">
      </div>

      <div class="intro-center">
        <p class="intro-eyebrow">Photographe professionnel</p>
        <h1 class="intro-name">Serge Cohen-Uzan</h1>
        <button class="intro-enter" @click="enter">Entrer</button>
      </div>

      <button class="intro-skip" @click="enter">Passer →</button>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { INTRO_PHOTOS, ep } from '../data/galleries.js'
import { useAppStore } from '../stores/app.js'

const emit  = defineEmits(['done', 'enter'])
const store = useAppStore()
const visible = ref(true)
const shown   = ref(Array(INTRO_PHOTOS.length).fill(false))
const photos  = INTRO_PHOTOS

let timers = []

function enter() {
  visible.value = false
  store.completeIntro()
  emit('enter')
}

onMounted(() => {
  photos.forEach((p, i) => {
    const t = setTimeout(() => { shown.value[i] = true }, p.delay * 1000 + 80)
    timers.push(t)
  })
  // Auto-dismiss
  timers.push(setTimeout(() => { if (visible.value) enter() }, 8000))
})

onUnmounted(() => timers.forEach(clearTimeout))
</script>

<style scoped>
.intro-fade-leave-active { transition: opacity 1s ease; }
.intro-fade-leave-to     { opacity: 0; }
</style>
