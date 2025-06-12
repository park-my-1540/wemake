import { Link, useFetcher } from "react-router";
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
import { NeonGradientCard } from "components/magicui/neon-gradient-card";

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
  console.log(isPromoted);
  const optimisitcVotesCount =
    fetcher.state === "idle"
      ? votesCount
      : isUpvoted
        ? Number(votesCount) - 1
        : Number(votesCount) + 1;

  const optimisitcIsUpvoted = fetcher.state === "idle" ? isUpvoted : !isUpvoted;
  const absorbClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

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
          isPromoted ? "" : "bg-transparent hover:bg-card/50"
        )}
      >
        <CardHeader className='w-full'>
          <CardTitle className='text-2xl flex-wrap font-semibold leading-none flex justify-between w-full items-center gap-2 tracking-tight'>
            {name}{" "}
            {isPromoted ? <Badge variant={"outline"}>Promoted</Badge> : null}
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
            variant='outline'
            className={cn(optimisitcIsUpvoted && "", "flex flex-col h-14")}
            onClick={absorbClick}
          >
            <ChevronUpIcon className='size-4 shrink-0' />
            <span>{optimisitcVotesCount}</span>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
  return isPromoted ? (
    <NeonGradientCard
      borderSize={5}
      neonColors={{
        firstColor: "#fc4a1a",
        secondColor: "#f7b733",
      }}
    >
      {content}
    </NeonGradientCard>
  ) : (
    content
  );
}
