import { Button } from "~/components/ui/button";
import type { Route } from "./+types/join-page";
import { Link } from "react-router";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";

export const meta: Route.MetaFunction = () => [
  { title: "회원가입" },
  { name: "description", content: "새로운 계정을 만들어보세요" },
];

export default function JoinPage() {
  return (
    <div className='flex flex-col relative items-center justify-center h-full'>
      <div className='flex items-center flex-col justify-center w-full max-w-md gap-10'>
        <h1 className='text-2xl font-semibold'>회원가입</h1>
        <Form className='w-full space-y-4'>
          <InputPair
            id='name'
            label='Name'
            description='이름을 입력해주세요'
            name='name'
            type='text'
            placeholder='이름을 입력해주세요'
            required
          />
          <InputPair
            id='username'
            label='Username'
            description='사용자 이름을 입력해주세요'
            name='username'
            type='text'
            placeholder='ex) wemake'
            required
          />
          <InputPair
            id='email'
            label='Email'
            description='이메일을 입력해주세요'
            name='email'
            type='email'
            placeholder='ex) wemake@gmail.com'
          />
          <InputPair
            id='password'
            label='Password'
            description='비밀번호를 입력해주세요'
            name='password'
            type='password'
            placeholder='비밀번호를 입력해주세요'
            required
          />
          <Button type='submit' className='w-full'>
            계정 만들기
          </Button>
        </Form>
      </div>
    </div>
  );
}
