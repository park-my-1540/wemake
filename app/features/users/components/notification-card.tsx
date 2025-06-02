import { Card, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { EyeIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { Link, useFetcher } from "react-router";
interface NotificationCardProps {
  username: string;
  avatarUrl: string;
  avatarFallback: string;
  type: "review" | "follow" | "reply";
  timestamp: string | null;
  seen: boolean;
  productName?: string;
  payloadId?: number;
  postTitle?: string;
  id: number;
  onView?: () => void;
}

export function NotificationCard({
  avatarUrl,
  avatarFallback,
  type,
  timestamp,
  username,
  seen = false,
  productName,
  postTitle,
  payloadId,
  id,
  onView,
}: NotificationCardProps) {
  const fetcher = useFetcher();

  const optimisitcSeen = fetcher.state === "idle" ? seen : true;
  const getMessage = (type: "review" | "follow" | "reply") => {
    switch (type) {
      case "follow":
        return "님이 팔로우 하였습니다.";
      case "review":
        return " 에 리뷰를 남겼습니다. ";
      case "reply":
        return " 에 댓글을 남겼습니다. ";
    }
  };

  return (
    <Card
      className={cn("min-w-[450px]", !optimisitcSeen ? "bg-yellow-500/60" : "")}
    >
      <CardHeader className='flex flex-row gap-5 items-start'>
        <Avatar>
          {avatarUrl ? <AvatarImage src={avatarUrl} /> : null}
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <div className='flex flex-col gap-1'>
          <CardTitle className='text-lg font-bold'>
            <span>{username}</span>

            {productName && (
              <Button variant={"ghost"} asChild className='text-lg'>
                <Link to={`/products/${payloadId}`}>{productName}</Link>
              </Button>
            )}
            {postTitle && (
              <Button variant={"ghost"} asChild className='text-lg'>
                <Link to={`/community/${payloadId}`}>{postTitle}</Link>
              </Button>
            )}
            <span>{getMessage(type)}</span>
          </CardTitle>
          <small className='text-sm text-muted-foreground'>{timestamp}</small>
        </div>
      </CardHeader>
      <CardFooter className='flex justify-end'>
        <fetcher.Form method='post' action={`/my/notifications/${id}/see`}>
          <Button variant='outline' size='icon' onClick={onView}>
            <EyeIcon className='w-4 h-4' />
          </Button>
        </fetcher.Form>
      </CardFooter>
    </Card>
  );
}
