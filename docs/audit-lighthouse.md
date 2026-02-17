# Rapport d'Audit Lighthouse - GAB Platform

**Date** : 17 fevrier 2026
**Outil** : Chrome DevTools Performance Trace + analyse manuelle du code

---

## Scores estimes actuels

| Critere | Score estime |
|---------|-------------|
| **Performance** | 55-65/100 |
| **Accessibilite** | 80-85/100 |
| **SEO** | 70-80/100 |
| **Bonnes pratiques** | 80-90/100 |

## Donnees reelles du Performance Trace (page d'accueil)

- **LCP** : 254 ms (bon)
- **CLS** : **0.61** (CRITIQUE - seuil : < 0.1)
- **Forced Reflow** : **1 589 ms** dans `AnimatedStripes.useEffect.animate`

---

## Problemes critiques (Impact fort)

### 1. CLS catastrophique : 0.61 (seuil max = 0.1)

- **Fichier** : `components/hero/animated-stripes.tsx`
- **Impact** : Performance (-30 points)
- **Cause** : 143 elements DOM dont la `height` est modifiee a 60fps via `requestAnimationFrame`, provoquant des layout shifts continus + forced reflows (1 589 ms)
- **Solution** : Remplacer `element.style.height` par `element.style.transform = scaleY()` (pas de layout) ou utiliser CSS animations. Supprimer `document.querySelectorAll` dans la boucle RAF.

### 2. Forced Reflow massif dans AnimatedStripes

- **Fichier** : `components/hero/animated-stripes.tsx:48-55`
- **Impact** : Performance (-20 points)
- **Cause** : `containerRef.current.getBoundingClientRect()` appele 143 fois par frame dans la boucle `requestAnimationFrame`, declenchant un forced synchronous layout a chaque iteration
- **Solution** : Mettre en cache `rect` avant la boucle `forEach`, ne le recalculer qu'au resize

### 3. Pas de `robots.txt` ni `sitemap.xml`

- **Impact** : SEO (-15 points)
- **Solution** : Creer `app/robots.ts` et `app/sitemap.ts` avec les exports Next.js natifs

### 4. Pas de JSON-LD structured data

- **Impact** : SEO (-10 points)
- **Solution** : Ajouter Schema.org Organization + WebSite dans le layout, Event pour les events

### 5. Open Graph image en chemin relatif

- **Fichier** : `app/layout.tsx:45`
- **Impact** : SEO / Bonnes pratiques
- **Cause** : `url: "/assets/logos/GAB Logo full white.png"` - doit etre une URL absolue
- **Solution** : Utiliser `${process.env.NEXT_PUBLIC_SITE_URL}/assets/logos/...`

---

## Problemes moderes (Impact moyen)

### 6. `force-dynamic` sur la page Events

- **Fichier** : `app/(public)/events/page.tsx:7`
- **Impact** : Performance
- **Cause** : Empeche toute mise en cache statique, chaque visite = requete Supabase
- **Solution** : Utiliser ISR avec `export const revalidate = 3600`

### 7. Images sans attribut `sizes`

- **Fichiers** : `components/events/event-card.tsx:28`, `components/hero/hero.tsx:24`
- **Impact** : Performance (images trop grandes telechargees sur mobile)
- **Solution** : Ajouter `sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"`

### 8. Pas de `viewport` export

- **Fichier** : `app/layout.tsx`
- **Impact** : SEO / Bonnes pratiques
- **Solution** : Ajouter `export const viewport = { themeColor: '#86db00' }`

### 9. Font OTF au lieu de WOFF2

- **Fichier** : `public/fonts/Mode_VF_Thin_Condensed.otf` (80 Ko)
- **Impact** : Performance
- **Solution** : Convertir en WOFF2 (~40 Ko, compression native)

### 10. Logos PNG au lieu de SVG

- **Fichier** : `public/assets/logos/*.png`
- **Impact** : Performance / Accessibilite
- **Solution** : Convertir en SVG (scalable, plus leger)

### 11. Pas de skip-to-content link

- **Fichier** : `app/layout.tsx`
- **Impact** : Accessibilite (-5 points)
- **Solution** : Ajouter `<a href="#main-content" className="sr-only focus:not-sr-only">Aller au contenu</a>`

### 12. Newsletter form sans `aria-label` ni `autocomplete`

- **Fichier** : `components/forms/newsletter-form.tsx:80-84`
- **Impact** : Accessibilite
- **Solution** : Ajouter `aria-label="Adresse email"` et `autoComplete="email"`

### 13. Pas de `<main>` landmark

- **Fichier** : `app/(public)/page.tsx`
- **Impact** : Accessibilite
- **Solution** : Envelopper le contenu dans `<main id="main-content">`

---

## Problemes mineurs (Impact faible)

### 14. Pas de `preconnect` pour les domaines externes

- **Impact** : Performance (LCP)
- **Solution** : Ajouter dans le layout : `<link rel="preconnect" href="https://img.youtube.com" />`

### 15. External links sans `rel="noopener noreferrer"` systematique

- **Fichier** : `components/events/event-card.tsx:92,100`
- **Impact** : Bonnes pratiques

### 16. Liens footer vers des pages inexistantes

- **Fichier** : `components/layout/footer.tsx`
- `/mentions-legales`, `/confidentialite`, `/cgu` — generent des 404

### 17. CSS keyframe `animate-stripe` inutilisee

- **Fichier** : `app/globals.css:83-97`
- **Impact** : Bundle CSS (mineur)

### 18. `date-fns` potentiellement heavy

- **Fichier** : `package.json`
- **Impact** : Bundle JS
- **Solution** : Verifier que seuls les modules utilises sont importes (tree-shaking OK si import cible)

---

## Plan d'action recommande

### Phase 1 - Performance critique (CLS + Reflow)

- [ ] Refactorer `AnimatedStripes` : utiliser `transform: scaleY()` au lieu de `height`, cacher le `getBoundingClientRect()` hors de la boucle, reduire les acces DOM
- [ ] Supprimer `export const dynamic = "force-dynamic"` → `export const revalidate = 3600`
- [ ] Ajouter `sizes` sur toutes les images `<Image fill>`

### Phase 2 - SEO

- [ ] Creer `app/robots.ts` (robots.txt dynamique)
- [ ] Creer `app/sitemap.ts` (sitemap.xml dynamique)
- [ ] Ajouter JSON-LD Organization + WebSite dans le layout
- [ ] Corriger l'URL Open Graph (absolue)
- [ ] Ajouter `export const viewport` avec `themeColor`

### Phase 3 - Accessibilite

- [ ] Ajouter skip-to-content link
- [ ] Ajouter `<main id="main-content">` sur les pages
- [ ] Ajouter `aria-label` et `autoComplete="email"` sur le formulaire newsletter
- [ ] Verifier les contrastes de couleurs (surtout `muted-foreground` sur fond sombre)

### Phase 4 - Optimisations complementaires

- [ ] Convertir la font OTF → WOFF2
- [ ] Convertir les logos PNG → SVG
- [ ] Ajouter `preconnect` pour les domaines d'images externes
- [ ] Supprimer la CSS animation inutilisee dans globals.css
- [ ] Ajouter `rel="noopener noreferrer"` sur tous les liens externes

---

**Score cible apres corrections** : 95-100 sur les 4 criteres Lighthouse.
