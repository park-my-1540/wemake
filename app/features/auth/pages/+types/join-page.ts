import type { MetaFunction as RouterMetaFunction } from "react-router";

export namespace Route {
  export type MetaFunction = RouterMetaFunction;
  export type LoaderArgs = {
    request: Request;
  };
  export type ActionArgs = {
    request: Request;
  };
  export type ComponentProps = {
    loaderData: Record<string, string | null>;
    actionData: Record<string, string | null>;
  };
}
