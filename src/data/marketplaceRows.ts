import type { Demo } from "@/data/extraDemos";

/** Netflix-style rows must always be dense — minimum cards per category row. */
export const MIN_PER_ROW = 40;

/**
 * Related sub-category editions used to expand a master category row so every
 * row carries at least MIN_PER_ROW related products. Editions are derived from
 * the row's own sub-categories, so cards always stay topically related.
 */
const EDITIONS: { suffix: string; desc: string }[] = [
  { suffix: "Pro", desc: "Full-feature edition with advanced reporting and automation." },
  { suffix: "Cloud", desc: "Managed cloud edition with auto-scaling and daily backups." },
  { suffix: "Enterprise", desc: "Multi-entity edition with SSO, audit trail and custom SLAs." },
  { suffix: "Mobile App", desc: "Android + iOS companion app with offline sync." },
  { suffix: "Analytics", desc: "Dashboards, KPIs and forecasting on top of your live data." },
  { suffix: "AI Assistant", desc: "Built-in AI copilot for search, drafting and daily insights." },
  { suffix: "Billing Suite", desc: "Invoicing, taxes, reminders and online payment collection." },
  { suffix: "Multi-Branch", desc: "Central HQ control over unlimited branches and teams." },
  { suffix: "Customer Portal", desc: "Self-service portal for your customers with live status." },
  { suffix: "Inventory Add-on", desc: "Stock, purchase orders, vendors and low-stock alerts." },
  { suffix: "White-Label Edition", desc: "Your brand, your domain — zero Software Vala branding." },
  { suffix: "SaaS Edition", desc: "Multi-tenant with plans, subscriptions and tenant admin." },
  { suffix: "POS Edition", desc: "Counter billing, barcode, printers and shift cash-up." },
  { suffix: "WhatsApp Automation", desc: "Automated WhatsApp alerts, reminders and campaigns." },
  { suffix: "Compliance Pack", desc: "GST/VAT, statutory reports and document retention." },
  { suffix: "Integration Hub", desc: "REST APIs, webhooks and 40+ ready connectors." },
  { suffix: "Team Edition", desc: "Roles, approvals, tasks and internal chat for your staff." },
  { suffix: "Growth Edition", desc: "Lead capture, funnels, offers and loyalty built in." },
  { suffix: "Support Desk", desc: "Ticketing, SLA timers and knowledge base for your users." },
  { suffix: "Automation Studio", desc: "No-code workflow builder for approvals and reminders." },
];

export type MarketplaceRow = { master: string; items: Demo[] };

/** Deterministic expansion — identical output on server and client. */
export function buildMarketplaceRows(demos: Demo[], masters: string[]): MarketplaceRow[] {
  return masters
    .map((master) => {
      const base = demos.filter((d) => d.masterCategory === master);
      if (base.length === 0) return { master, items: [] };

      const items: Demo[] = [...base];
      let round = 0;
      while (items.length < MIN_PER_ROW) {
        for (let i = 0; i < base.length && items.length < MIN_PER_ROW; i++) {
          const src = base[i]!;
          const edition = EDITIONS[(round * base.length + i) % EDITIONS.length]!;
          items.push({
            ...src,
            id: `${src.id}-e${round}-${i}`,
            name: `${src.category} ${edition.suffix}`,
            description: `${edition.desc}`,
            status: "COMING_SOON",
          });
        }
        round++;
        if (round > EDITIONS.length + 2) break;
      }
      return { master, items };
    })
    .filter((r) => r.items.length > 0);
}
