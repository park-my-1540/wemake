import type { Route } from "./+types/leaderboards-page";
import { HeroSection } from "~/common/components/hero-section";
import { Button } from "~/components/ui/button";
import { ProductCard } from "../components/product-card";
import { Link } from "react-router";

export function loader({ request }: Route.LoaderArgs) {
  return {
    leaderboards: [],
  };
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [{ name: "description", content: "Top products leaderboards" }];
};

export default function LeaderboardsPage() {
  return (
    <div className='space-y-20'>
      <HeroSection
        title='Leaderboards'
        description='The most popular products on wemake'
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
        {Array.from({ length: 7 }).map((_, index) => (
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
        {Array.from({ length: 7 }).map((_, index) => (
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
        {Array.from({ length: 7 }).map((_, index) => (
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
        {Array.from({ length: 7 }).map((_, index) => (
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
        <Button variant='link' asChild className='text-lg self-center'>
          <Link to='/products/leaderboards/yearly'>
            Explore all products &rarr;
          </Link>
        </Button>
      </div>
    </div>
  );
}
