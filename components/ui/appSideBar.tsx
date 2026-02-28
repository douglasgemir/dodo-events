import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "./sidebar";

import { LayoutDashboard, Calendar, Users, QrCode } from "lucide-react";

export const AppSideBar = () => {
  const itens = [
    { name: "Dashboard", link: "/protected/dashboard", icon: LayoutDashboard },
    { name: "Eventos", link: "/protected/events", icon: Calendar },
    { name: "Participantes", link: "/protected/members", icon: Users },
    { name: "Check-in", link: "/protected/checkin", icon: QrCode },
  ];

  return (
    <Sidebar collapsible="icon" className="mt-14">
      <SidebarHeader>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {itens.map((item, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton asChild>
                  <Link href={item.link}>
                    <item.icon />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
};
