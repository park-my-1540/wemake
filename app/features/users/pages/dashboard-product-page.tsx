import { Area, AreaChart, Line } from "recharts";
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

const chartData = [
  { month: "January", views: 186, visitors: 100 },
  { month: "February", views: 305, visitors: 33 },
  { month: "March", views: 237, visitors: 300 },
  { month: "April", views: 73, visitors: 200 },
  { month: "May", views: 209, visitors: 500 },
  { month: "June", views: 214, visitors: 100 },
];
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

export default function DashboardProductPage() {
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
              data={chartData}
              margin={{
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
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                wrapperStyle={{
                  minWidth: "150px",
                }}
                content={<ChartTooltipContent hideLabel />}
              />
              <Area
                dataKey='views'
                type='natural'
                stroke='var(--color-views)'
                fill='var(--color-views)'
                strokeWidth={2}
                dot={false}
              />
              <Area
                dataKey='visitors'
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
