import { HeroSection } from "~/common/components/hero-section";
import type { Route } from "./+types/submit-product-page";
import { Form } from "react-router";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import InputPair from "~/common/components/input-pair";

import SelectPair from "~/common/components/select-pair";
import { Button } from "~/components/ui/button";
import { useState } from "react";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Submit Product | WeMake" },
    { name: "description", content: "Submit your product to WeMake" },
  ];
};

export default function SubmitPage() {
  const [icon, setIcon] = useState<string | null>(null); //url을 기억

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      // file은 browser의 memory에 존재하게 됨. 사용자가 browser가 이 file을 보도록 허용했기 때문
      // browser의 해당 memory영역으로부터 url을 가져올것임.
      setIcon(URL.createObjectURL(file));
      // 이 함수는 file을 선택한 browser내에서만 동작하는 url을 만들어줌. public url이 아님. 인터넷을 통해 접근할수 없음.
    }
  };
  return (
    <div>
      <HeroSection
        title='Submit Your Product'
        subTitle='Share your product with the world'
      />
      <Form className='grid grid-cols-2 gap-10 max-w-screen-lg mx-auto'>
        <div className='space-y-5'>
          <InputPair
            label='name'
            description='This is the name of your product'
            name='name'
            type='text'
            id='name'
            required
            placeholder='Name of your product'
          />
          <InputPair
            label='Product Name'
            description='60 characters or less'
            name='tagline'
            type='text'
            id='tagline'
            required
            placeholder='A concise description of your product'
          />
          <InputPair
            label='URL'
            description='The URL of your product'
            name='url'
            type='text'
            id='url'
            required
            placeholder='https://example.com'
          />
          <InputPair
            textArea
            label='Description'
            description='A detailed description of your product'
            name='description'
            type='text'
            id='description'
            required
            placeholder='A detailed description of your product'
          />
          <SelectPair
            label='Category'
            description='Select the category of your product'
            name='category'
            required
            placeholder='Select the category of your product'
            options={[
              { label: "Category 1", value: "category1" },
              { label: "Category 2", value: "category2" },
              { label: "Category 3", value: "category3" },
            ]}
          />
          <Button type='submit' className='w-full'>
            등록
          </Button>
        </div>
        <div className='flex flex-col space-y-2'>
          {icon ? (
            <div className='size-40 rounded shadow-xl overflow-hidden mb-3'>
              <img
                src={icon}
                alt='icon'
                className='w-full h-full object-cover'
              />
            </div>
          ) : null}
          <Label className='flex flex-col gap-1'>
            Icon
            <small className='text-sm text-gray-500'>
              The icon of your product
            </small>
          </Label>
          <Input
            type='file'
            className='w-/2'
            onChange={onChange}
            required
            name='icon'
            multiple
          />
          <div className='flex flex-col gap-1 text-xs'>
            <span className='text-muted-foreground'>
              추천 사이즈 : 128X128px
            </span>
            <span className='text-muted-foreground'>
              허용 포맷 : PNG, JPG, SVG
            </span>
            <span className='text-muted-foreground'>최대 크기 : 1MB</span>
          </div>
        </div>
      </Form>
    </div>
  );
}
