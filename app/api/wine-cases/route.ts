import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const apiKey = process.env.KIT_API_KEY;
    const tagId = process.env.KIT_WINE_CASES_TAG_ID;

    if (!apiKey || !tagId) {
      console.error("KIT_API_KEY or KIT_WINE_CASES_TAG_ID not set");
      return NextResponse.json({ error: "Server config error" }, { status: 500 });
    }

    // Step 1: Create subscriber (upserts if already exists)
    const subRes = await fetch("https://api.kit.com/v4/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Kit-Api-Key": apiKey,
      },
      body: JSON.stringify({
        email_address: email,
        state: "active",
      }),
    });

    if (!subRes.ok && subRes.status !== 200) {
      const err = await subRes.text();
      console.error("Kit create subscriber error:", err);
      return NextResponse.json({ error: "Failed" }, { status: 500 });
    }

    // Step 2: Tag subscriber by email
    await fetch(`https://api.kit.com/v4/tags/${tagId}/subscribers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Kit-Api-Key": apiKey,
      },
      body: JSON.stringify({
        email_address: email,
      }),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}