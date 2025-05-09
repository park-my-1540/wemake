import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { StarIcon } from "lucide-react";
import { DateTime } from "luxon";

interface ReviewCardProps {
  username: string;
  userHandle: string;
  avatarUrl?: string | null;
  rating: number;
  content: string;
  postedAt: string;
}

export function ReviewCard({
  username,
  userHandle,
  avatarUrl,
  rating,
  content,
  postedAt,
}: ReviewCardProps) {
  return (
    <div className='space-y-5'>
      <div className='flex items-center gap-2'>
        <Avatar>
          <AvatarFallback>{username.charAt(0)}</AvatarFallback>
          {avatarUrl ? <AvatarImage src={avatarUrl} /> : null}
        </Avatar>
        <div>
          <h4 className='text-lg font-bold'>{username}</h4>
          <p className='text-sm text-muted-foreground'>@{userHandle}</p>
        </div>
      </div>
      <div className='flex text-yellow-500'>
        {Array.from({ length: rating }).map((_, index) => (
          <StarIcon key={index} className='size-4' fill='currentColor' />
        ))}
      </div>
      <p className='text-muted-foreground'>{content}</p>
      <span className='text-xs text-muted-foreground'>
        {DateTime.fromISO(postedAt).toRelative()}
      </span>
    </div>
  );
}
