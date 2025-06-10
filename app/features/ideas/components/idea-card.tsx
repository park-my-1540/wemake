import { DotIcon, EyeIcon, HeartIcon, CheckIcon, LockIcon } from "lucide-react";
import { DateTime } from "luxon";
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
  viewsCount?: number;
  likesCount?: number;
  postedAt?: string;
  claimed?: boolean;
  owner?: boolean;
}

export function IdeaCard({
  id,
  title,
  owner,
  viewsCount,
  likesCount,
  postedAt,
  claimed,
}: IdeaCardProps) {
  return (
    <Card className='bg-transparent hover:bg-card/50 transition-colors'>
      <CardHeader>
        <Link to={claimed || owner ? "" : `/ideas/${id}`}>
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
      {owner ? null : (
        <CardContent className='flex items-center text-sm'>
          <div className='flex items-center gap-2'>
            <EyeIcon className='w-4 h-4' />
            <span>{viewsCount} views</span>
          </div>
          <DotIcon className='w-4 h-4' />
          {postedAt ? (
            <span>{DateTime.fromISO(postedAt).toRelative()}</span>
          ) : null}
        </CardContent>
      )}
      <CardFooter className='flex justify-end gap-2'>
        {!claimed && !owner ? (
          <>
            <Button variant='outline'>
              <HeartIcon className='w-4 h-4' />
              <span>{likesCount}</span>
            </Button>
            <Button asChild>
              <Link to={`/ideas/${id}`}>아이디어 선점하기 &rarr;</Link>
            </Button>
          </>
        ) : (
          <Button variant='outline' className='cursor-not-allowed' disabled>
            <LockIcon className='w-4 h-4' />
            선점됨
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
