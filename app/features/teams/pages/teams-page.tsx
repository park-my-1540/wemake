import { TeamCard } from "../components/team-card";
import type { Route } from "./+types/teams-page";
import { HeroSection } from "~/common/components/hero-section";

export const meta: Route.MetaFunction = () => [{ title: "Teams" }];

export default function TeamsPage() {
  return (
    <div className='space-y-20'>
      <HeroSection
        title='Teams'
        description='Find a team looking for a new member'
      />
      <div className='grid grid-cols-4 gap-4'>
        {Array.from({ length: 10 }).map((_, index) => (
          <TeamCard
            id='teamId'
            username='sia'
            userAvatarUrl='https://github.com/inthetiger.png'
            positions={["React Developer", "Backend Developer"]}
            projectDescription='a new social media platform'
          />
        ))}
      </div>
    </div>
  );
}
