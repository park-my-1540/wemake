import type { MetaFunction as RouterMetaFunction } from "react-router";

export namespace Route {
  export interface Idea {
    id: string;
    title: string;
    description: string;
    author: string;
    createdAt: string;
    status: string;
    votes: number;
  }

  export interface LoaderArgs {
    params: {
      ideaId: string;
    };
  }

  export interface LoaderData {
    idea: Idea;
  }

  export interface ComponentProps {
    loaderData: LoaderData;
  }

  export type MetaFunction = RouterMetaFunction;
}
