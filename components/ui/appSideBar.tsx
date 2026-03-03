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

import { LayoutDashboard, Calendar, Users, QrCode, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const AppSideBar = () => {
  const { logout, user } = useAuth();
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
              <SidebarMenuItem className="mt-8">
                <SidebarMenuButton onClick={logout} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                  <LogOut className="mr-2" />
                  <span>Sair da conta</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>    </Sidebar>
  );
};
