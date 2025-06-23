import { Link } from "react-router";
import { Separator } from "./ui/separator";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";

import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  BarChart3Icon,
  SettingsIcon,
  UserIcon,
  LogOutIcon,
  BellIcon,
  MessageCircleIcon,
} from "lucide-react";

const menus = [
  {
    name: "제품",
    to: "/products",
    items: [
      {
        name: "리더보드",
        description: "커뮤니티의 상위 제품을 확인해보세요",
        to: "/products/leaderboards",
      },
      {
        name: "카테고리",
        description: "커뮤니티의 다양한 카테고리를 살펴보세요",
        to: "/products/categories",
      },
      {
        name: "검색",
        description: "원하는 제품을 검색해보세요",
        to: "/products/search",
      },
      {
        name: "제품 등록",
        description: "커뮤니티에 제품을 등록해보세요",
        to: "/products/submit",
      },
      {
        name: "제품 홍보",
        description: "제품을 커뮤니티에 홍보해보세요",
        to: "/products/promote",
      },
    ],
  },
  {
    name: "채용",
    to: "/jobs",
    items: [
      {
        name: "원격 근무",
        description: "원격 근무 가능한 채용 공고를 찾아보세요",
        to: "/jobs?location=remote",
      },
      {
        name: "정규직",
        description: "정규직 채용 공고를 확인해보세요",
        to: "/jobs?type=full-time",
      },
      {
        name: "프리랜서",
        description: "프리랜서 채용 공고를 찾아보세요",
        to: "/jobs?type=full-time",
      },
      {
        name: "인턴십",
        description: "인턴십 채용 공고를 확인해보세요",
        to: "/jobs?type=internship",
      },
      {
        name: "채용 등록",
        description: "커뮤니티에 채용 공고를 등록해보세요",
        to: "/jobs/submit",
      },
    ],
  },
  {
    name: "커뮤니티",
    to: "/community",
    items: [
      {
        name: "전체 글",
        description: "커뮤니티의 모든 글을 확인해보세요",
        to: "/community",
      },
      {
        name: "인기 글",
        description: "가장 인기 있는 글들을 모아봤어요",
        to: "/community?sort=top",
      },
      {
        name: "최신 글",
        description: "가장 최근에 올라온 글들을 확인해보세요",
        to: "/community?sort=new",
      },
      {
        name: "글 작성하기",
        description: "커뮤니티에 글을 남겨보세요",
        to: "/community/create",
      },
    ],
  },
  {
    name: "아이디어GPT",
    to: "/ideas",
  },
  {
    name: "팀",
    to: "/teams",
    items: [
      {
        name: "전체 팀",
        description: "커뮤니티의 모든 팀을 둘러보세요",
        to: "/teams",
      },
      {
        name: "팀 만들기",
        description: "나만의 팀을 만들어보세요",
        to: "/teams/create",
      },
    ],
  },
];

export default function Navigation({
  isLoggedIn,
  hasNotifications,
  hasMessages,
  username,
  avatar,
  name,
}: {
  isLoggedIn: boolean;
  hasNotifications: boolean;
  hasMessages: number;
  username: string;
  avatar: string;
  name: string;
}) {
  return (
    <nav className='flex px-20 h-16 items-center justify-between backdrop-blur fixed top-0 left-0 right-0 z-50 bg-background/50'>
      <div className='flex items-center gap-4'>
        <Link to='/' className='font-bold tracking-tighter text-lg'>
          wemake
        </Link>
        <Separator orientation='vertical' className='h-6 mx-4' />
        <NavigationMenu>
          <NavigationMenuList>
            {menus.map((menu) => (
              <NavigationMenuItem key={menu.name}>
                {menu.items ? (
                  <>
                    <Link to={menu.to} prefetch='intent'>
                      <NavigationMenuTrigger>{menu.name}</NavigationMenuTrigger>
                    </Link>
                    <NavigationMenuContent>
                      <ul className='grid w-[400px] font-light gap-3 p-4 grid-cols-2'>
                        {menu.items?.map((item) => (
                          <NavigationMenuItem
                            key={item.name}
                            className={cn(
                              "select-none rounded-md transition-colors focus:bg-accent hover:bg-accent",
                              item.to === "/products/promote" &&
                                "col-span-2 bg-primary/10 hover:bg-primary/20 focus:bg-primary/20",
                              item.to === "/products/submit" &&
                                "bg-primary/10 hover:bg-primary/20 focus:bg-primary/20"
                            )}
                          >
                            <NavigationMenuLink asChild>
                              <Link
                                className='p-3 space-y-1 block loading-none no-underline outline-none'
                                to={item.to}
                              >
                                <span className='text-sm font-medium leading-none'>
                                  {item.name}
                                </span>
                                <p className='text-sm text-muted-foreground'>
                                  {item.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <Link to={menu.to} className={navigationMenuTriggerStyle()}>
                    {menu.name}
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {isLoggedIn ? (
        <div className='flex items-center gap-2'>
          <Button size='icon' variant='ghost' asChild className='relative'>
            <Link to='/my/notifications'>
              <BellIcon className='w-4 h-4' />
              {hasNotifications && (
                <span className='absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full '></span>
              )}
            </Link>
          </Button>
          <Button size='icon' variant='ghost' asChild className='relative'>
            <Link to='/my/messages'>
              <MessageCircleIcon className='w-4 h-4' />
              {hasMessages && (
                <span className='absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full '></span>
              )}
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                {avatar ? (
                  <AvatarImage src={avatar} />
                ) : (
                  <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
                )}
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
              <DropdownMenuLabel className='flex flex-col'>
                <span className='font-normal'>{name}</span>
                <span className='text-xs text-muted-foreground'>
                  @{username}
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild className='cursor-pointer'>
                  <Link to='/my/dashboard'>
                    <BarChart3Icon className='w-4 h-4 mr-2' />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className='cursor-pointer'>
                  <Link to='/my/profile'>
                    <UserIcon className='w-4 h-4 mr-2' />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className='cursor-pointer'>
                  <Link to='/my/settings'>
                    <SettingsIcon className='w-4 h-4 mr-2' />
                    Settings
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className='cursor-pointer'>
                <Link to='/auth/logout'>
                  <LogOutIcon className='w-4 h-4 mr-2' />
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className='flex items-center gap-4'>
          <Button asChild variant='outline'>
            <Link to='/auth/login'>로그인</Link>
          </Button>
          <Button asChild variant='default'>
            <Link to='/auth/join'>회원가입</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
