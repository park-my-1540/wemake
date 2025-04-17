import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { Route } from "./+types/jobs-page.types";

export function loader({}: Route.LoaderArgs) {
  return {
    jobs: [
      {
        id: "1",
        title: "프론트엔드 개발자",
        company: "테크 스타트업",
        location: "서울",
        type: "풀타임",
        description: "React와 TypeScript를 사용한 웹 애플리케이션 개발",
        postedAt: "2024-04-17",
      },
      {
        id: "2",
        title: "백엔드 개발자",
        company: "핀테크 기업",
        location: "부산",
        type: "풀타임",
        description: "Node.js와 PostgreSQL을 사용한 백엔드 시스템 개발",
        postedAt: "2024-04-16",
      },
    ],
  };
}

export function meta(): Route.MetaFunction {
  return [
    { title: "채용 목록" },
    { name: "description", content: "최신 채용 정보를 확인하세요" },
  ];
}

export default function JobsPage({ loaderData }: Route.ComponentProps) {
  const { jobs } = loaderData;

  return (
    <div className='container mx-auto py-8'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold'>채용 목록</h1>
        <Button asChild>
          <a href='/jobs/submit'>채용 공고 등록</a>
        </Button>
      </div>
      <div className='grid gap-6 md:grid-cols-2'>
        {jobs.map((job: Route.Job) => (
          <Card key={job.id}>
            <CardHeader>
              <CardTitle>{job.title}</CardTitle>
              <div className='flex gap-2 text-sm text-muted-foreground'>
                <span>{job.company}</span>
                <span>•</span>
                <span>{job.location}</span>
                <span>•</span>
                <span>{job.type}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground mb-4'>{job.description}</p>
              <div className='flex justify-between items-center'>
                <span className='text-sm text-muted-foreground'>
                  등록일: {job.postedAt}
                </span>
                <Button variant='outline' asChild>
                  <a href={`/jobs/${job.id}`}>자세히 보기</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
