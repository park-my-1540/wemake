import { DateTime } from "luxon";
import type { Route } from "./+types/daily-leaderboard-page";
import { data, isRouteErrorResponse, Link } from "react-router";
import { z } from "zod";
import { HeroSection } from "~/common/components/hero-section";
import { ProductCard } from "../components/product-card";
import { Button } from "~/components/ui/button";
import ProductPagination from "~/components/product-pagination";

const paramsSchema = z.object({
  year: z.coerce.number(),
  month: z.coerce.number(),
  day: z.coerce.number(),
});

export const loader = ({ params }: Route.LoaderArgs) => {
  const { success, data: parseData } = paramsSchema.safeParse(params);
  if (!success) {
    throw data(
      { error_code: "invalid_params", message: "Invalid params" },
      { status: 400 }
    );
  }

  const date = DateTime.fromObject(parseData).setZone("Asia/Seoul");

  if (!date.isValid) {
    throw data(
      { error_code: "invalid_date", message: "Invalid date" },
      { status: 500 }
    );
  }
  const today = DateTime.now().setZone("Asia/Seoul").startOf("day");
  if (date > today) {
    throw data(
      { error_code: "future_date", message: "Future date" },
      { status: 500 }
    );
  }
  return {
    ...parseData,
  };
};

export default function DailyLeaderboardPage({
  loaderData,
}: Route.ComponentProps) {
  if (!loaderData) {
    throw new Error("Loader data is undefined");
  }
  const urlDate = DateTime.fromObject(loaderData);
  const previousDay = urlDate.minus({ days: 1 });
  const nextDay = urlDate.plus({ days: 1 });
  const isToday = urlDate.hasSame(DateTime.now(), "day");

  return (
    <div>
      <HeroSection
        title={`The best products of ${urlDate.toLocaleString(DateTime.DATE_MED)}`}
      />
      <div className='flex justify-center items-center gap-2'>
        <Button variant='secondary' asChild>
          <Link
            to={`/products/leaderboards/daily/${previousDay.year}/${previousDay.month}/${previousDay.day}`}
          >
            &larr;{previousDay.toLocaleString(DateTime.DATE_MED)}
          </Link>
        </Button>
        {!isToday && (
          <Button variant='secondary' asChild className='disabled:opacity-50'>
            <Link
              to={`/products/leaderboards/daily/${nextDay.year}/${nextDay.month}/${nextDay.day}`}
            >
              {nextDay.toLocaleString(DateTime.DATE_MED)}&rarr;
            </Link>
          </Button>
        )}
      </div>
      <div className='space-y-5 w-full max-w-screen-md mx-auto'>
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

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        {error.data.message} / {error.data.error_code}
      </div>
    );
  }
  if (error instanceof Error) {
    return <div>{error.message}</div>;
  }
  return <div>Unknown error</div>;
}
