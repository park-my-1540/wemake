import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import type { Route } from "./+types/submit-job-page.types";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const title = formData.get("title");
  const company = formData.get("company");
  const location = formData.get("location");
  const type = formData.get("type");
  const description = formData.get("description");
  const requirements = formData.get("requirements");
  const benefits = formData.get("benefits");
  const salary = formData.get("salary");

  // TODO: 채용 공고 저장 로직 구현
  return { success: true };
}

export function meta(): Route.MetaFunction {
  return [
    { title: "채용 공고 등록" },
    { name: "description", content: "새로운 채용 공고를 등록하세요" },
  ];
}

export default function SubmitJobPage({ actionData }: Route.ComponentProps) {
  return (
    <div className='container mx-auto py-8'>
      <Card>
        <CardHeader>
          <CardTitle>채용 공고 등록</CardTitle>
        </CardHeader>
        <CardContent>
          <form method='post' className='space-y-6'>
            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='title'>직무</Label>
                <Input id='title' name='title' required />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='company'>회사명</Label>
                <Input id='company' name='company' required />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='location'>근무지</Label>
                <Input id='location' name='location' required />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='type'>고용형태</Label>
                <Input id='type' name='type' required />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='salary'>연봉</Label>
                <Input id='salary' name='salary' required />
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='description'>직무 설명</Label>
              <Textarea id='description' name='description' required />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='requirements'>자격 요건</Label>
              <Textarea
                id='requirements'
                name='requirements'
                placeholder='각 요건을 줄바꿈으로 구분하여 입력하세요'
                required
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='benefits'>복리후생</Label>
              <Textarea
                id='benefits'
                name='benefits'
                placeholder='각 복리후생을 줄바꿈으로 구분하여 입력하세요'
                required
              />
            </div>

            <div className='flex justify-end'>
              <Button type='submit'>등록하기</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
