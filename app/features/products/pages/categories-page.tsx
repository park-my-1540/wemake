import type { Route } from "./+types";

export function loader({ request }: Route.LoaderArgs) {
  return {
    categories: [],
  };
}

export function action({ request, formData }: Route.ActionArgs) {
  return {};
}

export function meta(): Route.MetaFunction {
  return [
    { title: "Categories | WeMake" },
    { name: "description", content: "Browse products by category" },
  ];
}

export default function CategoriesPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-4xl font-bold mb-8'>Categories</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {loaderData.categories.map((category: any) => (
          <a
            key={category.id}
            href={`/product/categories/${category.slug}`}
            className='block border rounded-lg p-6 hover:shadow-lg transition-shadow'
          >
            <h2 className='text-2xl font-semibold mb-2'>{category.name}</h2>
            <p className='text-gray-600'>{category.description}</p>
            <div className='mt-4 text-sm text-gray-500'>
              {category.productCount} products
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
