<template>
  <footer class="pit-footer">
    <div class="pit-container pit-footer__grid">
      <div class="pit-footer__brand-col">
        <p class="pit-footer__brand">{{ page.businessName || 'Garage' }}</p>
        <p
          v-if="page.area || page.city"
          class="pit-footer__text">
          <template v-if="page.area">{{ page.area }}</template>
          <template v-if="page.area && page.city"><br /></template>
          <template v-if="page.city">{{ page.city }}</template>
        </p>
        <p
          v-if="page.phone"
          class="pit-footer__text">
          <a :href="`tel:${page.phone}`">{{ page.phone }}</a>
        </p>
        <p
          v-if="page.email"
          class="pit-footer__text">
          <a :href="`mailto:${page.email}`">{{ page.email }}</a>
        </p>
      </div>

      <div>
        <p class="pit-footer__title">Navigation</p>
        <ul class="pit-footer__links">
          <li><a href="#services">Services</a></li>
          <li><a href="#atelier">À propos</a></li>
          <li><a href="#avis">Avis</a></li>
          <li><a href="#rdv">Rendez-vous</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="#localisation">Nous trouver</a></li>
        </ul>
      </div>

      <div>
        <p class="pit-footer__title">Horaires</p>
        <ul
          v-if="page.openingHours.length"
          class="pit-footer__hours">
          <li
            v-for="row in page.openingHours.slice(0, 6)"
            :key="row.day">
            <span>{{ row.day }}</span>
            <span>{{ row.hours }}</span>
          </li>
        </ul>
        <p
          v-else
          class="pit-footer__text">
          Sur rendez-vous
        </p>
        <a
          href="#rdv"
          class="pit-btn pit-btn--red pit-footer__cta"
          >{{ page.ctaQuoteLabel }}</a
        >
      </div>
    </div>

    <div class="pit-container pit-footer__bottom">
      <p>© {{ year }} {{ page.businessName }} — Tous droits réservés</p>
      <p v-if="page.zones.length">Zone : {{ page.zones.join(' · ') }}</p>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { PitlanePageContent } from '~/types/pitlane'

defineProps({
  page: {
    type: Object as PropType<PitlanePageContent>,
    required: true,
  },
})

const year: number = new Date().getFullYear()
</script>

<style scoped>
.pit-footer {
  background: color-mix(in srgb, var(--pit-bg) 55%, black);
  border-top: 1px solid var(--pit-line);
  padding-top: 3rem;
}

.pit-footer__grid {
  display: grid;
  gap: 2rem;
  padding-bottom: 2.4rem;
}

@media (min-width: 860px) {
  .pit-footer__grid {
    grid-template-columns: 1.3fr 0.8fr 1fr;
    gap: 2.5rem;
  }
}

.pit-footer__brand {
  font-family: var(--pit-font-display);
  font-weight: 800;
  font-size: 1.55rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.pit-footer__title {
  font-family: var(--pit-font-display);
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--pit-red);
  margin-bottom: 0.9rem;
}

.pit-footer__text {
  margin-top: 0.55rem;
  color: var(--pit-muted);
  line-height: 1.55;
}

.pit-footer__text a {
  color: var(--pit-ink);
  text-decoration: none;
  font-weight: 600;
}

.pit-footer__text a:hover {
  color: var(--pit-red);
}

.pit-footer__links,
.pit-footer__hours {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.45rem;
}

.pit-footer__links a {
  color: var(--pit-muted);
  text-decoration: none;
  font-weight: 500;
}

.pit-footer__links a:hover {
  color: var(--pit-ink);
}

.pit-footer__hours li {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  color: var(--pit-muted);
  font-size: 0.92rem;
  padding-bottom: 0.35rem;
  border-bottom: 1px solid var(--pit-line);
}

.pit-footer__cta {
  margin-top: 1.2rem;
}

.pit-footer__bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.75rem 1.5rem;
  padding-block: 1.15rem 1.5rem;
  border-top: 1px solid var(--pit-line);
  color: var(--pit-muted);
  font-size: 0.86rem;
}
</style>
