import { redirect } from "react-router";
import type { Route } from "./+types/product-redirect-page.types";

export function loader({ params }: Route.LoaderArgs) {
  const { productId } = params;
  return redirect(`/products/${productId}/overview`);
}

export function meta(): Route.MetaFunction {
  return [
    { title: "Product Redirect" },
    { name: "description", content: "Redirecting to product overview" },
  ];
}
