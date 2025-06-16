import { Link, useFetcher, useNavigate, useOutletContext } from "react-router";
import { ChevronUpIcon, EyeIcon, MessageCircleIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  reviewsCount: number;
  viewsCount: number;
  votesCount: number;
  isUpvoted: boolean;
  isPromoted: string | null;
}

export function ProductCard({
  id,
  name,
  description,
  reviewsCount,
  viewsCount,
  votesCount,
  isUpvoted,
  isPromoted,
}: ProductCardProps) {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const { isLoggedIn } = useOutletContext<{ isLoggedIn: boolean }>();

  const optimisitcVotesCount =
    fetcher.state === "idle"
      ? votesCount
      : isUpvoted
        ? votesCount - 1
        : votesCount + 1;

  const optimisitcIsUpvoted = fetcher.state === "idle" ? isUpvoted : !isUpvoted;

  const absorbClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("Please log in first!");
      navigate("/auth/login");
      return;
    }

    fetcher.submit(null, {
      method: "POST",
      action: `/products/${id}/upvote`,
    });
  };

  const content = (
    <Link to={`/products/${id}`} className='block relative z-10'>
      <Card
        className={cn(
          "w-full flex items-center justify-between",
          isPromoted ? "" : "bg-transparent hover:bg-slate-900"
        )}
      >
        <CardHeader className='w-full relative'>
          {isPromoted ? (
            <Badge variant={"outline"} className='absolute top-8 -right-2'>
              Promoted
            </Badge>
          ) : null}
          <CardTitle className='text-2xl flex-wrap font-semibold leading-none flex justify-between w-full items-center gap-2 tracking-tight'>
            {name}{" "}
          </CardTitle>
          <CardDescription className='text-muted-foreground'>
            {description}
          </CardDescription>
          <div className='flex items-center gap-4 mt-2'>
            <div className='flex items-center gap-px text-xs text-muted-foreground'>
              <MessageCircleIcon className='w-4 h-4' />
              <span>{reviewsCount}</span>
            </div>
            <div className='flex items-center gap-px text-xs text-muted-foreground'>
              <EyeIcon className='w-4 h-4' />
              <span>{viewsCount}</span>
            </div>
          </div>
        </CardHeader>
        <CardFooter className='py-0'>
          <Button
            onClick={absorbClick}
            variant='outline'
            className={cn(
              "flex flex-col h-14",
              optimisitcIsUpvoted ? "border-primary text-primary" : ""
            )}
          >
            <ChevronUpIcon className='size-4 shrink-0' />
            <span>{optimisitcVotesCount}</span>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
  return isPromoted ? (
    <div className='relative p-[1px] rounded-xl bg-gradient-to-r from-red-500 to-yellow-500'>
      {content}
      <div className='absolute inset-0 rounded-xl bg-gradient-to-r from-red-500 to-yellow-500 blur-md opacity-30 z-0'></div>
    </div>
  ) : (
    content
  );
}
