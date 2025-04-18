import type { MetaFunction } from "react-router";

export namespace Route {
  export type MetaFunction = MetaFunction;
  export type LoaderArgs = {
    request: Request;
  };
  export type ComponentProps = {
    loaderData: {
      posts: Array<{
        id: string;
        title: string;
        description: string;
        author: string;
        createdAt: string;
      }>;
    };
  };
}
