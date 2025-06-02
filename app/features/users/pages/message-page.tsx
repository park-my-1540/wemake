import type { Route } from "./+types/message-page";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Form, useOutletContext } from "react-router";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { SendIcon } from "lucide-react";
import { MessageBubble } from "../components/message-bubble";
import { makeSSRClient } from "~/supa-client";
import {
  getLoggedInUserId,
  getMessagesByMessagesRoomId,
  getRoomsParticipants,
} from "../queries";

export const meta: Route.MetaFunction = ({ params }) => [
  { title: `Message: ${params.messageId}` },
];

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = await makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const messages = await getMessagesByMessagesRoomId(client, {
    messageRoomId: params.messageRoomId,
    userId,
  });
  const participants = await getRoomsParticipants(client, {
    messageRoomId: params.messageRoomId,
    userId,
  });

  return {
    messages,
    participants,
  };
};

export default function MessagePage({ loaderData }: Route.ComponentProps) {
  const { userId } = useOutletContext<{ userId: string }>();
  return (
    <div className='h-full flex flex-col justify-between'>
      <Card>
        <CardHeader className='flex flex-row items-center gap-4'>
          <Avatar className='size-12'>
            <AvatarImage src={loaderData.participants?.profile?.avatar ?? ""} />
            <AvatarFallback>
              {loaderData.participants?.profile?.name?.charAt(0) ?? ""}
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col gap-1'>
            <CardTitle className='text-xl'>
              {loaderData.participants?.profile?.name ?? ""}
            </CardTitle>
            <CardDescription>2일전</CardDescription>
          </div>
        </CardHeader>
      </Card>
      <div className='py-10 overflow-y-auto space-y-4 flex flex-col justify-start h-full'>
        {loaderData.messages.map((message) => (
          <MessageBubble
            key={message.message_id}
            avatarUrl={message.sender.avatar}
            name={message.sender.name}
            content={message.content}
            isCurrentUser={message.sender.profile_id === userId}
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
