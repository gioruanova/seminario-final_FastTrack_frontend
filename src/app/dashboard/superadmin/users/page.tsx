"use client";

import { SuperadminUsuariosPage } from "@/components/features/usuarios/superadmin-usuarios-page";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardProvider } from "@/context/DashboardContext";

export default function UsersPage() {
  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/superadmin" },
          { label: "Usuarios" }
        ]}
        userRole="superadmin"
      />

      <div className="flex flex-1 flex-col gap-4 p-4 pt-5">
        <DashboardProvider>
          <SuperadminUsuariosPage />
        </DashboardProvider>
      </div>
    </>
  );
}

