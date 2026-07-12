<template>
  <section
    id="avis"
    class="pit-section pit-reviews">
    <div class="pit-container">
      <div
        data-pit-reveal
        class="pit-section__head">
        <p class="pit-eyebrow">Témoignages</p>
        <h2 class="pit-heading">{{ heading }}</h2>
      </div>

      <div class="pit-reviews__grid">
        <article
          v-for="(review, index) in reviews"
          :key="`${review.author}-${index}`"
          class="pit-review"
          data-pit-reveal
          :style="{ '--pit-delay': `${index * 60}ms` }">
          <p
            class="pit-review__stars"
            :aria-label="`${review.rating} sur 5`">
            <span
              v-for="n in 5"
              :key="n"
              :class="{ 'is-on': n <= Math.round(review.rating) }"
              >★</span
            >
          </p>
          <blockquote>{{ review.text }}</blockquote>
          <p class="pit-review__author">{{ review.author }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { PitlaneReviewItem } from '~/types/pitlane'

defineProps({
  heading: {
    type: String,
    required: true,
  },
  reviews: {
    type: Array as PropType<PitlaneReviewItem[]>,
    required: true,
  },
})
</script>

<style scoped>
.pit-reviews {
  background: var(--pit-surface);
  border-block: 1px solid var(--pit-line);
}

.pit-section__head {
  max-width: 40rem;
  margin-bottom: 2rem;
}

.pit-reviews__grid {
  display: grid;
  gap: 1rem;
}

@media (min-width: 800px) {
  .pit-reviews__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.pit-review {
  padding: 1.45rem 1.35rem;
  background: var(--pit-card);
  border: 1px solid var(--pit-line);
}

.pit-review__stars {
  letter-spacing: 0.08em;
  color: color-mix(in srgb, var(--pit-ink) 25%, transparent);
}

.pit-review__stars .is-on {
  color: var(--pit-red);
}

.pit-review blockquote {
  margin: 0.85rem 0 0;
  font-size: 1.05rem;
  line-height: 1.6;
  color: color-mix(in srgb, var(--pit-ink) 92%, transparent);
}

.pit-review__author {
  margin-top: 1rem;
  font-family: var(--pit-font-display);
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-size: 0.9rem;
  color: var(--pit-muted);
}
</style>
