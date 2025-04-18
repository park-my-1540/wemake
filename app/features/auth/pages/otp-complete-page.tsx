import { Button } from "~/components/ui/button";
import type { Route } from "./+types/join-page";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";

export const meta: Route.MetaFunction = () => [{ title: "OTP 인증" }];

export default function OtpCompletePage() {
  return (
    <div className='flex flex-col relative items-center justify-center h-full'>
      <div className='flex items-center flex-col justify-center w-full max-w-md gap-10'>
        <div className='flex flex-col gap-2 items-center'>
          <h1 className='text-2xl font-semibold'>OTP 확인하기</h1>
          <p className='text-sm text-muted-foreground'>
            인증 코드를 입력해주세요.
          </p>
        </div>
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
            id='otp'
            label='OTP'
            description='OTP 코드를 입력해주세요'
            name='otp'
            type='text'
            placeholder='ex) 123456'
          />
          <Button className='w-full' type='submit'>
            Log in
          </Button>
        </Form>
      </div>
    </div>
  );
}
