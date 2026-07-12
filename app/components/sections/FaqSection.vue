<template>
  <section
    id="faq"
    class="pit-section pit-faq-section">
    <div class="pit-container pit-faq-layout">
      <div
        class="pit-faq-layout__media"
        data-pit-reveal>
        <img
          v-if="image"
          :src="image"
          alt="Atelier garage"
          loading="lazy" />
        <div
          v-else
          class="pit-faq-layout__fallback"
          aria-hidden="true"></div>
        <div class="pit-faq-layout__caption">
          <p class="pit-eyebrow">FAQ</p>
          <h2 class="pit-heading">{{ heading }}</h2>
        </div>
      </div>

      <div
        class="pit-faq-layout__list"
        data-pit-reveal
        :style="{ '--pit-delay': '80ms' }">
        <details
          v-for="(item, index) in items"
          :key="item.question"
          class="pit-faq__item"
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
  image: {
    type: String,
    default: '',
  },
})
</script>

<style scoped>
.pit-faq-section {
  background: var(--pit-surface);
  border-block: 1px solid var(--pit-line);
}

.pit-faq-layout {
  display: grid;
  gap: 1.75rem;
  align-items: stretch;
}

@media (min-width: 960px) {
  .pit-faq-layout {
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    gap: 2.5rem;
  }
}

.pit-faq-layout__media {
  position: relative;
  min-height: 22rem;
  overflow: hidden;
  border: 1px solid var(--pit-line);
  background: var(--pit-card);
}

.pit-faq-layout__media img,
.pit-faq-layout__fallback {
  width: 100%;
  height: 100%;
  min-height: 22rem;
  object-fit: cover;
  filter: grayscale(0.85) contrast(1.08);
}

.pit-faq-layout__fallback {
  background:
    linear-gradient(160deg, #2a2a2e, #0f0f11),
    radial-gradient(
      circle at 30% 20%,
      color-mix(in srgb, var(--pit-red) 35%, transparent),
      transparent 50%
    );
}

.pit-faq-layout__caption {
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  padding: 1.4rem 1.3rem 1.5rem;
  background: linear-gradient(
    0deg,
    color-mix(in srgb, var(--pit-bg) 92%, transparent),
    transparent
  );
}

.pit-faq-layout__caption .pit-heading {
  max-width: 14ch;
  font-size: clamp(1.8rem, 3vw, 2.4rem);
}

.pit-faq-layout__list {
  display: grid;
  gap: 0.75rem;
  align-content: start;
  width: 100%;
  min-width: 0;
}

.pit-faq__item {
  border: 1px solid var(--pit-line);
  background: var(--pit-card);
  padding: 0 1.25rem;
}

.pit-faq__item summary {
  cursor: pointer;
  list-style: none;
  padding: 1.2rem 0;
  font-family: var(--pit-font-display);
  font-weight: 700;
  font-size: clamp(1.05rem, 2vw, 1.25rem);
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
  font-size: 1.35rem;
  line-height: 1;
}

.pit-faq__item[open] summary::after {
  content: '–';
}

.pit-faq__item p {
  margin: 0;
  padding: 0 0 1.25rem;
  color: var(--pit-muted);
  line-height: 1.7;
  font-size: 1.02rem;
  max-width: none;
}
</style>
