import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import type { Route } from "./+types/settings-page";
import { Form } from "react-router";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { useState } from "react";

export const meta: Route.MetaFunction = () => [{ title: "Settings" }];

export default function SettingsPage() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };
  return (
    <div className='space-y-20 '>
      <div className='grid grid-cols-6 gap-40'>
        <div className='col-span-4 flex flex-col gap-10'>
          <h2 className='text-2xl font-semibold'>Edit profile</h2>
          <Form className='flex flex-col w-1/2 gap-5'>
            <InputPair
              label='Name'
              description='Your public name'
              required
              id='name'
              name='name'
              placeholder='John Doe'
            />
            <SelectPair
              label='Role'
              description='어떤 역할이 가장 잘맞다고 생각하시나요?'
              name='role'
              placeholder='Select a role'
              options={[
                { label: "Developer", value: "developer" },
                { label: "Designer", value: "designer" },
                { label: "Product Manager", value: "product-manager" },
                { label: "Founder", value: "founder" },
                { label: "Other", value: "other" },
              ]}
            />
            <InputPair
              label='Headline'
              description='프로필에 대한 소개글.'
              required
              id='headline'
              name='headline'
              placeholder='John Doe'
              textArea
            />
            <InputPair
              label='Bio'
              description='공개 소개글 - 프로플 페이지에 표시됩니다.'
              required
              id='bio'
              name='bio'
              placeholder='John Doe'
              textArea
            />
            <Button className='w-full'>프로필 수정하기</Button>
          </Form>
        </div>
        <aside className='col-span-2 p-6 rounded-lg border shadow-md'>
          <Label className='flex flex-col gap-1'>Avatar</Label>
          <div className='space-y-5'>
            <div className='size-40 rounded-full shadow-xl overflow-hidden '>
              {avatar ? (
                <img src={avatar} className='object-cover w-full h-full' />
              ) : null}
            </div>
            <Input
              type='file'
              className='w-full'
              onChange={onChange}
              required
              name='icon'
            />
            <div className='flex flex-col text-xs'>
              <span className=' text-muted-foreground'>
                Recommended size: 128x128px
              </span>
              <span className=' text-muted-foreground'>
                Allowed formats: PNG, JPEG
              </span>
              <span className=' text-muted-foreground'>Max file size: 1MB</span>
            </div>
            <Button className='w-full'>프로필 이미지 수정하기</Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
