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
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
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
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16v3H4zM7 10v10M17 10v10M10 7V4h4v3"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M13 2 4 14h7l-1 8 10-14h-7l1-6z"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c1.5-3.2 4-5 7-5s5.5 1.8 7 5"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
]
</script>

<style scoped>
.pit-why {
  background: var(--pit-surface);
  border-block: 1px solid var(--pit-line);
}

.pit-why__head {
  text-align: center;
  max-width: 40rem;
  margin: 0 auto 2.8rem;
}

.pit-why__head .pit-heading {
  margin-top: 0;
}

.pit-why__sub {
  margin-top: 0.75rem;
  color: var(--pit-red);
  font-family: var(--pit-font-display);
  font-weight: 600;
  font-size: 1.05rem;
  letter-spacing: 0.04em;
}

.pit-why__grid {
  display: grid;
  gap: 1.5rem 2rem;
}

@media (min-width: 800px) {
  .pit-why__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2rem 3rem;
  }
}

.pit-why__card {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  column-gap: 1.15rem;
  row-gap: 0.45rem;
  padding: 0.4rem 0;
}

.pit-why__icon {
  grid-row: 1 / span 2;
  display: grid;
  place-items: center;
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 999px;
  background: var(--pit-red);
  color: #fff;
  align-self: start;
}

.pit-why__icon :deep(svg) {
  width: 1.35rem;
  height: 1.35rem;
}

.pit-why__card h3 {
  font-family: var(--pit-font-display);
  font-weight: 700;
  font-size: 1.35rem;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  align-self: end;
}

.pit-why__card p {
  color: var(--pit-muted);
  line-height: 1.65;
  font-size: 1.02rem;
  max-width: 34rem;
}
</style>
