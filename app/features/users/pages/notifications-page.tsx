import type { Route } from "./+types/notifications-page";
import { NotificationCard } from "../components/notification-card";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId, getNotifications } from "../queries";
import { DateTime } from "luxon";

type Notification = {
  seen: boolean;
  created_at: string;
  type: "review" | "follow" | "reply";
  source?: {
    name?: string;
    avatar?: string;
  };
  product?: {
    product_id: string;
    name: string;
  };
  post?: {
    post_id: string;
    title: string;
  };
};

export const meta: Route.MetaFunction = () => [{ title: "Notifications" }];
export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const notifications: Notification[] = await getNotifications(client, {
    userId,
  });
  return { notifications };
};
export default function NotificationsPage({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div className='space-y-20'>
      <h1 className='text-4xl font-bold'>알림</h1>
      <div className='flex flex-col items-start gap-5'>
        {loaderData.notifications.map((notification) => (
          <NotificationCard
            key={notification.notification_id}
            id={notification.notification_id}
            username={notification.source?.name ?? ""}
            seen={notification.seen}
            avatarUrl={notification.source?.avatar ?? ""}
            avatarFallback={notification.source?.name ?? ""}
            type={notification.type}
            timestamp={DateTime.fromISO(notification.created_at).toRelative()}
            productName={notification.product?.name ?? ""}
            postTitle={notification.post?.title ?? ""}
            payloadId={
              notification.product?.product_id ?? notification.post?.post_id
            }
          />
        ))}
      </div>
    </div>
  );
}
