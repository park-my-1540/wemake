import { HeroSection } from "~/common/components/hero-section";
import type { Route } from "./+types/promote-page";
import { Form } from "react-router";
import SelectPair from "~/common/components/select-pair";
import { Calendar } from "~/components/ui/calendar";
import { Label } from "~/components/ui/label";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { DateTime } from "luxon";
import { Button } from "~/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Promote Your Product | WeMake" },
    { name: "description", content: "Promote your product on WeMake" },
  ];
};

export default function PromotePage({}: Route.ComponentProps) {
  const [promotionPeriod, setPromotionPeriod] = useState<DateRange[]>([]);
  const totalDays =
    promotionPeriod?.from && promotionPeriod?.to
      ? DateTime.fromJSDate(promotionPeriod.to).diff(
          DateTime.fromJSDate(promotionPeriod.from),
          "days"
        ).days
      : 0;

  return (
    <div>
      <HeroSection
        title='Promote Your Product'
        description='Promote your product on WeMake'
      />
      <Form className='max-w-screen-sm mx-auto flex flex-col gap-8'>
        <SelectPair
          label='Select a product'
          description='원하는 상품을 선택하세요.' // 이거 한글로 알려줘
          name='category'
          placeholder='상품을 선택하세요.'
          options={[
            { label: "AI Dark Mode Maker", value: "ai dark mode maker" },
            { label: "AI Dark Mode Maker-1", value: "ai dark mode maker-1" },
            { label: "AI Dark Mode Maker-2", value: "ai dark mode maker-2" },
          ]}
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
            minDuration={3}
            disabled={{ before: new Date() }}
          />
        </div>
        <Button disabled={totalDays === 0} className='mx-auto'>
          Go to Checkout ${totalDays * 20}
        </Button>
      </Form>
    </div>
  );
}
