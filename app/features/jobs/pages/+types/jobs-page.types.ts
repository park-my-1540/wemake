import type { MetaFunction as RouterMetaFunction } from "react-router";
import type { JobTypeId, JobLocationId } from "~/features/jobs/constants";
export namespace Route {
  export interface Job {
    company_logo: string;
    position: string;
    created_at: string;
    job_type: JobTypeId;
    job_location: JobLocationId;
    salary_range: string;
    company_location: string;
    company_name: string;
    job_id: number;
    id: number;
    title: string;
    company: string;
    location: string;
    type: string;
    description: string;
    postedAt: string;
  }

  export interface LoaderArgs {
    params: Record<string, never>;
  }

  export interface LoaderData {
    jobs: Job[];
  }

  export interface ComponentProps {
    loaderData: LoaderData;
  }

  export type MetaFunction = RouterMetaFunction;
}
