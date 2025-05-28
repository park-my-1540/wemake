import { Line } from "recharts";
import { CartesianGrid, XAxis } from "recharts";
import { LineChart } from "recharts";
import type { Route } from "./+types/dashboard-page";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "~/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";

const chartConfig = {
  views: {
    label: "👁️",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export const meta: Route.MetaFunction = () => [{ title: "Dashboard" }];

export const loader = async ({
  request,
  params,
}: Route.LoaderArgs & { params: { productId: string } }) => {
  const { client, headers } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);

  const { data, error } = await client.rpc("get_dashboard_stats", {
    user_id: userId,
  });

  if (error) {
    throw error;
  }
  return {
    chartData: data,
  };
};

export default function DashboardPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className='space-y-5 h-full'>
      <h1 className='text-2xl font-semibold mb-6'>Dashboard</h1>
      <Card className='w-1/2'>
        <CardHeader>
          <CardTitle>Product Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
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
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey='views'
                type='natural'
                stroke='var(--color-views)'
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
