"use client";

import { DashboardProvider } from "@/context/DashboardContext";
import { AppSidebar } from "@/components/layout/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ShapeLeft, ShapeRight } from "@/components/ui/shape";
import { DashboardFooter } from "@/components/layout/footer/dashboard-footer";

export function DashboardContent({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <ShapeLeft />
        {children}
        <DashboardFooter />
        <ShapeRight />
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardProvider>{children}</DashboardProvider>;
}

