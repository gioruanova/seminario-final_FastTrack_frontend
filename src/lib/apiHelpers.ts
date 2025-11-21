import { API_ROUTES } from "./api_routes";
import { USER_STATUS, type UserStatus } from "../types/users";

export function replaceRouteId(route: string, id: string | number): string {
  return route.replace("{id}", String(id));
}

export function getUserBlockEndpoint(userId: number): string {
  return replaceRouteId(API_ROUTES.USER_BLOCK, userId);
}

export function getUserUnblockEndpoint(userId: number): string {
  return replaceRouteId(API_ROUTES.USER_UNBLOCK, userId);
}

export function getUserRestoreEndpoint(userId: number): string {
  return replaceRouteId(API_ROUTES.USER_RESTORE, userId);
}

export function getUserEditEndpoint(userId: number): string {
  return replaceRouteId(API_ROUTES.USERS_EDIT, userId);
}

export function getUserStatusToggleEndpoint(userId: number, currentStatus: UserStatus): string {
  const endpoint = currentStatus === USER_STATUS.ACTIVO ? API_ROUTES.USER_BLOCK : API_ROUTES.USER_UNBLOCK;
  return replaceRouteId(endpoint, userId);
}

export function generateDefaultPassword(dni: string): string {
  return `Fast${dni.slice(-4)}`;
}

export function getFeedbackDeleteEndpoint(feedbackId: number): string {
  return API_ROUTES.FEEDBACK_DELETE.replace("{feedback_id}", String(feedbackId));
}

export function getCompanyByIdEndpoint(companyId: number): string {
  return API_ROUTES.COMPANY_GET_BY_ID.replace("{company_id}", String(companyId));
}

export function getCompanyUpdateEndpoint(companyId: number): string {
  return API_ROUTES.COMPANY_UPDATE.replace("{company_id}", String(companyId));
}

