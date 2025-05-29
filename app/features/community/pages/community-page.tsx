import { HeroSection } from "~/common/components/hero-section";
import type { Route } from "./+types/community-page";
import { data, Form, Link, useSearchParams } from "react-router";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "~/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { SORT_OPTIONS_MAP, PERIOD_OPTIONS_MAP } from "../constants";
import { Input } from "~/components/ui/input";
import { PostCard } from "../components/post-card";
import { getPosts, getTopics } from "../queries";
import { z } from "zod";
import { makeSSRClient } from "~/supa-client";

const searchParamsSchema = z.object({
  sorting: z.enum(["newest", "popular"]).optional().default("newest"),
  period: z
    .enum(["all", "today", "week", "month", "year"])
    .optional()
    .default("all"),
  keyword: z.string().optional(),
  topic: z.string().optional(),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
  // await new Promise((resolve) => setTimeout(resolve, 10000));
  const url = new URL(request.url);
  const { success, data: parsedData } = searchParamsSchema.safeParse(
    Object.fromEntries(url.searchParams)
  );
  if (!success) {
    throw data(
      {
        error_code: "invalid_search_params",
        message: "Invalid search params",
      },
      { status: 400 }
    );
  }
  const { client, headers } = makeSSRClient(request);
  const [topics, posts] = await Promise.all([
    getTopics(client),
    getPosts(client, {
      limit: 20,
      sorting: parsedData.sorting,
      period: parsedData.period,
      keyword: parsedData.keyword,
      topic: parsedData.topic,
    }),
  ]);

  return { topics, posts };
};

export const meta: Route.MetaFunction = () => [{ title: "커뮤니티" }];

export default function CommunityPage({ loaderData }: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sorting = searchParams.get("sorting") || "newest";
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
                    <span className='text-sm capitalize'>
                      {SORT_OPTIONS_MAP.get(sorting)}
                    </span>
                    <ChevronDownIcon className='w-4 h-4' />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {[...SORT_OPTIONS_MAP.entries()].map(([key, value]) => (
                      <DropdownMenuCheckboxItem
                        className='capitalize cursor-pointer'
                        onCheckedChange={(checked: boolean) => {
                          if (checked) {
                            searchParams.set("sorting", key);
                            setSearchParams(searchParams);
                          }
                        }}
                        key={key}
                      >
                        {value}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                {sorting === "popular" && (
                  <DropdownMenu>
                    <DropdownMenuTrigger className='flex items-center gap-2'>
                      <span className='text-sm capitalize'>
                        {PERIOD_OPTIONS_MAP.get(period)}
                      </span>
                      <ChevronDownIcon className='w-4 h-4' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {[...PERIOD_OPTIONS_MAP.entries()].map(([key, value]) => (
                        <DropdownMenuCheckboxItem
                          className='capitalize cursor-pointer'
                          onCheckedChange={(checked: boolean) => {
                            if (checked) {
                              searchParams.set("period", key);
                              setSearchParams(searchParams);
                            }
                          }}
                          key={key}
                        >
                          {value}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
              <Form className='w-2/3'>
                <Input
                  type='text'
                  name='keyword'
                  placeholder='검색어를 입력해주세요.'
                />
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
                author={post.author}
                authorAvatarUrl={post.author_avatar}
                category={post.topic}
                postedAt={post.created_at}
                votesCount={post.upvotes}
                isUpvoted={post.is_upvoted}
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
