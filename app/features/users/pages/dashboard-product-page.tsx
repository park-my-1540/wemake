import { Area, AreaChart } from "recharts";
import { CartesianGrid, XAxis } from "recharts";
import type { Route } from "./+types/dashboard-page";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "~/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "../queries";
import { redirect } from "react-router";

const chartConfig = {
  views: {
    label: "Page Views",
    color: "hsl(var(--chart-1))",
  },
  visitors: {
    label: "Visitors",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export const meta: Route.MetaFunction = () => [{ title: "Dashboard" }];
export const loader = async ({
  request,
  params,
}: Route.LoaderArgs & { params: { productId: string } }) => {
  const { client, headers } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);

  // 검증 사용자가 만든 상품인지
  const { error } = await client
    .from("products")
    .select("product_id")
    .eq("profile_id", userId)
    .eq("product_id", params.productId)
    .single();

  if (error) {
    throw redirect("/my/dashboard/products");
  }
  const { data, error: rcpError } = await client.rpc("get_product_stats", {
    product_id: params.productId,
  });

  if (rcpError) {
    throw rcpError;
  }
  return {
    chartData: data,
  };
};

export default function DashboardProductPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className='space-y-5 h-full'>
      <h1 className='text-2xl font-semibold mb-6'>Analytics</h1>
      <Card className='w-1/2'>
        <CardHeader>
          <CardTitle>Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={loaderData.chartData}
              margin={{
                top: 12,
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='month'
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                padding={{ left: 15, right: 15 }}
              />
              <ChartTooltip
                cursor={false}
                wrapperStyle={{
                  minWidth: "150px",
                }}
                content={<ChartTooltipContent hideLabel />}
              />
              <Area
                dataKey='product_views'
                type='natural'
                stroke='var(--color-views)'
                fill='var(--color-views)'
                strokeWidth={2}
                dot={false}
              />
              <Area
                dataKey='product_visits'
                type='natural'
                stroke='var(--color-visitors)'
                fill='var(--color-visitors)'
                strokeWidth={2}
                dot={false}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
