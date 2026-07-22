import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";
import { saveOptIns } from "./actions";

export const dynamic = "force-dynamic";

export default async function WelcomePage() {
  const user = await currentUser();
  if (!user) return null;

  const db = supabaseAdmin();
  const { data: profile } = await db
    .from("users")
    .select("onboarded")
    .eq("clerk_user_id", user.id)
    .single();

  if (profile?.onboarded) redirect("/portal");

  const firstName = user.firstName || "there";

  return (
    <main style={{ maxWidth: "34rem", margin: "0 auto", padding: "4rem 1.5rem" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "0.5rem" }}>
        Welcome, {firstName}.
      </h1>
      <p style={{ color: "var(--muted)", marginBottom: "2.5rem" }}>
        One quick step. Choose what you'd like to hear about. You can change
        these anytime from your account.
      </p>

      <form action={saveOptIns}>
        <label
          style={{
            display: "flex",
            gap: "0.75rem",
            alignItems: "flex-start",
            marginBottom: "1.5rem",
            cursor: "pointer",
          }}
        >
          <input type="checkbox" name="newsletter" style={{ marginTop: "0.25rem" }} />
          <span>
            <strong>The Newsletter</strong>
            <br />
            <span style={{ color: "var(--muted)", fontSize: "13px" }}>
              Notes on and about wine. No scores, no gatekeeping.
            </span>
          </span>
        </label>

        <label
          style={{
            display: "flex",
            gap: "0.75rem",
            alignItems: "flex-start",
            marginBottom: "2.5rem",
            cursor: "pointer",
          }}
        >
          <input type="checkbox" name="wine_drops" style={{ marginTop: "0.25rem" }} />
          <span>
            <strong>Wine Case Drops</strong>
            <br />
            <span style={{ color: "var(--muted)", fontSize: "13px" }}>
              Curated cases, a few times a year. This list gets first dibs.
            </span>
          </span>
        </label>

        <button
          type="submit"
          style={{
            background: "var(--link)",
            color: "#fff",
            fontFamily: "Verdana, sans-serif",
            fontSize: "15px",
            fontWeight: "bold",
            padding: "12px 32px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Continue
        </button>
      </form>
    </main>
  );
}
