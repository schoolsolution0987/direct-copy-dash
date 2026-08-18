/**
 * Single source of truth for every headline number and price shown anywhere
 * in the marketplace. Never hardcode counts or prices in components — import
 * from here so the whole system stays consistent.
 */
export const BRAND_STATS = {
  softwareCount: "12,000+",
  softwareCountLabel: "12,000+ Software",
  categoryCount: "80+",
  categoryCountLabel: "80+ Categories",
  liveDemos: "12,000+ Live Demos",
  businesses: "50,000+",
  uptime: "99.99%",
  delivery: "120 min",
  support: "24/7",
  languages: "12",
} as const;

/** The one and only price in the entire system — flat lifetime license. */
export const LIFETIME_PRICE = {
  amount: 249,
  display: "$249",
  label: "$249 Lifetime",
  note: "One-time payment · Lifetime access · White-label included",
} as const;
