import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { ProductCard } from "~/features/products/components/product-card";
import { PostCard } from "~/features/community/components/post-card";
import { IdeaCard } from "~/features/ideas/components/idea-card";
import { JobCard } from "~/features/jobs/components/job-card";
import { TeamCard } from "~/features/teams/components/team-card";
import { DateTime } from "luxon";
import { getProductsByDateRange } from "~/features/products/queries";

import type { Route } from "./+types";
export function meta() {
  return [
    { title: "Home | wemake" },
    { name: "description", content: "Welcome to wemake" },
  ];
}

export const loader = async () => {
  const products = await getProductsByDateRange({
    startDate: DateTime.now().startOf("day"),
    endDate: DateTime.now().endOf("day"),
    limit: 7,
  });
  return { products };
};

export default function Home({
  loaderData,
}: {
  loaderData: Route.ComponentProps;
}) {
  return (
    <div className='px-20 space-y-40'>
      <div className='grid grid-cols-3 gap-4'>
        <div>
          <h2 className='text-5xl font-bold leading-tight tracking-tight'>
            Today's Products
          </h2>
          <p className='text-xl font-light text-foreground'>
            The best products made by our community
          </p>
          <Button variant='link' asChild className='text-lg p-0'>
            <Link to='/products/leaderboards'>Explore all products &rarr;</Link>
          </Button>
        </div>
        {loaderData.products.map((product, index) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id.toString()}
            name={product.name}
            description={product.description}
            commentsCount={product.comments || 0}
            reviewsCount={Number(product.reviews)}
            viewsCount={product.views}
            votesCount={Number(product.upvotes)}
          />
        ))}
      </div>
      <div className='grid grid-cols-3 gap-4'>
        <div>
          <h2 className='text-5xl font-bold leading-tight tracking-tight'>
            Latest Discussions
          </h2>
          <p className='text-xl font-light text-foreground'>
            The latest discussions from our community
          </p>
          <Button variant='link' asChild className='text-lg p-0'>
            <Link to='/community'>Explore all discussions &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
          <PostCard
            key={index}
            id='postId'
            title='What is the best way to learn React?'
            author='Sia'
            authorAvatarUrl='https://github.com/apple.png'
            category='productivity'
            postedAt='12 hours ago'
          />
        ))}
      </div>
      <div className='grid grid-cols-3 gap-4'>
        <div>
          <h2 className='text-5xl font-bold leading-tight tracking-tight'>
            IdeasGPT
          </h2>
          <p className='text-xl font-light text-foreground'>
            Find ideas for your next project
          </p>
          <Button variant='link' asChild className='text-lg p-0'>
            <Link to='/community'>Explore all discussions &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
          <IdeaCard
            key={index}
            id='ideaId'
            title='A startup that creates an AI-powered personal trainer, delivering customized fitness recommendations and tracking of progress using a mobile app to track workouts and progress as well as a website to manage the business'
            viewCount={123}
            likesCount={123}
            postedAt='12 hours ago'
            claimed={index % 2 === 0}
          />
        ))}
      </div>
      <div className='grid grid-cols-3 gap-4'>
        <div>
          <h2 className='text-5xl font-bold leading-tight tracking-tight'>
            Latest Jobs
          </h2>
          <p className='text-xl font-light text-foreground'>
            Find jobs for your dream job
          </p>
          <Button variant='link' asChild className='text-lg p-0'>
            <Link to='/job'>Explore all discussions &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
          <JobCard
            key={index}
            id='jobId'
            companyName='Tesla'
            companyLogoUrl='https://github.com/facebook.png'
            jobTitle='Frontend Engineer'
            postedAt='12 hours ago'
            jobType='Full-time'
            locationType='Remote'
            salaryRange='$100,000 - $120,000'
            location='Seoul'
          />
        ))}
      </div>
      <div className='grid grid-cols-3 gap-4'>
        <div>
          <h2 className='text-5xl font-bold leading-tight tracking-tight'>
            Find a team mate
          </h2>
          <p className='text-xl font-light text-foreground'>
            Join a team looking for a team mate
          </p>
          <Button variant='link' asChild className='text-lg p-0'>
            <Link to='/teams'>Explore all teams &rarr;</Link>
          </Button>
        </div>
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
