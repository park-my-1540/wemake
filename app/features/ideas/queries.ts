import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "database.types";
// query는 항상 pagination
export const getGptIdeas = async (
  client: SupabaseClient,
  { limit }: { limit: number }
) => {
  const { data, error } = await client
    .from("gpt_ideas_view")
    .select("*")
    .limit(limit);
  if (error) {
    throw error;
  }
  return data;
};

// column이 URL로부터 받은 ideaId의 값과 같은지 확인
export const getGptIdea = async (
  client: SupabaseClient,
  { ideaId }: { ideaId: number }
) => {
  const { data, error } = await client
    .from("gpt_ideas_view")
    .select("*")
    .eq("gpt_idea_id", ideaId)
    .single();
  if (error) {
    throw error;
  }
  return data;
};

/**
 * eq가 하는일 where문을 만들고 그 뒤에 filter을 추가해서 해당 칼람을 추출하는것.
 * SELECT * FROM gpt_ideas_view WHERE gpt_idea_id
 *
 * data 변형을 마쳣으니 이젠 view를 사용하기만 하면 되는것.
 */

export const getClaimedIdeas = async (
  client: SupabaseClient,
  { userId }: { userId: string }
) => {
  const { data, error } = await client
    .from("gpt_ideas")
    .select("gpt_idea_id, claimed_at, idea")
    .eq("claimed_by", userId)
    .select();

  if (error) {
    return error;
  }

  return data;
};
