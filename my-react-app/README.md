# Ruxx Digital Services — Landing Page

Marketing site for Ruxx Digital Services (RuxxPay bill payments + Ruxx Card gift-card trading). React 19 + Vite 6 + Tailwind CSS v4 + React Router 7, with an Express + Upstash Redis backend in `server/` and an AI blog pipeline in `scripts/`.

## Getting started

```bash
npm install        # install app dependencies
npm run dev        # start Vite dev server
npm run server     # run the backend API (from server/)
npm run build      # production build into dist/
npm run lint       # eslint
npm run preview    # preview the production build
```

The repo ships with an ESLint setup that requires `eslint-plugin-react` (`react/jsx-uses-vars`) so JSX member usage like `<motion.div>` is counted correctly.

## Backend API (`server/`)

Express API for stats, visitor tracking, and review moderation. Requires its own install:

```bash
cd server
npm install
npm start   # or: npm run dev
```

### Environment variables

| Variable                   | Required | Description                                              |
| -------------------------- | -------- | -------------------------------------------------------- |
| `ADMIN_KEY`                | **Yes**  | Secret key for admin endpoints. Must be **at least 16 characters**. The server **refuses to start** without it — there is no default/fallback. Sent via the `x-admin-key` request header. |
| `UPSTASH_REDIS_REST_URL`   | Yes      | Upstash Redis REST URL.                                  |
| `UPSTASH_REDIS_REST_TOKEN` | Yes      | Upstash Redis REST token.                                |
| `PORT`                     | No       | Port to listen on (default `3001`).                      |

Example:

```bash
export ADMIN_KEY='a-long-random-secret-over-16-chars'
export UPSTASH_REDIS_REST_URL='https://...upstash.io'
export UPSTASH_REDIS_REST_TOKEN='...'
```

When deploying to Vercel (the backend runs as a serverless function), set these in **Vercel → Project → Settings → Environment Variables** — do **not** hardcode `ADMIN_KEY` in code or commit it.

Admin endpoints (require `x-admin-key` header): `POST /api/stats/set`, `GET /api/reviews/all`, `PUT /api/reviews/:id/approve`, `DELETE /api/reviews/:id`.

## Adsense & analytics

- AdSense loader + `google-adsense-account` meta live in `index.html`; `public/ads.txt` authorizes `pub-9942550938838021`.
- Ad slots are rendered by `src/components/AdUnit.jsx` on blog pages, gated by cookie consent. Set the real slot ID in `src/lib/adsense.js` (`ADSENSE_SLOT`).
- Google Tag Manager (`GTM-P6K7QNKM`) is loaded in `index.html` with Consent Mode v2 (storage defaults to denied; the cookie banner grants on Accept). Configure the GA4 measurement tag inside GTM's interface.

## Blog pipeline

```bash
npm run blog                # generate one article
npm run blog:topics         # list available topics
npm run blog:daily          # run daily generation
npm run blog:schedule       # schedule daily generation
```