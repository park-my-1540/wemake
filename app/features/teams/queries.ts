import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "database.types";

export const getTeams = async (
  client: SupabaseClient,
  { limit }: { limit: number }
) => {
  const { data, error } = await client
    .from("team")
    .select(
      `
    team_id,
    roles,
    product_description,
    team_leader:profiles!inner(
    username,avatar)
    `
    )
    .limit(limit);

  if (error) {
    throw error;
  }
  return data;
};

export const getTeamById = async (
  client: SupabaseClient,
  { teamId }: { teamId: number }
) => {
  const { data, error } = await client
    .from("team")
    .select(
      `
      *,
      team_leader:profiles!inner(
        name,
        avatar,
        role,
        username
      )`
    )
    .eq("team_id", teamId)
    .single();

  if (error) {
    throw error;
  }
  return data;
};
