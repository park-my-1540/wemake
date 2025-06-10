import { boolean } from "drizzle-orm/gel-core";
import type { MetaFunction as RouterMetaFunction } from "react-router";

export namespace Route {
  export type MetaFunction = RouterMetaFunction;
  export type LoaderArgs = {
    request: Request;
    params: {
      postId: number;
    };
  };
  export type ActionArgs = {
    request: Request;
    params: {
      postId: number;
    };
  };
  export type ComponentProps = {
    loaderData: {
      post: {
        post_id: number;
        id: number;
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
      replies: Replies[];
    };
    actionData: {
      ok: boolean;
    };
  };
}

export interface Replies {
  post_reply_id: number;
  user: {
    name: string;
    avatar: string | null;
    username: string;
  };
  reply: string;
  created_at: string;
  topLevel: boolean;
  post_replies: Replies[];
}
