import type { Route } from "./+types";

export function loader({ request }: Route.LoaderArgs) {
  return {
    promotionPlans: [
      {
        id: "basic",
        name: "Basic Promotion",
        price: 9.99,
        features: [
          "Featured on homepage for 24 hours",
          "Social media mention",
          "Email newsletter inclusion",
        ],
      },
      {
        id: "premium",
        name: "Premium Promotion",
        price: 29.99,
        features: [
          "Featured on homepage for 7 days",
          "Social media campaign",
          "Email newsletter feature",
          "Category page promotion",
          "Leaderboard boost",
        ],
      },
      {
        id: "enterprise",
        name: "Enterprise Promotion",
        price: 99.99,
        features: [
          "Featured on homepage for 30 days",
          "Full social media campaign",
          "Email newsletter spotlight",
          "Category page feature",
          "Leaderboard boost",
          "Custom promotion strategy",
          "Analytics dashboard",
        ],
      },
    ],
  };
}

export function action({ request, formData }: Route.ActionArgs) {
  return {};
}

export function meta(): Route.MetaFunction {
  return [
    { title: "Promote Your Product | WeMake" },
    { name: "description", content: "Promote your product on WeMake" },
  ];
}

export default function PromotePage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-4xl font-bold mb-8'>Promote Your Product</h1>
      <p className='text-xl text-gray-600 mb-12'>
        Choose a promotion plan to increase visibility and reach more users
      </p>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {loaderData.promotionPlans.map((plan: any) => (
          <div
            key={plan.id}
            className='border rounded-lg p-6 hover:shadow-lg transition-shadow'
          >
            <h2 className='text-2xl font-bold mb-4'>{plan.name}</h2>
            <div className='text-3xl font-bold mb-6'>
              ${plan.price}
              <span className='text-lg text-gray-500 font-normal'>/month</span>
            </div>
            <ul className='space-y-3 mb-8'>
              {plan.features.map((feature: string, index: number) => (
                <li key={index} className='flex items-center'>
                  <svg
                    className='w-5 h-5 text-green-500 mr-2'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button className='w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'>
              Select Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
