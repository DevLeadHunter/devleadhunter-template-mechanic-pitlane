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
          <template v-if="page.city">
            à
            {{ page.city }}
          </template>
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
            <span aria-hidden="true"></span>
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
          :alt="page.businessName || 'Garage'"
          class="pit-hero__img" />
        <div
          class="pit-hero__frame"
          aria-hidden="true"></div>
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
  min-height: min(78vh, 44rem);
}

@media (min-width: 960px) {
  .pit-hero__grid {
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
    gap: clamp(2rem, 5vw, 4rem);
  }
}

.pit-hero__copy {
  max-width: none;
  width: 100%;
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

.pit-hero__ribbon > * {
  display: inline-block;
  transform: skewX(8deg);
}

.pit-hero__title {
  margin-top: 1.35rem;
  font-family: var(--pit-font-display);
  font-weight: 800;
  font-size: clamp(3rem, 7.5vw, 5.4rem);
  line-height: 0.95;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  text-wrap: balance;
  max-width: 14ch;
}

.pit-hero__accent {
  color: var(--pit-red);
}

.pit-hero__lead {
  margin-top: 1.35rem;
  color: color-mix(in srgb, var(--pit-ink) 78%, transparent);
  font-size: clamp(1.05rem, 2vw, 1.2rem);
  line-height: 1.7;
  max-width: 38rem;
}

.pit-hero__points {
  display: grid;
  gap: 0.65rem;
  margin: 1.6rem 0 0;
  padding: 0;
  list-style: none;
}

@media (min-width: 640px) {
  .pit-hero__points {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.85rem;
  }
}

.pit-hero__points li {
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;
  padding: 0.85rem 0.95rem;
  border: 1px solid var(--pit-line);
  background: color-mix(in srgb, var(--pit-surface) 80%, transparent);
  font-family: var(--pit-font-display);
  font-weight: 600;
  font-size: 0.92rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  line-height: 1.3;
}

.pit-hero__points span {
  flex: none;
  width: 0.55rem;
  height: 0.55rem;
  margin-top: 0.28rem;
  background: var(--pit-red);
}

.pit-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 1.9rem;
}

.pit-hero__media {
  position: relative;
  min-height: 22rem;
}

@media (min-width: 960px) {
  .pit-hero__media {
    min-height: 34rem;
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
  border-radius: 0.35rem;
  filter: saturate(0.92) contrast(1.05);
}

.pit-hero__frame {
  position: absolute;
  inset: 1.1rem -0.85rem -0.85rem 1.1rem;
  border: 2px solid var(--pit-red);
  border-radius: 0.35rem;
  z-index: 0;
  pointer-events: none;
}

.pit-hero__rule {
  margin-top: clamp(2rem, 5vw, 3.5rem);
  height: 3px;
  background: linear-gradient(90deg, var(--pit-red), transparent 72%);
}
</style>
