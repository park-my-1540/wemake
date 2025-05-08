import type { MetaFunction as RouterMetaFunction } from "react-router";

export namespace Route {
  export interface Idea {
    gpt_idea_id: string;
    idea: string;
    views: number;
    likes: number;
    created_at: string;
    is_claimed: boolean;
  }

  export interface LoaderArgs {
    params: Record<string, never>;
  }

  export interface MetaArgs {
    data: { ideas: Idea };
  }

  export interface LoaderData {
    ideas: Idea[];
  }

  export interface ComponentProps {
    loaderData: LoaderData;
  }

  export type MetaFunction = RouterMetaFunction;
}
