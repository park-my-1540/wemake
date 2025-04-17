import { z } from "zod";
import type { Route } from "./+types";
import { HeroSection } from "~/common/components/hero-section";
import ProductPagination from "~/components/product-pagination";
import { ProductCard } from "../components/product-card";
import { Form } from "react-router";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Link } from "react-router";
import { ChevronRightIcon } from "lucide-react";

export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const { success, data } = paramsSchema.safeParse(
    Object.fromEntries(url.searchParams)
  );
  if (!success) {
    throw new Error("Invalid params");
  }
  return {
    ...data,
  };
}

export function action({ request, formData }: Route.ActionArgs) {
  return {};
}

const paramsSchema = z.object({
  query: z.string().optional().default(""),
  page: z.coerce.number().optional().default(1),
});

export function meta(): Route.MetaFunction {
  return [
    { title: "Search Products | WeMake" },
    { name: "description", content: "Search for products on WeMake" },
  ];
}

export default function SearchPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
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
        <Link to='/products/categories/15321' className='block'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center justify-between'>
                ㅁㄴㅁㄴㅇㄹ
                <ChevronRightIcon className='size-6' />
              </CardTitle>
              <CardDescription className='text-base'>
                ㅁㄴㅇㄹㅁㄴㄹ
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
      <ProductPagination
        totalPages={10}
        currentPage={1}
        onPageChange={() => {}}
      />
    </div>
  );
}
