import type { Route } from "./+types/leaderboards-page";
import { HeroSection } from "~/common/components/hero-section";
import { Button } from "~/components/ui/button";
import { ProductCard } from "../components/product-card";
import { Link } from "react-router";
import { DateTime } from "luxon";
import { getProductsByDateRange } from "~/features/products/queries";
import { makeSSRClient } from "~/supa-client";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const [dailyProducts, weeklyProducts, monthlyProducts, yearlyProducts] =
    await Promise.all([
      getProductsByDateRange(client, {
        startDate: DateTime.now().startOf("day"),
        endDate: DateTime.now().endOf("day"),
        limit: 7,
      }),
      getProductsByDateRange(client, {
        startDate: DateTime.now().startOf("week"),
        endDate: DateTime.now().endOf("week"),
        limit: 7,
      }),
      getProductsByDateRange(client, {
        startDate: DateTime.now().startOf("month"),
        endDate: DateTime.now().endOf("month"),
        limit: 7,
      }),
      getProductsByDateRange(client, {
        startDate: DateTime.now().startOf("year"),
        endDate: DateTime.now().endOf("year"),
        limit: 7,
      }),
    ]);
  return { dailyProducts, weeklyProducts, monthlyProducts, yearlyProducts };
};

export const meta: Route.MetaFunction = () => {
  return [{ name: "description", content: "Top products leaderboards" }];
};

export default function LeaderboardsPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className='space-y-20'>
      <HeroSection
        title='제품 인기 순위'
        subTitle='wemake에서 가장 인기 있는 제품들'
      />
      <div className='grid md:grid-cols-3 gap-4 grid-cols-1'>
        <div>
          <h2 className='text-3xl font-bold leading-tight tracking-tight'>
            오늘의 인기 제품
          </h2>
          <p className='text-xl font-light text-foreground'>
            매일 wemake에서 가장 인기 있는 제품입니다.
          </p>
        </div>
        {loaderData.dailyProducts.map((product, index) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id}
            name={product.name}
            description={product.tagline}
            reviewsCount={Number(product.stats.reviews)}
            viewsCount={Number(product.stats.views)}
            isPromoted={product.is_promoted}
            isUpvoted={product.is_upvoted}
            votesCount={Number(product.stats.upvotes)}
          />
        ))}
        <Button variant='link' asChild className='text-lg self-center'>
          <Link to='/products/leaderboards/daily'>모든 제품 보기 &rarr;</Link>
        </Button>
      </div>
      <div className='grid md:grid-cols-3 gap-4 grid-cols-1'>
        <div>
          <h2 className='text-3xl font-bold leading-tight tracking-tight'>
            주간 인기 순위
          </h2>
          <p className='text-xl font-light text-foreground'>
            매주 wemake에서 가장 인기 있는 제품입니다.
          </p>
        </div>
        {loaderData.weeklyProducts.map((product, index) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id}
            name={product.name}
            description={product.tagline}
            reviewsCount={Number(product.stats.reviews)}
            viewsCount={Number(product.stats.views)}
            isPromoted={product.is_promoted}
            isUpvoted={product.is_upvoted}
            votesCount={Number(product.stats.upvotes)}
          />
        ))}
        <Button variant='link' asChild className='text-lg self-center'>
          <Link to='/products/leaderboards/weekly'>모든 제품 보기 &rarr;</Link>
        </Button>
      </div>
      <div className='grid md:grid-cols-3 gap-4 grid-cols-1'>
        <div>
          <h2 className='text-3xl font-bold leading-tight tracking-tight'>
            월간 인기 순위
          </h2>
          <p className='text-xl font-light text-foreground'>
            매월 wemake에서 가장 인기 있는 제품입니다.
          </p>
        </div>
        {loaderData.monthlyProducts.map((product, index) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id}
            name={product.name}
            description={product.tagline}
            reviewsCount={Number(product.stats.reviews)}
            viewsCount={Number(product.stats.views)}
            isPromoted={product.is_promoted}
            isUpvoted={product.is_upvoted}
            votesCount={Number(product.stats.upvotes)}
          />
        ))}
        <Button variant='link' asChild className='text-lg self-center'>
          <Link to='/products/leaderboards/monthly'>모든 제품 보기 &rarr;</Link>
        </Button>
      </div>
      <div className='grid md:grid-cols-3 gap-4 grid-cols-1'>
        <div>
          <h2 className='text-3xl font-bold leading-tight tracking-tight'>
            연간 인기 순위
          </h2>
          <p className='text-xl font-light text-foreground'>
            매년 wemake에서 가장 인기 있는 제품입니다.
          </p>
        </div>
        {loaderData.yearlyProducts.map((product, index) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id}
            name={product.name}
            description={product.tagline}
            reviewsCount={Number(product.stats.reviews)}
            viewsCount={Number(product.stats.views)}
            isPromoted={product.is_promoted}
            isUpvoted={product.is_upvoted}
            votesCount={Number(product.stats.upvotes)}
          />
        ))}
        <Button variant='link' asChild className='text-lg self-center'>
          <Link to='/products/leaderboards/yearly'>모든 제품 보기 &rarr;</Link>
        </Button>
      </div>
    </div>
  );
}
