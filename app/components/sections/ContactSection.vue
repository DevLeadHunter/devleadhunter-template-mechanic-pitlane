<template>
  <section
    id="contact"
    class="pit-section pit-contact">
    <div class="pit-container pit-contact__inner">
      <div data-pit-reveal>
        <p class="pit-eyebrow">Contact</p>
        <h2 class="pit-heading">{{ page.contactHeading }}</h2>
        <p class="pit-lead pit-contact__lead">
          Un entretien, un devis, une panne ? Appelez l'atelier ou écrivez — on vous répond
          rapidement.
        </p>

        <div class="pit-contact__actions">
          <a
            v-if="page.phone"
            :href="`tel:${page.phone}`"
            class="pit-btn pit-btn--red"
            >{{ page.ctaCallLabel }} — {{ page.phone }}</a
          >
          <a
            v-if="page.email"
            :href="`mailto:${page.email}`"
            class="pit-btn pit-btn--ghost"
            >{{ page.email }}</a
          >
        </div>

        <ul
          v-if="page.zones.length"
          class="pit-contact__zones">
          <li
            v-for="zone in page.zones"
            :key="zone">
            {{ zone }}
          </li>
        </ul>
      </div>
    </div>
  </section>
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
</script>

<style scoped>
.pit-contact {
  background: var(--pit-bg);
  border-top: 1px solid var(--pit-line);
}

.pit-contact__inner {
  max-width: 54rem;
}

.pit-contact__lead {
  max-width: 38rem;
}

.pit-contact__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 2rem;
}

.pit-contact__zones {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin: 2rem 0 0;
  padding: 0;
  list-style: none;
}

.pit-contact__zones li {
  padding: 0.3rem 0.65rem;
  border: 1px solid var(--pit-line);
  font-family: var(--pit-font-pitlane-display);
  font-weight: 600;
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--pit-muted);
}
</style>
