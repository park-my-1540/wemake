import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { Route } from "./+types/job-page.types";

export function loader({ params }: Route.LoaderArgs) {
  const { jobId } = params;

  // TODO: 실제 데이터베이스에서 채용 정보를 가져오는 로직 구현
  return {
    job: {
      id: jobId,
      title: "프론트엔드 개발자",
      company: "테크 스타트업",
      location: "서울",
      type: "풀타임",
      description: "React와 TypeScript를 사용한 웹 애플리케이션 개발",
      requirements: [
        "3년 이상의 프론트엔드 개발 경험",
        "React, TypeScript, Next.js 경험",
        "반응형 웹 디자인 경험",
        "Git 및 협업 도구 사용 경험",
      ],
      benefits: [
        "유연한 근무 시간",
        "원격 근무 가능",
        "건강 보험",
        "연차 휴가",
      ],
      postedAt: "2024-04-17",
      salary: "연 5,000만원 ~ 7,000만원",
    },
  };
}

export function meta(): Route.MetaFunction {
  return [
    { title: "채용 상세" },
    { name: "description", content: "채용 정보 상세 내용을 확인하세요" },
  ];
}

export default function JobPage({ loaderData }: Route.ComponentProps) {
  const { job } = loaderData;

  return (
    <div className='container mx-auto py-8'>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl mb-2'>{job.title}</CardTitle>
          <div className='flex gap-2 text-sm text-muted-foreground'>
            <span>{job.company}</span>
            <span>•</span>
            <span>{job.location}</span>
            <span>•</span>
            <span>{job.type}</span>
            <span>•</span>
            <span>{job.salary}</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-semibold mb-2'>직무 설명</h3>
              <p className='text-muted-foreground'>{job.description}</p>
            </div>

            <div>
              <h3 className='text-lg font-semibold mb-2'>자격 요건</h3>
              <ul className='list-disc list-inside text-muted-foreground'>
                {job.requirements.map((req: string, index: number) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className='text-lg font-semibold mb-2'>복리후생</h3>
              <ul className='list-disc list-inside text-muted-foreground'>
                {job.benefits.map((benefit: string, index: number) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>

            <div className='flex justify-between items-center pt-4'>
              <span className='text-sm text-muted-foreground'>
                등록일: {job.postedAt}
              </span>
              <Button size='lg'>지원하기</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
