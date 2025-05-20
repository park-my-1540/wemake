import { HeroSection } from "~/common/components/hero-section";
import type { Route } from "./+types/categories-page";
import { getCategories } from "~/features/products/queries";
import { CategoryCard } from "../components/category/category-card";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => [
  { title: "Category | WeMake" },
  { name: "description", content: "Browse products in this category" },
];

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const categories = await getCategories(client);
  return { categories };
};
export default function CategoryPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className='space-y-20'>
      <HeroSection
        title='Categories'
        subTitle='Browse products in this category'
      />
      <div className='grid grid-cols-4 gap-10'>
        {loaderData.categories.map((category) => (
          <CategoryCard
            key={`category-${category.category_id}`}
            id={category.category_id}
            name={category.name}
            description={category.description}
          />
        ))}
      </div>
    </div>
  );
}
