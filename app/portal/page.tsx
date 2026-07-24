import { currentUser } from "@clerk/nextjs/server";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase";
import PreferencesForm from "./PreferencesForm";

export const dynamic = "force-dynamic";

export default async function PortalPage() {
  const user = await currentUser();
  if (!user) return null; // middleware redirects before this renders

  const db = supabaseAdmin();
  const { data: profile } = await db
    .from("users")
    .select("display_name, email, defer_curation, wine_lean, no_sparkling, investment_bottle")
    .eq("clerk_user_id", user.id)
    .single();

  const name =
    profile?.display_name ||
    user.firstName ||
    profile?.email ||
    "member";

  return (
    <main style={{ maxWidth: "42rem", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <h1>the cellar</h1>
      <p>Welcome back, {name}.</p>

      <p style={{ margin: "2rem 0" }}>
        <Link
          href="/drop"
          style={{
            display: "inline-block",
            background: "var(--link)",
            color: "#fff",
            fontFamily: "Verdana, sans-serif",
            fontSize: "15px",
            fontWeight: "bold",
            padding: "12px 32px",
            borderRadius: "6px",
            textDecoration: "none",
          }}
        >
          View the current drop
        </Link>
      </p>

      <h2 style={{ marginBottom: "1.5rem" }}>your case preferences</h2>
      {profile ? (
        <PreferencesForm
          deferCuration={profile.defer_curation ?? false}
          wineLean={profile.wine_lean ?? "none"}
          noSparkling={profile.no_sparkling ?? false}
          investmentBottle={profile.investment_bottle ?? false}
        />
      ) : (
        <p>
          Your profile is still syncing. Refresh in a moment — if this
          persists, the Clerk webhook may not be configured.
        </p>
      )}

      <p style={{ marginTop: "2.5rem" }}>
        <SignOutButton>
          <button type="button">sign out</button>
        </SignOutButton>
      </p>
    </main>
  );
}