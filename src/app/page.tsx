import { BASE_PATH } from '@/lib/basePath';
import { routing } from '@/i18n/routing';

const target = `${BASE_PATH}/${routing.defaultLocale}/`;

/**
 * Entry point for `/`.
 *
 * `next-intl`'s middleware normally handles locale negotiation here, but
 * middleware cannot run on a static host, so this renders a plain redirect
 * document instead. Using `redirect()` would prerender Next's client-side
 * error shell and flash before resolving.
 */
export default function RootPage() {
  return (
    <html lang={routing.defaultLocale}>
      <head>
        <meta httpEquiv="refresh" content={`0; url=${target}`} />
        <link rel="canonical" href={target} />
        <title>Jeddah Sea Events</title>
      </head>
      <body style={{ margin: 0, background: '#f8fafc' }}>
        <a href={target}>Continue to Jeddah Sea Events</a>
      </body>
    </html>
  );
}
