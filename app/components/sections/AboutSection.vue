<template>
  <section
    id="atelier"
    class="pit-section pit-about-sec">
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
          href="#rdv"
          class="pit-btn pit-btn--red pit-btn--pill"
          >{{ ctaLabel }} <span aria-hidden="true">↗</span></a
        >
      </div>

      <div
        class="pit-about__stack"
        data-pit-reveal
        :style="{ '--pit-delay': '100ms' }">
        <!-- Roue + traits de vitesse (maquette AutoWorks) -->
        <svg
          class="pit-about__tire pit-about__tire--a"
          viewBox="0 0 220 180"
          aria-hidden="true">
          <g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round">
            <line
              x1="4"
              y1="54"
              x2="56"
              y2="54"
              stroke-width="7" />
            <line
              x1="0"
              y1="78"
              x2="62"
              y2="78"
              stroke-width="7" />
            <line
              x1="6"
              y1="102"
              x2="54"
              y2="102"
              stroke-width="7" />
            <line
              x1="14"
              y1="126"
              x2="48"
              y2="126"
              stroke-width="7" />
          </g>
          <g transform="translate(152 90)">
            <circle
              r="72"
              fill="currentColor" />
            <circle
              r="55"
              fill="#0c0c0d" />
            <circle
              r="49"
              fill="currentColor" />
            <g fill="#0c0c0d">
              <rect
                x="-7"
                y="-49"
                width="14"
                height="36"
                rx="5" />
              <rect
                x="-7"
                y="-49"
                width="14"
                height="36"
                rx="5"
                transform="rotate(72)" />
              <rect
                x="-7"
                y="-49"
                width="14"
                height="36"
                rx="5"
                transform="rotate(144)" />
              <rect
                x="-7"
                y="-49"
                width="14"
                height="36"
                rx="5"
                transform="rotate(216)" />
              <rect
                x="-7"
                y="-49"
                width="14"
                height="36"
                rx="5"
                transform="rotate(288)" />
            </g>
            <circle
              r="18"
              fill="#0c0c0d" />
            <circle
              r="12"
              fill="currentColor" />
            <circle
              r="5"
              fill="#0c0c0d" />
          </g>
        </svg>

        <figure
          v-if="image"
          class="pit-about__photo pit-about__photo--top">
          <img
            :src="image"
            :alt="city ? `Atelier à ${city}` : 'Atelier'"
            referrerpolicy="no-referrer"
            @error="onImgError" />
        </figure>

        <figure
          v-if="secondaryImage"
          class="pit-about__photo pit-about__photo--bottom">
          <img
            :src="secondaryImage"
            alt=""
            referrerpolicy="no-referrer"
            @error="onImgError" />
        </figure>

        <svg
          class="pit-about__tire pit-about__tire--b"
          viewBox="0 0 144 144"
          aria-hidden="true">
          <g transform="translate(72 72)">
            <circle
              r="70"
              fill="currentColor" />
            <circle
              r="54"
              fill="#0c0c0d" />
            <circle
              r="48"
              fill="currentColor" />
            <g fill="#0c0c0d">
              <rect
                x="-7"
                y="-48"
                width="14"
                height="34"
                rx="5" />
              <rect
                x="-7"
                y="-48"
                width="14"
                height="34"
                rx="5"
                transform="rotate(72)" />
              <rect
                x="-7"
                y="-48"
                width="14"
                height="34"
                rx="5"
                transform="rotate(144)" />
              <rect
                x="-7"
                y="-48"
                width="14"
                height="34"
                rx="5"
                transform="rotate(216)" />
              <rect
                x="-7"
                y="-48"
                width="14"
                height="34"
                rx="5"
                transform="rotate(288)" />
            </g>
            <circle
              r="17"
              fill="#0c0c0d" />
            <circle
              r="11"
              fill="currentColor" />
            <circle
              r="4.5"
              fill="#0c0c0d" />
          </g>
        </svg>
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

/**
 * Masque une image cassée.
 * @param event Événement erreur img
 */
function onImgError(event: Event): void {
  const img: HTMLImageElement = event.target as HTMLImageElement
  const figure: HTMLElement | null = img.closest('figure')
  if (figure) {
    figure.style.display = 'none'
  }
}
</script>

<style scoped>
.pit-about {
  display: grid;
  gap: 3rem;
  align-items: center;
}

@media (min-width: 960px) {
  .pit-about {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
    gap: 4rem;
  }
}

.pit-about__copy .pit-heading {
  max-width: 14ch;
  margin-top: 0.85rem;
}

.pit-about__text {
  margin: 1.35rem 0 1.8rem;
  display: grid;
  gap: 1rem;
}

.pit-about__text p {
  color: #a3a3a3;
  line-height: 1.75;
  font-size: 1.02rem;
  max-width: 34rem;
}

.pit-btn--pill {
  border-radius: 999px;
  box-shadow: none;
}

.pit-about__stack {
  position: relative;
  min-height: 24rem;
  margin: 1rem 0;
}

@media (min-width: 960px) {
  .pit-about__stack {
    min-height: 30rem;
  }
}

.pit-about__photo {
  margin: 0;
  overflow: hidden;
  position: relative;
  z-index: 2;
  background: #1a1a1a;
}

.pit-about__photo img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1) contrast(1.08);
}

/*
 * Maquette : image du haut — coin haut-gauche CARRÉ,
 * les 3 autres arrondis.
 */
.pit-about__photo--top {
  width: 72%;
  margin-left: auto;
  aspect-ratio: 5 / 4;
  border-radius: 0 1.5rem 1.5rem 1.5rem;
}

/* Image du bas : coin haut-droit carré, le reste arrondi */
.pit-about__photo--bottom {
  width: 62%;
  margin-top: -18%;
  aspect-ratio: 5 / 4;
  border-radius: 1.5rem 0 1.5rem 1.5rem;
  box-shadow: 0 24px 50px -20px rgba(0, 0, 0, 0.7);
}

.pit-about__tire {
  position: absolute;
  color: color-mix(in srgb, var(--pit-red) 62%, #2a080c);
  opacity: 0.72;
  z-index: 1;
  pointer-events: none;
}

.pit-about__tire--a {
  width: min(58%, 16rem);
  top: -4%;
  left: -2%;
}

.pit-about__tire--b {
  width: min(36%, 10.5rem);
  right: 0;
  bottom: 6%;
  z-index: 0;
  opacity: 0.58;
}
</style>
