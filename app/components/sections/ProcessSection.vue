<template>
  <section class="pit-section pit-process">
    <div class="pit-container">
      <div
        class="pit-process__head"
        data-pit-reveal>
        <h2 class="pit-heading">{{ heading }}</h2>
        <p class="pit-process__sub">Simple, clair, sans surprise</p>
      </div>

      <div class="pit-process__grid">
        <article
          v-for="(item, index) in items"
          :key="item.step"
          class="pit-process__card"
          data-pit-reveal
          :style="{ '--pit-delay': `${index * 60}ms` }">
          <span
            class="pit-process__icon"
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
import type { PitlaneProcessItem } from '~/types/pitlane'

defineProps({
  heading: {
    type: String,
    required: true,
  },
  items: {
    type: Array as PropType<PitlaneProcessItem[]>,
    required: true,
  },
})

const icons: string[] = [
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 2"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M14.7 6.3a4 4 0 0 0-5.4 0L4 11.6l2.1 2.1 3.5-3.5V20h4.8V10.2l3.5 3.5 2.1-2.1z"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M9 11V6a3 3 0 1 1 6 0v5M5 11h14l-1.2 9H6.2z"/></svg>',
]
</script>

<style scoped>
.pit-process {
  background: #0f0f0f;
  padding-bottom: clamp(5.5rem, 12vw, 8.5rem);
}

.pit-process__head {
  text-align: left;
  margin-bottom: 2.5rem;
}

.pit-process__head .pit-heading {
  margin-top: 0;
}

.pit-process__sub {
  margin-top: 0.55rem;
  color: var(--pit-red);
  font-size: 1.02rem;
  font-weight: 500;
}

.pit-process__grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
}

@media (min-width: 700px) {
  .pit-process__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1100px) {
  .pit-process__grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0.85rem;
  }
}

.pit-process__card {
  background: #1a1a1a;
  border-radius: 1rem;
  padding: 1.6rem 1.35rem 1.7rem;
  min-height: 100%;
}

.pit-process__icon {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 999px;
  background: var(--pit-red);
  color: #fff;
  margin-bottom: 1.15rem;
}

.pit-process__icon :deep(svg) {
  width: 1.15rem;
  height: 1.15rem;
}

.pit-process__card h3 {
  font-family: var(--pit-font-pitlane-display);
  font-weight: 700;
  font-size: 1.1rem;
  color: #fff;
  line-height: 1.25;
}

.pit-process__card p {
  margin-top: 0.7rem;
  color: #9a9a9a;
  font-size: 0.92rem;
  line-height: 1.6;
}
</style>
