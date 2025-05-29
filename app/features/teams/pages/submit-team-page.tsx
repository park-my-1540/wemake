import { Form, redirect } from "react-router";
import type { Route } from "./+types/submit-team-page";
import { HeroSection } from "~/common/components/hero-section";
import { Button } from "~/components/ui/button";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { makeSSRClient } from "~/supa-client";
import { z } from "zod";
import { PRODUCT_STAGES } from "../constants";
import { getLoggedInUserId } from "~/features/users/queries";
import { createTeam } from "../mutations";

export const meta: Route.MetaFunction = () => [{ title: "Submit Team" }];

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  await getLoggedInUserId(client);
};
const formSchema = z.object({
  name: z.string().min(1).max(20),
  stage: z.string(),
  size: z.coerce.number().min(1).max(100),
  equity: z.coerce.number().min(1).max(100),
  roles: z.string(),
  description: z.string().min(1).max(200),
});
export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!success) {
    return { fieldErrors: error.flatten().fieldErrors };
  }
  const { team_id } = await createTeam(client, userId, {
    ...data,
  });
  return redirect(`/teams/${team_id}`);
};
export default function SubmitTeamPage({ actionData }: Route.ComponentProps) {
  return (
    <div className='space-y-20'>
      <HeroSection
        title='팀 생성하기'
        subTitle='팀을 만들어 팀원을 찾아보세요'
      />
      <Form
        className='max-w-screen-xl mx-auto flex items-center flex-col gap-10'
        method='post'
      >
        <div className='grid grid-cols-3 gap-10 w-full'>
          <div>
            <InputPair
              name='name'
              placeholder='ex) Doggy Social'
              id='name'
              label='제품명은 무엇입니까?'
              description='20자 이내'
              maxLength={20}
              type='text'
              required
            />
            {actionData && "fieldErrors" in actionData && (
              <p className='text-red-500'>{actionData.fieldErrors.name}</p>
            )}
          </div>
          <div>
            <SelectPair
              label='당신의 제품은 어떤 단계입니까?'
              description='제품의 단계를 선택하세요'
              name='stage'
              placeholder='제품의 단계를 선택하세요'
              options={PRODUCT_STAGES}
            />
            {actionData && "fieldErrors" in actionData && (
              <p className='text-red-500'>{actionData.fieldErrors.stage}</p>
            )}
          </div>
          <div>
            <InputPair
              id='size'
              name='size'
              label='팀의 규모는 얼마입니까?'
              description='(1-100)'
              max={100}
              min={1}
              type='number'
              required
            />
            {actionData && "fieldErrors" in actionData && (
              <p className='text-red-500'>{actionData.fieldErrors.size}</p>
            )}
          </div>
          <div>
            <InputPair
              id='equity'
              name='equity'
              label='팀원에게 어느 정도의 지분을 줄 예정입니까?'
              description='(개인별)'
              max={100}
              min={1}
              type='number'
              required
            />
            {actionData && "fieldErrors" in actionData && (
              <p className='text-red-500'>{actionData.fieldErrors.equity}</p>
            )}
          </div>
          <div>
            <InputPair
              id='roles'
              name='roles'
              label='어떤 역할을 찾고 있습니까?'
              description='(쉼표로 구분됩니다)'
              type='text'
              required
              placeholder='ex) 프론트엔드 개발자, 백엔드 개발자, 디자이너'
            />
            {actionData && "fieldErrors" in actionData && (
              <p className='text-red-500'>{actionData.fieldErrors.roles}</p>
            )}
          </div>
          <div>
            <InputPair
              id='description'
              name='description'
              placeholder='ex) 우리는 강아지들이 서로 소통하는 미디어 플랫폼을 구축하고 있습니다.'
              label='제품에 대한 설명은 무엇입니까?'
              description='(200자 이내)'
              type='text'
              required
              textArea
            />
            {actionData && "fieldErrors" in actionData && (
              <p className='text-red-500'>
                {actionData.fieldErrors.description}
              </p>
            )}
          </div>
        </div>
        <Button type='submit' className='w-full max-w-sm'>
          팀 생성하기
        </Button>
      </Form>
    </div>
  );
}
