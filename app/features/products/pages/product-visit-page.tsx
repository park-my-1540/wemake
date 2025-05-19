/**
 * UI가 없는 페이지임.
 * URL에서 product id를 가져오고 db에서 정보를 찾은 후
 * 이벤트 생성 후
 * 해당 제품의 URL을 찾아서, 유저를 그 URL로 보낼것임.
 */

import client from "~/supa-client";
import type { Route } from "./+types/product-visit-page";
import { redirect } from "react-router";

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { error, data } = await client
    .from("products")
    .select("url")
    .eq("product_id", params.productId)
    .single();

  if (data) {
    await client.rpc("track_event", {
      event_type: "product_visit",
      event_data: {
        product_id: params.productId,
      },
    });
    return redirect(data.url);
  }
};
