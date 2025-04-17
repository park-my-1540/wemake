import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { Route } from "./+types/product-reviews-page.types";

export function loader({ params }: Route.LoaderArgs) {
  const { productId } = params;
  return {
    productId,
  };
}

export function meta(): Route.MetaFunction {
  return [
    { title: "Product Reviews" },
    { name: "description", content: "View all reviews for this product" },
  ];
}

export default function ProductReviewsPage({
  loaderData,
}: Route.ComponentProps) {
  const { productId } = loaderData;

  return (
    <div className='container mx-auto py-8'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle>Product Reviews</CardTitle>
          <Button asChild>
            <a href={`/products/${productId}/reviews/new`}>Write a Review</a>
          </Button>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <p>Product ID: {productId}</p>
            {/* 리뷰 목록이 여기에 들어갈 예정입니다 */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
