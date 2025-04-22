import { ProductCard } from "../components/product-card";
import { HeroSection } from "~/common/components/hero-section";
import { Form } from "react-router";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import ProductPagination from "~/components/product-pagination";
import type { Route } from "./+types/category-page";

export function meta(): Route.MetaFunction {
  return [
    { title: "Developer Tools | WeMake" },
    { name: "description", content: "Browse products in this category" },
  ];
}

export default function CategoryPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div className='space-y-20'>
      <HeroSection
        title='Developer Tools'
        subTitle='Tools for developers to build products faster'
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
      <ProductPagination
        totalPages={10}
        currentPage={1}
        onPageChange={() => {}}
      />
    </div>
  );
}
