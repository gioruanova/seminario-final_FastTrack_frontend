"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SuperadminClientesPage } from "@/components/features/clientes/superadmin-clientes-page";

export default function ClientesRecurrentesPage() {
  return (
    <>
      <DashboardHeader 
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/superadmin" },
          { label: "Clientes Recurrentes" }
        ]} 
      />
      
      <div className="flex flex-1 flex-col gap-4 p-4 pt-5">
        <SuperadminClientesPage />
      </div>
    </>
  );
}

