import type { MetaFunction as RouterMetaFunction } from "react-router";

export namespace Route {
  export interface ActionArgs {
    request: Request;
  }

  export interface ActionData {
    success: boolean;
  }

  export interface ComponentProps {
    actionData?: ActionData;
  }

  export type MetaFunction = RouterMetaFunction;
}
