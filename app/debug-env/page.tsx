import { currentUser } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function DebugEnv() {
  const url = process.env.SUPABASE_URL || "(unset)";
  // Show only the project ref (subdomain), never the full URL or any key
  const host = url.replace(/^https?:\/\//, "").split(".")[0];

  const user = await currentUser();
  let rowFound = "no user";
  let clerkId = "(none)";
  let queryError = "";

  if (user) {
    clerkId = user.id;
    try {
      const db = supabaseAdmin();
      const { data, error } = await db
        .from("users")
        .select("email, wine_lean, onboarded")
        .eq("clerk_user_id", user.id)
        .maybeSingle();
      if (error) queryError = error.message;
      rowFound = data ? `FOUND: ${data.email}, lean=${data.wine_lean}, onboarded=${data.onboarded}` : "NO ROW";
    } catch (e: any) {
      queryError = e?.message || String(e);
    }
  }

  return (
    <main style={{ fontFamily: "monospace", padding: "2rem", fontSize: "14px", lineHeight: 1.8 }}>
      <h1>env diagnostic</h1>
      <div>supabase project ref: <strong>{host}</strong></div>
      <div>clerk id seen: <strong>{clerkId}</strong></div>
      <div>row lookup: <strong>{rowFound}</strong></div>
      {queryError && <div style={{ color: "crimson" }}>query error: {queryError}</div>}
    </main>
  );
}
