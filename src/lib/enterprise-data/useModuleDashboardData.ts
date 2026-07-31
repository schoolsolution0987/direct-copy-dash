import { useQuery } from "@tanstack/react-query";
import { apiGet, apiConfigured, ApiNotConfiguredError } from "./api";

/** Shape returned by the module dashboard endpoints of the API service. */
export interface ModuleMetric {
  key: string;
  label: string;
  value: number | string | null;
  unit?: string;
  delta?: number | null;
}

export interface ModuleDashboardData {
  metrics: ModuleMetric[];
  rows: Record<string, any>[];
  series: Record<string, any>[];
}

const EMPTY: ModuleDashboardData = { metrics: [], rows: [], series: [] };

/**
 * Loads one module's dashboard payload from the existing API service.
 * Returns empty (never fabricated) data when the API is unavailable.
 */
export function useModuleDashboardData(moduleKey: string) {
  const query = useQuery<ModuleDashboardData>({
    queryKey: ["module-dashboard", moduleKey],
    enabled: apiConfigured,
    retry: false,
    queryFn: async ({ signal }) => {
      const data = await apiGet<Partial<ModuleDashboardData>>(
        `/dashboards/${moduleKey}`,
        signal,
      );
      return {
        metrics: data.metrics ?? [],
        rows: data.rows ?? [],
        series: data.series ?? [],
      };
    },
  });

  return {
    data: query.data ?? EMPTY,
    loading: apiConfigured && query.isLoading,
    error: apiConfigured
      ? (query.error as Error | null)
      : new ApiNotConfiguredError(),
    configured: apiConfigured,
    refetch: query.refetch,
  };
}

/** Maps API metrics onto the shared KPI card contract, preserving order. */
export function toKpiItems(
  metrics: ModuleMetric[],
  template: { key: string; label: string; icon?: any; tone?: any; unit?: string }[],
) {
  return template.map((t) => {
    const m = metrics.find((x) => x.key === t.key);
    return {
      key: t.key,
      label: t.label,
      icon: t.icon,
      tone: t.tone,
      unit: m?.unit ?? t.unit,
      value: m?.value ?? null,
      delta: m?.delta ?? null,
    };
  });
}
