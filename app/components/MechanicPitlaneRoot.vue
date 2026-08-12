<template>
  <div
    ref="rootRef"
    class="pit"
    :class="{ 'pit--ready': isReady, 'pit--js': isClient, 'pit--mobile-bar': showMobileBar }"
    :style="themeVars">
    <header class="pit-header">
      <div class="pit-container pit-header__inner">
        <a
          href="#top"
          class="pit-logo"
          >{{ page.businessName || 'Garage' }}</a
        >
        <nav
          class="pit-nav"
          aria-label="Navigation">
          <a href="#services">Services</a>
          <a href="#atelier">Atelier</a>
          <a href="#rdv">RDV</a>
          <a href="#avis">Avis</a>
          <a href="#localisation">Nous trouver</a>
        </nav>
        <a
          v-if="page.phone"
          :href="`tel:${page.phone}`"
          class="pit-btn pit-btn--red pit-header__cta">
          {{ page.phone }}
        </a>
      </div>
    </header>

    <main id="top">
      <HeroSection
        v-bind="editableAttrs(props.content._editable?.hero)"
        :page="page" />
      <TrustSection
        v-bind="editableAttrs(props.content._editable?.trust)"
        :items="page.trustItems" />
      <ServicesSection
        v-bind="editableAttrs(props.content._editable?.services)"
        :heading="page.servicesHeading"
        :services="page.services" />
      <WhySection
        :heading="page.whyHeading"
        :items="page.whyItems" />
      <AboutSection
        v-if="page.about"
        v-bind="editableAttrs(props.content._editable?.about)"
        :heading="page.aboutHeading"
        :text="page.about"
        :image="page.aboutImage"
        :secondary-image="page.aboutSecondaryImage"
        :city="page.city"
        :cta-label="page.ctaQuoteLabel" />
      <GallerySection
        v-if="page.gallery.length"
        v-bind="editableAttrs(props.content._editable?.gallery)"
        :heading="page.galleryHeading"
        :items="page.gallery" />
      <ProcessSection
        :heading="page.processHeading"
        :items="page.processItems" />
      <ReviewsSection
        v-if="page.reviews.length"
        v-bind="editableAttrs(props.content._editable?.reviews)"
        :heading="page.reviewsHeading"
        :reviews="page.reviews" />
      <AppointmentSection
        :phone="page.phone"
        :email="page.email"
        :city="page.city"
        :service-titles="page.services.map((service) => service.title)" />
      <FaqSection
        v-if="page.faq.length"
        v-bind="editableAttrs(props.content._editable?.faq)"
        :heading="page.faqHeading"
        :items="page.faq"
        :image="page.faqImage" />
      <MapSection
        :business-name="page.businessName"
        :city="page.city"
        :area="page.area"
        :address="page.address"
        :phone="page.phone"
        :email="page.email"
        :lat="page.lat"
        :lng="page.lng" />
    </main>

    <FooterSection
      v-bind="editableAttrs(props.content._editable?.contact)"
      :page="page" />

    <div
      v-if="page.phone"
      class="pit-mobile-bar"
      :class="{ 'is-visible': showMobileBar }"
      :aria-hidden="showMobileBar ? 'false' : 'true'">
      <a
        :href="`tel:${page.phone}`"
        class="pit-btn pit-btn--red pit-mobile-bar__btn"
        :tabindex="showMobileBar ? 0 : -1"
        >{{ page.ctaCallLabel }}</a
      >
      <a
        href="#rdv"
        class="pit-btn pit-btn--ghost pit-mobile-bar__btn"
        :tabindex="showMobileBar ? 0 : -1"
        >{{ page.ctaQuoteLabel }}</a
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
/**
 * Template 'mechanic-pitlane' — DA asphalt / rouge racing (inspirée AutoWorks).
 * Racine publique : rend un `SiteContent` typé, sans dépendance au tunnel.
 */
import type { ComputedRef, PropType, Ref } from 'vue'
import type { SiteContent } from '~/types/SiteContent'
import { editableAttrs } from '@devleadhunter/website-content'
import { buildPitlaneContent } from '~/types/pitlane'
import type { PitlanePageContent } from '~/types/pitlane'
import HeroSection from './sections/HeroSection.vue'
import TrustSection from './sections/TrustSection.vue'
import ServicesSection from './sections/ServicesSection.vue'
import WhySection from './sections/WhySection.vue'
import AboutSection from './sections/AboutSection.vue'
import GallerySection from './sections/GallerySection.vue'
import ProcessSection from './sections/ProcessSection.vue'
import ReviewsSection from './sections/ReviewsSection.vue'
import AppointmentSection from './sections/AppointmentSection.vue'
import FaqSection from './sections/FaqSection.vue'
import MapSection from './sections/MapSection.vue'
import FooterSection from './sections/FooterSection.vue'

const props = defineProps({
  content: {
    type: Object as PropType<SiteContent>,
    required: true,
  },
})

const rootRef: Ref<HTMLElement | null> = ref(null)
const isReady: Ref<boolean> = ref(false)
const isClient: Ref<boolean> = ref(false)
/** Barre fixe mobile : visible seulement quand les CTA hero ont quitté l’écran. */
const showMobileBar: Ref<boolean> = ref(false)

const page: ComputedRef<PitlanePageContent> = computed((): PitlanePageContent =>
  buildPitlaneContent(props.content),
)

const themeVars: ComputedRef<Record<string, string>> = computed((): Record<string, string> => ({
  // Couleur primaire prospect (logo / palette) — toute la DA suit `palette.primary`.
  '--pit-red': page.value.theme.primary,
  '--pit-bg': page.value.theme.secondary,
  '--pit-ink': page.value.theme.accent,
}))

let revealObserver: IntersectionObserver | null = null
let heroCtaObserver: IntersectionObserver | null = null

/**
 * Observe les éléments `[data-pit-reveal]` non encore révélés.
 * @returns void
 */
function observeReveals(): void {
  if (!revealObserver || !rootRef.value) {
    return
  }
  rootRef.value
    .querySelectorAll<HTMLElement>('[data-pit-reveal]:not(.is-shown)')
    .forEach((el: HTMLElement): void => {
      revealObserver?.observe(el)
    })
}

/** Observe les CTA du hero pour afficher la barre mobile hors viewport. */
function observeHeroCtas(): void {
  if (!rootRef.value || typeof IntersectionObserver === 'undefined') {
    return
  }
  heroCtaObserver?.disconnect()
  const actions: HTMLElement | null = rootRef.value.querySelector('.pit-hero__actions')
  if (!actions) {
    showMobileBar.value = true
    return
  }
  heroCtaObserver = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]): void => {
      const entry = entries[0]
      if (!entry) return
      showMobileBar.value = !entry.isIntersecting
    },
    { threshold: 0, rootMargin: '0px 0px 0px 0px' },
  )
  heroCtaObserver.observe(actions)
}

onMounted((): void => {
  isClient.value = true
  const reduced: boolean = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    isReady.value = true
  } else {
    requestAnimationFrame((): void => {
      requestAnimationFrame((): void => {
        isReady.value = true
      })
    })
  }

  revealObserver = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]): void => {
      entries.forEach((entry: IntersectionObserverEntry): void => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-shown')
          revealObserver?.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  )
  observeReveals()
  observeHeroCtas()
})

watch(page, async (): Promise<void> => {
  await nextTick()
  observeReveals()
  observeHeroCtas()
})

onUnmounted((): void => {
  revealObserver?.disconnect()
  heroCtaObserver?.disconnect()
})

useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap',
    },
  ],
})
</script>

<style>
.pit {
  --pit-surface: #141416;
  --pit-card: #1a1a1d;
  --pit-muted: #a1a1aa;
  --pit-line: color-mix(in srgb, var(--pit-ink) 12%, transparent);
  --pit-red-glow: color-mix(in srgb, var(--pit-red) 45%, transparent);
  --pit-font-pitlane-display: 'Montserrat', sans-serif;
  --pit-font-pitlane-sans: 'Montserrat', sans-serif;

  position: relative;
  min-height: 100dvh;
  background: var(--pit-bg);
  color: var(--pit-ink);
  font-family: var(--pit-font-pitlane-sans);
  overflow-x: clip;
  padding-bottom: 0;
}

@media (max-width: 639px) {
  .pit.pit--mobile-bar {
    padding-bottom: 5.5rem;
  }
}

@media (min-width: 640px) {
  .pit {
    padding-bottom: 0;
  }
}

.pit [id] {
  scroll-margin-top: 5rem;
}

.pit ::selection {
  background: var(--pit-red);
  color: #fff;
}

.pit :focus-visible {
  outline: 2px solid var(--pit-red);
  outline-offset: 3px;
}

.pit-container {
  max-width: 78rem;
  margin-inline: auto;
  padding-inline: clamp(1.15rem, 4vw, 2.5rem);
}

.pit-section {
  padding-block: clamp(5rem, 11vw, 7.5rem);
}

.pit-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-family: var(--pit-font-pitlane-display);
  font-weight: 700;
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--pit-red);
}

.pit-eyebrow::before {
  content: '';
  width: 1.4rem;
  height: 2px;
  background: var(--pit-red);
}

.pit-heading {
  margin-top: 0.85rem;
  font-family: var(--pit-font-pitlane-display);
  font-weight: 700;
  font-size: clamp(2rem, 4.2vw, 3rem);
  line-height: 1.05;
  letter-spacing: 0.01em;
  text-wrap: balance;
}

.pit-lead {
  margin-top: 0.9rem;
  max-width: 36rem;
  color: var(--pit-muted);
  line-height: 1.65;
  font-size: 1.05rem;
}

.pit-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.85rem 1.45rem;
  border-radius: 0.2rem;
  font-family: var(--pit-font-pitlane-display);
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.pit-btn--red {
  background: var(--pit-red);
  color: #fff;
  box-shadow: none;
}

.pit-btn--red:hover {
  background: color-mix(in srgb, var(--pit-red) 88%, white);
  transform: translateY(-1px);
}

.pit-btn--ghost {
  border: 1px solid color-mix(in srgb, var(--pit-ink) 28%, transparent);
  color: var(--pit-ink);
  background: transparent;
}

.pit-btn--ghost:hover {
  border-color: var(--pit-red);
  color: var(--pit-red);
}

/* Header */
.pit-header {
  position: sticky;
  top: 0;
  z-index: 40;
  background: color-mix(in srgb, var(--pit-bg) 88%, transparent);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--pit-line);
}

.pit-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  height: 4.1rem;
}

.pit-logo {
  font-family: var(--pit-font-pitlane-display);
  font-weight: 800;
  font-size: clamp(0.78rem, 3.4vw, 1.05rem);
  letter-spacing: 0.03em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--pit-ink);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: min(62vw, 14rem);
  line-height: 1.25;
}

.pit-nav {
  display: none;
  gap: 1.1rem;
}

.pit-nav a {
  font-family: var(--pit-font-pitlane-display);
  font-weight: 600;
  font-size: 0.78rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--pit-muted);
  transition: color 0.2s ease;
}

.pit-nav a:hover {
  color: var(--pit-ink);
}

.pit-header__cta {
  display: none;
  padding: 0.55rem 1rem;
  font-size: 0.78rem;
}

@media (min-width: 768px) {
  .pit-nav {
    display: flex;
  }

  .pit-header__cta {
    display: inline-flex;
  }

  .pit-logo {
    max-width: none;
    font-size: 1.05rem;
  }
}

/* Mobile bar — masquée tant que les CTA hero sont visibles */
.pit-mobile-bar {
  position: fixed;
  inset-inline: 0;
  bottom: 0;
  z-index: 45;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.55rem;
  padding: 0.75rem 0.9rem calc(0.75rem + env(safe-area-inset-bottom));
  background: color-mix(in srgb, var(--pit-bg) 92%, transparent);
  backdrop-filter: blur(12px);
  border-top: 1px solid var(--pit-line);
  transform: translateY(110%);
  opacity: 0;
  pointer-events: none;
  transition:
    transform 0.28s ease,
    opacity 0.28s ease;
}

.pit-mobile-bar.is-visible {
  transform: none;
  opacity: 1;
  pointer-events: auto;
}

.pit-mobile-bar__btn {
  width: 100%;
  padding: 0.8rem 0.6rem;
  font-size: 0.72rem;
}

@media (min-width: 640px) {
  .pit-mobile-bar {
    display: none;
  }
}

@media (max-width: 899px) {
  .pit-heading {
    text-align: left;
  }
}

/* Motion */
.pit:not(.pit--ready) [data-pit-intro] {
  opacity: 0;
  transform: translateY(16px);
}

.pit--ready [data-pit-intro] {
  opacity: 1;
  transform: none;
  transition:
    opacity 0.7s ease var(--pit-delay, 0ms),
    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) var(--pit-delay, 0ms);
}

.pit--js [data-pit-reveal] {
  opacity: 0;
  transform: translateY(22px);
  transition:
    opacity 0.7s ease,
    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--pit-delay, 0ms);
}

.pit--js [data-pit-reveal].is-shown {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .pit:not(.pit--ready) [data-pit-intro],
  .pit--js [data-pit-reveal] {
    opacity: 1;
    transform: none;
  }

  .pit--ready [data-pit-intro],
  .pit--js [data-pit-reveal] {
    transition: none;
  }
}
</style>
