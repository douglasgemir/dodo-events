"use client";

import { Appbar } from "@/components/ui/appbar";
import { AppSideBar } from "@/components/ui/appSideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="flex w-screen h-screen items-center justify-center">
        <p className="text-muted-foreground animate-pulse">Carregando...</p>
      </div>
    );
  }

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
