<template>
  <section class="pit-section">
    <div class="pit-container">
      <div
        data-pit-reveal
        class="pit-section__head">
        <p class="pit-eyebrow">Méthode</p>
        <h2 class="pit-heading">{{ heading }}</h2>
      </div>

      <ol class="pit-process">
        <li
          v-for="(item, index) in items"
          :key="item.step"
          class="pit-process__item"
          data-pit-reveal
          :style="{ '--pit-delay': `${index * 70}ms` }">
          <span class="pit-process__step">{{ item.step }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { PitlaneProcessItem } from '~/types/pitlane'

defineProps({
  heading: {
    type: String,
    required: true,
  },
  items: {
    type: Array as PropType<PitlaneProcessItem[]>,
    required: true,
  },
})
</script>

<style scoped>
.pit-section__head {
  max-width: 40rem;
  margin-bottom: 2.2rem;
}

.pit-process {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1rem;
}

@media (min-width: 900px) {
  .pit-process {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1.1rem;
  }
}

.pit-process__item {
  padding: 1.35rem 1.2rem 1.5rem;
  border: 1px solid var(--pit-line);
  background: var(--pit-card);
  border-bottom: 3px solid var(--pit-red);
}

.pit-process__step {
  font-family: var(--pit-font-display);
  font-weight: 800;
  font-size: 1.5rem;
  color: var(--pit-red);
}

.pit-process__item h3 {
  margin-top: 0.7rem;
  font-family: var(--pit-font-display);
  font-weight: 700;
  font-size: 1.2rem;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.pit-process__item p {
  margin-top: 0.55rem;
  color: var(--pit-muted);
  line-height: 1.55;
  font-size: 0.95rem;
}
</style>
