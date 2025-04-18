import type { MetaFunction } from "react-router";

export namespace Route {
  export type MetaFunction = MetaFunction;
  export type LoaderArgs = {
    request: Request;
  };
  export type ActionArgs = {
    request: Request;
  };
  export type ComponentProps = {
    loaderData: Record<string, unknown>;
    actionData: Record<string, unknown>;
  };
}
