"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { PublicMessagesManagement } from "@/components/dashboard/superadmin/public-messages-management";

export default function MensajesPublicosPage() {
  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/superadmin" },
          { label: "Mensajes Públicos" }
        ]}
      />

      <div className="flex flex-1 flex-col gap-4 p-4 pt-5">
        <PublicMessagesManagement />
      </div>
    </>
  );
}

