<template>
  <section
    class="pit-trust"
    aria-label="Chiffres clés">
    <div class="pit-container pit-trust__grid">
      <div
        v-for="(item, index) in items"
        :key="`${item.value}-${item.label}`"
        class="pit-trust__item"
        data-pit-reveal
        :style="{ '--pit-delay': `${index * 60}ms` }">
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
  border-top: 2px solid var(--pit-red);
  border-bottom: 2px solid var(--pit-red);
  background: #141414;
  padding-block: clamp(2.75rem, 6vw, 4rem);
}

.pit-trust__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem 1.5rem;
  text-align: center;
}

@media (min-width: 900px) {
  .pit-trust__grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1.5rem;
  }
}

.pit-trust__value {
  font-family: var(--pit-font-pitlane-display);
  font-weight: 700;
  font-size: clamp(2.6rem, 5.5vw, 3.75rem);
  letter-spacing: -0.02em;
  line-height: 1;
  color: #fff;
}

.pit-trust__label {
  margin-top: 0.65rem;
  color: #9a9a9a;
  font-family: var(--pit-font-pitlane-sans);
  font-weight: 400;
  font-size: 0.95rem;
}
</style>
