"use client";

import { AuthReady } from "./auth-ready";
import { RouteGuard } from "./route-guard";

interface ProtectedPageProps {
  children: React.ReactNode;
  allowedRoles: Array<"superadmin" | "owner" | "operador" | "profesional">;
  requireCompanyConfig?: boolean;
}

/**
 * Componente wrapper para páginas protegidas
 * 
 * Garantiza que:
 * 1. La autenticación esté completa (AuthReady)
 * 2. El usuario tenga el rol correcto (RouteGuard)
 * 3. CompanyConfig esté disponible si se requiere
 * 
 * @example
 * ```tsx
 * export default function MyPage() {
 *   return (
 *     <ProtectedPage allowedRoles={["owner"]} requireCompanyConfig>
 *       <PageContent />
 *     </ProtectedPage>
 *   );
 * }
 * ```
 */
export function ProtectedPage({
  children,
  allowedRoles,
  requireCompanyConfig = false,
}: ProtectedPageProps) {
  return (
    <AuthReady requireCompanyConfig={requireCompanyConfig}>
      <RouteGuard
        allowedRoles={allowedRoles}
        requireCompanyConfig={requireCompanyConfig}
      >
        {children}
      </RouteGuard>
    </AuthReady>
  );
}

