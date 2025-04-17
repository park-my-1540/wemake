import { DateTime } from "luxon";
import type { Route } from "./+types/monthly-leaderboard-page";
import { data, isRouteErrorResponse, Link } from "react-router";
import { z } from "zod";
import { HeroSection } from "~/common/components/hero-section";
import { ProductCard } from "../components/product-card";
import { Button } from "~/components/ui/button";
import ProductPagination from "~/components/product-pagination";

const paramsSchema = z.object({
  year: z.coerce.number(),
  month: z.coerce.number(),
});

export const meta: Route.MetaFunction = ({ params }) => {
  const { success, data: parsedData } = paramsSchema.safeParse(params);
  let title = "Weekly Leaderboard";
  if (success) {
    const date = DateTime.fromObject({
      year: parsedData.year,
      month: parsedData.month,
    })
      .setZone("Asia/Seoul")
      .setLocale("ko-KR");
    title = `The best products of ${date.toLocaleString({ month: "long", year: "2-digit" })}`;
  }

  return [{ title: `${title} | wmake` }];
};

export const loader = ({ params }: Route.LoaderArgs) => {
  const { success, data: parseData } = paramsSchema.safeParse(params);
  if (!success) {
    throw data(
      { error_code: "invalid_params", message: "Invalid params" },
      { status: 400 }
    );
  }

  const date = DateTime.fromObject({
    year: parseData.year,
    month: parseData.month,
  }).setZone("Asia/Seoul");

  if (!date.isValid) {
    throw data(
      { error_code: "invalid_date", message: "Invalid date" },
      { status: 500 }
    );
  }
  const today = DateTime.now().setZone("Asia/Seoul").startOf("month");
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

export default function WeeklyLeaderboardPage({
  loaderData,
}: Route.ComponentProps) {
  if (!loaderData) {
    throw new Error("Loader data is undefined");
  }
  const urlDate = DateTime.fromObject({
    year: loaderData.year,
    month: loaderData.month,
  });
  const previousMonth = urlDate.minus({ months: 1 });
  const nextMonth = urlDate.plus({ months: 1 });
  const isToday = urlDate.equals(DateTime.now().startOf("month"));

  return (
    <div>
      <HeroSection
        title={`Best of ${urlDate.toLocaleString({ month: "long", year: "2-digit" })}`}
      />
      <div className='flex justify-center items-center gap-2'>
        <Button variant='secondary' asChild>
          <Link
            to={`/products/leaderboards/monthly/${previousMonth.year}/${previousMonth.month}`}
          >
            &larr;
            {previousMonth.toLocaleString({ month: "long", year: "2-digit" })}
          </Link>
        </Button>
        {!isToday && (
          <Button variant='secondary' asChild className='disabled:opacity-50'>
            <Link
              to={`/products/leaderboards/monthly/${nextMonth.year}/${nextMonth.month}`}
            >
              {nextMonth.toLocaleString({ month: "long", year: "2-digit" })}
              &rarr;
            </Link>
          </Button>
        )}
      </div>
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
