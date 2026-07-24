import fs from "fs";
import path from "path";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";
import CaseRack from "../CaseRack";

export const dynamic = "force-dynamic";

interface DropMeta {
  title: string;
  publishDate: string;
  deliveryWindow?: string;
}

function getCurrentDropMeta(): DropMeta | null {
  const dir = path.join(process.cwd(), "content/drops");
  if (!fs.existsSync(dir)) return null;
  const now = Date.now();
  const drops = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8")) as DropMeta)
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
      ? "Twelve bottles, my call entirely — including one special one, chin chin!."
      : "Twelve bottles, my call entirely. Brave. Salut!.";
  }
  const parts: string[] = [];
  if (p.wine_lean === "red") parts.push("leaning red");
  else if (p.wine_lean === "white") parts.push("leaning white");
  else parts.push("a balanced mix, are you a libra?");
  if (!p.no_sparkling) parts.push("bubbles included");
  else parts.push("no bubbles");
  if (p.investment_bottle) parts.push("one bottle swapped for something special, civilised");
  return "Twelve bottles: " + parts.join(", ") + ".";
}

export default async function CasePage() {
  const user = await currentUser();
  if (!user) return null;

  const db = supabaseAdmin();
  const { data: profile } = await db
    .from("users")
    .select("defer_curation, wine_lean, no_sparkling, investment_bottle")
    .eq("clerk_user_id", user.id)
    .single();

  if (!profile) {
    return (
      <main style={{ maxWidth: "44rem", margin: "0 auto", padding: "3rem 1.5rem" }}>
        <p>Profile still syncing. Head back to <Link href="/portal">the cellar</Link>.</p>
      </main>
    );
  }

  const drop = getCurrentDropMeta();
  const seed = user.id
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);

  return (
    <main style={{ maxWidth: "44rem", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "0.5rem" }}>your case</h1>
      <p style={{ color: "var(--muted)", marginBottom: "2rem" }}>
        Not bad; I can work with this!
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

      {drop?.deliveryWindow && (
        <p style={{ color: "var(--muted)", marginTop: "1rem" }}>
          The {drop.title} drop lands {drop.deliveryWindow}.
        </p>
      )}

      <p style={{ marginTop: "2.5rem" }}>
        <Link href="/portal" style={{ marginRight: "1.5rem" }}>
          back to the cellar
        </Link>
        <Link href="/drop">view the current drop</Link>
      </p>
    </main>
  );
}