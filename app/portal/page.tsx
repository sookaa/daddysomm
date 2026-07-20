import { currentUser } from "@clerk/nextjs/server";
import { SignOutButton } from "@clerk/nextjs";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function PortalPage() {
  const user = await currentUser();
  if (!user) return null; // middleware redirects before this renders

  const db = supabaseAdmin();
  const { data: profile } = await db
    .from("users")
    .select("display_name, email, no_red, no_white, no_sparkling, investment_bottle_opt_out")
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

      <h2>your preferences</h2>
      {profile ? (
        <ul>
          <li>No red: {profile.no_red ? "yes" : "no"}</li>
          <li>No white: {profile.no_white ? "yes" : "no"}</li>
          <li>No sparkling: {profile.no_sparkling ? "yes" : "no"}</li>
          <li>
            Investment bottle:{" "}
            {profile.investment_bottle_opt_out
              ? "opted out (12th regular bottle instead)"
              : "included"}
          </li>
        </ul>
      ) : (
        <p>
          Your profile is still syncing. Refresh in a moment — if this
          persists, the Clerk webhook may not be configured.
        </p>
      )}

      <p style={{ marginTop: "2rem" }}>
        <SignOutButton>
          <button type="button">sign out</button>
        </SignOutButton>
      </p>
    </main>
  );
}
