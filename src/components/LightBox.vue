<template>
  <Teleport to="body">
    <div class="lightbox" @click.self="close" role="dialog" aria-modal="true">
      <button class="lb-close" @click="close" aria-label="Fermer">✕</button>
      <button class="lb-nav lb-prev" @click="prev" aria-label="Précédente">‹</button>
      <button class="lb-nav lb-next" @click="next" aria-label="Suivante">›</button>
      <div class="lb-image-wrap">
        <img :src="currentSrc" :class="{ fading }" alt="Photo agrandie">
      </div>
      <div class="lb-counter">{{ index + 1 }} / {{ photos.length }}</div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { ep } from '../data/galleries.js'

const props = defineProps({
  photos: { type: Array, required: true },
  index:  { type: Number, required: true }
})
const emit = defineEmits(['close', 'update:index'])

const fading = ref(false)
const currentSrc = ref('')

watch(() => props.index, loadImage, { immediate: true })

function loadImage(i) {
  fading.value = true
  setTimeout(() => {
    currentSrc.value = ep(props.photos[i])
    fading.value = false
  }, 220)
}

function prev() {
  const i = (props.index - 1 + props.photos.length) % props.photos.length
  emit('update:index', i)
}
function next() {
  const i = (props.index + 1) % props.photos.length
  emit('update:index', i)
}
function close() { emit('close') }

let touchStartX = 0

function onKey(e) {
  if (e.key === 'ArrowLeft')  prev()
  if (e.key === 'ArrowRight') next()
  if (e.key === 'Escape')     close()
}
function onTouchStart(e) { touchStartX = e.touches[0].clientX }
function onTouchEnd(e) {
  const dx = e.changedTouches[0].clientX - touchStartX
  if (Math.abs(dx) > 50) dx < 0 ? next() : prev()
}

onMounted(() => {
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', onKey)
  window.addEventListener('touchstart', onTouchStart, { passive: true })
  window.addEventListener('touchend',   onTouchEnd,   { passive: true })
})
onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKey)
  window.removeEventListener('touchstart', onTouchStart)
  window.removeEventListener('touchend',   onTouchEnd)
})
</script>
