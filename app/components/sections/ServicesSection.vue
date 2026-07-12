<template>
  <section
    id="services"
    class="pit-section">
    <div class="pit-container">
      <div
        data-pit-reveal
        class="pit-section__head">
        <p class="pit-eyebrow">Prestations</p>
        <h2 class="pit-heading">{{ heading }}</h2>
      </div>

      <div class="pit-services__grid">
        <article
          v-for="(service, index) in services"
          :key="service.title"
          class="pit-service"
          data-pit-reveal
          :style="{ '--pit-delay': `${index * 60}ms` }">
          <span
            class="pit-service__index"
            aria-hidden="true"
            >{{ String(index + 1).padStart(2, '0') }}</span
          >
          <h3 class="pit-service__title">{{ service.title }}</h3>
          <p class="pit-service__text">{{ service.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { PitlaneServiceItem } from '~/types/pitlane'

defineProps({
  heading: {
    type: String,
    required: true,
  },
  services: {
    type: Array as PropType<PitlaneServiceItem[]>,
    required: true,
  },
})
</script>

<style scoped>
.pit-section__head {
  max-width: 40rem;
  margin-bottom: 2.4rem;
}

.pit-services__grid {
  display: grid;
  gap: 1rem;
}

@media (min-width: 720px) {
  .pit-services__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .pit-services__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.pit-service {
  position: relative;
  padding: 1.45rem 1.35rem 1.55rem;
  background: var(--pit-card);
  border: 1px solid var(--pit-line);
  border-top: 2px solid transparent;
  transition:
    border-color 0.2s ease,
    transform 0.2s ease;
}

.pit-service:hover {
  border-top-color: var(--pit-red);
  transform: translateY(-2px);
}

.pit-service__index {
  font-family: var(--pit-font-display);
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.12em;
  color: var(--pit-red);
}

.pit-service__title {
  margin-top: 0.7rem;
  font-family: var(--pit-font-display);
  font-weight: 700;
  font-size: 1.35rem;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.pit-service__text {
  margin-top: 0.65rem;
  color: var(--pit-muted);
  line-height: 1.6;
  font-size: 0.98rem;
}
</style>
