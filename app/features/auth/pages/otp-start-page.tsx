import { Button } from "~/components/ui/button";
import type { Route } from "./+types/join-page";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";

export const meta: Route.MetaFunction = () => [{ title: "OTP 인증" }];

export default function OtpStartPage() {
  return (
    <div className='flex flex-col relative items-center justify-center h-full'>
      <div className='flex items-center flex-col justify-center w-full max-w-md gap-10'>
        <div className='flex flex-col gap-2 items-center'>
          <h1 className='text-2xl font-semibold'>OTP 인증</h1>
          <p className='text-sm text-muted-foreground'>
            이메일을 입력하면 인증 코드를 발송합니다.
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
          <Button className='w-full' type='submit'>
            Send OTP
          </Button>
        </Form>
      </div>
    </div>
  );
}
