<template>
  <section
    id="faq"
    class="pit-section">
    <div class="pit-container">
      <div
        data-pit-reveal
        class="pit-section__head">
        <p class="pit-eyebrow">FAQ</p>
        <h2 class="pit-heading">{{ heading }}</h2>
      </div>

      <div class="pit-faq">
        <details
          v-for="(item, index) in items"
          :key="item.question"
          class="pit-faq__item"
          data-pit-reveal
          :style="{ '--pit-delay': `${index * 50}ms` }"
          :open="index === 0">
          <summary>{{ item.question }}</summary>
          <p>{{ item.answer }}</p>
        </details>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { PitlaneFaqItem } from '~/types/pitlane'

defineProps({
  heading: {
    type: String,
    required: true,
  },
  items: {
    type: Array as PropType<PitlaneFaqItem[]>,
    required: true,
  },
})
</script>

<style scoped>
.pit-section__head {
  max-width: 40rem;
  margin-bottom: 1.8rem;
}

.pit-faq {
  display: grid;
  gap: 0.65rem;
  max-width: 48rem;
}

.pit-faq__item {
  border: 1px solid var(--pit-line);
  background: var(--pit-card);
  padding: 0 1.15rem;
}

.pit-faq__item summary {
  cursor: pointer;
  list-style: none;
  padding: 1.05rem 0;
  font-family: var(--pit-font-display);
  font-weight: 700;
  font-size: 1.15rem;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.pit-faq__item summary::-webkit-details-marker {
  display: none;
}

.pit-faq__item summary::after {
  content: '+';
  float: right;
  color: var(--pit-red);
  font-size: 1.25rem;
  line-height: 1;
}

.pit-faq__item[open] summary::after {
  content: '–';
}

.pit-faq__item p {
  margin: 0;
  padding: 0 0 1.15rem;
  color: var(--pit-muted);
  line-height: 1.65;
}
</style>
