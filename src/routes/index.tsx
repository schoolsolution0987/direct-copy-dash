import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getAuthenticatedRole, devSetRole, EXISTING_LOGIN_URL } from "@/lib/auth-bridge";
import type { RoleKey } from "@/lib/roles";
import { HomeSidebar, ALL_MODULES } from "@/components/home/HomeSidebar";

import roundLogoAsset from "@/assets/softwarevala-logo-official.jpg.asset.json";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/")({
  // SSR-disabled so we can read the existing client-side auth without leaking.
  ssr: false,
  head: () => ({
    meta: [
      { title: "Software Vala — Module Home" },
      {
        name: "description",
        content:
          "Software Vala home: every workspace module in one sidebar — control panels, managers, portals, AMS recognition and vaults.",
      },
      { property: "og:title", content: "Software Vala — Module Home" },
      {
        property: "og:description",
        content: "Launch any Software Vala workspace from a single sidebar with search across every module.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: RoleBridge,
});

function RoleBridge() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"detecting" | "no-role">("detecting");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const role = await getAuthenticatedRole();
      if (cancelled) return;
      if (role) {
        navigate({ to: "/dashboard/$role", params: { role }, replace: true });
      } else {
        setStatus("no-role");
      }
    })();
    return () => { cancelled = true; };
  }, [navigate]);

  if (status === "detecting") {
    return (
      <div className="min-h-screen grid place-items-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-4">
          <img src={roundLogoAsset.url} alt="Software Vala" className="h-14 w-14 rounded-full ring-2 ring-white/15 shadow-glow" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Detecting your role…
          </div>
        </div>
      </div>
    );
  }

  return (
    <NotSignedIn
      onPick={(r) => {
        devSetRole(r);
        navigate({ to: "/dashboard/$role", params: { role: r }, replace: true });
      }}
    />
  );
}

function NotSignedIn({ onPick }: { onPick: (r: RoleKey) => void }) {
  const groups = Array.from(new Set(ALL_MODULES.map((m) => m.group)));

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <HomeSidebar onPickRole={onPick} loginUrl={EXISTING_LOGIN_URL} />

      <main className="flex-1 overflow-y-auto p-8">
        <h1 className="text-2xl font-semibold tracking-tight">Software Vala workspace</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Not signed in yet. Every module of the ecosystem is listed in the sidebar — search it, pick a role to
          preview a dashboard, or sign in through your existing auth system.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3 max-w-2xl">
          <Stat label="Modules" value={String(ALL_MODULES.length)} />
          <Stat label="Groups" value={String(groups.length)} />
          <Stat label="Session" value="Guest" />
        </div>

        <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl">
          {groups.map((g) => (
            <div key={g} className="rounded-xl border border-border bg-card p-4">
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{g}</div>
              <div className="mt-1 text-sm font-semibold">
                {ALL_MODULES.filter((m) => m.group === g).length} modules
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-card">
      <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
      <div className="mt-1 text-xl font-semibold">{value}</div>
    </div>
  );
}
