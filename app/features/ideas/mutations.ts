import type { SupabaseClient } from "@supabase/supabase-js";

export const claimedIea = async (
  client: SupabaseClient,
  { userId, ideaId }: { userId: string; ideaId: number }
) => {
  const { error } = await client
    .from("gpt_ideas")
    .update({
      claimed_by: userId,
      claimed_at: new Date().toISOString(),
    })
    .eq("gpt_idea_id", ideaId);

  if (error) {
    throw error;
  }
};
