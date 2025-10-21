# API Reference

Documentación de la API: https://fast-track-api.up.railway.app/api-docs/

## Endpoints por Rol y Permisos

### 🔐 Autenticación (Público)
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registrarse
- `GET /api/auth/profile` - Obtener perfil del usuario
- `POST /api/auth/refresh` - Renovar token

### 👑 SUPERADMIN (Acceso completo)

#### Gestión de Usuarios
- `GET /api/superadmin/users` - Listar todos los usuarios
- `POST /api/superadmin/users` - Crear usuario
- `PUT /api/superadmin/users/{id}` - Editar usuario
- `POST /api/superadmin/users/block/{id}` - Bloquear usuario
- `POST /api/superadmin/users/unblock/{id}` - Desbloquear usuario
- `PUT /api/superadmin/users/restore/{id}` - Cambiar contraseña

#### Gestión de Empresas
- `GET /api/superadmin/companies` - Listar todas las empresas
- `POST /api/superadmin/companies` - Crear empresa
- `PUT /api/superadmin/companies/{id}` - Editar empresa

#### Gestión de Especialidades
- `GET /api/superadmin/specialties` - Listar especialidades
- `POST /api/superadmin/specialties` - Crear especialidad
- `PUT /api/superadmin/specialties/{id}` - Editar especialidad
- `POST /api/superadmin/specialties/block/{id}` - Desactivar especialidad
- `POST /api/superadmin/specialties/unblock/{id}` - Activar especialidad

#### Gestión de Banners
- `GET /api/superadmin/banners` - Listar todos los banners
- `POST /api/superadmin/banners` - Crear banner
- `PUT /api/superadmin/banners/{id}` - Editar banner
- `DELETE /api/superadmin/banners/{id}` - Eliminar banner
- `POST /api/superadmin/banners/enable/{id}` - Activar banner
- `POST /api/superadmin/banners/disable/{id}` - Desactivar banner

#### Gestión de Mensajes Públicos
- `GET /api/superadmin/messages` - Listar mensajes públicos
- `POST /api/superadmin/messages/read/{id}` - Marcar como leído
- `DELETE /api/superadmin/messages/{id}` - Eliminar mensaje

#### Gestión de Reclamos
- `GET /api/superadmin/claims` - Listar todos los reclamos
- `GET /api/superadmin/claims/{id}` - Ver detalle de reclamo

#### Gestión de Clientes
- `GET /api/superadmin/clientes-recurrentes` - Listar clientes recurrentes
- `POST /api/superadmin/clientes-recurrentes/block/{id}` - Bloquear cliente
- `POST /api/superadmin/clientes-recurrentes/unblock/{id}` - Desbloquear cliente

### 🏢 OWNER (Gestión de empresa)

#### Gestión de Usuarios de la Empresa
- `GET /api/owner/users` - Listar usuarios de mi empresa
- `POST /api/owner/users` - Crear usuario en mi empresa
- `PUT /api/owner/users/{id}` - Editar usuario de mi empresa

#### Gestión de Especialidades
- `GET /api/owner/especialidades` - Listar especialidades de mi empresa
- `POST /api/owner/especialidades` - Crear especialidad
- `PUT /api/owner/especialidades/{id}` - Editar especialidad

#### Gestión de Profesionales
- `GET /api/owner/profesionales` - Listar profesionales de mi empresa
- `POST /api/owner/profesionales` - Agregar profesional
- `PUT /api/owner/profesionales/{id}` - Editar profesional

#### Gestión de Reclamos
- `GET /api/owner/reclamos` - Listar reclamos de mi empresa
- `GET /api/owner/reclamos/{id}` - Ver detalle de reclamo
- `POST /api/owner/reclamos` - Crear reclamo

#### Gestión de Clientes
- `GET /api/owner/clientes` - Listar clientes de mi empresa
- `POST /api/owner/clientes` - Agregar cliente
- `PUT /api/owner/clientes/{id}` - Editar cliente

#### Configuración de Empresa
- `GET /api/owner/mi-empresa` - Ver configuración de mi empresa
- `PUT /api/owner/mi-empresa` - Editar configuración de mi empresa

### 👨‍💼 OPERADOR (Gestión operativa)

#### Gestión de Reclamos
- `GET /api/operador/reclamos` - Listar reclamos asignados
- `GET /api/operador/reclamos/{id}` - Ver detalle de reclamo
- `PUT /api/operador/reclamos/{id}` - Actualizar estado de reclamo

#### Gestión de Profesionales
- `GET /api/operador/profesionales` - Listar profesionales disponibles
- `GET /api/operador/especialidades` - Listar especialidades

#### Gestión de Clientes
- `GET /api/operador/clientes` - Listar clientes
- `POST /api/operador/clientes` - Crear cliente

### 👨‍⚕️ PROFESIONAL (Trabajo directo)

#### Mis Reclamos
- `GET /api/profesional/reclamos` - Listar mis reclamos asignados
- `GET /api/profesional/reclamos/{id}` - Ver detalle de reclamo
- `PUT /api/profesional/reclamos/{id}` - Actualizar progreso de reclamo

#### Contacto con Empresa
- `GET /api/profesional/contactar-empresa` - Información de contacto
- `POST /api/profesional/contactar-empresa` - Enviar mensaje a empresa

### 🔄 COMPARTIDOS (Todos los roles autenticados)

#### Mensajes de Plataforma
- `GET /api/customers/messages` - Listar mensajes de plataforma
- `POST /api/customers/messages/read/{id}` - Marcar mensaje como leído

#### Banner Activo
- `GET /api/customers/active-banner` - Obtener banner activo

#### Perfil de Usuario
- `GET /api/customers/profile` - Obtener mi perfil
- `PUT /api/customers/profile` - Actualizar mi perfil

## Estructura de respuestas

### Éxito
```json
{
  "success": true,
  "message": "Operación exitosa",
  "data": { ... }
}
```

### Error
```json
{
  "error": "Mensaje de error",
  "code": "ERROR_CODE"
}
```

## Códigos de estado HTTP

- `200` - Éxito
- `201` - Creado
- `400` - Error de validación
- `401` - No autorizado
- `403` - Prohibido
- `404` - No encontrado
- `500` - Error interno del servidor

## Autenticación

Todos los endpoints requieren autenticación mediante cookies de sesión.

## Base URL

```
https://fast-track-api.up.railway.app
```
