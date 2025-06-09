import { HeroSection } from "~/common/components/hero-section";
import type { Route } from "./+types/promote-page";
import { z } from "zod";
import SelectPair from "~/common/components/select-pair";
import { Calendar } from "~/components/ui/calendar";
import { Label } from "~/components/ui/label";
import React, { useEffect, useRef, useState } from "react";
import type { DateRange } from "react-day-picker";
import { DateTime } from "luxon";
import { Button } from "~/components/ui/button";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import type { TossPaymentsWidgets } from "@tosspayments/tosspayments-sdk";
import { makeSSRClient } from "~/supa-client";
import { getProductByUserOwn } from "../queries";
import { getLoggedInUserId } from "~/features/users/queries";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "상품 홍보하기 | WeMake" },
    { name: "description", content: "WeMake에서 상품을 홍보해보세요" },
  ];
};

const formSchema = z.object({
  product: z.string().min(1, { message: "상품을 선택해주세요" }),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const product = await getProductByUserOwn(client, { userId: userId });
  return {
    userId,
    product,
  };
};

export default function PromotePage({ loaderData }: Route.ComponentProps) {
  const PRICE = 20000;
  const [promotionPeriod, setPromotionPeriod] = useState<
    DateRange | undefined
  >();
  const totalDays =
    promotionPeriod?.from && promotionPeriod?.to
      ? DateTime.fromJSDate(promotionPeriod.to).diff(
          DateTime.fromJSDate(promotionPeriod.from),
          "days"
        ).days
      : 0;

  const widgets = useRef<TossPaymentsWidgets | null>(null);
  useEffect(() => {
    const initToss = async () => {
      const toss = loadTossPayments("test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm");
      widgets.current = (await toss).widgets({
        customerKey: loaderData.userId,
      });

      await widgets.current.setAmount({
        value: 0,
        currency: "KRW",
      });

      // render
      await widgets.current.renderPaymentMethods({
        selector: "#toss-payment-methods",
      });
      await widgets.current.renderAgreement({
        selector: "#toss-payment-agreement",
      });
    };
    initToss();
  }, []);

  useEffect(() => {
    const updateAmount = async () => {
      if (widgets.current) {
        await widgets.current.setAmount({
          value: totalDays * PRICE,
          currency: "KRW",
        });
      }
    };
    updateAmount();
  }, [promotionPeriod]);

  const [errorMsg, setErrorMsg] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const { success, data, error } = formSchema.safeParse(
      Object.fromEntries(formData)
    );

    if (!success) {
      const msg = error.issues[0]?.message || "알 수 없는 오류가 발생했습니다.";
      setErrorMsg(msg);
      throw error;
    } else {
      setErrorMsg("");
    }
    const product = data?.product;

    if (!product || !promotionPeriod?.to || !promotionPeriod?.from) return;

    const productName = loaderData.product.find(
      (item) => item.product_id === Number(product)
    )?.name;
    await widgets.current?.requestPayment({
      orderId: crypto.randomUUID(),
      orderName: `WeMake Promotion`,
      customerEmail: "nico@nomadcoders.co",
      customerName: "Nico",
      customerMobilePhone: "01012345678",
      metadata: {
        //Toss서버에서 결제정보를 확인하는건 필수!
        product,
        productName,
        promotionFrom: DateTime.fromJSDate(promotionPeriod.from).toISO(),
        promotionTo: DateTime.fromJSDate(promotionPeriod.to).toISO(),
      },
      successUrl: `${window.location.href}/success`,
      failUrl: `${window.location.href}/fail`,
    });
  };

  return (
    <div>
      <HeroSection
        title='Promote Your Product'
        subTitle='상품의 노출을 높이세요'
      />
      <form className='grid grid-cols-6' onSubmit={handleSubmit}>
        <div className='col-span-3 max-w-screen-sm mx-auto flex flex-col gap-16'>
          <div className='space-y-2'>
            <SelectPair
              label='홍보하고 싶은 상품을 선택해주세요.'
              name='product'
              placeholder='상품을 선택하세요.'
              options={loaderData.product.map((product) => ({
                label: product.name,
                value: String(product.product_id),
              }))}
            />

            {errorMsg && <p className='text-red-500 text-sm'>{errorMsg}</p>}
          </div>
          <div className='flex flex-col gap-3 items-center mx-auto'>
            <Label>프로모션 기간을 선택해주세요.</Label>
            <small className='text-muted-foreground'>
              최소 기간은 3일입니다.
            </small>
            <Calendar
              mode='range'
              selected={promotionPeriod}
              onSelect={setPromotionPeriod}
              disabled={{ before: new Date() }}
              className='scale-110'
            />
          </div>
          <Button disabled={totalDays === 0} className='mx-auto w-full'>
            Checkout{" "}
            {(totalDays * PRICE).toLocaleString("ko-KR", {
              style: "currency",
              currency: "KRW",
            })}
          </Button>
        </div>
        <aside className='col-span-3'>
          <div id='toss-payment-methods'></div>
          <div id='toss-payment-agreement'></div>
        </aside>
      </form>
    </div>
  );
}
