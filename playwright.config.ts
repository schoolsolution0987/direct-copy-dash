import { defineConfig, devices } from "@playwright/test";

const PORT = 5199;
/** Fake API origin — every request to it is intercepted by the tests. */
export const E2E_API_BASE_URL = "http://api.e2e.test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  expect: { timeout: 15_000 },
  fullyParallel: true,
  workers: process.env.CI ? 2 : 4,
  reporter: [["list"]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "retain-on-failure",
    viewport: { width: 1280, height: 1800 },
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"], launchOptions: { executablePath: process.env.E2E_CHROMIUM ?? "/opt/ms-playwright/chromium-1194/chrome-linux/chrome" } } }],
  webServer: {
    command: `vite dev --port ${PORT} --strictPort`,
    port: PORT,
    reuseExistingServer: false,
    timeout: 180_000,
    env: { VITE_API_BASE_URL: E2E_API_BASE_URL },
  },
});
