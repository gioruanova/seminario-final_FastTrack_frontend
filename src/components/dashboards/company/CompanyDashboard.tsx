"use client";

import { CompanyUser } from "@/types/auth";
import { useAuth } from "@/context/AuthContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface CompanyDashboardProps {
  user: CompanyUser;
}

export function CompanyDashboard({ user }: CompanyDashboardProps) {
  const { companyConfig } = useAuth();

  const getDisplayName = () => {
    const userName = user.user_name;
    if (userName) {
      return userName;
    }
    return user.user_email?.split('@')[0] || "Usuario";
  };

  const getUpdatedRole = () => {
    if (user.user_role === 'owner') {
      return companyConfig?.sing_heading_owner || 'Owner';
    }
    if (user.user_role === 'operador') {
      return companyConfig?.sing_heading_operador || 'Operador';
    }
    if (user.user_role === 'profesional') {
      return companyConfig?.sing_heading_profesional || 'Profesional';
    }
    return user.user_role;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            Bienvenido, {getDisplayName()}
          </CardTitle>
          <CardDescription>
            {user.company_name}
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardContent className="pt-6">
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Rol: <span className="font-medium">{getUpdatedRole()}</span>
          </p>
          <div className="rounded-lg border p-4 bg-muted/50">
            <h3 className="font-semibold">Organización: {user.company_name}</h3>

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
        </CardContent>
      </Card>
    </div>
  );
}

