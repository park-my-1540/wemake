import type { Route } from "./+types/dashboard-page";

export const meta: Route.MetaFunction = () => [{ title: "Dashboard" }];

export default function DashboardPage() {
  return <div></div>;
}
