"use client";

import { ProtectedPage } from "@/components/protected-page";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import { isSuperAdmin, isCompanyUser } from "@/types/auth";
import { SuperadminDashboard } from "@/components/dashboards/superadmin/SuperadminDashboard";
import { CompanyDashboard } from "@/components/dashboards/company/CompanyDashboard";
import { OwnerDashboard } from "@/components/dashboards/owner/OwnerDashboard";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const { user } = useAuth();

  const getDisplayName = () => {
    if (!user) return "Usuario";
    const userName = 'user_name' in user ? user.user_name : undefined;
    if (userName) {
      return userName;
    }
    return user.user_email?.split('@')[0] || "Usuario";
  };




  return (
    <ProtectedPage>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-muted/50">
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 sticky top-0 z-10 bg-sidebar border-b border-sidebar-border">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">Hola, {getDisplayName()}</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Dashboard</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-4">
            {isSuperAdmin(user) && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Bienvenido, {getDisplayName()}</CardTitle>
                </CardHeader>
              </Card>
            )}

            {isSuperAdmin(user) && <SuperadminDashboard />}
            {isCompanyUser(user) && user.user_role === "owner" && <OwnerDashboard user={user} />}
            {isCompanyUser(user) && user.user_role !== "owner" && <CompanyDashboard user={user} />}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedPage>
  );
}
