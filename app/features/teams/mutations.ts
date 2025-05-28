import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "database.types";
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
