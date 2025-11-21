# Flujo de Autenticación y Autorización

## 📋 Resumen del Flujo

Este documento describe el flujo completo de autenticación y autorización de la aplicación.

---

## 🔄 Flujo Principal

### Escenario 1: Usuario sin sesión activa

```
1. Usuario ingresa a la app (/)
   ↓
2. AuthFlow detecta que no hay sesión
   ↓
3. Redirige a /login
   ↓
4. Usuario ingresa credenciales
   ↓
5. Login exitoso → checkAuth() se ejecuta
   ↓
6. Se obtiene perfil del usuario (GET /profile)
   ↓
7. Si es CompanyUser → Se carga companyConfig
   ↓
8. Se valida el rol del usuario
   ↓
9. Redirige al dashboard correspondiente según rol
   ↓
10. Dashboard protegido valida acceso por rol
```

### Escenario 2: Usuario con sesión activa

```
1. Usuario ingresa a la app (/)
   ↓
2. AuthFlow detecta sesión activa
   ↓
3. checkAuth() se ejecuta automáticamente
   ↓
4. Intenta obtener perfil (GET /profile)
   ↓
5. Si 401/403 → Intenta refresh token (GET /refresh)
   ↓
6. Si refresh exitoso → Obtiene perfil nuevamente
   ↓
7. Si es CompanyUser → Se carga companyConfig
   ↓
8. Se valida el rol del usuario
   ↓
9. Redirige al dashboard correspondiente según rol
   ↓
10. Dashboard protegido valida acceso por rol
```

---

## 🔐 Componentes del Sistema

### 1. AuthProvider (`src/context/AuthContext.tsx`)
- **Responsabilidad**: Gestionar el estado global de autenticación
- **Estado**: `user`, `companyConfig`, `isLoading`
- **Inicialización**: Ejecuta `checkAuth()` al montar

### 2. useAuth Hook (`src/hooks/useAuth.ts`)
- **Responsabilidad**: Lógica de autenticación
- **Métodos principales**:
  - `checkAuth()`: Verifica sesión y carga datos
  - `login()`: Inicia sesión
  - `logout()`: Cierra sesión
  - `loadCompanyConfig()`: Carga configuración de empresa

### 3. AuthFlow (`src/components/auth/auth-flow.tsx`)
- **Responsabilidad**: Manejar redirecciones según estado de autenticación
- **Comportamiento**:
  - Si `isLoading` → Muestra loading
  - Si `user` existe → Redirige a dashboard según rol
  - Si no hay `user` → Redirige a `/login`

### 4. Route Protection
- **Nivel de Layout**: `src/app/dashboard/layout.tsx`
- **Nivel de Página**: Cada página valida su propio acceso
- **Validación**: Verifica `user` y `user_role`

---

## 🛡️ Protección de Rutas

### Protección a Nivel de Página

Cada página del dashboard debe validar:

```typescript
const { user } = useAuth();

// Para roles de empresa (owner, operador, profesional)
if (!user || !isCompanyUser(user) || user.user_role !== "owner") {
  return null; // O redirigir
}

// Para superadmin
if (!user || user.user_role !== "superadmin") {
  return null; // O redirigir
}
```

### Rutas Protegidas por Rol

| Rol | Ruta Base | Acceso |
|-----|-----------|--------|
| `superadmin` | `/dashboard/superadmin` | Solo superadmin |
| `owner` | `/dashboard/owner` | Solo owner |
| `operador` | `/dashboard/operador` | Solo operador |
| `profesional` | `/dashboard/profesional` | Solo profesional |

---

## 📦 Contexto de Datos

### Estado del Context (`AuthContext`)

```typescript
{
  user: User | null;              // Información del usuario autenticado
  companyConfig: CompanyConfigData | null; // Configuración de empresa (solo CompanyUser)
  isLoading: boolean;             // Estado de carga inicial
  login: (email, password) => Promise<void>;
  logout: () => Promise<void>;
  refreshCompanyConfig: () => Promise<void>;
}
```

### Carga de Datos

1. **Usuario**: Se carga siempre al autenticarse
2. **CompanyConfig**: 
   - Se carga solo si `isCompanyUser(user)` es `true`
   - Se intenta obtener de `/companies/config`
   - Si falla (403/401), se obtiene de `/companies` y se crea config por defecto
   - Si es `superadmin`, `companyConfig` será `null`

---

## 🔄 Flujo de Carga de Datos

### Para CompanyUser (owner, operador, profesional)

```
checkAuth()
  ↓
GET /profile → userData
  ↓
handleProfileResponse(userData)
  ↓
setUser(userData)
  ↓
if (isCompanyUser(userData))
  ↓
loadCompanyConfig()
  ↓
CompanyConfigService.getConfig()
  ↓
  ├─ Intenta GET /companies/config
  │   ├─ Éxito → Retorna config completa
  │   └─ 403/401 → Continúa
  │
  └─ Intenta GET /companies
      ├─ Éxito → Crea config por defecto
      └─ Falla → Retorna null
```

### Para SuperAdmin

```
checkAuth()
  ↓
GET /profile → userData
  ↓
handleProfileResponse(userData)
  ↓
setUser(userData)
  ↓
// No se carga companyConfig (superadmin no tiene empresa)
```

---

## ✅ Validaciones Requeridas

### En cada página del dashboard:

1. ✅ Verificar que `user` existe
2. ✅ Verificar que `user.user_role` coincide con la ruta
3. ✅ Para CompanyUser: Verificar que `companyConfig` está disponible (opcional, según necesidad)
4. ✅ Manejar estado de carga (`isLoading`)

---

## 🚨 Manejo de Errores

### Errores de Autenticación

- **401 Unauthorized**: Sesión expirada → Intenta refresh token
- **403 Forbidden**: Sin permisos → Redirige a login
- **Network Error**: Muestra mensaje de error al usuario

### Errores de Carga de CompanyConfig

- **403/401 en `/companies/config`**: Intenta obtener datos básicos de `/companies`
- **403/401 en `/companies`**: `companyConfig` queda como `null` (no crítico)
- **Otros errores**: Se registran en consola, `companyConfig` queda como `null`

---

## 📝 Buenas Prácticas

1. **Siempre validar rol en cada página**: No confiar solo en la ruta
2. **Manejar estado de carga**: Mostrar loading mientras `isLoading === true`
3. **No asumir que companyConfig existe**: Verificar antes de usar
4. **Usar tipos TypeScript**: `isCompanyUser()`, `isSuperAdmin()` para type guards
5. **Redirecciones claras**: Usar `getDashboardRoute()` para consistencia

