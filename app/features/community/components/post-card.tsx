import { cn } from "~/lib/utils";
import { ChevronUpIcon, DotIcon } from "lucide-react";
import { Link } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";

interface PostCardProps {
  id: string;
  title: string;
  author: string;
  authorAvatarUrl: string;
  category: string;
  postedAt: string;
  expanded?: boolean;
  upvoteCount?: number;
}

export function PostCard({
  id,
  title,
  author,
  authorAvatarUrl,
  category,
  postedAt,
  expanded = false,
  upvoteCount = 0,
}: PostCardProps) {
  return (
    <Link to={`/community/${id}`} className='block'>
      <Card
        className={cn(
          "bg-transparent hover:bg-card/50 transition-colors",
          expanded ? "flex flex-row items-center justify-between" : ""
        )}
      >
        <CardHeader className='flex flex-row gap-2 items-center'>
          <Avatar className='size-14'>
            <AvatarImage src={authorAvatarUrl} />
            <AvatarFallback>N</AvatarFallback>
          </Avatar>
          <div className='space-y-2'>
            <CardTitle>{title}</CardTitle>
            <div className='flex gap-2 text-xs leading-none text-muted-foreground'>
              <span>{author} on</span>
              <span>{category}</span>
              <DotIcon className='w-4 h-4' />
              <span>{postedAt}</span>
            </div>
          </div>
        </CardHeader>
        {!expanded && (
          <CardFooter className='flex justify-end'>
            <Button variant='link'>Reply &rarr;</Button>
          </CardFooter>
        )}
        {expanded && (
          <CardFooter className='flex justify-end pt-0 pb-0'>
            <Button variant='outline' className='flex flex-col h-14'>
              <ChevronUpIcon className='size-4 shrink-0' />
              <span>{upvoteCount}</span>
            </Button>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
