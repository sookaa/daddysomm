"use server";

import { currentUser } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function savePreferences(formData: FormData) {
  const user = await currentUser();
  if (!user) return;

  const deferCuration = formData.get("defer_curation") === "on";
  const investmentBottle = formData.get("investment_bottle") === "on";

  // Taste prefs only apply when not deferring curation
  const lean = deferCuration
    ? "none"
    : (formData.get("wine_lean") as string) || "none";
  const noSparkling = deferCuration
    ? false
    : formData.get("no_sparkling") === "on";

  const db = supabaseAdmin();
  await db
    .from("users")
    .update({
      defer_curation: deferCuration,
      wine_lean: lean,
      no_sparkling: noSparkling,
      investment_bottle: investmentBottle,
      updated_at: new Date().toISOString(),
    })
    .eq("clerk_user_id", user.id);

  revalidatePath("/portal");
}