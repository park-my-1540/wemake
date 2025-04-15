import type { Route } from "./+types";

export function loader({ request, params }: Route.LoaderArgs) {
  return {
    category: {
      name: "",
      description: "",
      products: [],
    },
  };
}

export function action({ request, formData }: Route.ActionArgs) {
  return {};
}

export function meta(): Route.MetaFunction {
  return [
    { title: "Category | WeMake" },
    { name: "description", content: "Browse products in this category" },
  ];
}

export default function CategoryPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-4xl font-bold mb-4'>{loaderData.category.name}</h1>
      <p className='text-gray-600 mb-8'>{loaderData.category.description}</p>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {loaderData.category.products.map((product: any) => (
          <div key={product.id} className='border rounded-lg p-4'>
            <h2 className='text-xl font-semibold mb-2'>{product.title}</h2>
            <p className='text-gray-600 mb-4'>{product.description}</p>
            <div className='flex justify-between items-center'>
              <div className='text-sm text-gray-500'>{product.votes} votes</div>
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
  );
}
