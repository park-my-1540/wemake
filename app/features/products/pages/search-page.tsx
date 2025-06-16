import { z } from "zod";
import type { Route } from "./+types";
import { HeroSection } from "~/common/components/hero-section";
import ProductPagination from "~/components/product-pagination";
import { ProductCard } from "../components/product-card";
import { Form } from "react-router";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  getPagesBySearch,
  getProductsBySearch,
} from "~/features/products/queries";
import { makeSSRClient } from "~/supa-client";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const { client, headers } = makeSSRClient(request);
  const { success, data: parsedData } = paramsSchema.safeParse(
    Object.fromEntries(url.searchParams)
  );
  if (!success) {
    throw new Error("Invalid params");
  }

  if (parsedData.query === "") {
    return { products: [], totalPages: 1 };
  }

  const products = await getProductsBySearch(client, {
    query: parsedData.query,
    page: parsedData.page,
  });
  const totalPages = await getPagesBySearch(client, {
    query: parsedData.query,
  });
  return { products, totalPages };
}

const paramsSchema = z.object({
  query: z.string().optional().default(""),
  page: z.coerce.number().optional().default(1),
});

export const meta: Route.MetaFunction = () => [
  { title: "Search Products | WeMake" },
  { name: "description", content: "Search for products on WeMake" },
];

export default function SearchPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className='space-y-20'>
      <HeroSection title='Search for Products by title or description' />
      <Form className='flex justify-center gap-2 max-w-screen-sm items-center mx-auto'>
        <Input
          name='query'
          placeholder='Search for products'
          className='text-lg'
        />
        <Button type='submit'>Search</Button>
      </Form>
      <div className='space-y-5 w-full max-w-screen-md mx-auto mt-10'>
        {loaderData.products.map((product: any) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id}
            name={product.name}
            description={product.tagline}
            reviewsCount={Number(product.stats.reviews)}
            viewsCount={product.views}
            isPromoted={product.is_promoted}
            isUpvoted={product.is_upvoted}
            votesCount={Number(product.stats.upvotes)}
          />
        ))}
        <ProductPagination totalPages={loaderData.totalPages} />
      </div>
    </div>
  );
}
