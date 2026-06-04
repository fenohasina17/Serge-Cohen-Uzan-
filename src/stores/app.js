import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const introCompleted = ref(sessionStorage.getItem('introSeen') === '1')
  const musicEnabled   = ref(false)
  const content        = ref({})

  async function loadContent() {
    try {
      const r = await fetch('/content.json')
      if (r.ok) content.value = await r.json()
    } catch {}
  }

  function completeIntro() {
    introCompleted.value = true
    sessionStorage.setItem('introSeen', '1')
  }

  return { introCompleted, musicEnabled, content, loadContent, completeIntro }
})
