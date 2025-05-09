import type { Route } from "./+types/post-page";
import { Button } from "~/components/ui/button";
import { Form, Link } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { ChevronUpIcon, DotIcon } from "lucide-react";
import { Textarea } from "~/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Reply } from "~/features/community/components/reply";
import { getPostById, getReplies } from "../queries";
import { DateTime } from "luxon";

export const meta: Route.MetaFunction = ({ params }) => [
  { title: `title: ${params.postId}` },
];

export const loader = async ({
  params,
}: Route.LoaderArgs & { params: { postId: string } }) => {
  const post = await getPostById(params.postId);
  const replies = await getReplies(params.postId);
  return { post, replies };
};

export default function PostPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className='space-y-10'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to='/community'>Community</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/community?topic=${loaderData.post.topic_slug}`}>
                {loaderData.post.topic_name}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/community/postId`}>{loaderData.post.title}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className='grid grid-cols-6 gap-40 items-start'>
        <div className='col-span-4 space-y-10'>
          <div className='flex w-full items-start gap-10'>
            <Button variant='outline' className='flex flex-col h-14'>
              <ChevronUpIcon className='size-4 shrink-0' />
              <span>{loaderData.post.upvotes}</span>
            </Button>
            <div className='space-y-20 w-full'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold'>{loaderData.post.title}</h2>
                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                  <span>{loaderData.post.author_name}</span>
                  <DotIcon className='size-4 shrink-0' />
                  <span>
                    {DateTime.fromISO(loaderData.post.created_at).toRelative()}
                  </span>
                  <DotIcon className='size-4 shrink-0' />
                  <span>{loaderData.post.replies}개의 댓글</span>
                </div>
                <p className='text-muted-foreground'>
                  {loaderData.post.content}
                </p>
              </div>
              <Form className='flex items-start gap-5 w-3/4'>
                <Avatar className='size-14'>
                  <AvatarFallback>
                    {loaderData.post.author_name[0]}
                  </AvatarFallback>
                  {loaderData.post.author_avatar ? (
                    <AvatarImage src={loaderData.post.author_avatar} />
                  ) : null}
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
              <div className='space-y-10'>
                <h4 className='font-semibold'>
                  {loaderData.post.replies}개의 댓글
                </h4>
                <div className='flex flex-col gap-5'>
                  {loaderData.replies.map((reply) => (
                    <Reply
                      username={reply.user.name}
                      avatarUrl={reply.user.avatar}
                      content={reply.reply}
                      timestamp={reply.created_at}
                      topLevel={true}
                      replies={reply.post_replies}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <aside className='col-span-2 space-y-5 border rounded-lg shadow-sm p-5'>
          <div className='flex gap-5'>
            <Avatar className='size-14'>
              <AvatarFallback>{loaderData.post.author_name[0]}</AvatarFallback>
              {loaderData.post.author_avatar ? (
                <AvatarImage src={loaderData.post.author_avatar} />
              ) : null}
            </Avatar>
            <div className='flex flex-col'>
              <h4 className='text-lg font-medium'>
                {loaderData.post.author_name}
              </h4>
              <Badge variant='secondary'>{loaderData.post.author_role}</Badge>
            </div>
          </div>
          <div className='text-sm flex flex-col gap-2'>
            <span>
              🎂 Joined{" "}
              {DateTime.fromISO(loaderData.post.author_created_at).toRelative()}{" "}
            </span>
            <span>🚀 Launched {loaderData.post.products} products</span>
          </div>
          <Button variant='outline' className='w-full'>
            팔로우
          </Button>
        </aside>
      </div>
    </div>
  );
}
