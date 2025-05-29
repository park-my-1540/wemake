import type { MetaFunction as RouterMetaFunction } from "react-router";

export namespace Route {
  export interface LoaderArgs {
    params: {
      productId: string;
    };
    request: Request;
  }
  export interface ActionArgs {
    request: Request;
  }

  export interface LoaderData {
    categories: {
      name: string;
      category_id: string;
    }[];
  }

  export interface ComponentProps {
    loaderData: LoaderData;
    actionData: any;
  }

  export type MetaFunction = RouterMetaFunction;
}
