# mechanic-pitlane

Template Nuxt 4 de site vitrine pour **garage / mécanicien / réparateur auto**.
Layer autonome DevLeadHunter — `template_id`: `mechanic-pitlane`.

## Direction artistique — « Pitlane »

Inspirée de la maquette Figma **AutoWorks** (Community) :

- fond **asphalt** sombre
- accents **rouge racing**
- typo **Barlow Condensed** (display) + **Barlow** (corps)
- one-page vendable (pas de blog / multi-pages)

## Sections

Hero · Confiance · Services · Pourquoi nous · À propos · Galerie · Process · Avis · FAQ · Contact / horaires

Consomme le contrat partagé `SiteContent` (`@devleadhunter/website-content`).

## Mock preview

**Automobiles du Landry** (Rennes) — données publiques + images du site du garage.

```bash
npm install
npm run dev
```

→ http://localhost:3000

## Brancher sur demo-host (plus tard)

1. Tag `v1.0.0`
2. `extends: ['github:DevLeadHunter/devleadhunter-template-mechanic-pitlane#v1.0.0']`
3. Module Python `api/services/templates/mechanic_pitlane.py` + entrée registre
4. Dispatch `MechanicPitlaneRoot` dans `DemoSiteView.vue`
