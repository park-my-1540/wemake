import type { MetaFunction } from "react-router";

export namespace Route {
  export type MetaFunction = MetaFunction;
  export type LoaderArgs = {
    request: Request;
    params: {
      provider: string;
    };
  };
  export type ComponentProps = {
    loaderData: {
      provider: string;
    };
  };
}
