<template>
  <section
    class="pit-trust"
    aria-label="Chiffres clés">
    <div class="pit-container pit-trust__grid">
      <div
        v-for="(item, index) in items"
        :key="`${item.value}-${item.label}`"
        class="pit-trust__item"
        data-pit-reveal
        :style="{ '--pit-delay': `${index * 70}ms` }">
        <div
          class="pit-trust__icon"
          aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7">
            <path
              v-if="index % 4 === 0"
              d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
            <path
              v-else-if="index % 4 === 1"
              d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            <path
              v-else-if="index % 4 === 2"
              d="M9 11V6a3 3 0 1 1 6 0v5M5 11h14l-1.2 9H6.2z" />
            <path
              v-else
              d="M14.7 6.3a4 4 0 0 0-5.4 0L4 11.6l2.1 2.1 3.5-3.5V20h4.8V10.2l3.5 3.5 2.1-2.1z" />
          </svg>
        </div>
        <p class="pit-trust__value">{{ item.value }}</p>
        <p class="pit-trust__label">{{ item.label }}</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { PitlaneTrustItem } from '~/types/pitlane'

defineProps({
  items: {
    type: Array as PropType<PitlaneTrustItem[]>,
    required: true,
  },
})
</script>

<style scoped>
.pit-trust {
  position: relative;
  padding-block: clamp(2.4rem, 5vw, 3.6rem);
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--pit-red) 10%, transparent), transparent 55%),
    var(--pit-surface);
  border-block: 1px solid var(--pit-line);
}

.pit-trust__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem 1.5rem;
  text-align: center;
}

@media (min-width: 900px) {
  .pit-trust__grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1.5rem;
  }

  .pit-trust__item:not(:last-child) {
    border-right: 1px solid var(--pit-line);
  }
}

.pit-trust__icon {
  display: grid;
  place-items: center;
  width: 3.25rem;
  height: 3.25rem;
  margin: 0 auto 0.9rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--pit-red) 16%, transparent);
  color: var(--pit-red);
}

.pit-trust__icon svg {
  width: 1.35rem;
  height: 1.35rem;
}

.pit-trust__value {
  font-family: var(--pit-font-display);
  font-weight: 800;
  font-size: clamp(2.4rem, 5vw, 3.4rem);
  letter-spacing: 0.02em;
  line-height: 1;
  color: var(--pit-ink);
}

.pit-trust__label {
  margin-top: 0.55rem;
  color: var(--pit-muted);
  font-family: var(--pit-font-display);
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
</style>
