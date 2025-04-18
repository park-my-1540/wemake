import type { Route } from "./+types/submit-post-page";
import { Button } from "~/components/ui/button";
import { Form } from "react-router";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

export const meta: Route.MetaFunction = () => [
  { title: "게시글 작성" },
  { name: "description", content: "새로운 게시글을 작성합니다" },
];

export function action({ request }: Route.ActionArgs) {
  // 게시글 작성 로직
  return {};
}

export default function SubmitPostPage() {
  return (
    <div className='container mx-auto py-8'>
      <div className='max-w-2xl mx-auto'>
        <h1 className='text-3xl font-bold mb-8'>게시글 작성</h1>
        <Form method='post' className='space-y-6'>
          <div className='space-y-2'>
            <Label htmlFor='title'>제목</Label>
            <Input
              id='title'
              name='title'
              placeholder='게시글 제목을 입력하세요'
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='content'>내용</Label>
            <Textarea
              id='content'
              name='content'
              placeholder='게시글 내용을 입력하세요'
              className='min-h-[200px]'
              required
            />
          </div>
          <div className='flex justify-end gap-4'>
            <Button type='submit'>작성하기</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
