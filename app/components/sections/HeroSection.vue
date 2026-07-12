<template>
  <section class="pit-hero">
    <div
      class="pit-hero__media"
      aria-hidden="true">
      <img
        v-if="page.heroImage"
        :src="page.heroImage"
        alt=""
        class="pit-hero__img" />
      <div class="pit-hero__shade"></div>
      <div class="pit-hero__stripe"></div>
    </div>

    <div class="pit-container pit-hero__content">
      <p
        class="pit-eyebrow"
        data-pit-intro
        :style="{ '--pit-delay': '0ms' }">
        {{ page.badge }}
        <template v-if="page.city"> · {{ page.city }}</template>
      </p>

      <h1
        class="pit-hero__title"
        data-pit-intro
        :style="{ '--pit-delay': '80ms' }">
        Votre garage de confiance
        <span class="pit-hero__accent">à {{ page.city || 'proximité' }}</span>
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
          href="#contact"
          class="pit-btn pit-btn--ghost"
          >{{ page.ctaQuoteLabel }}</a
        >
      </div>
    </div>
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
  min-height: min(88vh, 52rem);
  display: grid;
  align-items: end;
  padding-block: 5rem 4.5rem;
  overflow: hidden;
}

.pit-hero__media {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.pit-hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: saturate(0.85) contrast(1.05);
}

.pit-hero__shade {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      90deg,
      color-mix(in srgb, var(--pit-bg) 92%, transparent) 0%,
      color-mix(in srgb, var(--pit-bg) 55%, transparent) 48%,
      color-mix(in srgb, var(--pit-bg) 35%, transparent) 100%
    ),
    linear-gradient(0deg, var(--pit-bg) 0%, transparent 42%);
}

.pit-hero__stripe {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--pit-red), transparent 70%);
}

.pit-hero__content {
  position: relative;
  z-index: 1;
  max-width: 40rem;
  margin-inline: 0 auto 0;
}

.pit-hero__title {
  margin-top: 1rem;
  font-family: var(--pit-font-display);
  font-weight: 800;
  font-size: clamp(2.6rem, 7vw, 4.4rem);
  line-height: 0.98;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  text-wrap: balance;
}

.pit-hero__accent {
  display: block;
  color: var(--pit-red);
}

.pit-hero__lead {
  margin-top: 1.15rem;
  color: color-mix(in srgb, var(--pit-ink) 82%, transparent);
  font-size: 1.08rem;
  line-height: 1.65;
  max-width: 34rem;
}

.pit-hero__points {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-top: 1.4rem;
  padding: 0;
  list-style: none;
}

.pit-hero__points li {
  padding: 0.4rem 0.75rem;
  border: 1px solid var(--pit-line);
  background: color-mix(in srgb, var(--pit-bg) 55%, transparent);
  font-family: var(--pit-font-display);
  font-weight: 600;
  font-size: 0.82rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.pit-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.75rem;
}
</style>
