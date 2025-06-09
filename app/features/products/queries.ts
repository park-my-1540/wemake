import type { DateTime } from "luxon";
import { PAGE_SIZE } from "./constant";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "database.types";

const productListSelect = `
  product_id,
  name, 
  tagline, 
  upvotes:stats->>upvotes,
  views:stats->>views,
  reviews:stats->>reviews
`;

export const getProductsByDateRange = async (
  client: SupabaseClient,
  {
    startDate,
    endDate,
    limit,
    page = 1,
  }: {
    startDate: DateTime;
    endDate: DateTime;
    limit: number;
    page?: number;
  }
) => {
  const { data, error } = await client
    .from("products")
    .select(productListSelect)
    .order("stats->>upvotes", { ascending: false })
    .gte("created_at", startDate)
    .lte("created_at", endDate)
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  if (error) throw error;
  return data;
};

// ->> JSON내부의 key를 추출

// product의 정보를 가져오는 함수에는 query에 제한을 줘야함
export const getProductPagesByDateRange = async (
  client: SupabaseClient,
  {
    startDate,
    endDate,
  }: {
    startDate: DateTime;
    endDate: DateTime;
  }
) => {
  const { count, error } = await client
    .from("products")
    .select(`product_id`, { count: "exact", head: true })
    .gte("created_at", startDate.toISO())
    .lte("created_at", endDate.toISO());
  if (error) throw error;
  if (!count) return 1;
  return Math.ceil(count / PAGE_SIZE);
};

export const getCategories = async (client: SupabaseClient) => {
  const { data, error } = await client
    .from("categories")
    .select(`category_id, name, description`);

  if (error) throw error;
  return data;
};

export const getCategory = async (
  client: SupabaseClient,
  { categoryId }: { categoryId: number }
) => {
  const { data, error } = await client
    .from("categories")
    .select(`category_id, name, description`)
    .eq("category_id", categoryId)
    .single(); //where로 조회

  if (error) throw error;
  return data;
};

// single을 호출 : 이 쿼리가 단한개의 row만을 생성한다면
// or not : 5rows .,..error

export const getProductsByCategory = async (
  client: SupabaseClient,
  {
    categoryId,
    page,
  }: {
    categoryId: number;
    page: number;
  }
) => {
  const { data, error } = await client
    .from("products")
    .select(productListSelect)
    .eq("category_id", categoryId)
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  if (error) throw error;
  return data;
};

export const getCategoryPages = async (
  client: SupabaseClient,
  { categoryId }: { categoryId: number }
) => {
  const { count, error } = await client
    .from("products")
    .select(`product_id`, { count: "exact", head: true })
    .eq("category_id", categoryId);
  if (error) throw error;
  if (!count) return 1;
  return Math.ceil(count / PAGE_SIZE);
};

export const getProductsBySearch = async (
  client: SupabaseClient,
  {
    query,
    page,
  }: {
    query: string;
    page: number;
  }
) => {
  const { data, error } = await client
    .from("products")
    .select(productListSelect)
    // .ilike("name", `%${query}%`)
    // .ilike("tagline", `%${query}%`);
    .or(`name.ilike.%${query}%, tagline.ilike.%${query}%`)
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  if (error) throw error;
  return data;
};

export const getPagesBySearch = async (
  client: SupabaseClient,
  { query }: { query: string }
) => {
  const { count, error } = await client
    .from("products")
    .select(productListSelect)
    .or(`name.ilike.%${query}%, tagline.ilike.%${query}%`);

  if (error) throw error;
  if (!count) return 1;
  return Math.ceil(count / PAGE_SIZE);
};

export const getProductById = async (
  client: SupabaseClient,
  { productId }: { productId: string }
) => {
  const { data, error } = await client
    .from("product_overview_view")
    .select("*")
    .eq("product_id", productId)
    .single();

  if (error) throw error;

  return data;
};

export const getReviews = async (
  client: SupabaseClient<Database>,
  { productId }: { productId: number }
) => {
  const { data, error } = await client
    .from("reviews")
    .select(
      `
        review_id,
        rating,
        review,
        created_at,
        user:profiles!inner (
          name,username,avatar
        )
      `
    )
    .eq("product_id", productId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};

export const getProductByUserOwn = async (
  client: SupabaseClient<Database>,
  { userId }: { userId: string }
) => {
  const { data, error } = await client
    .from("products")
    .select("name, product_id")
    .eq("profile_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};
