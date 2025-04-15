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
    { title: "Submit Product | WeMake" },
    { name: "description", content: "Submit your product to WeMake" },
  ];
}

export default function SubmitPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-4xl font-bold mb-8'>Submit Your Product</h1>

      <form method='post' className='max-w-2xl space-y-6'>
        <div>
          <label
            htmlFor='title'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Product Title
          </label>
          <input
            type='text'
            id='title'
            name='title'
            required
            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>

        <div>
          <label
            htmlFor='description'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Description
          </label>
          <textarea
            id='description'
            name='description'
            required
            rows={4}
            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>

        <div>
          <label
            htmlFor='category'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Category
          </label>
          <select
            id='category'
            name='category'
            required
            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value=''>Select a category</option>
            {loaderData.categories.map((category: any) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor='url'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Product URL
          </label>
          <input
            type='url'
            id='url'
            name='url'
            required
            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>

        <button
          type='submit'
          className='w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          Submit Product
        </button>
      </form>
    </div>
  );
}
