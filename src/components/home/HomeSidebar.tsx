import { useMemo, useState } from "react";
import { ChevronDown, PanelLeftClose, PanelLeftOpen, Search, LayoutGrid, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { MODULE_CATALOG, searchModules, type ModuleEntry } from "@/lib/module-catalog";
import { SCANNED_MODULES } from "@/lib/module-scan";
import { ROLES, ROLE_ORDER, type RoleKey } from "@/lib/roles";
import roundLogoAsset from "@/assets/softwarevala-logo-official.jpg.asset.json";

/** Every module in the ecosystem: curated catalog + auto-scanned routes. */
export const ALL_MODULES: ModuleEntry[] = [...MODULE_CATALOG, ...SCANNED_MODULES];

const GROUP_ORDER: string[] = Array.from(new Set(ALL_MODULES.map((m) => m.group)));

type Props = {
  onPickRole: (r: RoleKey) => void;
  loginUrl: string;
};

export function HomeSidebar({ onPickRole, loginUrl }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<Record<string, boolean>>({ [GROUP_ORDER[0]]: true });

  const filtered = useMemo(() => searchModules(ALL_MODULES, query), [query]);
  const grouped = useMemo(() => {
    const map = new Map<string, ModuleEntry[]>();
    for (const m of filtered) {
      const arr = map.get(m.group) ?? [];
      arr.push(m);
      map.set(m.group, arr);
    }
    return GROUP_ORDER.filter((g) => map.has(g)).map((g) => [g, map.get(g)!] as const);
  }, [filtered]);

  const searching = query.trim().length > 0;

  return (
    <aside
      className={cn(
        "flex h-screen shrink-0 flex-col border-r border-border bg-card transition-all duration-200",
        collapsed ? "w-[62px]" : "w-[268px]",
      )}
    >
      <div className="flex items-center gap-2 border-b border-border px-3 py-3">
        <img src={roundLogoAsset.url} alt="Software Vala" className="h-8 w-8 shrink-0 rounded-full ring-2 ring-white/15" />
        {!collapsed && (
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold">Software Vala</div>
            <div className="text-[10px] text-muted-foreground">{ALL_MODULES.length} modules</div>
          </div>
        )}
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          className="rounded-md p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </button>
      </div>

      {!collapsed && (
        <div className="border-b border-border p-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search all modules…"
              className="w-full rounded-lg border border-border bg-background py-2 pl-8 pr-2 text-xs outline-none focus:border-primary"
            />
          </div>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto px-2 py-2">
        {!collapsed && (
          <>
            <SectionLabel>Dev preview · pick a role</SectionLabel>
            <div className="mb-3 space-y-0.5">
              {ROLE_ORDER.map((k) => (
                <button
                  key={k}
                  onClick={() => onPickRole(k)}
                  title={ROLES[k].title}
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[12px] font-medium text-foreground/90 transition hover:bg-muted"
                >
                  <LogIn className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  <span className="truncate">{ROLES[k].name}</span>
                </button>
              ))}
            </div>

            <SectionLabel>Workspaces</SectionLabel>
            <a
              href="/module-switch"
              className="mb-3 flex w-full items-center gap-2 rounded-lg border border-border bg-surface px-2 py-1.5 text-[12px] font-semibold transition hover:bg-muted"
            >
              <LayoutGrid className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              Module Switch Dashboard
            </a>

            <a
              href={loginUrl}
              className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-brand px-2 py-2 text-[12px] font-semibold text-brand-foreground shadow-glow"
            >
              Go to login
            </a>
          </>
        )}

        {grouped.map(([group, items]) => {
          const isOpen = searching || open[group];
          return (
            <div key={group} className="mb-1">
              {!collapsed && (
                <button
                  type="button"
                  onClick={() => setOpen((s) => ({ ...s, [group]: !s[group] }))}
                  className="flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground transition hover:text-foreground"
                >
                  <span className="truncate">{group}</span>
                  <span className="flex items-center gap-1">
                    <span className="text-[10px] tabular-nums">{items.length}</span>
                    <ChevronDown className={cn("h-3 w-3 transition-transform", isOpen && "rotate-180")} />
                  </span>
                </button>
              )}
              {(isOpen || collapsed) && (
                <div className="space-y-0.5">
                  {items.map((m) => {
                    const Icon = m.icon;
                    return (
                      <a
                        key={m.id}
                        href={m.path}
                        title={m.label}
                        className={cn(
                          "flex items-center gap-2 rounded-lg px-2 py-1.5 text-[12px] text-foreground/85 transition hover:bg-muted hover:text-foreground",
                          collapsed && "justify-center px-0",
                        )}
                      >
                        <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                        {!collapsed && <span className="truncate">{m.label}</span>}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {!collapsed && grouped.length === 0 && (
          <p className="px-2 py-6 text-center text-[11px] text-muted-foreground">No modules match “{query}”.</p>
        )}
      </nav>
    </aside>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-2 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
      {children}
    </div>
  );
}
