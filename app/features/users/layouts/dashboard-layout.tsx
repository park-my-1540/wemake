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
import { HomeIcon, RocketIcon, SparkleIcon } from "lucide-react";
import type { Route } from "./+types/dashboard-layout";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId, getProductsByUserId } from "../queries";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);

  const products = await getProductsByUserId(client, { userId });
  return {
    products,
  };
};

export default function DashboardLayout({ loaderData }: Route.ComponentProps) {
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
              {loaderData.products.map((product) => (
                <SidebarMenuItem key={product.product_id}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      location.pathname ===
                      `/my/dashboard/products/${product.product_id}`
                    }
                  >
                    <Link to={`/my/dashboard/products/${product.product_id}`}>
                      <RocketIcon className='w-4 h-4' />
                      <span>{product.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
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
