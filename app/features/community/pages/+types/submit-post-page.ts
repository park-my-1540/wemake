import type { MetaFunction } from "react-router";

export namespace Route {
  export type MetaFunction = MetaFunction;
  export type ActionArgs = {
    request: Request;
  };
  export type ComponentProps = {
    actionData?: Record<string, unknown>;
  };
}
