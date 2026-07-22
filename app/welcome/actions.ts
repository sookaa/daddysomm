"use server";

import { currentUser } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function saveOptIns(formData: FormData) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const newsletter = formData.get("newsletter") === "on";
  const wineDrops = formData.get("wine_drops") === "on";

  const db = supabaseAdmin();
  await db
    .from("users")
    .update({
      newsletter_opt_in: newsletter,
      wine_drops_opt_in: wineDrops,
      onboarded: true,
      updated_at: new Date().toISOString(),
    })
    .eq("clerk_user_id", user.id);

  redirect("/portal");
}
