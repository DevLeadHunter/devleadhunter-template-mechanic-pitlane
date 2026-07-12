<template>
  <section class="pit-section pit-gallery">
    <div class="pit-container">
      <div
        data-pit-reveal
        class="pit-section__head">
        <p class="pit-eyebrow">Galerie</p>
        <h2 class="pit-heading">{{ heading }}</h2>
      </div>

      <div class="pit-gallery__grid">
        <figure
          v-for="(item, index) in items"
          :key="item.url"
          class="pit-gallery__item"
          data-pit-reveal
          :style="{ '--pit-delay': `${index * 50}ms` }">
          <img
            :src="item.url"
            :alt="item.alt || 'Photo atelier'"
            loading="lazy" />
        </figure>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { PitlaneGalleryItem } from '~/types/pitlane'

defineProps({
  heading: {
    type: String,
    required: true,
  },
  items: {
    type: Array as PropType<PitlaneGalleryItem[]>,
    required: true,
  },
})
</script>

<style scoped>
.pit-gallery {
  background: var(--pit-surface);
  border-block: 1px solid var(--pit-line);
}

.pit-section__head {
  max-width: 40rem;
  margin-bottom: 2rem;
}

.pit-gallery__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.65rem;
}

@media (min-width: 900px) {
  .pit-gallery__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.85rem;
  }
}

.pit-gallery__item {
  margin: 0;
  overflow: hidden;
  border: 1px solid var(--pit-line);
  background: var(--pit-card);
}

.pit-gallery__item img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  display: block;
  transition: transform 0.45s ease;
  filter: saturate(0.88) contrast(1.04);
}

.pit-gallery__item:hover img {
  transform: scale(1.04);
}
</style>
