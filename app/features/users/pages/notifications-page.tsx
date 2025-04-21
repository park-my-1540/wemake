import type { Route } from "./+types/notifications-page";
import { NotificationCard } from "../components/notification-card";

export const meta: Route.MetaFunction = () => [{ title: "Notifications" }];

export default function NotificationsPage() {
  return (
    <div className='space-y-20'>
      <h1 className='text-4xl font-bold'>알림</h1>
      <div className='flex flex-col items-start gap-5'>
        <NotificationCard
          username='Steve Jobs'
          seen={true}
          avatarUrl='https://github.com/stevejobs.png'
          avatarFallback='S'
          content='followed you.'
          timestamp='2일전'
        />
      </div>
    </div>
  );
}
