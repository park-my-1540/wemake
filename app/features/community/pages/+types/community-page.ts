import type { MetaFunction } from "react-router";

export namespace Route {
  export type MetaFunction = MetaFunction;
  export type LoaderArgs = {
    request: Request;
  };
  export type ComponentProps = {
    loaderData: {
      topics: Array<{
        name: string;
        slug: string;
      }>;
      posts: Array<{
        id: number;
        title: string;
        createdAt: string;
        topic: string;
        avatar: string;
        author: string;
        upvotes: number;
      }>;
    };
  };
}
