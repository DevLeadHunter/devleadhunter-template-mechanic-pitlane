<template>
  <section
    id="rdv"
    class="pit-section pit-book">
    <div class="pit-container">
      <div
        class="pit-book__head"
        data-pit-reveal>
        <p class="pit-eyebrow">Réserver</p>
        <h2 class="pit-heading">Formulaire de rendez-vous</h2>
        <p class="pit-lead pit-book__lead">
          Décrivez votre véhicule et le besoin — on vous rappelle pour confirmer le créneau.
        </p>
      </div>

      <form
        class="pit-book__form"
        data-pit-reveal
        @submit.prevent="onSubmit">
        <div class="pit-book__block">
          <h3>Coordonnées</h3>
          <div class="pit-book__grid">
            <label>
              <span>Votre nom</span>
              <input
                v-model="form.name"
                type="text"
                name="name"
                autocomplete="name"
                required
                placeholder="Jean Dupont" />
            </label>
            <label>
              <span>Téléphone</span>
              <input
                v-model="form.phone"
                type="tel"
                name="phone"
                autocomplete="tel"
                required
                placeholder="06 12 34 56 78" />
            </label>
            <label>
              <span>Email</span>
              <input
                v-model="form.email"
                type="email"
                name="email"
                autocomplete="email"
                placeholder="vous@email.fr" />
            </label>
            <label>
              <span>Date souhaitée</span>
              <input
                v-model="form.date"
                type="date"
                name="date" />
            </label>
            <label>
              <span>Créneau</span>
              <select
                v-model="form.slot"
                name="slot">
                <option value="">Indifférent</option>
                <option value="matin">Matin</option>
                <option value="apres-midi">Après-midi</option>
              </select>
            </label>
            <label>
              <span>Ville / quartier</span>
              <input
                v-model="form.location"
                type="text"
                name="location"
                :placeholder="city || 'Rennes'" />
            </label>
          </div>
        </div>

        <div class="pit-book__block">
          <h3>Véhicule</h3>
          <div class="pit-book__grid pit-book__grid--3">
            <label>
              <span>Marque</span>
              <input
                v-model="form.make"
                type="text"
                name="make"
                placeholder="Peugeot, Renault…"
                required />
            </label>
            <label>
              <span>Modèle</span>
              <input
                v-model="form.model"
                type="text"
                name="model"
                placeholder="308, Clio…"
                required />
            </label>
            <label>
              <span>Année</span>
              <input
                v-model="form.year"
                type="text"
                name="year"
                inputmode="numeric"
                placeholder="2018" />
            </label>
          </div>
        </div>

        <div class="pit-book__block">
          <h3>Prestations souhaitées</h3>
          <div class="pit-book__checks">
            <label
              v-for="service in serviceOptions"
              :key="service"
              class="pit-check">
              <input
                v-model="form.services"
                type="checkbox"
                :value="service" />
              <span>{{ service }}</span>
            </label>
          </div>
        </div>

        <div class="pit-book__footer">
          <button
            type="submit"
            class="pit-btn pit-btn--red"
            :disabled="submitted">
            {{ submitted ? 'Demande préparée' : 'Prendre rendez-vous' }}
          </button>
          <p
            v-if="phone"
            class="pit-book__hint">
            Ou appelez directement
            <a :href="`tel:${phone}`">{{ phone }}</a>
          </p>
        </div>
      </form>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue'

const props = defineProps({
  phone: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    default: '',
  },
  city: {
    type: String,
    default: '',
  },
  serviceTitles: {
    type: Array as () => string[],
    default: (): string[] => [],
  },
})

const serviceOptions: Ref<string[]> = computed((): string[] => {
  if (props.serviceTitles.length) {
    return props.serviceTitles.slice(0, 6)
  }
  return ['Révision & entretien', 'Diagnostic', 'Freinage', 'Pneus', 'Carrosserie', 'Autre']
})

const form = reactive({
  name: '',
  phone: '',
  email: '',
  date: '',
  slot: '',
  location: '',
  make: '',
  model: '',
  year: '',
  services: [] as string[],
})

const submitted: Ref<boolean> = ref(false)

/**
 * Ouvre un mailto prérempli vers le garage (pas de backend dans la template).
 * @returns void
 */
function onSubmit(): void {
  const lines: string[] = [
    `Nom : ${form.name}`,
    `Téléphone : ${form.phone}`,
    form.email ? `Email : ${form.email}` : '',
    form.date ? `Date souhaitée : ${form.date}` : '',
    form.slot ? `Créneau : ${form.slot}` : '',
    form.location ? `Lieu : ${form.location}` : '',
    `Véhicule : ${form.make} ${form.model} ${form.year}`.trim(),
    form.services.length ? `Prestations : ${form.services.join(', ')}` : '',
  ].filter((line: string): boolean => line.length > 0)

  const target: string = props.email || ''
  if (target) {
    const href: string = `mailto:${encodeURIComponent(target)}?subject=${encodeURIComponent(
      `Demande de RDV — ${form.make} ${form.model}`,
    )}&body=${encodeURIComponent(lines.join('\n'))}`
    window.location.href = href
  } else if (props.phone) {
    window.location.href = `tel:${props.phone}`
  }
  submitted.value = true
}
</script>

<style scoped>
.pit-book {
  background:
    radial-gradient(
      ellipse at top,
      color-mix(in srgb, var(--pit-red) 16%, transparent),
      transparent 55%
    ),
    var(--pit-bg);
}

.pit-book__head {
  text-align: center;
  max-width: 40rem;
  margin: 0 auto 2.2rem;
}

.pit-book__head .pit-heading {
  margin-top: 0.75rem;
}

.pit-book__lead {
  margin-inline: auto;
}

.pit-book__form {
  width: 100%;
  max-width: 64rem;
  margin-inline: auto;
  padding: clamp(1.4rem, 3.5vw, 2.4rem);
  background: #f7f7f8;
  color: #151518;
  border-radius: 0.55rem;
  box-shadow: 0 30px 80px -40px color-mix(in srgb, var(--pit-red) 55%, transparent);
}

.pit-book__block + .pit-book__block {
  margin-top: 1.6rem;
  padding-top: 1.4rem;
  border-top: 1px solid color-mix(in srgb, #151518 10%, transparent);
}

.pit-book__block h3 {
  font-family: var(--pit-font-display);
  font-weight: 700;
  font-size: 1.15rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.pit-book__grid {
  display: grid;
  gap: 0.85rem;
}

@media (min-width: 720px) {
  .pit-book__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.pit-book__grid--3 {
  grid-template-columns: 1fr;
}

@media (min-width: 720px) {
  .pit-book__grid--3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.pit-book__form label {
  display: grid;
  gap: 0.4rem;
}

.pit-book__form label > span {
  font-size: 0.82rem;
  font-weight: 600;
  color: #52525b;
}

.pit-book__form input,
.pit-book__form select {
  width: 100%;
  padding: 0.85rem 0.95rem;
  border: 1px solid #e4e4e7;
  border-radius: 0.35rem;
  background: #fff;
  color: #151518;
  font: inherit;
}

.pit-book__form input:focus,
.pit-book__form select:focus {
  outline: 2px solid var(--pit-red);
  outline-offset: 1px;
  border-color: transparent;
}

.pit-book__checks {
  display: grid;
  gap: 0.65rem 1rem;
  grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
}

.pit-check {
  display: flex !important;
  align-items: center;
  gap: 0.55rem;
  font-weight: 600;
  cursor: pointer;
}

.pit-check input {
  width: 1.1rem;
  height: 1.1rem;
  accent-color: var(--pit-red);
}

.pit-book__footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 1.5rem;
  margin-top: 1.8rem;
}

.pit-book__hint {
  color: #52525b;
  font-size: 0.95rem;
}

.pit-book__hint a {
  color: var(--pit-red);
  font-weight: 700;
  text-decoration: none;
}
</style>
