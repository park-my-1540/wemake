import type { MetaFunction } from "react-router";

export namespace Route {
  export type MetaFunction = MetaFunction;
  export type LoaderArgs = {
    request: Request;
    params: {
      postId: string;
    };
  };
  export type ComponentProps = {
    loaderData: {
      post: {
        id: string;
        title: string;
        content: string;
        author: string;
        products: string;
        created_at: string;
        topic_slug: string;
        topic_name: string;
        upvotes: string;
        author_name: string;
        author_avatar: string;
        author_role: string;
        author_created_at: string;
        replies: string;
      };
    };
  };
}
