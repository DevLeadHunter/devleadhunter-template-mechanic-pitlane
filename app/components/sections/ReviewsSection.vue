<template>
  <section
    id="avis"
    class="pit-section pit-reviews">
    <div class="pit-container">
      <div
        class="pit-reviews__head"
        data-pit-reveal>
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
          <header class="pit-review__top">
            <span
              class="pit-review__avatar"
              aria-hidden="true"
              >{{ initials(review.author) }}</span
            >
            <div>
              <p class="pit-review__author">{{ review.author }}</p>
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
            </div>
          </header>
          <blockquote>{{ review.text }}</blockquote>
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

/**
 * @param name Nom
 * @returns Initiales
 */
function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part: string): string => part.charAt(0).toUpperCase())
    .join('')
}
</script>

<style scoped>
.pit-reviews {
  background: #0c0c0d;
  padding-top: clamp(5.5rem, 12vw, 8.5rem);
  padding-bottom: clamp(2.5rem, 5vw, 3.5rem);
}

.pit-reviews__head {
  text-align: left;
  margin-bottom: 2.2rem;
}

.pit-reviews__head .pit-heading {
  margin-top: 0.7rem;
}

.pit-reviews__grid {
  display: grid;
  gap: 1.15rem;
}

@media (min-width: 800px) {
  .pit-reviews__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.pit-review {
  padding: 1.5rem 1.4rem 1.6rem;
  background: #171717;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0.85rem;
  color: #f4f4f5;
}

.pit-review__top {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.pit-review__avatar {
  display: grid;
  place-items: center;
  width: 2.85rem;
  height: 2.85rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--pit-red) 22%, #1a1a1a);
  color: var(--pit-red);
  font-family: var(--pit-font-display);
  font-weight: 700;
  font-size: 0.9rem;
}

.pit-review__author {
  font-family: var(--pit-font-display);
  font-weight: 700;
  font-size: 1rem;
}

.pit-review__stars {
  margin-top: 0.15rem;
  letter-spacing: 0.08em;
  color: #3f3f46;
  line-height: 1;
}

.pit-review__stars .is-on {
  color: var(--pit-red);
}

.pit-review blockquote {
  margin: 1rem 0 0;
  font-size: 0.98rem;
  line-height: 1.65;
  color: #a1a1aa;
}
</style>
