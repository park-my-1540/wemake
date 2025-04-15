import type { Route } from "./+types";

export function loader({ request, params }: Route.LoaderArgs) {
  return {
    year: params.year,
    month: params.month,
    week: params.week,
    products: [],
  };
}

export function action({ request, formData }: Route.ActionArgs) {
  return {};
}

export function meta(): Route.MetaFunction {
  return [
    { title: "Weekly Leaderboard | WeMake" },
    { name: "description", content: "Top products of the week" },
  ];
}

export default function WeeklyLeaderboardPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-4xl font-bold mb-8'>
        Top Products of Week {loaderData.week}, {loaderData.month}/
        {loaderData.year}
      </h1>
      <div className='space-y-4'>
        {loaderData.products.map((product: any, index: number) => (
          <div
            key={product.id}
            className='border rounded-lg p-4 flex items-center'
          >
            <span className='text-2xl font-bold w-12'>{index + 1}</span>
            <div className='flex-1'>
              <h2 className='text-xl font-semibold'>{product.title}</h2>
              <p className='text-gray-600'>{product.description}</p>
            </div>
            <div className='text-right'>
              <div className='text-2xl font-bold'>{product.score}</div>
              <div className='text-sm text-gray-500'>points</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
