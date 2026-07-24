import fs from "fs";
import path from "path";
import { currentUser } from "@clerk/nextjs/server";
import MemberNav from "@/components/MemberNav";

export const dynamic = "force-dynamic";

interface Bottle {
  name: string;
  producer?: string;
  region?: string;
  vintage?: string;
  colour?: string;
  isInvestment?: boolean;
}

interface Drop {
  title: string;
  theme?: string;
  publishDate: string;
  confirmationDeadline?: string;
  description?: any;
  bottles?: Bottle[];
}

function getCurrentDrop(): Drop | null {
  const dir = path.join(process.cwd(), "content/drops");
  if (!fs.existsSync(dir)) return null;

  const now = Date.now();
  const drops = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8")) as Drop)
    .filter((d) => d.publishDate && new Date(d.publishDate).getTime() <= now)
    .sort(
      (a, b) =>
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );

  return drops[0] ?? null;
}

function richTextToPlain(node: any): string {
  if (!node) return "";
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(richTextToPlain).join("");
  if (node.text) return node.text;
  if (node.children) return richTextToPlain(node.children);
  return "";
}

export default async function DropPage() {
  const user = await currentUser();
  if (!user) return null;

  const drop = getCurrentDrop();

  if (!drop) {
    return (
      <>
        <MemberNav />
        <main style={{ maxWidth: "42rem", margin: "0 auto", padding: "3rem 1.5rem" }}>
          <h1 style={{ fontSize: "28px" }}>the current drop</h1>
          <p style={{ color: "var(--muted)", marginTop: "1rem" }}>
            No drop is live right now. Check back soon.
          </p>
        </main>
      </>
    );
  }

  const bottles = drop.bottles ?? [];
  const blurb = richTextToPlain(drop.description?.children ?? drop.description);

  return (
    <>
      <MemberNav />
      <main style={{ maxWidth: "42rem", margin: "0 auto", padding: "3rem 1.5rem" }}>
        {drop.theme && (
          <p style={{ color: "var(--muted)", fontSize: "13px", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
            {drop.theme}
          </p>
        )}
        <h1 style={{ fontSize: "32px", margin: "0 0 1rem" }}>{drop.title}</h1>

        {blurb && (
          <p style={{ lineHeight: 1.7, marginBottom: "2rem" }}>{blurb}</p>
        )}

        {drop.confirmationDeadline && (
          <p style={{ color: "var(--muted)", fontSize: "13px", marginBottom: "2rem" }}>
            Confirm your case by{" "}
            {new Date(drop.confirmationDeadline).toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
            .
          </p>
        )}

        <h2 style={{ fontSize: "18px", marginBottom: "1rem" }}>The bottles</h2>
        {bottles.length === 0 ? (
          <p style={{ color: "var(--muted)" }}>Bottle list coming soon.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {bottles.map((b, i) => (
              <li
                key={i}
                style={{
                  padding: "0.9rem 0",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <span style={{ fontWeight: "bold" }}>{b.name}</span>
                {b.isInvestment && (
                  <span
                    style={{
                      marginLeft: "0.5rem",
                      fontSize: "11px",
                      color: "var(--link)",
                      border: "1px solid var(--link)",
                      borderRadius: "3px",
                      padding: "1px 5px",
                    }}
                  >
                    investment
                  </span>
                )}
                <br />
                <span style={{ color: "var(--muted)", fontSize: "13px" }}>
                  {[b.producer, b.region, b.vintage, b.colour]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}