import type { MetaFunction as RouterMetaFunction } from "react-router";

export namespace Route {
  export interface Idea {
    id: string;
    title: string;
    description: string;
    author: string;
    createdAt: string;
  }

  export interface LoaderArgs {
    params: Record<string, never>;
  }

  export interface LoaderData {
    ideas: Idea[];
  }

  export interface ComponentProps {
    loaderData: LoaderData;
  }

  export type MetaFunction = RouterMetaFunction;
}
