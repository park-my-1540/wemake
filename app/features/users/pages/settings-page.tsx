import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import type { Route } from "./+types/settings-page";
import { Form } from "react-router";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { useState } from "react";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId, getUserProfileById } from "../queries";
import { z } from "zod";
import { updateUser, updateUserAvatar } from "../mutations";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

export const meta: Route.MetaFunction = () => [{ title: "Settings" }];

const formSchema = z.object({
  name: z.string().min(1),
  role: z.string(),
  headline: z.string().optional().default(""),
  bio: z.string().optional().default(""),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const avatar = formData.get("avatar");

  if (avatar && avatar instanceof File) {
    if (avatar.size <= 2097152 && avatar.type.startsWith("image/")) {
      const { data, error } = await client.storage
        .from("avatars")
        .upload(`${userId}/${Date.now()}`, avatar, {
          contentType: avatar.type,
          upsert: false,
        });
      if (error) {
        return { formErrors: { avatar: ["Failed to upload avatar"] } };
      }
      const {
        data: { publicUrl },
      } = await client.storage.from("avatars").getPublicUrl(data.path);
      await updateUserAvatar(client, {
        id: userId,
        avatarUrl: publicUrl,
      });
    } else {
      return { formErrors: { avatar: ["Invalid file size or type"] } };
    }
  } else {
    const { success, error, data } = formSchema.safeParse(
      Object.fromEntries(formData)
    );
    if (!success) {
      return { formErrors: error.flatten().fieldErrors };
    }
    const { name, role, headline, bio } = data;
    await updateUser(client, {
      id: userId,
      name,
      role: role as "developer" | "designer" | "marketer" | "product-manager",
      headline,
      bio,
    });
    return {
      ok: true,
    };
  }
};
export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const user = await getUserProfileById(client, { id: userId });

  return { user };
};
export default function SettingsPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const [avatar, setAvatar] = useState<string | null>(loaderData.user.avatar);
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
          {actionData?.ok ? (
            <Alert>
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>프로필이 업데이트 되었습니다.</AlertDescription>
            </Alert>
          ) : null}
          <h2 className='text-2xl font-semibold'>Edit profile</h2>
          <Form className='flex flex-col w-1/2 gap-5' method='post'>
            <InputPair
              label='Name'
              description='Your public name'
              required
              id='name'
              name='name'
              placeholder='John Doe'
              defaultValue={loaderData.user.name ?? ""}
            />
            {}
            <SelectPair
              label='Role'
              description='어떤 역할이 가장 잘맞다고 생각하시나요?'
              name='role'
              defaultValue={loaderData.user.role ?? ""}
              placeholder='Select a role'
              options={[
                { label: "Developer", value: "developer" },
                { label: "Designer", value: "designer" },
                { label: "Product Manager", value: "product-manager" },
                { label: "Marketer", value: "marketer" },
              ]}
            />
            <InputPair
              label='Headline'
              description='프로필에 대한 소개글.'
              required
              id='headline'
              defaultValue={loaderData.user.headline ?? ""}
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
              defaultValue={loaderData.user.bio ?? ""}
              textArea
            />
            <Button className='w-full'>프로필 수정하기</Button>
          </Form>
        </div>
        <Form
          className='col-span-2 p-6 rounded-lg border shadow-md'
          method='post'
          encType='multipart/form-data'
        >
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
              name='avatar'
            />
            {actionData?.formErrors && "avatar" in actionData?.formErrors ? (
              <Alert>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {actionData.formErrors.avatar.join(", ")}
                </AlertDescription>
              </Alert>
            ) : null}
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
        </Form>
      </div>
    </div>
  );
}
