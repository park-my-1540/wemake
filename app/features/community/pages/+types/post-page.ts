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
        createdAt: string;
      };
    };
  };
}
