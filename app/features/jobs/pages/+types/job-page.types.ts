import type { MetaFunction as RouterMetaFunction } from "react-router";
import type { JobTypeId, JobLocationId } from "~/features/jobs/constants";

export namespace Route {
  export interface Job {
    id: string;
    title: string;
    company_logo: string;
    location: string;
    created_at: string;
    company_name: string;
    type: string;
    description: string;
    requirements: string[];
    benefits: string;
    skills: string[];
    postedAt: string;
    salary_range: string;
    salary: string;
    position: string;
    job_type: JobTypeId;
    job_location: JobLocationId;
    overview: string;
    responsibilities: string;
    qualifications: string;
  }

  export interface LoaderArgs {
    request: Request;
    params: {
      jobId: number;
    };
  }

  export interface LoaderData {
    jobs: Job;
  }

  export interface ComponentProps {
    loaderData: LoaderData;
  }

  export type MetaFunction = RouterMetaFunction;
}
