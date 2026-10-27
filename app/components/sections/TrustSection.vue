<template>
  <section
    class="pit-trust"
    aria-label="Chiffres clés">
    <div
      class="pit-container pit-trust__grid"
      :style="{ '--pit-trust-longest-word': longestValueWordLength }">
      <div
        v-for="(item, index) in items"
        :key="`${item.value}-${item.label}`"
        class="pit-trust__item"
        data-pit-reveal
        :style="{ '--pit-delay': `${index * 60}ms` }">
        <div class="pit-trust__value-wrapper">
          <p class="pit-trust__value">{{ item.value }}</p>
        </div>
        <p class="pit-trust__label">{{ item.label }}</p>
      </div>
    </div>
    <p
      v-if="professionalLicense"
      class="pit-container pit-trust__license">
      {{ professionalLicense }}
    </p>
  </section>
</template>

<script lang="ts" setup>
import type { ComputedRef, PropType } from 'vue'
import type { PitlaneTrustItem } from '~/types/pitlane'

const props = defineProps({
  items: {
    type: Array as PropType<PitlaneTrustItem[]>,
    required: true,
  },
  professionalLicense: {
    type: String,
    default: '',
  },
})

const MINIMUM_WORD_LENGTH_FOR_FONT_SIZE: number = 5

const longestValueWordLength: ComputedRef<number> = computed((): number =>
  Math.max(
    MINIMUM_WORD_LENGTH_FOR_FONT_SIZE,
    ...props.items.flatMap((item: PitlaneTrustItem): number[] =>
      item.value.split(/\s+/).map((word: string): number => word.length),
    ),
  ),
)
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

.pit-trust__item {
  display: grid;
  grid-row: span 2;
  grid-template-rows: subgrid;
  row-gap: 0.65rem;
  min-width: 0;
}

.pit-trust__value-wrapper {
  align-self: end;
  min-width: 0;
  container-type: inline-size;
}

.pit-trust__value {
  font-family: var(--pit-font-pitlane-display);
  font-weight: 700;
  font-size: clamp(1.25rem, 4.2vw, 3.75rem);
  font-size: clamp(1.25rem, calc(100cqi / (var(--pit-trust-longest-word, 5) * 0.7)), 3.75rem);
  letter-spacing: -0.02em;
  line-height: 1.05;
  overflow-wrap: break-word;
  text-wrap: balance;
  color: #fff;
}

.pit-trust__license {
  margin: 1.5rem auto 0;
  color: #9a9a9a;
  font-family: var(--pit-font-pitlane-sans);
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-align: center;
}

.pit-trust__label {
  color: #9a9a9a;
  font-family: var(--pit-font-pitlane-sans);
  font-weight: 400;
  font-size: 0.95rem;
}
</style>
