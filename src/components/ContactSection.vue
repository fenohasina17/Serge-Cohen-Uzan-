<template>
  <section id="contact" class="contact-section">
    <div class="contact-inner">
      <p class="contact-label">Contact</p>
      <h2 class="contact-title">Travaillons ensemble</h2>
      <p class="contact-sub">Pour toute demande de collaboration, devis ou information</p>
      <div class="contact-items">
        <a :href="'mailto:' + c('contact_email','contact@sergecohenuzan.com')" class="contact-item">
          <span class="contact-icon">✉</span>
          {{ c('contact_email', 'contact@sergecohenuzan.com') }}
        </a>
        <a :href="'tel:' + phoneHref" class="contact-item">
          <span class="contact-icon">☏</span>
          {{ c('contact_phone', '+33 (0)6 75 53 67 28') }}
        </a>
        <a :href="instagramHref" target="_blank" rel="noopener" class="contact-item">
          <span class="contact-icon">◈</span>
          {{ c('contact_instagram', '@sergecohenuzan') }}
        </a>
        <a :href="websiteHref" target="_blank" rel="noopener" class="contact-item">
          <span class="contact-icon">◎</span>
          {{ c('contact_website', 'www.sergecohenuzan.com') }}
        </a>
      </div>
      <p class="contact-cities">Paris · Tana · New York · Hong Kong · Kuala Lumpur · Madagascar</p>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '../stores/app.js'

const store = useAppStore()

function c(key, fallback) { return store.content[key] || fallback }

const phoneHref = computed(() =>
  c('contact_phone', '+33675536728').replace(/[\s(0)]/g, '')
)
const instagramHref = computed(() => {
  const handle = c('contact_instagram', 'sergecohenuzan').replace('@', '')
  return `https://www.instagram.com/${handle}`
})
const websiteHref = computed(() =>
  'http://' + c('contact_website', 'www.sergecohenuzan.com').replace(/^https?:\/\//, '')
)
</script>
