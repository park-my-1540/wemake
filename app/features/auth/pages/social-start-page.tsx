import type { Route } from "./+types/social-start-page";

export function meta() {
  return [
    { title: "소셜 로그인" },
    { name: "description", content: "소셜 로그인을 시작합니다" },
  ];
}

export function loader({ request, params }: Route.LoaderArgs) {
  return {
    provider: params.provider,
  };
}

export default function SocialStartPage({ loaderData }: Route.ComponentProps) {
  return <div className='space-y-6'></div>;
}
