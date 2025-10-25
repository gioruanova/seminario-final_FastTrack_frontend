"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { PlatformMessagesManagement } from "@/components/dashboard/superadmin/platform-messages-management";

export default function MensajesPlataformaPage() {
  return (
    <>
      <DashboardHeader 
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/superadmin" },
          { label: "Mensajes Plataforma" }
        ]} 
        userRole="superadmin"
      />
      
      <div className="flex flex-1 flex-col gap-4 p-4 pt-5">
        <PlatformMessagesManagement />
      </div>
    </>
  );
}

