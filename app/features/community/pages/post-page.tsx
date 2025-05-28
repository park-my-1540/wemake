import type { Route } from "./+types/post-page";
import { Button } from "~/components/ui/button";
import { Form, Link, useNavigation, useOutletContext } from "react-router";
import { makeSSRClient } from "~/supa-client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { ChevronUpIcon, DotIcon, LoaderCircle } from "lucide-react";
import { Textarea } from "~/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Reply } from "~/features/community/components/reply";
import { getPostById, getReplies } from "../queries";
import { DateTime } from "luxon";
import { getLoggedInUserId } from "~/features/users/queries";
import { z } from "zod";
import { createReply } from "~/features/teams/mutations";
import { useEffect, useRef } from "react";

export const meta: Route.MetaFunction = ({ params }) => [
  { title: `title: ${params.postId}` },
];

export const formSchema = z.object({
  reply: z.string().min(1),
  topLevelId: z.coerce.number().optional(),
});

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const { success, error, data } = formSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!success) {
    return {
      formErrors: error.flatten().fieldErrors,
    };
  }

  const { reply, topLevelId } = data;
  await createReply(client, {
    postId: Number(params.postId),
    reply,
    userId,
    topLevelId,
  });
  return {
    ok: true,
  };
};

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);

  const [post, replies] = await Promise.all([
    getPostById(client, { postId: params.postId }),
    getReplies(client, { postId: params.postId }),
  ]);

  return { post, replies };
};

export default function PostPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { isLoggedIn, name, username, avatar } = useOutletContext<{
    isLoggedIn: boolean;
    name?: string;
    username?: string;
    avatar?: string;
  }>();
  const formRef = useRef<HTMLFormElement>(null);
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";

  useEffect(() => {
    formRef.current?.reset();
  }, [actionData?.ok]);

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

              {isLoggedIn ? (
                <Form
                  ref={formRef}
                  className='flex items-start gap-5 w-3/4'
                  method='post'
                >
                  <Avatar className='size-14'>
                    <AvatarFallback>{name?.[0]}</AvatarFallback>
                    {avatar ? <AvatarImage src={avatar} /> : null}
                  </Avatar>
                  <div className='w-full flex flex-col gap-5 items-end'>
                    <Textarea
                      name='reply'
                      placeholder='댓글을 입력하세요.'
                      className='resize-none w-full'
                      rows={5}
                    />
                    <Button type='submit' disabled={isSubmitting}>
                      {isSubmitting ? (
                        <LoaderCircle className='animate-spin' />
                      ) : (
                        "댓글 작성"
                      )}
                    </Button>
                  </div>
                </Form>
              ) : (
                <p className='text-muted-foreground'>
                  댓글을 달려면 로그인하세요.
                </p>
              )}

              <div className='space-y-10'>
                <h4 className='font-semibold'>
                  {loaderData.post.replies}개의 댓글
                </h4>
                <div className='flex flex-col gap-5'>
                  {loaderData.replies.map((reply, index) => (
                    <Reply
                      key={index}
                      name={reply.user.name}
                      username={reply.user.username}
                      avatarUrl={reply.user.avatar}
                      content={reply.reply}
                      timestamp={reply.created_at}
                      topLevel={true}
                      topLevelId={reply.post_reply_id}
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
