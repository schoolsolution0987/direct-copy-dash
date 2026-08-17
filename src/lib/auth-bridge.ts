import type { RoleKey } from "@/lib/roles";
import { isRoleKey } from "@/lib/roles";
import { isRoleKey as isDbRole, type RoleKey as DbRoleKey } from "@/lib/auth-roles";
import { supabase } from "@/integrations/supabase/client";
import { readSession } from "@/lib/nexus-auth";

/**
 * Real auth bridge — Supabase session + `user_roles` table.
 *
 * Route guards call `getAuthenticatedRole()`. It returns:
 *   - a dashboard RoleKey when the user is signed in
 *   - null when there is no Supabase session (guards redirect to /login)
 */

export const EXISTING_LOGIN_URL = "/login";

/** Maps database `app_role` values onto the dashboard workspaces we ship. */
const DB_TO_DASHBOARD: Record<DbRoleKey, RoleKey> = {
  founder: "admin",
  boss: "admin",
  admin: "admin",
  franchise: "franchise",
  vendor: "vendor",
  reseller: "reseller",
  developer: "developer",
  finance: "admin",
  sales: "reseller",
  marketing: "seo",
  support: "admin",
  employee: "author",
  author: "author",
  seo: "seo",
  influencer: "influencer",
  affiliate: "affiliate",
  customer: "author",
  "marketplace-user": "author",
};

// Priority: admin (boss) beats all specific roles.
const ROLE_PRIORITY: DbRoleKey[] = [
  "founder", "boss", "admin",
  "franchise", "vendor", "reseller",
  "developer", "finance", "sales", "marketing", "support", "employee",
  "author", "seo", "influencer", "affiliate",
  "customer", "marketplace-user",
];

const OVERRIDE_KEY = "sv_active_role";

function readOverride(): RoleKey | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(OVERRIDE_KEY);
  return isRoleKey(stored) ? stored : null;
}

export async function getAuthenticatedRole(): Promise<RoleKey | null> {
  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;
  if (!user) {
    // Session created by the Nexus OS login page (demo directory).
    const demo = readSession();
    if (!demo) return null;
    return readOverride() ?? (isDbRole(demo.role) ? DB_TO_DASHBOARD[demo.role] : "author");
  }


  // Prefer the role selected on the login page for this session.
  const override = readOverride();

  const { data: rows } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id);

  const dbRoles = new Set((rows ?? []).map((r) => String(r.role)));
  const dashboardRoles = new Set(
    [...dbRoles].filter(isDbRole).map((r) => DB_TO_DASHBOARD[r]),
  );

  // Honour override only if the user actually holds that workspace, or if
  // they're admin (admins can preview any workspace).
  if (override && (dashboardRoles.has(override) || dbRoles.has("admin"))) {
    return override;
  }

  for (const r of ROLE_PRIORITY) {
    if (dbRoles.has(r)) return DB_TO_DASHBOARD[r];
  }

  // Signed in but no role row yet — treat as author (baseline workspace).
  return override ?? "author";
}

export async function signOut(): Promise<void> {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(OVERRIDE_KEY);
  }
  await supabase.auth.signOut();
}

/** Persist the role the user chose on the login page (used post-signin). */
export function devSetRole(role: RoleKey) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(OVERRIDE_KEY, role);
  }
}
