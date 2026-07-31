import {
  Activity,
  BadgeCheck,
  Banknote,
  Boxes,
  Building2,
  CircleDollarSign,
  Clock,
  LifeBuoy,
  ShoppingCart,
  Target,
  TrendingUp,
  UserCheck,
  Users,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface KpiTemplate {
  key: string;
  label: string;
  icon: LucideIcon;
  tone?: "brand" | "success" | "warning" | "danger" | "neutral";
  unit?: string;
}

export interface ModuleDefinition {
  /** API endpoint key: GET {API_BASE}/dashboards/{moduleKey} */
  moduleKey: string;
  kicker: string;
  title: string;
  description: string;
  kpis: KpiTemplate[];
  table: { title: string; columns: { key: string; header: string }[] };
}

/**
 * Every module inherits the SAME dashboard template — only this config
 * (KPIs, table columns, data endpoint) differs.
 */
export const MODULES: Record<string, ModuleDefinition> = {
  boss: {
    moduleKey: "boss",
    kicker: "Command",
    title: "Boss Panel",
    description: "Company-wide performance across every module, from live records.",
    kpis: [
      { key: "revenue", label: "Revenue", icon: CircleDollarSign, tone: "success" },
      { key: "orders", label: "Orders", icon: ShoppingCart },
      { key: "users", label: "Active Users", icon: Users },
      { key: "modules", label: "Live Modules", icon: Boxes, tone: "neutral" },
      { key: "alerts", label: "Open Alerts", icon: Activity, tone: "warning" },
      { key: "uptime", label: "Uptime", icon: BadgeCheck, unit: "%", tone: "success" },
    ],
    table: {
      title: "Recent Company Activity",
      columns: [
        { key: "created_at", header: "When" },
        { key: "module", header: "Module" },
        { key: "actor", header: "Actor" },
        { key: "action", header: "Action" },
        { key: "status", header: "Status" },
      ],
    },
  },
  "super-admin": {
    moduleKey: "super-admin",
    kicker: "Administration",
    title: "Super Admin",
    description: "Platform administration, roles and system health from live records.",
    kpis: [
      { key: "users", label: "Users", icon: Users },
      { key: "roles", label: "Roles", icon: UserCheck },
      { key: "sessions", label: "Active Sessions", icon: Activity },
      { key: "incidents", label: "Incidents", icon: Clock, tone: "warning" },
      { key: "modules", label: "Modules", icon: Boxes, tone: "neutral" },
      { key: "uptime", label: "Uptime", icon: BadgeCheck, unit: "%", tone: "success" },
    ],
    table: {
      title: "System Records",
      columns: [
        { key: "created_at", header: "When" },
        { key: "entity", header: "Entity" },
        { key: "action", header: "Action" },
        { key: "status", header: "Status" },
      ],
    },
  },
  ceo: {
    moduleKey: "ceo",
    kicker: "Executive",
    title: "CEO Dashboard",
    description: "Executive KPIs sourced directly from the company database.",
    kpis: [
      { key: "revenue", label: "Revenue", icon: CircleDollarSign, tone: "success" },
      { key: "growth", label: "Growth", icon: TrendingUp, unit: "%" },
      { key: "customers", label: "Customers", icon: Users },
      { key: "pipeline", label: "Pipeline", icon: Target },
      { key: "burn", label: "Burn", icon: Banknote, tone: "warning" },
      { key: "runway", label: "Runway", icon: Clock, tone: "neutral" },
    ],
    table: {
      title: "Executive Records",
      columns: [
        { key: "period", header: "Period" },
        { key: "metric", header: "Metric" },
        { key: "value", header: "Value" },
        { key: "change", header: "Change" },
      ],
    },
  },
  finance: {
    moduleKey: "finance",
    kicker: "Finance",
    title: "Finance Manager",
    description: "Invoices, payouts and balances from the finance database.",
    kpis: [
      { key: "revenue", label: "Revenue", icon: CircleDollarSign, tone: "success" },
      { key: "expenses", label: "Expenses", icon: Banknote, tone: "warning" },
      { key: "profit", label: "Profit", icon: TrendingUp, tone: "success" },
      { key: "receivables", label: "Receivables", icon: Wallet },
      { key: "payables", label: "Payables", icon: Wallet, tone: "danger" },
      { key: "invoices", label: "Invoices", icon: Boxes, tone: "neutral" },
    ],
    table: {
      title: "Transactions",
      columns: [
        { key: "created_at", header: "Date" },
        { key: "reference", header: "Reference" },
        { key: "party", header: "Party" },
        { key: "amount", header: "Amount" },
        { key: "status", header: "Status" },
      ],
    },
  },
  crm: {
    moduleKey: "crm",
    kicker: "Revenue",
    title: "CRM & Leads",
    description: "Leads, deals and conversion performance from live CRM records.",
    kpis: [
      { key: "leads", label: "Leads", icon: Target },
      { key: "qualified", label: "Qualified", icon: UserCheck, tone: "success" },
      { key: "deals", label: "Open Deals", icon: Boxes },
      { key: "won", label: "Won", icon: BadgeCheck, tone: "success" },
      { key: "conversion", label: "Conversion", icon: TrendingUp, unit: "%" },
      { key: "value", label: "Pipeline Value", icon: CircleDollarSign },
    ],
    table: {
      title: "Leads",
      columns: [
        { key: "created_at", header: "Created" },
        { key: "name", header: "Lead" },
        { key: "owner", header: "Owner" },
        { key: "stage", header: "Stage" },
        { key: "value", header: "Value" },
      ],
    },
  },
  support: {
    moduleKey: "support",
    kicker: "Service",
    title: "Support Manager",
    description: "Tickets, SLA and satisfaction from the support database.",
    kpis: [
      { key: "open", label: "Open Tickets", icon: LifeBuoy, tone: "warning" },
      { key: "resolved", label: "Resolved", icon: BadgeCheck, tone: "success" },
      { key: "first_response", label: "First Response", icon: Clock },
      { key: "sla", label: "SLA Met", icon: Target, unit: "%" },
      { key: "csat", label: "CSAT", icon: TrendingUp, unit: "%" },
      { key: "agents", label: "Agents Online", icon: Users, tone: "neutral" },
    ],
    table: {
      title: "Tickets",
      columns: [
        { key: "created_at", header: "Created" },
        { key: "reference", header: "Ticket" },
        { key: "customer", header: "Customer" },
        { key: "priority", header: "Priority" },
        { key: "status", header: "Status" },
      ],
    },
  },
  vendor: {
    moduleKey: "vendor",
    kicker: "Marketplace",
    title: "Vendor Manager",
    description: "Vendors, catalogue and settlements from live marketplace data.",
    kpis: [
      { key: "vendors", label: "Vendors", icon: Building2 },
      { key: "active", label: "Active", icon: BadgeCheck, tone: "success" },
      { key: "products", label: "Products", icon: Boxes },
      { key: "orders", label: "Orders", icon: ShoppingCart },
      { key: "gmv", label: "GMV", icon: CircleDollarSign, tone: "success" },
      { key: "payouts", label: "Pending Payouts", icon: Wallet, tone: "warning" },
    ],
    table: {
      title: "Vendors",
      columns: [
        { key: "name", header: "Vendor" },
        { key: "category", header: "Category" },
        { key: "orders", header: "Orders" },
        { key: "gmv", header: "GMV" },
        { key: "status", header: "Status" },
      ],
    },
  },
  franchise: {
    moduleKey: "franchise",
    kicker: "Network",
    title: "Franchise Manager",
    description: "Franchise network performance from live franchise records.",
    kpis: [
      { key: "franchises", label: "Franchises", icon: Building2 },
      { key: "active", label: "Active", icon: BadgeCheck, tone: "success" },
      { key: "revenue", label: "Revenue", icon: CircleDollarSign, tone: "success" },
      { key: "leads", label: "Leads", icon: Target },
      { key: "renewals", label: "Renewals Due", icon: Clock, tone: "warning" },
      { key: "territories", label: "Territories", icon: Boxes, tone: "neutral" },
    ],
    table: {
      title: "Franchises",
      columns: [
        { key: "name", header: "Franchise" },
        { key: "territory", header: "Territory" },
        { key: "revenue", header: "Revenue" },
        { key: "renewal_at", header: "Renewal" },
        { key: "status", header: "Status" },
      ],
    },
  },
};
