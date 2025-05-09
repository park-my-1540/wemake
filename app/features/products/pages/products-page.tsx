import { redirect } from "react-router";
import type { Route } from "./+types";

export function loader() {
  return redirect("/products/leaderboards");
}

export default function ProductsHomePage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-4xl font-bold mb-8'>Featured Products</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {loaderData.products.map((product: any) => (
          <div key={product.id} className='border rounded-lg p-4'>
            <h2 className='text-xl font-semibold'>{product.title}</h2>
            <p className='text-gray-600'>{product.tagline}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
