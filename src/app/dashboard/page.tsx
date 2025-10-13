"use client";

import { ProtectedPage } from "@/components/protected-page";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import { isSuperAdmin, isCompanyUser } from "@/types/auth";

export default function DashboardPage() {
  const { user } = useAuth();
  const { companyConfig } = useAuth();

  const getDisplayName = () => {
    if (!user) return "Usuario";
    const userName = 'user_name' in user ? user.user_name : undefined;
    if (userName) {
      return userName;
    }
    return user.user_email?.split('@')[0] || "Usuario";
  };

  const getUpdatedRole = () => {

    
    if (user?.user_role === 'owner') {
      return companyConfig?.sing_heading_owner;
    }
    if (user?.user_role === 'operador') {
      return companyConfig?.sing_heading_operador;
    }
    if (user?.user_role === 'profesional') {
      return companyConfig?.sing_heading_profesional;
    }
  }




  return (
    <ProtectedPage>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">Hola, {getDisplayName()}</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Dashboard</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid gap-4">
              <div className="rounded-lg border p-6">
                <h2 className="text-2xl font-bold mb-4">Bienvenido, {getDisplayName()}</h2>

                {isSuperAdmin(user) ? (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Tienes acceso completo como Super Administrador.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="rounded-lg border p-4">
                        <h3 className="font-semibold">Usuarios</h3>
                        <p className="text-sm text-muted-foreground">Gestiona todos los usuarios del sistema</p>
                      </div>
                      <div className="rounded-lg border p-4">
                        <h3 className="font-semibold">Empresas</h3>
                        <p className="text-sm text-muted-foreground">Administra todas las empresas</p>
                      </div>
                      <div className="rounded-lg border p-4">
                        <h3 className="font-semibold">Configuración</h3>
                        <p className="text-sm text-muted-foreground">Configuración del sistema</p>
                      </div>
                    </div>
                  </div>
                ) : isCompanyUser(user) ? (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Rol: <span className="font-medium">{getUpdatedRole()}</span>
                    </p>
                    <div className="rounded-lg border p-4 bg-muted/50">
                      <h3 className="font-semibold">Organizacion: {user.company_name}</h3>

                      {(user.user_role === 'owner' || user.user_role === 'operador') && (
                        <p className="text-sm text-muted-foreground">
                          ID: {user.company_id} | Estado: <span className={`font-bold uppercase ${user.company_status === 1 ? "text-green-500" : "text-red-500"}`}>{user.company_status === 1 ? "Activa" : "Inactiva"}</span>
                        </p>
                      )}

                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="rounded-lg border p-4">
                        <h3 className="font-semibold">Mi Perfil</h3>
                        <p className="text-sm text-muted-foreground">Actualiza tu información personal</p>
                      </div>
                      <div className="rounded-lg border p-4">
                        <h3 className="font-semibold">Empresa</h3>
                        <p className="text-sm text-muted-foreground">Información de tu empresa</p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedPage>
  );
}
