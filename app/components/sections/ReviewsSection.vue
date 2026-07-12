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
 * @param name Nom affiché
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
  background: var(--pit-bg);
}

.pit-reviews__head {
  text-align: center;
  max-width: 36rem;
  margin: 0 auto 2.4rem;
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
  padding: 1.6rem 1.5rem 1.7rem;
  background: #fff;
  color: #151518;
  border-radius: 0.45rem;
  box-shadow: 0 18px 40px -28px rgba(0, 0, 0, 0.55);
}

.pit-review__top {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.pit-review__avatar {
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--pit-red) 18%, #f4f4f5);
  color: var(--pit-red);
  font-family: var(--pit-font-display);
  font-weight: 800;
  font-size: 0.95rem;
}

.pit-review__author {
  font-family: var(--pit-font-display);
  font-weight: 700;
  font-size: 1.05rem;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.pit-review__stars {
  margin-top: 0.15rem;
  letter-spacing: 0.08em;
  color: #d4d4d8;
  line-height: 1;
}

.pit-review__stars .is-on {
  color: var(--pit-red);
}

.pit-review blockquote {
  margin: 1rem 0 0;
  font-size: 1.02rem;
  line-height: 1.65;
  color: #3f3f46;
}
</style>
