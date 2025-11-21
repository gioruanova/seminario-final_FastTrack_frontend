# Sistema de Autenticación y Autorización

## 📚 Índice

- [Flujo de Autenticación](./auth-flow.md) - Documentación completa del flujo
- [Componentes](#componentes)
- [Hooks](#hooks)
- [Ejemplos de Uso](#ejemplos-de-uso)

---

## 🧩 Componentes

### `RouteGuard`

Componente de protección de rutas que valida acceso y redirige automáticamente.

```tsx
import { RouteGuard } from "@/components/auth/route-guard";

<RouteGuard allowedRoles={["owner"]} requireCompanyConfig>
  <YourPageContent />
</RouteGuard>
```

**Props:**
- `allowedRoles`: Array de roles permitidos
- `requireCompanyConfig`: Si `true`, requiere que `companyConfig` esté disponible (solo CompanyUser)
- `children`: Contenido a proteger

### `ProtectedPage`

Wrapper completo para páginas protegidas con manejo de loading.

```tsx
import { ProtectedPage } from "@/components/auth/protected-page";

export default function MyPage() {
  return (
    <ProtectedPage 
      allowedRoles={["owner"]} 
      requireCompanyConfig
      loadingMessage="Cargando página..."
    >
      <PageContent />
    </ProtectedPage>
  );
}
```

---

## 🎣 Hooks

### `useRouteAccess`

Hook para validar acceso a rutas con control manual.

```tsx
import { useRouteAccess } from "@/hooks/auth/useRouteAccess";

const { hasAccess, isLoading, user, companyConfig } = useRouteAccess({
  allowedRoles: ["owner"],
  requireCompanyConfig: true,
  redirectOnInvalid: true, // Por defecto: true
});

if (isLoading) return <Loading />;
if (!hasAccess) return <Unauthorized />;
```

**Opciones:**
- `allowedRoles`: Roles permitidos
- `requireCompanyConfig`: Requiere companyConfig (solo CompanyUser)
- `redirectOnInvalid`: Si redirigir automáticamente (default: `true`)

**Retorna:**
- `hasAccess`: `boolean` - Si el usuario tiene acceso
- `isLoading`: `boolean` - Si está cargando
- `user`: Usuario actual
- `companyConfig`: Configuración de empresa (si aplica)

---

## 📖 Ejemplos de Uso

### Ejemplo 1: Página de Owner (con companyConfig requerido)

```tsx
"use client";

import { ProtectedPage } from "@/components/auth/protected-page";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export default function OwnerPage() {
  return (
    <ProtectedPage 
      allowedRoles={["owner"]} 
      requireCompanyConfig
    >
      <DashboardHeader breadcrumbs={[{ label: "Mi Página" }]} userRole="owner" />
      <div className="p-4">
        {/* Tu contenido aquí */}
      </div>
    </ProtectedPage>
  );
}
```

### Ejemplo 2: Página de Superadmin (sin companyConfig)

```tsx
"use client";

import { ProtectedPage } from "@/components/auth/protected-page";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export default function SuperadminPage() {
  return (
    <ProtectedPage allowedRoles={["superadmin"]}>
      <DashboardHeader breadcrumbs={[{ label: "Admin" }]} userRole="superadmin" />
      <div className="p-4">
        {/* Tu contenido aquí */}
      </div>
    </ProtectedPage>
  );
}
```

### Ejemplo 3: Validación manual con hook

```tsx
"use client";

import { useRouteAccess } from "@/hooks/auth/useRouteAccess";
import { LoadingScreen } from "@/components/ui/loading-screen";

export default function CustomPage() {
  const { hasAccess, isLoading, user, companyConfig } = useRouteAccess({
    allowedRoles: ["owner", "operador"],
    requireCompanyConfig: false,
    redirectOnInvalid: false, // Control manual
  });

  if (isLoading) {
    return <LoadingScreen message="Cargando..." />;
  }

  if (!hasAccess) {
    return (
      <div>
        <h1>Acceso Denegado</h1>
        <p>No tienes permisos para acceder a esta página.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Bienvenido, {user?.user_name}</h1>
      {/* Tu contenido aquí */}
    </div>
  );
}
```

### Ejemplo 4: Validación condicional

```tsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { isCompanyUser } from "@/types/auth";

export default function ConditionalPage() {
  const { user, companyConfig } = useAuth();

  if (!user) {
    return null;
  }

  // Validación específica para CompanyUser
  if (isCompanyUser(user) && user.user_role === "owner") {
    if (!companyConfig) {
      return <div>Cargando configuración...</div>;
    }
    
    return (
      <div>
        <h1>Dashboard Owner</h1>
        <p>Empresa: {companyConfig.company.company_nombre}</p>
      </div>
    );
  }

  // Validación para Superadmin
  if (user.user_role === "superadmin") {
    return (
      <div>
        <h1>Dashboard Superadmin</h1>
      </div>
    );
  }

  return null;
}
```

---

## ✅ Checklist de Implementación

Al crear una nueva página protegida:

- [ ] Importar `ProtectedPage` o usar `useRouteAccess`
- [ ] Especificar `allowedRoles` correctos
- [ ] Si es CompanyUser y necesita datos de empresa, usar `requireCompanyConfig: true`
- [ ] Manejar estado de carga (`isLoading`)
- [ ] Validar que `user` existe antes de usar
- [ ] Validar que `companyConfig` existe si se requiere

---

## 🔒 Reglas de Seguridad

1. **Nunca confiar solo en la ruta**: Siempre validar el rol en el componente
2. **Validar en múltiples capas**: Layout + Página
3. **No exponer datos sensibles**: Verificar permisos antes de mostrar
4. **Manejar estados edge**: `user === null`, `companyConfig === null`
5. **Redirecciones claras**: Usar `getDashboardRoute()` para consistencia

---

## 🐛 Debugging

### Problema: Usuario no puede acceder a su dashboard

1. Verificar que `user` existe en el contexto
2. Verificar que `user.user_role` coincide con la ruta
3. Verificar que `allowedRoles` incluye el rol correcto
4. Verificar consola por errores de red

### Problema: companyConfig es null

1. Verificar que el usuario es CompanyUser (no superadmin)
2. Verificar que `loadCompanyConfig()` se ejecutó
3. Verificar permisos en `/companies/config` y `/companies`
4. Verificar consola por errores de API

---

## 📝 Notas

- El sistema usa cookies para mantener la sesión
- El refresh token se maneja automáticamente
- `companyConfig` solo se carga para CompanyUser
- Superadmin nunca tiene `companyConfig`

