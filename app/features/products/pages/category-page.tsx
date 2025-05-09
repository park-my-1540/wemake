import { ProductCard } from "../components/product-card";
import { HeroSection } from "~/common/components/hero-section";
import { Form } from "react-router";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import ProductPagination from "~/components/product-pagination";
import type { Route } from "./+types/category-page";
import {
  getCategory,
  getCategoryPages,
  getProductsByCategory,
} from "~/features/products/queries";
import { z } from "zod";

export const meta: Route.MetaFunction = () => [
  { title: "Developer Tools | WeMake" },
  { name: "description", content: "Browse products in this category" },
];

//하나뿐이어도 validate 하는건 좋은 습관임
const paramsSchema = z.object({
  category: z.coerce.number(),
});

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || 1;
  const { data, success } = paramsSchema.safeParse(params);

  if (!success) {
    throw new Response("Invalid category", { status: 400 });
  }

  const [category, products, totalPages] = await Promise.all([
    getCategory(data.category),
    getProductsByCategory({
      categoryId: data.category,
      page: Number(page),
    }),
    getCategoryPages(data.category),
  ]);
  return { category, products, totalPages };
};

export default function CategoryPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className='space-y-20'>
      <HeroSection
        title={loaderData.category.name}
        subTitle={loaderData.category.description}
      />
      <Form className='flex justify-center gap-2 max-w-screen-sm items-center mx-auto'>
        <Input
          name='query'
          placeholder='Search for products'
          className='text-lg'
        />
        <Button type='submit'>Search</Button>
      </Form>
      <div className='space-y-5 w-full max-w-screen-md mx-auto mt-10'>
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
      <ProductPagination totalPages={loaderData.totalPages} />
    </div>
  );
}
