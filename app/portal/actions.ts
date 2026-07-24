"use server";

import fs from "fs";
import path from "path";
import { currentUser } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

interface DropFile {
  slug: string;
  publishDate: string;
  confirmationDeadline?: string;
}

function getCurrentDrop(): DropFile | null {
  const dir = path.join(process.cwd(), "content/drops");
  if (!fs.existsSync(dir)) return null;
  const now = Date.now();
  const drops = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const data = JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8"));
      return { ...data, slug: f.replace(/\.json$/, "") } as DropFile;
    })
    .filter((d) => d.publishDate && new Date(d.publishDate).getTime() <= now)
    .sort(
      (a, b) =>
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
  return drops[0] ?? null;
}

export async function savePreferences(formData: FormData) {
  const user = await currentUser();
  if (!user) return;

  const deferCuration = formData.get("defer_curation") === "on";
  const investmentBottle = formData.get("investment_bottle") === "on";
  const lean = deferCuration
    ? "none"
    : (formData.get("wine_lean") as string) || "none";
  const noSparkling = deferCuration
    ? false
    : formData.get("no_sparkling") === "on";

  const db = supabaseAdmin();

  // 1. Update standing preferences on the user, return internal id
  const { data: updated } = await db
    .from("users")
    .update({
      defer_curation: deferCuration,
      wine_lean: lean,
      no_sparkling: noSparkling,
      investment_bottle: investmentBottle,
      updated_at: new Date().toISOString(),
    })
    .eq("clerk_user_id", user.id)
    .select("id")
    .single();

  // 2. If a drop is open (deadline not passed), snapshot the confirmation
  const drop = getCurrentDrop();
  if (updated && drop) {
    const deadlinePassed =
      drop.confirmationDeadline &&
      new Date(drop.confirmationDeadline).getTime() < Date.now();

    if (!deadlinePassed) {
      await db.from("confirmations").upsert(
        {
          drop_id: drop.slug,
          user_id: updated.id,
          defer_curation: deferCuration,
          wine_lean: lean,
          no_sparkling: noSparkling,
          investment_bottle: investmentBottle,
          confirmed_at: new Date().toISOString(),
        },
        { onConflict: "drop_id,user_id" }
      );
    }
  }

  revalidatePath("/portal");
  revalidatePath("/portal/case");
}