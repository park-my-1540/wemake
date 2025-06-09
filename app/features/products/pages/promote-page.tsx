import { HeroSection } from "~/common/components/hero-section";
import type { Route } from "./+types/promote-page";
import { Form } from "react-router";
import SelectPair from "~/common/components/select-pair";
import { Calendar } from "~/components/ui/calendar";
import { Label } from "~/components/ui/label";
import { useEffect, useRef, useState } from "react";
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
    { title: "Promote Your Product | WeMake" },
    { name: "description", content: "Promote your product on WeMake" },
  ];
};

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
    if (widgets.current) {
      widgets.current.setAmount({
        value: totalDays * PRICE,
        currency: "KRW",
      });
    }
  }, [promotionPeriod]);

  return (
    <div>
      <HeroSection
        title='Promote Your Product'
        subTitle='Promote your product on WeMake'
      />
      <div className='grid grid-cols-6'>
        <Form className='col-span-3 max-w-screen-sm mx-auto flex flex-col gap-8'>
          <SelectPair
            label='Select a product'
            description='원하는 상품을 선택하세요.'
            name='category'
            placeholder='상품을 선택하세요.'
            options={loaderData.product.map((product) => ({
              label: product.name,
              value: product.name,
            }))}
          />
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
        </Form>
        <aside className='col-span-3'>
          <div id='toss-payment-methods'></div>
          <div id='toss-payment-agreement'></div>
        </aside>
      </div>
    </div>
  );
}
