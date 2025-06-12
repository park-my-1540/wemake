import {
  Outlet,
  NavLink,
  Link,
  useFetcher,
  useOutletContext,
} from "react-router";
import { ChevronUpIcon, StarIcon } from "lucide-react";
import { Button, buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { getProductById } from "~/features/products/queries";
import type { Route } from "../pages/+types/product-overview-page";
import { makeSSRClient } from "~/supa-client";

type dataType = {
  data: {
    product: {
      name: string;
    };
  };
};

export function meta({ data }: dataType) {
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

type ProductOverviewProps = {
  loaderData: { product: Product };
};
interface Product {
  product_id: number;
  name: string;
  tagline: string;
  average_rating: number;
  reviews: number;
  upvotes: number;
  how_it_works: string;
  icon: string;
}

export default function ProductOverviewLayout({
  loaderData,
}: ProductOverviewProps) {
  const fetcher = useFetcher();
  const { isLoggedIn } = useOutletContext<{ isLoggedIn: boolean }>();
  return (
    <div className='space-y-10'>
      <div className='flex justify-between'>
        <div className='flex gap-10'>
          <div className='size-40 rounded-xl shadow-xl bg-white overflow-hidden'>
            <img
              src={loaderData.product.icon}
              alt={loaderData.product.name}
              className='size-full object-cover'
            />
          </div>
          <div>
            <h1 className='text-5xl font-bold'>{loaderData.product.name}</h1>
            <p className='text-2xl font-light'>{loaderData.product.tagline}</p>
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
          <fetcher.Form
            method='post'
            action={`/products/${loaderData.product.product_id}/upvote`}
          >
            <Button
              size='lg'
              className={cn({
                "md:text-lg w-full md:w-auto h-10 md:h-14 px-10 flex items-center gap-2":
                  true,
                "border-white bg-white text-primary hover:bg-white/90":
                  loaderData.product.is_upvoted,
              })}
            >
              <ChevronUpIcon className='size-4' />
              추천 ({loaderData.product.upvotes})
            </Button>
          </fetcher.Form>
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
          isLoggedIn: isLoggedIn,
        }}
      />
    </div>
  );
}
