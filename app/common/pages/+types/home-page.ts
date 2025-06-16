import type { MetaFunction as ReactRouterMetaFunction } from "react-router";

export namespace Route {
  export interface LoaderArgs {
    request: Request;
  }

  export interface ActionArgs {
    request: Request;
  }

  export interface ComponentProps {
    loaderData: {
      products: ProductCardProps[];
      posts: PostCardProps[];
      ideas: IdeaCardProps[];
      jobs: JobCardProps[];
      teams: TeamCardProps[];
    };
    actionData?: Record<string, unknown>;
  }

  interface ProductCardProps {
    product_id: number;
    name: string;
    tagline: string;
    comments?: number;
    reviews: number;
    views: number;
    upvotes: number;
    promoted_from: string;
    is_upvoted: boolean;
    is_promoted: boolean;
    isPromoted: boolean;
    stats: {
      views: number;
      reviews: number;
      upvotes: number;
    };
  }
  interface PostCardProps {
    post_id: number;
    title: string;
    author: string;
    authorAvatarUrl: string;
    category: string;
    created_at: string;
  }

  interface IdeaCardProps {
    gpt_idea_id: string;
    idea: string;
    views: number;
    likes: number;
    created_at: string;
    is_claimed: boolean;
  }

  interface JobCardProps {
    job_id: number;
    company_name: string;
    company_logo: string;
    position: string;
    created_at: string;
    job_type: string;
    job_location: string;
    salary_range: string;
    company_location: string;
  }

  interface TeamCardProps {
    team_id: number;
    team_leader: {
      username: string;
      avatar: string;
    };
    roles: string;
    productDescription: string;
  }

  export type MetaFunction = ReactRouterMetaFunction;
}
