export const API_ROUTES = {
  LOGIN: '/login',
  REFRESH: '/refresh',
  LOGOUT: '/logout',

  PROFILE: '/profile',


  GET_USERS: '/users',
  USERS_CREATE: '/users',
  USERS_EDIT: '/users/{id}',
  USER_BLOCK: '/users/{id}/block',
  USER_UNBLOCK: '/users/{id}/unblock',
  USER_RESTORE: '/users/{id}/restore',

  GET_COMPANIES: '/companies',
  COMPANY_UPDATE_OWNER: '/companies',
  COMPANY_GET_BY_ID: '/companies/{company_id}',
  COMPANY_CREATE: '/companies',
  COMPANY_UPDATE: '/companies/{company_id}',
  COMPANY_CONFIG: '/companies/config',
  COMPANY_CONFIG_UPDATE: '/companies/config',

  GET_ESPECIALIDADES: '/especialidades',
  GET_ESPECIALIDADES_BY_COMPANY: '/especialidades/{company_id}',
  CREATE_ESPECIALIDADES: '/especialidades',
  EDIT_ESPECIALIDADES: '/especialidades/{especialidad_id}',
  ESPECIALIDADES_BLOCK: '/especialidades/{especialidad_id}/block',
  ESPECIALIDADES_UNBLOCK: '/especialidades/{especialidad_id}/unblock',

  GET_FEEDBACKS: '/feedback',
  FEEDBACK_CREATE: '/feedback',
  FEEDBACK_DELETE: '/feedback/{feedback_id}',

  GET_PROFESIONAL_ESPECIALIDAD: '/profesional-especialidad',
  CREATE_PROFESIONAL_ESPECIALIDAD: '/profesional-especialidad',
  UPDATE_PROFESIONAL_ESPECIALIDAD: '/profesional-especialidad/{asignacion_id}',
  DELETE_PROFESIONAL_ESPECIALIDAD: '/profesional-especialidad/{asignacion_id}',

  GET_CLIENTES_RECURRENTES: '/clientes-recurrentes',
  CREATE_CLIENTE_RECURRENTE: '/clientes-recurrentes',
  UPDATE_CLIENTE_RECURRENTE: '/clientes-recurrentes/{cliente_id}',
  BLOCK_CLIENTE_RECURRENTE: '/clientes-recurrentes/block/{cliente_id}',
  UNBLOCK_CLIENTE_RECURRENTE: '/clientes-recurrentes/unblock/{cliente_id}',

  GET_RECLAMOS: '/reclamos',
  GET_RECLAMO_BY_ID: '/reclamos/{id}',
  GET_AGENDA_BLOQUEADA: '/agenda-reclamo',
  CREAR_RECLAMO: '/reclamos',
  ACTUALIZAR_RECLAMO: '/reclamos/{id}',
  RECLAMO_DESCARGA: '/reclamos/export/{type}',
  ENVIAR_RECORDATORIO_RECLAMO: '/reclamos/{reclamo_id}/recordatorio',
};

