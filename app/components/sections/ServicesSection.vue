<template>
  <section
    id="services"
    class="pit-section pit-services">
    <div class="pit-container">
      <div
        class="pit-services__head"
        data-pit-reveal>
        <div>
          <p class="pit-eyebrow">Ce que nous proposons</p>
          <h2 class="pit-heading">{{ heading }}</h2>
        </div>
        <a
          href="#rdv"
          class="pit-services__more"
          >Prendre rendez-vous</a
        >
      </div>

      <div class="pit-services__rail">
        <article
          v-for="(service, index) in services"
          :key="service.title"
          class="pit-service"
          data-pit-reveal
          :style="{ '--pit-delay': `${index * 60}ms` }">
          <div class="pit-service__media">
            <img
              v-if="service.image"
              :src="service.image"
              :alt="service.title"
              loading="lazy" />
            <div
              v-else
              class="pit-service__fallback"
              aria-hidden="true"></div>
            <div class="pit-service__shade"></div>
          </div>
          <div class="pit-service__label">
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            <h3>{{ service.title }}</h3>
          </div>
          <p class="pit-service__text">{{ service.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { PitlaneServiceItem } from '~/types/pitlane'

defineProps({
  heading: {
    type: String,
    required: true,
  },
  services: {
    type: Array as PropType<PitlaneServiceItem[]>,
    required: true,
  },
})
</script>

<style scoped>
.pit-services__head {
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  justify-content: space-between;
  gap: 1.25rem 2rem;
  margin-bottom: 2.2rem;
}

.pit-services__head .pit-heading {
  max-width: 18ch;
}

.pit-services__more {
  font-family: var(--pit-font-display);
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--pit-ink);
  text-decoration: none;
  border-bottom: 2px solid var(--pit-red);
  padding-bottom: 0.25rem;
}

.pit-services__more:hover {
  color: var(--pit-red);
}

.pit-services__rail {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 16.5rem), 1fr));
}

.pit-service {
  display: grid;
  grid-template-rows: auto auto 1fr;
  background: var(--pit-card);
  border: 1px solid var(--pit-line);
  overflow: hidden;
  transition: transform 0.25s ease;
}

.pit-service:hover {
  transform: translateY(-4px);
}

.pit-service__media {
  position: relative;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: #111;
}

.pit-service__media img,
.pit-service__fallback {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1) contrast(1.08);
  transition:
    transform 0.45s ease,
    filter 0.35s ease;
}

.pit-service__fallback {
  background:
    linear-gradient(145deg, #2a2a2e, #121214),
    repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 8px,
      color-mix(in srgb, var(--pit-red) 18%, transparent) 8px,
      color-mix(in srgb, var(--pit-red) 18%, transparent) 9px
    );
}

.pit-service:hover .pit-service__media img {
  transform: scale(1.06);
  filter: grayscale(0.35) contrast(1.05);
}

.pit-service__shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    0deg,
    color-mix(in srgb, var(--pit-bg) 88%, transparent) 0%,
    transparent 55%
  );
}

.pit-service__label {
  position: relative;
  margin-top: -4.2rem;
  z-index: 1;
  padding: 0 1.1rem;
  color: #fff;
}

.pit-service__label span {
  display: block;
  font-family: var(--pit-font-display);
  font-weight: 700;
  font-size: 0.8rem;
  letter-spacing: 0.14em;
  color: var(--pit-red);
}

.pit-service__label h3 {
  margin-top: 0.25rem;
  font-family: var(--pit-font-display);
  font-weight: 700;
  font-size: 1.45rem;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  line-height: 1.1;
}

.pit-service__text {
  padding: 0.95rem 1.1rem 1.25rem;
  color: var(--pit-muted);
  line-height: 1.55;
  font-size: 0.95rem;
}
</style>
