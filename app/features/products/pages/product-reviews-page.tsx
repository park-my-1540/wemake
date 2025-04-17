import { Button } from "~/components/ui/button";
import { ReviewCard } from "../components/review-card";
import { Dialog, DialogTrigger } from "~/components/ui/dialog";
import { CreateReviewDialog } from "../components/create-review-dialog";
export function meta() {
  return [
    { title: "Product Reviews" },
    { name: "description", content: "View all reviews for this product" },
  ];
}

export default function ProductReviewsPage({}) {
  return (
    <Dialog>
      <div className='space-y-10 max-w-xl'>
        <div className='flex justify-between items-center'>
          <h2 className='text-2xl font-bold'>10 Reviews</h2>
          <DialogTrigger asChild>
            <Button variant='secondary'>리뷰쓰기</Button>
          </DialogTrigger>
        </div>
        <div className='space-y-20'>
          {Array.from({ length: 10 }).map((_, index) => (
            <ReviewCard
              username='John Doe'
              userHandle='username'
              avatarUrl='https://github.com/elonmusk.png'
              rating={2}
              content='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
              postedAt='10 days ago'
            />
          ))}
        </div>
      </div>
      <CreateReviewDialog />
    </Dialog>
  );
}
