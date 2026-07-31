/**
 * Enterprise dashboard data layer.
 *
 * Real data only. Every dashboard reads its KPIs / tables / charts through
 * this module, which talks to the existing Prisma/PostgreSQL API service.
 * No mock data, no random values, no hardcoded counters.
 *
 * Configure the API service base URL with `VITE_API_BASE_URL`
 * (e.g. https://api.yourcompany.com). When it is not configured or the
 * service returns nothing, hooks return empty results so the UI renders
 * `—` / `0` / a professional empty state.
 */

export const API_BASE_URL: string =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, "") ?? "";

export const apiConfigured = API_BASE_URL.length > 0;

export class ApiNotConfiguredError extends Error {
  constructor() {
    super("API service is not configured (VITE_API_BASE_URL missing).");
    this.name = "ApiNotConfiguredError";
  }
}

export async function apiGet<T>(path: string, signal?: AbortSignal): Promise<T> {
  if (!apiConfigured) throw new ApiNotConfiguredError();
  const res = await fetch(`${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`, {
    method: "GET",
    credentials: "include",
    headers: { Accept: "application/json" },
    signal,
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`);
  return (await res.json()) as T;
}
