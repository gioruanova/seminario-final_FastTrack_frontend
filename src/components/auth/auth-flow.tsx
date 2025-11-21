"use client";

import { useAuth } from "@/context/AuthContext";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getDashboardRoute, isPublicRoute } from "@/lib/auth/routes";

/**
 * Componente que maneja el flujo inicial de autenticación
 * 
 * - Muestra loading mientras se autentica
 * - Redirige a dashboard si hay usuario autenticado
 * - Redirige a login si no hay usuario y no es ruta pública
 */
export function AuthFlow() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setIsRedirecting(true);
      return;
    }

    if (user) {
      const dashboardRoute = getDashboardRoute(user.user_role);
      if (pathname !== dashboardRoute) {
        setIsRedirecting(true);
        router.replace(dashboardRoute);
      } else {
        setIsRedirecting(false);
      }
    } else {
      if (!isPublicRoute(pathname)) {
        setIsRedirecting(true);
        router.replace("/login");
      } else {
        setIsRedirecting(false);
      }
    }
  }, [user, isLoading, pathname, router]);

  if (isLoading || isRedirecting) {
    return <LoadingScreen message={isLoading ? "Verificando sesión..." : "Redirigiendo..."} />;
  }

  return null;
}

