import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { ProductCard } from "~/features/products/components/product-card";
import { PostCard } from "~/features/community/components/post-card";
import { IdeaCard } from "~/features/ideas/components/idea-card";
import { JobCard } from "~/features/jobs/components/job-card";
import { TeamCard } from "~/features/teams/components/team-card";
import { DateTime } from "luxon";
import { getProductsByDateRange } from "~/features/products/queries";
import { getPosts } from "~/features/community/queries";
import type { Route } from "./+types/home-page";
import { getGptIdeas } from "~/features/ideas/queries";
import { getJobs } from "~/features/jobs/queries";
import { getTeams } from "~/features/teams/queries";
import { makeSSRClient } from "~/supa-client";

export function meta() {
  return [
    { title: "Home | wemake" },
    { name: "description", content: "Welcome to wemake" },
  ];
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);

  const products = await getProductsByDateRange(client, {
    startDate: DateTime.now().startOf("day"),
    endDate: DateTime.now().endOf("day"),
    limit: 7,
  });
  const posts = await getPosts(client, {
    limit: 7,
    sorting: "newest",
  });
  const ideas = await getGptIdeas(client, { limit: 7 });
  const jobs = await getJobs(client, { limit: 11 });
  const teams = await getTeams(client, { limit: 7 });
  return { products, posts, ideas, jobs, teams };
};

export default function Home({ loaderData }: Route.ComponentProps) {
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
        {loaderData.products.map((product) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id}
            name={product.name}
            description={product.tagline}
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
        {loaderData.posts.map((post) => (
          <PostCard
            key={post.post_id}
            id={post.post_id}
            title={post.title}
            author={post.author}
            authorAvatarUrl={post.authorAvatarUrl}
            category={post.category}
            postedAt={post.created_at}
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
            <Link to='/ideas'>Explore all discussions &rarr;</Link>
          </Button>
        </div>
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
      <div className='grid grid-cols-3 gap-4'>
        <div>
          <h2 className='text-5xl font-bold leading-tight tracking-tight'>
            Latest Jobs
          </h2>
          <p className='text-xl font-light text-foreground'>
            Find jobs for your dream job
          </p>
          <Button variant='link' asChild className='text-lg p-0'>
            <Link to='/jobs'>Explore all discussions &rarr;</Link>
          </Button>
        </div>
        {loaderData.jobs.map((job) => (
          <JobCard
            key={job.job_id}
            id={job.job_id}
            companyName={job.company_name}
            companyLogoUrl={job.company_logo}
            jobTitle={job.position}
            postedAt={job.created_at}
            jobType={job.job_type}
            locationType={job.job_location}
            salaryRange={job.salary_range}
            location={job.company_location}
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
        {loaderData.teams.map((team) => (
          <TeamCard
            key={team.team_id}
            id={team.team_id}
            username={team.team_leader.username}
            userAvatarUrl={team.team_leader.avatar}
            roles={team.roles.split(",")}
            productDescription={team.productDescription}
          />
        ))}
      </div>
    </div>
  );
}
