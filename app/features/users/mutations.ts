/**
 * DB 데이터를 수정, 변경하는 작업.
 */

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "database.types";

export const createPost = async (
  client: SupabaseClient<Database>,
  {
    title,
    topic,
    content,
    userId,
  }: {
    title: string;
    topic: string;
    content: string;
    userId: string;
  }
) => {
  const { data: topicData, error: topicError } = await client
    .from("topics")
    .select("topic_id")
    .eq("slug", topic)
    .single();

  if (topicError) {
    throw topicError;
  }

  const { data, error } = await client
    .from("posts")
    .insert({
      title,
      content,
      profile_id: userId,
      topic_id: topicData.topic_id,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }
  return data;
};

export const updateUser = async (
  client: SupabaseClient<Database>,
  {
    id,
    name,
    role,
    headline,
    bio,
  }: {
    id: string;
    name: string;
    role: "developer" | "designer" | "marketer" | "product-manager";
    headline: string;
    bio: string;
  }
) => {
  const { data, error } = await client
    .from("profiles")
    .update({ name, role, headline, bio })
    .eq("profile_id", id);

  if (error) {
    throw error;
  }
};
