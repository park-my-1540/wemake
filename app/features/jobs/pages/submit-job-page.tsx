import InputPair from "~/common/components/input-pair";
import type { Route } from "./+types/submit-job-page";
import { HeroSection } from "~/common/components/hero-section";
import SelectPair from "~/common/components/select-pair";
import { JOB_TYPES, JOB_LOCATIONS, SALARY_RANGES } from "../constants";
import { Button } from "~/components/ui/button";
import { Form, redirect } from "react-router";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { z } from "zod";
import { createJob } from "../mutations";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "채용 공고 등록" },
    { name: "description", content: "새로운 채용 공고를 등록하세요" },
  ];
};

const formSchema = z.object({
  position: z.string().max(40),
  overview: z.string().max(400),
  responsibilities: z.string().max(400),
  qualifications: z.string().max(400),
  benefits: z.string().max(400),
  skills: z.string().max(400),
  companyName: z.string().max(40),
  companyLogoUrl: z.string().max(40),
  companyLocation: z.string().max(40),
  applyUrl: z.string().max(40),
  jobType: z.enum(JOB_TYPES.map((type) => type.id) as [string, ...string[]]),
  jobLocation: z.enum(
    JOB_LOCATIONS.map((location) => location.id) as [string, ...string[]]
  ),
  salaryRange: z.enum(SALARY_RANGES),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  await getLoggedInUserId(client);
};

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  await getLoggedInUserId(client);
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!success) {
    return {
      fieldErrors: error.flatten().fieldErrors,
    };
  }
  const { job_id } = await createJob(client, data);
  return redirect(`/jobs/${job_id}`);
};

export default function SubmitJobPage({ actionData }: Route.ComponentProps) {
  return (
    <div className='space-y-20'>
      <HeroSection title='Post a Job' subTitle='Reach out to top talent' />
      <Form
        className='max-w-screen-xl mx-auto flex items-center flex-col gap-10'
        method='post'
      >
        <div className='grid grid-cols-3 gap-10 w-full'>
          <div>
            <InputPair
              id='position'
              label='Position'
              description='최대 40자'
              name='position'
              maxLength={40}
              type='text'
              required
              placeholder='ex) Senior React Developer'
              defaultValue='ex) Senior React Developer'
            />
            {actionData && "fieldErrors" in actionData && (
              <p className='text-red-500'>{actionData.fieldErrors.position}</p>
            )}
          </div>
          <div>
            <InputPair
              id='overview'
              label='개요'
              description='최대 400자'
              name='overview'
              maxLength={400}
              type='text'
              required
              placeholder='ex) 우리는.. 찾고 있습니다.'
              defaultValue='ex) 우리는.. 찾고 있습니다.'
              textArea
            />
            {actionData && "fieldErrors" in actionData && (
              <p className='text-red-500'>{actionData.fieldErrors.overview}</p>
            )}
          </div>
          <div>
            <InputPair
              id='responsibilities'
              label='직무'
              description='최대 400자'
              name='responsibilities'
              maxLength={400}
              type='text'
              required
              textArea
              placeholder='ex) 유지보수 ...'
              defaultValue='ex) 유지보수 ...'
            />
            {actionData && "fieldErrors" in actionData && (
              <p className='text-red-500'>
                {actionData.fieldErrors.responsibilities}
              </p>
            )}
          </div>
          <div>
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
              defaultValue='ex) 경력 3년 이상, 학력 대졸 이상'
            />
            {actionData && "fieldErrors" in actionData && (
              <p className='text-red-500'>
                {actionData.fieldErrors.qualifications}
              </p>
            )}
          </div>
          <div>
            <InputPair
              id='benefits'
              label='복지'
              description='최대 400자'
              name='benefits'
              maxLength={400}
              type='text'
              required
              placeholder='ex) 재택근무..'
              defaultValue='ex) 재택근무..'
              textArea
            />
            {actionData && "fieldErrors" in actionData && (
              <p className='text-red-500'>{actionData.fieldErrors.benefits}</p>
            )}
          </div>
          <div>
            <InputPair
              id='skills'
              label='스킬'
              description='최대 400자'
              name='skills'
              maxLength={400}
              type='text'
              required
              placeholder='ex) React, Next.js, TypeScript, Tailwind CSS, Node.js, Express'
              defaultValue={"Reacts"}
              textArea
            />
            {actionData && "fieldErrors" in actionData && (
              <p className='text-red-500'>{actionData.fieldErrors.skills}</p>
            )}
          </div>
          <div>
            <InputPair
              id='companyName'
              label='회사명'
              description='최대 40자'
              name='companyName'
              maxLength={40}
              type='text'
              required
              placeholder='ex) 회사명'
              defaultValue='ex) 회사명'
            />
            {actionData && "fieldErrors" in actionData && (
              <p className='text-red-500'>
                {actionData.fieldErrors.companyName}
              </p>
            )}
          </div>
          <div>
            <InputPair
              id='companyLogoUrl'
              label='회사 로고 URL'
              description='최대 40자'
              name='companyLogoUrl'
              maxLength={40}
              type='text'
              required
              placeholder='ex) https://example.com/logo.png'
              defaultValue='ex) https://example.com/logo.png'
            />
            {actionData && "fieldErrors" in actionData && (
              <p className='text-red-500'>
                {actionData.fieldErrors.companyLogoUrl}
              </p>
            )}
          </div>
          <div>
            <InputPair
              id='companyLocation'
              label='회사 위치'
              description='최대 40자'
              name='companyLocation'
              maxLength={40}
              type='text'
              required
              placeholder='ex) 서울특별시 강남구'
              defaultValue='ex) 서울특별시 강남구'
            />
            {actionData && "fieldErrors" in actionData && (
              <p className='text-red-500'>
                {actionData.fieldErrors.companyName}
              </p>
            )}
          </div>
          <div>
            <InputPair
              id='applyUrl'
              label='로고 링크'
              description='최대 40자'
              name='applyUrl'
              maxLength={40}
              type='text'
              required
              placeholder='ex) https://example.com/apply'
              defaultValue='ex) https://example.com/apply'
            />
            {actionData && "fieldErrors" in actionData && (
              <p className='text-red-500'>{actionData.fieldErrors.applyUrl}</p>
            )}
          </div>
          <div>
            <SelectPair
              label='직무 유형'
              description='직무유형을 선택해주세요.'
              name='jobType'
              placeholder='ex) Full-time'
              options={JOB_TYPES.map((jobType) => ({
                label: jobType.name,
                value: jobType.id,
              }))}
            />
            {actionData && "fieldErrors" in actionData && (
              <p className='text-red-500'>{actionData.fieldErrors.jobType}</p>
            )}
          </div>
          <div>
            <SelectPair
              label='근무 유형'
              description='근무 유형을 선택해주세요.'
              name='jobLocation'
              placeholder='ex) Remote'
              options={JOB_LOCATIONS.map((locationType) => ({
                label: locationType.name,
                value: locationType.id,
              }))}
            />
            {actionData && "fieldErrors" in actionData && (
              <p className='text-red-500'>
                {actionData.fieldErrors.jobLocation}
              </p>
            )}
          </div>
          <div>
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
            {actionData && "fieldErrors" in actionData && (
              <p className='text-red-500'>
                {actionData.fieldErrors.salaryRange}
              </p>
            )}
          </div>
        </div>
        <Button type='submit' className='w-full max-w-sm'>
          일자리 게시 $100
        </Button>
      </Form>
    </div>
  );
}
