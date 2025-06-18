import { adminClient } from "~/supa-client";
import { updateCreatedAt, updatePromotedDate } from "../mutations";
import type { Route } from "../pages/+types/product-reviews-page";

const today = new Date();

const dailyProducts = [1, 3, 4, 5, 6, 11];
const monthlyProducts = [12, 13, 14, 15, 16]; // 일자는 그대로 월만 변경

const isMonthly = today.getDate() === 1;

export const action = async ({ request }: Route.LoaderArgs) => {
  //   endpoint 보호
  if (request.method !== "POST") {
    return new Response(null, { status: 404 });
  }

  // //   필요한 헤더 있는지
  const headers = request.headers.get("X-POTATO");
  if (!headers || headers !== "X-POTATO") {
    return new Response("Unauthorized", { status: 401 });
  }

  // 매일: 오늘 날짜로 갱신
  await updateCreatedAt(adminClient, {
    productIds: dailyProducts,
  });

  // 매달 1일: 월만 바꿔서 갱신
  if (isMonthly) {
    await updateCreatedAt(adminClient, {
      productIds: monthlyProducts,
      updateOnlyMonth: true,
    });
    await updatePromotedDate(adminClient, {
      productIds: [...monthlyProducts, ...dailyProducts],
    });
  }

  return Response.json({ ok: true });
};
