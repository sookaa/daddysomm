import { createClient } from "@supabase/supabase-js";

// Server-only client using the service role key. Never import this in a
// client component. RLS is enabled with no policies, so this key is the
// only way in — all reads/writes flow through Next.js server code.
export function supabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set");
  }
  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
