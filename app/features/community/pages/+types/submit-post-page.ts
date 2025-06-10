import type { MetaFunction as RouterMetaFunction } from "react-router";

export namespace Route {
  export interface LoaderArgs {
    request: Request;
  }
  export type MetaFunction = RouterMetaFunction;
  export type ActionArgs = {
    request: Request;
  };
  export type ComponentProps = {
    actionData: {
      fieldErrors: fieldErrorsType | null;
    };
    loaderData: {
      topics: topicType[];
    };
  };
  interface fieldErrorsType {
    title: string[];
    topic: string[];
    content: string[];
  }
  interface topicType {
    name: string;
    slug: string;
  }
}
