import type { Route } from "./+types/submit-post-page";
import { Button } from "~/components/ui/button";
import { Form } from "react-router";
import { HeroSection } from "~/common/components/hero-section";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
export const meta: Route.MetaFunction = () => [{ title: "게시글 작성" }];

export default function SubmitPostPage() {
  return (
    <div className='space-y-20'>
      <HeroSection
        title='게시글 작성'
        subTitle='게시글을 작성하면 모든 사용자가 볼 수 있습니다.'
      />
      <Form className='flex flex-col gap-10 max-w-screen-md mx-auto'>
        <InputPair
          label='제목'
          name='title'
          id='title'
          description='제목을 입력하세요'
          required
          placeholder='ex) 협업툴 어떤게 좋은가?'
        />
        <SelectPair
          label='카테고리'
          name='category'
          description='카테고리를 선택하세요'
          placeholder='ex) 협업툴'
          options={[
            { label: "협업툴", value: "collaboration" },
            { label: "개발", value: "development" },
            { label: "디자인", value: "design" },
          ]}
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
        <Button type='submit' className='mx-auto'>
          게시글 작성
        </Button>
      </Form>
    </div>
  );
}
