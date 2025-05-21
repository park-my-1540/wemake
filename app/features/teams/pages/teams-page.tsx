import { TeamCard } from "../components/team-card";
import type { Route } from "./+types/teams-page";
import { HeroSection } from "~/common/components/hero-section";
import { getTeams } from "~/features/teams/queries";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => [{ title: "Teams" }];
export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const teams = await getTeams(client, { limit: 7 });
  return { teams };
};

export default function TeamsPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className='space-y-20'>
      <HeroSection
        title='Teams'
        subTitle='새 팀원을 모집 중인 팀을 찾아보세요'
      />
      <div className='grid grid-cols-4 gap-4'>
        {loaderData.teams.map((team) => (
          <TeamCard
            key={team.team_id}
            id={team.team_id}
            username={team.team_leader[0].username}
            userAvatarUrl={team.team_leader[0].avatar}
            roles={team.roles.split(",")}
            productDescription={team.product_description}
          />
        ))}
      </div>
    </div>
  );
}
