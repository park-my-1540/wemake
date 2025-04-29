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
        post_id: number;
        title: string;
        created_at: string;
        topic: string;
        avatar: string;
        author: string;
        author_url: string;
        upvotes: number;
      }>;
    };
  };
}
