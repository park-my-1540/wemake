import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import type { Route } from "./+types/team-page";
import { HeroSection } from "~/common/components/hero-section";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import { CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Card } from "~/components/ui/card";
export const meta: Route.MetaFunction = ({ params }) => [
  { title: `Team: ${params.teamId}` },
];

export default function TeamPage() {
  return (
    <div className='space-y-20'>
      <HeroSection title='Join lynn`s team' />
      <div className='grid grid-cols-6 gap-40 items-start'>
        <div className='col-span-4 grid grid-cols-4 gap-5'>
          {[
            {
              title: "Product name",
              value: "Doggie Social",
            },
            {
              title: "Stage",
              value: "MVP",
            },
            {
              title: "Team size",
              value: 3,
            },
            {
              title: "Available equity",
              value: 50,
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
                Looking for
              </CardTitle>
              <CardContent className='p-0 font-bold text-2xl'>
                <ul className='text-lg list-disc list-inside'>
                  {[
                    "React Developer",
                    "Backend Developer",
                    "Product Manager",
                    "UI/UX Designer",
                  ].map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </CardHeader>
          </Card>
          <Card className='col-span-2'>
            <CardHeader>
              <CardTitle className='text-sm font-medium text-muted-foreground'>
                Idea description
              </CardTitle>
              <CardContent className='p-0 font-medium text-xl'>
                <p>
                  Doggie Social is a social media platform for dogs. It allows
                  dogs to connect with each other and share their experiences.
                </p>
              </CardContent>
            </CardHeader>
          </Card>
        </div>
        <aside className='col-span-2 space-y-5 border rounded-lg shadow-sm p-5'>
          <div className='flex gap-5'>
            <Avatar className='size-14'>
              <AvatarImage src='https://github.com/intertiger.png' />
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
              <h4 className='text-lg font-medium'>Lynn</h4>
              <Badge variant='secondary'>Entreprenuer</Badge>
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
            <Button className='w-full'>Get in touch</Button>
          </Form>
          <Button variant='outline' className='w-full'>
            Follow
          </Button>
        </aside>
      </div>
    </div>
  );
}
