import type { Route } from "./+types/ideas-page.types";
import { HeroSection } from "~/common/components/hero-section";
import { IdeaCard } from "../components/idea-card";
import { DotIcon, HeartIcon } from "lucide-react";
import { EyeIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
export const meta: Route.MetaFunction = () => {
  return [
    { title: "IdeasGPT" },
    { name: "description", content: "Find your next great idea" },
  ];
};

export default function IdeasPage() {
  return (
    <div className='space-y-20'>
      <HeroSection title='Ideas #1212' />
      <div className='max-w-screen-sm mx-auto flex flex-col items-center gap-10'>
        <p className='italic'>
          A startup that creates an AI-powered personal trainer, delivering
          customized fitness recommendations and tracking of progress using a
          mobile app to track workouts and progress as well as a website to
          manage the business
        </p>
        <div className='flex items-center text-sm'>
          <div className='flex items-center gap-2'>
            <EyeIcon className='w-4 h-4' />
            <span>123 views</span>
          </div>
          <DotIcon className='w-4 h-4' />
          <span>12 hours ago</span>
          <DotIcon className='w-4 h-4' />
          <Button variant='outline'>
            <HeartIcon className='w-4 h-4' />
            <span>123</span>
          </Button>
        </div>
        <Button size='lg'>Claim idea now &rarr;</Button>
      </div>
    </div>
  );
}
