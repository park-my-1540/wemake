import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { cn } from "~/lib/utils";
import { SidebarMenuItem, SidebarMenuButton } from "~/components/ui/sidebar";
import { Link } from "react-router";
import { useLocation } from "react-router";
interface MessageCardProps {
  avatarUrl: string;
  name: string;
  lastMessage: string;
  className?: string;
  id: string;
}

export function MessageCard({
  avatarUrl,
  id,
  name,
  lastMessage,
  className,
}: MessageCardProps) {
  const location = useLocation();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        className='h-18'
        asChild
        isActive={location.pathname === `/my/messages/${id}`}
      >
        <Link to={`/my/messages/${id}`}>
          <div className={cn("flex items-center gap-2", className)}>
            <Avatar>
              <AvatarImage src={avatarUrl} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
              <span className='text-sm font-medium'>{name}</span>
              <span className='text-xs text-muted-foreground'>
                {lastMessage} 12
              </span>
            </div>
          </div>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
