"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { TutorialesVideosList } from "@/components/dashboard/shared/tutoriales-videos-list";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

export default function OwnerTutorialesPage() {
  const { companyConfig, user, isLoading } = useAuth();

  const isCompanyActive = companyConfig?.company?.company_estado === 1;
  const canRenderContent = user && isCompanyActive && !isLoading;

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/owner" },
          { label: "Tutoriales" }
        ]}
        userRole={user?.user_role || "owner"}
      />

      <div className="flex flex-1 flex-col gap-4 p-4 pt-5">
        <div className="space-y-4">
          {canRenderContent ? (
            <TutorialesVideosList role={user.user_role} />
          ) : (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

