import { HeroSection } from "~/common/components/hero-section";
import type { Route } from "./+types/submit-product-page";
import { Form, redirect, useNavigation } from "react-router";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import InputPair from "~/common/components/input-pair";

import SelectPair from "~/common/components/select-pair";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { z } from "zod";
import { updateProductIcon } from "../mutations";
import { getCategories } from "../queries";
import { LoaderCircle } from "lucide-react";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Submit Product | WeMake" },
    { name: "description", content: "Submit your product to WeMake" },
  ];
};

const formSchema = z.object({
  name: z.string().min(1),
  tagline: z.string().min(1),
  url: z.string().min(1),
  description: z.string().min(1),
  category: z.coerce.number(),
  how_it_works: z.string().min(1),
  icon: z
    .instanceof(File, { message: "파일을 업로드해주세요." })
    .refine((file) => file.size <= 2097152, {
      message: "이미지 파일 크기는 2MB 이하만 가능합니다.",
    })
    .refine((file) => file.type.startsWith("image/"), {
      message: "이미지 파일만 업로드 할 수 있습니다.",
    }),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const categories = await getCategories(client);
  return { categories };
};

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();

  const { success, error, data } = formSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!success) {
    return { formErrors: error.flatten().fieldErrors };
  }
  const { name, tagline, url, description, category, icon, how_it_works } =
    data;

  const { data: uploadData, error: uploadError } = await client.storage
    .from("icons")
    .upload(`${userId}/${Date.now()}`, icon, {
      contentType: icon.type,
      upsert: false,
    });
  if (uploadError) {
    return { formErrors: { icon: ["Failed to upload icon"] } };
  }
  const {
    data: { publicUrl },
  } = await client.storage.from("icons").getPublicUrl(uploadData.path);

  const productId = await updateProductIcon(client, {
    id: userId,
    name,
    tagline,
    url,
    how_it_works,
    description,
    category_id: Number(category),
    iconUrl: publicUrl,
  });
  return redirect(`/products/${productId}`);
};

export default function SubmitPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";

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
      <Form
        className='grid grid-cols-2 gap-10 max-w-screen-lg mx-auto'
        encType='multipart/form-data'
        method='post'
      >
        <div className='space-y-5'>
          <InputPair
            label='이름'
            description='이름을 입력해주세요.'
            name='name'
            type='text'
            id='name'
            required
            placeholder='ex) ChatGPT'
          />
          {actionData &&
            "formErrors" in actionData &&
            actionData?.formErrors?.name && (
              <p className='text-red-500'>{actionData.formErrors.name}</p>
            )}
          <InputPair
            label='Tagline'
            description='60자 이내로 입력하세요.'
            name='tagline'
            type='text'
            id='tagline'
            required
            placeholder='ex) AI 챗봇 플랫폼'
          />
          {actionData &&
            "formErrors" in actionData &&
            actionData?.formErrors?.tagline && (
              <p className='text-red-500'>{actionData.formErrors.tagline}</p>
            )}
          <InputPair
            label='URL'
            description=''
            name='url'
            type='text'
            id='url'
            required
            placeholder='ex) https://example.com'
          />
          {actionData &&
            "formErrors" in actionData &&
            actionData?.formErrors?.url && (
              <p className='text-red-500'>{actionData.formErrors.url}</p>
            )}
          <InputPair
            textArea
            label='상세설명'
            description='기능, 특징 등을 자세히 입력해주세요.'
            name='description'
            type='text'
            id='description'
            required
            placeholder='ex) ChatGPT는 다양한 언어를 이해하고 생성할 수 있는 AI 챗봇입니다.'
          />
          {actionData &&
            "formErrors" in actionData &&
            actionData?.formErrors?.description && (
              <p className='text-red-500'>
                {actionData.formErrors.description}
              </p>
            )}
          <InputPair
            textArea
            label='작동 방법'
            description='제품이 어떻게 작동하는지 설명해주세요.'
            name='how_it_works'
            type='text'
            id='how_it_works'
            required
            placeholder='ex) 재밌게'
          />
          {actionData &&
            "formErrors" in actionData &&
            actionData?.formErrors?.howItWorks && (
              <p className='text-red-500'>{actionData.formErrors.howItWorks}</p>
            )}
          <SelectPair
            label='Category'
            description=''
            name='category'
            required
            placeholder='카테고리 선택'
            options={loaderData.categories.map((category) => ({
              label: category.name,
              value: category.category_id.toString(),
            }))}
          />
          {actionData &&
            "formErrors" in actionData &&
            actionData?.formErrors?.category && (
              <p className='text-red-500'>{actionData.formErrors.category}</p>
            )}
          <Button type='submit' className='w-full' disabled={isSubmitting}>
            {isSubmitting ? (
              <LoaderCircle className='animate-spin' />
            ) : (
              "제품 등록"
            )}
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
            <small className='text-sm text-gray-500'>제품의 아이콘</small>
          </Label>
          <Input
            type='file'
            className='w-/2'
            onChange={onChange}
            required
            name='icon'
            multiple
          />
          {actionData &&
            "formErrors" in actionData &&
            actionData?.formErrors?.icon && (
              <p className='text-red-500'>{actionData.formErrors.icon}</p>
            )}
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
