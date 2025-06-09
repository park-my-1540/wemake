import { HeroSection } from "~/common/components/hero-section";
import { z } from "zod";
import { DateTime } from "luxon";
import { redirect } from "react-router";
import { makeSSRClient } from "~/supa-client";
import { recordPromotion } from "../mutations";
import type { Route } from "./+types/promote-success-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "구매 완료" }];
};

const paramsSchema = z.object({
  paymentType: z.string(),
  orderId: z.string().uuid(),
  paymentKey: z.string(),
  amount: z.coerce.number(),
});

const TOSS_SECRET_KEY = process.env.TOSS_SECRET_KEY;

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const { success, data, error } = paramsSchema.safeParse(
    Object.fromEntries(url.searchParams)
  );

  if (!success) {
    return new Response(null, { status: 400 });
  }

  const encryptedSecretKey =
    "Basic " + Buffer.from(TOSS_SECRET_KEY + ":").toString("base64");

  /**
   * secret key 값에 클론을 붙이고 그걸 base64문자열로 변환
   * 클라이언트, github등 외부에 노출되면 안되기 때문
   * 시크릿 키를 이용하면 Toss 웹사이트와 통신 할 수 있음
   */

  const response = await fetch(
    "https://api.tosspayments.com/v1/payments/confirm",
    {
      method: "POST",
      headers: {
        Authorization: encryptedSecretKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: data.orderId,
        paymentKey: data.paymentKey,
        amount: data.amount,
      }),
    }
  );
  const responseData = await response.json();
  const metadata = responseData.metadata;

  if (!metadata) {
    return redirect(`/products/promote`);
  }

  const { client } = makeSSRClient(request);

  if (!metadata.promotionFrom || !metadata.promotionTo) {
    throw new Error("promotionFrom 또는 promotionTo가 비어 있습니다.");
  }

  await recordPromotion(client, {
    productId: Number(metadata.product),
    promotionFrom: DateTime.fromISO(metadata.promotionFrom).toISODate() ?? "",
    promotionTo: DateTime.fromISO(metadata.promotionTo).toISODate() ?? "",
  });
  return { ...metadata };
};

/**
 * 중요 : 사용자가 실제로 결제한 프로모션 일수와 계산이 맞는지 metadata로 확인
 * payments 테이블을 만들어 db에 저장해두는것도 ... vat, currency, metadata
 * TODO : 호스트 생긴 후에 cron job 만들기
 * 날마다 체크하며 해당 일자인 경우 is_Promoted : true 해서 프로모트인거 노출시키기
 */

export default function PromoteSuccessPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div>
      <HeroSection title='결제 완료' subTitle='결제해주셔서 감사합니다.' />
      <div className='flex flex-col gap-10'>
        <div className='flex flex-col gap-2 justify-center items-center'>
          <p>
            해당 상품 <strong>{loaderData.productName}</strong> 이/가
            {DateTime.fromISO(loaderData.promotionFrom).toFormat(
              "yyyy-MM-dd"
            )}{" "}
            ~ {DateTime.fromISO(loaderData.promotionTo).toFormat("yyyy-MM-dd")}{" "}
            동안 프로모션 됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
