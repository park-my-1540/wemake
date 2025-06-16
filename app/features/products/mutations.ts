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

export const recordPromotion = async (
  client: SupabaseClient,
  {
    productId,
    promotionFrom,
    promotionTo,
  }: { productId: number; promotionFrom: string; promotionTo: string }
) => {
  const { error } = await client
    .from("products")
    .update({
      promoted_from: promotionFrom,
      promoted_to: promotionTo,
    })
    .eq("product_id", productId);
  if (error) throw error;
};

export const updatePromotion = async (client: SupabaseClient) => {
  const { error } = await client
    .from("products")
    .update({
      is_promoted: true,
    })
    .lte("promoted_from", new Date().toISOString().split("T")[0])
    .gte("promoted_to", new Date().toISOString().split("T")[0]);
  if (error) throw error;
};

export const toggleProductUpvote = async (
  client: SupabaseClient,
  { productId, userId }: { productId: string; userId: string }
) => {
  const { count } = await client
    .from("product_upvotes")
    .select("*", { count: "exact", head: true })
    .eq("product_id", productId)
    .eq("id", userId);

  if (count === 0) {
    await client
      .from("product_upvotes")
      .insert({ id: userId, product_id: productId });
  } else {
    const { data, error } = await client
      .from("product_upvotes")
      .delete()
      .eq("product_id", productId)
      .eq("id", userId);
  }
};
