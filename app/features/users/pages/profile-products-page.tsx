import { ProductCard } from "~/features/products/components/product-card";
import type { Route } from "./+types/profile-products-page";
import { getUserProducts } from "../queries";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = ({ params }) => [
  { title: `Products - ${params.username}` },
];
export const loader = async ({
  request,
  params,
}: Route.LoaderArgs & { params: { username: string } }) => {
  const { client, headers } = makeSSRClient(request);
  const products = await getUserProducts(client, {
    username: params.username,
  });
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
          isPromoted={product.is_promoted}
          isUpvoted={product.is_upvoted}
          votesCount={Number(product.upvotes)}
        />
      ))}
    </div>
  );
}
