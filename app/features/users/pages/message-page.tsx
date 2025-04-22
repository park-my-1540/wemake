import type { Route } from "./+types/message-page";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Form } from "react-router";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { SendIcon } from "lucide-react";
import { MessageBubble } from "../components/message-bubble";
export const meta: Route.MetaFunction = ({ params }) => [
  { title: `Message: ${params.messageId}` },
];

export default function MessagePage() {
  return (
    <div className='h-full flex flex-col justify-between'>
      <Card>
        <CardHeader className='flex flex-row items-center gap-4'>
          <Avatar className='size-12'>
            <AvatarImage src='https://github.com/nico.png' />
            <AvatarFallback>N</AvatarFallback>
          </Avatar>
          <div className='flex flex-col gap-1'>
            <CardTitle>Nico</CardTitle>
            <CardDescription>2일전</CardDescription>
          </div>
        </CardHeader>
      </Card>
      <div className='py-10 overflow-y-auto flex flex-col justify-start h-full'>
        {Array.from({ length: 1 }).map((_, index) => (
          <MessageBubble
            avatarUrl='https://github.com/nico.png'
            name='Nico'
            content='this is a message from Nico'
            isCurrentUser={index % 2 === 0}
          />
        ))}
      </div>
      <Card>
        <CardHeader>
          <Form className='relative flex justify-end '>
            <Textarea
              className='resize-none'
              placeholder='메시지를 입력하세요'
              rows={2}
            />
            <Button
              type='submit'
              size='icon'
              className='absolute right-2 top-3'
            >
              <SendIcon className='size-4' />
            </Button>
          </Form>
        </CardHeader>
      </Card>
    </div>
  );
}
