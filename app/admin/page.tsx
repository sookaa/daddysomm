import fs from "fs";
import path from "path";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";
import MemberNav from "@/components/MemberNav";

export const dynamic = "force-dynamic";

interface DropMeta {
  title: string;
  theme?: string;
  publishDate: string;
}

function getNextDrop(): { current: DropMeta | null; upcoming: DropMeta | null } {
  const dir = path.join(process.cwd(), "content/drops");
  if (!fs.existsSync(dir)) return { current: null, upcoming: null };
  const now = Date.now();
  const all = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8")) as DropMeta)
    .filter((d) => d.publishDate);

  const published = all
    .filter((d) => new Date(d.publishDate).getTime() <= now)
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  const future = all
    .filter((d) => new Date(d.publishDate).getTime() > now)
    .sort((a, b) => new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime());

  return { current: published[0] ?? null, upcoming: future[0] ?? null };
}

function leanLabel(lean: string, defer: boolean): string {
  if (defer) return "my call";
  if (lean === "red") return "more red";
  if (lean === "white") return "more white";
  return "balanced";
}

function daysUntil(dateStr: string): string {
  const diff = new Date(dateStr).getTime() - Date.now();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  if (days <= 0) return "now";
  if (days === 1) return "1 day";
  return `${days} days`;
}

const cardStyle = {
  border: "1px solid var(--border)",
  borderRadius: "8px",
  padding: "1.25rem 1.5rem",
  background: "var(--input-bg)",
};

export default async function AdminPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const db = supabaseAdmin();

  const { data: me } = await db
    .from("users")
    .select("is_admin")
    .eq("clerk_user_id", user.id)
    .single();

  if (!me?.is_admin) redirect("/portal");

  const { data: members } = await db
    .from("users")
    .select("display_name, email, created_at, defer_curation, wine_lean, no_sparkling, investment_bottle, wine_drops_opt_in, newsletter_opt_in")
    .order("created_at", { ascending: true });

  const list = members ?? [];
  const dropSubs = list.filter((m) => m.wine_drops_opt_in).length;
  const newsSubs = list.filter((m) => m.newsletter_opt_in).length;

  const { current, upcoming } = getNextDrop();
  const nextDrop = upcoming ?? current;

  return (
    <>
      <MemberNav />
      <main style={{ maxWidth: "60rem", margin: "0 auto", padding: "3rem 1.5rem" }}>
        <h1 style={{ fontSize: "28px", marginBottom: "2rem" }}>admin — the back room</h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1rem",
            marginBottom: "2.5rem",
          }}
        >
          <div style={cardStyle}>
            <div style={{ fontSize: "32px", fontWeight: "bold" }}>{list.length}</div>
            <div style={{ color: "var(--muted)", fontSize: "13px" }}>members</div>
          </div>
          <div style={cardStyle}>
            <div style={{ fontSize: "32px", fontWeight: "bold" }}>{dropSubs}</div>
            <div style={{ color: "var(--muted)", fontSize: "13px" }}>opted into drops</div>
          </div>
          <div style={cardStyle}>
            <div style={{ fontSize: "32px", fontWeight: "bold" }}>{newsSubs}</div>
            <div style={{ color: "var(--muted)", fontSize: "13px" }}>newsletter subs</div>
          </div>
          <div style={cardStyle}>
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>
              {nextDrop ? nextDrop.title : "—"}
            </div>
            <div style={{ color: "var(--muted)", fontSize: "13px" }}>
              {upcoming
                ? `publishes in ${daysUntil(upcoming.publishDate)}`
                : current
                ? "live now"
                : "no drop scheduled"}
            </div>
          </div>
        </div>

        {nextDrop?.theme && (
          <p style={{ color: "var(--muted)", marginBottom: "2.5rem" }}>
            Next theme: <strong style={{ color: "var(--text)" }}>{nextDrop.theme}</strong>
          </p>
        )}

        <h2 style={{ fontSize: "18px", marginBottom: "1rem" }}>members</h2>
        {list.length === 0 ? (
          <p style={{ color: "var(--muted)" }}>No members yet.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ textAlign: "left", color: "var(--muted)", fontSize: "12px" }}>
                  <th style={{ padding: "0.5rem 0.75rem 0.5rem 0" }}>Name</th>
                  <th style={{ padding: "0.5rem 0.75rem" }}>Email</th>
                  <th style={{ padding: "0.5rem 0.75rem" }}>Case</th>
                  <th style={{ padding: "0.5rem 0.75rem" }}>Drops</th>
                  <th style={{ padding: "0.5rem 0.75rem" }}>Joined</th>
                </tr>
              </thead>
              <tbody>
                {list.map((m, i) => (
                  <tr key={i} style={{ borderTop: "1px solid var(--border)" }}>
                    <td style={{ padding: "0.6rem 0.75rem 0.6rem 0" }}>
                      {m.display_name || "—"}
                    </td>
                    <td style={{ padding: "0.6rem 0.75rem", color: "var(--muted)" }}>
                      {m.email}
                    </td>
                    <td style={{ padding: "0.6rem 0.75rem" }}>
                      {leanLabel(m.wine_lean, m.defer_curation)}
                      {!m.defer_curation && m.no_sparkling ? ", no bubbles" : ""}
                      {m.investment_bottle ? ", investment" : ""}
                    </td>
                    <td style={{ padding: "0.6rem 0.75rem" }}>
                      {m.wine_drops_opt_in ? "yes" : "—"}
                    </td>
                    <td style={{ padding: "0.6rem 0.75rem", color: "var(--muted)" }}>
                      {m.created_at
                        ? new Date(m.created_at).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  );
}