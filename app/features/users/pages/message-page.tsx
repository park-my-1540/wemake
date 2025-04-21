import type { Route } from "./+types/message-page";

export const meta: Route.MetaFunction = ({ params }) => [
  { title: `Message: ${params.messageId}` },
];

export default function MessagePage() {
  return <div></div>;
}
