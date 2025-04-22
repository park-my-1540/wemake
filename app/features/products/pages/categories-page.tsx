import { HeroSection } from "~/common/components/hero-section";
import type { Route } from "./+types/categories-page";
import { CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Card } from "~/components/ui/card";
import { ChevronRightIcon } from "lucide-react";
import { Link } from "react-router";
import { CategoryCard } from "../components/category/category-card";

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
    <div className='space-y-20'>
      <HeroSection
        title='Categories'
        subTitle='Browse products in this category'
      />
      <div className='grid grid-cols-4 gap-10'>
        {Array.from({ length: 10 }).map((_, index) => (
          <CategoryCard
            key={`category-${index}`}
            id={`categoryId-${index}`}
            name={`Category Name`}
            description={`Category Description`}
          />
        ))}
      </div>
    </div>
  );
}
