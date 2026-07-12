<template>
  <section
    id="localisation"
    class="pit-section pit-map">
    <div class="pit-container pit-map__grid">
      <div
        class="pit-map__card"
        data-pit-reveal>
        <p class="pit-eyebrow">Nous trouver</p>
        <h2 class="pit-heading">{{ businessName || 'Le garage' }}</h2>
        <p
          v-if="area || city"
          class="pit-map__address">
          <template v-if="area">{{ area }}</template>
          <template v-if="area && city"><br /></template>
          <template v-if="city">{{ city }}</template>
        </p>
        <ul class="pit-map__meta">
          <li v-if="phone">
            <a :href="`tel:${phone}`">{{ phone }}</a>
          </li>
          <li v-if="email">
            <a :href="`mailto:${email}`">{{ email }}</a>
          </li>
        </ul>
        <a
          v-if="mapsUrl"
          :href="mapsUrl"
          class="pit-btn pit-btn--red"
          target="_blank"
          rel="noopener noreferrer"
          >Itinéraire</a
        >
      </div>

      <div
        class="pit-map__frame"
        data-pit-reveal
        :style="{ '--pit-delay': '90ms' }">
        <iframe
          title="Carte du garage"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          :src="embedUrl"></iframe>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { ComputedRef } from 'vue'

const props = defineProps({
  businessName: {
    type: String,
    default: '',
  },
  city: {
    type: String,
    default: '',
  },
  area: {
    type: String,
    default: '',
  },
  phone: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    default: '',
  },
  /** Coordonnées optionnelles ; défaut Rennes Landry. */
  lat: {
    type: Number,
    default: 48.1028,
  },
  lng: {
    type: Number,
    default: -1.6438,
  },
})

const query: ComputedRef<string> = computed((): string => {
  const parts: string[] = [props.area, props.city, props.businessName].filter(
    (part: string): boolean => part.trim().length > 0,
  )
  return parts.join(', ') || `${props.lat},${props.lng}`
})

const mapsUrl: ComputedRef<string> = computed(
  (): string =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query.value)}`,
)

const embedUrl: ComputedRef<string> = computed((): string => {
  const delta = 0.012
  const left = props.lng - delta
  const right = props.lng + delta
  const top = props.lat + delta
  const bottom = props.lat - delta
  return `https://www.openstreetmap.org/export/embed.html?bbox=${left}%2C${bottom}%2C${right}%2C${top}&layer=mapnik&marker=${props.lat}%2C${props.lng}`
})
</script>

<style scoped>
.pit-map {
  background: var(--pit-surface);
  border-block: 1px solid var(--pit-line);
}

.pit-map__grid {
  display: grid;
  gap: 1.25rem;
}

@media (min-width: 900px) {
  .pit-map__grid {
    grid-template-columns: minmax(18rem, 0.85fr) minmax(0, 1.15fr);
    gap: 1.5rem;
    align-items: stretch;
  }
}

.pit-map__card {
  padding: clamp(1.5rem, 3vw, 2.2rem);
  background: var(--pit-card);
  border: 1px solid var(--pit-line);
  border-left: 4px solid var(--pit-red);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.35rem;
}

.pit-map__card .pit-heading {
  margin-top: 0.55rem;
  font-size: clamp(1.7rem, 3vw, 2.3rem);
}

.pit-map__address {
  margin-top: 0.85rem;
  color: var(--pit-muted);
  line-height: 1.55;
  font-size: 1.05rem;
}

.pit-map__meta {
  list-style: none;
  margin: 1rem 0 1.4rem;
  padding: 0;
  display: grid;
  gap: 0.35rem;
}

.pit-map__meta a {
  color: var(--pit-ink);
  font-weight: 600;
  text-decoration: none;
}

.pit-map__meta a:hover {
  color: var(--pit-red);
}

.pit-map__frame {
  min-height: 18rem;
  border: 1px solid var(--pit-line);
  overflow: hidden;
  background: #1a1a1d;
}

.pit-map__frame iframe {
  width: 100%;
  height: 100%;
  min-height: 18rem;
  border: 0;
  filter: grayscale(0.35) contrast(1.05);
}

@media (min-width: 900px) {
  .pit-map__frame,
  .pit-map__frame iframe {
    min-height: 22rem;
  }
}
</style>
