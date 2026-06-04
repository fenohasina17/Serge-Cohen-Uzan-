<template>
  <button :class="['music-toggle', { playing }]"
          :title="playing ? 'Couper la musique' : 'Lancer la musique'"
          @click="toggle">♪</button>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { useMetalSynth } from '../composables/useMetalSynth.js'

const { playing, startSynth, stopSynth } = useMetalSynth()

const audio = new Audio('/son.mp3')
audio.loop = true
audio.volume = 0.42
let usingMp3 = false

async function toggle() {
  if (playing.value) {
    audio.pause()
    stopSynth()
  } else {
    try {
      await audio.play()
      usingMp3 = true
    } catch {
      usingMp3 = false
      startSynth()
    }
    if (usingMp3) playing.value = true
  }
}

// Called by parent after intro to try autoplay
defineExpose({
  async tryPlay() {
    try {
      await audio.play()
      usingMp3 = true
      playing.value = true
    } catch {
      startSynth()
    }
  }
})

onUnmounted(() => { audio.pause(); stopSynth() })
</script>
