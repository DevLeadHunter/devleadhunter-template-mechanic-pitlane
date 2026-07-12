<template>
  <section class="pit-section pit-gallery">
    <div class="pit-container">
      <div
        data-pit-reveal
        class="pit-gallery__head">
        <p class="pit-eyebrow">Galerie</p>
        <h2 class="pit-heading">{{ heading }}</h2>
      </div>

      <div class="pit-gallery__grid">
        <button
          v-for="(item, index) in visibleItems"
          :key="`${item.url}-${index}`"
          type="button"
          class="pit-gallery__item"
          data-pit-reveal
          :style="{ '--pit-delay': `${index * 45}ms` }"
          @click="openLightbox(index)">
          <img
            :src="item.url"
            :alt="item.alt || 'Photo atelier'"
            loading="lazy"
            referrerpolicy="no-referrer"
            @error="onBroken(index)" />
        </button>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="lightboxIndex !== null"
        class="pit-lightbox"
        role="dialog"
        aria-modal="true"
        aria-label="Aperçu photo"
        @click.self="closeLightbox">
        <button
          type="button"
          class="pit-lightbox__close"
          aria-label="Fermer"
          @click="closeLightbox">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
        <img
          :src="visibleItems[lightboxIndex]?.url"
          :alt="visibleItems[lightboxIndex]?.alt || ''"
          referrerpolicy="no-referrer" />
      </div>
    </Teleport>
  </section>
</template>

<script lang="ts" setup>
import type { ComputedRef, PropType, Ref } from 'vue'
import type { PitlaneGalleryItem } from '~/types/pitlane'

const props = defineProps({
  heading: {
    type: String,
    required: true,
  },
  items: {
    type: Array as PropType<PitlaneGalleryItem[]>,
    required: true,
  },
})

const broken: Ref<Set<number>> = ref(new Set())
const lightboxIndex: Ref<number | null> = ref(null)

const visibleItems: ComputedRef<PitlaneGalleryItem[]> = computed((): PitlaneGalleryItem[] =>
  props.items.filter((item: PitlaneGalleryItem, index: number): boolean => {
    return Boolean(item.url) && !broken.value.has(index)
  }),
)

/**
 * @param index Index galerie source
 * @returns void
 */
function onBroken(index: number): void {
  const next: Set<number> = new Set(broken.value)
  next.add(index)
  broken.value = next
}

/**
 * @param index Index visible
 * @returns void
 */
function openLightbox(index: number): void {
  lightboxIndex.value = index
}

/** @returns void */
function closeLightbox(): void {
  lightboxIndex.value = null
}

function onKey(event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    closeLightbox()
  }
}

onMounted((): void => {
  window.addEventListener('keydown', onKey)
})

onUnmounted((): void => {
  window.removeEventListener('keydown', onKey)
})
</script>

<style scoped>
.pit-gallery {
  background: var(--pit-surface);
}

.pit-gallery__head {
  margin-bottom: 2rem;
}

.pit-gallery__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}

@media (min-width: 900px) {
  .pit-gallery__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }
}

.pit-gallery__item {
  margin: 0;
  padding: 0;
  border: 0;
  background: #1a1a1a;
  overflow: hidden;
  border-radius: 0.85rem;
  cursor: pointer;
  display: block;
  width: 100%;
}

.pit-gallery__item img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  display: block;
  filter: grayscale(0.35) contrast(1.05);
  transition:
    transform 0.4s ease,
    filter 0.35s ease;
}

.pit-gallery__item:hover img {
  transform: scale(1.04);
  filter: grayscale(0) contrast(1.05);
}

.pit-lightbox {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(0, 0, 0, 0.92);
  display: grid;
  place-items: center;
  padding: 1.25rem;
}

.pit-lightbox img {
  max-width: min(96vw, 1100px);
  max-height: 88vh;
  object-fit: contain;
  border-radius: 0.5rem;
}

.pit-lightbox__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.75rem;
  height: 2.75rem;
  border: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  cursor: pointer;
  display: grid;
  place-items: center;
}

.pit-lightbox__close svg {
  width: 1.25rem;
  height: 1.25rem;
}
</style>
