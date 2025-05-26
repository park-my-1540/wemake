import type { Route } from "./+types/submit-post-page";
import { Button } from "~/components/ui/button";
import { Form, redirect } from "react-router";
import { HeroSection } from "~/common/components/hero-section";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { getTopics } from "../queries";
import { z } from "zod";
import { createPost } from "~/features/users/mutations";

export const meta: Route.MetaFunction = () => [{ title: "게시글 작성" }];

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const topics = await getTopics(client);
  return { topics };
};

const formSchema = z.object({
  title: z.string().min(1).max(40),
  topic: z.string().min(1).max(100),
  content: z.string().min(1).max(1000),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const { success, error, data } = formSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!success) {
    return {
      fieldErrors: error.flatten().fieldErrors,
    };
  }

  const { title, topic, content } = data;
  const { post_id } = await createPost(client, {
    title,
    topic,
    content,
    userId,
  });

  return redirect(`/community/${post_id}`);
};

export default function SubmitPostPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div className='space-y-20'>
      <HeroSection
        title='게시글 작성'
        subTitle='게시글을 작성하면 모든 사용자가 볼 수 있습니다.'
      />
      <Form
        className='flex flex-col gap-10 max-w-screen-md mx-auto'
        method='post'
      >
        <InputPair
          label='제목'
          name='title'
          id='title'
          description='제목을 입력하세요'
          required
          placeholder='ex) 협업툴 어떤게 좋은가?'
        />
        {actionData && "fieldErrors" in actionData && (
          <div className='text-red-500'>
            {actionData.fieldErrors.title?.join(", ")}
          </div>
        )}
        <SelectPair
          label='카테고리'
          name='topic'
          description='토픽을 선택하세요'
          placeholder='토픽을 선택하세요'
          options={loaderData.topics.map((topic) => ({
            label: topic.name,
            value: topic.slug,
          }))}
        />
        <InputPair
          label='내용'
          name='content'
          id='content'
          textArea
          description='1000자 이내로 작성'
          required
          placeholder='내용을 작성해주세요.'
        />
        {actionData && "fieldErrors" in actionData && (
          <div className='text-red-500'>
            {actionData.fieldErrors.content?.join(", ")}
          </div>
        )}
        <Button type='submit' className='mx-auto'>
          게시글 작성
        </Button>
      </Form>
    </div>
  );
}
