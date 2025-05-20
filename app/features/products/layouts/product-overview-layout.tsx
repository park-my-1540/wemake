import { Outlet, NavLink, Link } from "react-router";
import { ChevronUpIcon, StarIcon } from "lucide-react";
import { Button, buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { getProductById } from "~/features/products/queries";
import type { Route } from "../pages/+types/product-overview-page";
import { makeSSRClient } from "~/supa-client";

export function meta({ data }: Route.MetaFunction) {
  return [
    { title: `${data.product.name} Overview` },
    { name: "description", content: "View product details and information" },
  ];
}

export const loader = async ({
  request,
  params,
}: Route.LoaderArgs & { params: { productId: string } }) => {
  const { client, headers } = makeSSRClient(request);
  const product = await getProductById(client, { productId: params.productId });
  return { product };
};

export default function ProductOverviewLayout({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className='space-y-10'>
      <div className='flex justify-between'>
        <div className='flex gap-10'>
          <div className='size-40 rounded-xl shadow-xl bg-primary/50'></div>
          <div>
            <h1 className='text-5xl font-bold'>{loaderData.product.name}</h1>
            <p className=' text-2xl font-light'>{loaderData.product.tagline}</p>
            <div className='mt-5 flex items-center gap-2'>
              <div className='flex text-yellow-500'>
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon
                    key={index}
                    className='size-4'
                    fill={
                      index < Math.floor(loaderData.product.average_rating)
                        ? "currentColor"
                        : "none"
                    }
                  />
                ))}
              </div>
              <span className='text-base text-muted-foreground'>
                {loaderData.product.reviews}개의 리뷰
              </span>
            </div>
          </div>
        </div>
        <div className='flex gap-5'>
          <Button
            variant='secondary'
            size='lg'
            className='text-lg h-14 px-10'
            asChild
          >
            <Link to={`/products/${loaderData.product.product_id}/visit`}>
              웹사이트 방문
            </Link>
          </Button>
          <Button size='lg' className='text-lg h-14 px-10'>
            <ChevronUpIcon className='size-4' />
            추천 ({loaderData.product.upvotes})
          </Button>
        </div>
      </div>
      <div className='flex gap-2'>
        <NavLink
          className={({ isActive }) =>
            cn(buttonVariants({ variant: "outline" }), isActive && "bg-accent")
          }
          to={`/products/${loaderData.product.product_id}/overview`}
        >
          상세정보
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            cn(buttonVariants({ variant: "outline" }), isActive && "bg-accent")
          }
          to={`/products/${loaderData.product.product_id}/reviews`}
        >
          리뷰
        </NavLink>
      </div>
      <Outlet
        context={{
          product_id: loaderData.product.product_id,
          description: loaderData.product.tagline,
          how_it_works: loaderData.product.how_it_works,
          review_count: loaderData.product.reviews,
        }}
      />
    </div>
  );
}
