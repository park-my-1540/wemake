import { Button } from "~/components/ui/button";

import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogFooter,
} from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";
import { StarIcon } from "lucide-react";
import { useState } from "react";

export function CreateReviewDialog() {
  const [rating, setRating] = useState<number>(0);
  const [hoverStart, setHoverStar] = useState<number>(0);
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>이 상품에 대해서 어떻게 생각하세요?</DialogTitle>
      </DialogHeader>
      <Form className='space-y-10'>
        <div>
          <Label className='flex flex-col gap-2'>
            Rating{" "}
            <small className='text-muted-foreground'>
              이 제품을 어떻게 평가하시나요?
            </small>
          </Label>
          <div className='flex gap-2 mt-5'>
            {[1, 2, 3, 4, 5].map((star) => (
              <label
                key={star}
                className='relative pr-2'
                onMouseEnter={() => setHoverStar(Number(star))}
                onMouseLeave={() => setHoverStar(0)}
              >
                <StarIcon
                  className='size-5 text-yellow-500'
                  fill={
                    hoverStart >= star || rating >= star
                      ? "currentColor"
                      : "none"
                  }
                />
                <input
                  className='opacity-0 h-px w-px absolute'
                  onClick={() => setRating(Number(star))}
                />
              </label>
            ))}
          </div>
        </div>
        <InputPair
          required
          textArea
          label='Review'
          placeholder='의견을 적어주세요.'
          description='리뷰는 최대 1000자입니다.'
        />
        <DialogFooter>
          <Button type='submit'>등록</Button>
        </DialogFooter>
      </Form>
    </DialogContent>
  );
}
