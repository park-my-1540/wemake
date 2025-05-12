import { Form, Link, NavLink, Outlet } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/lib/utils";
import type { Route } from "./+types/dashboard-layout";
import { getUserProfile } from "../queries";

export const loader = async ({
  params,
}: Route.LoaderArgs & { params: { username: string } }) => {
  const user = await getUserProfile(params.username);
  return { user };
};

export default function ProfileLayout({ loaderData }: Route.ComponentProps) {
  return (
    <div className='space-y-10'>
      <div className='flex items-center gap-4'>
        <Avatar className='size-40'>
          {loaderData.user.avatar ? (
            <AvatarImage src={loaderData.user.avatar} />
          ) : (
            <AvatarFallback className='text-2xl'>
              {loaderData.user.name.charAt(0)}
            </AvatarFallback>
          )}
        </Avatar>
        <div className='space-y-5'>
          <div className='flex gap-2'>
            <h1 className='text-2xl font-semibold'>{loaderData.user.name}</h1>
            <Button variant='outline' asChild>
              <Link to='/my/settings'>프로필 편집하기</Link>
            </Button>
            <Button variant='secondary'>팔로우</Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant='secondary'>메세지</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>메세지</DialogTitle>
                </DialogHeader>
                <DialogDescription className='space-y-4'>
                  <span className='text-sm text-muted-foreground'>
                    {loaderData.user.name}님에게 메세지를 보내세요.
                  </span>
                  <Form className='space-y-4'>
                    <Textarea
                      placeholder='메세지를 입력하세요.'
                      className='resize-none'
                      rows={4}
                    />
                    <Button type='submit'>보내기</Button>
                  </Form>
                </DialogDescription>
              </DialogContent>
            </Dialog>
          </div>
          <div className='flex gap-2 items-center'>
            <span className='text-sm text-muted-foreground'>
              @{loaderData.user.username}
            </span>
            <Badge variant='secondary'>{loaderData.user.role}</Badge>
            <Badge variant='secondary'>100 followers</Badge>
            <Badge variant='secondary'>100 following</Badge>
          </div>
        </div>
      </div>
      <div className='flex gap-5'>
        {[
          { label: "About", to: `/users/${loaderData.user.username}` },
          {
            label: "Products",
            to: `/users/${loaderData.user.username}/products`,
          },
          { label: "Posts", to: `/users/${loaderData.user.username}/posts` },
        ].map((item) => (
          <NavLink
            end
            className={({ isActive }) =>
              cn(
                buttonVariants({ variant: "outline" }),
                isActive && "bg-accent text-foreground"
              )
            }
            to={item.to}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
      <div className='max-w-screen-md'>
        <Outlet
          context={{
            headline: loaderData.user.headline,
            bio: loaderData.user.bio,
          }}
        />
      </div>
    </div>
  );
}
