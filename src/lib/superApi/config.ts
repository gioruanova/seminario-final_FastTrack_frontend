import { config, slugs } from "../config";

export const SUPER_API = {

  // NOTIFICACIONES PUSH - Superadmin
  NOTIFICATION_GET_VAPID: `${config.apiUrl}/${slugs.superApi}/notifications/vapid-public-key`,
  NOTIFICATION_SUBSCRIBE: `${config.apiUrl}/${slugs.superApi}/notifications/register-token`,
  NOTIFICATION_UNSUBSCRIBE: `${config.apiUrl}/${slugs.superApi}/notifications/unregister-token`,
  NOTIFICATION_UNSUBSCRIBE_SPECIFIC: `${config.apiUrl}/${slugs.superApi}/notifications/unregister-specific-token`,
  NOTIFICATION_UNSUBSCRIBE_ALL_DEVICES: `${config.apiUrl}/${slugs.superApi}/notifications/unregister-token`,

  GET_COMPANIES: `${config.apiUrl}/${slugs.superApi}/companies`,
  GET_RECLAMOS: `${config.apiUrl}/${slugs.superApi}/reclamos`,
  GET_LOGS: `${config.apiUrl}/${slugs.superApi}/globalLogs`,

  COMPANY_CREATE: `${config.apiUrl}/${slugs.superApi}/companies`,
  COMPANY_EDIT: `${config.apiUrl}/${slugs.superApi}/companies/{id}`,

  GET_USERS: `${config.apiUrl}/${slugs.superApi}/users`,
  USERS_CREATE: `${config.apiUrl}/${slugs.superApi}/users`,
  USERS_EDIT: `${config.apiUrl}/${slugs.superApi}/users/{id}`,
  USER_BLOCK: `${config.apiUrl}/${slugs.superApi}/users/block/{id}`,
  USER_UNBLOCK: `${config.apiUrl}/${slugs.superApi}/users/unblock/{id}`,
  USER_RESTORE: `${config.apiUrl}/${slugs.superApi}/users/restore/{id}`,

  GET_CLIENTES: `${config.apiUrl}/${slugs.superApi}/clientes-recurrentes`,
  ACTIVAR_CLIENTE: `${config.apiUrl}/${slugs.superApi}/clientes-recurrentes/unblock/{cliente_id}`,
  DESACTIVAR_CLIENTE: `${config.apiUrl}/${slugs.superApi}/clientes-recurrentes/block/{cliente_id}`,
  GET_ESPECIALIDADES: `${config.apiUrl}/${slugs.superApi}/especialidades`,
  CREATE_ESPECIALIDADES: `${config.apiUrl}/${slugs.superApi}/especialidades`,
  EDIT_ESPECIALIDADES: `${config.apiUrl}/${slugs.superApi}/especialidades/{id_especialidad}`,
  ENABLE_ESPECIALIDADES: `${config.apiUrl}/${slugs.superApi}/especialidades/unblock/{especialidadId}`,
  DISABLE_ESPECIALIDADES: `${config.apiUrl}/${slugs.superApi}/especialidades/block/{especialidadId}`,

  // gestion de mensajes
  GET_PUBLIC_MESSAGES: `${config.apiUrl}/${slugs.superApi}/messages`,
  READ_PUBLIC_MESSAGES: `${config.apiUrl}/${slugs.superApi}/messages/read/{message_id}`,
  UNREAD_PUBLIC_MESSAGES: `${config.apiUrl}/${slugs.superApi}/messages/unread/{message_id}`,
  DELETE_PUBLIC_MESSAGES: `${config.apiUrl}/${slugs.superApi}/messages/{message_id}`,

  // mensajes publicos categorias
  GET_PUBLIC_MESSAGES_CATEGORIES: `${config.apiUrl}/${slugs.superApi}/messageCategories`,
  CREATE_PUBLIC_MESSAGES_CATEGORIES: `${config.apiUrl}/${slugs.superApi}/messageCategories`,
  EDIT_PUBLIC_MESSAGES_CATEGORIES: `${config.apiUrl}/${slugs.superApi}/messageCategories/{category_id}`,
  DISABLE_PUBLIC_MESSAGES_CATEGORIES: `${config.apiUrl}/${slugs.superApi}/messageCategories/disable/{category_id}`,
  ENABLE_PUBLIC_MESSAGES_CATEGORIES: `${config.apiUrl}/${slugs.superApi}/messageCategories/enable/{category_id}`,
  DELETE_PUBLIC_MESSAGES_CATEGORIES: `${config.apiUrl}/${slugs.superApi}/messageCategories/{category_id}`,

  // gestion de mensajes plataform
  PLAT_MESSAGE_ALL: `${config.apiUrl}/${slugs.superApi}/platform/messages`,
  PLAT_MESSAGE_COMPANY: `${config.apiUrl}/${slugs.superApi}/platform/messages/company/{company_id}`,
  PLAT_MESSAGE_USER: `${config.apiUrl}/${slugs.superApi}/platform/messages/user/{user_id}`,


  // gestion de banner
  GET_BANNERS: `${config.apiUrl}/${slugs.superApi}/banners`, 
  GET_ACTIVE_BANNER: `${config.apiUrl}/${slugs.superApi}/active-banner`, 
  CREATE_BANNER: `${config.apiUrl}/${slugs.superApi}/banners`, 
  EDIT_BANNER: `${config.apiUrl}/${slugs.superApi}/banners/{banner_id}`, 
  DELETE_BANNER: `${config.apiUrl}/${slugs.superApi}/banners/{banner_id}`,
  DISABLE_BANNER: `${config.apiUrl}/${slugs.superApi}/banners/disable/{banner_id}`, 
  ENABLE_BANNER: `${config.apiUrl}/${slugs.superApi}/banners/enable/{banner_id}`, 
};
