import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { formSchema } from "./pages/submit-team-page";

export const createTeam = async (
  client: SupabaseClient,
  userId: string,
  team: z.infer<typeof formSchema>
) => {
  const { data, error } = await client
    .from("team")
    .insert({
      team_leader_id: userId,
      team_size: team.size,
      product_name: team.equity,
      product_description: team.description,
      equity_split: team.equity,
      product_stage: team.stage,
      roles: team.roles,
    })
    .select("team_id")
    .single();

  if (error) {
    throw error;
  }
  return data;
};

/**
 * topLevelId
 * o -> set parent_id === topLevelId
 * x -> set post_id
 */
export const createReply = async (
  client: SupabaseClient,
  {
    postId,
    reply,
    userId,
    topLevelId,
  }: { postId: number; reply: string; userId: string; topLevelId?: number }
) => {
  const { data, error } = await client.from("post_replies").insert({
    ...(topLevelId ? { parent_id: topLevelId } : { post_id: Number(postId) }),
    reply,
    profile_id: userId,
  });

  if (error) {
    throw error;
  }
};
