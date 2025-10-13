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
import { isSuperAdmin } from "@/types/auth";

export default function AdminPage() {
  const { user } = useAuth();

  return (
    <ProtectedPage allowedRoles={["superadmin"]}>
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
                    <BreadcrumbLink href="/dashboard">
                      Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Panel de Administración</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid gap-4">
              <div className="rounded-lg border p-6">
                <h2 className="text-2xl font-bold mb-4">
                  Panel de Administración
                </h2>
                
                {isSuperAdmin(user) && (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Esta página solo es accesible para Super Administradores.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                        <h3 className="font-semibold">Gestión de Usuarios</h3>
                        <p className="text-sm text-muted-foreground">
                          Crear, editar y eliminar usuarios del sistema
                        </p>
                      </div>
                      
                      <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                        <h3 className="font-semibold">Gestión de Empresas</h3>
                        <p className="text-sm text-muted-foreground">
                          Administrar empresas y sus configuraciones
                        </p>
                      </div>
                      
                      <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                        <h3 className="font-semibold">Configuración del Sistema</h3>
                        <p className="text-sm text-muted-foreground">
                          Configuraciones globales y parámetros
                        </p>
                      </div>
                      
                      <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                        <h3 className="font-semibold">Logs del Sistema</h3>
                        <p className="text-sm text-muted-foreground">
                          Revisar logs y actividad del sistema
                        </p>
                      </div>
                      
                      <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                        <h3 className="font-semibold">Reportes</h3>
                        <p className="text-sm text-muted-foreground">
                          Generar reportes del sistema
                        </p>
                      </div>
                      
                      <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                        <h3 className="font-semibold">Backup y Restauración</h3>
                        <p className="text-sm text-muted-foreground">
                          Gestionar respaldos del sistema
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedPage>
  );
}
