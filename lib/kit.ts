// Kit (v4) sync helper. Best-effort: callers should not let failures here
// block their primary operation. Manages two tags by name.

const BASE = "https://api.kit.com/v4";
const WINE_DROPS_TAG = "Wine Drops";
const NEWSLETTER_TAG = "Newsletter";

function headers(key: string) {
  return {
    "Content-Type": "application/json",
    "X-Kit-Api-Key": key,
  };
}

async function ensureTag(key: string, name: string): Promise<number | null> {
  const listed = await fetch(`${BASE}/tags`, { headers: headers(key) });
  if (listed.ok) {
    const data = await listed.json();
    const found = (data.tags || []).find(
      (t: any) => (t.name || "").toLowerCase() === name.toLowerCase()
    );
    if (found) return found.id;
  }
  const created = await fetch(`${BASE}/tags`, {
    method: "POST",
    headers: headers(key),
    body: JSON.stringify({ name }),
  });
  if (created.ok) {
    const data = await created.json();
    return data.tag?.id ?? null;
  }
  return null;
}

async function upsertSubscriber(
  key: string,
  email: string,
  firstName?: string | null
): Promise<number | null> {
  const res = await fetch(`${BASE}/subscribers`, {
    method: "POST",
    headers: headers(key),
    body: JSON.stringify({
      email_address: email,
      first_name: firstName || undefined,
      state: "active",
    }),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.subscriber?.id ?? null;
}

async function tagSubscriber(key: string, tagId: number, subId: number) {
  await fetch(`${BASE}/tags/${tagId}/subscribers/${subId}`, {
    method: "POST",
    headers: headers(key),
    body: JSON.stringify({}),
  });
}

async function untagSubscriber(key: string, tagId: number, subId: number) {
  await fetch(`${BASE}/tags/${tagId}/subscribers/${subId}`, {
    method: "DELETE",
    headers: headers(key),
  });
}

export async function syncKitOptIns(
  email: string,
  firstName: string | null,
  optIns: { newsletter: boolean; wineDrops: boolean }
): Promise<void> {
  const key = process.env.KIT_API_KEY;
  if (!key) {
    console.error("KIT_API_KEY not set — skipping Kit sync");
    return;
  }

  try {
    const subId = await upsertSubscriber(key, email, firstName);
    if (!subId) {
      console.error("Kit: could not upsert subscriber", email);
      return;
    }

    const wineTagId = await ensureTag(key, WINE_DROPS_TAG);
    const newsTagId = await ensureTag(key, NEWSLETTER_TAG);

    if (wineTagId) {
      if (optIns.wineDrops) await tagSubscriber(key, wineTagId, subId);
      else await untagSubscriber(key, wineTagId, subId);
    }
    if (newsTagId) {
      if (optIns.newsletter) await tagSubscriber(key, newsTagId, subId);
      else await untagSubscriber(key, newsTagId, subId);
    }
  } catch (err) {
    console.error("Kit sync error:", err);
  }
}