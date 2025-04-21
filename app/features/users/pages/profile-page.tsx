import type { Route } from "./+types/profile-page";

export const meta: Route.MetaFunction = ({ params }) => [
  { title: `Profile: ${params.username}` },
];

export default function ProfilePage() {
  return <div></div>;
}
