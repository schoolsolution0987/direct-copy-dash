import { test, expect } from "@playwright/test";
import { MODULES, MODULE_KEYS, mockModuleApi, payloadFor } from "./helpers";

/**
 * The migrated module pages as users actually reach them in the app.
 * Each URL must render the same unified dashboard as `/modules/<key>`.
 */
export const MODULE_PAGES: { path: string; moduleKey: string }[] = [
  { path: "/marketing", moduleKey: "marketing" },
  { path: "/seo", moduleKey: "seo" },
  { path: "/hr", moduleKey: "hr" },
  { path: "/legal", moduleKey: "legal" },
  { path: "/lead-manager", moduleKey: "crm" },
  { path: "/reseller", moduleKey: "reseller" },
  { path: "/task-manager", moduleKey: "task" },
  { path: "/server-manager", moduleKey: "server" },
  { path: "/security-command", moduleKey: "security" },
  { path: "/api-integrations", moduleKey: "api" },
  { path: "/promise-management", moduleKey: "promise" },
  { path: "/school-software/dashboard", moduleKey: "school" },
  { path: "/franchise-dashboard", moduleKey: "franchise" },
  { path: "/super-admin/finance-center", moduleKey: "finance" },
  { path: "/super-admin/support-center", moduleKey: "support" },
  { path: "/super-admin/influencer-manager", moduleKey: "influencer" },
  { path: "/super-admin-system/role-switch?role=ceo", moduleKey: "ceo" },
  { path: "/super-admin-system/role-switch?role=continent_super_admin", moduleKey: "continent-admin" },
  { path: "/super-admin-system/role-switch?role=vala_ai_management", moduleKey: "vala-ai" },
  { path: "/super-admin-system/role-switch?role=sales_support_manager", moduleKey: "sales-support" },
];

for (const { path, moduleKey } of MODULE_PAGES) {
  test(`page ${path} renders the unified ${moduleKey} dashboard`, async ({ page }) => {
    test.slow(); // legacy page shells lazy-load a large module bundle
    const def = MODULES[moduleKey];
    const payload = payloadFor(def);
    await mockModuleApi(page, payload);
    await page.goto(path);
    await expect(page.getByTestId("dashboard-title")).toBeVisible({ timeout: 45_000 });

    await expect(page.getByTestId("dashboard-title")).toHaveText(def.title);
    await expect(page.getByTestId("kpi-card")).toHaveCount(def.kpis.length);
    await expect(page.getByTestId("data-table")).toBeVisible();
    await expect(page.getByTestId("data-table-row")).toHaveCount(payload.rows.length);
  });
}

/**
 * Coverage guard: every registry module must be reachable by `/modules/<key>`
 * (covered in module-dashboards.spec.ts) and every page mapping above must
 * point at a real registry entry. Adding a module without wiring it up fails here.
 */
test("module registry and page map stay in sync", () => {
  for (const { moduleKey } of MODULE_PAGES) {
    expect(MODULE_KEYS, `unknown module key "${moduleKey}" in MODULE_PAGES`).toContain(moduleKey);
  }
  for (const key of MODULE_KEYS) {
    const def = MODULES[key];
    expect(def.moduleKey, `module "${key}" must declare its API key`).toBe(key);
    expect(def.title.length).toBeGreaterThan(0);
    expect(def.kpis.length).toBeGreaterThan(0);
    expect(def.table.columns.length).toBeGreaterThan(0);
  }
});
