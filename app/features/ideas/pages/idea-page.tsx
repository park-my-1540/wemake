import type { Route } from "./+types/idea-page.types";
import { HeroSection } from "~/common/components/hero-section";
import { getGptIdea } from "~/features/ideas/queries";
import { DotIcon, HeartIcon } from "lucide-react";
import { EyeIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { DateTime } from "luxon";
import { makeSSRClient } from "~/supa-client";

export const meta = ({
  data: {
    ideas: { gpt_idea_id, idea },
  },
}: Route.MetaArgs) => {
  return [
    { title: `Idea #${gpt_idea_id}: ${idea} | wemake` },
    { name: "description", content: "Find ideas for your next project" },
  ];
};
export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const idea = await getGptIdea(client, { ideaId: params.ideaId });
  return { idea };
};
export default function IdeasPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className='space-y-20'>
      <HeroSection title={`Idea #${loaderData.ideas.gpt_idea_id}`} />
      <div className='max-w-screen-sm mx-auto flex flex-col items-center gap-10'>
        <p className='italic'>{loaderData.ideas.idea}</p>
        <div className='flex items-center text-sm'>
          <div className='flex items-center gap-2'>
            <EyeIcon className='w-4 h-4' />
            <span>{loaderData.ideas.views}</span>
          </div>
          <DotIcon className='w-4 h-4' />
          <span>
            {DateTime.fromISO(loaderData.ideas.created_at).toRelative()}
          </span>
          <DotIcon className='w-4 h-4' />
          <Button variant='outline'>
            <HeartIcon className='w-4 h-4' />
            <span>{loaderData.ideas.likes}</span>
          </Button>
        </div>
        <Button size='lg'>아이디어 선점하기 &rarr;</Button>
      </div>
    </div>
  );
}
