import { Button } from "~/components/ui/button";
import type { Route } from "./+types/jobs-page.types";
import { HeroSection } from "~/common/components/hero-section";
import { JobCard } from "../components/job-card";
import { JOB_TYPES, JOB_LOCATIONS, SALARY_RANGES } from "../constants";
import { useSearchParams } from "react-router";
import { cn } from "~/lib/utils";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "채용 목록" },
    { name: "description", content: "최신 채용 정보를 확인하세요" },
  ];
};

export default function JobsPage() {
  const [searchParams, setSearchParams] = useSearchParams(); // 쿼리 파라미터를 관리하는 훅
  const onFilterClick = (key: string, value: string) => {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  };

  return (
    <div className='space-y-20'>
      <HeroSection title='Jobs' subTitle='Looking for a job' />
      <div className='grid grid-cols-6 gap-20 items-start'>
        <div className='grid grid-cols-3 col-span-4 gap-5'>
          {Array.from({ length: 10 }).map((_, index) => (
            <JobCard
              key={index}
              id='jobId'
              companyName='Tesla'
              companyLogoUrl='https://github.com/facebook.png'
              jobTitle='Frontend Engineer'
              postedAt='12 hours ago'
              jobType='Full-time'
              locationType='Remote'
              salaryRange='$100,000 - $120,000'
              location='Seoul'
            />
          ))}
        </div>
        <div className='col-span-2 flex flex-col gap-10 sticky top-20'>
          <div className='flex flex-col items-start gap-2.5'>
            <h4 className='text-sm text-muted-foreground font-bold'>Type</h4>
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
                  {searchParams.get("type")}
                  {jobType.name}
                </Button>
              ))}
            </div>
          </div>
          <div className='flex flex-col items-start gap-2.5'>
            <h4 className='text-sm text-muted-foreground font-bold'>
              Location
            </h4>
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
            <h4 className='text-sm text-muted-foreground font-bold'>
              Salary Range
            </h4>
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
