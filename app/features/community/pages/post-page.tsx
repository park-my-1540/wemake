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

export const meta: Route.MetaFunction = ({ params }) => [
  { title: `title: ${params.postId}` },
];

export default function PostPage() {
  return (
    <div className='space-y-10'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to='/community'>커뮤니티</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to='/community?topic=productivity'>협업툴</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to='/community/postId'>어떤 협업툴이 좋을까?</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className='grid grid-cols-6 gap-40 items-start'>
        <div className='col-span-4 space-y-10'>
          <div className='flex w-full items-start gap-10'>
            <Button variant='outline' className='flex flex-col h-14'>
              <ChevronUpIcon className='size-4 shrink-0' />
              <span>123</span>
            </Button>
            <div className='space-y-20'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold'>어떤 협업툴이 좋을까?</h2>
                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                  <span>@sia</span>
                  <DotIcon className='size-4 shrink-0' />
                  <span>12 hours ago</span>
                  <DotIcon className='size-4 shrink-0' />
                  <span>10 replies</span>
                </div>
                <p className='text-muted-foreground'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam, quos. Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Quisquam, quos. Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                </p>
              </div>
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
              <div className='space-y-10'>
                <h4 className='font-semibold'>10개의 댓글</h4>
                <div className='flex flex-col gap-5'>
                  <Reply
                    username='Sia'
                    avatarUrl='https://github.com/microsoft.png'
                    content='Lorem ipsum dolor sit amet consectetur adipisicing elit.'
                    timestamp='10 hours ago'
                    topLevel={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <aside className='col-span-2 space-y-5 border rounded-lg shadow-sm p-5'>
          <div className='flex gap-5'>
            <Avatar className='size-14'>
              <AvatarImage src='https://github.com/microsoft.png' />
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
              <h4 className='text-lg font-medium'>Sia</h4>
              <Badge variant='secondary'>Entreprenuer</Badge>
            </div>
          </div>
          <div className='text-sm flex flex-col gap-2'>
            <span>Joined 10 hours ago</span>
            <span>Launched 10 products</span>
          </div>
          <Button variant='outline' className='w-full'>
            Follow
          </Button>
        </aside>
      </div>
    </div>
  );
}
