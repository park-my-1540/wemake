import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Textarea } from "~/components/ui/textarea";
import type { Route } from "./+types/new-product-review-page.types";

export function loader({ params }: Route.LoaderArgs) {
  const { productId } = params;
  return {
    productId,
  };
}

export async function action({ request, params }: Route.ActionArgs) {
  const { productId } = params;
  const formData = await request.formData();
  const content = formData.get("content");

  // TODO: 리뷰 저장 로직 구현
  return { success: true };
}

export function meta(): Route.MetaFunction {
  return [
    { title: "Write a Review" },
    { name: "description", content: "Write a new review for this product" },
  ];
}

export default function NewProductReviewPage({
  loaderData,
}: Route.ComponentProps) {
  const { productId } = loaderData;

  return (
    <div className='container mx-auto py-8'>
      <Card>
        <CardHeader>
          <CardTitle>Write a Review</CardTitle>
        </CardHeader>
        <CardContent>
          <form method='post' className='space-y-4'>
            <div className='space-y-2'>
              <label htmlFor='content' className='text-sm font-medium'>
                Your Review
              </label>
              <Textarea
                id='content'
                name='content'
                placeholder='Share your thoughts about this product...'
                className='min-h-[200px]'
                required
              />
            </div>
            <div className='flex justify-end space-x-4'>
              <Button variant='outline' asChild>
                <a href={`/products/${productId}/reviews`}>Cancel</a>
              </Button>
              <Button type='submit'>Submit Review</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
