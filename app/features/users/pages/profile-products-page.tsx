import { ProductCard } from "~/features/products/components/product-card";
import type { Route } from "./+types/profile-products-page";

export const meta: Route.MetaFunction = ({ params }) => [
  { title: `Products - ${params.username}` },
];

export default function ProfileProductsPage() {
  return (
    <div className='flex flex-col gap-5'>
      {Array.from({ length: 10 }).map((_, index) => (
        <ProductCard
          key={index}
          id='productsId'
          name='Product Name'
          description='Product Description'
          commentCount={12}
          viewCount={12}
          upvoteCount={120}
        />
      ))}
    </div>
  );
}
