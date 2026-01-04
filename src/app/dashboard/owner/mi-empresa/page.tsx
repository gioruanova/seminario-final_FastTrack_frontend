"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { OwnerCompanySettingsCard } from "@/components/features/empresas/owner-company-settings-card";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

export default function MiEmpresaPage() {
  const { user, isLoading } = useAuth();

  const canRenderContent = !isLoading;

  return (
    <>
      <DashboardHeader 
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/owner" },
          { label: "Mi Organización" }
        ]} 
        userRole={user?.user_role || "owner"}
      />
      
      <div className="flex flex-1 flex-col gap-4 p-4 pt-5">
        {canRenderContent ? (
          <OwnerCompanySettingsCard />
        ) : (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        )}
      </div>
    </>
  );
}

