<template>
  <section
    id="atelier"
    class="pit-section pit-about-sec">
    <div class="pit-container pit-about">
      <div
        class="pit-about__stack"
        data-pit-reveal>
        <div
          class="pit-about__wheel pit-about__wheel--back"
          aria-hidden="true">
          <svg
            viewBox="0 0 200 200"
            fill="none">
            <circle
              cx="100"
              cy="100"
              r="92"
              stroke="currentColor"
              stroke-width="4" />
            <circle
              cx="100"
              cy="100"
              r="28"
              stroke="currentColor"
              stroke-width="14" />
            <circle
              cx="100"
              cy="100"
              r="58"
              stroke="currentColor"
              stroke-width="2"
              stroke-dasharray="6 8" />
            <g
              stroke="currentColor"
              stroke-width="6">
              <path d="M100 42v36M100 122v36M42 100h36M122 100h36" />
              <path d="M60 60l26 26M114 114l26 26M140 60l-26 26M86 114l-26 26" />
            </g>
          </svg>
        </div>

        <figure
          v-if="secondaryImage"
          class="pit-about__photo pit-about__photo--back">
          <img
            :src="secondaryImage"
            alt=""
            loading="lazy" />
        </figure>

        <figure
          v-if="image"
          class="pit-about__photo pit-about__photo--front">
          <img
            :src="image"
            :alt="city ? `Atelier à ${city}` : 'Atelier du garage'" />
        </figure>

        <div
          class="pit-about__wheel pit-about__wheel--front"
          aria-hidden="true">
          <svg
            viewBox="0 0 120 120"
            fill="none">
            <circle
              cx="60"
              cy="60"
              r="54"
              stroke="currentColor"
              stroke-width="3" />
            <circle
              cx="60"
              cy="60"
              r="16"
              stroke="currentColor"
              stroke-width="8" />
          </svg>
        </div>
      </div>

      <div
        class="pit-about__copy"
        data-pit-reveal
        :style="{ '--pit-delay': '100ms' }">
        <p class="pit-eyebrow">À propos</p>
        <h2 class="pit-heading">{{ heading }}</h2>
        <p
          v-if="city"
          class="pit-about__tagline">
          Notre réputation parle pour nous — à {{ city }}
        </p>
        <div class="pit-about__text">
          <p
            v-for="(para, index) in paragraphs"
            :key="index">
            {{ para }}
          </p>
        </div>
        <a
          href="#rdv"
          class="pit-btn pit-btn--red"
          >{{ ctaLabel }} <span aria-hidden="true">↗</span></a
        >
      </div>
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
  secondaryImage: {
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
  gap: 2.5rem;
  align-items: center;
}

@media (min-width: 960px) {
  .pit-about {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
}

.pit-about__stack {
  position: relative;
  min-height: 22rem;
  margin: 1.5rem 0 2rem;
}

@media (min-width: 960px) {
  .pit-about__stack {
    min-height: 28rem;
    margin: 2rem 0;
  }
}

.pit-about__photo {
  margin: 0;
  overflow: hidden;
  border-radius: 0.4rem;
  border: 1px solid var(--pit-line);
}

.pit-about__photo img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(0.75) contrast(1.08);
}

.pit-about__photo--back {
  position: absolute;
  width: 58%;
  aspect-ratio: 3 / 4;
  top: 0;
  left: 0;
  z-index: 1;
}

.pit-about__photo--front {
  position: relative;
  width: 62%;
  margin-left: auto;
  margin-top: 18%;
  aspect-ratio: 4 / 5;
  z-index: 2;
  box-shadow: 0 24px 60px -28px rgba(0, 0, 0, 0.75);
}

.pit-about__wheel {
  position: absolute;
  color: var(--pit-red);
  pointer-events: none;
  z-index: 0;
}

.pit-about__wheel--back {
  width: min(55%, 14rem);
  top: -8%;
  right: 4%;
  opacity: 0.35;
}

.pit-about__wheel--front {
  width: 5.5rem;
  bottom: -0.5rem;
  left: 8%;
  z-index: 3;
  opacity: 0.95;
}

.pit-about__tagline {
  margin-top: 0.75rem;
  color: var(--pit-red);
  font-family: var(--pit-font-display);
  font-weight: 600;
  font-size: 1.05rem;
  letter-spacing: 0.03em;
}

.pit-about__text {
  margin: 1.25rem 0 1.7rem;
  display: grid;
  gap: 0.95rem;
}

.pit-about__text p {
  color: var(--pit-muted);
  line-height: 1.75;
  font-size: 1.05rem;
}

.pit-about__copy .pit-heading {
  max-width: 14ch;
}
</style>
