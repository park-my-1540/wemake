import { MessageCircleIcon } from "lucide-react";
import type { Route } from "./+types/message-page";

export const meta: Route.MetaFunction = ({ params }) => [
  { title: `Message: ${params.messageId}` },
];

export default function MessagePage() {
  return (
    <div className='h-full flex flex-col gap-4 items-center justify-center'>
      <MessageCircleIcon className='w-10 h-10 text-muted-foreground' />
      <h1 className='text-xl font-semibold text-muted-foreground'>
        메세지를 보려면 사이드바에서 클릭하세요.
      </h1>
    </div>
  );
}
