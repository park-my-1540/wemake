import type { Route } from "./+types";

export function loader({ request }: Route.LoaderArgs) {
  return {
    leaderboards: [],
  };
}

export function action({ request, formData }: Route.ActionArgs) {
  return {};
}

export function meta(): Route.MetaFunction {
  return [
    { title: "Leaderboards | WeMake" },
    { name: "description", content: "Top products on WeMake" },
  ];
}

export default function LeaderboardsPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-4xl font-bold mb-8'>Leaderboards</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='border rounded-lg p-6'>
          <h2 className='text-2xl font-semibold mb-4'>Yearly</h2>
          <ul className='space-y-2'>
            {loaderData.leaderboards.map((item: any) => (
              <li key={item.id} className='flex justify-between items-center'>
                <span>{item.title}</span>
                <span className='text-gray-600'>{item.score}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className='border rounded-lg p-6'>
          <h2 className='text-2xl font-semibold mb-4'>Monthly</h2>
          <ul className='space-y-2'>
            {loaderData.leaderboards.map((item: any) => (
              <li key={item.id} className='flex justify-between items-center'>
                <span>{item.title}</span>
                <span className='text-gray-600'>{item.score}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
