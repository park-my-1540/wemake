import { HeroSection } from "~/common/components/hero-section";
import type { Route } from "./+types/community-page";
import { Form, Link, useSearchParams } from "react-router";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
} from "~/components/ui/dropdown-menu";
import { ChevronDownIcon, FilterIcon } from "lucide-react";
import { SORT_OPTIONS, PERIOD_OPTIONS } from "../constants";
import { Input } from "~/components/ui/input";
import { PostCard } from "../components/post-card";
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
            {Array.from({ length: 10 }).map((_, index) => (
              <PostCard
                id='postId'
                title='What is the best way to learn React?'
                author='Sia'
                authorAvatarUrl='https://github.com/apple.png'
                category='productivity'
                postedAt='12 hours ago'
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
            {[
              "AI Tools",
              "Design Tools",
              "Web Tools",
              "Mobile Tools",
              "Game Tools",
              "Other",
            ].map((category) => (
              <h3>
                <Button variant='link' asChild className='p-0'>
                  <Link
                    className='font-semibold'
                    to={`/community?topic=${category}`}
                  >
                    {category}
                  </Link>
                </Button>
              </h3>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
