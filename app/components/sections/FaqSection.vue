<template>
  <section
    id="faq"
    class="pit-section pit-faq-section">
    <div class="pit-container">
      <div
        class="pit-faq-header"
        data-pit-reveal>
        <p class="pit-eyebrow pit-eyebrow--center">FAQ</p>
        <h2 class="pit-heading">{{ heading }}</h2>
      </div>

      <div class="pit-faq-layout">
        <div
          class="pit-faq-layout__media"
          data-pit-reveal>
          <img
            v-if="image && !imageBroken"
            :src="image"
            alt=""
            loading="lazy"
            referrerpolicy="no-referrer"
            @error="imageBroken = true" />
          <div
            v-else
            class="pit-faq-layout__fallback"
            aria-hidden="true"></div>
        </div>

        <div
          class="pit-faq-layout__list"
          data-pit-reveal
          :style="{ '--pit-delay': '80ms' }">
          <details
            v-for="(item, index) in items"
            :key="item.question"
            class="pit-faq__item"
            :open="index === 0">
            <summary>
              <span>{{ item.question }}</span>
              <span
                class="pit-faq__toggle"
                aria-hidden="true"></span>
            </summary>
            <p>{{ item.answer }}</p>
          </details>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { PropType, Ref } from 'vue'
import type { PitlaneFaqItem } from '~/types/pitlane'

defineProps({
  heading: {
    type: String,
    required: true,
  },
  items: {
    type: Array as PropType<PitlaneFaqItem[]>,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
})

const imageBroken: Ref<boolean> = ref(false)
</script>

<style scoped>
.pit-faq-section {
  background: #121212;
}

.pit-faq-header {
  text-align: center;
  max-width: 48rem;
  margin: 0 auto 3.25rem;
}

.pit-faq-header .pit-heading {
  margin-top: 0.65rem;
  white-space: nowrap;
  font-size: clamp(1.45rem, 3vw, 2.55rem);
}

@media (max-width: 639px) {
  .pit-faq-header {
    text-align: left;
    margin-left: 0;
    margin-right: 0;
  }

  .pit-faq-header .pit-heading {
    white-space: normal;
    font-size: clamp(1.45rem, 6.5vw, 1.85rem);
    line-height: 1.2;
  }
}

.pit-eyebrow--center {
  justify-content: center;
}

.pit-eyebrow--center::before {
  display: none;
}

.pit-faq-layout {
  display: grid;
  gap: 2rem;
  align-items: start;
}

@media (min-width: 960px) {
  .pit-faq-layout {
    grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
    gap: 3.25rem;
  }
}

.pit-faq-layout__media {
  overflow: hidden;
  border-radius: 1rem;
  min-height: 22rem;
  background: #1a1a1a;
}

.pit-faq-layout__media img {
  width: 100%;
  height: 100%;
  min-height: 22rem;
  object-fit: cover;
  display: block;
  filter: grayscale(0.85) contrast(1.08);
}

.pit-faq-layout__fallback {
  width: 100%;
  min-height: 22rem;
  background: #1a1a1a;
}

.pit-faq-layout__list {
  display: flex;
  flex-direction: column;
}

.pit-faq__item {
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.pit-faq__item:last-child {
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.pit-faq__item summary {
  cursor: pointer;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.35rem 0;
  font-family: var(--pit-font-pitlane-display);
  font-weight: 600;
  font-size: clamp(1rem, 1.8vw, 1.12rem);
  color: #fff;
  user-select: none;
}

.pit-faq__item summary::-webkit-details-marker {
  display: none;
}

.pit-faq__toggle {
  flex-shrink: 0;
  color: var(--pit-red);
  font-size: 1.45rem;
  font-weight: 500;
  line-height: 1;
  width: 1.25rem;
  text-align: center;
}

.pit-faq__toggle::before {
  content: '+';
}

.pit-faq__item[open] .pit-faq__toggle::before {
  content: '−';
}

.pit-faq__item p {
  margin: 0;
  padding: 0 0 1.35rem;
  color: #a3a3a3;
  line-height: 1.7;
  font-size: 0.98rem;
  max-width: 40rem;
}
</style>
