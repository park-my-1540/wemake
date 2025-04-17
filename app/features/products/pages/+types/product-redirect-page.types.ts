import type { MetaFunction as RouterMetaFunction } from "react-router";

export namespace Route {
  export interface LoaderArgs {
    params: {
      productId: string;
    };
  }

  export type MetaFunction = RouterMetaFunction;
}
