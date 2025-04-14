import type { MetaFunction as ReactRouterMetaFunction } from "react-router";

export namespace Route {
  export interface LoaderArgs {
    request: Request;
  }

  export interface ActionArgs {
    request: Request;
  }

  export interface ComponentProps {
    loaderData: {
      message: string;
    };
    actionData?: Record<string, unknown>;
  }

  export type MetaFunction = ReactRouterMetaFunction;
}
