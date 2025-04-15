import type { Route } from "./+types";

export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "";

  return {
    query,
    results: [],
  };
}

export function action({ request, formData }: Route.ActionArgs) {
  return {};
}

export function meta(): Route.MetaFunction {
  return [
    { title: "Search Products | WeMake" },
    { name: "description", content: "Search for products on WeMake" },
  ];
}

export default function SearchPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-4xl font-bold mb-8'>Search Products</h1>

      <form method='get' className='mb-8'>
        <div className='flex gap-4'>
          <input
            type='text'
            name='q'
            defaultValue={loaderData.query}
            placeholder='Search products...'
            className='flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <button
            type='submit'
            className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            Search
          </button>
        </div>
      </form>

      {loaderData.query && (
        <div>
          <h2 className='text-2xl font-semibold mb-4'>
            Results for "{loaderData.query}"
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {loaderData.results.map((product: any) => (
              <div key={product.id} className='border rounded-lg p-4'>
                <h3 className='text-xl font-semibold mb-2'>{product.title}</h3>
                <p className='text-gray-600 mb-4'>{product.description}</p>
                <div className='flex justify-between items-center'>
                  <div className='text-sm text-gray-500'>
                    {product.votes} votes
                  </div>
                  <a
                    href={`/product/${product.id}`}
                    className='text-blue-600 hover:text-blue-800'
                  >
                    View Details
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
