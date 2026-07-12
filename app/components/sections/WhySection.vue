<template>
  <section class="pit-section pit-why">
    <div class="pit-container">
      <div
        data-pit-reveal
        class="pit-section__head">
        <p class="pit-eyebrow">Engagements</p>
        <h2 class="pit-heading">{{ heading }}</h2>
      </div>

      <div class="pit-why__grid">
        <article
          v-for="(item, index) in items"
          :key="item.title"
          class="pit-why__card"
          data-pit-reveal
          :style="{ '--pit-delay': `${index * 70}ms` }">
          <span
            class="pit-why__mark"
            aria-hidden="true"
            >{{ String(index + 1).padStart(2, '0') }}</span
          >
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { PitlaneWhyItem } from '~/types/pitlane'

defineProps({
  heading: {
    type: String,
    required: true,
  },
  items: {
    type: Array as PropType<PitlaneWhyItem[]>,
    required: true,
  },
})
</script>

<style scoped>
.pit-why {
  background: var(--pit-surface);
  border-block: 1px solid var(--pit-line);
}

.pit-section__head {
  max-width: 40rem;
  margin-bottom: 2.2rem;
}

.pit-why__grid {
  display: grid;
  gap: 1rem;
}

@media (min-width: 800px) {
  .pit-why__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.pit-why__card {
  padding: 1.4rem 1.35rem;
  background: color-mix(in srgb, var(--pit-bg) 70%, transparent);
  border: 1px solid var(--pit-line);
}

.pit-why__mark {
  display: inline-block;
  margin-bottom: 0.7rem;
  font-family: var(--pit-font-display);
  font-weight: 800;
  font-size: 1.1rem;
  color: var(--pit-red);
}

.pit-why__card h3 {
  font-family: var(--pit-font-display);
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.pit-why__card p {
  margin-top: 0.55rem;
  color: var(--pit-muted);
  line-height: 1.6;
}
</style>
