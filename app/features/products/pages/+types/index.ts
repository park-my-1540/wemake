import type { MetaFunction as RouterMetaFunction } from "react-router";

export namespace Route {
  export interface LoaderArgs {
    request: Request;
    params?: Record<string, string>;
  }

  export interface ActionArgs {
    request: Request;
    formData: FormData;
  }

  export interface ComponentProps {
    loaderData: any;
    actionData: any;
  }

  export type MetaFunction = RouterMetaFunction;
}

export const meta: RouterMetaFunction = () => {
  return [
    { title: "Products | WeMake" },
    { name: "description", content: "Discover amazing products" },
  ];
};
