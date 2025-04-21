import type { Route } from "./+types/dashboard-product-page";

export const meta: Route.MetaFunction = ({ params }) => [
  { title: `Product: ${params.productId}` },
];

export default function DashboardProductPage() {
  return <div></div>;
}
