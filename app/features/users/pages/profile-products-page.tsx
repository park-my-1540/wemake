import { ProductCard } from "~/features/products/components/product-card";
import type { Route } from "./+types/profile-products-page";
import { getUserProducts } from "../queries";

export const meta: Route.MetaFunction = ({ params }) => [
  { title: `Products - ${params.username}` },
];
export const loader = async ({
  params,
}: Route.LoaderArgs & { params: { username: string } }) => {
  const products = await getUserProducts(params.username);
  return { products };
};
export default function ProfileProductsPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className='flex flex-col gap-5'>
      {loaderData.products.map((product) => (
        <ProductCard
          key={product.product_id}
          id={product.product_id}
          name={product.name}
          description={product.tagline}
          reviewsCount={Number(product.reviews)}
          viewsCount={Number(product.views)}
          votesCount={Number(product.upvotes)}
        />
      ))}
    </div>
  );
}
