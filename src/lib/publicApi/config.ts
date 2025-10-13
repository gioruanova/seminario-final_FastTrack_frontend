import { config, slugs } from "../config";

export const PUBLIC_API = {
  LOGIN: `${config.apiUrl}/${slugs.publicApi}/login`,
  REFRESH: `${config.apiUrl}/${slugs.publicApi}/refresh`,
  PROFILE: `${config.apiUrl}/${slugs.publicApi}/profile`,
  LOGOUT: `${config.apiUrl}/${slugs.publicApi}/logout`,
};
