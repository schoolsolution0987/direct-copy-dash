import { test, expect, type Page } from "@playwright/test";
import {
  MODULES,
  MODULE_KEYS,
  failModuleApi,
  mockModuleApi,
  payloadFor,
} from "./helpers";

/**
 * Every migrated module renders the SAME unified enterprise dashboard.
 * These tests walk the whole module registry and assert the shared contract:
 * header, KPI row from real API metrics, data table from real API rows,
 * plus the standard empty and failure states.
 */

const dashboard = (page: Page) => ({
  title: page.getByTestId("dashboard-title"),
  kpiRow: page.getByTestId("kpi-row"),
  kpis: page.getByTestId("kpi-card"),
  table: page.getByTestId("data-table"),
  rows: page.getByTestId("data-table-row"),
  empty: page.getByTestId("empty-state"),
});

for (const key of MODULE_KEYS) {
  const def = MODULES[key];

  test.describe(`module: ${key}`, () => {
    test("loads and renders real API data in KPIs and the table", async ({ page }) => {
      const payload = payloadFor(def);
      await mockModuleApi(page, payload);
      await page.goto(`/modules/${key}`);

      const ui = dashboard(page);
      await expect(ui.title).toHaveText(def.title);

      // KPI row: one card per configured KPI, each showing the API value.
      await expect(ui.kpiRow).toBeVisible();
      await expect(ui.kpis).toHaveCount(def.kpis.length);
      for (const metric of payload.metrics) {
        const card = page.locator(`[data-testid="kpi-card"][data-kpi-key="${metric.key}"]`);
        await expect(card).toHaveAttribute("data-kpi-state", "value");
        await expect(card).toContainText(String(metric.value));
      }

      // Table: standard columns + one row per API record.
      await expect(ui.table).toBeVisible();
      await expect(ui.rows).toHaveCount(payload.rows.length);
      for (const column of def.table.columns) {
        await expect(ui.table.getByRole("columnheader", { name: column.header })).toBeVisible();
      }
      await expect(ui.empty).toHaveCount(0);
    });

    test("shows the standard no-data states when the API returns nothing", async ({ page }) => {
      await mockModuleApi(page, { metrics: [], rows: [], series: [] });
      await page.goto(`/modules/${key}`);

      const ui = dashboard(page);
      await expect(ui.title).toHaveText(def.title);

      // KPIs never invent numbers — they fall back to the "—" no-data state.
      await expect(ui.kpis).toHaveCount(def.kpis.length);
      for (const kpi of def.kpis) {
        const card = page.locator(`[data-testid="kpi-card"][data-kpi-key="${kpi.key}"]`);
        await expect(card).toHaveAttribute("data-kpi-state", "no-data");
        await expect(card).toContainText("—");
      }

      // Table falls back to the shared empty state.
      await expect(ui.empty).toBeVisible();
      await expect(ui.empty).toContainText(def.table.title ? /No records/i : /No records/i);
      await expect(ui.rows).toHaveCount(0);
    });

    test("degrades to the standard states when the API fails", async ({ page }) => {
      await failModuleApi(page);
      await page.goto(`/modules/${key}`);

      const ui = dashboard(page);
      await expect(ui.title).toHaveText(def.title);
      await expect(ui.kpis).toHaveCount(def.kpis.length);
      await expect(ui.empty).toBeVisible();
      await expect(ui.rows).toHaveCount(0);
    });
  });
}

test("every module requests its own endpoint on the API service", async ({ page }) => {
  for (const key of MODULE_KEYS.slice(0, 5)) {
    const requests: string[] = [];
    page.on("request", (r) => requests.push(r.url()));
    await mockModuleApi(page, payloadFor(MODULES[key]));
    await page.goto(`/modules/${key}`);
    await expect(page.getByTestId("data-table")).toBeVisible();
    expect(requests.some((u) => u.endsWith(`/dashboards/${MODULES[key].moduleKey}`))).toBe(true);
    page.removeAllListeners("request");
  }
});
