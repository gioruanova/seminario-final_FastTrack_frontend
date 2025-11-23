import { config, slugs } from "../config";

export const CLIENT_API = {

  GET_RECLAMOS: `${config.apiUrl}/${slugs.customersApi}/reclamos`,

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

};