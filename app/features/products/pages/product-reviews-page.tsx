import { Button } from "~/components/ui/button";
import { ReviewCard } from "../components/review-card";
import { Dialog, DialogTrigger } from "~/components/ui/dialog";
import { CreateReviewDialog } from "../components/create-review-dialog";
import { useOutletContext } from "react-router";
import { getReviews } from "../queries";
import type { Route } from "./+types/product-reviews-page";

export function meta() {
  return [
    { title: "Product Reviews" },
    { name: "description", content: "View all reviews for this product" },
  ];
}

export const loader = async ({ params }: Route.ComponentProps) => {
  const reviews = await getReviews(params.productId);
  return { reviews };
};

export default function ProductReviewsPage({ loaderData }: Route.LoaderArgs) {
  const { review_count } = useOutletContext<{
    review_count: number;
  }>();

  return (
    <Dialog>
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
              avatarUrl={review.user.username}
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
