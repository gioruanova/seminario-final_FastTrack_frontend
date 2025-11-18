import { config, slugs } from "../config";

export const CLIENT_API = {

  GET_RECLAMOS: `${config.apiUrl}/${slugs.customersApi}/reclamos`,

  GET_USERS: `${config.apiUrl}/${slugs.customersApi}/users`,
  USERS_CREATE: `${config.apiUrl}/${slugs.customersApi}/users`,
  USERS_EDIT: `${config.apiUrl}/${slugs.customersApi}/users/{id}`,
  USER_BLOCK: `${config.apiUrl}/${slugs.customersApi}/users/block/{id}`,
  USER_UNBLOCK: `${config.apiUrl}/${slugs.customersApi}/users/unblock/{id}`,
  USER_RESTORE: `${config.apiUrl}/${slugs.customersApi}/users/restore/{id}`,

  GET_ESPECIALIDADES: `${config.apiUrl}/${slugs.customersApi}/especialidades`,
  CREATE_ESPECIALIDADES: `${config.apiUrl}/${slugs.customersApi}/especialidades`,
  EDIT_ESPECIALIDADES: `${config.apiUrl}/${slugs.customersApi}/especialidades/{id_especialidad}`,
  ENABLE_ESPECIALIDADES: `${config.apiUrl}/${slugs.customersApi}/especialidades/unblock/{especialidadId}`,
  DISABLE_ESPECIALIDADES: `${config.apiUrl}/${slugs.customersApi}/especialidades/block/{especialidadId}`,

  CREAR_ASIGNACION_ESPECIALIDAD: `${config.apiUrl}/${slugs.customersApi}/profesionalEspecialidad`,
  GET_ASIGNACIONES: `${config.apiUrl}/${slugs.customersApi}/asignaciones`,
  EDITAR_ASIGNACION_ESPECIALIDAD: `${config.apiUrl}/${slugs.customersApi}/profesionalEspecialidad/{id_asignacion}`,
  ELIMINAR_ASIGNACION_ESPECIALIDAD: `${config.apiUrl}/${slugs.customersApi}/profesionalEspecialidad/{id_asignacion}`,

  RECLAMO_DESCARGA: `${config.apiUrl}/${slugs.customersApi}/vistas/reclamos/{type}`,

  GET_CLIENTES: `${config.apiUrl}/${slugs.customersApi}/clientes-recurrentes`,
  CREATE_CLIENTE: `${config.apiUrl}/${slugs.customersApi}/clientes-recurrentes`,
  UPDATE_CLIENTE: `${config.apiUrl}/${slugs.customersApi}/clientes-recurrentes/{cliente_id}`,
  ACTIVAR_CLIENTE: `${config.apiUrl}/${slugs.customersApi}/clientes-recurrentes/unblock/{cliente_id}`,
  DESACTIVAR_CLIENTE: `${config.apiUrl}/${slugs.customersApi}/clientes-recurrentes/block/{cliente_id}`,

  GET_AGENDA_BLOQUEADA: `${config.apiUrl}/${slugs.customersApi}/reclamos/agendaReclamo`,
  CREAR_RECLAMO: `${config.apiUrl}/${slugs.customersApi}/reclamo`,
  RECLAMO_GESTION_ADMIN: `${config.apiUrl}/${slugs.customersApi}/reclamos/gestion/{id}`,

  RECLAMO_GESTION_PROFESIONAL: `${config.apiUrl}/${slugs.customersApi}/reclamos/profesional/gestion/{id}`,
  ENVIAR_RECORDATORIO_RECLAMO: `${config.apiUrl}/${slugs.customersApi}/reclamos/recordatorio/:reclamo_id`,

  UPDATE_COMPANY: `${config.apiUrl}/${slugs.customersApi}/company`,
  UPDATE_COMPANY_CONFIG: `${config.apiUrl}/${slugs.customersApi}/company/config`,
  FEEDBACK: `${config.apiUrl}/${slugs.customersApi}/platform/feedback`,
  COMPANY_CONFIG: `${config.apiUrl}/${slugs.customersApi}/company/config`,

  PROFILE_MANAGE: `${config.apiUrl}/${slugs.customersApi}/profile/manage`,

};