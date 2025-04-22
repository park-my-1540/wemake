import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarProvider,
} from "~/components/ui/sidebar";
import { Outlet } from "react-router";
import { MessageCard } from "../components/message-card";
export default function MessagesLayout() {
  return (
    <SidebarProvider className='max-h-[calc(100vh-14rem)] h-[calc(100vh-14rem)] overflow-hidden min-h-full'>
      <Sidebar className='pt-16'>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {Array.from({ length: 10 }).map((_, index) => (
                <MessageCard
                  key={`message-${index}`}
                  id={`${index}`}
                  avatarUrl='https://github.com/nico.png'
                  name='Nico'
                  lastMessage='Last Message'
                />
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className='w-full h-full'>
        <Outlet />
      </div>
    </SidebarProvider>
  );
}
