import { config } from "./config";

export const API_ROUTES = {
  LOGIN: `${config.apiUrl}/login`,
  REFRESH: `${config.apiUrl}/refresh`,
  LOGOUT: `${config.apiUrl}/logout`,

  PROFILE: `${config.apiUrl}/profile`,


  GET_USERS: `${config.apiUrl}/users`,
  USERS_CREATE: `${config.apiUrl}/users`,
  USERS_EDIT: `${config.apiUrl}/users/{id}`,
  USER_BLOCK: `${config.apiUrl}/users/{id}/block`,
  USER_UNBLOCK: `${config.apiUrl}/users/{id}/unblock`,
  USER_RESTORE: `${config.apiUrl}/users/{id}/restore`,

  GET_COMPANIES: `${config.apiUrl}/companies`,
  COMPANY_UPDATE_OWNER: `${config.apiUrl}/companies`,
  COMPANY_GET_BY_ID: `${config.apiUrl}/companies/{company_id}`,
  COMPANY_CREATE: `${config.apiUrl}/companies`,
  COMPANY_UPDATE: `${config.apiUrl}/companies/{company_id}`,
  COMPANY_CONFIG: `${config.apiUrl}/companies/config`,
  COMPANY_CONFIG_UPDATE: `${config.apiUrl}/companies/config`,





  
  GET_FEEDBACKS: `${config.apiUrl}/feedback`,
  FEEDBACK_CREATE: `${config.apiUrl}/feedback`,
  FEEDBACK_DELETE: `${config.apiUrl}/feedback/{feedback_id}`,
};

