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
    name: "Products",
    to: "/products",
    items: [
      {
        name: "Leaderboards",
        description: "See the top performers in your community",
        to: "/products/leaderboards",
      },
      {
        name: "Categories",
        description: "See the categories in our community",
        to: "/products/categories",
      },
      {
        name: "Search",
        description: "Search for products",
        to: "/products/search",
      },
      {
        name: "Submit a Product",
        description: "Submit a product to our community",
        to: "/products/submit",
      },
      {
        name: "Promote",
        description: "Promote your product to our community",
        to: "/products/promote",
      },
    ],
  },
  {
    name: "Jobs",
    to: "/jobs",
    items: [
      {
        name: "Remote Jobs",
        description: "Find a remote job in our community",
        to: "/jobs?location=remote",
      },
      {
        name: "Full-Time Jobs",
        description: "Find a Full-Time job in our community",
        to: "/jobs?type=full-time",
      },
      {
        name: "Freelance Jobs",
        description: "Find a Freelance job in our community",
        to: "/jobs?type=full-time",
      },
      {
        name: "Internships",
        description: "Find an Internships in our community",
        to: "/jobs?type=internship",
      },
      {
        name: "Submit a Job",
        description: "Submit a job in our community",
        to: "/jobs/submit",
      },
    ],
  },
  {
    name: "Community",
    to: "/community",
    items: [
      {
        name: "All Posts",
        description: "Join all posts in our community",
        to: "/community",
      },
      {
        name: "Top Posts",
        description: "Join all posts in our community",
        to: "/community?sort=top",
      },
      {
        name: "New Posts",
        description: "Join all posts in our community",
        to: "/community?sort=new",
      },
      {
        name: "Create a Post",
        description: "Create a post in our community",
        to: "/community/create",
      },
    ],
  },
  {
    name: "IdeasGPT",
    to: "/ideas",
  },
  {
    name: "Teams",
    to: "/teams",
    items: [
      {
        name: "All Teams",
        description: "Join all teams in our community",
        to: "/teams",
      },
      {
        name: "Create a Team",
        description: "Create a team in our community",
        to: "/teams/create",
      },
    ],
  },
];

export default function Navigation({
  isLoggedIn,
  hasNotifications,
  hasMessages,
}: {
  isLoggedIn: boolean;
  hasNotifications: number;
  hasMessages: number;
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
                <AvatarImage src='https://github.com/shadcn.png' />
                <AvatarFallback>N</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
              <DropdownMenuLabel className='flex flex-col'>
                <span className='font-normal'>John Doe</span>
                <span className='text-xs text-muted-foreground'>@username</span>
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
            <Link to='/auth/login'>Login</Link>
          </Button>
          <Button asChild variant='default'>
            <Link to='/auth/signup'>SignIn</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
