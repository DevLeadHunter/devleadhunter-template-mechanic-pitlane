<template>
  <section
    id="atelier"
    class="pit-section">
    <div class="pit-container pit-about">
      <div
        class="pit-about__copy"
        data-pit-reveal>
        <p class="pit-eyebrow">À propos</p>
        <h2 class="pit-heading">{{ heading }}</h2>
        <div class="pit-about__text">
          <p
            v-for="(para, index) in paragraphs"
            :key="index">
            {{ para }}
          </p>
        </div>
        <a
          href="#contact"
          class="pit-btn pit-btn--red"
          >{{ ctaLabel }}</a
        >
      </div>

      <figure
        v-if="image"
        class="pit-about__media"
        data-pit-reveal
        :style="{ '--pit-delay': '120ms' }">
        <img
          :src="image"
          :alt="city ? `Atelier à ${city}` : 'Atelier du garage'" />
        <figcaption v-if="city">{{ city }}</figcaption>
      </figure>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { ComputedRef } from 'vue'

const props = defineProps({
  heading: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
  city: {
    type: String,
    default: '',
  },
  ctaLabel: {
    type: String,
    required: true,
  },
})

const paragraphs: ComputedRef<string[]> = computed((): string[] =>
  props.text
    .split(/\n+/)
    .map((part: string): string => part.trim())
    .filter((part: string): boolean => part.length > 0),
)
</script>

<style scoped>
.pit-about {
  display: grid;
  gap: 2rem;
  align-items: center;
}

@media (min-width: 900px) {
  .pit-about {
    grid-template-columns: 1.05fr 0.95fr;
    gap: 3rem;
  }
}

.pit-about__text {
  margin: 1.2rem 0 1.6rem;
  display: grid;
  gap: 0.9rem;
}

.pit-about__text p {
  color: var(--pit-muted);
  line-height: 1.7;
  font-size: 1.02rem;
}

.pit-about__media {
  position: relative;
  margin: 0;
}

.pit-about__media img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border: 1px solid var(--pit-line);
  filter: saturate(0.9);
}

.pit-about__media figcaption {
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 0.55rem 0.9rem;
  background: var(--pit-red);
  color: #fff;
  font-family: var(--pit-font-display);
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
</style>
