import {
  Activity,
  Bug,
  Code2,
  FileText,
  Handshake,
  Megaphone,
  Search,
  Server,
  Shield,
  Sparkles,
  ListChecks,
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
  marketing: {
    moduleKey: "marketing",
    kicker: "Growth",
    title: "Marketing Manager",
    description: "Campaigns, channels and spend from live marketing records.",
    kpis: [
      { key: "campaigns", label: "Campaigns", icon: Megaphone },
      { key: "impressions", label: "Impressions", icon: Activity },
      { key: "clicks", label: "Clicks", icon: Target },
      { key: "leads", label: "Leads", icon: Users, tone: "success" },
      { key: "spend", label: "Spend", icon: CircleDollarSign, tone: "warning" },
      { key: "roas", label: "ROAS", icon: TrendingUp },
    ],
    table: {
      title: "Campaigns",
      columns: [
        { key: "created_at", header: "Started" },
        { key: "name", header: "Campaign" },
        { key: "channel", header: "Channel" },
        { key: "spend", header: "Spend" },
        { key: "status", header: "Status" },
      ],
    },
  },
  reseller: {
    moduleKey: "reseller",
    kicker: "Partners",
    title: "Reseller Manager",
    description: "Reseller network, sales and commissions from live records.",
    kpis: [
      { key: "resellers", label: "Resellers", icon: Handshake },
      { key: "active", label: "Active", icon: BadgeCheck, tone: "success" },
      { key: "sales", label: "Sales", icon: ShoppingCart },
      { key: "revenue", label: "Revenue", icon: CircleDollarSign, tone: "success" },
      { key: "commission", label: "Commission Due", icon: Wallet, tone: "warning" },
      { key: "tiers", label: "Tiers", icon: Boxes, tone: "neutral" },
    ],
    table: {
      title: "Resellers",
      columns: [
        { key: "name", header: "Reseller" },
        { key: "tier", header: "Tier" },
        { key: "sales", header: "Sales" },
        { key: "commission", header: "Commission" },
        { key: "status", header: "Status" },
      ],
    },
  },
  hr: {
    moduleKey: "hr",
    kicker: "People",
    title: "HR Manager",
    description: "Headcount, attendance and hiring from live HR records.",
    kpis: [
      { key: "employees", label: "Employees", icon: Users },
      { key: "present", label: "Present Today", icon: UserCheck, tone: "success" },
      { key: "on_leave", label: "On Leave", icon: Clock, tone: "warning" },
      { key: "open_roles", label: "Open Roles", icon: Target },
      { key: "candidates", label: "Candidates", icon: Boxes },
      { key: "payroll", label: "Payroll", icon: Banknote },
    ],
    table: {
      title: "Employees",
      columns: [
        { key: "name", header: "Employee" },
        { key: "department", header: "Department" },
        { key: "role", header: "Role" },
        { key: "joined_at", header: "Joined" },
        { key: "status", header: "Status" },
      ],
    },
  },
  seo: {
    moduleKey: "seo",
    kicker: "Organic",
    title: "SEO Manager",
    description: "Rankings, traffic and technical health from live SEO data.",
    kpis: [
      { key: "keywords", label: "Keywords", icon: Search },
      { key: "top10", label: "Top 10", icon: BadgeCheck, tone: "success" },
      { key: "traffic", label: "Organic Traffic", icon: TrendingUp },
      { key: "backlinks", label: "Backlinks", icon: Activity },
      { key: "issues", label: "Issues", icon: Bug, tone: "warning" },
      { key: "score", label: "Health Score", icon: Target, unit: "%" },
    ],
    table: {
      title: "Tracked Pages",
      columns: [
        { key: "url", header: "Page" },
        { key: "keyword", header: "Keyword" },
        { key: "position", header: "Position" },
        { key: "traffic", header: "Traffic" },
        { key: "status", header: "Status" },
      ],
    },
  },
  legal: {
    moduleKey: "legal",
    kicker: "Compliance",
    title: "Legal & Compliance",
    description: "Contracts, disputes and compliance from live legal records.",
    kpis: [
      { key: "contracts", label: "Contracts", icon: FileText },
      { key: "pending", label: "Pending Review", icon: Clock, tone: "warning" },
      { key: "expiring", label: "Expiring", icon: Activity, tone: "danger" },
      { key: "disputes", label: "Disputes", icon: Shield, tone: "danger" },
      { key: "policies", label: "Policies", icon: Boxes, tone: "neutral" },
      { key: "compliance", label: "Compliance", icon: BadgeCheck, unit: "%", tone: "success" },
    ],
    table: {
      title: "Contracts",
      columns: [
        { key: "reference", header: "Reference" },
        { key: "party", header: "Party" },
        { key: "type", header: "Type" },
        { key: "expires_at", header: "Expires" },
        { key: "status", header: "Status" },
      ],
    },
  },
  task: {
    moduleKey: "task",
    kicker: "Delivery",
    title: "Task Manager",
    description: "Tasks, owners and delivery status from live project records.",
    kpis: [
      { key: "tasks", label: "Tasks", icon: ListChecks },
      { key: "in_progress", label: "In Progress", icon: Activity },
      { key: "completed", label: "Completed", icon: BadgeCheck, tone: "success" },
      { key: "overdue", label: "Overdue", icon: Clock, tone: "danger" },
      { key: "assignees", label: "Assignees", icon: Users, tone: "neutral" },
      { key: "on_time", label: "On Time", icon: Target, unit: "%" },
    ],
    table: {
      title: "Tasks",
      columns: [
        { key: "title", header: "Task" },
        { key: "assignee", header: "Assignee" },
        { key: "due_at", header: "Due" },
        { key: "priority", header: "Priority" },
        { key: "status", header: "Status" },
      ],
    },
  },
  influencer: {
    moduleKey: "influencer",
    kicker: "Creators",
    title: "Influencer Manager",
    description: "Creators, collaborations and payouts from live records.",
    kpis: [
      { key: "influencers", label: "Influencers", icon: Sparkles },
      { key: "active", label: "Active", icon: BadgeCheck, tone: "success" },
      { key: "campaigns", label: "Campaigns", icon: Megaphone },
      { key: "reach", label: "Reach", icon: Activity },
      { key: "conversions", label: "Conversions", icon: Target, tone: "success" },
      { key: "payouts", label: "Pending Payouts", icon: Wallet, tone: "warning" },
    ],
    table: {
      title: "Influencers",
      columns: [
        { key: "name", header: "Influencer" },
        { key: "platform", header: "Platform" },
        { key: "reach", header: "Reach" },
        { key: "conversions", header: "Conversions" },
        { key: "status", header: "Status" },
      ],
    },
  },
  developer: {
    moduleKey: "developer",
    kicker: "Engineering",
    title: "Developer Dashboard",
    description: "Builds, issues and deployment health from live engineering data.",
    kpis: [
      { key: "projects", label: "Projects", icon: Code2 },
      { key: "deployments", label: "Deployments", icon: Activity },
      { key: "open_bugs", label: "Open Bugs", icon: Bug, tone: "danger" },
      { key: "prs", label: "Open PRs", icon: Boxes },
      { key: "coverage", label: "Coverage", icon: Target, unit: "%" },
      { key: "uptime", label: "Uptime", icon: BadgeCheck, unit: "%", tone: "success" },
    ],
    table: {
      title: "Recent Builds",
      columns: [
        { key: "created_at", header: "When" },
        { key: "project", header: "Project" },
        { key: "branch", header: "Branch" },
        { key: "author", header: "Author" },
        { key: "status", header: "Status" },
      ],
    },
  },
  security: {
    moduleKey: "security",
    kicker: "Security",
    title: "Security Command",
    description: "Threats, access and audit signals from live security records.",
    kpis: [
      { key: "alerts", label: "Open Alerts", icon: Shield, tone: "danger" },
      { key: "blocked", label: "Blocked", icon: BadgeCheck, tone: "success" },
      { key: "sessions", label: "Active Sessions", icon: Activity },
      { key: "failed_logins", label: "Failed Logins", icon: Clock, tone: "warning" },
      { key: "policies", label: "Policies", icon: Boxes, tone: "neutral" },
      { key: "score", label: "Security Score", icon: Target, unit: "%" },
    ],
    table: {
      title: "Security Events",
      columns: [
        { key: "created_at", header: "When" },
        { key: "event", header: "Event" },
        { key: "actor", header: "Actor" },
        { key: "severity", header: "Severity" },
        { key: "status", header: "Status" },
      ],
    },
  },
  server: {
    moduleKey: "server",
    kicker: "Infrastructure",
    title: "Server Manager",
    description: "Servers, load and incidents from live infrastructure data.",
    kpis: [
      { key: "servers", label: "Servers", icon: Server },
      { key: "healthy", label: "Healthy", icon: BadgeCheck, tone: "success" },
      { key: "cpu", label: "Avg CPU", icon: Activity, unit: "%" },
      { key: "memory", label: "Avg Memory", icon: Boxes, unit: "%" },
      { key: "incidents", label: "Incidents", icon: Clock, tone: "warning" },
      { key: "uptime", label: "Uptime", icon: Target, unit: "%", tone: "success" },
    ],
    table: {
      title: "Servers",
      columns: [
        { key: "name", header: "Server" },
        { key: "region", header: "Region" },
        { key: "cpu", header: "CPU" },
        { key: "memory", header: "Memory" },
        { key: "status", header: "Status" },
      ],
    },
  },
};
