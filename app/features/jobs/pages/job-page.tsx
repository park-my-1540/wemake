import { Badge } from "~/components/ui/badge";
import type { Route } from "./+types/job-page.types";
import { DotIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { getJobs } from "~/features/jobs/queries";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "채용 상세" },
    { name: "description", content: "채용 정보 상세 내용을 확인하세요" },
  ];
};
export const loader = async ({ params }: Route.LoaderArgs) => {
  const idea = await getJobs({ limit: 40 });
  return { idea };
};

export default function JobPage() {
  return (
    <div>
      <div className='bg-gradient-to-tr from-primary to-primary/80 to-primary/10 h-60 w-full rounded-lg'></div>
      <div className='grid grid-cols-6 -mt-20 gap-20 items-start'>
        <div className='col-span-4 space-y-10'>
          <div className='relative size-40 rounded-full  overflow-hidden  relative left-10'>
            <img src='https://github.com/facebook.png' alt='company logo' />
          </div>
          <div>
            <h1 className='text-4xl font-bold'>Frontend Engineer</h1>
            <h4 className='text-lg text-muted-foreground'>Meta Inc.</h4>
          </div>
          <div className='flex items-center gap-2'>
            <Badge variant='secondary'>Full-time</Badge>
            <Badge variant='secondary'>Remote</Badge>
          </div>
          <div className='space-y-2.5'>
            <h4 className='text-2xl font-bold'>Overview</h4>
            <p className='text-lg'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quos.
            </p>
          </div>
          <div className='space-y-2.5'>
            <h4 className='text-2xl font-bold'>직무</h4>
            <ul className='text-lg list-disc list-inside'>
              {[
                "Lorem ipsum dolor sit amet consectetur adipisicing elit  ",
                "Lorem ipsum dolor sit amet consectetur adipisicing elit",
                "Lorem ipsum dolor sit amet consectetur adipisicing elit",
                "Lorem ipsum dolor sit amet consectetur adipisicing elit",
                "Lorem ipsum dolor sit amet consectetur adipisicing elit",
                "Lorem ipsum dolor sit amet consectetur adipisicing elit",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className='space-y-2.5'>
            <h4 className='text-2xl font-bold'>자격</h4>
            <ul className='text-lg list-disc list-inside'>
              {[
                "Lorem ipsum dolor sit amet consectetur adipisicing elit  ",
                "Lorem ipsum dolor sit amet consectetur adipisicing elit",
                "Lorem ipsum dolor sit amet consectetur adipisicing elit",
                "Lorem ipsum dolor sit amet consectetur adipisicing elit",
                "Lorem ipsum dolor sit amet consectetur adipisicing elit",
                "Lorem ipsum dolor sit amet consectetur adipisicing elit",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className='space-y-2.5'>
            <h4 className='text-2xl font-bold'>복지</h4>
            <ul className='text-lg list-disc list-inside'>
              {[
                "Lorem ipsum dolor sit amet consectetur adipisicing elit  ",
                "Lorem ipsum dolor sit amet consectetur adipisicing elit",
                "Lorem ipsum dolor sit amet consectetur adipisicing elit",
                "Lorem ipsum dolor sit amet consectetur adipisicing elit",
                "Lorem ipsum dolor sit amet consectetur adipisicing elit",
                "Lorem ipsum dolor sit amet consectetur adipisicing elit",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className='space-y-2.5'>
            <h4 className='text-2xl font-bold'>스킬</h4>
            <ul className='text-lg list-disc list-inside'>
              {[
                "JavaScript",
                "TypeScript",
                "React",
                "Next.js",
                "Tailwind CSS",
                "Node.js",
                "Express",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className='col-span-2 sticky mt-32 top-20 border p-6 rounded-lg space-y-6'>
          <div className='flex flex-col'>
            <span className='text-2xl font-medium'>$100,000 - $120,000</span>
            <span className='text-sm text-muted-foreground'>Avg. Salary</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-2xl font-medium'>Remote</span>
            <span className='text-sm text-muted-foreground'>Location</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-2xl font-medium'>Full-time</span>
            <span className='text-sm text-muted-foreground'>Type</span>
          </div>
          <div className='flex'>
            <span className='text-sm text-muted-foreground'>
              Posted 2 days ago
            </span>
            <DotIcon className='size-4' />
            <span className='text-sm text-muted-foreground'>395 views</span>
          </div>
          <Button className='w-full'>지원하기</Button>
        </div>
      </div>
    </div>
  );
}
