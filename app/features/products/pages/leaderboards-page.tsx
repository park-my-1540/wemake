import type { Route } from "./+types/leaderboards-page";
import { HeroSection } from "~/common/components/hero-section";
import { Button } from "~/components/ui/button";
import { ProductCard } from "../components/product-card";
import { Link } from "react-router";
import { DateTime } from "luxon";
import { getProductsByDateRange } from "~/features/products/queries";

export const loader = async () => {
  const [dailyProducts, weeklyProducts, monthlyProducts, yearlyProducts] =
    await Promise.all([
      getProductsByDateRange({
        startDate: DateTime.now().startOf("day"),
        endDate: DateTime.now().endOf("day"),
        limit: 7,
      }),
      getProductsByDateRange({
        startDate: DateTime.now().startOf("week"),
        endDate: DateTime.now().endOf("week"),
        limit: 7,
      }),
      getProductsByDateRange({
        startDate: DateTime.now().startOf("month"),
        endDate: DateTime.now().endOf("month"),
        limit: 7,
      }),
      getProductsByDateRange({
        startDate: DateTime.now().startOf("year"),
        endDate: DateTime.now().endOf("year"),
        limit: 7,
      }),
    ]);
  return { dailyProducts, weeklyProducts, monthlyProducts, yearlyProducts };
};

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [{ name: "description", content: "Top products leaderboards" }];
};

export default function LeaderboardsPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className='space-y-20'>
      <HeroSection
        title='Leaderboards'
        subTitle='The most popular products on wemake'
      />
      <div className='grid grid-cols-3 gap-4'>
        <div>
          <h2 className='text-3xl font-bold leading-tight tracking-tight'>
            Daily Leaderboard
          </h2>
          <p className='text-xl font-light text-foreground'>
            The most popular products made by day
          </p>
        </div>
        {loaderData.dailyProducts.map((product, index) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id}
            name={product.name}
            description={product.description}
            reviewsCount={Number(product.reviews)}
            viewsCount={Number(product.views)}
            votesCount={Number(product.upvotes)}
          />
        ))}
        <Button variant='link' asChild className='text-lg self-center'>
          <Link to='/products/leaderboards/daily'>
            Explore all products &rarr;
          </Link>
        </Button>
      </div>
      <div className='grid grid-cols-3 gap-4'>
        <div>
          <h2 className='text-3xl font-bold leading-tight tracking-tight'>
            Weekly Leaderboard
          </h2>
          <p className='text-xl font-light text-foreground'>
            The most popular products made by week
          </p>
        </div>
        {loaderData.weeklyProducts.map((product, index) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id}
            name={product.name}
            description={product.description}
            reviewsCount={Number(product.reviews)}
            viewsCount={Number(product.views)}
            votesCount={Number(product.upvotes)}
          />
        ))}
        <Button variant='link' asChild className='text-lg self-center'>
          <Link to='/products/leaderboards/weekly'>
            Explore all products &rarr;
          </Link>
        </Button>
      </div>
      <div className='grid grid-cols-3 gap-4'>
        <div>
          <h2 className='text-3xl font-bold leading-tight tracking-tight'>
            Monthly Leaderboard
          </h2>
          <p className='text-xl font-light text-foreground'>
            The most popular products made by month
          </p>
        </div>
        {loaderData.monthlyProducts.map((product, index) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id}
            name={product.name}
            description={product.description}
            reviewsCount={Number(product.reviews)}
            viewsCount={Number(product.views)}
            votesCount={Number(product.upvotes)}
          />
        ))}
        <Button variant='link' asChild className='text-lg self-center'>
          <Link to='/products/leaderboards/monthly'>
            Explore all products &rarr;
          </Link>
        </Button>
      </div>
      <div className='grid grid-cols-3 gap-4'>
        <div>
          <h2 className='text-3xl font-bold leading-tight tracking-tight'>
            Yearly Leaderboard
          </h2>
          <p className='text-xl font-light text-foreground'>
            The most popular products made by year
          </p>
        </div>
        {loaderData.yearlyProducts.map((product, index) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id}
            name={product.name}
            description={product.description}
            reviewsCount={Number(product.reviews)}
            viewsCount={Number(product.views)}
            votesCount={Number(product.upvotes)}
          />
        ))}
        <Button variant='link' asChild className='text-lg self-center'>
          <Link to='/products/leaderboards/yearly'>
            Explore all products &rarr;
          </Link>
        </Button>
      </div>
    </div>
  );
}
