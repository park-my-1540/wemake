import { Button } from "~/components/ui/button";
import { ReviewCard } from "../components/review-card";
import { Dialog, DialogTrigger } from "~/components/ui/dialog";
import { CreateReviewDialog } from "../components/create-review-dialog";
import { useOutletContext } from "react-router";
import { getReviews } from "../queries";
import type { Route } from "./+types/product-reviews-page";
import { z } from "zod";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { createProductReview } from "../mutations";
import { useEffect, useState } from "react";

// TODO
export function meta() {
  return [
    { title: "Product Reviews" },
    { name: "description", content: "View all reviews for this product" },
  ];
}
const formSchema = z.object({
  rating: z.coerce.number().min(1).max(5),
  review: z.string().min(1),
});
export const action = async ({ request, params }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!success) {
    return {
      fieldErrors: error.flatten().fieldErrors,
    };
  }
  await createProductReview(client, {
    productId: Number(params.productId),
    userId,
    rating: data.rating,
    review: data.review,
  });
  return {
    ok: true,
  };
};
export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const reviews = await getReviews(client, {
    productId: Number(params.productId),
  });
  return { reviews };
};

export default function ProductReviewsPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { review_count } = useOutletContext<{
    review_count: number;
  }>();

  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (actionData?.ok) {
      setOpen(false);
    }
  }, [actionData]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className='space-y-10 max-w-xl'>
        <div className='flex justify-between items-center'>
          <h2 className='text-2xl font-bold'>{review_count}개의 리뷰</h2>
          <DialogTrigger asChild>
            <Button variant='secondary'>리뷰쓰기</Button>
          </DialogTrigger>
        </div>
        <div className='space-y-20'>
          {loaderData.reviews.map((review) => (
            <ReviewCard
              key={review.review_id}
              username={review.user.name}
              userHandle={review.user.username}
              avatarUrl={review.user.avatar}
              rating={review.rating}
              content={review.review}
              postedAt={review.created_at}
            />
          ))}
        </div>
      </div>
      <CreateReviewDialog />
    </Dialog>
  );
}
