This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deployment (GitHub Pages)

The demo is published to GitHub Pages by `.github/workflows/deploy.yml` on every
push to `main`, and can also be run manually from the Actions tab.

Live URL: **https://osos3lom.github.io/events/**

The app is a fully static export (`output: 'export'`) with no backend — all demo
state lives in `localStorage`, so it runs anywhere that serves static files.

### Base path

A GitHub Pages *project* site is served from `<user>.github.io/<repo>`, not the
domain root, so the build needs a path prefix. The workflow sets it from the repo
name:

```
NEXT_PUBLIC_BASE_PATH=/events npm run build
```

`next/link` applies this automatically. Raw `<img>`, `<video>` and any asset path
stored in data must be wrapped with `asset()` from `src/lib/basePath.ts`:

```tsx
import { asset } from '@/lib/basePath';

<img src={asset('/brand/logo-icon.png')} />
```

Leaving `NEXT_PUBLIC_BASE_PATH` unset (as in `npm run dev`) yields an empty
prefix, so local development and root-domain hosting both work unchanged.

### Moving to a custom domain

Serving from a domain root removes the prefix entirely: add a `CNAME` file to
`public/`, point DNS at GitHub Pages, and drop the `NEXT_PUBLIC_BASE_PATH` env
line from the workflow.

### Notes

- `public/.nojekyll` stops Pages from stripping the `_next/` directory.
- `trailingSlash: true` emits `en/index.html`, so both `/en` and `/en/` resolve
  on a host with no rewrite rules.
- `src/middleware.ts` (next-intl locale negotiation) only runs under `next dev`;
  static hosts cannot execute middleware, so `/` is handled by the redirect
  document in `src/app/page.tsx`.
