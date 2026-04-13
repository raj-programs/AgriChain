import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables");
}

// Shared client for stateless operations (e.g. auth.getUser token verification)
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Client authenticated as a specific user — for RLS-protected DB operations
export function createAuthClient(accessToken) {
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
  });
}

// Fresh anonymous client — for auth operations that set session state (login, signUp)
// Avoids session race conditions on the shared instance
export function createFreshClient() {
  return createClient(supabaseUrl, supabaseAnonKey);
}

export default supabase;
