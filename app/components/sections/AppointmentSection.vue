<template>
  <section
    id="rdv"
    class="pit-section pit-book">
    <div class="pit-container">
      <div
        class="pit-book__head"
        data-pit-reveal>
        <p class="pit-eyebrow">Prendre un</p>
        <h2 class="pit-heading">Rendez-vous</h2>
      </div>

      <form
        class="pit-book__form"
        data-pit-reveal
        :style="{ '--pit-delay': '80ms' }"
        @submit.prevent="onSubmit">
        <div class="pit-book__grid">
          <label class="pit-field">
            <span class="sr-only">Votre nom</span>
            <input
              v-model="form.name"
              type="text"
              name="name"
              autocomplete="name"
              required
              placeholder="Votre nom" />
          </label>
          <label class="pit-field">
            <span class="sr-only">Téléphone</span>
            <input
              v-model="form.phone"
              type="tel"
              name="phone"
              autocomplete="tel"
              required
              placeholder="Téléphone" />
          </label>
          <label class="pit-field">
            <span class="sr-only">Email</span>
            <input
              v-model="form.email"
              type="email"
              name="email"
              autocomplete="email"
              placeholder="Email" />
          </label>
          <label class="pit-field pit-field--icon">
            <span class="sr-only">Date souhaitée</span>
            <input
              v-model="form.date"
              type="date"
              name="date"
              placeholder="Date" />
          </label>
        </div>

        <div class="pit-book__plate-row">
          <label class="pit-field pit-field--grow">
            <span class="sr-only">Immatriculation</span>
            <input
              :value="form.plate"
              type="text"
              name="plate"
              maxlength="9"
              placeholder="Immatriculation (AA-123-BB)"
              autocomplete="off"
              spellcheck="false"
              @input="handlePlateInput"
              @keydown.enter.prevent="lookupPlate" />
          </label>
          <button
            type="button"
            class="pit-btn pit-btn--red pit-book__lookup"
            :disabled="plateLoading || form.plate.replace(/[^a-zA-Z0-9]/g, '').length < 7"
            @click="lookupPlate">
            {{ plateLoading ? 'Recherche…' : 'Identifier avec ma plaque' }}
          </button>
        </div>
        <p
          v-if="plateMessage"
          class="pit-book__plate-msg"
          :class="{ 'is-error': plateError, 'is-ok': !plateError }">
          {{ plateMessage }}
        </p>

        <div class="pit-book__grid pit-book__grid--2">
          <label class="pit-field">
            <span class="sr-only">Marque</span>
            <input
              v-model="form.make"
              type="text"
              name="make"
              placeholder="Marque"
              required />
          </label>
          <label class="pit-field">
            <span class="sr-only">Modèle</span>
            <input
              v-model="form.model"
              type="text"
              name="model"
              placeholder="Modèle"
              required />
          </label>
        </div>

        <div class="pit-book__services">
          <p class="pit-book__services-title">Prestations souhaitées</p>
          <div class="pit-book__checks">
            <label
              v-for="service in serviceOptions"
              :key="service"
              class="pit-check">
              <input
                v-model="form.services"
                type="checkbox"
                :value="service" />
              <span
                class="pit-check__box"
                aria-hidden="true"></span>
              <span>{{ service }}</span>
            </label>
          </div>
        </div>

        <div class="pit-book__footer">
          <button
            type="submit"
            class="pit-btn pit-btn--red pit-book__submit"
            :disabled="submitted">
            {{ submitted ? 'Demande préparée' : 'Prendre rendez-vous' }}
            <span aria-hidden="true">↗</span>
          </button>
          <p
            v-if="phone"
            class="pit-book__hint">
            Ou appelez
            <a :href="`tel:${phone}`">{{ phone }}</a>
          </p>
        </div>
      </form>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { ComputedRef, PropType, Ref } from 'vue'

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
    type: Array as PropType<string[]>,
    default: (): string[] => [],
  },
})

const serviceOptions: ComputedRef<string[]> = computed((): string[] => {
  if (props.serviceTitles.length) {
    return props.serviceTitles.slice(0, 9)
  }
  return ['Révision & entretien', 'Diagnostic', 'Freinage', 'Pneus', 'Carrosserie', 'Autre']
})

const form = reactive({
  name: '',
  phone: '',
  email: '',
  date: '',
  plate: '',
  make: '',
  model: '',
  year: '',
  fuel: '',
  services: [] as string[],
})

const submitted: Ref<boolean> = ref(false)
const plateLoading: Ref<boolean> = ref(false)
const plateMessage: Ref<string> = ref('')
const plateError: Ref<boolean> = ref(false)

/** Token démo public Auto Ways (doc API) — sans config. */
const PLATE_DEMO_TOKEN = '92cbc2ae3c8a30028d98b10872dd4c3a'

/**
 * Formate automatiquement une plaque SIV (AA-123-BB).
 * @param event Input
 */
function handlePlateInput(event: Event): void {
  const input = event.target as HTMLInputElement
  const raw = input.value
    .replace(/[^a-zA-Z0-9]/g, '')
    .toUpperCase()
    .slice(0, 7)
  let formatted = raw
  if (raw.length > 5) {
    formatted = `${raw.slice(0, 2)}-${raw.slice(2, 5)}-${raw.slice(5, 7)}`
  } else if (raw.length > 2) {
    formatted = `${raw.slice(0, 2)}-${raw.slice(2)}`
  }
  form.plate = formatted
}

/**
 * Identifie le véhicule via l’API publique Auto Ways (CORS ouvert).
 * Endpoint path : /autowayapi/{plaque}?token=…
 */
async function lookupPlate(): Promise<void> {
  const plate: string = form.plate.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()
  if (!/^[A-Z]{2}\d{3}[A-Z]{2}$/.test(plate)) {
    plateError.value = true
    plateMessage.value = 'Format attendu : AA-123-BB (ex. FH-034-DD).'
    return
  }

  const formatted = `${plate.slice(0, 2)}-${plate.slice(2, 5)}-${plate.slice(5, 7)}`
  form.plate = formatted

  plateLoading.value = true
  plateError.value = false
  plateMessage.value = ''

  const urls: string[] = [
    `https://app.auto-ways.net/autowayapi/${encodeURIComponent(formatted)}?token=${PLATE_DEMO_TOKEN}`,
    `https://app.auto-ways.net/autowayapi/${encodeURIComponent(plate)}?token=${PLATE_DEMO_TOKEN}`,
  ]

  let filled = false
  for (const url of urls) {
    try {
      const response: Response = await fetch(url, {
        method: 'GET',
        signal: AbortSignal.timeout(12000),
      })
      const payload: Record<string, unknown> = (await response.json()) as Record<string, unknown>
      if (payload.error === true || !response.ok) {
        if (response.status === 404) {
          plateError.value = true
          plateMessage.value = 'Véhicule introuvable pour cette plaque. Saisissez marque et modèle.'
          plateLoading.value = false
          return
        }
        continue
      }

      const data = (payload.data ?? payload) as Record<string, unknown>
      const make = String(data.AWN_marque ?? data.marque ?? data.make ?? '').trim()
      const model = String(data.AWN_modele ?? data.modele ?? data.model ?? '').trim()
      const dateRaw = String(
        data.AWN_date_mise_en_circulation ?? data.date_mise_en_circulation ?? data.annee ?? '',
      )
      const year = dateRaw.match(/\d{4}/)?.[0] ?? dateRaw.slice(0, 4)
      const fuel = String(
        data.AWN_energie_description ?? data.AWN_energie ?? data.energie ?? data.fuel ?? '',
      ).trim()

      if (!make && !model) continue

      if (make) form.make = make
      if (model) form.model = model
      if (year && /^\d{4}$/.test(year)) form.year = year
      if (fuel && fuel !== 'INCONNU') form.fuel = fuel

      plateMessage.value = `Véhicule identifié : ${[make, model].filter(Boolean).join(' ')}. Vérifiez avant d’envoyer.`
      filled = true
      break
    } catch {
      // endpoint suivant
    }
  }

  if (!filled) {
    plateError.value = true
    plateMessage.value =
      'Identification indisponible pour le moment. Complétez marque et modèle manuellement.'
  }

  plateLoading.value = false
}

/** Mailto prérempli vers le garage. */
function onSubmit(): void {
  const lines: string[] = [
    `Nom : ${form.name}`,
    `Téléphone : ${form.phone}`,
    form.email ? `Email : ${form.email}` : '',
    form.date ? `Date souhaitée : ${form.date}` : '',
    form.plate ? `Immatriculation : ${form.plate}` : '',
    `Véhicule : ${[form.make, form.model, form.year, form.fuel].filter(Boolean).join(' ')}`,
    form.services.length ? `Prestations : ${form.services.join(', ')}` : '',
  ].filter((line: string): boolean => line.length > 0)

  const target: string = props.email || ''
  if (target) {
    window.location.href = `mailto:${encodeURIComponent(target)}?subject=${encodeURIComponent(
      `Demande de RDV — ${form.make} ${form.model}`,
    )}&body=${encodeURIComponent(lines.join('\n'))}`
  } else if (props.phone) {
    window.location.href = `tel:${props.phone}`
  }
  submitted.value = true
}
</script>

<style scoped>
.pit-book {
  background: #0c0c0d;
  /* Extra air vs sections voisines — évite l’effet « collé » */
  padding-block: clamp(5.5rem, 12vw, 8.5rem);
  /* Coupe tout halo / artefact en haut de section */
  isolation: isolate;
  overflow: clip;
}

.pit-book__head {
  text-align: left;
  margin-bottom: 2.75rem;
}

.pit-book__head .pit-heading {
  margin-top: 0.55rem;
}

.pit-book__form {
  width: 100%;
  max-width: 52rem;
  display: grid;
  gap: 1.15rem;
}

.pit-book__grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .pit-book__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.pit-book__grid--2 {
  margin-top: 0.25rem;
}

.pit-field {
  display: block;
  min-width: 0;
}

.pit-field input,
.pit-book__form select {
  width: 100%;
  padding: 1rem 1.35rem;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 999px;
  background: #1a1a1a;
  color: #f4f4f5;
  font: inherit;
  font-size: 0.98rem;
  transition:
    border-color 0.2s ease,
    background 0.2s ease;
  /* Évite le halo bleu navigateur / autofill */
  outline: none;
  box-shadow: none;
  caret-color: var(--pit-red);
  color-scheme: dark;
}

.pit-field input::placeholder {
  color: #7a7a7a;
}

.pit-field input:focus {
  border-color: var(--pit-red);
  background: #1f1f1f;
  outline: none;
  box-shadow: none;
}

.pit-field input:-webkit-autofill,
.pit-field input:-webkit-autofill:hover,
.pit-field input:-webkit-autofill:focus {
  -webkit-text-fill-color: #f4f4f5;
  caret-color: var(--pit-red);
  transition: background-color 99999s ease-in-out 0s;
  box-shadow: 0 0 0 1000px #1a1a1a inset;
  border: 1px solid rgba(255, 255, 255, 0.14);
}

.pit-book__plate-row {
  display: grid;
  gap: 0.85rem;
}

@media (min-width: 700px) {
  .pit-book__plate-row {
    grid-template-columns: 1fr auto;
    align-items: stretch;
  }
}

.pit-book__lookup {
  border-radius: 999px;
  white-space: nowrap;
  padding-inline: 1.4rem;
  font-size: 0.82rem;
  box-shadow: none;
}

.pit-book__plate-msg {
  margin: -0.35rem 0 0;
  font-size: 0.9rem;
  color: #9a9a9a;
}

.pit-book__plate-msg.is-error {
  color: #f87171;
}

.pit-book__plate-msg.is-ok {
  color: #86efac;
}

.pit-book__services {
  margin-top: 0.75rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.pit-book__services-title {
  font-family: var(--pit-font-pitlane-display);
  font-weight: 700;
  font-size: 1.05rem;
  color: #fff;
  margin-bottom: 1.15rem;
}

.pit-book__checks {
  display: grid;
  gap: 0.85rem 1.5rem;
  grid-template-columns: 1fr;
}

@media (min-width: 560px) {
  .pit-book__checks {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 900px) {
  .pit-book__checks {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.pit-check {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  color: #f4f4f5;
  font-size: 0.95rem;
  cursor: pointer;
  user-select: none;
}

.pit-check input {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
  pointer-events: none;
}

.pit-check__box {
  flex-shrink: 0;
  width: 1.15rem;
  height: 1.15rem;
  border-radius: 0.3rem;
  border: 1.5px solid var(--pit-red);
  background: transparent;
  display: grid;
  place-items: center;
  transition:
    background 0.15s ease,
    border-color 0.15s ease;
}

.pit-check__box::after {
  content: '';
  width: 0.55rem;
  height: 0.35rem;
  border-left: 2px solid #fff;
  border-bottom: 2px solid #fff;
  transform: rotate(-45deg) translateY(-1px);
  opacity: 0;
}

.pit-check input:checked + .pit-check__box {
  background: var(--pit-red);
  border-color: var(--pit-red);
}

.pit-check input:checked + .pit-check__box::after {
  opacity: 1;
}

.pit-book__footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 1.75rem;
  padding-top: 1.25rem;
}

.pit-book__submit {
  border-radius: 999px;
  padding: 1rem 1.85rem;
  box-shadow: none;
  text-transform: none;
  letter-spacing: 0.02em;
}

.pit-book__hint {
  color: #9a9a9a;
  font-size: 0.95rem;
}

.pit-book__hint a {
  color: var(--pit-red);
  font-weight: 700;
  text-decoration: none;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
