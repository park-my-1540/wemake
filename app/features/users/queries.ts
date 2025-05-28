import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "database.types";
import { redirect } from "react-router";

const productListSelect = `
  product_id,
  name, 
  tagline, 
  upvotes:stats->>upvotes,
  views:stats->>views,
  reviews:stats->>reviews
`;
export const getUserProfile = async (
  client: SupabaseClient,
  { username }: { username: string }
) => {
  const { data, error } = await client
    .from("profiles")
    .select(
      `
        profile_id,name,username,avatar,role,headline,bio`
    )
    .eq("username", username)
    .single();
  if (error) throw error;
  return data;
};
export const getUserProfileById = async (
  client: SupabaseClient,
  { id }: { id: string }
) => {
  const { data, error } = await client
    .from("profiles")
    .select(
      `
        profile_id,name,username,avatar`
    )
    .eq("profile_id", id)
    .single();
  if (error) throw error;
  return data;
};

export const getUserProducts = async (
  client: SupabaseClient,
  { username }: { username: string }
) => {
  const { data, error } = await client
    .from("products")
    .select(
      `
      ${productListSelect},
        profiles!products_to_profiles!inner(
        profile_id)
      `
    )
    .eq("profiles.username", username);
  if (error) throw error;
  return data;
};

export const getProductsByUserId = async (
  client: SupabaseClient,
  { userId }: { userId: string }
) => {
  const { data, error } = await client
    .from("products")
    .select(`name, product_id`)
    .eq("profile_id", userId);
  if (error) {
    throw error;
  }
  return data;
};

export const getUserPosts = async (
  client: SupabaseClient,
  { username }: { username: string }
) => {
  const { data, error } = await client
    .from("community_post_list_view")
    .select("*")
    .eq("author_username", username);
  if (error) throw error;
  return data;
};

export const getLoggedInUserId = async (client: SupabaseClient) => {
  const { data, error } = await client.auth.getUser();
  if (error || data.user === null) {
    throw redirect("/auth/login");
  }
  return data.user.id;
};

/**
 * DB에서 데이터를 가져오는것.
 */
