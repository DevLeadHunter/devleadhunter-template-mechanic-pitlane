<template>
  <section class="pit-section pit-why">
    <div class="pit-container">
      <div
        class="pit-why__head"
        data-pit-reveal>
        <h2 class="pit-heading">{{ heading }}</h2>
        <p class="pit-why__sub">On est là pour ce dont votre véhicule a besoin</p>
      </div>

      <div class="pit-why__grid">
        <article
          v-for="(item, index) in items"
          :key="item.title"
          class="pit-why__card"
          data-pit-reveal
          :style="{ '--pit-delay': `${index * 70}ms` }">
          <span
            class="pit-why__icon"
            aria-hidden="true"
            v-html="icons[index % icons.length]"></span>
          <div class="pit-why__body">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { PitlaneWhyItem } from '~/types/pitlane'

defineProps({
  heading: {
    type: String,
    required: true,
  },
  items: {
    type: Array as PropType<PitlaneWhyItem[]>,
    required: true,
  },
})

const icons: string[] = [
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="6" width="18" height="12" rx="1"/><path d="M7 10h4M7 14h2M14 12h4"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3 4 6v6c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V6l-8-3z"/><path d="m9 12 2 2 4-4"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
]
</script>

<style scoped>
.pit-why {
  background: #111;
}

.pit-why__head {
  text-align: left;
  max-width: 40rem;
  margin: 0 0 3.5rem;
}

.pit-why__head .pit-heading {
  margin-top: 0;
  white-space: normal;
}

@media (min-width: 900px) {
  .pit-why__head {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }

  .pit-why__head .pit-heading {
    white-space: nowrap;
  }
}

.pit-why__sub {
  margin-top: 0.85rem;
  color: var(--pit-red);
  font-family: var(--pit-font-pitlane-sans);
  font-weight: 500;
  font-size: 1.05rem;
}

.pit-why__grid {
  display: grid;
  gap: 3rem 1.5rem;
}

@media (min-width: 900px) {
  .pit-why__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: clamp(3.5rem, 8vw, 6.5rem);
    row-gap: 3.5rem;
  }
}

.pit-why__card {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1.15rem;
  align-items: start;
}

.pit-why__icon {
  display: grid;
  place-items: center;
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 999px;
  background: var(--pit-red);
  color: #fff;
  flex: none;
}

.pit-why__icon :deep(svg) {
  width: 1.25rem;
  height: 1.25rem;
}

.pit-why__body h3 {
  font-family: var(--pit-font-pitlane-display);
  font-weight: 700;
  font-size: 1.2rem;
  color: #fff;
  margin: 0.15rem 0 0;
}

.pit-why__body p {
  margin-top: 0.65rem;
  color: #a3a3a3;
  line-height: 1.7;
  font-size: 0.98rem;
  max-width: 32rem;
}
</style>
