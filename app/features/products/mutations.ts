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

type UpdateCreatedAtOptions = {
  productIds: number[];
  updateDate?: Date; // 완전한 날짜로 덮어씌우고 싶을 때
  updateOnlyMonth?: boolean; // true면 기존 created_at에서 월만 현재로 갱신
};

export const updateCreatedAt = async (
  client: SupabaseClient,
  { productIds, updateDate, updateOnlyMonth = false }: UpdateCreatedAtOptions
) => {
  for (const id of productIds) {
    const updatedDates = await getUpdatedCreatedAt({
      client,
      productId: id,
      updateOnlyMonth,
      updateDate,
    });

    if (!updatedDates) continue;

    const { error } = await client
      .from("products")
      .update({ created_at: updatedDates.toISOString() })
      .eq("product_id", id);

    if (error) {
      console.error(`[Update] product ${id}:`, error);
    }
  }
};

export const getUpdatedCreatedAt = async ({
  client,
  productId,
  updateOnlyMonth,
  updateDate,
}: {
  client: SupabaseClient;
  productId: number;
  updateOnlyMonth: boolean;
  updateDate?: Date;
}): Promise<Date | null> => {
  const today = new Date();
  const currentMonth = today.getMonth();

  if (updateOnlyMonth) {
    const { data, error } = await client
      .from("products")
      .select("created_at")
      .eq("product_id", productId)
      .single();

    if (error || !data?.created_at) {
      console.error(`[Fetch] product ${productId}:`, error ?? "No created_at");
      return null;
    }

    const original = new Date(data.created_at);
    original.setMonth(currentMonth);
    return original;
  }

  return updateDate ?? today;
};

export const updatePromotedDate = async (
  client: SupabaseClient,
  { productIds }: UpdateCreatedAtOptions
) => {
  for (const id of productIds) {
    const updateDates = await getUpdatedPromotedDate({ client, productId: id });

    if (!updateDates?.originalTo || !updateDates?.originalFrom) {
      continue;
    }

    const { originalTo, originalFrom } = updateDates;

    const { error } = await client
      .from("products")
      .update({
        promoted_to: originalTo.toISOString(),
        promoted_from: originalFrom.toISOString(),
      })
      .eq("product_id", id);

    if (error) {
      console.error(`[Update error] product ${id}:`, error);
    }
  }
};

type PromotedDateSet = {
  originalTo: Date;
  originalFrom: Date;
};

export const getUpdatedPromotedDate = async ({
  client,
  productId,
}: {
  client: SupabaseClient;
  productId: number;
}): Promise<PromotedDateSet | null> => {
  const today = new Date();
  const currentMonth = today.getMonth();

  const { data, error } = await client
    .from("products")
    .select("promoted_to, promoted_from")
    .eq("product_id", productId)
    .single();

  if (error || !data?.promoted_to || !data?.promoted_from) {
    return null;
  }

  const originalTo = new Date(data.promoted_to);
  const originalFrom = new Date(data.promoted_from);
  originalTo.setMonth(currentMonth);
  originalFrom.setMonth(currentMonth);

  return { originalTo, originalFrom };
};
