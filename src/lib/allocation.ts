import { luxuryCatalog } from '../data/luxuryCatalog';
import { LuxuryProduct, ServiceCategory, TierOption } from '../types/booking';

/**
 * Scarcity selectors for the landing page.
 *
 * Everything here is derived from the catalog rather than hardcoded, so every
 * number shown to a visitor is one we can defend if they screenshot it and ask.
 */

/** Bookable now, decided in minutes, sold from the cart. */
export const FAST_LANE_CATEGORIES: ServiceCategory[] = ['events', 'day-passes', 'voyages'];

/** Vetted, six-figure, sold through a conversation. Never a cart. */
export const SLOW_LANE_CATEGORIES: ServiceCategory[] = ['real-estate'];

export interface AllocationRow {
  product: LuxuryProduct;
  tier: TierOption;
  remaining: number;
  total: number;
  /** Fraction still unsold, 0–1. Lower is scarcer. */
  ratio: number;
}

/**
 * A tier only communicates scarcity when more than one unit ever existed.
 * "Only 1 left" on a single superyacht reads as "one yacht exists" — true,
 * but not urgent. Those are surfaced by date instead.
 */
const isMeasurable = (tier: TierOption) => tier.capacityTotal > 1 && tier.capacityRemaining > 0;

const toRow = (product: LuxuryProduct, tier: TierOption): AllocationRow => ({
  product,
  tier,
  remaining: tier.capacityRemaining,
  total: tier.capacityTotal,
  ratio: tier.capacityRemaining / tier.capacityTotal,
});

const byScarcity = (a: AllocationRow, b: AllocationRow) =>
  a.ratio - b.ratio || a.remaining - b.remaining;

const rowsFor = (categories: ServiceCategory[]) =>
  luxuryCatalog
    .filter((product) => categories.includes(product.category))
    .flatMap((product) => (product.tiers ?? []).map((tier) => toRow(product, tier)));

/** Every remaining bookable unit across the whole catalog. Drives the headline. */
export function totalPlacesRemaining(): number {
  return luxuryCatalog.reduce(
    (sum, product) =>
      sum + (product.tiers ?? []).reduce((tierSum, tier) => tierSum + tier.capacityRemaining, 0),
    0
  );
}

/** How many tiers are down to their last quarter. */
export function criticalTierCount(threshold = 0.25): number {
  return luxuryCatalog
    .flatMap((product) => product.tiers ?? [])
    .filter((tier) => isMeasurable(tier) && tier.capacityRemaining / tier.capacityTotal <= threshold)
    .length;
}

/** The scarcest measurable tier of one product, for card-level display. */
export function scarcestTierOf(product: LuxuryProduct): AllocationRow | null {
  const rows = (product.tiers ?? []).filter(isMeasurable).map((tier) => toRow(product, tier));
  return rows.sort(byScarcity)[0] ?? null;
}

/** Cheapest tier price, for "from X" anchors. */
export function entryPriceOf(product: LuxuryProduct): number {
  const prices = (product.tiers ?? []).map((tier) => tier.price);
  return prices.length ? Math.min(...prices) : product.basePrice;
}

/**
 * The hero board: the fast lane's most-depleted inventory, one row per product
 * so four rows mean four different things to buy rather than four tiers of one.
 */
export function allocationBoardRows(limit = 4): AllocationRow[] {
  const scarcestPerProduct = luxuryCatalog
    .filter((product) => FAST_LANE_CATEGORIES.includes(product.category))
    .map(scarcestTierOf)
    .filter((row): row is AllocationRow => row !== null);

  return scarcestPerProduct.sort(byScarcity).slice(0, limit);
}

/** Membership and lease allocation, shown as exclusivity rather than urgency. */
export function slowLaneRows(): AllocationRow[] {
  return rowsFor(SLOW_LANE_CATEGORIES).filter((row) => isMeasurable(row.tier)).sort(byScarcity);
}

/** Total tiers, used for the "view all" affordance. */
export function totalTierCount(): number {
  return luxuryCatalog.flatMap((product) => product.tiers ?? []).length;
}

/** Lowest price anywhere in the fast lane. */
export function fastLaneEntryPrice(): number {
  const prices = rowsFor(FAST_LANE_CATEGORIES).map((row) => row.tier.price);
  return prices.length ? Math.min(...prices) : 0;
}

const parseEventDate = (value?: string): Date | null => {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T20:00:00+03:00`);
  return Number.isNaN(date.getTime()) ? null : date;
};

export interface DatedEvent {
  product: LuxuryProduct;
  date: Date;
}

/** The soonest event with a real calendar date — the only honest countdown we have. */
export function nextDatedEvent(now: Date = new Date()): DatedEvent | null {
  return luxuryCatalog
    .filter((product) => product.category === 'events')
    .map((product) => ({ product, date: parseEventDate(product.dateOrSchedule) }))
    .filter((entry): entry is DatedEvent => entry.date !== null && entry.date.getTime() > now.getTime())
    .sort((a, b) => a.date.getTime() - b.date.getTime())[0] ?? null;
}

/** Products in one category, scarcest first. */
export function productsInCategory(category: ServiceCategory): LuxuryProduct[] {
  return luxuryCatalog.filter((product) => product.category === category);
}

/** Deep link to the detail page with a tier preselected. */
export function tierUrl(locale: string, row: AllocationRow): string {
  return `/${locale}/${row.product.category}/${row.product.id}?tier=${row.tier.id}`;
}
