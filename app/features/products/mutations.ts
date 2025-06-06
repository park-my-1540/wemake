import type { SupabaseClient } from "@supabase/supabase-js";

export const createProductReview = async (
  client: SupabaseClient,
  {
    productId,
    review,
    rating,
    userId,
  }: { productId: number; review: string; rating: number; userId: string }
) => {
  const { error } = await client.from("reviews").insert({
    product_id: productId,
    id: userId,
    rating,
    review,
  });

  if (error) {
    throw error;
  }
};

export const updateProductIcon = async (
  client: SupabaseClient,
  {
    id,
    name,
    tagline,
    url,
    description,
    category_id,
    how_it_works,
    iconUrl,
  }: {
    id: string;
    iconUrl: string;
    name: string;
    tagline: string;
    url: string;
    description: string;
    category_id: number;
    how_it_works: string;
  }
) => {
  const { data, error } = await client
    .from("products")
    .insert({
      profile_id: id,
      icon: iconUrl,
      name,
      tagline,
      url,
      description,
      category_id,
      how_it_works,
    })
    .select("product_id")
    .single();

  if (error) {
    throw error;
  }
  return data.product_id;
};
