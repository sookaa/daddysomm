import fs from "fs";
import path from "path";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";
import MemberNav from "@/components/MemberNav";
import CaseRack from "../CaseRack";

export const dynamic = "force-dynamic";

interface DropMeta {
  slug: string;
  title: string;
  publishDate: string;
  confirmationDeadline?: string;
  deliveryWindow?: string;
}

function getCurrentDropMeta(): DropMeta | null {
  const dir = path.join(process.cwd(), "content/drops");
  if (!fs.existsSync(dir)) return null;
  const now = Date.now();
  const drops = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const data = JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8"));
      return { ...data, slug: f.replace(/\.json$/, "") } as DropMeta;
    })
    .filter((d) => d.publishDate && new Date(d.publishDate).getTime() <= now)
    .sort(
      (a, b) =>
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
  return drops[0] ?? null;
}

function describeCase(p: {
  defer_curation: boolean;
  wine_lean: string;
  no_sparkling: boolean;
  investment_bottle: boolean;
}): string {
  if (p.defer_curation) {
    return p.investment_bottle
      ? "Twelve bottles, my call entirely — including one special one."
      : "Twelve bottles, my call entirely. Brave. I'll make it count.";
  }
  const parts: string[] = [];
  if (p.wine_lean === "red") parts.push("leaning red");
  else if (p.wine_lean === "white") parts.push("leaning white");
  else parts.push("a balanced mix");
  if (!p.no_sparkling) parts.push("bubbles included");
  else parts.push("no bubbles");
  if (p.investment_bottle) parts.push("one bottle swapped for something special");
  return "Twelve bottles: " + parts.join(", ") + ".";
}

function fmt(d: string): string {
  return new Date(d).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default async function CasePage() {
  const user = await currentUser();
  if (!user) return null;

  const db = supabaseAdmin();
  const { data: profile } = await db
    .from("users")
    .select("id, defer_curation, wine_lean, no_sparkling, investment_bottle")
    .eq("clerk_user_id", user.id)
    .single();

  if (!profile) {
    return (
      <>
        <MemberNav />
        <main style={{ maxWidth: "44rem", margin: "0 auto", padding: "3rem 1.5rem" }}>
          <p>Profile still syncing. Head back to <Link href="/portal">the cellar</Link>.</p>
        </main>
      </>
    );
  }

  const drop = getCurrentDropMeta();
  const seed = user.id
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);

  let lockLine: string | null = null;
  let deadlinePassed = false;
  if (drop) {
    deadlinePassed = !!(
      drop.confirmationDeadline &&
      new Date(drop.confirmationDeadline).getTime() < Date.now()
    );
    if (deadlinePassed) {
      lockLine = `Your case for ${drop.title} is locked in. See you at delivery.`;
    } else if (drop.confirmationDeadline) {
      lockLine = `Locked in for ${drop.title} — change your mind any time before ${fmt(drop.confirmationDeadline)}.`;
    } else {
      lockLine = `Locked in for ${drop.title}.`;
    }
  }

  return (
    <>
      <MemberNav />
      <main style={{ maxWidth: "44rem", margin: "0 auto", padding: "3rem 1.5rem" }}>
        <h1 style={{ fontSize: "28px", marginBottom: "0.5rem" }}>your case</h1>
        <p style={{ color: "var(--muted)", marginBottom: "2rem" }}>
          Noted, locked in my head, and honestly? Good choices.
        </p>

        <CaseRack
          deferCuration={profile.defer_curation ?? false}
          wineLean={profile.wine_lean ?? "none"}
          noSparkling={profile.no_sparkling ?? false}
          investmentBottle={profile.investment_bottle ?? false}
          seed={seed}
        />

        <p style={{ lineHeight: 1.7, marginTop: "1.5rem" }}>
          {describeCase(profile)}
        </p>

        {lockLine && (
          <p
            style={{
              marginTop: "1.5rem",
              padding: "0.9rem 1.1rem",
              background: "var(--input-bg)",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              fontSize: "14px",
            }}
          >
            {lockLine}
          </p>
        )}

        {!deadlinePassed && (
          <p style={{ marginTop: "1.25rem" }}>
            <Link href="/portal">change my case</Link>
          </p>
        )}

        {drop?.deliveryWindow && (
          <p style={{ color: "var(--muted)", marginTop: "1.5rem" }}>
            The {drop.title} drop lands {drop.deliveryWindow}.
          </p>
        )}
      </main>
    </>
  );
}