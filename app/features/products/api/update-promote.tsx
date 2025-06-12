import { adminClient } from "~/supa-client";
import { updatePromotion } from "../mutations";
import type { Route } from "../pages/+types/product-reviews-page";

export const action = async ({ request }: Route.ActionArgs) => {
  //   endpoint 보호
  if (request.method !== "POST") {
    return new Response(null, { status: 404 });
  }

  //   필요한 헤더 있는지
  const headers = request.headers.get("X-POTATO");
  if (!headers || headers !== "X-TOMATO") {
    return new Response("Unauthorized", { status: 401 });
  }
  await updatePromotion(adminClient);
  return Response.json({ ok: true });
};
