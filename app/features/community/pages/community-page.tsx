import { HeroSection } from "~/common/components/hero-section";
import type { Route } from "./+types/community-page";
import { Form, Link, useSearchParams } from "react-router";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "~/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { SORT_OPTIONS, PERIOD_OPTIONS } from "../constants";
import { Input } from "~/components/ui/input";
import { PostCard } from "../components/post-card";
import { getPosts, getTopics } from "../queries";

export const loader = async () => {
  const topics = await getTopics();
  const posts = await getPosts();
  console.log(posts);
  return { topics, posts };
};

export const meta: Route.MetaFunction = () => [{ title: "커뮤니티" }];

export default function CommunityPage({ loaderData }: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sorting = searchParams.get("sorting") || "최신순";
  const period = searchParams.get("period") || "전체";
  return (
    <div>
      <HeroSection
        title='Community'
        subTitle='Ask questions, share ideas, and connect with others in the community.'
      />
      <div className='grid grid-cols-6 gap-40'>
        <div className='col-span-4 space-y-10'>
          <div className='flex justify-between'>
            <div className='space-y-5 w-full'>
              <div className='flex items-center gap-5'>
                <DropdownMenu>
                  <DropdownMenuTrigger className='flex items-center gap-2'>
                    <span className='text-sm capitalize'>{sorting}</span>
                    <ChevronDownIcon className='w-4 h-4' />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {SORT_OPTIONS.map((option) => (
                      <DropdownMenuCheckboxItem
                        className='capitalize cursor-pointer'
                        onCheckedChange={(checked: boolean) => {
                          if (checked) {
                            searchParams.set("sorting", option);
                            setSearchParams(searchParams);
                          }
                        }}
                        key={option}
                      >
                        {option}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                {sorting === "popular" && (
                  <DropdownMenu>
                    <DropdownMenuTrigger className='flex items-center gap-2'>
                      <span className='text-sm capitalize'>{period}</span>
                      <ChevronDownIcon className='w-4 h-4' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {PERIOD_OPTIONS.map((option) => (
                        <DropdownMenuCheckboxItem
                          className='capitalize cursor-pointer'
                          onCheckedChange={(checked: boolean) => {
                            if (checked) {
                              searchParams.set("period", option);
                              setSearchParams(searchParams);
                            }
                          }}
                          key={option}
                        >
                          {option}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
              <Form className='w-2/3'>
                <Input type='text' name='search' placeholder='Search' />
              </Form>
            </div>
            <Button asChild>
              <Link to='/community/submit'>토론 생성하기</Link>
            </Button>
          </div>
          <div className='space-y-5'>
            {loaderData.posts.map((post) => (
              <PostCard
                id={post.post_id}
                key={post.post_id}
                title={post.title}
                author={post.author.name}
                authorAvatarUrl={post.author.avatar}
                category={post.topic.name}
                postedAt={post.created_at}
                upvoteCount={post.upvotes[0].count}
                expanded={true}
              />
            ))}
          </div>
        </div>
        <aside className='col-span-2'>
          <span className='text-sm font-bold text-muted-foreground uppercase'>
            Topics
          </span>
          <div className='flex flex-col gap-4 items-start'>
            {loaderData.topics.map((topic) => (
              <Button
                asChild
                variant={"link"}
                key={topic.slug}
                className='pl-0'
              >
                <Link to={`/community?topic=${topic.slug}`}>{topic.name}</Link>
              </Button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
