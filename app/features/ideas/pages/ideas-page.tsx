import type { Route } from "./+types/ideas-page.types";
import { HeroSection } from "~/common/components/hero-section";
import { IdeaCard } from "../components/idea-card";
export const meta: Route.MetaFunction = () => {
  return [
    { title: "IdeasGPT" },
    { name: "description", content: "Find your next great idea" },
  ];
};

export default function IdeasPage() {
  return (
    <div className='space-y-20'>
      <HeroSection title='IdeasGPT' subTitle='Find your next great idea' />
      <div className='grid grid-cols-4 gap-4'>
        {Array.from({ length: 10 }).map((_, index) => (
          <IdeaCard
            key={index}
            id='ideaId'
            title='A startup that creates an AI-powered personal trainer, delivering customized fitness recommendations and tracking of progress using a mobile app to track workouts and progress as well as a website to manage the business'
            viewCount={123}
            postedAt='12 hours ago'
            claimed={index % 2 === 0}
          />
        ))}
      </div>
    </div>
  );
}
