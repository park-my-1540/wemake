import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import type { Route } from "./+types/team-page";
import { HeroSection } from "~/common/components/hero-section";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import { CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Card } from "~/components/ui/card";
import { getTeamById } from "../queries";

export const meta: Route.MetaFunction = ({ params }) => [
  { title: `Team: ${params.teamId}` },
];

export const loader = async ({ params }: Route.LoaderArgs) => {
  const team = await getTeamById(params.teamId);
  return { team };
};

export default function TeamPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className='space-y-20'>
      <HeroSection
        title={`${loaderData.team.team_leader.name}님 팀에 참여하세요`}
      />
      <div className='grid grid-cols-6 gap-40 items-start'>
        <div className='col-span-4 grid grid-cols-4 gap-5'>
          {[
            {
              title: "프로덕트 이름",
              value: loaderData.team.product_name,
            },
            {
              title: "진행 단계",
              value: loaderData.team.product_stage,
            },
            {
              title: "팀 규모",
              value: loaderData.team.team_size,
            },
            {
              title: "지분",
              value: loaderData.team.equity_split,
            },
          ].map((item) => (
            <Card>
              <CardHeader>
                <CardTitle className='text-sm font-medium text-muted-foreground'>
                  {item.title}
                </CardTitle>
                <CardContent className='p-0 font-bold text-2xl'>
                  <p>{item.value}</p>
                </CardContent>
              </CardHeader>
            </Card>
          ))}
          <Card className='col-span-2'>
            <CardHeader>
              <CardTitle className='text-sm font-medium text-muted-foreground'>
                모집중인 직군
              </CardTitle>
              <CardContent className='p-0 font-bold text-2xl'>
                <ul className='text-lg list-disc list-inside'>
                  {loaderData.team.roles.split(",").map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </CardHeader>
          </Card>
          <Card className='col-span-2'>
            <CardHeader>
              <CardTitle className='text-sm font-medium text-muted-foreground'>
                아이디어 소개
              </CardTitle>
              <CardContent className='p-0 font-medium text-xl'>
                <p>{loaderData.team.product_description}</p>
              </CardContent>
            </CardHeader>
          </Card>
        </div>
        <aside className='col-span-2 space-y-5 border rounded-lg shadow-sm p-5'>
          <div className='flex gap-5'>
            <Avatar className='size-14'>
              <AvatarFallback>
                {loaderData.team.team_leader.name[0]}
              </AvatarFallback>
              {loaderData.team.team_leader.avatar ? (
                <AvatarImage src={loaderData.team.team_leader.avatar} />
              ) : null}
            </Avatar>
            <div className='flex flex-col'>
              <h4 className='text-lg font-medium'>
                {loaderData.team.team_leader.name}
              </h4>
              <Badge variant='secondary' className='capitalize'>
                {loaderData.team.team_leader.role}
              </Badge>
            </div>
          </div>
          <Form className='space-y-5'>
            <InputPair
              id='introduction'
              label='자신을 소개해주세요'
              description='당신에 대해서 설명해주세요'
              name='introduction'
              type='text'
              placeholder='ex) 저는 3년차 리액트 개발자입니다.'
              required
              textArea
            />
            <Button className='w-full'>연락하기</Button>
          </Form>
          <Button variant='outline' className='w-full'>
            팔로우
          </Button>
        </aside>
      </div>
    </div>
  );
}
