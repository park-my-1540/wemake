import type { Route } from "./+types/ideas-page.types";
import { HeroSection } from "~/common/components/hero-section";
import { IdeaCard } from "../components/idea-card";
import { getGptIdeas } from "../queries";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "IdeasGPT" },
    { name: "description", content: "Find your next great idea" },
  ];
};
export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const ideas = await getGptIdeas(client, { limit: 20 });
  return { ideas };
};
export default function IdeasPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className='space-y-20'>
      <HeroSection
        title='IdeasGPT'
        subTitle='gpt가 추천해주는 아이디어를 선점하세요.'
      />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {loaderData.ideas.map((idea) => (
          <IdeaCard
            key={idea.gpt_idea_id}
            id={idea.gpt_idea_id}
            title={idea.idea}
            viewsCount={idea.views}
            likesCount={idea.likes}
            postedAt={idea.created_at}
            claimed={idea.is_claimed}
          />
        ))}
      </div>
    </div>
  );
}
