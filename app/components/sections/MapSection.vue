<template>
  <section
    id="localisation"
    class="pit-section pit-map">
    <div class="pit-container">
      <div
        class="pit-map__header"
        data-pit-reveal>
        <p class="pit-eyebrow">Nous trouver</p>
        <h2 class="pit-heading">{{ businessName || 'Le garage' }}</h2>
      </div>

      <div class="pit-map__grid">
        <div
          class="pit-map__contacts"
          data-pit-reveal>
          <div
            v-if="addressLines.length"
            class="pit-map__contact-row">
            <span
              class="pit-map__contact-icon"
              aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor">
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
              </svg>
            </span>
            <div class="pit-map__contact-body">
              <span class="pit-map__contact-label">Adresse</span>
              <span class="pit-map__contact-value">
                <template
                  v-for="(line, index) in addressLines"
                  :key="index">
                  <br v-if="index > 0" />{{ line }}
                </template>
              </span>
            </div>
          </div>

          <div
            v-if="phone"
            class="pit-map__contact-row">
            <span
              class="pit-map__contact-icon"
              aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor">
                <path
                  d="M6.62 10.79a15.15 15.15 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.4 21 3 13.6 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z" />
              </svg>
            </span>
            <div class="pit-map__contact-body">
              <span class="pit-map__contact-label">Téléphone</span>
              <a
                :href="`tel:${phone}`"
                class="pit-map__contact-value pit-map__contact-link"
                >{{ phone }}</a
              >
            </div>
          </div>

          <div
            v-if="email"
            class="pit-map__contact-row">
            <span
              class="pit-map__contact-icon"
              aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor">
                <path
                  d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z" />
              </svg>
            </span>
            <div class="pit-map__contact-body">
              <span class="pit-map__contact-label">Email</span>
              <a
                :href="`mailto:${email}`"
                class="pit-map__contact-value pit-map__contact-link"
                >{{ email }}</a
              >
            </div>
          </div>
        </div>

        <div
          class="pit-map__frame-wrap"
          data-pit-reveal
          :style="{ '--pit-delay': '90ms' }">
          <div class="pit-map__frame">
            <iframe
              title="Carte du garage"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              :src="embedUrl"></iframe>

            <div
              v-if="businessName || addressLines.length"
              class="pit-map__card">
              <p class="pit-map__card-name">{{ businessName || 'Garage' }}</p>
              <p
                v-if="addressLines.length"
                class="pit-map__card-addr">
                {{ addressLines.join(', ') }}
              </p>
            </div>

            <a
              v-if="mapsUrl"
              :href="mapsUrl"
              class="pit-map__gmaps"
              target="_blank"
              rel="noopener noreferrer">
              Voir sur Google Maps
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
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
  address: {
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
  lat: {
    type: Number,
    default: 0,
  },
  lng: {
    type: Number,
    default: 0,
  },
})

/** Adresse rue si dispo, sinon la zone d'intervention seule (jamais la ville en double). */
const addressLines: ComputedRef<string[]> = computed((): string[] => {
  const street: string = props.address.trim()
  if (street) {
    return [street, props.city.trim()].filter((part: string): boolean => part.length > 0)
  }
  const zone: string = props.area.trim() || props.city.trim()
  return zone ? [zone] : []
})

const query: ComputedRef<string> = computed((): string => {
  const parts: string[] = [props.address || props.area, props.city, props.businessName].filter(
    (part: string): boolean => part.trim().length > 0,
  )
  return parts.join(', ') || `${props.lat},${props.lng}`
})

const mapsUrl: ComputedRef<string> = computed(
  (): string =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query.value)}`,
)

const hasCoordinates: ComputedRef<boolean> = computed(
  (): boolean =>
    Number.isFinite(props.lat) &&
    Number.isFinite(props.lng) &&
    (props.lat !== 0 || props.lng !== 0),
)

// Embed Google Maps sur les vraies coords/adresse (l'embed OSM bbox centrait sur un défaut et bloquait le dézoom).
const embedUrl: ComputedRef<string> = computed((): string => {
  const target: string = hasCoordinates.value ? `${props.lat},${props.lng}` : query.value
  return `https://maps.google.com/maps?q=${encodeURIComponent(target)}&z=15&hl=fr&output=embed`
})
</script>

<style scoped>
.pit-map {
  background: #111;
  padding-top: clamp(5.5rem, 12vw, 8.5rem);
  padding-bottom: clamp(7rem, 15vw, 11rem);
}

.pit-map__header {
  margin-bottom: 3rem;
  text-align: left;
}

.pit-map__header .pit-heading {
  margin-top: 0.65rem;
}

.pit-map__grid {
  display: grid;
  gap: 2.5rem;
}

@media (min-width: 900px) {
  .pit-map__grid {
    grid-template-columns: minmax(15rem, 0.65fr) minmax(0, 1.35fr);
    gap: 3rem;
    align-items: center;
  }
}

.pit-map__contacts {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.pit-map__contact-row {
  display: flex;
  align-items: flex-start;
  gap: 1.1rem;
}

.pit-map__contact-icon {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 3.1rem;
  height: 3.1rem;
  border-radius: 999px;
  background: var(--pit-red);
  color: #111;
}

.pit-map__contact-icon svg {
  width: 1.15rem;
  height: 1.15rem;
}

.pit-map__contact-body {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-top: 0.2rem;
}

.pit-map__contact-label {
  font-family: var(--pit-font-pitlane-display);
  font-size: 0.95rem;
  font-weight: 700;
  color: #fff;
}

.pit-map__contact-value {
  font-size: 1.02rem;
  font-weight: 400;
  color: #fff;
  line-height: 1.45;
}

.pit-map__contact-link {
  text-decoration: none;
  transition: color 0.2s ease;
}

.pit-map__contact-link:hover {
  color: var(--pit-red);
}

.pit-map__frame {
  position: relative;
  width: 100%;
  min-height: 24rem;
  border-radius: 0.9rem;
  overflow: hidden;
  background: #e8e8e8;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.pit-map__frame iframe {
  width: 100%;
  height: 100%;
  min-height: 24rem;
  border: 0;
  display: block;
  /* Style « muted / silver » proche maquette */
  filter: grayscale(0.55) saturate(0.55) contrast(1.05) brightness(1.05);
}

@media (min-width: 900px) {
  .pit-map__frame,
  .pit-map__frame iframe {
    min-height: 28rem;
  }
}

.pit-map__card {
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 2;
  max-width: min(18rem, calc(100% - 2rem));
  padding: 0.85rem 1rem;
  background: #fff;
  border-radius: 0.55rem;
  box-shadow: 0 10px 28px -12px rgba(0, 0, 0, 0.45);
}

.pit-map__card-name {
  font-family: var(--pit-font-pitlane-display);
  font-weight: 700;
  font-size: 0.95rem;
  color: #222;
}

.pit-map__card-addr {
  margin-top: 0.25rem;
  font-size: 0.8rem;
  color: #777;
  line-height: 1.4;
}

.pit-map__gmaps {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.7rem 1.1rem;
  border-radius: 0.55rem;
  background: var(--pit-red);
  color: #fff;
  font-family: var(--pit-font-pitlane-display);
  font-weight: 700;
  font-size: 0.82rem;
  text-decoration: none;
  box-shadow: 0 10px 24px -12px rgba(0, 0, 0, 0.5);
  transition: background 0.2s ease;
}

.pit-map__gmaps:hover {
  background: color-mix(in srgb, var(--pit-red) 88%, white);
}
</style>
