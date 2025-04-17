import { DotIcon, EyeIcon, HeartIcon, CheckIcon, LockIcon } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";

interface IdeaCardProps {
  id: string;
  title: string;
  viewCount: number;
  likesCount: number;
  postedAt: string;
  claimed: boolean;
}

export function IdeaCard({
  id,
  title,
  viewCount,
  likesCount,
  postedAt,
  claimed,
}: IdeaCardProps) {
  return (
    <Card className='bg-transparent hover:bg-card/50 transition-colors'>
      <CardHeader>
        <Link to={`/ideas/${id}`}>
          <CardTitle className='text-xl'>
            <span
              className={cn(
                claimed
                  ? "bg-muted-foreground selection:bg-muted-foreground text-muted-foreground"
                  : ""
              )}
            >
              {title}
            </span>
          </CardTitle>
        </Link>
      </CardHeader>
      <CardContent className='flex items-center text-sm'>
        <div className='flex items-center gap-2'>
          <EyeIcon className='w-4 h-4' />
          <span>{viewCount} views</span>
        </div>
        <DotIcon className='w-4 h-4' />
        <span>{postedAt}</span>
      </CardContent>
      <CardFooter className='flex justify-end gap-2'>
        <Button variant='outline'>
          <HeartIcon className='w-4 h-4' />
          <span>{likesCount}</span>
        </Button>
        {!claimed ? (
          <Button asChild>
            <Link to={`/ideas/${id}`}>Claim idea now &rarr;</Link>
          </Button>
        ) : (
          <Button variant='outline' className='cursor-not-allowed'>
            <LockIcon className='w-4 h-4' />
            Claimed
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
