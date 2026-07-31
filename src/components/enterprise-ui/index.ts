/**
 * SINGLE ENTERPRISE COMPONENT LIBRARY
 * ------------------------------------------------------------------
 * Every dashboard / workspace / module in this app MUST be built from
 * these components. Never create module-specific dashboard styling.
 *
 * Layout, header, sidebar, cards, KPI style, tables, toolbar, buttons,
 * typography, colours, radius, shadows, animation, loading + empty
 * states all live here. Only DATA changes per module.
 */

export { DashboardPage } from "./DashboardPage";
export { ModuleDashboard } from "./ModuleDashboard";
export type { ModuleDashboardConfig } from "./ModuleDashboard";
export { DashboardHeader } from "./DashboardHeader";
export { KpiCard, KpiRow } from "./Kpi";
export { SectionCard } from "./SectionCard";
export { ChartCard } from "./ChartCard";
export { DataTable } from "./DataTable";
export { Toolbar } from "./Toolbar";
export { QuickActionBar } from "./QuickActionBar";
export { EmptyState } from "./EmptyState";
export { LoadingState } from "./LoadingState";

export type { KpiItem } from "./Kpi";
export type { DataTableColumn } from "./DataTable";
export type { QuickAction } from "./QuickActionBar";
