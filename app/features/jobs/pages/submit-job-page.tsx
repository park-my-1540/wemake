import InputPair from "~/common/components/input-pair";
import type { Route } from "./+types/submit-job-page";
import { HeroSection } from "~/common/components/hero-section";
import SelectPair from "~/common/components/select-pair";
import { JOB_TYPES, JOB_LOCATIONS, SALARY_RANGES } from "../constants";
import { Button } from "~/components/ui/button";
import { Form } from "react-router";
export const meta: Route.MetaFunction = () => {
  return [
    { title: "채용 공고 등록" },
    { name: "description", content: "새로운 채용 공고를 등록하세요" },
  ];
};

export default function SubmitJobPage({ actionData }: Route.ComponentProps) {
  return (
    <div className='space-y-20'>
      <HeroSection title='Post a Job' subTitle='Reach out to top talent' />
      <Form className='max-w-screen-xl mx-auto flex items-center flex-col gap-10'>
        <div className='grid grid-cols-3 gap-10 w-full'>
          <InputPair
            id='position'
            label='Position'
            description='최대 40자'
            name='position'
            maxLength={40}
            type='text'
            required
            placeholder='ex) Senior React Developer'
          />
          <InputPair
            id='overview'
            label='개요'
            description='최대 400자'
            name='position'
            maxLength={400}
            type='text'
            required
            placeholder='ex) 우리는.. 찾고 있습니다.'
            textArea
          />
          <InputPair
            id='responsibilities'
            label='직무'
            description='최대 400자'
            name='position'
            maxLength={400}
            type='text'
            required
            textArea
            placeholder='ex) 유지보수 ...'
          />
          <InputPair
            id='qualifications'
            label='자격요건'
            description='최대 400자'
            name='qualifications'
            maxLength={400}
            type='text'
            required
            textArea
            placeholder='ex) 경력 3년 이상, 학력 대졸 이상'
          />
          <InputPair
            id='benefits'
            label='복지'
            description='최대 400자'
            name='benefits'
            maxLength={400}
            type='text'
            required
            placeholder='ex) 재택근무..'
            textArea
          />
          <InputPair
            id='skills'
            label='스킬'
            description='최대 400자'
            name='skills'
            maxLength={400}
            type='text'
            required
            placeholder='ex) React, Next.js, TypeScript, Tailwind CSS, Node.js, Express'
            textArea
          />
          <InputPair
            id='companyName'
            label='회사명'
            description='최대 40자'
            name='companyName'
            maxLength={40}
            type='text'
            required
            placeholder='ex) 회사명'
          />
          <InputPair
            id='companyLogoUrl'
            label='회사 로고 URL'
            description='최대 40자'
            name='companyLogoUrl'
            maxLength={40}
            type='text'
            required
            placeholder='ex) https://example.com/logo.png'
          />
          <InputPair
            id='companyLocation'
            label='회사 위치'
            description='최대 40자'
            name='companyLocation'
            maxLength={40}
            type='text'
            required
            placeholder='ex) 서울특별시 강남구'
          />
          <InputPair
            id='applyUrl'
            label='지원 링크'
            description='최대 40자'
            name='applyUrl'
            maxLength={40}
            type='text'
            required
            placeholder='ex) https://example.com/apply'
          />
          <SelectPair
            label='직무 유형'
            description='직무유형을 선택해주세요.'
            name='jobType'
            placeholder='ex) Full-time'
            options={JOB_TYPES.map((jobType) => ({
              label: jobType.name,
              value: jobType.id,
            }))}
          />{" "}
          <SelectPair
            label='근무 유형'
            description='근무 유형을 선택해주세요.'
            name='locationType'
            placeholder='ex) Remote'
            options={JOB_LOCATIONS.map((locationType) => ({
              label: locationType.name,
              value: locationType.id,
            }))}
          />
          <SelectPair
            label='급여 범위'
            description='급여 범위를 선택해주세요.'
            name='salaryRange'
            placeholder='ex) $100,000 - $120,000'
            options={SALARY_RANGES.map((salaryRange) => ({
              label: salaryRange,
              value: salaryRange,
            }))}
          />
        </div>
        <Button type='submit' className='w-full max-w-sm'>
          일자리 게시 $100
        </Button>
      </Form>
    </div>
  );
}
