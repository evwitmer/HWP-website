# Horizon Wood Products website

Static HTML site, served by a Cloudflare Worker with static assets (`wrangler.jsonc`).

## Pages
- index.html: home (all product lines, the recycling loop, about, location map, FAQ)
- pallets.html, recycled-pallets.html, custom-pallets-crates.html, dunnage.html
- plywood-osb.html, wooden-stakes.html (hands off to thestakeyard.com)
- pallet-scrap-removal.html, animal-bedding.html (with process video), mulch.html
- contact.html: quote form

## Before launch
1. Quote form: connected to Formspree (https://formspree.io/f/xjyyzerp). JS submits it with AJAX and shows the result inline; without JS it posts directly to Formspree. Set the destination inbox, autoresponse and spam settings in the Formspree dashboard, and add horizonwoodproducts.com to the form's allowed domains.
2. 301 redirects from the old WordPress URLs are in `_redirects` (done):
   /pallets/ -> /pallets.html, /services/ -> /, /about/ -> /#about, /contact/ -> /contact.html,
   /lumber/ -> /dunnage.html, /mantels/ -> /, /our-work/ -> /
3. Submit sitemap.xml in Google Search Console and update the Google Business Profile address to 1101 Stonebraker Dr, Kendallville, IN 46755 (name, address and phone must match the site exactly).
4. Confirm product claims flagged for review: plywood/OSB thicknesses, mulch is natural/undyed, scrap-hauling pricing, and any certifications (e.g. ISPM-15 heat treatment), which are worth adding if Horizon holds them.
5. Optional: add "geo" coordinates to the LocalBusiness JSON-LD once confirmed from Google Maps.

## Hosting (Cloudflare Workers)
- `wrangler.jsonc`: Worker `horizon-wood-products`, serves this folder as static assets.
- `html_handling` is `none`, so pages are served at their `.html` URLs exactly as linked, canonicalised and listed in `sitemap.xml`. `_redirects` rewrites `/` to `index.html` and holds the old WordPress redirects.
- `.assetsignore` keeps README.md, wrangler.jsonc and repo files from being published.
- Local preview: `npx wrangler dev`. Deploy: `npx wrangler deploy` (or push to `main` if Workers Builds is connected).
- Custom domains: `horizonwoodproducts.com` and `www.horizonwoodproducts.com` (Worker > Settings > Domains & Routes).
