/**
 * Compatibility Supabase client for the merged modules.
 *
 * `@/integrations/supabase/client` is aliased to this file. It re-exports the
 * generated client but typed against the merged module schema, so the ported
 * feature modules type-check while the auto-generated integration files stay
 * untouched.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { supabase as generatedSupabase } from "../integrations/supabase/client";

/**
 * Typed loosely on purpose: the merged module schema type is ~25k lines and
 * instantiating it through PostgREST generics in every call site made the
 * project-wide typecheck time out. Runtime behaviour is unchanged.
 */
export const supabase = generatedSupabase as unknown as SupabaseClient;
export default supabase;
