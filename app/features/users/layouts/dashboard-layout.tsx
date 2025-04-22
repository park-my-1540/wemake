import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "~/components/ui/sidebar";
import { Link, Outlet, useLocation } from "react-router";
import { HomeIcon, Package2Icon, RocketIcon, SparkleIcon } from "lucide-react";
export default function DashboardLayout() {
  const location = useLocation();
  return (
    <SidebarProvider className='max-h-[calc(100vh-14rem)] h-[calc(100vh-14rem)] overflow-hidden min-h-full'>
      <Sidebar className='pt-16'>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === "/my/dashboard"}
                >
                  <Link to='/my/dashboard'>
                    <HomeIcon className='w-4 h-4' />홈
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === "/my/ideas"}
                >
                  <Link to='/my/dashboard/ideas'>
                    <SparkleIcon className='w-4 h-4' />
                    Ideas
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Product Analytics</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === "/my/dashboard/products"}
                >
                  <Link to='/my/dashboard/products/1'>
                    <RocketIcon className='w-4 h-4' />
                    <span>Product 1</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
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
