# Horizon Wood Products website

Static HTML site. Upload the whole folder to any host (Netlify, Cloudflare Pages, Vercel, cPanel/Apache).

## Pages
- index.html: home (all product lines, the recycling loop, about, location map, FAQ)
- pallets.html, recycled-pallets.html, custom-pallets-crates.html, dunnage.html
- plywood-osb.html, wooden-stakes.html (hands off to thestakeyard.com)
- pallet-scrap-removal.html, animal-bedding.html (with process video), mulch.html
- contact.html: quote form

## Before launch
1. Quote form: connected to Formspree (https://formspree.io/f/xjyyzerp). JS submits it with AJAX and shows the result inline; without JS it posts directly to Formspree. Set the destination inbox, autoresponse and spam settings in the Formspree dashboard, and add horizonwoodproducts.com to the form's allowed domains.
2. 301 redirects from the old WordPress URLs:
   /pallets/ -> /pallets.html, /services/ -> /, /about/ -> /#about, /contact/ -> /contact.html,
   /lumber/ -> /dunnage.html, /mantels/ -> /, /our-work/ -> /
3. Submit sitemap.xml in Google Search Console and update the Google Business Profile address to 1101 Stonebraker Dr, Kendallville, IN 46755 (name, address and phone must match the site exactly).
4. Confirm product claims flagged for review: plywood/OSB thicknesses, mulch is natural/undyed, scrap-hauling pricing, and any certifications (e.g. ISPM-15 heat treatment), which are worth adding if Horizon holds them.
5. Optional: add "geo" coordinates to the LocalBusiness JSON-LD once confirmed from Google Maps.
