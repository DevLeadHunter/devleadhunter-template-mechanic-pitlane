<template>
  <section class="pit-hero">
    <div class="pit-container pit-hero__grid">
      <div class="pit-hero__copy">
        <p
          class="pit-hero__ribbon"
          data-pit-intro
          :style="{ '--pit-delay': '0ms' }">
          <span>{{ page.badge }}</span>
        </p>

        <h1
          class="pit-hero__title"
          data-pit-intro
          :style="{ '--pit-delay': '80ms' }">
          Votre garage
          <span class="pit-hero__accent">de confiance</span>
          <template v-if="page.city"> à {{ page.city }}</template>
        </h1>

        <p
          class="pit-hero__lead"
          data-pit-intro
          :style="{ '--pit-delay': '160ms' }">
          {{ page.subtitle }}
        </p>

        <ul
          v-if="page.heroPoints.length"
          class="pit-hero__points"
          data-pit-intro
          :style="{ '--pit-delay': '220ms' }">
          <li
            v-for="point in page.heroPoints"
            :key="point">
            <svg
              viewBox="0 0 20 20"
              aria-hidden="true">
              <path
                d="M7.5 13.2 3.8 9.5l-1.3 1.3L7.5 15.8l10-10-1.3-1.3z"
                fill="currentColor" />
            </svg>
            {{ point }}
          </li>
        </ul>

        <div
          class="pit-hero__actions"
          data-pit-intro
          :style="{ '--pit-delay': '280ms' }">
          <a
            v-if="page.phone"
            :href="`tel:${page.phone}`"
            class="pit-btn pit-btn--red"
            >{{ page.ctaCallLabel }}</a
          >
          <a
            href="#rdv"
            class="pit-btn pit-btn--ghost"
            >{{ page.ctaQuoteLabel }}</a
          >
        </div>
      </div>

      <div
        class="pit-hero__media"
        data-pit-intro
        :style="{ '--pit-delay': '120ms' }">
        <img
          v-if="page.heroImage"
          :src="page.heroImage"
          :alt="`Atelier ${page.businessName || 'garage'}`"
          class="pit-hero__img" />
        <div
          class="pit-hero__disc"
          aria-hidden="true">
          <svg
            viewBox="0 0 120 120"
            fill="none">
            <circle
              cx="60"
              cy="60"
              r="56"
              stroke="currentColor"
              stroke-width="3" />
            <circle
              cx="60"
              cy="60"
              r="18"
              stroke="currentColor"
              stroke-width="8" />
            <circle
              cx="60"
              cy="60"
              r="36"
              stroke="currentColor"
              stroke-width="2"
              stroke-dasharray="4 6" />
          </svg>
        </div>
      </div>
    </div>
    <div
      class="pit-hero__rule"
      aria-hidden="true"></div>
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
.pit-hero {
  position: relative;
  padding-block: clamp(2.5rem, 6vw, 4.5rem) 0;
  overflow: hidden;
}

.pit-hero__grid {
  display: grid;
  gap: 2.5rem;
  align-items: center;
  min-height: min(72vh, 40rem);
}

@media (min-width: 960px) {
  .pit-hero__grid {
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    gap: clamp(2.5rem, 6vw, 5rem);
  }
}

.pit-hero__ribbon {
  display: inline-block;
  padding: 0.45rem 1.1rem;
  background: var(--pit-red);
  color: #fff;
  font-family: var(--pit-font-display);
  font-weight: 700;
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  transform: skewX(-8deg);
}

.pit-hero__ribbon span {
  display: inline-block;
  transform: skewX(8deg);
}

.pit-hero__title {
  margin-top: 1.35rem;
  font-family: var(--pit-font-display);
  font-weight: 800;
  font-size: clamp(2.8rem, 6.5vw, 4.8rem);
  line-height: 0.98;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  text-wrap: balance;
  max-width: 16ch;
}

.pit-hero__accent {
  color: var(--pit-red);
}

.pit-hero__lead {
  margin-top: 1.35rem;
  color: color-mix(in srgb, var(--pit-ink) 78%, transparent);
  font-size: clamp(1.05rem, 2vw, 1.18rem);
  line-height: 1.7;
  max-width: 36rem;
}

.pit-hero__points {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.75rem;
  margin: 1.75rem 0 0;
  padding: 0;
  list-style: none;
}

.pit-hero__points li {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-family: var(--pit-font-sans);
  font-weight: 600;
  font-size: 0.98rem;
  line-height: 1.35;
  color: var(--pit-ink);
  white-space: nowrap;
}

.pit-hero__points svg {
  flex: none;
  width: 1.15rem;
  height: 1.15rem;
  color: var(--pit-red);
}

.pit-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 1.9rem;
}

.pit-hero__media {
  position: relative;
  min-height: 20rem;
}

@media (min-width: 960px) {
  .pit-hero__media {
    min-height: 32rem;
    height: 100%;
  }
}

.pit-hero__img {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  min-height: inherit;
  object-fit: cover;
  object-position: center;
  border-radius: 0.45rem;
  filter: grayscale(0.25) contrast(1.05);
}

.pit-hero__disc {
  position: absolute;
  z-index: 0;
  right: -1.5rem;
  bottom: -1.5rem;
  width: min(42%, 11rem);
  color: var(--pit-red);
  opacity: 0.85;
  pointer-events: none;
}

.pit-hero__rule {
  margin-top: clamp(2rem, 5vw, 3.5rem);
  height: 3px;
  background: linear-gradient(90deg, var(--pit-red), transparent 72%);
}

@media (max-width: 639px) {
  .pit-hero__points li {
    white-space: normal;
    width: 100%;
  }
}
</style>
