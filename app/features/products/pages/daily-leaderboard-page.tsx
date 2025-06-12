import { DateTime } from "luxon";
import type { Route } from "./+types/daily-leaderboard-page";
import { data, isRouteErrorResponse, Link } from "react-router";
import { z } from "zod";
import { HeroSection } from "~/common/components/hero-section";
import { ProductCard } from "../components/product-card";
import { Button } from "~/components/ui/button";
import ProductPagination from "~/components/product-pagination";
import {
  getProductPagesByDateRange,
  getProductsByDateRange,
} from "~/features/products/queries";
import { PAGE_SIZE } from "../constant";
import { makeSSRClient } from "~/supa-client";

const paramsSchema = z.object({
  year: z.coerce.number(),
  month: z.coerce.number(),
  day: z.coerce.number(),
});

export const meta: Route.MetaFunction = ({ params }) => {
  const { success, data: parsedData } = paramsSchema.safeParse(params);
  let title = "Daily Leaderboard";
  if (success) {
    const date = DateTime.fromObject({
      year: parsedData.year,
      month: parsedData.month,
      day: parsedData.day,
    })
      .setZone("Asia/Seoul")
      .setLocale("ko-KR");
    title = `The best products of ${date.toLocaleString(DateTime.DATE_MED)}`;
  }

  return [{ title: `${title} | wmake` }];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
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
  const url = new URL(request.url);
  const { client, headers } = makeSSRClient(request);

  const products = await getProductsByDateRange(client, {
    startDate: date.startOf("day"),
    endDate: date.endOf("day"),
    limit: PAGE_SIZE,
    page: Number(url.searchParams.get("page")) || 1,
  });
  const totalPages = await getProductPagesByDateRange(client, {
    startDate: date.startOf("day"),
    endDate: date.endOf("day"),
  });
  return {
    products,
    totalPages,
    ...parseData,
  };
};

export default function DailyLeaderboardPage({
  loaderData,
}: Route.ComponentProps) {
  if (!loaderData) {
    throw new Error("Loader data is undefined");
  }

  const { year, month, day } = loaderData;
  const urlDate = DateTime.fromObject({ year, month, day });

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
      <div className='w-full max-w-screen-md mx-auto mt-10'>
        {loaderData.products.map((product, index) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id}
            name={product.name}
            description={product.tagline}
            reviewsCount={Number(product.stats.reviews)}
            viewsCount={Number(product.stats.views)}
            isPromoted={product.is_promoted}
            isUpvoted={product.is_upvoted}
            votesCount={Number(product.upvotes)}
          />
        ))}
      </div>
      <ProductPagination totalPages={loaderData.totalPages} />
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
