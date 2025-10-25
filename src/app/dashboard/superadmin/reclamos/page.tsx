"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardProvider } from "@/context/DashboardContext";
import { SuperadminReclamosPage } from "@/components/features/reclamos/superadmin-reclamos-page";
import { useAuth } from "@/context/AuthContext";
import { isSuperAdmin } from "@/types/auth";

export default function ReclamosPage() {
  const { user } = useAuth();

  if (!user || !isSuperAdmin(user)) {
    return null;
  }

  return (
    <>
      <DashboardHeader 
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/superadmin" },
          { label: "Reclamos" }
        ]} 
        userRole="superadmin"
      />
      
      <div className="flex flex-1 flex-col gap-4 p-4 pt-5">
        <DashboardProvider>
          <SuperadminReclamosPage />
        </DashboardProvider>
      </div>
    </>
  );
}

