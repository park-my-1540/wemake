import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { cn } from "~/lib/utils";

interface MessageBubbleProps {
  avatarUrl: string;
  name: string;
  content: string;
  isCurrentUser?: boolean;
  className?: string;
}

export function MessageBubble({
  avatarUrl,
  name,
  content,
  isCurrentUser = false,
  className,
}: MessageBubbleProps) {
  return (
    <div
      className={cn(
        "flex items-end gap-4",
        isCurrentUser ? "flex-row-reverse" : "",
        className
      )}
    >
      <Avatar className='size-12'>
        <AvatarImage src={avatarUrl} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div
        className={cn(
          "rounded-md p-4 text-sm w-1/4",
          isCurrentUser
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-accent rounded-bl-none"
        )}
      >
        <p>{content}</p>
      </div>
    </div>
  );
}
