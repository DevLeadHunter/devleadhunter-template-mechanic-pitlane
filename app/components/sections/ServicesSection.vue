<template>
  <section
    id="services"
    class="pit-section pit-services">
    <div class="pit-container">
      <div
        class="pit-services__head"
        data-pit-reveal>
        <div class="pit-services__titles">
          <p class="pit-eyebrow">Ce que nous proposons</p>
          <h2 class="pit-heading">{{ heading }}</h2>
        </div>
        <a
          href="#rdv"
          class="pit-btn pit-btn--red"
          >Prendre rendez-vous</a
        >
      </div>

      <div class="pit-services__rail">
        <article
          v-for="(service, index) in visibleServices"
          :key="service.title"
          class="pit-service"
          data-pit-reveal
          :style="{ '--pit-delay': `${index * 60}ms` }">
          <div class="pit-service__media">
            <img
              v-if="service.image && !broken.has(index)"
              :src="service.image"
              :alt="service.title"
              loading="lazy"
              referrerpolicy="no-referrer"
              @error="onBroken(index)" />
            <div
              v-else
              class="pit-service__fallback"
              aria-hidden="true"></div>
            <div class="pit-service__shade"></div>
            <div class="pit-service__label">
              <span>{{ String(index + 1).padStart(2, '0') }}</span>
              <h3>{{ service.title }}</h3>
            </div>
          </div>
          <p class="pit-service__text">{{ service.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { ComputedRef, PropType, Ref } from 'vue'
import type { PitlaneServiceItem } from '~/types/pitlane'

const props = defineProps({
  heading: {
    type: String,
    required: true,
  },
  services: {
    type: Array as PropType<PitlaneServiceItem[]>,
    required: true,
  },
})

const broken: Ref<Set<number>> = ref(new Set())

const visibleServices: ComputedRef<PitlaneServiceItem[]> = computed((): PitlaneServiceItem[] =>
  props.services.slice(0, 6),
)

/**
 * Masque une image service cassée (évite le carré blanc).
 * @param index Index carte
 */
function onBroken(index: number): void {
  const next: Set<number> = new Set(broken.value)
  next.add(index)
  broken.value = next
}
</script>

<style scoped>
.pit-services__head {
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  justify-content: space-between;
  gap: 1.25rem 2rem;
  margin-bottom: 2.4rem;
}

.pit-services__titles {
  min-width: 0;
  flex: 1 1 auto;
}

.pit-services__titles .pit-heading {
  margin-top: 0.7rem;
  white-space: nowrap;
  font-size: clamp(1.85rem, 3.4vw, 2.75rem);
}

@media (max-width: 540px) {
  .pit-services__titles .pit-heading {
    white-space: normal;
  }
}

.pit-services__rail {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: 1fr;
}

@media (min-width: 700px) {
  .pit-services__rail {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .pit-services__rail {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.pit-service {
  display: flex;
  flex-direction: column;
  background: var(--pit-card);
  border: 1px solid var(--pit-line);
  border-radius: 0.85rem;
  overflow: hidden;
  transition: transform 0.25s ease;
}

.pit-service:hover {
  transform: translateY(-4px);
}

.pit-service__media {
  position: relative;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background: #111;
}

.pit-service__media img,
.pit-service__fallback {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1) contrast(1.1);
  transition:
    transform 0.45s ease,
    filter 0.35s ease;
}

.pit-service__fallback {
  background: linear-gradient(145deg, #2a2a2e, #121214);
}

.pit-service:hover .pit-service__media img {
  transform: scale(1.05);
  filter: grayscale(0.2) contrast(1.05);
}

.pit-service__shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    0deg,
    color-mix(in srgb, var(--pit-bg) 92%, transparent) 0%,
    transparent 50%
  );
}

.pit-service__label {
  position: absolute;
  left: 1.1rem;
  right: 1.1rem;
  bottom: 1.1rem;
  z-index: 1;
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
  margin-top: 0.3rem;
  font-family: var(--pit-font-display);
  font-weight: 700;
  font-size: clamp(1.25rem, 2vw, 1.55rem);
  letter-spacing: 0.02em;
  text-transform: uppercase;
  line-height: 1.1;
}

.pit-service__text {
  padding: 1.05rem 1.15rem 1.3rem;
  color: var(--pit-muted);
  line-height: 1.55;
  font-size: 0.95rem;
  flex: 1;
}
</style>
