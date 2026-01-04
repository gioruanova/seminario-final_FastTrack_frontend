"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { OperadorUsuariosPage } from "@/components/features/usuarios/operador-usuarios-page";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

export default function OperadorUsersPage() {
  const { companyConfig, user, isLoading } = useAuth();

  const isCompanyActive = companyConfig?.company?.company_estado === 1;
  const canRenderContent = isCompanyActive && !isLoading;

  return (
    <>
      <DashboardHeader 
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/operador" },
          { label: "Usuarios" }
        ]} 
        userRole={user?.user_role || "operador"}
      />
      
      <div className="flex flex-1 flex-col gap-4 p-4 pt-5">
        {canRenderContent ? (
          <OperadorUsuariosPage />
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

