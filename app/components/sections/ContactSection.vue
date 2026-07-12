<template>
  <section
    id="contact"
    class="pit-section pit-contact">
    <div class="pit-container pit-contact__grid">
      <div data-pit-reveal>
        <p class="pit-eyebrow">Contact</p>
        <h2 class="pit-heading">{{ page.contactHeading }}</h2>
        <p class="pit-lead">
          Un entretien, un devis, une panne ? Appelez l’atelier ou écrivez — on vous répond
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

        <p
          v-if="page.area || page.city"
          class="pit-contact__address">
          <template v-if="page.area">{{ page.area }}</template>
          <template v-if="page.area && page.city"><br /></template>
          <template v-if="page.city">{{ page.city }}</template>
        </p>

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

      <div
        v-if="page.openingHours.length"
        class="pit-hours"
        data-pit-reveal
        :style="{ '--pit-delay': '100ms' }">
        <h3>Horaires</h3>
        <ul>
          <li
            v-for="row in page.openingHours"
            :key="row.day">
            <span>{{ row.day }}</span>
            <span>{{ row.hours }}</span>
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
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--pit-red) 14%, transparent), transparent 42%),
    var(--pit-bg);
  border-top: 1px solid var(--pit-line);
}

.pit-contact__grid {
  display: grid;
  gap: 2.2rem;
}

@media (min-width: 860px) {
  .pit-contact__grid {
    grid-template-columns: 1.2fr 0.8fr;
    align-items: start;
    gap: 3rem;
  }
}

.pit-contact__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.6rem;
}

.pit-contact__address {
  margin-top: 1.5rem;
  color: var(--pit-muted);
  line-height: 1.55;
}

.pit-contact__zones {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin: 1rem 0 0;
  padding: 0;
  list-style: none;
}

.pit-contact__zones li {
  padding: 0.3rem 0.65rem;
  border: 1px solid var(--pit-line);
  font-family: var(--pit-font-display);
  font-weight: 600;
  font-size: 0.8rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--pit-muted);
}

.pit-hours {
  padding: 1.4rem 1.3rem;
  background: var(--pit-card);
  border: 1px solid var(--pit-line);
}

.pit-hours h3 {
  font-family: var(--pit-font-display);
  font-weight: 700;
  font-size: 1.2rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.pit-hours ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.55rem;
}

.pit-hours li {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--pit-line);
  font-size: 0.95rem;
}

.pit-hours li span:last-child {
  color: var(--pit-muted);
  text-align: right;
}
</style>
