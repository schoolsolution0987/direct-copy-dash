import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModuleDashboard } from "@/components/enterprise-ui/ModuleDashboard";
import { DataTable } from "@/components/enterprise-ui/DataTable";
import { EmptyState } from "@/components/enterprise-ui/EmptyState";
import { useModuleDashboardData, toKpiItems } from "@/lib/enterprise-data/useModuleDashboardData";
import { MODULES } from "@/lib/enterprise-data/modules";

/**
 * The one dashboard every module renders.
 * Pass a module key from `MODULES` — layout, header, sidebar, KPI style,
 * table, toolbar, loading and empty states are identical everywhere.
 */
export function EnterpriseModuleDashboard({
  moduleKey,
  bare,
}: {
  moduleKey: keyof typeof MODULES | string;
  bare?: boolean;
}) {
  const def = MODULES[moduleKey as string];
  const { data, loading, configured, refetch } = useModuleDashboardData(
    def?.moduleKey ?? String(moduleKey),
  );

  if (!def) {
    return (
      <ModuleDashboard title="Module" bare={bare}>
        <EmptyState
          title="Module not configured"
          description="Add this module to MODULES in src/lib/enterprise-data/modules.ts."
        />
      </ModuleDashboard>
    );
  }

  return (
    <ModuleDashboard
      kicker={def.kicker}
      title={def.title}
      description={def.description}
      loading={loading}
      kpis={toKpiItems(data.metrics, def.kpis)}
      bare={bare}
      headerActions={
        <Button size="sm" variant="outline" onClick={() => refetch()} className="rounded-xl">
          <RefreshCw className="mr-1.5 h-4 w-4" />
          Refresh
        </Button>
      }
    >
      <DataTable
        title={def.table.title}
        columns={def.table.columns}
        rows={data.rows}
        loading={loading}
        emptyTitle="No records"
        emptyDescription={
          configured
            ? "No records returned by the API service for this module yet."
            : "Connect the API service (VITE_API_BASE_URL) to load real records."
        }
      />
    </ModuleDashboard>
  );
}
