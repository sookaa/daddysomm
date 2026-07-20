import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import { supabaseAdmin } from "@/lib/supabase";

// Clerk -> Supabase user sync.
// Configure in Clerk dashboard: Webhooks -> endpoint
// https://<domain>/api/webhooks/clerk, events: user.created,
// user.updated, user.deleted. Signing secret goes in CLERK_WEBHOOK_SECRET.

type ClerkEmail = { id: string; email_address: string };
type ClerkUserEvent = {
  type: string;
  data: {
    id: string;
    email_addresses?: ClerkEmail[];
    primary_email_address_id?: string;
    first_name?: string | null;
    last_name?: string | null;
  };
};

function primaryEmail(data: ClerkUserEvent["data"]): string | null {
  const emails = data.email_addresses ?? [];
  const primary = emails.find((e) => e.id === data.primary_email_address_id);
  return primary?.email_address ?? emails[0]?.email_address ?? null;
}

export async function POST(req: NextRequest) {
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) {
    console.error("CLERK_WEBHOOK_SECRET not set");
    return NextResponse.json({ error: "Server config error" }, { status: 500 });
  }

  const payload = await req.text();
  const headers = {
    "svix-id": req.headers.get("svix-id") ?? "",
    "svix-timestamp": req.headers.get("svix-timestamp") ?? "",
    "svix-signature": req.headers.get("svix-signature") ?? "",
  };

  let event: ClerkUserEvent;
  try {
    event = new Webhook(secret).verify(payload, headers) as ClerkUserEvent;
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const db = supabaseAdmin();
  const { type, data } = event;

  if (type === "user.created" || type === "user.updated") {
    const email = primaryEmail(data);
    if (!email) {
      return NextResponse.json({ error: "No email on user" }, { status: 400 });
    }
    const displayName =
      [data.first_name, data.last_name].filter(Boolean).join(" ") || null;

    const { error } = await db.from("users").upsert(
      {
        clerk_user_id: data.id,
        email,
        display_name: displayName,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "clerk_user_id" }
    );
    if (error) {
      console.error("Supabase upsert error:", error.message);
      return NextResponse.json({ error: "Sync failed" }, { status: 500 });
    }
  }

  if (type === "user.deleted") {
    const { error } = await db
      .from("users")
      .delete()
      .eq("clerk_user_id", data.id);
    if (error) {
      console.error("Supabase delete error:", error.message);
      return NextResponse.json({ error: "Sync failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
