import { DotIcon, MessageCircleIcon } from "lucide-react";
import { Form, Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useState } from "react";
import { Textarea } from "~/components/ui/textarea";
interface ReplyProps {
  username: string;
  avatarUrl: string;
  content: string;
  timestamp: string;
  topLevel: boolean;
}

export function Reply({
  username,
  avatarUrl,
  content,
  timestamp,
  topLevel = false,
}: ReplyProps) {
  const [replying, setReplying] = useState(false);
  const toggleReplying = () => setReplying((prev) => !prev);
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-start gap-5 w-2/3'>
        <Avatar className='size-14'>
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{username.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className='flex flex-col gap-2 items-start'>
          <div className='flex items-center gap-2'>
            <Link to={`/users/@${username}`}>
              <h4 className='font-medium'>{username}</h4>
            </Link>
            <DotIcon className='size-5' />
            <span className='text-xs text-muted-foreground'>{timestamp}</span>
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
      {topLevel && (
        <div className='pl-20 w-full'>
          <Reply
            username='Sia'
            avatarUrl='https://github.com/microsoft.png'
            content='Lorem ipsum dolor sit amet consectetur adipisicing elit.'
            timestamp='10 hours ago'
            topLevel={false}
          />
        </div>
      )}
    </div>
  );
}
