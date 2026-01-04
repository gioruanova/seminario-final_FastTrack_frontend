"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardProvider } from "@/context/DashboardContext";
import { CompanyReclamosActivosPage } from "@/components/dashboard/shared/company-reclamos-activos-page";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

export default function TrabajarReclamosPage() {
  const { companyConfig, user, isLoading } = useAuth();

  const isCompanyActive = companyConfig?.company?.company_estado === 1;
  const canRenderContent = isCompanyActive && !isLoading;

  return (
    <>
      <DashboardHeader 
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/operador" },
          { label: `${companyConfig?.plu_heading_reclamos || "Reclamos"} en curso` }
        ]} 
        userRole={user?.user_role || "operador"}
      />
      
      <div className="flex flex-1 flex-col gap-4 p-4 pt-5">
        {canRenderContent ? (
          <DashboardProvider>
            <CompanyReclamosActivosPage userRole="operador" />
          </DashboardProvider>
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


