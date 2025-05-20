import { Badge } from "~/components/ui/badge";
import type { Route } from "./+types/job-page.types";
import { DotIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { getJobById } from "~/features/jobs/queries";
import { DateTime } from "luxon";
import { JOB_LOCATION_MAP, JOB_TYPE_MAP } from "../constants";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "채용 상세" },
    { name: "description", content: "채용 정보 상세 내용을 확인하세요" },
  ];
};
export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const jobs = await getJobById(client, { jobId: params.jobId });
  return { jobs };
};

export default function JobPage({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <div className='bg-gradient-to-tr from-primary to-primary/80 to-primary/10 h-60 w-full rounded-lg'></div>
      <div className='grid grid-cols-6 -mt-20 gap-20 items-start'>
        <div className='col-span-4 space-y-10'>
          <div className='relative size-40 bg-white rounded-full  overflow-hidden  relative left-10'>
            <img src={loaderData.jobs.company_logo} alt='company logo' />
          </div>
          <div>
            <h1 className='text-4xl font-bold'>{loaderData.jobs.position}</h1>
            <h4 className='text-lg text-muted-foreground'>
              {loaderData.jobs.company_name}
            </h4>
          </div>
          <div className='flex gap-2 capitalize'>
            <Badge variant={"secondary"}>
              {JOB_TYPE_MAP.get(loaderData.jobs.job_type)}
            </Badge>
            <Badge variant={"secondary"}>
              {JOB_LOCATION_MAP.get(loaderData.jobs.job_location)}
            </Badge>
          </div>
          <div className='space-y-2.5'>
            <h4 className='text-2xl font-bold'>상세</h4>
            <p className='text-lg'>{loaderData.jobs.overview}</p>
          </div>
          <div className='space-y-2.5'>
            <h4 className='text-2xl font-bold'>직무요건</h4>
            <ul className='text-lg list-disc list-inside'>
              {loaderData.jobs.responsibilities.split(",").map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className='space-y-2.5'>
            <h4 className='text-2xl font-bold'>자격요건</h4>
            <ul className='text-lg list-disc list-inside'>
              {loaderData.jobs.qualifications.split(",").map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className='space-y-2.5'>
            <h4 className='text-2xl font-bold'>혜택 및 복지</h4>
            <ul className='text-lg list-disc list-inside'>
              {loaderData.jobs.benefits.split(",").map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className='space-y-2.5'>
            <h4 className='text-2xl font-bold'>스킬</h4>
            <ul className='text-lg list-disc list-inside'>
              {loaderData.jobs.skills.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className='col-span-2 sticky mt-32 top-20 border p-6 rounded-lg space-y-2.5'>
          <div className='flex flex-col'>
            <span className='text-sm text-muted-foreground'>Avg. Salary</span>
            <span className='text-2xl font-medium'>
              {loaderData.jobs.salary_range}
            </span>
          </div>

          <div className='flex flex-col'>
            <span className='text-sm text-muted-foreground'>Location</span>
            <span className='text-2xl font-medium'>
              {loaderData.jobs.job_location}
            </span>
          </div>
          <div className='flex flex-col'>
            <span className='text-sm text-muted-foreground'>Type</span>
            <span className='text-2xl font-medium'>
              {loaderData.jobs.job_type}
            </span>
          </div>
          <div className='flex'>
            <span className='text-sm text-muted-foreground'>
              Posted
              {DateTime.fromISO(loaderData.jobs.created_at).toRelative()}
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
