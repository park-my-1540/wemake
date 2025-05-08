import type { DateTime } from "luxon";
import client from "~/supa-client";
import { PAGE_SIZE } from "./constant";
export const getProductsByDateRange = async ({
  startDate,
  endDate,
  limit,
  page = 1,
}: {
  startDate: DateTime;
  endDate: DateTime;
  limit: number;
  page?: number;
}) => {
  const { data, error } = await client
    .from("products")
    .select(
      `product_id,name, description, upvotes:stats->>upvotes,reviews:stats->>reviews`
    )
    .order("stats->>upvotes", { ascending: false })
    .gte("created_at", startDate)
    .lte("created_at", endDate)
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  if (error) throw error;
  return data;
};

// ->> JSON내부의 key를 추출

// product의 정보를 가져오는 함수에는 query에 제한을 줘야함
export const getProductPagesByDateRange = async ({
  startDate,
  endDate,
}: {
  startDate: DateTime;
  endDate: DateTime;
}) => {
  const { count, error } = await client
    .from("products")
    .select(`product_id`, { count: "exact", head: true })
    .gte("created_at", startDate.toISO())
    .lte("created_at", endDate.toISO());
  if (error) throw error;
  if (!count) return 1;
  return Math.ceil(count / PAGE_SIZE);
};
