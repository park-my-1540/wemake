import { Button } from "~/components/ui/button";
import type { Route } from "./+types/join-page";
import { Link } from "react-router";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import AuthButtons from "../components/auth-buttons";

export const meta: Route.MetaFunction = () => [{ title: "로그인" }];
export default function LoginPage() {
  return (
    <div className='flex flex-col relative items-center justify-center h-full px-5'>
      <Button variant={"ghost"} asChild className='absolute right-8 top-8 '>
        <Link to='/auth/join'>Join</Link>
      </Button>
      <div className='flex items-center flex-col justify-center w-full max-w-md gap-10'>
        <h1 className='text-2xl font-semibold'>Log in to your account</h1>
        <Form className='w-full space-y-4'>
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
          <Button className='w-full' type='submit'>
            Log in
          </Button>
        </Form>
        <AuthButtons />
      </div>
    </div>
  );
}
