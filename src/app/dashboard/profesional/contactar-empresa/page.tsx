"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ContactoRapido } from "@/components/dashboard/profesional/contacto-rapido-feature";
import { useAuth } from "@/context/AuthContext";
import { isCompanyUser } from "@/types/auth";

export default function ContactarEmpresaPage() {
  const { user } = useAuth();

  if (!user || !isCompanyUser(user) || user.user_role !== "profesional") {
    return null;
  }

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard/profesional" },
          { label: "Contactar Empresa" }
        ]}
      />

      <div className="flex flex-1 flex-col gap-4 p-4 pt-5">
        <ContactoRapido variant="default" showHeader={true} />
      </div>
    </>
  );
}
