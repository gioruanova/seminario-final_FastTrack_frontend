"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardProvider } from "@/context/DashboardContext";
import { CompanyProfesionalesPage } from "@/components/dashboard/shared/company-profesionales-page";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfesionalesPage() {
  const { companyConfig, user, isLoading } = useAuth();

  const isCompanyActive = companyConfig?.company?.company_estado === 1;
  const canRenderContent = isCompanyActive && !isLoading;

  return (
    <>
      <DashboardHeader 
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/owner" },
          { label: companyConfig?.plu_heading_profesional || "Profesionales" }
        ]} 
        userRole={user?.user_role || "owner"}
      />
      
      <div className="flex flex-1 flex-col gap-4 p-4 pt-5">
        {canRenderContent ? (
          <DashboardProvider>
            <CompanyProfesionalesPage userRole="owner" />
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

