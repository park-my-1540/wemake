import type { Route } from "./+types/profile-page";

export const meta: Route.MetaFunction = ({ params }) => [
  { title: `Profile: ${params.username}` },
];

export default function ProfilePage() {
  return (
    <div className='flex flex-col gap-10 max-w-screen-md'>
      <div className='space-y-2'>
        <h4 className='text-lg font-bold'>Headline</h4>
        <p>나는 프로덕트 디자인입니다. 한국에 살구용</p>
      </div>
      <div className='space-y-2'>
        <h4 className='text-lg font-bold'>About</h4>
        <p>나는 프로덕트 디자인입니다. 한국에 살구용</p>
      </div>
    </div>
  );
}
