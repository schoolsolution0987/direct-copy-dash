import type { Page, Route } from "@playwright/test";
import { MODULES, type ModuleDefinition } from "../src/lib/enterprise-data/modules";

export { MODULES };
export type { ModuleDefinition };

export const MODULE_KEYS = Object.keys(MODULES);

const API_GLOB = "**/dashboards/**";

export interface ModulePayload {
  metrics: { key: string; label: string; value: number | string | null; unit?: string; delta?: number | null }[];
  rows: Record<string, unknown>[];
  series: Record<string, unknown>[];
}

/**
 * Builds a payload in exactly the shape the Prisma/PostgreSQL API service
 * returns for `GET /dashboards/:moduleKey`. Used only as a network stand-in
 * for the real service — the app itself never fabricates data.
 */
export function payloadFor(def: ModuleDefinition, rowCount = 3): ModulePayload {
  return {
    metrics: def.kpis.map((k, i) => ({
      key: k.key,
      label: k.label,
      value: 10 + i,
      unit: k.unit,
      delta: i % 2 === 0 ? 4.2 : -1.5,
    })),
    rows: Array.from({ length: rowCount }, (_, r) =>
      Object.fromEntries([
        ["id", `${def.moduleKey}-${r}`],
        ...def.table.columns.map((c) => [c.key, `${c.key}-${r}`]),
      ]),
    ),
    series: [],
  };
}

/** Serve a payload for the module dashboard endpoint. */
export async function mockModuleApi(page: Page, payload: ModulePayload) {
  await page.route(API_GLOB, (route: Route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      headers: corsHeaders(route),
      body: JSON.stringify(payload),
    }),
  );
}

/** Make the API service fail, to assert the dashboard degrades gracefully. */
export async function failModuleApi(page: Page, status = 500) {
  await page.route(API_GLOB, (route: Route) =>
    route.fulfill({
      status,
      contentType: "application/json",
      headers: corsHeaders(route),
      body: JSON.stringify({ error: "boom" }),
    }),
  );
}

function corsHeaders(route: Route) {
  const origin = new URL(route.request().frame().url()).origin;
  return {
    "access-control-allow-origin": origin,
    "access-control-allow-credentials": "true",
  };
}
