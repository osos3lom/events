/**
 * Path prefix the app is served under.
 *
 * Empty for local dev and root-domain hosting; set to `/events` by the GitHub
 * Pages workflow, since a project site is served from `<user>.github.io/events`.
 *
 * `next/link` and `next/router` apply `basePath` automatically, but raw `<img>`,
 * `<video>` and `<source>` tags (and any path stored in data) do not — wrap those
 * with `asset()`.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** Prefix a `/public` asset path with the deployment's base path. */
export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}
