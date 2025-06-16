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
import { FlickeringGrid } from "../components/flickering-grid";
import { BlurFade } from "components/magicui/blur-fade";
import { VelocityScroll } from "components/magicui/scroll-based-velocity";
import { Marquee } from "components/magicui/marquee";
import { Ripple } from "components/magicui/ripple";

export function meta() {
  return [
    { title: "Home | wemake" },
    { name: "description", content: "Welcome to wemake" },
  ];
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);

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
      <div className='relative h-[500px] w-full flex justify-center items-center bg-background overflow-hidden '>
        <FlickeringGrid
          className='z-0 absolute inset-0 size-full'
          squareSize={4}
          gridGap={5}
          color='#e11d48'
          maxOpacity={0.5}
          flickerChance={0.2}
        />
        <div className='flex flex-col text-center md:space-y-5 items-center'>
          <BlurFade delay={0.25} duration={1} inView>
            <h2 className='font-bold text-5xl md:text-7xl'>
              welcome to wemake 👋
            </h2>
          </BlurFade>
          <BlurFade delay={1} duration={1} inView>
            <span className='text-2xl md:text-5xl'>
              the home of indie makers
            </span>
          </BlurFade>
        </div>
      </div>

      <div className='relative'>
        <VelocityScroll
          defaultVelocity={5}
          className='font-display text-center text-5xl font-bold tracking-[-0.02em] md:leading-[5rem]'
        >
          code hard 💻 travel far 🌍
        </VelocityScroll>
        <div className='pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background'></div>
        <div className='pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background'></div>
      </div>

      <div className='grid grid-cols-3 gap-4 items-start'>
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
            reviewsCount={Number(product.stats.reviews)}
            viewsCount={Number(product.stats.views)}
            isPromoted={product.is_promoted}
            isUpvoted={product.is_upvoted}
            votesCount={Number(product.stats.upvotes)}
          />
        ))}
      </div>

      <BlurFade delay={0.25} duration={1} inView>
        <div className='space-y-10 relative md:h-[50vh] flex flex-col justify-center items-center overflow-hidden '>
          <div className='relative flex  flex-col justify-center items-center  md:p-64 z-50 md:bg-[radial-gradient(circle,hsl(var(--background))_40%,transparent_100%)] text-center md:text-left'>
            <h2 className='md:text-5xl text-3xl font-bold leading-tight tracking-tight '>
              IdeasGPT
            </h2>

            <p className='max-w-2xl md:text-xl font-light text-foreground'>
              AI generated startup ideas you can build.
            </p>

            <Button variant='link' asChild className='text-lg pl-0'>
              <Link to='/ideas'>View all ideas &rarr;</Link>
            </Button>
          </div>
          <div className='md:absolute w-full flex justify-between md:h-full h-[75vh]  top-0 left-0'>
            <Marquee
              pauseOnHover
              vertical
              className='[--duration:40s] flex z-50  gap-5'
            >
              {loaderData.ideas.map((idea) => (
                <div key={idea.gpt_idea_id}>
                  <IdeaCard
                    key={idea.gpt_idea_id}
                    id={idea.gpt_idea_id}
                    title={idea.idea}
                    viewsCount={idea.views}
                    likesCount={idea.likes}
                    postedAt={idea.created_at}
                    claimed={idea.is_claimed}
                  />
                </div>
              ))}
            </Marquee>
            <Marquee
              pauseOnHover
              reverse
              vertical
              className='[--duration:40s] hidden md:flex  md:gap-5'
            >
              {loaderData.ideas.map((idea) => (
                <div key={idea.gpt_idea_id}>
                  <IdeaCard
                    key={idea.gpt_idea_id}
                    id={idea.gpt_idea_id}
                    title={idea.idea}
                    viewsCount={idea.views}
                    postedAt={idea.created_at}
                    likesCount={idea.likes}
                    claimed={idea.is_claimed}
                  />
                </div>
              ))}
            </Marquee>
            <Marquee
              pauseOnHover
              vertical
              className='[--duration:40s] hidden md:flex  gap-5'
            >
              {loaderData.ideas.map((idea) => (
                <div key={idea.gpt_idea_id}>
                  <IdeaCard
                    key={idea.gpt_idea_id}
                    id={idea.gpt_idea_id}
                    title={idea.idea}
                    viewsCount={idea.views}
                    postedAt={idea.created_at}
                    likesCount={idea.likes}
                    claimed={idea.is_claimed}
                  />
                </div>
              ))}
            </Marquee>
            <Marquee
              pauseOnHover
              reverse
              vertical
              className='[--duration:40s] hidden md:flex  gap-5'
            >
              {loaderData.ideas.map((idea) => (
                <div key={idea.gpt_idea_id}>
                  <IdeaCard
                    key={idea.gpt_idea_id}
                    id={idea.gpt_idea_id}
                    title={idea.idea}
                    viewsCount={idea.views}
                    postedAt={idea.created_at}
                    likesCount={idea.likes}
                    claimed={idea.is_claimed}
                  />
                </div>
              ))}
            </Marquee>
            <div className='hidden md:block pointer-events-none absolute right-0 h-10 w-full top-0 z-10 bg-gradient-to-b from-white dark:from-background'></div>
            <div className='hidden md:block pointer-events-none absolute left-0 h-10 w-full bottom-10 z-10 bg-gradient-to-t from-white dark:from-background'></div>
          </div>
        </div>
      </BlurFade>

      <BlurFade delay={0.25} duration={1} inView>
        <div className='grid grid-cols-3 gap-4 items-center'>
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
          <div className='relative col-span-2 flex flex-col md:[perspective:500px] md:pb-40  overflow-hidden md:*:[transform:translateZ(-0px)_rotateY(-20deg)_rotateZ(10deg)]'>
            <Marquee
              pauseOnHover
              className='[--duration:40s] hidden md:flex items-stretch '
            >
              {loaderData.posts.map((post) => (
                <div key={post.post_id} className='w-full max-w-sm'>
                  <PostCard
                    key={post.post_id}
                    id={post.post_id}
                    title={post.title}
                    author={post.author}
                    authorAvatarUrl={post.authorAvatarUrl}
                    category={post.category}
                    postedAt={post.created_at}
                  />
                </div>
              ))}
            </Marquee>
            <Marquee
              pauseOnHover
              reverse
              className='[--duration:40s] flex items-stretch'
            >
              {loaderData.posts.map((post) => (
                <div key={post.post_id} className='w-full max-w-sm'>
                  <PostCard
                    key={post.post_id}
                    id={post.post_id}
                    title={post.title}
                    author={post.author}
                    authorAvatarUrl={post.authorAvatarUrl}
                    category={post.category}
                    postedAt={post.created_at}
                  />
                </div>
              ))}
            </Marquee>
            <Marquee
              pauseOnHover
              className='[--duration:40s] flex items-stretch'
            >
              {loaderData.posts.map((post) => (
                <div
                  key={post.post_id}
                  className='w-full max-w-sm [transform_rotateY(-20deg)]'
                >
                  <PostCard
                    key={post.post_id}
                    id={post.post_id}
                    title={post.title}
                    author={post.author}
                    authorAvatarUrl={post.authorAvatarUrl}
                    category={post.category}
                    postedAt={post.created_at}
                  />
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </BlurFade>
      <BlurFade delay={0.25} duration={1} inView>
        <div className='rounded-lg border overflow-hidden -mt-20 shadow-xl group'>
          <div className='relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden'>
            <div className='flex relative z-10 w-full justify-center items-center flex-col'>
              <h2 className='md:text-5xl text-3xl font-bold leading-tight tracking-tight '>
                Find a co-founder
              </h2>
              <p className='max-w-2xl md:text-xl font-light text-foreground'>
                Join a team looking for a co-founder.
              </p>
              <Button variant='link' asChild className='text-lg pl-0'>
                <Link to='/cofounders' className='pl-0'>
                  Find your new team &rarr;
                </Link>
              </Button>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:p-10 p-5 -mt-32 md:-mt-14  dark:bg-background bg-white'>
            {loaderData.teams.map((team, index) => (
              <BlurFade delay={0.1 * index} duration={0.25} inView key={index}>
                <div className='group-hover:blur-sm h-full group-hover:hover:blur-0 group-hover:hover:grayscale-0 group-hover:grayscale group-hover:hover:scale-105 duration-300'>
                  <TeamCard
                    key={team.team_id}
                    id={team.team_id}
                    username={team.team_leader.username}
                    userAvatarUrl={team.team_leader.avatar}
                    roles={team.roles.split(",")}
                    productDescription={team.productDescription}
                  />
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </BlurFade>

      <BlurFade delay={0.25} duration={1} inView>
        <div className='md:-mt-44 overflow-hidden '>
          <div className='flex h-[75vh] relative flex-col z-0 justify-center items-center text-center md:text-left'>
            <h2 className='md:text-5xl text-3xl font-bold leading-tight tracking-tight '>
              Latest jobs
            </h2>
            <p className='max-w-2xl md:text-xl font-light text-foreground'>
              Find your dream job.
            </p>
            <Button variant='link' asChild className='text-lg z-10 md:pl-0'>
              <Link to='/jobs'>View all jobs &rarr;</Link>
            </Button>
            <Ripple className='bg-transparent rounded-lg' />
          </div>
          <div className='grid grid-cols-1 relative z-10 bg-background md:grid-cols-3 gap-4 -mt-44'>
            {loaderData.jobs.map((job, index) => (
              <BlurFade
                delay={0.1 * index}
                duration={0.25}
                inView
                key={index}
                className='w-full'
              >
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
              </BlurFade>
            ))}
          </div>
        </div>
      </BlurFade>
    </div>
  );
}
