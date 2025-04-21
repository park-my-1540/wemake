import { Card, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { EyeIcon } from "lucide-react";
import { cn } from "~/lib/utils";
interface NotificationCardProps {
  username: string;
  avatarUrl: string;
  avatarFallback: string;
  content: string;
  timestamp: string;
  seen: boolean;
  onView?: () => void;
}

export function NotificationCard({
  avatarUrl,
  avatarFallback,
  content,
  timestamp,
  username,
  seen = false,
  onView,
}: NotificationCardProps) {
  return (
    <Card className={cn("min-w-[450px]", seen ? "bg-yellow-500/60" : "")}>
      <CardHeader className='flex flex-row gap-5 items-start'>
        <Avatar>
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <div className='flex flex-col gap-1'>
          <CardTitle className='text-lg font-bold'>
            <span>{username}</span>
            <span>{content}</span>
          </CardTitle>
          <small className='text-sm text-muted-foreground'>{timestamp}</small>
        </div>
      </CardHeader>
      <CardFooter className='flex justify-end'>
        <Button variant='outline' size='icon' onClick={onView}>
          <EyeIcon className='w-4 h-4' />
        </Button>
      </CardFooter>
    </Card>
  );
}
