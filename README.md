# sdurio.github.io

Executive Operations Partner portfolio site for Sparkle Durio — a modern,
responsive, dark-mode landing page built with plain HTML/CSS/JS and hosted
on GitHub Pages.

## Project structure

```
.
├── index.html                  # Home page (primary conversion page)
├── products.html                # EA Resources storefront placeholder
├── assets/
│   ├── css/
│   │   └── styles.css           # All global styles (design system, layout, animations)
│   ├── js/
│   │   ├── components.js        # Injects the shared nav + footer into every page
│   │   └── main.js              # Scroll animations, stat counters, nav/mobile menu
│   └── images/
│       └── headshot.jpg         # Hero portrait (replace with a real photo)
├── resume/
│   └── sparkle-durio-resume-2026.pdf   # Downloadable resume (replace when updated)
├── favicon.png
├── robots.txt
└── sitemap.xml
```

Older pages (`operating-cadence.html`, `case-studies/`, and the legacy
`style.css`) remain in the repo for backwards compatibility with existing
links, but are no longer linked from the primary navigation.

## Editing shared navigation & footer

The nav bar and footer are **not** duplicated across pages. They live in
`assets/js/components.js` and are injected into any page that includes:

```html
<div id="site-nav"></div>
...
<div id="site-footer"></div>
<script src="assets/js/components.js"></script>
<script src="assets/js/main.js"></script>
```

To change a link, label, or button anywhere in the nav or footer, edit
`assets/js/components.js` once — the change applies to every page
automatically. This is what makes it easy to add new pages (e.g. future
individual product pages) without re-implementing the header/footer each
time.

## Adding a new page

1. Copy `products.html` as a starting template.
2. Update the `<title>`, meta description, and Open Graph tags.
3. Keep the `#site-nav` / `#site-footer` placeholder divs and the two
   `<script>` tags at the bottom of `<body>`.
4. Add the new page's URL to `sitemap.xml`.
5. If the new page lives in a subfolder (e.g. `/products/my-template.html`),
   set `window.SITE_ROOT_DEPTH = 1;` in an inline `<script>` **before**
   `components.js` loads, so injected links resolve correctly.

## Replacing placeholder assets

- **Headshot**: replace `assets/images/headshot.jpg` with a real photo
  (recommended: at least 900×1000px, portrait orientation).
- **Resume**: replace `resume/sparkle-durio-resume-2026.pdf` with the
  current resume, keeping the same filename (or update every link to it in
  `index.html`, `products.html`, and `assets/js/components.js` if you rename
  it).
- **Social share image**: `images/social-share-1200x630.png` is used for
  Open Graph/Twitter cards on both pages.

## Local preview

No build step is required. From the project root, run a simple static
server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Deploying to GitHub Pages

1. Push changes to the `main` branch of `sdurio/sdurio.github.io`
   (a user/organization Pages repo serves from `main` by default).
2. In the repository, go to **Settings → Pages** and confirm the source is
   set to **Deploy from a branch** → `main` → `/ (root)`.
3. GitHub Pages will automatically build and publish the site at
   `https://sdurio.github.io/` within a minute or two of the push.
4. No custom build tooling, Jekyll config, or CI pipeline is required —
   this is a static HTML/CSS/JS site served as-is.

## Performance & SEO notes

- Google Fonts (Playfair Display, Inter) are preconnected for faster
  loading.
- Images use `loading="lazy"` where below the fold and explicit
  `width`/`height` to avoid layout shift.
- Each page ships its own meta description, canonical URL, Open Graph, and
  Twitter card tags.
- `robots.txt` and `sitemap.xml` are kept in sync with published pages.
