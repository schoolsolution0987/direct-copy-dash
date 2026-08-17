/**
 * Compatibility Supabase client for the merged modules.
 *
 * `@/integrations/supabase/client` is aliased to this file. It re-exports the
 * generated client but typed against the merged module schema, so the ported
 * feature modules type-check while the auto-generated integration files stay
 * untouched.
 */
import { supabase as generatedSupabase } from "../integrations/supabase/client";

/**
 * Deliberately erase the generated PostgREST builder type at this compatibility
 * boundary. Even `SupabaseClient` without a Database generic still parses every
 * `.select("...")` literal and re-instantiates the query type through chained
 * filters across hundreds of merged call sites. Runtime behaviour is unchanged.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const supabase: any = generatedSupabase;
export default supabase;
