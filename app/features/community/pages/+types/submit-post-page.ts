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
    actionData: Record<string, string>;
    loaderData: Record<string, string>;
  };
}
