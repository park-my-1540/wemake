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
import { browserClient, makeSSRClient } from "~/supa-client";
import {
  getLoggedInUserId,
  getMessagesByMessagesRoomId,
  getRoomsParticipant,
} from "../queries";
import { sendMessageToRoom } from "../mutations";
import { z } from "zod";
import { useEffect, useRef, useState } from "react";
import type { Database } from "database.types";

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
  const participant = await getRoomsParticipant(client, {
    messageRoomId: params.messageRoomId,
    userId,
  });

  return {
    messages,
    participant,
  };
};

const formSchema = z.object({
  message: z.string().min(1),
});

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { client } = await makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();

  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!success) {
    return { formErrors: error.flatten().fieldErrors };
  }

  await sendMessageToRoom(client, {
    messageRoomId: Number(params.messageRoomId),
    userId,
    message: data.message,
  });
  return {
    ok: true,
  };
};

export default function MessagePage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [messages, setMessages] = useState(loaderData.messages);

  const { userId, name, avatar } = useOutletContext<{
    userId: string;
    name: string;
    avatar: string;
  }>();

  useEffect(() => {
    if (actionData?.ok) {
      formRef.current?.reset();
    }
  }, [actionData?.ok]);

  /**
   * event를 구독하는것. 서버사이드에선 못함
   * 웹 소캣 커넥트는 서버사이드에서 못함
   * 로더에는 realtime websocket connect를 생성하고 유지할만큼의 충분한 저장공간이 없기 때문에
   * browserClient를 이용함.
   */
  useEffect(() => {
    const changes = browserClient
      .channel(`room:${userId}-${loaderData.participant?.profile?.profile_id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          setMessages((prev) => [
            ...prev,
            payload.new as Database["public"]["Tables"]["messages"]["Row"],
          ]);
        }
      )
      .subscribe();

    return () => {
      changes.unsubscribe();
    };
  }, []);

  /**
   * form 이 submit 하는 순간, action이 trigger 됨.
   *  action이 종료되면, framework는 loader function을 다시 실행
   * => message를 전송한 사람이 새 message를 realtime으로 볼 수 있는 이유.
   *
   * 이 동작은 원하면 비활성화 할수 잇음
   * route의 revalidate 시점을 정할 수 있음.
   * 재검증 시점
   * - form submit
   * - fetcher : get/post 동작
   */

  return (
    <div className='h-full flex flex-col justify-between'>
      <Card>
        <CardHeader className='flex flex-row items-center gap-4'>
          <Avatar className='size-12'>
            <AvatarImage src={loaderData.participant?.profile?.avatar ?? ""} />
            <AvatarFallback>
              {loaderData.participant?.profile?.name?.charAt(0) ?? ""}
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col gap-1'>
            <CardTitle className='text-xl'>
              {loaderData.participant?.profile?.name ?? ""}
            </CardTitle>
            <CardDescription>2일전</CardDescription>
          </div>
        </CardHeader>
      </Card>
      <div className='py-10 overflow-y-auto space-y-4 flex flex-col justify-start h-full'>
        {messages.map((message) => (
          <MessageBubble
            key={message.message_id}
            avatarUrl={
              message.sender_id === userId
                ? avatar
                : (loaderData.participant?.profile?.avatar ?? "")
            }
            avatarFallback={
              message.sender_id === userId
                ? name.charAt(0)
                : (loaderData.participant?.profile.name.charAt(0) ?? "")
            }
            content={message.content}
            isCurrentUser={message.sender_id === userId}
          />
        ))}
      </div>
      <Card>
        <CardHeader>
          <Form
            ref={formRef}
            method='post'
            className='relative flex justify-end'
          >
            <Textarea
              className='resize-none'
              placeholder='메시지를 입력하세요'
              rows={2}
              name='message'
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  formRef.current?.requestSubmit();
                }
              }}
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

/**
 * route가 revalidate되기전에 호출됨.
 * browser에게 현재 route가 revalidate 되어야 하는지 알려줌
 *
 * 분석이나 트래킹 하기위해 event를 전송하지만
 * 그게 page를 revalidate하는 것은 원하지 않는다면 사용
 *
 * false => message를 보내더라고 (form post) 하더라도 page revalidation을 하지 않겟다
 */
export const shouldRevalidate = () => false;
