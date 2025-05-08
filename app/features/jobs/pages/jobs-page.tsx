import { Button } from "~/components/ui/button";
import type { Route } from "./+types/jobs-page.types";
import { HeroSection } from "~/common/components/hero-section";
import { JobCard } from "../components/job-card";
import {
  JOB_TYPES,
  JOB_LOCATIONS,
  SALARY_RANGES,
  JOB_LOCATION_MAP,
  JOB_TYPE_MAP,
} from "../constants";
import { useSearchParams, data } from "react-router";
import { getJobs } from "~/features/jobs/queries";
import { cn } from "~/lib/utils";
import { z } from "zod";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "채용 목록" },
    { name: "description", content: "최신 채용 정보를 확인하세요" },
  ];
};

const searchParamsSchema = z.object({
  type: z
    .enum(JOB_TYPES.map((type) => type.id) as [string, ...string[]])
    .optional(),
  location: z
    .enum(JOB_LOCATIONS.map((loc) => loc.id) as [string, ...string[]])
    .optional(),
  salary: z.enum(SALARY_RANGES).optional(),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const { success, data: parsedData } = searchParamsSchema.safeParse(
    Object.fromEntries(url.searchParams)
  );

  if (!success) {
    throw data(
      {
        error_code: "invalid_search_params",
        message: "Invalid search params",
      },
      { status: 400 }
    );
  }
  const jobs = await getJobs({
    limit: 40,
    location: parsedData.location,
    type: parsedData.type,
    salary: parsedData.salary,
  });
  return { jobs };
};

export default function JobsPage({ loaderData }: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams(); // 쿼리 파라미터를 관리하는 훅
  const onFilterClick = (key: string, value: string) => {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  };
  const clearFilter = (filter: string) => {
    const newParams = new URLSearchParams(searchParams); // 복사
    newParams.delete(filter); // key 제거
    setSearchParams(newParams); // URL 반영
  };

  return (
    <div className='space-y-20'>
      <HeroSection title='채용공고' subTitle='일자리를 찾고 계신가요?' />
      <div className='grid grid-cols-1 xl:grid-cols-6 gap-20 items-start'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 col-span-4 gap-5'>
          {loaderData.jobs.map((job) => (
            <JobCard
              key={job.job_id}
              id={job.job_id}
              companyName={job.company_name}
              companyLogoUrl={job.company_logo}
              jobTitle={job.position}
              postedAt={job.created_at}
              jobType={JOB_TYPE_MAP.get(job.job_type) || ""}
              locationType={JOB_LOCATION_MAP.get(job.job_location) || ""}
              salaryRange={job.salary_range}
              location={job.company_location}
            />
          ))}
        </div>
        <div className='col-span-2 flex flex-col gap-10 sticky top-20'>
          <div className='flex flex-col items-start gap-2.5'>
            <div className='flex items-center justify-center gap-2'>
              <h4 className='text-sm text-muted-foreground font-bold'>Type</h4>
              <Button variant='link' onClick={() => clearFilter("type")}>
                선택 해제
              </Button>
            </div>
            <div className='flex flex-wrap gap-2'>
              {JOB_TYPES.map((jobType) => (
                <Button
                  className={cn(
                    jobType.id === searchParams.get("type") ? "bg-accent" : ""
                  )}
                  key={jobType.id}
                  variant='outline'
                  onClick={() => onFilterClick("type", jobType.id)}
                >
                  {jobType.name}
                </Button>
              ))}
            </div>
          </div>
          <div className='flex flex-col items-start gap-2.5'>
            <div className='flex items-center justify-center gap-2'>
              <h4 className='text-sm text-muted-foreground font-bold'>
                Location
              </h4>
              <Button variant='link' onClick={() => clearFilter("location")}>
                선택 해제
              </Button>
            </div>
            <div className='flex flex-wrap gap-2'>
              {JOB_LOCATIONS.map((jobLocation) => (
                <Button
                  className={cn(
                    searchParams.get("location") === jobLocation.id &&
                      "bg-accent"
                  )}
                  key={jobLocation.id}
                  variant='outline'
                  onClick={() => onFilterClick("location", jobLocation.id)}
                >
                  {jobLocation.name}
                </Button>
              ))}
            </div>
          </div>
          <div className='flex flex-col items-start gap-2.5'>
            <div className='flex items-center justify-center gap-2'>
              <h4 className='text-sm text-muted-foreground font-bold'>
                Salary Range
              </h4>
              <Button variant='link' onClick={() => clearFilter("salary")}>
                선택 해제
              </Button>
            </div>
            <div className='flex flex-wrap gap-2'>
              {SALARY_RANGES.map((salaryRange) => (
                <Button
                  className={cn(
                    searchParams.get("salary") === salaryRange && "bg-accent"
                  )}
                  key={salaryRange}
                  variant='outline'
                  onClick={() => onFilterClick("salary", salaryRange)}
                >
                  {salaryRange}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
