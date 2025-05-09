import { DotIcon, MessageCircleIcon } from "lucide-react";
import { Form, Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useState } from "react";
import { Textarea } from "~/components/ui/textarea";
import { DateTime } from "luxon";
interface ReplyProps {
  username: string;
  avatarUrl: string | null;
  content: string;
  timestamp: string;
  topLevel: boolean;
  replies?: {
    post_reply_id: number;
    reply: string;
    created_at: string;
    user: {
      name: string;
      avatar: string | null;
      username: string;
    };
  }[];
}

export function Reply({
  username,
  avatarUrl,
  content,
  timestamp,
  topLevel = false,
  replies,
}: ReplyProps) {
  const [replying, setReplying] = useState(false);
  const toggleReplying = () => setReplying((prev) => !prev);
  return (
    <div className='flex flex-col gap-2 w-full'>
      <div className='flex items-start gap-5 w-2/3'>
        <Avatar className='size-14'>
          {avatarUrl ? <AvatarImage src={avatarUrl} /> : null}
          <AvatarFallback>{username.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className='flex flex-col gap-2 items-start w-full'>
          <div className='flex items-center gap-2'>
            <Link to={`/users/@${username}`}>
              <h4 className='font-medium'>{username}</h4>
            </Link>
            <DotIcon className='size-5' />
            <span className='text-xs text-muted-foreground'>
              {DateTime.fromISO(timestamp).toRelative()}
            </span>
          </div>

          <p className='text-muted-foreground'>{content}</p>
          <Button variant='ghost' className='self-end' onClick={toggleReplying}>
            <MessageCircleIcon className='size-4 shrink-0' />
            <span>답댓글 달기</span>
          </Button>
        </div>
      </div>
      {replying && (
        <Form className='flex items-start gap-5 w-3/4'>
          <Avatar className='size-14'>
            <AvatarImage src='https://github.com/microsoft.png' />
            <AvatarFallback>N</AvatarFallback>
          </Avatar>
          <div className='w-full flex flex-col gap-5 items-end'>
            <Textarea
              placeholder='댓글을 입력하세요.'
              className='resize-none w-full'
              rows={5}
            />
            <Button type='submit'>댓글 작성</Button>
          </div>
        </Form>
      )}
      {topLevel && replies && (
        <div className='pl-20 w-full'>
          {replies.map((reply) => (
            <Reply
              username={reply.user.name}
              avatarUrl={reply.user.avatar}
              content={reply.reply}
              timestamp={reply.created_at}
              topLevel={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}
