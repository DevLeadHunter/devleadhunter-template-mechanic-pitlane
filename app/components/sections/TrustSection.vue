<template>
  <section
    class="pit-trust"
    aria-label="Repères de confiance">
    <div class="pit-container pit-trust__grid">
      <div
        v-for="(item, index) in items"
        :key="`${item.value}-${item.label}`"
        class="pit-trust__item"
        data-pit-reveal
        :style="{ '--pit-delay': `${index * 70}ms` }">
        <p class="pit-trust__value">{{ item.value }}</p>
        <p class="pit-trust__label">{{ item.label }}</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { PitlaneTrustItem } from '~/types/pitlane'

defineProps({
  items: {
    type: Array as PropType<PitlaneTrustItem[]>,
    required: true,
  },
})
</script>

<style scoped>
.pit-trust {
  border-block: 1px solid var(--pit-line);
  background: var(--pit-surface);
  padding-block: 1.6rem;
}

.pit-trust__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.1rem 1.4rem;
}

@media (min-width: 800px) {
  .pit-trust__grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.pit-trust__value {
  font-family: var(--pit-font-display);
  font-weight: 800;
  font-size: clamp(1.55rem, 3vw, 2rem);
  letter-spacing: 0.02em;
  color: var(--pit-red);
}

.pit-trust__label {
  margin-top: 0.2rem;
  color: var(--pit-muted);
  font-size: 0.92rem;
}
</style>
