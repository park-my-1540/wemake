import { Form } from "react-router";
import type { Route } from "./+types/submit-team-page";
import { HeroSection } from "~/common/components/hero-section";
import { Button } from "~/components/ui/button";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
export const meta: Route.MetaFunction = () => [{ title: "Submit Team" }];

export default function SubmitTeamPage() {
  return (
    <div className='space-y-20'>
      <HeroSection
        title='Create Team'
        description='Create a team to find a team mate'
      />
      <Form className='max-w-screen-xl mx-auto flex items-center flex-col gap-10'>
        <div className='grid grid-cols-3 gap-10 w-full'>
          <InputPair
            placeholder='ex) Doggy Social'
            id='name'
            label='제품명은 무엇입니까?'
            description='20자 이내'
            maxLength={20}
            type='text'
            required
          />
          <SelectPair
            label='당신의 제품은 어떤 단계입니까?'
            description='제품의 단계를 선택하세요'
            name='product-stage'
            placeholder='제품의 단계를 선택하세요'
            options={[
              { label: "아이디어", value: "idea" },
              { label: "프로토타입", value: "prototype" },
              { label: "MVP", value: "mvp" },
              { label: "Product", value: "product" },
            ]}
          />
          <InputPair
            id='size'
            label='팀의 규모는 얼마입니까?'
            description='(1-100)'
            max={100}
            min={1}
            type='number'
            required
          />
          <InputPair
            id='equity'
            label='팀원에게 어느 정도의 지분을 줄 예정입니까?'
            description='(each)'
            max={100}
            min={1}
            type='number'
            required
          />
          <InputPair
            id='roles'
            label='어떤 역할을 찾고 있습니까?'
            description='(쉼표로 구분됩니다)'
            type='text'
            required
            placeholder='ex) 프론트엔드 개발자, 백엔드 개발자, 디자이너'
          />
          <InputPair
            id='description'
            placeholder='ex) 우리는 강아지들이 서로 소통하는 미디어 플랫폼을 구축하고 있습니다.'
            label='제품에 대한 설명은 무엇입니까?'
            description='(200자 이내)'
            type='text'
            required
            textArea
          />
        </div>
        <Button type='submit' className='w-full max-w-sm'>
          팀 생성하기
        </Button>
      </Form>
    </div>
  );
}
