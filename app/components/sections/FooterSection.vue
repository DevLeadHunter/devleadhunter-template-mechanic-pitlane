<template>
  <footer class="pit-footer">
    <div class="pit-container pit-footer__grid">
      <div class="pit-footer__brand-col">
        <p class="pit-footer__brand">{{ page.businessName || 'Garage' }}</p>
        <p
          v-if="page.area || page.city"
          class="pit-footer__text">
          <template v-if="page.area">{{ page.area }}</template>
          <template v-if="page.area && isCityShown"><br /></template>
          <template v-if="isCityShown">{{ page.city }}</template>
        </p>
        <p
          v-if="page.phone"
          class="pit-footer__text">
          <a :href="`tel:${page.phone}`">{{ page.phone }}</a>
        </p>
        <p
          v-if="page.email"
          class="pit-footer__text">
          <a :href="`mailto:${page.email}`">{{ page.email }}</a>
        </p>
        <ul
          v-if="page.socialLinks.length"
          class="pit-footer__social">
          <li
            v-for="link in page.socialLinks"
            :key="link.url">
            <a
              :href="link.url"
              target="_blank"
              rel="noopener"
              class="pit-footer__social-link"
              :aria-label="socialNetworkDisplay(link.network).label">
              <span
                aria-hidden="true"
                v-html="socialNetworkDisplay(link.network).icon"></span>
            </a>
          </li>
        </ul>
      </div>

      <div>
        <p class="pit-footer__title">Navigation</p>
        <ul class="pit-footer__links">
          <li><a href="#services">Services</a></li>
          <li><a href="#atelier">À propos</a></li>
          <li v-if="page.reviews.length"><a href="#avis">Avis</a></li>
          <li><a href="#rdv">Rendez-vous</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="#localisation">Nous trouver</a></li>
        </ul>
      </div>

      <div>
        <p class="pit-footer__title">Horaires</p>
        <ul
          v-if="page.openingHours.length"
          class="pit-footer__hours">
          <li
            v-for="row in page.openingHours"
            :key="row.day">
            <span>{{ row.day }}</span>
            <span>{{ row.hours }}</span>
          </li>
        </ul>
        <p
          v-else
          class="pit-footer__text">
          Sur rendez-vous
        </p>
        <a
          href="#rdv"
          class="pit-btn pit-btn--red pit-footer__cta"
          >{{ page.ctaQuoteLabel }}</a
        >
      </div>
    </div>

    <div class="pit-container pit-footer__bottom">
      <p>{{ copyrightLine(page.businessName) }}</p>
      <p v-if="page.professionalLicense">{{ page.professionalLicense }}</p>
      <p v-if="page.zones.length">Zone : {{ page.zones.join(' · ') }}</p>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import type { ComputedRef, PropType } from 'vue'
import type { PitlanePageContent } from '~/types/pitlane'

const props = defineProps({
  page: {
    type: Object as PropType<PitlanePageContent>,
    required: true,
  },
})

type SocialNetworkDisplay = {
  label: string
  icon: string
}

const FINAL_PUNCTUATION: RegExp = /[.!?]$/

const SOCIAL_NETWORK_DISPLAYS: Record<string, SocialNetworkDisplay> = {
  facebook: {
    label: 'Facebook',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M14.5 21v-7.5h2.6l.4-3.2h-3V8.4c0-.9.3-1.6 1.6-1.6h1.6V4a21 21 0 0 0-2.4-.1c-2.4 0-4 1.5-4 4.1v2.3H8.7v3.2h2.6V21"/></svg>',
  },
  instagram: {
    label: 'Instagram',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="3.8"/><circle cx="17.3" cy="6.7" r="0.6" fill="currentColor"/></svg>',
  },
  whatsapp: {
    label: 'WhatsApp',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M4 20.5l1.2-4.3A8.4 8.4 0 1 1 8 19.3z"/><path d="M9.2 8.6c.2-.5.5-.5.8-.5h.5c.2 0 .4.1.5.4l.7 1.6c.1.2 0 .5-.1.6l-.5.6c-.1.2-.1.4 0 .5.6 1 1.4 1.8 2.4 2.4.2.1.4.1.5 0l.6-.5c.2-.2.4-.2.6-.1l1.6.7c.3.1.4.3.4.5v.5c0 .3 0 .6-.5.8-.6.3-1.3.4-2 .2-2.6-.8-4.6-2.8-5.4-5.4-.2-.7-.1-1.4.2-2z"/></svg>',
  },
  youtube: {
    label: 'YouTube',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><rect x="2.5" y="5.5" width="19" height="13" rx="3.5"/><path d="m10.2 9.3 4.6 2.7-4.6 2.7z"/></svg>',
  },
  tiktok: {
    label: 'TikTok',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3.5v11a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3.5c.4 2.4 2.3 4.3 4.7 4.6"/></svg>',
  },
  linkedin: {
    label: 'LinkedIn',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="3.5" y="3.5" width="17" height="17" rx="2.5"/><path d="M8.2 10.5v6M8.2 7.6v.1M11.8 16.5v-6M11.8 13.2c0-1.6 1-2.7 2.3-2.7s2 .9 2 2.6v3.4"/></svg>',
  },
}

const OTHER_SOCIAL_NETWORK_ICON: string =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>'

/**
 * Nom affiché et icône d'un réseau social, avec une icône de lien pour un réseau que la template ne connaît pas.
 * @param network Réseau en minuscules (« facebook », « instagram »…)
 * @returns Le nom du réseau pour les lecteurs d'écran et son icône SVG
 */
function socialNetworkDisplay(network: string): SocialNetworkDisplay {
  return (
    SOCIAL_NETWORK_DISPLAYS[network] ?? {
      label: network.charAt(0).toUpperCase() + network.slice(1),
      icon: OTHER_SOCIAL_NETWORK_ICON,
    }
  )
}

const isCityShown: ComputedRef<boolean> = computed((): boolean => {
  const city: string = props.page.city.trim()
  return (
    city.length > 0 &&
    !props.page.area.toLocaleLowerCase('fr').includes(city.toLocaleLowerCase('fr'))
  )
})

const year: number = new Date().getFullYear()

/**
 * Mention de copyright du bas de page, sans point doublé derrière un nom qui finit déjà par un (« Garage Exemple inc. »).
 * @param businessName Nom de l'entreprise
 * @returns La mention « © 2026 Nom. Tous droits réservés. »
 */
function copyrightLine(businessName: string): string {
  const owner: string = `© ${year} ${businessName}`.trim()
  const ownerSentence: string = FINAL_PUNCTUATION.test(owner) ? owner : `${owner}.`
  return `${ownerSentence} Tous droits réservés.`
}
</script>

<style scoped>
.pit-footer {
  background: color-mix(in srgb, var(--pit-bg) 55%, black);
  border-top: 1px solid var(--pit-line);
  padding-top: 3rem;
}

.pit-footer__grid {
  display: grid;
  gap: 2rem;
  padding-bottom: 2.4rem;
}

@media (min-width: 860px) {
  .pit-footer__grid {
    grid-template-columns: 1.3fr 0.8fr 1fr;
    gap: 2.5rem;
  }
}

.pit-footer__brand {
  font-family: var(--pit-font-pitlane-display);
  font-weight: 800;
  font-size: 1.55rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.pit-footer__title {
  font-family: var(--pit-font-pitlane-display);
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--pit-red);
  margin-bottom: 0.9rem;
}

.pit-footer__text {
  margin-top: 0.55rem;
  color: var(--pit-muted);
  line-height: 1.55;
}

.pit-footer__text a {
  color: var(--pit-ink);
  text-decoration: none;
  font-weight: 600;
}

.pit-footer__text a:hover {
  color: var(--pit-red);
}

.pit-footer__social {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin: 1.1rem 0 0;
  padding: 0;
  list-style: none;
}

.pit-footer__social-link {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border: 1px solid color-mix(in srgb, var(--pit-ink) 22%, transparent);
  border-radius: 999px;
  color: var(--pit-ink);
  transition:
    color 0.2s ease,
    border-color 0.2s ease;
}

.pit-footer__social-link:hover {
  border-color: var(--pit-red);
  color: var(--pit-red);
}

.pit-footer__social-link :deep(svg) {
  width: 1.2rem;
  height: 1.2rem;
}

.pit-footer__links,
.pit-footer__hours {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.45rem;
}

.pit-footer__links a {
  color: var(--pit-muted);
  text-decoration: none;
  font-weight: 500;
}

.pit-footer__links a:hover {
  color: var(--pit-ink);
}

.pit-footer__hours li {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.15rem 1rem;
  color: var(--pit-muted);
  font-size: 0.92rem;
  padding-bottom: 0.35rem;
  border-bottom: 1px solid var(--pit-line);
}

.pit-footer__cta {
  margin-top: 1.2rem;
}

.pit-footer__bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.75rem 1.5rem;
  padding-block: 1.15rem 1.5rem;
  border-top: 1px solid var(--pit-line);
  color: var(--pit-muted);
  font-size: 0.86rem;
}
</style>
