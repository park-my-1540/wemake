import type { MetaFunction as RouterMetaFunction } from "react-router";

export namespace Route {
  export interface Job {
    id: string;
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
