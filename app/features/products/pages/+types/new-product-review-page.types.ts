import type { MetaFunction as RouterMetaFunction } from "react-router";

export namespace Route {
  export interface LoaderArgs {
    params: {
      productId: string;
    };
  }

  export interface LoaderData {
    productId: string;
  }

  export interface ActionArgs {
    request: Request;
    params: {
      productId: string;
    };
  }

  export interface ActionData {
    success: boolean;
  }

  export interface ComponentProps {
    loaderData: LoaderData;
    actionData?: ActionData;
  }

  export type MetaFunction = RouterMetaFunction;
}
