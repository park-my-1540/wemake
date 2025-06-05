import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarProvider,
} from "~/components/ui/sidebar";
import { Outlet, useOutletContext } from "react-router";
import { MessageCard } from "../components/message-card";
import type { Route } from "./+types/messages-layout";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId, getMessages } from "../queries";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = await makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const messages = await getMessages(client, { userId });
  return {
    messages,
  };
};

export default function MessagesLayout({ loaderData }: Route.ComponentProps) {
  const { userId, name, avatar } = useOutletContext<{
    userId: string;
    name: string;
    avatar: string;
  }>();
  return (
    <SidebarProvider className='max-h-[calc(100vh-14rem)] h-[calc(100vh-14rem)] overflow-hidden min-h-full'>
      <Sidebar className='pt-16'>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {loaderData.messages.map((message, index) => (
                <MessageCard
                  key={`message-${index}`}
                  id={`${index}`}
                  avatarUrl={message.avatar}
                  name={message.name}
                  lastMessage={message.last_message}
                />
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className='w-full h-full'>
        <Outlet context={{ userId, name, avatar }} />
      </div>
    </SidebarProvider>
  );
}
