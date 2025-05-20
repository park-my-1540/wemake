import type { MetaFunction as RouterMetaFunction } from "react-router";

export namespace Route {
  export type MetaFunction = RouterMetaFunction;
  export type ActionArgs = {
    request: Request;
  };
  export type ComponentProps = {
    actionData?: Record<string, unknown>;
  };
}
