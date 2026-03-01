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
      <div className="flex h-screen w-full flex-col overflow-hidden">
        <Appbar />

        <div className="flex flex-1 pt-2 min-h-0">
          <AppSideBar />

          <main className="flex-1 overflow-y-auto pl-2">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
