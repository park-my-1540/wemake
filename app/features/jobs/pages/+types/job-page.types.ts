import type { MetaFunction as RouterMetaFunction } from "react-router";

export namespace Route {
  export interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    description: string;
    requirements: string[];
    benefits: string[];
    postedAt: string;
    salary: string;
  }

  export interface LoaderArgs {
    params: {
      jobId: string;
    };
  }

  export interface LoaderData {
    job: Job;
  }

  export interface ComponentProps {
    loaderData: LoaderData;
  }

  export type MetaFunction = RouterMetaFunction;
}
