import type { Route } from "./+types/social-complete-page";

export function meta(): Route.MetaFunction {
  return [
    { title: "소셜 로그인 완료" },
    { name: "description", content: "소셜 로그인이 완료되었습니다" },
  ];
}

export function loader({ request, params }: Route.LoaderArgs) {
  return {
    provider: params.provider,
  };
}

export default function SocialCompletePage({
  loaderData,
}: Route.ComponentProps) {
  return <div className='space-y-6'></div>;
}
