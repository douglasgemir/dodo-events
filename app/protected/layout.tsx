import { Appbar } from "@/components/ui/appbar";
import { AppSideBar } from "@/components/ui/appSideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="h-screen flex flex-1 flex-col ">
        <Appbar />

        <div className="flex flex-1 pt-2">
          <AppSideBar />

          <main className="flex-1 pl-2 overflow-y-scroll ">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
