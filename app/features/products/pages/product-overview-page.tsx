import { ChevronUpIcon, Link, StarIcon } from "lucide-react";
import type { Route } from "./+types/product-overview-page.types";
import { Button } from "~/components/ui/button";

export function meta(): Route.MetaFunction {
  return [
    { title: "Product Overview" },
    { name: "description", content: "View product details and information" },
  ];
}

export default function ProductOverviewPage({
  params: { productId },
}: Route.ComponentProps) {
  return (
    <div className='space-y-10'>
      <div className='space-y-2'>
        <h3 className='text-2xl font-bold'>What is this product?</h3>
        <p className='text-muted-foreground'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
        </p>
      </div>
      <div className='space-y-2'>
        <h3 className='text-2xl font-bold'>How does it work?</h3>
        <p className='text-muted-foreground'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
        </p>
      </div>
    </div>
  );
}
